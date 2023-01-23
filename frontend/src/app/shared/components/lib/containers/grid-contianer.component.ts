import { Component } from '@angular/core';
@Component({
  selector: 's-contianer',
  template: `
    <div class="container">

        <ng-content>
        </ng-content>

    </div>
  `,
})
export class GridContianerComponent {}
