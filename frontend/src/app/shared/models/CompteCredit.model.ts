import { Member } from './Member.model';
import { OperationCompteCredit } from './OperationCompteCredit.model';
import { Taxonomie } from './Taxonomie.model';

export interface CompteCredit {
  _id?: string;
  typeCompte: Taxonomie;
  montantPoints: number;
  montantMonnaie: number;
  membre: Member;
  operations: OperationCompteCredit[];
  etatObjet: 'etatObjet.active' | 'etatObjet.archive';
  etatCreation: string;
}
