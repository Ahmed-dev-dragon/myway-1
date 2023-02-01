
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
        label: 'tables',
        icon: '',
        items: [
          {
            label: 'ng dafulte table',
            icon: '',
          },
          {
            label: 'ng table v2',
            icon: '',
          },
          {
            label: 'ng table v3',
            icon: '',
          },
          {
            label: 'native table v1 ',
            icon: '',
          },
        ],
      },
      {
        label: 'cards',
        icon: '',
        items: [
          {
            label: 'unic',
            icon: '',
          },

          {
            label: 'generique',
            icon: '',
          },
        ],
      },

      {
        label: 'templetes',
        icon: '',
        items: [
          {
            label: 'card list',
            icon: '',
          },
        ],
      },
      {
        label: 'chates',
        icon: '',
        items: [],
      },
      {
        label: 'Skeletons',
        icon: '',
        items: [
          {
            label: 'cards',
            icon: '',
          },
          {
            label: 'continers',
            icon: '',
          },
          {
            label: 'map',
            icon: '',
          },
          {
            label: 'form',
            icon: '',
          },
          {
            label: 'acorditions',
            icon: '',
          },
          {
            label: 'calinder',
            icon: '',
          },
          {
            label: 'tables',
            icon: '',
          },

          {
            label: 'config',
            icon: '',
          },
          {
            label: 'uploud file',
            icon: '',
          },
          {
            label: 'sliders',
            icon: '',
          },
          {
            label: 'progress ',
            icon: '',
          },
          {
            label: 'timeline ',
            icon: '',
          },
        ],
      },

      {
        label: 'calinders',
        icon: '',
        items: [
          {
            label: 'moble size calendar ',
            icon: '',
          },
          {
            label: 'day calinder',
            icon: '',
          },
          {
            label: ' week calinder',
            icon: '',
          },
          {
            label: 'month calendar',
            icon: '',
          },
          {
            label: 'dynamic calendar',
            icon: '',
          },
          {
            label: ' read only calendar',
            icon: '',
          },
        ],
      },
      {
        label: 'components',
        icon: '',
        items: [
          {
            label: 'map',
            icon: '',
            items: [
              {
                label: 'read only map',
                icon: '',
              },
              {
                label: 'live map',
                icon: '',
              },
              {
                label: 'boostrapt map',
                icon: '',
              },
              {
                label: 'other map',
                icon: '',
              },
            ],
          },

          {
            label: 'acorditions',
            icon: '',
          },

          {
            label: 'config',
            icon: '',
          },
          {
            label: 'uploud file',
            icon: '',
          },
          {
            label: 'sliders',
            icon: '',
          },
          {
            label: 'progress ',
            icon: '',
          },
          {
            label: 'timeline ',
            icon: '',
          },
        ],
      },
      {
        label: 'form items',
        icon: '',
        items: [],
      },
      {
        label: 'others items ',
        icon: '',
        items: [],
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
