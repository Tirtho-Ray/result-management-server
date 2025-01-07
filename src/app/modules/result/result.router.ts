import express from "express";
import { ResultController } from "./result.controller";


const router = express.Router();

router.post('/create-result',ResultController.createResult) ;
router.get("/subjects", ResultController.getSubjectsBySemester);
router.get("/", ResultController.getAllResults);
router.get("/my-result", ResultController.getResultByBoardRollAndSemester);
router.put("/update-obtained-marks", ResultController.updateResultObtainedMarks);


export const resultRouts = router;

