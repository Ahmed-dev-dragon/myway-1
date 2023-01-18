import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { GroupService } from "src/app/shared/services/group.service";
import { MenuService } from "src/app/shared/services/menu.service";
import { MessagesService } from "src/app/shared/services/message.service";

@Component({
  selector: "app-add-group",
  templateUrl: "./add-group.component.html",
  styleUrls: ["./add-group.component.scss"],
})
export class AddGroupComponent implements OnInit {
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
    private fb: FormBuilder,
    private messageSerivce: MessagesService
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
      // if (sessionStorage.getItem('user')) {
      //   let mySpaces = JSON.parse(sessionStorage.getItem('user') || '{}').group?.espaces

      //   const recF = (espace: any) => {
      //     let newEspace: any
      //     let e = mySpaces.find((e: any) => e.espace == espace.espace || e.path == espace.path)
      //     if (e) {
      //       newEspace = { ...espace, children: [] }

      //       if (espace.children?.length) {

      //         for (let child of espace.children) {
      //           child = recF(child)
      //           if (child) {
      //             newEspace.children.push(child)

      //           }
      //         }
      //       }
      //     }

      //     return newEspace

      //   }
      //   let newEspaces: any = []

      //   this.espaces.map((me: any) => {

      //     let nme = recF(me)
      //     if (nme) { console.log('espace====>', me); newEspaces.push(nme) }
      //   }
      //   )
      //   this.espaces = newEspaces.filter((e: any) => e)
      //   console.log('selected espaces===>', this.espaces)

      // }
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

        let selected = this.flatDeep(this.espaces)
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
  addGroup() {
    let espaces = this.flatDeep(this.espaces)
      .filter((e: any) => e.data.canAccess)
      .map((e: any) => e.data);

    if (this.groupForm.invalid) {
      this.groupForm.markAllAsTouched();
    } else if (!espaces.length) {
    } else {
      let data = {
        ...this.groupForm.value,
        status: this.groupForm.value.status == "status.active",
        espaces,
      };

      if (this.id) {
        this.groupService.updateGroup(this.id, data).subscribe({
          next: (result) => {
            this.messageSerivce.showMessage("updateSuccess");
          },
          error: (error) => {
            this.messageSerivce.showMessage("updateError");
          },
        });
      } else {
        this.groupService.addGroup(data).subscribe({
          next: (result) => {
            this.messageSerivce.showMessage("addSuccess");
          },
          error: (error) => {
            this.messageSerivce.showMessage("addError");
          },
        });
      }
    }
  }
}
