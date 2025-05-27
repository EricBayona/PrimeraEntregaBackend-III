import { Router } from "express";
import mocksController from "../controllers/mocks.controller.js";

const router = Router();

router.get('/mockingpets', mocksController.mockPet);


router.get('/mockingusers', mocksController.mockUser);


router.post('/generateData/:users?/:pets?', mocksController.generateData)

export default router;