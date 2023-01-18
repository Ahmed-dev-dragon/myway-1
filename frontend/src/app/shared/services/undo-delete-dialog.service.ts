import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UndoDeleteDialogService {
  private _showUndoDeleteDialog = false;
  private _remainingSeconds = 5;
  private _timeOut = 5;
  private _timerId: any = null;

  result = new EventEmitter();

  constructor() {}

  private _clearTimer() {
    this.result = new EventEmitter();
    clearInterval(this._timerId);
    this._timerId = null;
  }

  private _startTimer(timeout: number) {
    this._showUndoDeleteDialog = true;
    this._remainingSeconds = timeout;
    this._timeOut = timeout;
    this._timerId = setInterval(() => {
      this._remainingSeconds -= 0.25;
      if (this.remainingSeconds == 0) {
        setTimeout(() => {
          this.result.emit({ result: 'timeout' });
        }, 100);
      }
    }, 250);
  }

  showDialog(
    cb: (event: { result: 'timeout' | 'undo button clicked' }) => void,
    timeout: number = 5
  ) {
    if (!this._timerId) {
      this.result.subscribe({
        next: (result: any) => {
          this._clearTimer();
          this._showUndoDeleteDialog = false;
          cb(result);
        },
        error: (error: any) => {
          this._clearTimer();
          this._showUndoDeleteDialog = false;
          cb(error);
        },
      });

      this._startTimer(timeout);
    }
  }

  get showUndoDeleteDialog() {
    return this._showUndoDeleteDialog;
  }

  get remainingSeconds() {
    return Math.ceil(this._remainingSeconds);
  }

  get remainingPercentage() {
    return (this._remainingSeconds / this._timeOut) * 100;
  }
}
