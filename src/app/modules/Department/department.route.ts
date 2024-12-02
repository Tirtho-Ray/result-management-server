import express from "express";
import { DepartmentController } from "./department.controller";


const router = express.Router();

router.post('/create-departments',DepartmentController.createDepartments) 


export const DepartmentRouts = router;