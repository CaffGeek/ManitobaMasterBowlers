import { Component, OnInit } from '@angular/core';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '@services/api.service';
import { AnnouncementRecord } from '@models/AnnouncementRecord';
import { ToastService } from '@services/toast.service';

type AnnouncementInput = {
  Announcement: string;
  StartDate: string;
  EndDate: string;
};

@Component({
  selector: 'app-announcements-page',
  templateUrl: './announcements-page.component.html',
  styleUrls: ['./announcements-page.component.css'],
  standalone: false,
})
export class AnnouncementsPageComponent implements OnInit {
  faPen = faPen;
  faTrash = faTrash;
  announcements: AnnouncementRecord[] = [];
  editId?: number;
  editModel: AnnouncementInput = { Announcement: '', StartDate: '', EndDate: '' };
  newModel: AnnouncementInput = { Announcement: '', StartDate: '', EndDate: '' };
  editorMode: 'new' | 'edit' = 'new';
  editorModel: AnnouncementInput = { Announcement: '', StartDate: '', EndDate: '' };
  isSaving = false;

  constructor(private api: ApiService, private toasts: ToastService) {}

  ngOnInit(): void {
    this.editorModel = { ...this.newModel };
    this.loadAnnouncements();
  }

  startEdit(item: AnnouncementRecord): void {
    this.editId = item.Id;
    this.editorMode = 'edit';
    this.editModel = {
      Announcement: item.Announcement || '',
      StartDate: this.toInputValue(item.StartDate),
      EndDate: this.toInputValue(item.EndDate),
    };
    this.editorModel = { ...this.editModel };
  }

  cancelEdit(): void {
    this.editId = undefined;
    this.editorMode = 'new';
    this.editModel = { Announcement: '', StartDate: '', EndDate: '' };
    this.editorModel = { ...this.newModel };
  }

  startNew(): void {
    this.editorMode = 'new';
    this.editId = undefined;
    this.newModel = { Announcement: '', StartDate: '', EndDate: '' };
    this.editorModel = { ...this.newModel };
  }

  saveEdit(): void {
    if (!this.editId) {
      return;
    }
    const payload = this.toPayload(this.editorModel);
    if (!payload.Announcement) {
      this.toasts.show('Announcement is required.', 'error');
      return;
    }

    this.isSaving = true;
    this.api.updateAnnouncement(this.editId, payload).subscribe({
      next: () => {
        this.toasts.show('Announcement updated.', 'success');
        this.cancelEdit();
        this.loadAnnouncements();
        this.isSaving = false;
      },
      error: () => {
        this.toasts.show('Update failed. Please try again.', 'error');
        this.isSaving = false;
      },
    });
  }

  createAnnouncement(): void {
    const payload = this.toPayload(this.editorModel);
    if (!payload.Announcement) {
      this.toasts.show('Announcement is required.', 'error');
      return;
    }

    this.isSaving = true;
    this.api.createAnnouncement(payload).subscribe({
      next: () => {
        this.toasts.show('Announcement created.', 'success');
        this.newModel = { Announcement: '', StartDate: '', EndDate: '' };
        this.editorModel = { ...this.newModel };
        this.loadAnnouncements();
        this.isSaving = false;
      },
      error: () => {
        this.toasts.show('Create failed. Please try again.', 'error');
        this.isSaving = false;
      },
    });
  }

  confirmDelete(item: AnnouncementRecord): void {
    const ok = confirm('Delete this announcement?');
    if (!ok) {
      return;
    }

    this.api.deleteAnnouncement(item.Id).subscribe({
      next: () => {
        this.toasts.show('Announcement deleted.', 'success');
        this.loadAnnouncements();
      },
      error: () => {
        this.toasts.show('Delete failed. Please try again.', 'error');
      },
    });
  }

  private loadAnnouncements(): void {
    this.api.announcements$().subscribe({
      next: (items) => {
        const now = new Date();
        this.announcements = (items || [])
          .filter((item) => this.isActiveOrFuture(item, now))
          .sort((a, b) => (this.toDate(a.StartDate)?.getTime() || 0) - (this.toDate(b.StartDate)?.getTime() || 0));
      },
      error: () => {
        this.toasts.show('Could not load announcements.', 'error');
      },
    });
  }

  private toPayload(input: AnnouncementInput): Partial<AnnouncementRecord> {
    return {
      Announcement: input.Announcement.trim(),
      StartDate: input.StartDate ? new Date(input.StartDate).toISOString() : null,
      EndDate: input.EndDate ? new Date(input.EndDate).toISOString() : null,
    };
  }

  private toInputValue(value?: string | null): string {
    if (!value) {
      return '';
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return '';
    }
    const pad = (v: number) => v.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  private isActiveOrFuture(item: AnnouncementRecord, now: Date): boolean {
    const end = this.toDate(item.EndDate);
    if (end && end < now) {
      return false;
    }
    return true;
  }

  private toDate(value?: string | null): Date | null {
    if (!value) {
      return null;
    }
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }
}
