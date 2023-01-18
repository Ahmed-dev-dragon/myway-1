import { Domain } from './Domain.interface';

export interface Taxonomie {
  _id?: string;
  translations: {
    language: string;
    designation: string;
    description: string;
  };
  logo: string;
  domain: Domain;
  parent: Taxonomie;
  children: Taxonomie[];
  etatObjet: "active" | "etatObjet.archive";
  etatCreation: string;
  dateEnregistrement: Date | string;
  dateModification: Date | string;
  expanded?: boolean;
}
