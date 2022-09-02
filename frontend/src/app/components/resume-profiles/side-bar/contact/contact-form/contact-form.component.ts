import { Component, OnInit } from '@angular/core'

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'

import { DynamicDialogRef } from 'primeng/dynamicdialog'
@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  public contact_form: FormGroup
  constructor(private fb: FormBuilder, private ref: DynamicDialogRef) {
    this.contact_form = this.fb.group({
      platform: new FormControl('', [Validators.required]),
      user_name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
    })
  }
  ngOnInit() {}

  save_contact_from() {
    if (this.contact_form.valid) {
      this.ref.close()
    } else {
      this.contact_form.markAllAsTouched()
    }
  }
}

// import { DynamicDialogRef } from 'primeng/dynamicdialog';
