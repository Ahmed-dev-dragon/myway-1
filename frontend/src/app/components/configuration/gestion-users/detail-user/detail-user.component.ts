import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { DropzoneConfigInterface } from "ngx-dropzone-wrapper";
import { User } from "src/app/shared/models/User.model";
import { HelpersService } from "src/app/shared/services/helpers.service";
import { UserService } from "src/app/shared/services/user.service";

@Component({
  selector: "app-detail-user",
  templateUrl: "./detail-user.component.html",
  styleUrls: ["./detail-user.component.scss", "../style.scss"],
})
export class DetailUserComponent implements OnInit {
  domainFonction = "profession";
  fonction!: any;
  salutation: any = [];
  id: string = "";
  user!: User;

  constructor(
    private userService: UserService,
    private helpers: HelpersService,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService
  ) {
    this.activatedRoute.params.subscribe((param: any) => {
      this.id = param.id;
      this.getUser();
    });
  }

  ngOnInit(): void { }

  getUser() {
    this.userService.getUserById(this.id).subscribe({
      next: (user) => {
        this.user = user;
        this.translateService.get("salutation_value").subscribe((res) => {
          this.salutation = Object.keys(res)
            .map((key) => ({
              value: `salutation_value.${key}`,
              label: res[key],
            }))
            .filter((alt) => alt.value == user.salutation);
        });
      },
    });
  }

  public config: DropzoneConfigInterface = {
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

  @ViewChild("ic") imageContainer: any;

  @HostListener("window:resize", ["$event"])
  onResize(event: any) {
    this.imgCF();
  }

  imgCF() {
    if (
      this.helpers.isBetween(window.innerWidth, 1170, 1240) &&
      document.querySelector("aside.open")
    ) {
      this.imageContainer.nativeElement.classList.add("w");
    } else {
      this.imageContainer.nativeElement.classList.remove("w");
    }
  }
}
