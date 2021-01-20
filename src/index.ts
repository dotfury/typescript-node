import Express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv-flow';

// routes
import quotesRouter from './routes/quotes';

dotenv.config();

const app = Express();
const PORT = process.env.PORT;
const DB_USER = process.env.MONGODB_USER_NAME;
const DB_PASSWORD = process.env.MONGODB_PASSWORD;
const DB_NAME = process.env.MONGODB_DB_NAME;

const DB_CONNECT_STRING = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@generic.6gly7.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(DB_CONNECT_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
const client = mongoose.connection;

client.once('open', () => {
  console.log('connected to database');
});

client.on('error', (error) => {
  console.error(error.message);
});

app.use(Express.json());
app.use('/quotes', quotesRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
