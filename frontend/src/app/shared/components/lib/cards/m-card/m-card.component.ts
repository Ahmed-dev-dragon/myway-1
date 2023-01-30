import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-m-card',
  templateUrl: './m-card.component.html',
  styleUrls: ['./m-card.component.scss'],
})
export class MCardComponent {
  @Output() darkMode:boolean= false;;
}
