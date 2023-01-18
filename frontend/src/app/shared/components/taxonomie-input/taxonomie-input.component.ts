import { DomainService } from 'src/app/shared/services/domain.service';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { HelpersService } from '../../services/helpers.service';
import { TaxonomieService } from 'src/app/shared/services/taxonomie.service';
import { MessagesService } from '../../services/message.service';
import { Taxonomie } from '../../models/Taxonomie.model';

@Component({
  selector: 'app-taxonomie-input',
  templateUrl: './taxonomie-input.component.html',
  styleUrls: ['./taxonomie-input.component.scss'],
})
export class TaxonomieInputComponent implements OnInit {
  @Input() label = 'select taxonomie';
  @Input() scrollHeight = '400px';
  @Input() panelClass = '';
  @Input() emptyMessage = 'No results found.';
  @Input() filterPlaceholder = '';
  @Input() taxonomie: any;
  @Input() selectionMode: 'single' | 'checkbox' | 'multiple' = 'single';
  @Input() control!: FormControl;
  @Input() domain!: any;
  @Input() taxonomieType: 'single' | 'multiple' = 'single';
  @Output() onChange: any = new EventEmitter();
  @Input() inputStyle: { [key: string]: string } = {};

  parentDomain: any;
  options: any[] = [];
  options2: any[] = [];
  form!: FormGroup;
  selectedLogo: any = null;
  checked = false;
  showAddDialog = false;
  dropZoneConfig: DropzoneConfigInterface = {
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
    dictRemoveFile: 'Supprimer',
    dictCancelUpload: 'Annuler',
    dictCancelUploadConfirmation: "Voulez-vous vraiment annuler l'upload ?",
    dictRemoveFileConfirmation: 'Voulez-vous vraiment Supprimer ce fichier?',
    acceptedFiles: 'image/*',
  };
  parentTaxonomies: any = [];

  constructor(
    private modalService: NgbModal,
    private taxonomieService: TaxonomieService,
    private helpers: HelpersService,
    private fb: FormBuilder,
    private domainService: DomainService,
    private messagesService: MessagesService
  ) { }

  ngOnInit(): void {
    this.initOptions();
  }

  initOptions() {
    if (this.taxonomie instanceof Array) {
      this.taxonomie.map((tax: Taxonomie) => {
        this.options.push(tax);
      });

      this.options.push({
        translations: {
          designation: 'ajouter',
        },
        icon: 'pi pi-plus',
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['taxonomie']?.currentValue) {
      this.checked = false;
      if (this.control.value) this.options = [];
      else this.options.splice(0, this.options.length);
      if (changes['taxonomie']?.previousValue && this.taxonomie.length)
        this.control?.setValue(null);
    } else {
      this.control?.setValue(null);
      this.options.splice(0, this.options.length);
    }
  }

  ngDoCheck() {
    if (this.taxonomie && !this.checked) {
      this.checked = true;
      this.options.splice(0, this.options.length);
      this.helpers
        .newObject(
          this.taxonomie?.children ? this.taxonomie.children : this.taxonomie
        )
        .map((tax: Taxonomie) => {
          this.options.push(tax);
        });

      this.options.push({
        translations: {
          designation: 'ajouter',
        },
        icon: 'pi pi-plus',
      });

      if (this.domain.parent) {
        this.domainService.getDomainsById(this.domain.parent).subscribe({
          next: (parent: any) => {
            this.parentDomain = parent;
          },
        });
      }
    }
  }

  onTaxonomieSelect(event: any) {
    if (event?.value?.icon) {
      this.control?.setValue(null);
      this.form = this.fb.group({
        translations: this.fb.group({
          designation: ['', Validators.required],
          description: [''],
        }),
        logo: [''],
        domain: [this.domain._id],
      });
      if (this.parentDomain) {
        this.parentTaxonomies = this.parentDomain.taxonomies;

        this.form.addControl(
          'parent',
          new FormControl(null, Validators.required)
        );

        if (!this.taxonomie?.length) {
          this.form.get('parent')?.setValue(this.taxonomie);
          this.parentTaxonomies = [this.taxonomie];
        }
      }

      this.showAddDialog = true;
    } else {
      this.onChange.emit(event);
    }
  }

  addTaxonomie() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.messagesService.showMessage('error', 'invalid form');
      console.error(this.form);
    } else {
      this.taxonomieService
        .addTaxonomie(
          this.helpers.convert(this.form.value, [
            { file: this.selectedLogo, title: 'logo' },
          ]),
          this.taxonomieType == 'single' && this.domain?.code
        )
        .subscribe({
          next: (taxonomie: any) => {
            this.control.setValue(taxonomie);
            this.taxonomie?.children
              ? this.taxonomie.children.push(taxonomie)
              : this.taxonomie.push(taxonomie);
            this.options.splice(this.options.length - 1, 0, taxonomie);

            this.options = [...this.options];

            this.messagesService.showMessage('addSuccess');

            this.showAddDialog = false;
          },
          error: (err: any) => {
            console.error(err);
          },
        });
    }
  }

  onUploadSuccess(event: any) {
    this.selectedLogo = event[0];
  }

  onDeleteSuccess(event: any) {
    this.selectedLogo = null;
  }
}
