const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.set('port', port);
app.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${port}`);
});

module.exports = app;
