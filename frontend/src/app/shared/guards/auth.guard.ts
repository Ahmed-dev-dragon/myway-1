// import { Injectable } from "@angular/core";
// import {
//   CanActivate,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
//   Router,
// } from "@angular/router";
// import { AuthService } from "../services/auth.service";

// @Injectable({
//   providedIn: "root",
// })
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(route: ActivatedRouteSnapshot, snapshot: RouterStateSnapshot) {
//     this.authService.canAccess = false;
//     if (!this.authService.isLoggedIn()) {
//       if (this.authService.firstEnter) this.router.navigate(["/login"]);
//       this.authService.canAccess = false;
//     } else {
//       if (this.authService.firstEnter) {
//         if (
//           JSON.parse(sessionStorage.getItem("expiresIn") || "0") - Date.now() >
//             0 &&
//           JSON.parse(sessionStorage.getItem("expiresIn") || "0") - Date.now() <=
//             this.authService.timeToRefreshToken
//         ) {
//           this.authService.addEventListener();
//         } else {
//           setTimeout(() => {
//             this.authService.addEventListener();
//           }, JSON.parse(sessionStorage.getItem("expiresIn") || "0") - this.authService.timeToRefreshToken - Date.now());
//         }
//       }
//       let mySpaces = JSON.parse(sessionStorage.getItem("user") || "{}").group
//         ?.espaces;
//       if (mySpaces) {
//         let url = snapshot.url;

//         if (route.params && Object.keys(route.params).length) {
//           for (let key of Object.keys(route.params)) {
//             url = url.replace(route.params[key], ":" + key);
//           }
//         }
//         if (mySpaces) {
//           if (mySpaces.find((e: any) => url == "/" + e.path))
//             this.authService.canAccess = true;
//           else this.authService.canAccess = false;
//         }
//       }
//       this.authService.firstEnter = false;
//     }

//     return this.authService.canAccess;
//   }
// }

import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, snapshot: RouterStateSnapshot) {
    // this.authService.canAccess = false;
    // if (!this.authService.isLoggedIn()) {
    //   if (this.authService.firstEnter) this.router.navigate(['/login']);
    //   this.authService.canAccess = false;
    // } else {
    //   if (this.authService.firstEnter) {
    //     if (
    //       JSON.parse(sessionStorage.getItem('expiresIn') || '0') - Date.now() <=
    //       this.authService.timeToRefreshToken
    //     ) {
    //       this.authService.addEventListener();
    //     } else {
    //       setTimeout(() => {
    //         this.authService.addEventListener();
    //       }, JSON.parse(sessionStorage.getItem('expiresIn') || '0') - this.authService.timeToRefreshToken - Date.now());
    //     }
    //   }
    //   let mySpaces = JSON.parse(sessionStorage.getItem('user') || '{}').group
    //     ?.espaces;
    //   if (mySpaces) {
    //     let url = snapshot.url;

    //     if (route.params && Object.keys(route.params).length) {
    //       for (let key of Object.keys(route.params)) {
    //         url = url.replace(route.params[key], ':' + key);
    //       }
    //     }
    //     if (mySpaces) {
    //       if (
    //         mySpaces.find(
    //           (e: any) => url == '/' + e.path || url + '/' == '/' + e.path
    //         )
    //       )
    //         this.authService.canAccess = true;
    //       else this.authService.canAccess = false;
    //     }
    //   }
    //   this.authService.firstEnter = false;
    // }

    // return this.authService.canAccess;
    return true;
  }
}
