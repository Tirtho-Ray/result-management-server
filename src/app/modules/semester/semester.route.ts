import express from "express";
import { SemesterController } from "./semester.controller";


const router = express.Router();

router.post('/create-semester',SemesterController.createSemesters) ;
router.get('/',SemesterController.getSemesters) ;
router.get('/:id',SemesterController.getSingleSemesters) ;



export const SemesterRouts = router;
// semester 
