
import { AppModule } from './../../../app.module';



import { HelpersService } from 'src/app/shared/services/helpers.service';
import { MessagesService } from './../../../shared/services/message.service';
import { MenuService } from './../../../shared/services/menu.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router} from '@angular/router';
import { Component, Injector, OnInit, DoCheck, ViewChild } from '@angular/core';
import { Dropdown } from 'primeng/dropdown';



@Component({
  selector: 'app-gestion-menu',
  templateUrl: './gestion-menu.component.html',
  styleUrls: ['./gestion-menu.component.scss']
})
export class GestionMenuComponent implements OnInit, DoCheck {
  menuItem: FormGroup
  menuItems: any = []
  iconOptions: any = []
  etatObjetOptions: any = this.messagesService.etatObjetOptions
  parentOptions: any = []
  taxonomie1Options: any = []
  taxonomie3Options: any = []
  taxonomie2Options: any = []
  checked: boolean = false
  espaces: any = []
  id: string = ''
  taxonomiesOptions: any[][] = []
  services: any
  @ViewChild("iconsDropdown") iconsDropdown!: Dropdown;
  constructor(

    private fb: FormBuilder,
    private menuService: MenuService,
    private messagesService: MessagesService,
    private helperService: HelpersService,
  ) {
    let newModule = new AppModule();
    this.services = Object.getPrototypeOf(newModule as any).constructor.ɵinj.providers.filter((v: any) => typeof v == 'function' && v?.ɵprov?.providedIn == "root"
    )


    this.menuItem = this.fb.group({
      etatObjet: ['etatObjet.active', Validators.required],
      title: [null, Validators.required],
      planPrincipal: [true],
      megaMenu: [true],
      parent: [null, []],
      icon: [null],
      ordre: [0, Validators.required],
      priorite: [0, Validators.required],
    })


    this.menuItem.get('planPrincipal')?.valueChanges.subscribe((value) => {
      if (value == false) {
        this.menuItem.get('parent')?.addValidators(Validators.required)
      } else if (value == true) {
        this.menuItem.get('parent')?.setValue(null)
        this.menuItem.get('parent')?.setValidators([])
        console.log('parent not required')
      }
      this.menuItem.get('parent')?.updateValueAndValidity()
    })
    this.menuItem.get('megaMenu')?.valueChanges.subscribe((value) => {
      if (value == false) {
        this.menuItem.addControl('taxonomies', new FormArray([new FormControl()]))
        this.taxonomiesOptions[0] = this.taxonomie1Options

      } else if (value == true) {
        this.menuItem.removeControl('taxonomies')
      }

    })

    this.menuItem.get('taxonomies')?.valueChanges.subscribe((value: any) => {

      if (value.children?.length)
        this.taxonomies.push(new FormControl())

    })

    this.iconOptions = this.helperService.listIcons

  }
  ngDoCheck(): void {
    if (!this.checked && sessionStorage.getItem('global_espace')) {
      this.espaces = JSON.parse(sessionStorage.getItem('global_espace') || '[]')
      this.taxonomie1Options = JSON.parse(sessionStorage.getItem('global_espace') || '[]')
      this.checked = true
    }
  }

  ngOnInit(): void {

    this.getMenuItems()


  }
  get taxonomies() {
    return this.menuItem.get('taxonomies') as FormArray
  }
  getMenuItems() {
    this.menuService.getMenu().subscribe((data: any) => {

      this.parentOptions = this.helperService.newObject(data)
      this.menuItems = this.menuService.menuItemsToTree(data.filter((d: any) => d.planPrincipal).sort((a: any, b: any) => a.ordre - b.ordre || a.priorite - b.priorite))
      console.log(this.menuItems)
    })
  }

