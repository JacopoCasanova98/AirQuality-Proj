const express = require('express');
const router = express.Router();
const authController = require('../controllers/airqualityController');
const favoriteController = require('../controllers/favoriteController');


router.get('https://aq-server.onrender.com', (req, res) => {
   
   console.log('Get req OK');
});




// Rotte per la registrazione e l'accesso
router.post('/signup', authController.register);
router.post('/login', authController.login);



// Rotta per aggiungere un preferito
router.post('/add-favorite', favoriteController.authenticate, favoriteController.addFavorite);

// Rotta per rimuovere un preferito
router.post('/remove-favorite', favoriteController.authenticate, favoriteController.removeFavorite);


router.get('/favorite-cities', favoriteController.authenticate, favoriteController.getFavoriteCities);


module.exports = router;
