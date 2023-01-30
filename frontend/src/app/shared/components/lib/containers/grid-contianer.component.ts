import { AfterViewInit, Component, Input} from '@angular/core';
@Component({
  selector: 'card-container',
  template: `
    <div
      #div
      [ngClass]="{
        'a-s-dark-mode': darckMode,
        'a-s-shadow': shadow && !darckMode,
        'a-s-iner-shadow': inerShadow && !darckMode,
        'a-s-d-shadow': shadow && darckMode,
        'a-s-d-iner-shadow': inerShadow && darckMode,
        'a-s-in-hover': inerShadow && !darckMode && hover,
        'a-s-d-in-hover': inerShadow && darckMode && hover,
        'a-s-d-out-hover': shadow && !darckMode && hover,
        'a-s-out-hover': shadow && darckMode && hover,
        'a-s-padding': padding,
        'a-s-margin': margin,
        'a-s-border': border,
        'a-s-hover': hover
      }"
      style="border-radius :{{ borderRadius }} !important; bag-border-radius :{{ borderRadius }} ;
      background-color:{{bg}} !important;"
    >
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./style.contianer.scss'],
})
export class GridContianerComponent implements AfterViewInit {
  @Input() inerShadow: boolean = false;
  @Input() shadow: boolean = false;
  @Input() padding: boolean = true;
  @Input() margin: boolean = false;
  @Input() border: boolean = true;
  @Input() hover: boolean = true;
  @Input() darckMode: boolean = false;
  @Input() borderRadius?: string = '7px';
  @Input() style: any;
  @Input() bg :string = '#fff'

  ngAfterViewInit(): void {}
}
