const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/current-date', (req, res) => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = today.getFullYear();

  const todayFormatted = yyyy + '-' + mm + '-' + dd;
  res.json({ date: todayFormatted });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});