  editItem(data: any) {
    let item = data.node.data
    let path = item.path?.split('/')

    this.resetForm()
    this.id = data.node.data._id
    this.menuItem.patchValue({
      title: item.translations.title,
      priorite: item.priorite,
      ordre: item.ordre,
      planPrincipal: item.planPrincipal,
      megaMenu: item.megaMenu,
      icon: item.icon
    })
    if (data.parent) {
      this.menuItem.get('parent')?.setValue(data.parent.data)
    }
    const recF = (taxonomie: any, index: number = 0) => {
      if (taxonomie.children.length || taxonomie.path.includes('/:id')) {
        this.getOptions({ value: taxonomie }, index, taxonomie.path.includes('/:id') ? item.path : null)
        let tax: any
        if (taxonomie.children.length) {
          tax = taxonomie.children.find((t: any) => t.path.includes(path[index + 1]))
          this.taxonomies.at(index + 1).patchValue(tax)
        }



        if (tax && (tax.children.length || tax.path.includes('/:id')))
          recF(tax, index + 1)
      }


    }
    console.log('item===>', item)
    console.log('taxonomie1Options===>', this.taxonomie1Options)
    let tax1 = this.taxonomie1Options.find((t: any) => item.path?.includes(t.path))
    console.log(path, '===>', tax1)
    if (tax1) {
      console.log(tax1)
      if (this.taxonomies) {
        this.taxonomies.setValue([tax1])
        recF(tax1, 0)
      }

    }
    console.log(data)
    console.log(this.menuItem)


  }
  getOptions(event: any, index: number, path: any = null) {

    const valueToKeep = this.taxonomies.value.slice(0, index + 1);
    this.taxonomies.clear();

    for (let value of valueToKeep) {
      this.taxonomies.push(new FormControl(value, Validators.required))
    }

    if (event.value.children?.length) {
      this.taxonomies.push(new FormControl(Validators.required))
      this.taxonomiesOptions[index + 1] = event.value.children

    } else if (event.value.type?.includes('detail') && event.value.path?.includes(':id')) {
      this.taxonomies.push(new FormControl(Validators.required))
      //@ts-ignore
      this.genericService.get(event.value.service).subscribe({
        next: (result: any) => {

          this.taxonomiesOptions[index + 1] = result.map((r: any) => {
            return {
              _id: r._id,
              espace: r.translation ?
                (r.translations.designation || r.translations.title || r.translations.titre || r.translation.name || r.translation.nom || '') :
                (r.code || r.name || '')
            }
          })
          if (path) {


            let tax = this.taxonomiesOptions[index + 1].find((t: any) => path.includes(t._id))
            this.taxonomies.at(index + 1).patchValue(tax)
          }

        }
      })


    }
  }

  addMenuItem() {

    if (this.menuItem.invalid) {
      this.menuItem.markAllAsTouched()
      console.log('invalid item===>', this.menuItem.controls)
    } else {
      let menuItem: any = {
        translations: { title: this.menuItem.value.title },
        planPrincipal: this.menuItem.value.planPrincipal,
        megaMenu: this.menuItem.value.megaMenu,
        ordre: this.menuItem.value.ordre,
        priorite: this.menuItem.value.priorite,
        etatObjet: this.menuItem.value.etatObjet
      }

      if (!this.menuItem.value.megaMenu) {
        if (!this.taxonomies.value[this.taxonomies.length - 1]._id.toString().match(/^\d+$/)) {
          menuItem['path'] = this.taxonomies.value[this.taxonomies.length - 2].path.replace(':id', this.taxonomies.value[this.taxonomies.length - 1]._id)
        } else {
          menuItem['path'] = this.taxonomies.value[this.taxonomies.length - 1].path

        }

      }
      console.log('menuItem====>', this.menuItem.value)
      if (this.menuItem.value.parent)
        menuItem['parent'] = this.menuItem.value.parent._id
      else
        menuItem['parent'] = null
      if (this.menuItem.value.icon)
        menuItem.icon = this.menuItem.value.icon
      console.log('menuItem====>', menuItem)

      if (this.id) {
        this.menuService.updateMenuItem(this.id, menuItem).subscribe({
          next: (result: any) => {

            this.resetForm()

            this.messagesService.showMessage('updateSuccess')

          },
          error: (err: any) => {
            this.messagesService.showMessage('updateError')
          }
        })
      } else {
        this.menuService.addMenuItem(menuItem).subscribe({
          next: (result: any) => {
            this.parentOptions.push(result)

            this.resetForm()

            this.messagesService.showMessage('addSuccess')

          },
          error: (err: any) => {
            this.messagesService.showMessage('addError')
          }
        })
      }

    }

  }

