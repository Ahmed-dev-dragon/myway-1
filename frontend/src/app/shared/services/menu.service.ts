import { HelpersService } from 'src/app/shared/services/helpers.service';
import { TranslateService } from '@ngx-translate/core';
import { Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable, Injector, OnChanges, SimpleChanges, DoCheck, EventEmitter } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { API, getHeaders } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menuURL = `${API}/menu`;
  ee: EventEmitter<number> = new EventEmitter<number>();
  counter = 0;
  espaces: any = []
  constructor(private http: HttpClient, private helpers: HelpersService, private translateService: TranslateService, private router: Router, private injector: Injector) {

  }


  getMenu() {
    return this.http.get(this.menuURL, {
      headers: getHeaders(),
    });
  }

  getMenuById(id: string) {
    return this.http.get(`${this.menuURL}/${id}`, {
      headers: getHeaders(),
    });
  }

  addMenuItem(menu: any) {
    return this.http.post(this.menuURL, menu, {
      headers: getHeaders(),
    });
  }

  updateMenuItem(id: string, menu: any) {
    return this.http.patch(`${this.menuURL}/${id}`, menu, {
      headers: getHeaders(),
    });
  }

  changeState(data: any) {
    return this.http.patch(`${this.menuURL}/`, data, {
      headers: getHeaders(),
    });
  }




  getEspaces() {
    this.espaces = []
    let contentRoute = null
    let children: any = []
    contentRoute = this.router.config.find((r: any) => r.data && r.data.type == 'content')
    if (contentRoute && contentRoute.children?.length) {
      console.log(contentRoute.children)
      children = contentRoute.children.filter((r: any) => r.data && r.data.menu == true)
      this.ee.subscribe(data => {
        console.log(data, children)
        if (data == children.length) {
          sessionStorage.setItem('global_espace', JSON.stringify(this.espaces))
          console.log('*****espaces saved****')
        }
      })
      for (let [i, c] of children.entries()) {
        this.getChildren(c, i)
      }
    }
    return this.espaces

  }

  async getChildren(route: Route, index: number) {
    let i = index
    let children: any
    if (route.loadChildren) {

      await (<any>this.router).configLoader
        .load(this.injector, route)
        .subscribe((res: any) => {

          let routeModule: any = {}
          children = [];
          const recF = (route: any, parent: any) => {
            let newRoute: any = {}
            newRoute.path = `${parent}/${route.path}`
            newRoute.data = this.helpers.newObject(route.data)
            // this.translateTitle(route.data)
            if (route.children?.length) {
              newRoute.children = []
              route.children.map((r: any) =>
                newRoute.children.push(recF(r, parent ? parent + '/' + route.path : route.path)))
            }
            return newRoute
          }
          res.routes.map((r: any) => {
            children.push(recF(r, route.path))
          });
          routeModule = { path: route.path, data: this.helpers.newObject(route.data), children }
          this.espaces.push(this.transformData(routeModule, index))
          console.log(this.counter)
          this.ee.emit(++this.counter);
        });
    } else {
      this.espaces.push(this.transformData({ path: route.path, data: this.helpers.newObject(route.data) }, index))
      console.log(this.counter)
      this.ee.emit(++this.counter);
    }


  }
  transformData(data: any, index: number) {
    let i = index

    const recF = (route: any) => {
      let menuItem: any = {}
      menuItem = { _id: index++, espace: route.data.title, path: route.path, type: route.data.type, service: route.data.service, children: [] }


      route.children?.map((child: any) => {
        menuItem.children.push(recF(child))
      })

      return menuItem

    }

    return recF(data)

  }
  translateTitle(data: any) {

    this.translateService.get(data.title).subscribe(t => {
      data['title'] = t

    }
    )

  }

  menuItemsToTree(menu: any[]) {


    let menuNodes: any = menu.map((menu: any) => {
      return this.menuItemToTreeNode(menu);
    });

    return menuNodes;
  }

  menuItemToTreeNode(menu: any): TreeNode {
    let tempMenu: any = {
      data: menu,
      children: [],
    };

    if (menu.children?.length) {
      menu.children = menu.children.sort((a: any, b: any) => a.ordre - b.ordre || a.priorite - b.priorite)
      for (let t of menu.children) {
        tempMenu.children.push(this.menuItemToTreeNode(t));
      }
    }

    return tempMenu;
  }
  espacesToTree(espace: any[]) {

    let espaceNodes: any = espace.map((espace: any) => {

      espace = this.espaceToTreeNode(espace)

      return espace;
    });

    return espaceNodes;
  }

  espaceToTreeNode(espace: any): TreeNode {
    let tempespace: any = {
      data: {
        _id: espace._id,
        espace: espace.espace,
        type: espace.type,
        path: espace.path,
        canAccess: false
      },
      children: [],
    };
    if (espace.children?.length) {
      for (let t of espace.children) {
        tempespace.children.push(this.espaceToTreeNode(t));
      }
    }

    return tempespace;
  }
}
