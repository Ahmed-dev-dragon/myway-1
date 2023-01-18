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

  constructor(private sidebarService: SidebarService, public router: Router) {

    this.getSideBar()
    //console.log(this.sidebarNavItems)
  }

  ngOnInit() {
    this.handleSidebar();
    this.setActive();
  }
  getSideBar() {

    this.sidebarNavItems = this.sidebarService.getMenuItems();



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
}
