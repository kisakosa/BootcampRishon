require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// MongoDB connection
mongoose.connect(process.env.MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('DB connection is open'));
db.set("useCreateIndex", true);
console.log(process.env.MONGOURL);

// Routes import
app.use('/', require('./routes/index'));
app.use('/api/v1/routes', require('./routes/api/v1/route'));

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
