const express = require('express');
const router = express.Router();
const authController = require('../controllers/airqualityController');

router.get('https://aq-server.onrender.com', (req, res) => {
   console.log('Get req OK');
});


// Rotte per la registrazione e l'accesso
router.post('/signup', authController.register);
router.post('/login', authController.login);

module.exports = router;
