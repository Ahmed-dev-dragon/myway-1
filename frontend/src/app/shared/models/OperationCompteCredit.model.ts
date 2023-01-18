import { CompteCredit } from './CompteCredit.model';
import { Taxonomie } from './Taxonomie.model';

export interface OperationCompteCredit {
  _id?: string;
  fluxOperation: boolean;
  taxonomieOperation: Taxonomie;
  description: string;
  montantOperation: number;
  monnaieOperation: string;
  valeurPointsFlux: number;
  valeurOperationPoints: number;
  compteCredit: CompteCredit;
  etatObjet: 'active' | 'etatObjet.archive';
  etatCreation: string;
}
