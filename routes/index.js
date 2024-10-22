const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => {
    return res.render('index', { title: 'Home' });
});

router.get('/chooseRoute', async (req, res) => {
    return res.render('chooseRoute', { title: 'chooseRoute' });
});

router.get('/login', async (req, res) => {
    return res.render('login', { title: 'login' });
});

router.get('/welcome', async (req, res) => {
    return res.render('welcome', { title: 'welcome' });
});

router.get('/register', async (req, res) => {
    return res.render('register', { title: 'register' });
});

// Feature 3
router.get('/map', async (req, res) => {
    return res.render('mapScreen', { title: 'Map' });
});

router.get('/index1', async (req, res) => {
    return res.render('index1', { title: 'index' });
});


router.get('/list', async (req, res) => {
    return res.render('listView', { title: 'List' });
});

// router.get('/customer', auth, checkRole('customer'), async (req, res) => {
//     return res.render('customer', { title: 'Customer' });
// });

module.exports = router;