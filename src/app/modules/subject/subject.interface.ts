import { Types } from "mongoose";

export type TSubject ={
    name: string;
    subCode: number;
    mark: number;
    credit:number;
    semesterId: Types.ObjectId;  
    departmentId: Types.ObjectId;  
}