import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject, interval } from 'rxjs';
import { takeUntil, startWith } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-countdown-display',
  templateUrl: './countdown-display.component.html',
  styleUrls: ['./countdown-display.component.scss']
})
export class CountdownDisplayComponent implements OnInit, OnDestroy {
  private ngDestroy$ = new Subject();

  @Input() targetTime: Date;
  @Output() editTime = new EventEmitter<void>();
  @Output() deleteTime = new EventEmitter<void>();

  timeUntilString: string;
  isFinished = false;

  constructor() { }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  ngOnInit(): void {
    interval(500).pipe(
      startWith(),
      takeUntil(this.ngDestroy$),
    ).subscribe(() => {
      const diff = moment(this.targetTime)
        .diff(new Date(), 's');
      const deltaHour = Math.floor(diff / 60 / 60);
      const deltaMinute = Math.floor((diff / 60) % 60);
      const deltaSecond = Math.floor(diff % 60);
      const isPast = moment(this.targetTime).isBefore();

      if (isPast) {
        this.timeUntilString = 'Finished';
        this.isFinished = true;
        return;
      }

      this.isFinished = false;
      this.timeUntilString = `${deltaHour.toString().padStart(2, '0')}:${deltaMinute.toString().padStart(2, '0')}:${deltaSecond.toString().padStart(2, '0')}`;
    });
  }

}
