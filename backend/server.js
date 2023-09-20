const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./Routes/Routes');
const cors = require('cors');

dotenv.config();
const app = express();

// Abilita CORS per tutte le origini
// Questa chiamata è opzionale e può essere rimossa se non desideri abilitare CORS per tutte le origini
app.use(cors());

// Specifica le origini consentite (sostituisci con il tuo dominio reale)
app.use(cors({
  origin: 'https://650ac4f118794a32a456cc73--teal-belekoy-8b7fdb.netlify.app',
}));

// Specifica le origini consentite (sostituisci con il tuo dominio reale)
app.use(cors({
  origin: 'https://aq-server.onrender.com/auth/signup--teal-belekoy-8b7fdb.netlify.app',
}));

// Specifica le origini consentite (sostituisci con il tuo dominio reale)
app.use(cors({
  origin: 'https://aq-server.onrender.com/auth/login--teal-belekoy-8b7fdb.netlify.app',
}));


// Middlewares
app.use(express.json());

// Connessione al database
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connesso al database');
  })
  .catch((error) => {
    console.error('Errore di connessione al database:', error);
  });

// Rotte per l'autenticazione
app.use('/auth', authRoutes);

// Avvio del server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
