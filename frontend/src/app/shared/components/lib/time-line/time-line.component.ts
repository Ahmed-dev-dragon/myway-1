import { Component, Input, OnInit, ViewChildren } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.scss'],
})
export class TimeLineComponent implements OnInit {
  events2!: any[];
  events!: any[];
  s_events!: any[];
  passedDate!: any[];
  curontLine: number = 0;

  @Input() stipes: any[] = [];
  @Input() valide: boolean = false;
  ngOnInit() {


  this.stipes = [
    {
      title: 'Stipes',
      icon: 'pi pi-check',
      sutitle: 'Stipes',
    },
    {
      title: 'Stipes',
      icon: 'pi pi-check',
      sutitle: 'Stipes',
    },
    {
      title: 'Stipes',
      icon: 'pi pi-check',
      sutitle: 'Stipes',
    },
    {
      title: 'Stipes',
      icon: 'pi pi-check',
      sutitle: 'Stipes',
    },
  ];



  }

  nextTimeLine() {}

  toggleComplete() {
    this.valide ? this.curontLine++ : this.curontLine;
  }
}
