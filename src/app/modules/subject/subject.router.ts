import express from "express";
import { SubjectValidations } from "./subject.validation";
import validateRequest from "../../middleware/validateRequest";
import { SubjectController } from "./subject.controller";

// import auth from "../../middleware/auth";
// import { USER_ROLE } from "./user.constant";


const router = express.Router();

router.post('/create-subject',validateRequest(SubjectValidations.createSubjectValidations),SubjectController.createSubject);
router.get('/',SubjectController.getAllSubject);




export const SubjectRoutes = router;