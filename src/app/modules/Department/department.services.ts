import { TDepartment } from "./department.interface";
import { Department } from "./department.model";

const createDepartmentsIntoDB =async (payload:TDepartment) =>{
    const result = await Department.create(payload);
    return result;
}
const getAllDepartments = async()=>{
    const result = await Department.find();
    return result;
}

export const DepartmentServices = {
    createDepartmentsIntoDB,
    getAllDepartments
};