const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router=express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const {signup, login} = require('../controllers/authController');
const pageController = require('../controllers/pageController');

router.post('/signup', signup)
router.post('/login', login);

module.exports = router;

