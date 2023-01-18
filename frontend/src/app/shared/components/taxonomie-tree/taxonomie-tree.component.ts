import { Domain } from './../../models/Domain.model';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { TreeNode } from 'primeng/api';
import { TreeSelect } from 'primeng/treeselect';

import { Taxonomie } from 'src/app/shared/models/Taxonomie.model';
import { HelpersService } from '../../services/helpers.service';
import { TaxonomieService } from 'src/app/shared/services/taxonomie.service';
import { DomainService } from '../../services/domain.service';
import { MessagesService } from '../../services/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-taxonomie-tree',
  templateUrl: './taxonomie-tree.component.html',
  styleUrls: ['./taxonomie-tree.component.scss'],
})
export class TaxonomieTreeComponent implements OnInit {
  @ViewChild('treeSelect') treeSelect!: TreeSelect;
  @Input() label = 'select taxonomie';
  @Input() scrollHeight = '400px';
  @Input() panelClass = '';
  @Input() emptyMessage = 'No results found.';
  @Input() filterPlaceholder = '';
  @Input() taxonomie: any[] = [];
  @Input() selectionMode: 'single' | 'checkbox' | 'multiple' = 'single';
  @Input() control!: FormControl;
  @Input() domain!: any;
  @Input() taxonomieType: 'single' | 'multiple' = 'single';
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  parentDomain: any;
  options: any[] = [];
  options2: any[] = [];
  form!: FormGroup;
  selectedLogo: any = null;
  checked = false;
  valueChecked = false;
  displayAddTaxonomieDialog = false;
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
  domainOptions: any = [];
  parentTaxonomies: any = [];

  domainSuggestion: any = [];
  parent = null;
  subscr!: Subscription;

  ngOnDestroy() {
    this.subscr.unsubscribe();
  }

  constructor(
    private modalService: NgbModal,
    private taxonomieService: TaxonomieService,
    private helpers: HelpersService,
    private fb: FormBuilder,
    private domainService: DomainService,
    private messagesService: MessagesService
  ) {}

  ngOnInit(): void {
    this.subscr = this.control.valueChanges.subscribe({
      next: (data: any) => {
        if (data?.some((n: any) => n.key?.includes('ajouter'))) {
          this.control.setValue(
            this.control.value?.filter((n: any) => !n.key?.includes('ajouter'))
          );
        }
      },
    });
  }

  async test() {
    this.options =
      await this.taxonomieService.taxonomiesToTreeNodesForSelection(
        this.domain,
        this.taxonomieType
      );
  }

  ngDoCheck() {
    if (
      (this.domain?.taxonomies?.length || this.taxonomie?.length) &&
      !this.checked
    ) {
      this.checked = true;
      this.test();

      if (this.domain.parent && !this.options.length) {
        this.domainService.getDomainsById(this.domain.parent).subscribe({
          next: (parent: any) => {
            this.parentDomain = parent;
          },
        });
      }
    } else if (!this.options.length && this.domain) {
      this.test();
      if (this.domain.parent) {
        this.domainService.getDomainsById(this.domain.parent).subscribe({
          next: (parent: any) => {
            this.parentDomain = parent;
          },
        });
      }
    }

    if (this.control.value?.length && !this.valueChecked) {
      this.control.setValue(
        this.control.value.map((item: any) => {
          let nodeItem = this.taxonomieService.taxonomieToTreeNodeForSelection(
            item,
            this.taxonomieType
          );
          return nodeItem;
        })
      );

      // #region if there is an error in the future comment this section

      this.subscr = this.control.valueChanges.subscribe({
        next: (data: any) => {
          if (data?.some((d: any) => !d.data)) {
            this.control.setValue(
              this.control.value.map((item: any) => {
                let nodeItem =
                  this.taxonomieService.taxonomieToTreeNodeForSelection(
                    item,
                    this.taxonomieType
                  );
                return nodeItem;
              })
            );
          }

          if (data?.some((n: any) => n.key?.includes('ajouter'))) {
            this.control.setValue(
              this.control.value?.filter((n: any) => !n.key.includes('ajouter'))
            );
          }
        },
      });

      // #endregion

      this.valueChecked = true;
    }
  }

