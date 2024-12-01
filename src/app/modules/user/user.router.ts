import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { UserValidations } from "./user.validation";
// import auth from "../../middleware/auth";
// import { USER_ROLE } from "./user.constant";


const router = express.Router();

router.post('/create-admin',validateRequest(UserValidations.createAdminValidations),UserController.createAdmin);




export const UserRoutes = router;