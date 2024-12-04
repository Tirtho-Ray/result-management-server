import express from "express";
import { StudentController } from "./student.controller";

const router = express.Router();

router.post('/create-student',StudentController.createStudent);
router.get('/', StudentController.getAllStudents);
router.get('/', StudentController.getStudentByRoll); // query params for rolls
router.put('/:roll', StudentController.updateStudentByRoll);
router.delete('/:roll', StudentController.deleteStudentByRoll);

export const StudentRoutes = router;
