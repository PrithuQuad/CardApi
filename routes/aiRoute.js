import express from 'express';
const routes =express.Router();
import Upload from '../middleware/multer.js';
import AiController from '../controller/apiControllers.js';

routes.post('/Ai',Upload.any("image"),AiController.getResultFromGeminiController);

export default routes;