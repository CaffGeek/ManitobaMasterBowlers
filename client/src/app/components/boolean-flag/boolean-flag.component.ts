import { Component, Input } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-boolean-flag',
  templateUrl: './boolean-flag.component.html',
  styleUrls: ['./boolean-flag.component.css'],
  standalone: false,
})
export class BooleanFlagComponent {
  @Input() value = false;
  @Input() ariaLabel = '';

  faCheck = faCheck;
}
