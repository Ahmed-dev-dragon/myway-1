import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";

@Component({
  selector: "app-breadcrumb",
  templateUrl: "./breadcrumb.component.html",
  styleUrls: ["./breadcrumb.component.scss"],
})
export class BreadcrumbComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) { }

  showBreadcrumb = true;
  showBreadcrumbComp = true;
  breadcrumbURLs: any;
  breadcrumb: any;
  title!: string;

  ngOnInit() {
    this.getBreadcrumb();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getBreadcrumb();
      }
    });
  }

  getBreadcrumb() {
    this.showBreadcrumb =
      this.router.url.split("/").slice(1)[0] == "dashboard" ? false : true;

    this.showBreadcrumbComp =
      this.router.url.split("/").slice(1)[0] == "PageNotFound" ? false : true;
    if (!this.showBreadcrumbComp) return;

    let recF = (fC: any): any => {
      if (fC?.firstChild) return recF(fC?.firstChild);
      return fC?.data;
    };

    let data = recF(this.route?.snapshot?.firstChild);

    this.breadcrumb = data?.["breadcrumb"]?.split("/") || "";
    this.title = data?.["title"] || "";
    this.breadcrumbURLs = data?.["breadcrumbURLs"] || [];
  }
}
