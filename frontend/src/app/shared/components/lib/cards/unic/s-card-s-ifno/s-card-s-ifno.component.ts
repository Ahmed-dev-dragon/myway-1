import { Component, Input, OnInit } from '@angular/core';
import { SCardSInfoInterface } from './s-card-s-info-Interfaces';

@Component({
  selector: 's-card',
  templateUrl: './s-card-s-ifno.component.html',
  styleUrls: ['./s-card-s-ifno.component.scss'],
})
export class SCardSIfnoComponent implements OnInit {
  dataIsAnArry: boolean = true;
  @Input() data: SCardSInfoInterface[] = [
    {
      title: '((title=>"orders"))',
      sideIcon: 'sideIcon',
      CN: '((cn =>64))',
      changeCN: '((changeCN=>"4.02"))',
      changeCnUnit: '((changeCnUnit =>"%"))',
      changeCnIcon: 'changeCnIcon',
      changeCnTime: '((changeCnTime => "Since last week"))',
    },
    {
      title: 'orders',
      sideIcon: 'bi bi-bookmark',
      CN: 64,
      changeCN: 4.02,
      changeCnUnit: '%',
      changeCnIcon: 'bi bi-activity',
      changeCnTime: 'Since last week',
    },
  ];
  saveF(i: number) {
    this.data[i].saved = !this.data[i].saved;
  }
  ngOnInit(): void {}
}
