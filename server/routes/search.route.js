import express from 'express';

import * as appController from '../controllers/server.controller';

const router = express.Router();

router.route('/')
        .post(appController.search)

export default router;