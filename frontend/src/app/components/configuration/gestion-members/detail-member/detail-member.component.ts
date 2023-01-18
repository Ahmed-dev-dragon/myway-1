import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { DomainService } from "src/app/shared/services/domain.service";
import { MemberService } from "src/app/shared/services/member.service";
import { MessagesService } from "src/app/shared/services/message.service";

@Component({
  selector: "app-detail-member",
  templateUrl: "./detail-member.component.html",
  styleUrls: ["./detail-member.component.scss"],
})
export class DetailMemberComponent implements OnInit {
  form!: FormGroup;
  id = "";
  selectedPhotoOuLogo: any = null;
  optionsTypeMember: any[] = [];
  optionsSalutationOuStatut: any[] = [];
  domains: any = ["profession", "Pays", "Region", "Ville"];

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private messageService: MessagesService,
    private memberService: MemberService,
    private domainService: DomainService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      typeMember: null,
      salutationOuStatut: null,
      translations: this.fb.group({ nom: null, prenom: null }),
      dateNaissanceOuCreation: null,
      fonctionOuSecteur: null,
      photoOuLogo: null,
      adressePrincipal: null,
      paysAdressePrincipal: null,
      regionAdressePrincipal: null,
      villeAdressePrincipal: null,
      codePostalAdressePrincipal: null,
      telPrincipal: null,
      emailPrincipale: null,
      compteCredits: null,
      users: null,
    });

    this.activatedRoute.params.subscribe((params) => {
      this.id = params["id"];
      if (this.id) this.getMember();
    });

    this.getDomains();
  }

  getMember() {
    this.memberService.getMemberById(this.id).subscribe({
      next: (result) => {
        this.form.patchValue(result);
      },
      error: (err) => { },
    });
  }

  getDomains() {
    this.domainService.getDomainsByCode(this.domains).subscribe({
      next: (domains: any) => {
        this.domains = domains;
      },
    });
  }
}
