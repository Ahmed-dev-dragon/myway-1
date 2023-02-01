import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: '<app-dommy-form>',
  templateUrl: './dommy-form.component.html',
  styleUrls: ['./dommy-form.component.scss'],
})
export class DommyFormComponent {
  @Output() timeLineUpdate: any = new EventEmitter();
  @Input() i: number = 0;
  @Input() itoms: number = 0;
  allUpDates: any = { valid: false, tab: '' };
  ngOnInit(): void {}

  add() {
    this.allUpDates.valid = true;
    this.timeLineUpdate.emit(this.allUpDates);
  }

  per() {
    this.allUpDates.tab = 'pre';
    this.timeLineUpdate.emit(this.allUpDates);
  }

  next() {
    this.allUpDates.tab = 'next';
    this.timeLineUpdate.emit(this.allUpDates);
  }
}

