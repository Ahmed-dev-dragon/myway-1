import { CompteCredit } from "./CompteCredit.interface";
import { Taxonomie } from "./Taxonomie.interface";

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
  etatObjet: "active" | "etatObjet.archive";
  etatCreation: string;
}
