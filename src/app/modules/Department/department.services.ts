import { TDepartment } from "./department.interface";
import { Department } from "./department.model";

const createDepartmentsIntoDB =async (payload:TDepartment) =>{
    const result = await Department.create(payload);
    return result;
}

export const DepartmentServices = {
    createDepartmentsIntoDB
};