import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'

import { DynamicDialogRef } from 'primeng/dynamicdialog'

@Component({
  selector: 'certificats-from',
  templateUrl: './certificats-from.component.html',
  styleUrls: ['./certificats-from.component.scss'],
})
export class CertificatsFromComponent implements OnInit {
  public certificat_form: FormGroup
  certificat_form_certificat_discription_input_value = ''
  constructor(private fb: FormBuilder, private ref: DynamicDialogRef) {
    this.certificat_form = this.fb.group({
      certificat_form_certificat_date_input: new FormControl('', [
        Validators.required,
      ]),

      certificat_form_certificat_titale_input: new FormControl('', [
        Validators.required,
      ]),
      certificat_form_certificat_type_input: new FormControl('', [
        Validators.required,
      ]),
      certificat_form_certificat_discription_input: new FormControl('', [
        Validators.required,
      ]),
    })
  }
  ngOnInit(): void {}
  save_certificat_form() {
    if (this.certificat_form.valid) {
      this.ref.close()
    } else {
      this.certificat_form.markAllAsTouched()
    }
  }
}
