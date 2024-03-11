const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
require('dotenv').config()

const app = express();


app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/user', require('./routes/users'));
app.use('/api/employes', require('./routes/employes'));

module.exports = app;






//? відкрити prisma studio
// npx prisma studio

//? Нова міграція
//* перезапис prisma studio
// npx prisma migrate dev change-field
//* далі там в середині пишемо що змінилось (address)
// change address name

//* створити реакт проект
// npx create - react - app client--template redux - typescript