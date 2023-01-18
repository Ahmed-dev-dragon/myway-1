
import { MenuService } from './menu.service';
import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';

export interface sidebarItem extends MenuItem {
  _id: string;
  active?: boolean;
  open: boolean;
  items?: sidebarItem[];
}

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  public fullScreen: boolean = false;

  menuItems: sidebarItem[] = []
  // = [
  //   {
  //     _id: '1',
  //     routerLink: '/dashboard',
  //     routerLinkActiveOptions: { exact: true },
  //     label: 'Dashboard',
  //     icon: 'pi pi-chart-bar',
  //     active: true,
  //     open: true,
  //   },
  //   {
  //     _id: '2',

  //     routerLinkActiveOptions: { exact: true },
  //     label: 'Projects',
  //     icon: 'bi bi-journals',
  //     expanded: false,
  //     open: false,
  //     items: [{

  //       _id: '1',
  //       routerLink: ['/projects/edit/62bc4d9e329eac98eeae23a3'],
  //       routerLinkActiveOptions: { exact: true },
  //       label: 'edit Projects',
  //       icon: 'bi bi-journals',
  //       active: true,
  //       open: true,
  //     }, {
  //       _id: '2',
  //       routerLink: '/projects',
  //       routerLinkActiveOptions: { exact: true },
  //       label: 'Projects',
  //       icon: 'bi bi-journals',
  //       active: true,
  //       open: true,
  //     }]
  //   },
  //   {
  //     _id: '3',
  //     routerLink: '/i18ns',
  //     routerLinkActiveOptions: { exact: true },
  //     label: 'i18n',
  //     icon: 'bi bi-translate',
  //     active: true,
  //     open: true,
  //   },
  //   {
  //     _id: '4',
  //     routerLink: '/taxonomies',
  //     routerLinkActiveOptions: { exact: true },
  //     label: 'Taxonomie',
  //     icon: 'bi bi-list-ul',
  //     active: true,
  //     open: true,
  //   },
  //   {
  //     _id: '5',
  //     routerLink: '',
  //     label: 'Accounts',
  //     icon: 'pi pi-cog',
  //     open: false,
  //     expanded: false,
  //     items: [
  //       {
  //         _id: '1',
  //         routerLink: '/teams/',
  //         routerLinkActiveOptions: { exact: true },
  //         label: 'Teams',
  //         icon: 'bi bi-person-lines-fill',
  //         active: true,
  //         open: true,
  //       },
  //       {
  //         _id: '2',
  //         routerLink: '/accounts/',
  //         routerLinkActiveOptions: { exact: true },
  //         label: 'Users',
  //         icon: 'bi bi-person',
  //         active: true,
  //         open: true,
  //       },
  //       {
  //         _id: '2',
  //         routerLink: ['/accounts/detail/628e507f526b4bb2397d8eb2'],
  //         routerLinkActiveOptions: { exact: true },
  //         label: 'detail Users',
  //         icon: 'bi bi-person',
  //         active: true,
  //         open: true,
  //       }
  //     ],
  //   },
  //   {
  //     _id: '6',

  //     label: 'Configuration',
  //     icon: 'pi pi-cog',
  //     open: false,
  //     expanded: false,
  //     items: [
  //       {
  //         _id: '1',
  //         routerLink: ['/configuration/menu-admin'],
  //         routerLinkActiveOptions: { exact: true },
  //         label: 'Menu Admin',
  //         icon: 'pi pi-bars',
  //         active: true,
  //         open: true,
  //       },
  //       {
  //         _id: '2',
  //         routerLink: ['/configuration/droits-acces'],
  //         routerLinkActiveOptions: { exact: true },
  //         label: 'droits acces',
  //         icon: 'pi pi-bars',
  //         active: true,
  //         open: true,
  //       },



  //     ],
  //   },
  //   {
  //     _id: '6',
  //     routerLink: '/table',
  //     routerLinkActiveOptions: { exact: true },
  //     label: 'Dynamic Table',
  //     icon: 'pi pi-table',
  //     active: true,
  //     open: true,
  //   },
  // ];

  constructor(private menuService: MenuService) {


  }

  getMenuItems() {
    this.menuItems = []
    if (sessionStorage.getItem('menu')) {
      this.menuItems = JSON.parse(sessionStorage.getItem('menu') || '[]')
    }
    else {
      this.menuService.getMenu().subscribe((data: any) => {
        let menu: any = []
        data = data.filter((d: any) => d.etatObjet.includes('active'))
        menu = this.menuService.menuItemsToTree(data
          .filter((d: any) => d.planPrincipal)
          .sort((a: any, b: any) => a.ordre - b.ordre || a.priorite - b.priorite))

        const recF = (item: any): sidebarItem => {
          let newItem: any = {
            _id: item.data._id,
            routerLink: item.data.path ? '/' + item.data.path : '',
            routerLinkActiveOptions: { exact: true },
            label: item.data.translations.title,
            icon: item.data.icon,
            active: item.data.megaMenu ? false : true,
            open: item.data.megaMenu ? false : true,
          }
          if (item.children.length) {
            newItem.items = []
            newItem.expanded = false
            item.children.sort((a: any, b: any) => a.ordre - b.ordre || a.priorite - b.priorite).map((child: any) => {
              newItem.items.push(recF(child))
            })

          }
          console.log('====>', newItem)
          return newItem
        }

        menu.map((item: any) => {
          this.menuItems.push(recF(item))
        })

        sessionStorage.setItem('menu', JSON.stringify(this.menuItems))


      })
    }
    if (!sessionStorage.getItem('global_espace')) {
      console.log('')
      this.menuService.getEspaces()
    }
    return this.menuItems
  }
}
