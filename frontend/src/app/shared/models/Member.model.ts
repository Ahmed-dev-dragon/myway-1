import { CompteCredit } from './CompteCredit.model';
import { Relation } from './Relation.model';
import { Taxonomie } from './Taxonomie.model';
import { User } from './User.model';

export interface Member {
  _id: string;
  translations?: {
    language?: string;
    nom: string;
    prenom: string;
    adresse?: string;
    apropos?: string;
  };
  typeMembre?: string;
  salutation?: string;
  statut?: Taxonomie;
  dateNaissanceOuCreation?: Date | string;
  fonctionOuSecteurActivite?: Taxonomie;
  pays?: Taxonomie;
  region?: Taxonomie;
  province?: Taxonomie;
  ville?: Taxonomie;
  codePostal?: string;
  email?: string;
  note?: number;
  active?: boolean;

  commentaire?: string;
  compteCredits?: CompteCredit[];
  relations?: Relation[];
  compteUser?: User[];
  etatObjet?: 'etatObjet.active' | 'etatObjet.archive';
  etatCreation?: string;
  objetAssoccie?: any[];
}
