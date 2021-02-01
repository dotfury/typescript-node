import dotenv from 'dotenv-flow';

dotenv.config();

const PORT = process.env.PORT;
const DB_USER = process.env.MONGODB_USER_NAME;
const DB_PASSWORD = process.env.MONGODB_PASSWORD;
const DB_NAME = process.env.MONGODB_DB_NAME;
const SECRET_KEY = process.env.SECRET_KEY || 'empty_key';

const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
  poolSize: 50,
  autoIndex: false,
  retryWrites: false
};

const MONGO_DB = {
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  url: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@generic.6gly7.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
};

const SERVER = {
  port: PORT
};

const config = {
  MONGO_DB,
  MONGO_OPTIONS,
  SERVER,
  SECRET_KEY
};

export default config;
