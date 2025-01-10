import type { IBaseModel } from "./baseModel";

export interface IUserModel extends IBaseModel {
  name:string;
  accountNumber:string;
  balance:number;
}