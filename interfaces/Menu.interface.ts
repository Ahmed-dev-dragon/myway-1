export interface Menu {
  _id?: string;
  translations: {
    language: string;
    title: string;
  };
  planPrincipal: boolean;
  megaMenu: boolean;
  icon: string;
  path: string;
  ordre: number;
  priorite: number;
  parent: Menu;
  children: Menu[];
  etatObjet: "active" | "etatObjet.archive";
  etatCreation: string;
}
