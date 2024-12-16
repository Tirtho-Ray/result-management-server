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

const getSingleSubject = async (id: string) => {
    const result = await Subject.findById(id)
        .populate("semesterId", "_id name")
        .populate("departmentId", "_id name");
    if (!result) {
        throw new Error("Subject not found");
    }
    return result;
};

const updateSubject = async (id: string, payload: Partial<TSubject>) => {
    const result = await Subject.findByIdAndUpdate(id, payload, { new: true })
        .populate("semesterId", "_id name")
        .populate("departmentId", "_id name");
    if (!result) {
        throw new Error("Subject not found");
    }
    return result;
};

const deleteSubject = async (id: string) => {
    const result = await Subject.findByIdAndDelete(id);
    if (!result) {
        throw new Error("Subject not found");
    }
    return result;
};


export const SubjectServices = {
    createSubjectsIntoDB,
    getAllSubject,
    getSingleSubject,
    updateSubject,
    deleteSubject,
};
