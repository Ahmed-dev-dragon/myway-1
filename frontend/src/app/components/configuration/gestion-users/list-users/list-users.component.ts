import { MessagesService } from "src/app/shared/services/message.service";
import { MessageService } from "primeng/api";
import { Component, OnInit } from "@angular/core";
import { HelpersService } from "src/app/shared/services/helpers.service";
import { UserService } from "src/app/shared/services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-list-users",
  templateUrl: "./list-users.component.html",
  styleUrls: ["./list-users.component.scss"],
})
export class ListUsersComponent implements OnInit {
  loading = true;
  listUsers: any[] = [];
  headers: any;
  captionConfig: any;
  constructor(
    public userService: UserService,
    private helpersService: HelpersService,
    private messagesService: MessagesService,
    private router: Router
  ) {
    this.headers = [
      {
        header: "image",
        field: "photo",
        sort: false,
        filter: false,
        filterType: "file",
        default: "https://avatars.dicebear.com/api/personas/person.svg",
      },
      {
        header: "nom",
        field: "translations.nom",
        sort: true,
        filter: true,
        filterType: "text",
      },
      {
        header: "prenom",
        field: "translations.prenom",
        sort: true,
        filter: true,
        filterType: "text",
      },
      {
        header: "pseudo",
        field: "pseudo",
        sort: true,
        filter: true,
        filterType: "text",
      },
      {
        header: "email",
        field: "email",
        sort: true,
        filter: true,
        filterType: "text",
      },

      {
        header: "gsm",
        field: "gsm",
        sort: true,
        filter: true,
        filterType: "text",
      },
      {
        header: "telFix",
        field: "telFix",
        sort: true,
        filter: true,
        filterType: "text",
      },
      {
        header: "group",
        field: "group.translations.nom",
        sort: true,
        filter: true,
        filterType: "text",
      },
      {
        header: "etat.objet.name",
        field: "etatObjet",
        sort: true,
        filter: true,
        filterType: "etatObjet",
        filterData: ["active", "archive"],
      },
    ];
    this.captionConfig = {
      globalFilter: true,
      csv: true,
      pdf: true,
      xls: true,
      selection: true,
      displayedColumns: true,
      clearTable: true,
      refreshData: true,
      addButton: true,
      selectionType: "multiple",
      summary: {
        enabled: true,
        message: "nombre total des utilisateurs est : ",
      },
      actions: {
        clone: true,
        delete: true,
        edit: true,
        detail: true,
      },
    };
  }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this.userService.getUsers().subscribe({
      next: (users: any) => {
        // @ts-ignore
        let currentUser = JSON.parse(sessionStorage.getItem("user"));

        this.listUsers = users;
      },
      error: (error) => {
        this.loading = false;
      },
    });
  }
  changeState(event: any) {
    console.log(event)
    this.userService.changeState(event).subscribe({
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
