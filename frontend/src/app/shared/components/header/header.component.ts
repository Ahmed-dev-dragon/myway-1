import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import screenfull from 'screenfull';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() showSidebar = true;
  @Output() showSidebarChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  showUserMenu = false;
  mobileSize = false;
  fullScreen = screenfull;
  user: any;
  isLangListOpened = false;
  notifications: any[] = [];
  langIcon: any;
  langs: any = [
    { code: 'ar', icon: 'ma', name: 'Arabic' },
    { code: 'en', icon: 'gb', name: 'English' },
    { code: 'fr', icon: 'fr', name: 'French' },
  ];

  constructor(private authService: AuthService, private router: Router) {}
  darkModeFunction({checked}:any){

     sessionStorage['darkMode'] = checked
  }
  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
    this.showSidebarChange.emit(this.showSidebar);
  }

  changeLang(code: string) {
    this.langContainer.nativeElement.classList.remove('open');
    sessionStorage['lang'] = code;
    window.location.reload();
  }

  @ViewChild('lang') langContainer: any;
  @ViewChild('st') sidebarToggler: any;
  @ViewChild('umt') userMenuToggler: any;
  @ViewChild('um') userMenu: any;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.handleSidebar();
  }

  @HostListener('window:click', ['$event'])
  onClick(event: any) {
    const recF = (parent: any, child?: any): boolean => {
      let element = child || event.srcElement;

      let includes = false;
      if (parent == element) {
        return true;
      } else if (parent?.children?.length) {
        for (let i = 0; i < parent.children.length; i++) {
          if (parent.children[i] == element) {
            includes = true;
          } else {
            includes = recF(parent.children[i], element);
          }
          if (includes == true) break;
        }
      }
      return includes;
    };

    let sidebar = document.querySelector('aside#sidebar.sidebar');

    if (
      !(
        recF(event.srcElement, this.langContainer?.nativeElement) ||
        recF(this.userMenuToggler?.nativeElement)
      )
    )
      this.langContainer.nativeElement.classList.remove('open');

    if (
      this.showUserMenu &&
      this.mobileSize &&
      !(
        recF(this.userMenu?.nativeElement) ||
        recF(this.userMenuToggler?.nativeElement)
      )
    )
      this.showUserMenu = false;

    if (
      this.showSidebar &&
      this.mobileSize &&
      !event.srcElement.classList.value
        .split(' ')
        .includes('left-sidebar-toggler') &&
      !event.srcElement.classList.value
        .split(' ')
        .includes('left-sidebar-toggler-icon') &&
      !recF(sidebar, event.target)
    ) {
      this.showSidebar = false;
      this.showSidebarChange.emit(false);
    }
  }

  logOut() {
    this.authService.logOut();
  }

  handleSidebar() {
    if (window.innerWidth < 1170) {
      this.mobileSize = true;
      this.showSidebar = false;
      this.showSidebarChange.emit(this.showSidebar);
    } else {
      this.mobileSize = false;
      this.showSidebar = true;
      this.showSidebarChange.emit(this.showSidebar);
    }
  }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.langIcon = this.langs.find(
      (lang: any) => lang.code == (sessionStorage['lang'] || 'fr')
    ).icon;

    setTimeout(() => {
      this.handleSidebar();
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          if (this.mobileSize) {
            this.showSidebar = false;
            this.showSidebarChange.emit(this.showSidebar);
          }
        }
      });
    }, 0.1);
  }
}
