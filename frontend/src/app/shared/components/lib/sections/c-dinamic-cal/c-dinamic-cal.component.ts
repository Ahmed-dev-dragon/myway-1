import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-c-dinamic-cal',
  templateUrl: './c-dinamic-cal.component.html',
  styleUrls: ['./c-dinamic-cal.component.scss'],
})
export class CDinamicCalComponent {
  @Input() data: any[] = ['', '', '', ''];
  @Input() height: string = '500px';
}
