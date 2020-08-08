import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
          this.updateList(savedList.map(s => new Date(s)));
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
    ].sort();
    this.updateList(newTimeList);
  }

  public getTargetTimeList(): Observable<Date[]> {
    return this._targetTime.asObservable();
  }

  public deleteTargetTimeByIndex(index: number): void {
    const newTimeList = [
      ...this._targetTime.value
        .filter((_, i) => i !== index),
    ].sort();
    this.updateList(newTimeList);
  }

  public deleteAllTargetTime(): void {
    this.updateList([]);
  }

  private updateList(newTimeList: Date[]): void {
    this._targetTime.next(newTimeList.sort());
    this.saveToList(newTimeList);
  }

  private saveToList(newTimeList: Date[]): void {
    localStorage.setItem(
      TARGET_TIME,
      JSON.stringify(newTimeList.map(d => d.toISOString())));
  }
}
