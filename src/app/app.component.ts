import { Component, OnInit } from '@angular/core';
import { CountdownService } from './services/countdown.service';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  countdownList$: Observable<{ date: Date, isEdit?: boolean }[]>;

  constructor(
    private countdownService: CountdownService,
    titleService: Title,
  ) {
    titleService.setTitle('Countdown Until');
  }

  ngOnInit(): void {
    this.countdownList$ = this.countdownService.getTargetTimeList().pipe(
      map((dateList) => {
        return dateList.map((date) => ({ date, isEdit: false }));
      }),
    );
  }

  addItem(payload: Date): void {
    this.countdownService.addTargetTime(payload);
  }

  deleteItem(index: number): void {
    this.countdownService.deleteTargetTimeByIndex(index);
  }
}
