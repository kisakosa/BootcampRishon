const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => {
    return res.render('index', { title: 'Home' });
});

router.get('/routes', async (req, res) => {
    return res.render('routes', { title: 'Routes' });
});

module.exports = router;