import express from 'express';
import Quote from '../models/quote';

const router = express.Router();

router.get('/', async (req, res) => {
  const results = await Quote.find().catch((error: Error) => res.end(error.message));

  res.json(results);
});

router.post('/', (req, res) => {
  const newQuote = new Quote(req.body);

  newQuote
    .save()
    .then((result) => res.send(result))
    .catch((error: Error) => res.end(error.message));
});

export default router;
