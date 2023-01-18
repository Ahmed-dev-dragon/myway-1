import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { GestionGroupComponent } from './gestion-group/gestion-group.component';
import { GestionMembersComponent } from './gestion-members/gestion-members.component';
import { GestionMenuComponent } from './gestion-menu/gestion-menu.component';
import { GestionTracesComponent } from './gestion-traces/gestion-traces.component';
import { GestionUsersComponent } from './gestion-users/gestion-users.component';


@NgModule({
  declarations: [
    GestionGroupComponent,
    GestionMembersComponent,
    GestionMenuComponent,
    GestionTracesComponent,
    GestionUsersComponent
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule
  ]
})
export class ConfigurationModule { }
