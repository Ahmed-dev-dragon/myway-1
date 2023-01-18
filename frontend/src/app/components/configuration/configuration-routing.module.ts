import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { AddGroupComponent } from './gestion-group/add-group/add-group.component';
import { ListGroupComponent } from './gestion-group/list-group/list-group.component';
import { AddMemberComponent } from './gestion-members/add-member/add-member.component';
import { DetailMemberComponent } from './gestion-members/detail-member/detail-member.component';
import { ListMembersComponent } from './gestion-members/list-members/list-members.component';
import { GestionMenuComponent } from './gestion-menu/gestion-menu.component';
import { AddUserComponent } from './gestion-users/add-user/add-user.component';
import { DetailUserComponent } from './gestion-users/detail-user/detail-user.component';
import { ListUsersComponent } from './gestion-users/list-users/list-users.component';
const routes: Routes = [
  {
    path: 'menu-admin',
    component: GestionMenuComponent,
    data: {
      title: 'gestion menu espace administration',
      breadcrumb: 'configuration/menu admin',
      breadcrumbURLs: ['/menu-admin'],
    },
    // canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    children: [
      {
        path: 'myProfile/:id',
        component: DetailUserComponent,
        data: {
          title: 'mon profile',
          breadcrumb: 'configuration/myProfile',
          breadcrumbURLs: ['/myProfile'],
        },
        // canActivate: [AuthGuard],
      },
      {
        path: 'edit/:id',
        component: AddUserComponent,
        data: {
          title: 'modification du profile',
          breadcrumb: 'configuration/edit',
          breadcrumbURLs: ['/edit'],
        },
        // canActivate: [AuthGuard],
      },
    ],
    data: {
      title: 'gestion de profile',
      breadcrumb: 'configuration/profile',
      breadcrumbURLs: ['/profile'],
    },
  },
  {
    path: 'groups',
    children: [
      {
        path: '',
        component: ListGroupComponent,
        data: {
          title: 'list des groupes',
          breadcrumb: "configuration/droits d'acces",
          breadcrumbURLs: ['/groups'],
        },
        // canActivate: [AuthGuard],
      },
      {
        path: 'add',
        component: AddGroupComponent,
        data: {
          title: 'add group',
          breadcrumb: "configuration/droits d'acces",
          breadcrumbURLs: ['/groups'],
        },
        // canActivate: [AuthGuard],
      },
      {
        path: 'edit/:id',
        component: AddGroupComponent,
        data: {
          title: 'edit group',
          breadcrumb: 'configuration/group/edit-group',
          breadcrumbURLs: ['/groups'],
        },
        // canActivate: [AuthGuard],
      },
      {
        path: 'clone/:id',
        component: AddGroupComponent,
        data: {
          title: 'clone group',
          breadcrumb: 'configuration/group/clone-group',
          breadcrumbURLs: ['/groups'],
        },
        // canActivate: [AuthGuard],
      },
    ],
    data: {
      title: 'gestion des groups',
      breadcrumb: 'configuration/groups',
      breadcrumbURLs: ['/groups'],
    },
  },
  {
    path: 'users',
    children: [
      {
        path: '',
        component: ListUsersComponent,
        data: {
          title: 'titles.lstUsers',
          breadcrumb: 'titles.lstUsers',
          breadcrumbURLs: [],
        },
        // canActivate: [AuthGuard],
      },
      {
        path: 'add',
        component: AddUserComponent,
        data: {
          title: 'titles.adUser',
          breadcrumb: 'titles.lstUsers/titles.adUser',
          breadcrumbURLs: ['/gestion/users'],
        },
        // canActivate: [AuthGuard],
      },
      {
        path: 'detail/:id',
        component: DetailUserComponent,
        data: {
          title: 'titles.dtUser',
          breadcrumb: 'titles.lstUsers/titles.dtUser',
          breadcrumbURLs: ['/gestion/users'],
          service: 'user',
          type: 'detail',
        },
        // canActivate: [AuthGuard],
      },
      {
        path: 'edit/:id',
        component: AddUserComponent,
        data: {
          title: 'titles.prfEdit',
          breadcrumb: 'titles.lstUsers/titles.edUser',
          breadcrumbURLs: ['/gestion/users'],
        },
        // canActivate: [AuthGuard],
      },
      {
        path: 'clone/:id',
        component: AddUserComponent,
        data: {
          title: 'titles.colone',
          breadcrumb: 'titles.lstUsers/titles.clone',
          breadcrumbURLs: ['/gestion/users'],
        },
        // canActivate: [AuthGuard],
      },
    ],
    data: {
      title: 'gestion des utilisateurs',
      breadcrumb: "configuration/droits d'acces",
      breadcrumbURLs: ['/droits-acces'],
    },
  },
  {
    path: 'members',
    children: [
      {
        path: '',
        component: ListMembersComponent,
        data: {
          title: 'list des members',
          breadcrumb: 'configuration/members',
          breadcrumbURLs: [],
        },
        // canActivate: [AuthGuard],
      },
      {
        path: 'add',
        component: AddMemberComponent,
        data: {
          title: 'add member',
          breadcrumb: 'configuration/members/add member',
          breadcrumbURLs: ['', 'configuration/members'],
        },
        // canActivate: [AuthGuard],
      },
      {
        path: 'edit/:id',
        component: AddMemberComponent,
        data: {
          title: 'edit member',
          breadcrumb: 'configuration/member/edit member',
          breadcrumbURLs: ['', 'configuration/members'],
        },
        // canActivate: [AuthGuard],
      },
      {
        path: 'detail/:id',
        component: DetailMemberComponent,
        data: {
          title: 'detail member',
          breadcrumb: 'configuration/member/detail ',
          breadcrumbURLs: ['', 'configuration/members'],
        },
        // canActivate: [AuthGuard],
      },
      {
        path: 'clone/:id',
        component: AddMemberComponent,
        data: {
          title: 'clone member',
          breadcrumb: 'configuration/member/clone member',
          breadcrumbURLs: ['', 'configuration/members'],
        },
        // canActivate: [AuthGuard],
      },
    ],
    data: {
      title: 'gestion des members',
      breadcrumb: 'configuration/members',
      breadcrumbURLs: [],
    },
  },
  // {
  //   path: 'teams',
  //   children: [
  //     {
  //       path: '',
  //       component: ListGroupComponent,
  //       data: {
  //         title: "list des groupes",
  //         breadcrumb: "configuration/droits d'acces",
  //         breadcrumbURLs: ['/droits-acces'],
  //       },
  //       // canActivate: [AuthGuard],
  //     },
  //     {
  //       path: 'add',
  //       component: AddGroupComponent,
  //       data: {
  //         title: "add group",
  //         breadcrumb: "configuration/droits d'acces",
  //         breadcrumbURLs: ['/droits-acces'],
  //       },
  //       // canActivate: [AuthGuard],
  //     },
  //     {
  //       path: 'edit/:id',
  //       component: AddGroupComponent,
  //       data: {
  //         title: "edit group",
  //         breadcrumb: "configuration/group/edit-group",
  //         breadcrumbURLs: ['/droits-acces'],
  //       },
  //       // canActivate: [AuthGuard],
  //     },
  //     {
  //       path: 'clone/:id',
  //       component: AddGroupComponent,
  //       data: {
  //         title: "clone group",
  //         breadcrumb: "configuration/group/clone-group",
  //         breadcrumbURLs: ['/droits-acces'],
  //       },
  //       // canActivate: [AuthGuard],
  //     },
  //   ],
  //   data: {
  //     title: "gestion des droits d'acces",
  //     breadcrumb: "configuration/droits d'acces",
  //     breadcrumbURLs: ['/droits-acces'],
  //   },
  // },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationRoutingModule {}
