import { TSubject } from "./subject.interface"
import { Subject } from "./subject.model"

const createSubjectsIntoDB = async(payload:TSubject)=>{
    const result = await Subject.create(payload);
    return result;
};

const getAllSubject = async() =>{
    const result = await Subject.find()
    .populate("semesterId","_id name")
    .populate("departmentId","_id name");
    return result;
};

export const SubjectServices = {
    createSubjectsIntoDB,
    getAllSubject
};