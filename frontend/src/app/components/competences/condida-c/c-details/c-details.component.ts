



import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CondidaInfoService } from 'src/app/shared/Services/condida-info/condida-info.service';

@Component({
  selector: 'app-c-details',
  templateUrl: './c-details.component.html',
  styleUrls: ['./c-details.component.scss'],
})
export class CDetailsComponent implements OnInit {
  misag_type: any[];
  value8: any;
  id: any;
  condida_data: any;
  missage: string | undefined;


  public condida_contact: FormGroup;
  constructor(
    private data: CondidaInfoService,
    private fb: FormBuilder,
    private user: ActivatedRoute
  ) {
    this.user.params.subscribe({
      next: (a) => {
        this.id = a['id'];
        this.TrackEventroute(this.id);
      },
      error: (a) => {
        this.TrackEventroute_error(a);
      },
    });

    this.condida_contact = this.fb.group({
      misag_type: new FormControl('', [Validators.required]),
      name: new FormControl(),
      missage: new FormControl('', [Validators.required]),
    });

    this.misag_type = ['interveiw', 'qoution', 'advice', 'cominter'];
  }
  TrackEventroute(a: any) {
    this.data.get_condidats_by_id(a).subscribe({
      next: (i) => {
        this.condida_data = i;
      },
      error: (i) => {
        this.TrackEventroute_error(i);
      },
    });
  }
  TrackEventroute_error(id: string) {
    console.log('9adiya hamda a hamdiy' + id);
  }
  ngOnInit(): void {}

  sendMissage() {
    if (this.condida_contact.valid) {
      console.log('this.condida_contact', this.condida_contact);
    } else {
      this.condida_contact.markAllAsTouched();
    }
  }
}


