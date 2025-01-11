import express from "express";
import { SemesterController } from "./semester.controller";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middleware/auth";


const router = express.Router();

router.post('/create-semester',auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),SemesterController.createSemesters) ;
router.get('/',SemesterController.getSemesters) ;
router.get('/:id',auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),SemesterController.getSingleSemesters) ;



export const SemesterRouts = router;
// semester 
