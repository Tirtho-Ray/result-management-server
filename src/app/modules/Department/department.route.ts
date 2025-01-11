import express from "express";
import { DepartmentController } from "./department.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";


const router = express.Router();

router.post('/create-departments',auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),DepartmentController.createDepartments) ;
router.get('/',auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),DepartmentController.getDepartments) ;



export const DepartmentRouts = router;
