import { Component } from '@angular/core';
@Component({
  selector: 's-card-contianer',
  template: `
    <!-- <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-6 ">
          <div class="card hover-lift hover-shadow-xl shadow-sm border-0  mb-3">
            <div class=" card s-shadow-2">
              <div class="card-body ">
                <ng-content></ng-content>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->




          <div class=" card s-shadow-2">
            <div class="card-body ">
              <ng-content></ng-content>
            </div>
          </div>



  `,
  styles: [
    '.shadow-sm {box-shadow:  0 .125rem .25rem inset .75rem 0px 1.5rem 0px rgba(rgb(20, 20, 20), 0.075) !important;}',
    '.s-shadow-2 {  margin: 0px !important; box-shadow: inset .75rem 0px 1.5rem 0px rgba(#000, 0.075);}',

  ],
})
export class CardContianerComponent {}
