import express from "express";
import { StudentController } from "./student.controller";

// Create a new express router instance
const router = express.Router();

// POST route for creating a student
router.post("/create-student", StudentController.createStudent);

// GET route for retrieving all students
router.get("/students", StudentController.getAllStudents);

// GET route for retrieving a single student by ID or roll number
router.get("/student/:id", StudentController.getStudent);

// PUT route for updating a student by ID or roll number
router.put("/student/:id", StudentController.updateStudent);

// DELETE route for deleting a student by ID or roll number
router.delete("/student/:id", StudentController.deleteStudent);
 
export const StudentRoutes = router;
