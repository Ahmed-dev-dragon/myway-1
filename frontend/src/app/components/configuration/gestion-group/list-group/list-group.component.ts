import { GroupService } from "src/app/shared/services/group.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessagesService } from "src/app/shared/services/message.service";

@Component({
  selector: "app-list-group",
  templateUrl: "./list-group.component.html",
  styleUrls: ["./list-group.component.scss"],
})
export class ListGroupComponent implements OnInit {
  captionConfig: any;
  headers: any;
  listGroups: any = [];
  constructor(private groupService: GroupService, private router: Router, private messagesService: MessagesService) {
    this.captionConfig = {
      globalFilter: true,
      csv: true,
      pdf: true,
      xls: true,
      selection: true,
      displayedColumns: true,
      clearTable: true,
      refreshData: true,
      selectionType: "multiple",
      addButton: true,
      actions: {
        clone: true,
        detail: true,
        edit: true,
        close: true,
      },
      summary: {
        enabled: true,
        message: "String",
      },
    };
    this.headers = [
      {
        // key: 'designation',
        header: "designation",
        filterType: "string",
        field: "translations.nom",
        sort: true,
        filter: true,
      },
      {
        // key: 'designation',
        header: "status",
        filterType: "string",
        field: "status",
        sort: true,
        filter: true,
      },
    ];
  }

  ngOnInit(): void {
    this.groupService.getGroups().subscribe({
      next: (data: any) => {
        this.listGroups = data;
      },
    });
  }

  changeState(event: any) {
    this.groupService.changeState(event.ids, event.etat).subscribe({
      next: (result) => {
        this.messagesService.showMessage("deleteSuccess");

      },
      error: (error) => {
        this.messagesService.showMessage("deleteError");
      },
    });
  }

  onEditClick(event: any) {

    this.router.navigate([`${this.router.url}/edit`, event._id])
  }

  onDetailClick(event: any) {

    this.router.navigate([`${this.router.url}/detail`, event._id])
  }

  onCloneClick(event: any) {

    this.router.navigate([`${this.router.url}/clone`, event._id])
  }

  onAddClick() {

    this.router.navigate([`${this.router.url}/add`])
  }
}
