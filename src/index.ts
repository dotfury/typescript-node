import Express from 'express';
import mongoose from 'mongoose';
import config from './config';

// routes
import quotesRouter from './routes/quotes';

const PORT = config.SERVER.port;
const app = Express();

mongoose.connect(config.MONGO_DB.url, config.MONGO_OPTIONS);
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