  autoCompleteFilter(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.domainOptions.length; i++) {
      let item = this.domainOptions[i];
      if (
        item.translations.designation
          .toLowerCase()
          .indexOf(query.toLowerCase()) == 0
      ) {
        filtered.push(item);
      }
    }

    this.domainSuggestion = filtered;
  }
  onNodeSelect({ node }: any) {
    this.valueChecked = true;

    if (node.key.match(/^ajouter-[0-f]{24}$/)) {
      this.treeSelect.hide();
      this.form = this.fb.group({
        translations: this.fb.group({
          designation: ['', Validators.required],
          description: [''],
        }),
        logo: [''],
        domain: [null, Validators.required],
      });

      if (node.data.code) {
        //the  parent is domain
        if (node.data._id != this.domain._id) {
          //add taxonomie in other domain

          this.domainOptions = this.domain.children;
        } else {
          //add taxonomie in the same domain
          this.domainOptions = [this.domain];

          this.form.get('domain')?.setValue(this.domain._id);
        }
      } else {
        //the parent is taxonomie
        this.parent = node?.parent?.key;

        this.parentTaxonomies = [node.data];
        this.form.addControl(
          'parent',
          new FormControl(node.data, Validators.required)
        );
        let domainChildren = this.flatDeep(this.domain.children);
        let subDomain = domainChildren.find(
          (d: any) =>
            d._id ==
            node.data.children.find((c: any) => c.etatObjet.includes('active'))
              ?.domain
        );
        this.domainOptions = subDomain ? [subDomain] : [];
        if (this.domainOptions.length) {
          this.form.get('domain')?.setValue(this.domainOptions[0]._id);
        } else {
          if (!node.data.children.length) {
            this.domainOptions = domainChildren.filter(
              (d: any) => d.parent == node.data.domain
            );

            this.domainSuggestion = this.domainOptions;
          }
        }
      }

      this.displayAddTaxonomieDialog = true;

      this.control.setValue([]);
    }
    this.control.setValue(
      this.control.value?.filter((n: any) => !n.key.includes('ajouter'))
    );
    this.control.updateValueAndValidity();
  }

  addTaxonomie() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      this.taxonomieService
        .addTaxonomie(
          this.helpers.convert({ ...this.form.value }, [
            { file: this.selectedLogo, title: 'logo' },
          ]),
          this.taxonomieType == 'single' && this.domain
        )
        .subscribe({
          next: (taxonomie: any) => {
            this.domainService.getDomainsById(this.domain._id).subscribe({
              next: (domain: any) => {
                this.domain = domain;
                this.options2 =
                  this.taxonomieService.taxonomiesToTreeNodesForSelection(
                    this.domain,
                    this.taxonomieType
                  );

                this.control.setValue(
                  this.flatDeep(this.options2).filter(
                    (n: any) => n.key == taxonomie._id
                  )
                );
                this.treeSelect._options = [];
                this.options = [];

                setTimeout(() => {
                  this.options = [...this.options2];
                  this.displayAddTaxonomieDialog = false;
                  this.messagesService.showMessage('addSuccess');
                }, 100);
              },
            });
          },
        });
    }
  }

  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach((childNode: any) => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }

  onUploadError(event: any) {}

  onUploadSuccess(event: any) {
    this.selectedLogo = event[0];
  }
  onDeleteSuccess(event: any) {
    this.selectedLogo = null;
  }
  flatDeep(arr: any) {
    return arr.reduce(
      (acc: any, val: any) =>
        acc.concat(
          val.children && val.children.length
            ? [val].concat(this.flatDeep(val.children))
            : val
        ),
      []
    );
  }
}
