import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Quote from '../models/quote';

const getQuotes = (req: Request, res: Response, next: NextFunction) => {
  Quote.find()
    .then((result: any) => {
      return res.status(200).json(result);
    })
    .catch((error: Error) => res.json({ message: error.message, error }));
};

const createQuote = (req: Request, res: Response, next: NextFunction) => {
  const { text, name } = req.body;

  const quote = new Quote({
    _id: new mongoose.Types.ObjectId(),
    name,
    text
  });

  quote
    .save()
    .then((result: any) => {
      return res.status(201).json({ quote: result });
    })
    .catch((error: Error) => {
      return res.status(500).json({ message: error.message, error });
    });
};

export default {
  getQuotes,
  createQuote
};
