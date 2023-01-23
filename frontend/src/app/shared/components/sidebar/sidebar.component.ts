
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  SidebarService,
  sidebarItem,
} from 'src/app/shared/services/sidebar.service';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() showSidebar!: boolean;

  showMenu = '';
  showSubMenu = '';
  mobileSize = false;
  sidebarNavItems: sidebarItem[] = [];
  model: any[] = [];
  array = Array;

  showMenu_1: boolean = false;
  showMenu_2: boolean = false;
  showMenu_3: boolean = false;
  showMenu_4: boolean = false;

  constructor(
    private sidebarService: SidebarService,
    public router: Router,

  ) {
    this.getSideBar();
    //console.log(this.sidebarNavItems)
  }

  ngOnInit() {
    this.handleSidebar();
    this.setActive();

    this.model = [
      {
        label: 'File',
        icon: 'pi pi-pw pi-file',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            items: [
              {
                label: 'User',
                icon: 'pi pi-fw pi-user-plus',
                items: [
                  {
                    label: 'User',
                    icon: 'pi pi-fw pi-user-plus',
                  },
                  {
                    label: 'Filter',
                    icon: 'pi pi-fw pi-filter',
                  },
                ],
              },
              {
                label: 'Filter',
                icon: 'pi pi-fw pi-filter',
              },
            ],
          },
          { label: 'Open', icon: 'pi pi-fw pi-external-link' },
          { label: 'Quit', icon: 'pi pi-fw pi-times' },
        ],
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          { label: 'Delete', icon: 'pi pi-fw pi-trash' },
          {
            label: 'Refresh',
            icon: 'pi pi-fw pi-refresh',
            items: [
              {
                label: 'User',
                icon: 'pi pi-fw pi-user-plus',
              },
              {
                label: 'Filter',
                icon: 'pi pi-fw pi-filter',
              },
            ],
          },
        ],
      },
      {
        label: 'User',
        icon: 'pi pi-fw pi-user-plus',
      },
    ];
    this.sidebarNavItems = this.model;
  }

  getSideBar() {
    //   this.sidebarNavItems = this.sidebarService.getMenuItems();
    //
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.handleSidebar();
  }

  handleSidebar() {
    this.mobileSize = window.innerWidth < 1170 ? true : false;
  }

  setActive() {
    let id = '';
    let recF = (items: sidebarItem[]) => {
      let b = false;
      items.map((item: sidebarItem) => {
        if (item.routerLink == this.router.url) b = true;
        if (item.expanded != undefined) item.expanded = recF(item.items || []);
      });
      return b;
    };

    recF(this.sidebarNavItems);
    return id;
  }

  opensidebarAccordion(id: any) {}

  showMenuChildren(a: any, i: any) {
    console.log('777777777777777777', a, '========>', i);
    if ((a = 1)) {
      this.showMenu_1 = !this.showMenu_1;
    } else if ((a = 2)) {
      this.showMenu_2 = !this.showMenu_2;
    } else if ((a = 3)) {
      this.showMenu_3 = !this.showMenu_3;
    } else if ((a = 4)) {
      this.showMenu_4 = !this.showMenu_4;
    }
  }
}
