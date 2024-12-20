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

// get by id
router.get('/:id', StudentController.getStudentById);

// Update student by collageRoll
router.put('/:id', StudentController.updateStudentById);

// Delete student by collageRoll
router.delete('/:roll', StudentController.deleteStudentByRoll);

export const StudentRoutes = router;
