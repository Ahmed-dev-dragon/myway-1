import { MessagesService } from "src/app/shared/services/message.service";
import { TranslateService } from "@ngx-translate/core";
import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { DropzoneConfigInterface } from "ngx-dropzone-wrapper";
import { DomainService } from "src/app/shared/services/domain.service";
import { GroupService } from "src/app/shared/services/group.service";
import { HelpersService } from "src/app/shared/services/helpers.service";
import { UserService } from "src/app/shared/services/user.service";
import { User } from "src/app/shared/models/User.model";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.scss", "../style.scss"],
})
export class AddUserComponent implements OnInit {
  selectedImage: any;
  addForm!: FormGroup;
  groups: any = [];
  domainFonction = "profession";
  fonctions!: any;
  domains: any = [];
  salutationOptions: any = [];
  lang = localStorage.getItem("lang") || "fr";
  listResponsable: any = [];
  isExist = false;
  id: string = "";
  updatePasswords: boolean = false;
  admin!: User;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private activatedRouter: ActivatedRoute,
    private groupService: GroupService,
    private helpers: HelpersService,
    private domainService: DomainService,
    private translateService: TranslateService,
    private messagesService: MessagesService
  ) {
    this.userService
      .getUserById(JSON.parse(sessionStorage.getItem("user") || "{}")._id)
      .subscribe({
        next: (admin) => {
          this.admin = admin;
        },
      });

    this.addForm = this.fb.group({
      translations: this.fb.group({
        nom: ["", Validators.required],
        prenom: ["", Validators.required],
      }),
      salutation: [null, Validators.required],
      fonction: [null, Validators.required],
      pseudo: "",
      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [
          Validators.required,
          Validators.pattern(
            /(?=^.{8,20}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
          ),
        ],
      ],
      pid: [0, Validators.required],
      confirmPassword: ["", []],
      gsm: ["", Validators.pattern(/^([+])?(\d+)$/)],
      telFix: ["", Validators.pattern(/^([+])?(\d+)$/)],
      group: [null, Validators.required],
      responsable: [null],
      photo: [""],
    });
  }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe((param: any) => {
      if (param.id) {
        if (this.activatedRouter.snapshot.routeConfig?.path?.includes("edit")) {
          this.id = param.id;
          this.addForm.addControl(
            "newPassword",
            new FormControl(
              "",
              Validators.pattern(
                /(?=^.{8,20}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
              )
            )
          );
          this.addForm.get("password")?.clearValidators();
          this.addForm.get("confirmPassword")?.clearValidators();
          this.addForm.controls["newPassword"].valueChanges.subscribe(
            (data) => {
              this.addForm.controls["confirmPassword"].setValidators([
                Validators.pattern(data),
              ]);
            }
          );
          this.addForm.updateValueAndValidity();
        }
        this.getUser(param.id);
      }

      this.addForm.controls[
        param.id ? "newPassword" : "password"
      ].valueChanges.subscribe((data) => {
        this.addForm.controls["confirmPassword"].setValidators([
          Validators.pattern(data),
        ]);
      });
    });

    this.groupService.getGroups().subscribe((groups) => {
      this.groups = groups;
    });

    this.domainService.getDomainsByCode(["profession"]).subscribe({
      next: (result: any) => {
        this.domains = result;
        this.fonctions = this.domains["profession"];
      },
      error: (err: any) => { },
    });

    this.translateService.get("salutation_value").subscribe((res) => {
      Object.keys(res).map((key) => {
        this.salutationOptions.push({
          value: `salutation_value.${key}`,
          label: res[key],
        });
      });
      this.salutationOptions.sort((a: any, b: any) =>
        a.label > b.label ? 1 : -1
      );
    });

    this.userService.getResponsables().subscribe({
      next: (result: any) => {
        this.listResponsable = result;
      },
    });
  }

  ngDoCheck() {
    if (this.admin?.isResponsable)
      this.addForm.addControl("isResponsable", new FormControl(false));
  }

  getUser(id: string) {
    this.userService.getUserById(id).subscribe({
      next: (result: any) => {
        this.addForm.patchValue({ ...result, group: result.group._id });
      },
    });
  }

  get password() {
    return this.addForm.get("password");
  }

  get confirmPassword() {
    return this.addForm.get("confirmPassword");
  }

  get newPassword() {
    return this.addForm.get("newPassword");
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
  //this.helpers.dropZoneConfig;

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

  onUploadError(event: any) {
    console.error("🚀 ~ file: add-user.component.ts ~ line 215 ~ AddUserComponent ~ onUploadError ~ event", event)
  }

  onUploadSuccess(event: any) {
    this.selectedImage = event[0];
  }

  onDeleteSuccess() {
    this.selectedImage = null;
  }

  addUser() {
    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched();
    } else {
      if (this.addForm.value.group == null) delete this.addForm.value.group;
      if (this.addForm.value.responsable == null)
        delete this.addForm.value.responsable;
      let data = {
        ...this.addForm.value,
        fonction: this.addForm.get("fonction")?.value._id,
      };
      data.pid = Number(data.pid)

      if (this.id) {
        if (
          !this.updatePasswords ||
          (this.updatePasswords &&
            !this.newPassword?.value &&
            !this.confirmPassword?.value)
        ) {
          delete data.password;
          delete data.newPassword;
          delete data.confirmPassword;
        }
        this.userService
          .updateUser(
            this.id,
            this.helpers.convert(data, [
              { file: this.selectedImage, title: "photo" },
            ])
          )
          .subscribe({
            next: (result: any) => {
              this.messagesService.showMessage("updateSuccess");
            },
            error: (error: any) => {
              this.messagesService.showMessage("updateError");
            },
          });
      } else
        this.userService
          .addUser(
            this.helpers.convert(data, [
              { file: this.selectedImage, title: "photo" },
            ])
          )
          .subscribe({
            next: (success) => {
              this.messagesService.showMessage("addSuccess");

              this.isExist = false;
            },
            error: (error) => {
              if (
                (error.status = 406 || error.status == false) &&
                error.error.message.includes("email")
              ) {
                this.isExist = true;
                this.messagesService.showMessage("addError");
              }
            },
            // complete: () => console.info('get schemas complete'),
          });
    }
  }
}
