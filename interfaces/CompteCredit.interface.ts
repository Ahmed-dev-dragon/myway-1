import { Member } from "./Member.interface";
import { OperationCompteCredit } from "./OperationCompteCredit.interface";
import { Taxonomie } from "./Taxonomie.interface";

export interface CompteCredit {
  _id?: string;
  typeCompte: Taxonomie;
  montantPoints: number;
  montantMonnaie: number;
  membre: Member;
  operations: OperationCompteCredit[];
  etatObjet: "etatObjet.active" | "etatObjet.archive";
  etatCreation: string;
}
