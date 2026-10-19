import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MEDIA_MAX_UPLOAD_BYTES, MEDIA_MAX_UPLOAD_MB } from '../../constants/media';
import {
  SponsorAdLocation,
  SponsorAdPlacementRecord,
  SponsorAdRecord,
  SponsorPageMatchType,
  SponsorRecord,
} from '@models/SponsorRecord';
import { ApiService } from '@services/api.service';
import { ConfirmDialogService } from '@services/confirm-dialog.service';
import { ToastService } from '@services/toast.service';

@Component({
  selector: 'app-sponsors-page',
  templateUrl: './sponsors-page.component.html',
  styleUrls: ['./sponsors-page.component.css'],
  standalone: false,
})
export class SponsorsPageComponent implements OnInit {
  readonly locations: SponsorAdLocation[] = ['Top', 'Bottom', 'Left', 'Right', 'Overlay'];
  readonly matchTypes: SponsorPageMatchType[] = ['All', 'Exact', 'Prefix', 'Sitemap'];
  sponsors: SponsorRecord[] = [];
  selectedSponsor?: SponsorRecord;
  sponsorModel = this.emptySponsor();
  adModel?: SponsorAdRecord;
  showSponsorEditor = true;
  isSaving = false;
  editorApiKey = environment.tinymceApiKey;
  editorInit = {
    base_url: this.getBasePath(),
    document_base_url: this.getDocumentBaseUrl(),
    plugins: 'table paste lists link code image',
    menubar: 'file edit view insert format table tools',
    toolbar: 'undo redo | styles | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table | link image | paste | code',
    image_dimensions: true,
    object_resizing: 'img',
    image_toolbar: 'imageoptions',
    convert_urls: false,
    relative_urls: false,
    remove_script_host: false,
    paste_data_images: true,
    automatic_uploads: true,
    height: 340,
    images_upload_handler: (blobInfo, _progress) => new Promise<string>((resolve, reject) => {
      const blob = blobInfo.blob();
      if ((blob?.size || 0) > MEDIA_MAX_UPLOAD_BYTES) {
        reject(`File too large. Maximum size is ${MEDIA_MAX_UPLOAD_MB}MB.`);
        return;
      }
      this.api.uploadMedia({
        fileName: blobInfo.filename(),
        contentType: blob?.type || 'application/octet-stream',
        dataBase64: blobInfo.base64(),
        prefix: 'sponsors',
      }).subscribe({
        next: (response: any) => response?.url ? resolve(response.url) : reject('Upload failed'),
        error: () => reject('Upload failed'),
      });
    }),
  };

  constructor(
    private api: ApiService,
    private toasts: ToastService,
    private confirm: ConfirmDialogService
  ) {}

  ngOnInit(): void {
    this.loadSponsors();
  }

  selectSponsor(sponsor: SponsorRecord): void {
    this.selectedSponsor = sponsor;
    this.sponsorModel = { ...sponsor, Ads: sponsor.Ads || [] };
    this.adModel = undefined;
    this.showSponsorEditor = false;
  }

  newSponsor(): void {
    this.selectedSponsor = undefined;
    this.sponsorModel = this.emptySponsor();
    this.adModel = undefined;
    this.showSponsorEditor = true;
  }

  editSponsor(): void {
    this.showSponsorEditor = true;
  }

  cancelSponsorEdit(): void {
    if (this.selectedSponsor) {
      this.sponsorModel = { ...this.selectedSponsor, Ads: this.selectedSponsor.Ads || [] };
      this.showSponsorEditor = false;
      return;
    }
    this.newSponsor();
  }

  saveSponsor(): void {
    if (!this.sponsorModel.Name.trim()) {
      this.toasts.show('Sponsor name is required.', 'error');
      return;
    }
    this.isSaving = true;
    const operation = this.sponsorModel.Id
      ? this.api.updateSponsor(this.sponsorModel.Id, this.sponsorModel)
      : this.api.createSponsor(this.sponsorModel);
    operation.subscribe({
      next: (result: any) => {
        const selectedId = this.sponsorModel.Id || result?.Id;
        this.toasts.show('Sponsor saved.', 'success');
        this.showSponsorEditor = false;
        this.loadSponsors(selectedId);
        this.isSaving = false;
      },
      error: () => this.isSaving = false,
    });
  }

  deleteSponsor(): void {
    if (!this.sponsorModel.Id) return;
    this.confirm.confirm({
      title: 'Delete sponsor',
      message: `Delete ${this.sponsorModel.Name} and all of its ads?`,
      confirmText: 'Delete',
    }).subscribe((confirmed) => {
      if (!confirmed || !this.sponsorModel.Id) return;
      this.api.deleteSponsor(this.sponsorModel.Id).subscribe(() => {
        this.toasts.show('Sponsor deleted.', 'success');
        this.newSponsor();
        this.loadSponsors();
      });
    });
  }

  newAd(): void {
    if (!this.sponsorModel.Id) {
      this.toasts.show('Save the sponsor before adding an ad.', 'info');
      return;
    }
    this.adModel = this.emptyAd(this.sponsorModel.Id);
  }

  editAd(ad: SponsorAdRecord): void {
    this.adModel = {
      ...ad,
      StartDate: this.toInputValue(ad.StartDate),
      EndDate: this.toInputValue(ad.EndDate),
      Placements: (ad.Placements || []).map((placement) => ({ ...placement })),
    };
  }

