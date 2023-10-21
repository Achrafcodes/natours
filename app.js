const express = require('express');
const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.status(200).json({ message: 'hello from express', app: 'natour' });
});

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
