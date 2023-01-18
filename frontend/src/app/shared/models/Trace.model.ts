import { User } from './User.model';

export interface operationEffectuee {
  _id?: string;
  trace: Trace;
  method: string;
  class: string;
  oldDoc: string;
  newDoc: string;
  responseSize: number;
  idAddress: string;
  dateHeureOperation: string;
  updatedAt: string;
}

export interface Trace {
  _id?: string;
  user: User;
  token: string;
  deconnexionSystem: boolean;
  operations: operationEffectuee[];
  dateHeureConnexion: string;
  dateHeureDeconnexion: string;
}
