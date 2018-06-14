import express from 'express';

//import controller file
import * as appController from '../controllers/server.controller';

// get an instance of express router
const router = express.Router();

router.route('/')
        .get(appController.getUsers)
        .post(appController.addUser)
        .put(appController.updateUser);
router.route('/:id')
        .get(appController.getUsers)
        .delete(appController.deleteUser);

export default router;