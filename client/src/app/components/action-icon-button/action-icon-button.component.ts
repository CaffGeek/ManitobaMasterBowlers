import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type ActionVariant = 'edit' | 'save' | 'cancel' | 'delete' | 'neutral';

@Component({
  selector: 'app-action-icon-button',
  templateUrl: './action-icon-button.component.html',
  styleUrls: ['./action-icon-button.component.css'],
  standalone: false,
})
export class ActionIconButtonComponent {
  @Input() icon!: IconProp;
  @Input() variant: ActionVariant = 'neutral';
  @Input() ariaLabel = '';
  @Input() title = '';
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' = 'button';
  @Input() hideBorder = false;
  @Output() action = new EventEmitter<void>();
}
