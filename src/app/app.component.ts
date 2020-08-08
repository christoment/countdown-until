import { Component, OnInit } from '@angular/core';
import { CountdownService } from './services/countdown.service';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  countdownList$: Observable<Date[]>;

  constructor(
    private countdownService: CountdownService,
    titleService: Title,
  ) {
    titleService.setTitle('Countdown Until');
  }

  ngOnInit(): void {
    this.countdownList$ = this.countdownService.getTargetTimeList();
  }

  deleteItem(index: number): void {
    this.countdownService.deleteTargetTimeByIndex(index);
  }
}
