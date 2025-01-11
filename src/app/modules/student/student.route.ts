import express from "express";
import { StudentController } from "./student.controller";
import validateRequest from "../../middleware/validateRequest";
import { StudentValidations } from "./student.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

// Create a new student
router.post('/create-student',validateRequest(StudentValidations.createStudentValidations), StudentController.createStudent);

// Get all students
router.get('/', auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
 StudentController.getAllStudents);

// Get student by collageRoll or boardRoll
router.get('/:collageRoll', auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN), StudentController.getStudentByRoll); // Use path params for specific student

// get by id
router.get('/:id', auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN), StudentController.getStudentById);

// Update student by collageRoll
router.put('/:id', auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN), StudentController.updateStudentById);

// Delete student by collageRoll
router.delete('/:roll', auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN), StudentController.deleteStudentByRoll);

export const StudentRoutes = router;
