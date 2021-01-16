import Express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv-flow';

dotenv.config();

const app = Express();
const PORT = process.env.PORT;
const DB_USER = process.env.MONGODB_USER_NAME;
const DB_PASSWORD = process.env.MONGODB_PASSWORD;
const DB_NAME = process.env.MONGODB_DB_NAME;

const DB_CONNECT_STRING = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@generic.6gly7.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(DB_CONNECT_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
client
  .connect()
  .then((client) => console.log('connected to database'))
  .catch((error) => console.log(error.message));

app.use(Express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Typescript + Express!!!!' });
});

app.post('/', (req, res) => {
  res.send(req.body);
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
