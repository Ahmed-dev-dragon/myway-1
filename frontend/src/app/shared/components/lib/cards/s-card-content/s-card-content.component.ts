import { Component, Input, OnInit } from '@angular/core';
import { SCardSInfoInterface } from '../s-card-s-ifno/s-card-s-info-Interfaces';

@Component({
  selector: 'card-content',
  templateUrl: './s-card-content.component.html',
  styleUrls: ['./s-card-content.component.scss'],
})
export class SCardContentComponent implements OnInit {
  @Input() index: number = 0;
  @Input() data: SCardSInfoInterface = {
    title: 'orders',
    sideIcon: 'bi bi-bookmark',
    CN: 64,
    changeCN: 4.02,
    changeCnUnit: '%',
    changeCnIcon: 'bi bi-activity',
    changeCnTime: 'Since last week',
  };
  saveF(i: number) {
    this.data.saved = !this.data.saved;
  }
  ngOnInit(): void {}
}
