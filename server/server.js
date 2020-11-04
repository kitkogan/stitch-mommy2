
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const countRouter = require('./routes/count.router.js');
const PORT = process.env.PORT || 5000;

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for axios requests
app.use(express.static('build'));

/** ---------- EXPRESS ROUTES ---------- **/
app.use('/count', countRouter);
// app.use('/count/decrement', countRouter);

/** ---------- START SERVER ---------- **/
app.listen(PORT,  () => {
    console.log('Listening on port: ', PORT);
});