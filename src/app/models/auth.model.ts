
export class Auth {
  // parmaètres servant à gérer le statut d'anthentification du User
  isAuth: boolean;
  resp: number;

  // paramètres permettant de garder les informations du User pour d'autres requêtes
  day?: Date;
  id?: number;
  firstname?: string;
  lastname?: string;
  password?: string;
  memberHumorLevel?: number;
}
