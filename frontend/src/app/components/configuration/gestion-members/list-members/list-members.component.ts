import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import {
  ListCaptionConfig,
  ListHeader,
} from "src/app/shared/models/List.model";
import { Member } from "src/app/shared/models/Member.model";
import { MemberService } from "src/app/shared/services/member.service";
import { MessagesService } from "src/app/shared/services/message.service";

@Component({
  selector: "app-list-members",
  templateUrl: "./list-members.component.html",
  styleUrls: ["./list-members.component.scss"],
})
export class ListMembersComponent implements OnInit {
  members: Member[] = [];
  headers: ListHeader[] = [
    {
      header: "nom prenom ou nom personne morale",
      field: "nomPrenomOuNomPersonneMorale",
    },
    {
      header: "pays adresse principal",
      field: "paysAdressePrincipal",
    },
    {
      header: "region adresse principal",
      field: "regionAdressePrincipal",
    },
    {
      header: "ville adresse principal",
      field: "villeAdressePrincipal",
    },
    {
      header: "email principale",
      field: "emailPrincipale",
    },
    {
      header: "users count",
      field: "users.length",
    },
    {
      header: "sous membres count",
      field: "sousMembres.length",
    },
    {
      header: "etat objet",
      field: "etatObjet",
    },
    {
      header: "etat creation",
      field: "etatCreation",
    },
  ];
  captionConfig: ListCaptionConfig = {
    addButton: true,
    actions: {
      detail: true,
      edit: true,
      clone: true,
      delete: true,
    },
  };

  constructor(private memberService: MemberService, private messagesService: MessagesService, private router: Router) { }

  ngOnInit(): void {
    this.getMembers();
  }

  getMembers() {
    this.memberService.getMembers().subscribe({
      next: (members: any) => {
        console.log("🚀 ~ members", members);
        this.members = members;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  changeState(event: any) {
    this.memberService.changeState({ id: event.ids, etat: event.etat }).subscribe({
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