  changeState(data: any, state: string) {
    this.menuService.changeState({ id: [data._id], etat: state }).subscribe({
      next: (result: any) => {
        console.log(result)
        this.messagesService.showMessage('deleteSuccess')
      },
      error: (error) => {
        console.error(error)
        this.messagesService.showMessage('deleteError')

      }
    })
  }
  resetForm() {
    this.id = ''
    this.menuItem.reset()
    this.menuItem.patchValue({ etatObjet: 'etatObjet.active', ordre: this.menuItems.length, priorite: 0, planPrincipal: true, megaMenu: true })
    this.menuItem.removeControl('taxonomies')
  }

  // #region  icon dropdown

  count = 1;
  intervalId: any = 0;
  timeId: any = 0;
  sliceCount = 50;

  onIconsDropdownPanelShow(event: any) {
    if (this.menuItem.get("icon")?.value) {
      let icon = this.helperService.listIcons.find(
        (icon: any) => icon.title == this.menuItem.get("icon")?.value
      );
      this.iconOptions = [
        icon,
        ...this.helperService.listIcons.slice(0, this.sliceCount),
      ];
      this.timeId = setTimeout(() => {
        this.intervalId = setInterval(() => {
          if (
            this.helperService.listIcons
              .slice(0, this.sliceCount + (this.count += 50))
              .find((icon: any) => icon.title == this.menuItem.get("icon")?.value)
          ) {
            this.iconOptions = this.helperService.listIcons.slice(
              0,
              this.sliceCount + (this.count += 50)
            );
          } else {
            this.iconOptions = [
              icon,
              ...this.helperService.listIcons.slice(
                0,
                this.sliceCount + (this.count += 50)
              ),
            ];
          }

          if (this.iconOptions.length == this.helperService.listIcons.length) {
            this.count = 0;
            clearInterval(this.intervalId);
          }
        }, 500);
      }, 500);
    } else {
      this.iconOptions = this.helperService.listIcons.slice(0, this.sliceCount);
      this.timeId = setTimeout(() => {
        this.intervalId = setInterval(() => {
          this.iconOptions = this.helperService.listIcons.slice(
            0,
            this.sliceCount + (this.count += 50)
          );

          if (this.iconOptions.length == this.helperService.listIcons.length) {
            this.count = 0;
            clearInterval(this.intervalId);
          }
        }, 500);
      }, 500);
    }
  }

  onIconsDropdownPanelHide() {
    let value = this.menuItem.get("icon")?.value;
    let index = this.helperService.listIcons.findIndex(
      (icon: any) => icon.title == value
    );

    this.count = 0;
    clearTimeout(this.timeId);
    clearInterval(this.intervalId);

    this.iconOptions =
      index >= Math.floor(this.sliceCount)
        ? this.helperService.listIcons.slice(
          index - Math.floor(this.sliceCount / 2),
          index + Math.floor(this.sliceCount / 2)
        )
        : this.helperService.listIcons.slice(0, this.sliceCount);
  }

  onIconsDropdownChange(event: any) {
    clearTimeout(this.timeId);
    clearInterval(this.intervalId);
    let value = event.value;
    if (value) {
      let index = this.helperService.listIcons.findIndex(
        (icon: any) => icon.title == value
      );
      this.iconOptions =
        index >= Math.floor(this.sliceCount)
          ? this.helperService.listIcons.slice(
            index - Math.floor(this.sliceCount / 2),
            index + Math.floor(this.sliceCount / 2)
          )
          : this.helperService.listIcons.slice(0, this.sliceCount);
    } else {
      this.iconOptions = this.helperService.listIcons.slice(0, this.sliceCount);
    }
  }

  onIconsDropdownFilter(event: any) {
    clearTimeout(this.timeId);
    clearInterval(this.intervalId);
    if (event.filter) {
      this.iconsDropdown.optionsToDisplay = this.helperService.listIcons
        .filter((icon: any) => icon.title.includes(event.filter))
        .slice(0, this.sliceCount);
    } else {
      let value = this.menuItem.get("icon")?.value;

      if (value) {
        let index = this.helperService.listIcons.findIndex(
          (icon: any) => icon.title == value
        );
        this.iconOptions =
          index >= Math.floor(this.sliceCount)
            ? this.helperService.listIcons.slice(
              index - Math.floor(this.sliceCount / 2),
              index + Math.floor(this.sliceCount / 2)
            )
            : this.helperService.listIcons.slice(0, this.sliceCount);
      } else {
        this.iconsDropdown.optionsToDisplay =
          this.helperService.listIcons.slice(0, this.sliceCount);
      }
    }
  }

  // #endregion





}
