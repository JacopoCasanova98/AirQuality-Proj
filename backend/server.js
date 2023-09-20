const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./Routes/Routes');
const cors = require('cors');

dotenv.config();
const app = express();

// Configurazione CORS
app.use(cors({
  origin: 'https://teal-belekoy-8b7fdb.netlify.app',
}));

// Middlewares
app.use(express.json());

// Connessione al database
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      poolSize: 10, // Numero di connessioni nel pool
    });
    console.log('Connesso al database');
  } catch (error) {
    console.error('Errore di connessione al database:', error);
    process.exit(1); // Esci dall'app in caso di errore di connessione
  }
}

connectToDatabase(); // Chiama la funzione di connessione

// Rotte per l'autenticazione
app.use('/auth', authRoutes);

// Avvio del server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
