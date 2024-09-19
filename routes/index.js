const express = require("express");
const auth = require('../middleware/auth'); // Import the auth middleware
const checkRole = require('../middleware/role'); // Import the role middleware
const router = express.Router();

router.get('/', async (req, res) => {
    return res.render('index', { title: 'Home' });
});

router.get('/auth', async (req, res) => {
    return res.render('auth', { title: 'Auth' });
});

// Protected routes
router.get('/admin', auth, checkRole('admin'), async (req, res) => {
    return res.render('admin', { title: 'Admin' });
});

// router.get('/customer', auth, checkRole('customer'), async (req, res) => {
//     return res.render('customer', { title: 'Customer' });
// });

module.exports = router;