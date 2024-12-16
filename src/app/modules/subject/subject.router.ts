import express from "express";
import { SubjectValidations } from "./subject.validation";
import validateRequest from "../../middleware/validateRequest";
import { SubjectController } from "./subject.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";




const router = express.Router();

router.post('/create-subject', auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),validateRequest(SubjectValidations.createSubjectValidations),SubjectController.createSubject);
router.get('/',SubjectController.getAllSubject);
router.get("/:id", SubjectController.getSingleSubject);
router.put("/:id", SubjectController.updateSubject);
router.delete("/:id", SubjectController.deleteSubject);

export const SubjectRoutes = router;