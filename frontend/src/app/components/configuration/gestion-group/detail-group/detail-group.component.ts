import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { GroupService } from "src/app/shared/services/group.service";
import { MenuService } from "src/app/shared/services/menu.service";

@Component({
  selector: "app-detail-group",
  templateUrl: "./detail-group.component.html",
  styleUrls: ["./detail-group.component.scss"],
})
export class DetailGroupComponent implements OnInit {
  espaces = [];
  checked = false;
  canAccess = true;
  groupForm: FormGroup;
  statusOptions: any = ["status.active", "status.inactive"];
  id: any = "";
  constructor(
    private menuService: MenuService,
    private groupService: GroupService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.groupForm = this.fb.group({
      translations: this.fb.group({
        nom: ["", Validators.required],
      }),
      espaces: [],
      status: ["status.active", Validators.required],
    });
  }
  ngDoCheck(): void {
    if (!this.checked && sessionStorage.getItem("global_espace")) {
      this.espaces = JSON.parse(
        sessionStorage.getItem("global_espace") || "[]"
      );
      this.espaces = this.menuService.espacesToTree(this.espaces);
      this.checked = true;
    }
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe({
      next: (params: any) => {
        if (params.id) {
          this.id = params.id;
          this.getGroup();
        }
      },
    });
  }

  getGroup() {
    this.groupService.getGroupById(this.id).subscribe({
      next: (group: any) => {
        this.groupForm.patchValue({
          ...group,
          status: group.status ? "status.active" : "status.inactive",
        });

        this.flatDeep(this.espaces)
          .filter((e: any) =>
            group.espaces.find((ge: any) => {
              return ge.espace == e.data.espace || ge.path == e.data.path;
            })
          )
          .map((e: any) => (e.data.canAccess = true));
      },
    });
  }

  handleChange(event: any, data: any) {
    if (data && data.node.children.length) {
      this.flatDeep(data.node.children).map(
        (c: any) => (c.data.canAccess = event.checked)
      );
    } else if (!data) {
      this.flatDeep(this.espaces).map(
        (c: any) => (c.data.canAccess = event.checked)
      );
    }

    if (
      data &&
      data.parent &&
      !data.parent.children.find((c: any) => c.data.canAccess != event.checked)
    ) {
      data.parent.data.canAccess = event.checked;
    }
  }

  flatDeep(arr: any) {
    return arr.reduce(
      (acc: any, val: any) =>
        acc.concat(
          val.children && val.children.length
            ? [val].concat(this.flatDeep(val.children))
            : val
        ),
      []
    );
  }
}
