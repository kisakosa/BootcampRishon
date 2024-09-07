require('dotenv').config();
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

const indexRouter = require('./routes/index');
const apiRouterRoutes = require('./routes/api/v1/route');

// init database
require('./classes/mongo')(app);

// routes
app.use('/', indexRouter);
app.use('/api/v1/routes', apiRouterRoutes);

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
