import { Component, Input } from '@angular/core';

@Component({
  selector: 's-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent {
  @Input() name: string = 'name';
  @Input() autoClose: boolean = true;
}
