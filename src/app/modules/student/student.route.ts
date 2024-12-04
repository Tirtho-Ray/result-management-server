import express from "express";
import { StudentController } from "./student.controller";
import validateRequest from "../../middleware/validateRequest";
import { StudentValidations } from "./student.validation";

const router = express.Router();

// Create a new student
router.post('/create-student',validateRequest(StudentValidations.createStudentValidations), StudentController.createStudent);

// Get all students
router.get('/', StudentController.getAllStudents);

// Get student by collageRoll or boardRoll
router.get('/:collageRoll', StudentController.getStudentByRoll); // Use path params for specific student

// Update student by collageRoll
router.put('/:roll', StudentController.updateStudentByRoll);

// Delete student by collageRoll
router.delete('/:roll', StudentController.deleteStudentByRoll);

export const StudentRoutes = router;
