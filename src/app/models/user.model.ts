export class User {

  //un ? rend le  paramètre optionnel, donc le constructeur permet d'ommettre ce paramètre

  constructor(
    public day?: Date,
    public firstname?: string,
    public lastname?: string,
    public password?: string,
    public userHumor?: number,
  ) {
  }
}
