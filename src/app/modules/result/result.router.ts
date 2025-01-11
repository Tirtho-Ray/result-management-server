import express from "express";
import { ResultController } from "./result.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";


const router = express.Router();

router.post('/create-result',auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),ResultController.createResult) ;
router.get("/subjects", ResultController.getSubjectsBySemester);
router.get("/",auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),ResultController.getAllResults);
router.get("/my-result", ResultController.getResultByBoardRollAndSemester);
router.put("/update-obtained-marks",auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN), ResultController.updateResultObtainedMarks);


export const resultRouts = router;

