import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '@services/api.service';
import { AnnouncementRecord } from '@models/AnnouncementRecord';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-announcement-banner',
  templateUrl: './announcement-banner.component.html',
  styleUrls: ['./announcement-banner.component.css'],
  standalone: false,
})
export class AnnouncementBannerComponent implements OnInit, OnDestroy {
  activeAnnouncements: AnnouncementRecord[] = [];
  activeIndex = 0;
  isDismissed = false;
  private rotationId?: number;
  private readonly dismissedStorageKey = 'announcement-banner-dismissed';

  constructor(private api: ApiService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.isDismissed = this.isDismissedForSession();

    this.api.announcements$().subscribe((announcements) => {
      const now = new Date();
      this.activeAnnouncements = (announcements || [])
        .filter((item) => this.isActive(item, now))
        .sort((a, b) => (this.toDate(a.StartDate)?.getTime() || 0) - (this.toDate(b.StartDate)?.getTime() || 0));

      this.activeIndex = 0;
      this.resetRotation();
    });
  }

  ngOnDestroy(): void {
    if (this.rotationId) {
      window.clearInterval(this.rotationId);
    }
  }

  get currentAnnouncement(): SafeHtml | null {
    const announcement = this.activeAnnouncements[this.activeIndex];
    if (!announcement?.Announcement) {
      return null;
    }
    return this.sanitizer.bypassSecurityTrustHtml(announcement.Announcement);
  }

  next(): void {
    if (this.activeAnnouncements.length < 2) {
      return;
    }
    this.activeIndex = (this.activeIndex + 1) % this.activeAnnouncements.length;
  }

  prev(): void {
    if (this.activeAnnouncements.length < 2) {
      return;
    }
    this.activeIndex = (this.activeIndex - 1 + this.activeAnnouncements.length) % this.activeAnnouncements.length;
  }

  dismiss(): void {
    this.isDismissed = true;
    if (this.rotationId) {
      window.clearInterval(this.rotationId);
      this.rotationId = undefined;
    }

    try {
      window.sessionStorage.setItem(this.dismissedStorageKey, 'true');
    } catch {
      // The in-memory state still dismisses the banner when storage is unavailable.
    }
  }

  private resetRotation(): void {
    if (this.rotationId) {
      window.clearInterval(this.rotationId);
    }
    if (this.isDismissed || this.activeAnnouncements.length < 2) {
      return;
    }
    this.rotationId = window.setInterval(() => this.next(), 8000);
  }

  private isDismissedForSession(): boolean {
    try {
      return window.sessionStorage.getItem(this.dismissedStorageKey) === 'true';
    } catch {
      return false;
    }
  }

  private isActive(item: AnnouncementRecord, now: Date): boolean {
    const start = this.toDate(item.StartDate);
    const end = this.toDate(item.EndDate);
    if (start && now < start) {
      return false;
    }
    if (end && now > end) {
      return false;
    }
    return !!item.Announcement;
  }

  private toDate(value?: string | null): Date | null {
    if (!value) {
      return null;
    }
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }
}
