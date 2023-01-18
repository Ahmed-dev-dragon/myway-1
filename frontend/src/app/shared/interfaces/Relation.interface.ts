import { Member } from "./Member.interface";
import { Taxonomie } from "./Taxonomie.interface";

export interface Relation {
  _id: string;
  relationType?: Taxonomie;
  membreOne?: Member;
  membreTwo?: Member;
  etatObjet: "etatObjet.active" | "etatObjet.archive";
}
