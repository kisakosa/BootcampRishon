const express = require("express");
const auth = require('../middleware/auth'); // Import the auth middleware
const checkRole = require('../middleware/role'); // Import the role middleware
const router = express.Router();

router.get('/', async (req, res) => {
    return res.render('index', { title: 'Home' });
});

router.get('/login', async (req, res) => {
    return res.render('login', { title: 'login' });
});

router.get('/register', async (req, res) => {
    return res.render('register', { title: 'register' });
});

// Protected routes
router.get('/admin', auth, checkRole('admin'), async (req, res) => {
    return res.render('admin', { title: 'Admin' });
});

// router.get('/customer', auth, checkRole('customer'), async (req, res) => {
//     return res.render('customer', { title: 'Customer' });
// });

module.exports = router;