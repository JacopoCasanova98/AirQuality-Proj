const express = require('express');
const router = express.Router();
const authController = require('../controllers/airqualityController');
const favoriteController = require('../controllers/favoriteController');
const axios = require('axios'); // Importa la libreria Axios per effettuare richieste HTTP


router.get('https://aq-server.onrender.com', async (req, res) => {
  try {
    // Effettua una richiesta GET a https://aq-server.onrender.com
    const response = await axios.get('https://aq-server.onrender.com');

    // Se la richiesta va a buon fine, stampa un messaggio di conferma
    console.log('Tutto OK: ', response.data);

    // Invia una risposta al client
    res.status(200).json({ message: 'Tutto OK' });
  } catch (error) {
    // In caso di errore, gestisci l'errore e invia una risposta di errore al client
    console.error('Errore nella richiesta GET: ', error.message);
    res.status(500).json({ message: 'Errore nella richiesta GET' });
  }
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
