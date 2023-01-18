import { DialogService } from 'primeng/dynamicdialog';
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "src/app/shared/services/auth.service";
import { UserService } from "src/app/shared/services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  passwordResetForm!: FormGroup;
  passwordResetCurrentIndex = 0;
  showErrorDialog = false;
  verificationKey = "";
  errorDialogText = "";
  loading = false;

  @ViewChild("loadingModal") loadingModal: any;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private userService: UserService, private dialogService: DialogService
  ) {
    this.dialogService.dialogComponentRefMap.forEach(dialog => {
      dialog.destroy();
    });
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });

    this.passwordResetForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  resetPassword() {
    document.querySelector(".login-form")?.classList.add("hide");
    document.querySelector(".login-form")?.classList.remove("show");
    document.querySelector(".password-reset-form")?.classList.remove("hide");
    document.querySelector(".password-reset-form")?.classList.add("show");
  }

  nextStep() {
    if (this.passwordResetForm.valid) {
      this.loading = true;
      this.loadingModal.nativeElement.style.width = "100vw";
      this.loadingModal.nativeElement.style.height = "100vh";

      this.userService
        .sendVerificationEmail(this.passwordResetForm.controls["email"].value)
        .subscribe({
          next: (result: any) => {
            this.loading = false;
            this.loadingModal.nativeElement.style.width = "0vw";
            this.loadingModal.nativeElement.style.height = "0vh";
            document
              .querySelector(".email-verification-container")
              ?.classList.add("hide");

            document
              .querySelector(".email-verification-message-container")
              ?.classList.remove("hide");
          },
          error: (err: any) => { },
        });
    } else {
      this.passwordResetForm.markAllAsTouched();
    }
  }

  returnToLogin() {
    document.querySelector(".login-form")?.classList.remove("hide");
    document.querySelector(".login-form")?.classList.add("show");
    document.querySelector(".password-reset-form")?.classList.add("hide");
    document.querySelector(".password-reset-form")?.classList.remove("show");

    setTimeout(() => {
      document
        .querySelector(".email-verification-container")
        ?.classList.remove("hide");

      document
        .querySelector(".email-verification-message-container")
        ?.classList.add("hide");

      this.passwordResetForm = this.fb.group({
        email: ["", [Validators.required, Validators.email]],
      });
    }, 500);
  }
}
