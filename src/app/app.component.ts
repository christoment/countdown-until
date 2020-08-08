import { Component, OnInit } from '@angular/core';
import { CountdownService } from './services/countdown.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'countdown-until';

  countdownList$: Observable<Date[]>;

  constructor(
    private countdownService: CountdownService,
  ) {}

  ngOnInit(): void {
    this.countdownList$ = this.countdownService.getTargetTimeList();
  }

  deleteItem(index: number): void {
    this.countdownService.deleteTargetTimeByIndex(index);
  }
}
