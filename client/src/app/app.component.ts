import { Component } from '@angular/core';
import { AnalyticsService } from '@services/analytics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent {
  title = 'Manitoba Master Bowlers';

  constructor(analytics: AnalyticsService) {
    analytics.initialize();
  }
}
