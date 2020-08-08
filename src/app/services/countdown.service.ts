import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const TARGET_TIME = 'targetTime';

@Injectable({
  providedIn: 'root'
})
export class CountdownService {
  // tslint:disable-next-line: variable-name
  private _targetTime = new BehaviorSubject<Date[]>([]);

  constructor() {
    const localStorageString = localStorage.getItem(TARGET_TIME);

    if (localStorageString) {
      try {
        const savedList = JSON.parse(localStorageString);
        if (Array.isArray(savedList)) {
          this._targetTime.next(savedList.map(s => new Date(s)));
        }
      } catch (e) {
        console.error('Load from storage failed.', e);
        localStorage.clear();
      }
    }
  }

  public addTargetTime(targetTime: Date): void {
    const newTimeList = [
      ...this._targetTime.value,
      targetTime,
    ];
    this.saveToList(newTimeList);
    this._targetTime.next(newTimeList);
  }

  public getTargetTimeList(): Observable<Date[]> {
    return this._targetTime.asObservable();
  }

  public deleteTargetTimeByIndex(index: number): void {
    const newTimeList = [
      ...this._targetTime.value.filter((_, i) => i !== index),
    ];
    this.saveToList(newTimeList);
    this._targetTime.next(newTimeList);
  }

  public deleteAllTargetTime(): void {
    this._targetTime.next([]);
  }

  private saveToList(newTimeList: Date[]): void {
    localStorage.setItem(
      TARGET_TIME,
      JSON.stringify(newTimeList.map(d => d.toISOString())));
  }
}
