import { Group } from './Group.model';
import { Taxonomie } from './Taxonomie.model';

export interface User {
  _id: string;
  translations: {
    language: string;
    nom: string;
    prenom: string;
  };
  fonction: Taxonomie;
  salutation: string;
  pseudo: string;
  email: string;
  password: string;
  photo: string;
  gsm: string;
  telFix: string;
  nbrConnection: Number;
  dateDerniereConnection: Date;
  etatObjet: 'active' | 'etatObjet.archive';
  etatCreation: string;
  group: Group;
  responsable: User;
  isResponsable: boolean;
}
