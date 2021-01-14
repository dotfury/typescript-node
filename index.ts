import Express from 'express';

const app = Express();
const PORT = 8000;

app.use(Express.json());

app.get('/', (req, res) => {
  res.json({message: 'Typescript + Express!!!!'});
});

app.post('/', (req, res) => {
  res.send(req.body);
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
