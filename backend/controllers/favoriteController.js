const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Middleware per l'autenticazione dell'utente
exports.authenticate = async (req, res, next) => {
  try {
    // Verifica se c'è un token nell'header della richiesta
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: 'Token non autorizzato' });
    }

    // Stampa il token per scopi di debug
    console.log('Token ricevuto:', token);

    // Verifica del token JWT
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);

    // Stampa decoded per scopi di debug
     console.log('Token decodificato:', decoded);

     console.log('Token JWT estratto dal backend:', token);

    // Trova l'utente nel database in base all'ID estratto dal token
    const user = await User.findById(decoded.userId);

    // Verifica se l'utente esiste
    if (!user) {
      return res.status(401).json({ message: 'Utente non autorizzato' });
    }

    // Aggiungi l'utente alla richiesta per l'uso successivo
    req.user = user;
    next();
  } catch (error) {
    console.error('Errore durante l\'autenticazione:', error);
    res.status(401).json({ message: 'Accesso Utente non autorizzato' });
  }
};

// Funzione per aggiungere una città preferita a un utente
exports.addFavorite = async (req, res) => {
  try {

    const { city_name } = req.body;

    // Verifica del token JWT
    const decoded = jwt.verify(req.headers.authorization.replace("Bearer ", ""), process.env.JWT_SECRET);

    // Recupera l'ID utente dalla decodifica del token JWT
    const userId = decoded.userId;

    // Verifica se l'utente esiste
    const user = await User.findById(userId);

    if (!user) {
      return res.status(403).json({ message: 'Utente non trovato' });
    }

    // Verifica se la città è già presente nell'array favoriteCities dell'utente
    if (user.favoriteCities.includes(city_name)) {
      return res.status(400).json({ message: 'Questa città è già stata aggiunta alle città preferite' });
    }
    

    // Aggiunge la città preferita all'array favoriteCities dell'utente
    user.favoriteCities.push(city_name);

    // Salva le modifiche
    await user.save();

    res.status(200).json({ message: 'Città preferita aggiunta con successo' });
  } catch (error) {
    console.error('Errore durante l\'aggiunta della città preferita:', error);
    res.status(500).json({ message: 'Errore durante l\'aggiunta della città preferita' });
  }
};


// Funzione per rimuovere una città preferita da un utente
exports.removeFavorite = async (req, res) => {
  try {
    // Ottieni il nome della città da rimuovere dalla richiesta
    const { city_name } = req.body;

    // Verifica del token JWT
    const decoded = jwt.verify(req.headers.authorization.replace("Bearer ", ""), process.env.JWT_SECRET);

    // Recupera l'ID utente dalla decodifica del token JWT
    const userId = decoded.userId;

    // Trova l'utente nel database in base all'ID estratto dal token
    const user = await User.findById(userId);

    if (!user) {
      return res.status(403).json({ message: 'Utente non trovato' });
    }

    // Verifica se la città è presente nell'array favoriteCities dell'utente
    if (!user.favoriteCities.includes(city_name)) {
      return res.status(400).json({ message: 'Questa città non è presente nelle città preferite' });
    }

    // Rimuovi la città preferita dall'array favoriteCities dell'utente
    user.favoriteCities = user.favoriteCities.filter((city) => city !== city_name);

    // Salva le modifiche
    await user.save();

    res.status(200).json({ message: 'Città preferita rimossa con successo' });
  } catch (error) {
    console.error('Errore durante la rimozione della città preferita:', error);
    res.status(500).json({ message: 'Errore durante la rimozione della città preferita' });
  }
};



exports.getFavoriteCities = async (req, res) => {
  try {
  
   // Verifica del token JWT
   const decoded = jwt.verify(req.headers.authorization.replace("Bearer ", ""), process.env.JWT_SECRET);

   // Recupera l'ID utente dalla decodifica del token JWT
   const userId = decoded.userId;

   // Verifica se l'utente esiste
   const user = await User.findById(userId);

    if (!user) {
      return res.status(403).json({ message: 'Utente non trovato' });
    }

    const favoriteCities = user.favoriteCities;
    res.status(200).json({ favoriteCities });
  } catch (error) {
    console.error('Errore durante il recupero delle città preferite:', error);
    res.status(500).json({ message: 'Errore durante il recupero delle città preferite' });
  }
};

