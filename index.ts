import Express from 'express';

const app = Express();
const PORT = 8000;

app.get('/', (req, res) => {
  res.send('Typescript + Express!!!!');
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
