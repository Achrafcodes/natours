const express = require('express');
const fs = require('fs');
const app = express();
app.get('/', (req, res) => {
  res.status(200).json({
    name: 'first express code',
    message: 'first object in next',
  });
});
app.post('/', (req, res) => {
  res.send('you can post anythig here ');
});
const port = 3000;
app.listen(port, () => {
  console.log(` app is running in port ${port}`);
});
//  test of the git
