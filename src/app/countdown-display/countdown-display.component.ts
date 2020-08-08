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
  @Output() deleteTime = new EventEmitter<void>();

  timeUntilString: string;

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
      const now = new Date();
      const deltaHour = Math.abs(this.targetTime.getHours() - now.getHours());
      const deltaMinute = Math.abs(this.targetTime.getMinutes() - now.getMinutes());
      const deltaSecond = Math.abs(59 - now.getSeconds());
      const isPast = moment(this.targetTime).isBefore();
      this.timeUntilString = `${isPast ? '-' : ''}${deltaHour.toString().padStart(2, '0')}:${deltaMinute.toString().padStart(2, '0')}:${deltaSecond.toString().padStart(2, '0')}`;
    });
  }

}
