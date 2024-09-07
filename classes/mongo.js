const session = require('express-session'),
    mongoose = require('mongoose');

const init = (app) => new MongoInstance(app);

class MongoInstance {
    constructor(app) {
        mongoose.connect(process.env.MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true });
        this.instance = mongoose.connection;
        this.instance.on('error', console.error.bind(console, 'connection error:'));
        //autoIncrement.initialize(this.instance);
        this.instance.once('open', () => console.log('DB connection is open')).on('error', (error) => console.log(error));
        this.instance.set("useCreateIndex", true);

        // app.use(session({
        //     secret: process.env.SESSION_SECRET,
        //     resave: false,
        //     saveUninitialized: false,
        //     cookie: {
        //         secure: false
        //     },
        // }))
        console.log(process.env.MONGOURL);
    }

    getConnection() {
        return this.instance;
    }
}

module.exports = init;
