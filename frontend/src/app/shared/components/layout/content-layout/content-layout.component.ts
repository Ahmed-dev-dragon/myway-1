import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
})
export class ContentLayoutComponent implements OnInit, DoCheck {
  display = false;
  constructor(public authService: AuthService) {}
  ngDoCheck(): void {
    //this.display = !this.authService.canAccess
    // console.log(this.display, this.authService.canAccess)
  }

  isSidebarOpen = true;

  ngOnInit(): void {}

  closeTokenDialog(event?: any) {
    if (!event) {
      this.authService.showInvalidTokenModel = false;
      this.authService.logOut(true);
    }
  }
  close() {
    this.display = false;
    this.authService.canAccess = true;
  }
}
