import express from 'express';
import controller from '../controllers/quote';

const router = express.Router();

router.get('/', controller.getQuotes);
router.post('/', controller.createQuote);

export default router;
