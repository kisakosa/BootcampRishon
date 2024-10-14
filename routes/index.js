const express = require("express");
const auth = require('../middleware/auth'); // Import the auth middleware
const checkRole = require('../middleware/role'); // Import the role middleware
const router = express.Router();

router.get('/', async (req, res) => {
    return res.render('index', { title: 'Home' });
});

router.get('/map', async (req, res) => {
    return res.render('mapScreen', { title: 'Map' });
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

router.get('/admin/add-new-route', auth, checkRole('admin'), async (req, res) => {
    return res.render('manageRoute', { title: 'Add Route' });
});
router.get('/admin/update-route', auth, checkRole('admin'), async (req, res) => {
    return res.render('manageRoute', { title: 'Update Route' });
});

router.get('/admin/add-new-route/places', auth, checkRole('admin'), async (req, res) => {
    return res.render('manageRoutePlaces', { title: 'Add Route`s Places' });
});
router.get('/admin/update-route/places', auth, checkRole('admin'), async (req, res) => {
    return res.render('manageRoutePlaces', { title: 'Update Route`s Places' });
});

// router.get('/customer', auth, checkRole('customer'), async (req, res) => {
//     return res.render('customer', { title: 'Customer' });
// });

module.exports = router;