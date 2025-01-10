import type { IBaseModel } from "../models/baseModel";

export interface IUserDTO extends IBaseModel {
  name:string;
  balance?:number;
  accountNumber?:string;
}
