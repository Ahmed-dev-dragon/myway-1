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
  debuging: any;

  curontLine: number = 0;
  @Input() itoms: any[] = [];
  @Input() valide: boolean = false;
  @Input() between: string = '180px';
  ngOnInit() {
    this.itoms = [
      {
        title: 'Stipes',
        icon: 'pi pi-check',
        sutitle: 'Stipes',
        valid: false,
        show: true,
      },
      {
        title: 'Stipes',
        icon: 'pi pi-check',
        sutitle: 'Stipes',
        valid: false,
        show: false,
      },
      {
        title: 'Stipes',
        icon: 'pi pi-check',
        sutitle: 'Stipes',
        valid: false,
        show: false,
      },
      {
        title: 'Stipes',
        icon: 'pi pi-check',
        sutitle: 'Stipes',

        valid: false,
        show: false,
      },
    ];
    this.itoms[0].show = true;
    this.itoms.map((o, i) => {
      o.valid == false
        ? ((this.itoms[i + 1].show = false), (this.itoms[i + 1].valid = false))
        : '';
    });
  }

  nextTimeLine() {}
  timeLineUpdateF(d: any, i: number) {
    this.debuging = [d, i + 1];

    if (d.tab == 'next') {

      this.showTab(i+1)
    }
    if (d.tab == 'pre') {
      this.showTab(i-1);
    }
  }

  showTab(index: number) {
    this.itoms.map((o, i) => {
      if (index != i) {
        o.show = false;
      } else {
        o.show = true;
      }
    });
  }


  toggleComplete() {
    this.valide ? this.curontLine++ : this.curontLine;
  }
}
