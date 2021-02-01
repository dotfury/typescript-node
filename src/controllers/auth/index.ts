import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from '../../config';
import User from '../../models/user';

const registerUser = (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;
  const passwordHash = bcrypt.hashSync(password, 14);

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    username,
    email,
    password: passwordHash
  });

  user.save((error, User) => {
    var token = jwt.sign({ id: User._id }, config.SECRET_KEY, { expiresIn: 86400 });
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send({ auth: true, token: token });
    }
  });
};

export default {
  registerUser
};
