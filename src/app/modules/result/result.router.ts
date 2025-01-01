import express from "express";
import { ResultController } from "./result.controller";


const router = express.Router();

router.post('/create-result',ResultController.createResult) ;
router.get('/',ResultController.getResult) ;
router.get('/',ResultController.getResult) ;


export const resultRouts = router;

