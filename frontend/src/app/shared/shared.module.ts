import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LazyLoadImageModule } from 'ng-lazyload-image' // <-- import it
import { CardRecruiterComponent } from './components/card-recruiter/card-recruiter.component'
import { ContentLayoutComponent } from './components/layouts/content-layout.component'
import { RouterModule } from '@angular/router'
import { AccordionModule } from 'primeng/accordion'
import { ButtonModule } from 'primeng/button'
<<<<<<< HEAD
import { RippleModule } from 'primeng/ripple'
import { TabViewModule } from 'primeng/tabview'
=======
import { RippleModule } from 'primeng/ripple';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component'
>>>>>>> 1af607a919ca33eae8d92e955e9e03eeb018f5e6

import { TabMenuModule } from 'primeng/tabmenu'
import { CardInfoSmall } from './components/card-info-small/card-info-small.component'
import { ReactiveFormsModule } from '@angular/forms'
let modules = [
  AccordionModule,
  ButtonModule,
  RippleModule,
  TabMenuModule,
  TabViewModule,
  ReactiveFormsModule,
]
@NgModule({
<<<<<<< HEAD
  declarations: [CardRecruiterComponent, CardInfoSmall, ContentLayoutComponent],
=======
  declarations: [CardRecruiterComponent, ContentLayoutComponent, NavbarComponent, FooterComponent],
>>>>>>> 1af607a919ca33eae8d92e955e9e03eeb018f5e6
  imports: [LazyLoadImageModule, CommonModule, RouterModule, ...modules],
  exports: [
    CardRecruiterComponent,
    CardInfoSmall,

    LazyLoadImageModule,
    CommonModule,
    ContentLayoutComponent,
    ...modules,
  ],
})
export class SharedModule {}
