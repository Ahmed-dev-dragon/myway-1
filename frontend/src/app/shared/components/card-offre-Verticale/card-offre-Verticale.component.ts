import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-card-offre-Verticale',
  templateUrl: './card-offre-Verticale.component.html',
  styleUrls: ['./card-offre-Verticale.component.scss'],
})
export class CardOffreVerticaleComponent implements OnInit {
  @Input() Intitule: any = ''
  @Input() Secteur: any = ''
  @Input() Poste: any = ''
  @Input() TypePoste: any = ''
  @Input() NomEntreprise: any = ''
  @Input() TypeEntreprise: any = ''
  @Input() Competences: any = ''
  @Input() TypeContrat: any = ''
  @Input() Ville: any = ''
  @Input() Date: any = ''
  @Input() image: any = ''
  @Input() dateDisponibilite: any = ''
  @Input() showBtn: any = true

  constructor() {}

  ngOnInit(): void {}
}
