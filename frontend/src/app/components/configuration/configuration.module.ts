import { DetailMemberComponent } from './gestion-members/detail-member/detail-member.component';
import { AddMemberComponent } from './gestion-members/add-member/add-member.component';
import { ListMembersComponent } from './gestion-members/list-members/list-members.component';


//import { MenuService } from './../../shared/services/menu.service';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { GestionMenuComponent } from './gestion-menu/gestion-menu.component';
import { AddGroupComponent } from './gestion-group/add-group/add-group.component';
import { ListGroupComponent } from './gestion-group/list-group/list-group.component';
import { AddUserComponent } from './gestion-users/add-user/add-user.component';
import { ListUsersComponent } from './gestion-users/list-users/list-users.component';
import { DetailUserComponent } from './gestion-users/detail-user/detail-user.component';
import { DetailGroupComponent } from './gestion-group/detail-group/detail-group.component';


@NgModule({
  declarations: [
    GestionMenuComponent,
    AddGroupComponent,
    ListGroupComponent,
    AddUserComponent,
    ListUsersComponent,
    DetailUserComponent,
    ListMembersComponent,
    AddMemberComponent,
    DetailMemberComponent,
    DetailGroupComponent

  ],
  imports: [
    SharedModule,
    ConfigurationRoutingModule
  ],
  // providers: [MenuService]
})
export class ConfigurationModule { }
