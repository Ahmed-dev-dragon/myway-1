import { Member } from './Member.model';
import { Taxonomie } from './Taxonomie.model';

export interface Relation {
  _id: string;
  relationType?: Taxonomie;
  membreOne?: Member;
  membreTwo?: Member;
  etatObjet: 'etatObjet.active' | 'etatObjet.archive';
}
