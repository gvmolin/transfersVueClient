import type { IBaseModel } from "./baseModel";
import type { IUserModel } from "./userModel";

export interface ITransferModel extends IBaseModel{
  finalValue: number;
  originalValue: number;
  accountOrigin?:IUserModel;
  accountDestination?:IUserModel;
  scheduledDate:string;
  fee: number;
  attempts: number;
  status: string;
}