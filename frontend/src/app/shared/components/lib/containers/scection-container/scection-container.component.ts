import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tow-scection-containers',
  templateUrl: './scection-container.component.html',
  styleUrls: ['./scection-container.component.scss'],
})
export class ScectionContainersComponent {
  @Input() col: number[] = [];

  constructor() {}
  ngOnInit(): void {}
}
