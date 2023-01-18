import { Taxonomie } from "./Taxonomie.interface";

export interface Domain {
  _id?: string;
  translations: {
    language: string;
    designation: string;
    description: string;
  };
  logo: string;
  code: string;
  parent: Domain;
  children: Domain[];
  taxonomies: Taxonomie[];
  hasTaxonomies: boolean;
  etatObjet?: "active" | "etatObjet.archive";
  etatCreation?: string;
  dateEnregistrement?: Date | string;
  dateModification?: Date | string;
}
