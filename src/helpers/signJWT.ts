import jwt from 'jsonwebtoken';

import config from '../config';
import User from '../interfaces/user';

type CallbackError = Error | null;
type CallbackToken = string | null;

const signJWT = (user: User, callback: (error: CallbackError, token: CallbackToken) => void): void => {
  const timeSinceEpoch = new Date().getTime();
  const expirationTime = timeSinceEpoch + Number(config.JWT.expire_time) * 100000;
  const expirationTimeInSeconds = Math.floor(expirationTime / 1000);

  try {
    jwt.sign(
      { username: user.username },
      config.JWT.secret,
      { issuer: config.JWT.issuer, algorithm: 'HS256', expiresIn: expirationTimeInSeconds },
      (error, token) => {
        if (error) {
          callback(error, null);
        } else if (token) {
          callback(null, token);
        }
      }
    );
  } catch (error) {
    console.error(error.message, error);
    callback(error, null);
  }
};

export default signJWT;
