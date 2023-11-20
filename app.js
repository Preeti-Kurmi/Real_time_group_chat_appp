const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const routes=require('./routes/routes')
const mysql=require('./util/database')
require('dotenv').config();

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/',routes);


mysql.sync({ force: false})
  .then((res) => {
    console.log(res.data);
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
