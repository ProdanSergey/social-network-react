import express from 'express';

import * as appController from '../controllers/server.controller';

const router = express.Router();

router.route('/')
        .get(appController.getFriends)
        .put(appController.addOrRemoveFriend)
        .delete(appController.addOrRemoveFriend)

export default router;