import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AvisComponent } from './avis/avis.component'
import { DetailsRecruiterComponent } from './details-recruiter/details-recruiter.component'
import { FaqComponent } from './faq/faq.component'
import { ListRecruiterComponent } from './list-recruiter/list-recruiter.component'
import { PresentationComponent } from './presentation/presentation.component'

const routes: Routes = [
  // {
  //   path: '',
  //   component: ListRecruiterComponent,
  // },
  {
    path: 'list-recruteur',
    component: ListRecruiterComponent,
  },
  {
    path: 'details-recruteur',
    component: DetailsRecruiterComponent,
    children: [
      {
        path: '',
        redirectTo: 'presentation',
        pathMatch: 'full',
      },
      {
        path: 'presentation',
        component: PresentationComponent,
      },
      {
        path: 'faq',
        component: FaqComponent,
      },
      {
        path: 'avis',
        component: AvisComponent,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecruiterRoutingModule {}
