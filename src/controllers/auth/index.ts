import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import User from '../../models/user';
import signJWT from '../../helpers/signJWT';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    message: 'Authorized'
  });
};

const login = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  User.find({ username })
    .select('-password')
    .exec()
    .then((users) => {
      if (users.length !== 1) {
        return res.status(401).json({
          message: 'Unauthorized'
        });
      }

      bcrypt.compare(password, users[0].password, (error, result) => {
        if (error) {
          return res.status(401).json({
            message: 'Unauthorized'
          });
        } else if (result) {
          signJWT(users[0], (error, token) => {
            if (error) {
              return res.status(401).json({
                message: 'Unauthorized',
                error: error
              });
            } else if (token) {
              return res.status(200).json({
                message: 'Auth Successful',
                token,
                user: users[0]
              });
            }
          });
        }
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error
      });
    });
};

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find()
    .select('-password')
    .exec()
    .then((users) => {
      return res.status(200).json({
        users,
        count: users.length
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error
      });
    });
};

const registerUser = (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;

  bcrypt.hash(password, 10, (hashError, hash) => {
    if (hashError) {
      return res.status(500).json({
        message: hashError.message,
        error: hashError
      });
    }

    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      username,
      email,
      password: hash
    });

    return user
      .save()
      .then((user) => {
        return res.status(201).json({ user });
      })
      .catch((error) => {
        return res.status(500).json({
          message: error.message,
          error
        });
      });
  });

  // const user = new User({
  //   _id: new mongoose.Types.ObjectId(),
  //   username,
  //   email,
  //   password: passwordHash
  // });

  // user.save((error, User) => {
  //   var token = jwt.sign({ id: User._id }, config.SECRET_KEY, { expiresIn: 86400 });
  //   if (error) {
  //     res.status(500).send(error);
  //   } else {
  //     res.status(200).send({ auth: true, token: token });
  //   }
  // });
};

export default {
  registerUser,
  login,
  getAllUsers,
  validateToken
};
