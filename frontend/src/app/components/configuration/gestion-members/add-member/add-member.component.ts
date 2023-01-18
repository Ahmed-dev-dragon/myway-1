import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { MessagesService } from "src/app/shared/services/message.service";
import { HelpersService } from "src/app/shared/services/helpers.service";
import { MemberService } from "src/app/shared/services/member.service";
import { DropzoneConfigInterface } from "ngx-dropzone-wrapper";
import { DomainService } from "src/app/shared/services/domain.service";

@Component({
  selector: "app-add-member",
  templateUrl: "./add-member.component.html",
  styleUrls: ["./add-member.component.scss"],
})
export class AddMemberComponent implements OnInit {
  form!: FormGroup;
  id = "";
  photoOuLogoDropZoneConfig: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    maxFilesize: 1,
    addRemoveLinks: true,
    resizeHeight: 300,
    resizeQuality: 2,
    dictFileTooBig: "Image trop grande, Merci d'en choisir une autre",
    dictRemoveFile: "Supprimer",
    dictCancelUpload: "Annuler",
    dictCancelUploadConfirmation: "Voulez-vous vraiment annuler l'upload ?",
    dictRemoveFileConfirmation: "Voulez-vous vraiment Supprimer ce fichier?",
    acceptedFiles: "image/*",
  };
  selectedPhotoOuLogo: any = null;
  optionsTypeMember: any[] = [];
  optionsSalutationOuStatut: any[] = [];
  domains: any = ["profession", "Pays", "Region", "Ville"];

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private messageService: MessagesService,
    private helpers: HelpersService,
    private memberService: MemberService,
    private domainService: DomainService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      typeMember: [null, [Validators.required]],
      salutationOuStatut: [null, [Validators.required]],
      translations: this.fb.group({
        nom: [null, Validators.required],
        prenom: [null, Validators.required],
      }),
      dateNaissanceOuCreation: null,
      fonctionOuSecteur: null,
      photoOuLogo: null,
      adressePrincipal: [null, [Validators.required]],
      paysAdressePrincipal: [null, [Validators.required]],
      regionAdressePrincipal: [null, [Validators.required]],
      villeAdressePrincipal: [null, [Validators.required]],
      codePostalAdressePrincipal: [null, [Validators.required]],
      telPrincipal: [null, [Validators.required]],
      emailPrincipale: [null, [Validators.required, Validators.email]],
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

  addData() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      if (this.id) {
        this.memberService.updateMember(this.id, this.form.value).subscribe({
          next: (result: any) => {
            this.messageService.showMessage("updateSuccess");
          },
          error: (error) => {
            this.messageService.showMessage("updateError");
          },
        });
      } else {
        this.memberService.addMember(this.form.value).subscribe({
          next: (result: any) => {
            this.messageService.showMessage("addSuccess");
          },
          error: (error) => {
            this.messageService.showMessage("addError");
          },
        });
      }
    }
  }

  onUploadPhotoOuLogoError(event: any) { }

  onUploadPhotoOuLogoSuccess(event: any) {
    this.selectedPhotoOuLogo = event[0];
  }

  onDeletePhotoOuLogoSuccess(event: any) {
    this.selectedPhotoOuLogo = null;
  }

  getDomains() {
    this.domainService.getDomainsByCode(this.domains).subscribe({
      next: (domains: any) => {
        this.domains = domains;
      },
    });
  }
}
