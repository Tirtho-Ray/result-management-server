import express from "express";
import { SubjectValidations } from "./subject.validation";
import validateRequest from "../../middleware/validateRequest";
import { SubjectController } from "./subject.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";




const router = express.Router();

router.post('/create-subject', auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),validateRequest(SubjectValidations.createSubjectValidations),SubjectController.createSubject);
router.get('/',auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),SubjectController.getAllSubject);
router.get("/:id",auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN), SubjectController.getSingleSubject);
router.put("/:id",auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN), SubjectController.updateSubject);
router.delete("/:id",auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN), SubjectController.deleteSubject);

export const SubjectRoutes = router;