  cancelAd(): void {
    this.adModel = undefined;
  }

  addPlacement(): void {
    this.adModel?.Placements?.push(this.emptyPlacement());
  }

  removePlacement(index: number): void {
    this.adModel?.Placements?.splice(index, 1);
  }

  saveAd(): void {
    if (!this.adModel) return;
    if (!this.adModel.Name.trim() || !this.adModel.ContentHtml.trim()) {
      this.toasts.show('Ad name and content are required.', 'error');
      return;
    }
    if (!this.adModel.Placements?.length) {
      this.toasts.show('Add at least one placement.', 'error');
      return;
    }
    const invalidPlacement = this.adModel.Placements.some((placement) =>
      placement.PageMatchType !== 'All' && !placement.PageValue?.trim()
    );
    if (invalidPlacement) {
      this.toasts.show('Page value is required for exact, prefix, and sitemap placements.', 'error');
      return;
    }

    const payload: SponsorAdRecord = {
      ...this.adModel,
      StartDate: this.toIsoValue(this.adModel.StartDate),
      EndDate: this.toIsoValue(this.adModel.EndDate),
      RotationSeconds: this.adModel.RotationSeconds || null,
      Placements: this.adModel.Placements.map((placement) => ({
        ...placement,
        PageValue: placement.PageMatchType === 'All' ? null : placement.PageValue?.trim(),
      })),
    };
    this.isSaving = true;
    const operation = payload.Id
      ? this.api.updateSponsorAd(payload.Id, payload)
      : this.api.createSponsorAd(payload);
    operation.subscribe({
      next: () => {
        this.toasts.show('Sponsor ad saved.', 'success');
        const sponsorId = payload.SponsorId;
        this.adModel = undefined;
        this.loadSponsors(sponsorId);
        this.isSaving = false;
      },
      error: () => this.isSaving = false,
    });
  }

  deleteAd(): void {
    if (!this.adModel?.Id) return;
    const adId = this.adModel.Id;
    const sponsorId = this.adModel.SponsorId;
    this.confirm.confirm({
      title: 'Delete sponsor ad',
      message: `Delete ${this.adModel.Name}?`,
      confirmText: 'Delete',
    }).subscribe((confirmed) => {
      if (!confirmed) return;
      this.api.deleteSponsorAd(adId).subscribe(() => {
        this.toasts.show('Sponsor ad deleted.', 'success');
        this.adModel = undefined;
        this.loadSponsors(sponsorId);
      });
    });
  }

  placementDescription(placement: SponsorAdPlacementRecord): string {
    const page = placement.PageMatchType === 'All' ? 'all pages' : `${placement.PageMatchType.toLowerCase()} ${placement.PageValue}`;
    return `${placement.Location} · ${page}`;
  }

  adStatus(ad: SponsorAdRecord): 'Active' | 'Scheduled' | 'Expired' | 'Inactive' {
    if (!ad.IsActive) return 'Inactive';

    const now = Date.now();
    const start = this.dateValue(ad.StartDate);
    const end = this.dateValue(ad.EndDate);
    if (start !== null && start > now) return 'Scheduled';
    if (end !== null && end < now) return 'Expired';
    return 'Active';
  }

  adStatusClass(ad: SponsorAdRecord): string {
    return this.adStatus(ad).toLowerCase();
  }

  private loadSponsors(selectedId?: number): void {
    this.api.sponsors$().subscribe({
      next: (sponsors) => {
        this.sponsors = sponsors || [];
        if (selectedId) {
          const selected = this.sponsors.find((sponsor) => sponsor.Id === selectedId);
          if (selected) this.selectSponsor(selected);
        }
      },
      error: () => this.toasts.show('Could not load sponsors.', 'error'),
    });
  }

  private emptySponsor(): SponsorRecord {
    return { Name: '', WebsiteUrl: '', DefaultLogoUrl: '', Notes: '', IsActive: true, Ads: [] };
  }

  private emptyAd(sponsorId: number): SponsorAdRecord {
    return {
      SponsorId: sponsorId,
      Name: '',
      ContentHtml: '',
      StartDate: '',
      EndDate: '',
      IsActive: true,
      Priority: 0,
      RotationSeconds: 10,
      Placements: [this.emptyPlacement()],
    };
  }

  private emptyPlacement(): SponsorAdPlacementRecord {
    return { Location: 'Bottom', PageMatchType: 'All', PageValue: '', SortOrder: 0 };
  }

  private toInputValue(value?: string | null): string {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    const pad = (part: number) => part.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  private dateValue(value?: string | null): number | null {
    if (!value) return null;
    const valueOf = new Date(value).getTime();
    return Number.isNaN(valueOf) ? null : valueOf;
  }

  private toIsoValue(value?: string | null): string | null {
    if (!value) return null;
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
  }

  private getBasePath(): string {
    const baseHref = document.querySelector('base')?.getAttribute('href') || '/';
    const trimmed = baseHref.endsWith('/') && baseHref.length > 1 ? baseHref.slice(0, -1) : baseHref;
    return `${trimmed === '/' ? '' : trimmed}/assets/tinymce`;
  }

  private getDocumentBaseUrl(): string {
    const baseHref = document.querySelector('base')?.getAttribute('href') || '/';
    return `${window.location.origin}${baseHref.endsWith('/') ? baseHref : `${baseHref}/`}`;
  }
}
