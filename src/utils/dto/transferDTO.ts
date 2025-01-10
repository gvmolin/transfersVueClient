import type { IBaseModel } from "../models/baseModel";

export interface ITransferDTO extends IBaseModel {
  originalValue: number;
  destinationAccountNumber:string;
  originAccountNumber:string;
  scheduledDate:string;
}