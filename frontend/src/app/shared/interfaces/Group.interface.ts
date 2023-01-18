import { User } from './User.interface';

export interface Group {
  _id?: string;
  translations: { language: string; nom: string };
  status: boolean;
  espaces: [{}];
  users: User[] | string[];
  etatObjet: "etatObjet.active" | "etatObjet.archive";
  etatCreation: string;
}
