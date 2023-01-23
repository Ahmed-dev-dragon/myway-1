import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SCardSInfoInterface } from '../../lib/cards/s-card-s-ifno/s-card-s-info-Interfaces';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
})
export class ContentLayoutComponent implements OnInit, DoCheck {
  display = false;
  passedDate: SCardSInfoInterface[] = [
    {
      title: 'new orefers ',
      sideIcon: 'bi bi-bookmark',
      CN: 84,
      changeCN: 48.02,
      changeCnUnit: '%',
      changeCnIcon: 'bi bi-activity',
      changeCnTime: 'Since last Mounth',
      saved: true,
      CnUnit: '$',
    },
    {
      title: 'new orefers ',
      sideIcon: 'bi bi-bookmark',
      CN: 84,
      changeCN: -30.02,
      changeCnUnit: '%',
      changeCnIcon: 'bi bi-activity',
      changeCnTime: 'Since last Mounth',
      saved: true,
      CnUnit: '€',
    },
    {
      title: 'new orefers ',
      sideIcon: 'bi bi-bookmark',
      CN: 84,
      changeCN: 46.02,
      changeCnUnit: '%',
      changeCnIcon: 'bi bi-activity',
      changeCnTime: 'Since last Mounth',
      CnUnit: '¥',
    },
    {
      title: 'new orefers ',
      sideIcon: 'bi bi-bookmark',
      CN: 84,
      changeCN: 8.02,
      changeCnUnit: '%',
      changeCnIcon: 'bi bi-activity',
      changeCnTime: 'Since last Mounth',
      CnUnit: '₹',
    },
    {
      title: 'new orefers ',
      sideIcon: 'bi bi-bookmark',
      CN: 84,
      changeCN: 5.09,
      changeCnUnit: '%',
      changeCnIcon: 'bi bi-activity',
      changeCnTime: 'Since last Mounth',
      CnUnit: '₽',
    },
    {
      title: 'new orefers ',
      sideIcon: 'bi bi-bookmark',
      CN: 84,
      changeCN: 4.02,
      changeCnUnit: '%',
      changeCnIcon: 'bi bi-activity',
      changeCnTime: 'Since last Mounth',
      CnUnit: '﷼',
    },
    {
      title: 'new orefers ',
      sideIcon: 'bi bi-bookmark',
      CN: 84,
      changeCN: -9.02,
      changeCnUnit: '%',
      changeCnIcon: 'bi bi-activity',
      changeCnTime: 'Since last Mounth',
      saved: true,
      CnUnit: '₱',
    },
    {
      title: 'new orefers ',
      sideIcon: 'bi bi-bookmark',
      CN: 84,
      changeCN: 8.02,
      changeCnUnit: '%',
      changeCnIcon: 'bi bi-activity',
      changeCnTime: 'Since last Mounth',
      CnUnit: 'HD',
    },
    {
      title: 'new orefers ',
      sideIcon: 'bi bi-bookmark',
      CN: 84,
      changeCN: -48.02,
      changeCnUnit: '%',
      changeCnIcon: 'bi bi-activity',
      changeCnTime: 'Since last Mounth',
      CnUnit: '원',
    },
  ];
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
