import express from 'express';

//import controller file
import * as appController from '../controllers/server.controller';

// get an instance of express router
const router = express.Router();

router.route('/')
        .get(appController.userInfo)
        .put(appController.userInfo)

export default router;