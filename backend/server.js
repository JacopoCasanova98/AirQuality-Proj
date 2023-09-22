const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./Routes/Routes');
const cors = require('cors');

dotenv.config();
const app = express();

// Configurazione CORS
app.use(cors({
  origin: 'https://650c6cf58066d80c0d91d3ad--keen-duckanoo-44bfcc.netlify.app',
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

// Rotte auth per l'autenticazione
app.use('/auth', authRoutes);

// Avvio del server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});

