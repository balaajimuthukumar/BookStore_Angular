export class UserData{
  constructor(
    public email:String,
    public id:string,
    public userName:string,
    private _token:string,
    private _tokenExpireDate:Date
  ){}


  get token(){
    if(!this._tokenExpireDate || new Date() > this._tokenExpireDate){
      return null;
    }
    return this._token;
  }
}