import { Component, HostBinding, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SponsorAdLocation, SponsorAdRecord } from '@models/SponsorRecord';
import { SponsorAdvertisingService } from '@services/sponsor-advertising.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sponsor-ad-slot',
  templateUrl: './sponsor-ad-slot.component.html',
  styleUrls: ['./sponsor-ad-slot.component.css'],
  standalone: false,
})
export class SponsorAdSlotComponent implements OnInit, OnDestroy {
  @Input() location: SponsorAdLocation = 'Bottom';
  @HostBinding('class.is-empty') get isEmpty() { return !this.currentAd; }
  @HostBinding('class') get hostClasses() {
    return `sponsor-slot sponsor-slot--${this.location.toLowerCase()}${this.isEmpty ? ' is-empty' : ''}`;
  }

  currentAd?: SponsorAdRecord;
  currentContent?: SafeHtml;
  private allAds: SponsorAdRecord[] = [];
  private eligibleAds: SponsorAdRecord[] = [];
  private currentIndex = 0;
  private rotationTimer?: number;
  private subscription?: Subscription;
  private readonly overlayDismissalKey = 'sponsor-overlay-dismissed';

  constructor(
    private advertising: SponsorAdvertisingService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.subscription = this.advertising.ads$.subscribe((ads) => {
      this.allAds = ads || [];
      this.currentIndex = 0;
      this.refreshEligibleAds();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.clearRotation();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.refreshEligibleAds();
  }

  @HostListener('document:visibilitychange')
  onVisibilityChange(): void {
    if (document.hidden) {
      this.clearRotation();
    } else {
      this.scheduleRotation();
    }
  }

  dismissOverlay(): void {
    if (this.location !== 'Overlay') return;
    sessionStorage.setItem(this.overlayDismissalKey, 'true');
    this.clearRotation();
    this.currentAd = undefined;
    this.currentContent = undefined;
  }

  private refreshEligibleAds(): void {
    if (this.location === 'Overlay' && sessionStorage.getItem(this.overlayDismissalKey) === 'true') {
      this.eligibleAds = [];
    } else {
      const mobileBottom = this.location === 'Bottom' && window.innerWidth < 1100;
      const locations: SponsorAdLocation[] = mobileBottom ? ['Bottom', 'Left', 'Right'] : [this.location];
      this.eligibleAds = this.allAds.filter((ad) => ad.Locations?.some((location) => locations.includes(location)));
    }

    if (this.currentIndex >= this.eligibleAds.length) this.currentIndex = 0;
    this.showCurrentAd();
  }

  private showCurrentAd(): void {
    this.clearRotation();
    this.currentAd = this.eligibleAds[this.currentIndex];
    this.currentContent = this.currentAd
      ? this.sanitizer.bypassSecurityTrustHtml(this.currentAd.ContentHtml)
      : undefined;
    this.scheduleRotation();
  }

  private scheduleRotation(): void {
    this.clearRotation();
    if (document.hidden || this.eligibleAds.length < 2 || !this.currentAd) return;
    const seconds = Math.max(3, this.currentAd.RotationSeconds || 10);
    this.rotationTimer = window.setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.eligibleAds.length;
      this.showCurrentAd();
    }, seconds * 1000);
  }

  private clearRotation(): void {
    if (this.rotationTimer) window.clearTimeout(this.rotationTimer);
    this.rotationTimer = undefined;
  }
}
