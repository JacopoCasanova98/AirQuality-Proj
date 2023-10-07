import React, { useState, useEffect } from 'react';
import AirQualityCard from './AirQualityCard';
import AirQualityLevelsTable from './AirQualityLevelsTable';
import CitySearch from './CitySearch';
import PollutantInfo from './PollutantInfo';

function Home() {

  const [airQualityData, setAirQualityData] = useState(null);
  const [error, setError] = useState(null);
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  


  const getAirQuality = async (city) => {
    try {
      const response = await fetch(`https://api.waqi.info/feed/${city}/?token=b49bc52070932d341a0dd2ceb5e450aa9269358c`)
      const data = await response.json()
      console.log(data)
      if(response.ok && data.status === 'ok') {
        setAirQualityData(data.data)
        setError(null)
      } else {
        setError("Sorry, we couldn't find the city you were looking for. Try another location nearby or ensure your spelling is correct.")
        setAirQualityData(null)
      }
    } catch (error) {
      console.error("network error:", error)
      setError('Sorry, something went wrong')
      setAirQualityData(null)
    }
  }

 // Funzione per aggiungere una città preferita
 const addFavoriteCity = async (city_name) => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:3000/auth/add-favorite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
      body: JSON.stringify({ city_name }),
    });

    if (response.ok) {
      console.log('Città Aggiunta');
      setErrorMessage(null); // Resetta il messaggio di errore se era stato impostato precedentemente

      getFavoriteCities();
    } else if (response.status === 400) {
      const data = await response.json();
      setErrorMessage(data.message); // Imposta il messaggio di errore dal server
    } else {
      console.log('Errore, Città non Aggiunta');
      console.log(city_name);
    }
  } catch (error) {
    console.error('Si è verificato un errore durante l\'aggiunta della città preferita:', error);
  }
};



// Funzione per rimuovere una città preferita
const removeFavoriteCity = async (city_name) => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:3000/auth/remove-favorite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ city_name }),
    });

    if (response.ok) {
      console.log('Città Rimossa');
      setErrorMessage(null); // Resetta il messaggio di errore se era stato impostato precedentemente

      // Aggiorna lo stato delle città preferite dopo la rimozione
      const updatedFavoriteCities = favoriteCities.filter((city) => city !== city_name);
      setFavoriteCities(updatedFavoriteCities);
    } else if (response.status === 400) {
      const data = await response.json();
      setErrorMessage(data.message); // Imposta il messaggio di errore dal server
    } else {
      console.log('Errore, Città non Rimossa');
      console.log(city_name);
    }
  } catch (error) {
    console.error('Si è verificato un errore durante la rimozione della città preferita:', error);
  }
};




  const getFavoriteCities = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:3000/auth/favorite-cities', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFavoriteCities(data.favoriteCities);
      } else {
        console.error('Errore nel recupero delle città preferite');
      }
    } catch (error) {
      console.error('Si è verificato un errore durante il recupero delle città preferite:', error);
    }
  };

  useEffect(() => {
    getFavoriteCities();
  }, []);
  




  return (
    <div className='container'>
      <div className='items-center'>

      <div className='login-form'>
      </div>

    <h1 className='mt-5-mb-3'>🌍 Air Quality Index Checker</h1>
    <CitySearch getAirQuality={getAirQuality}/>
    {error && (
      <div className='alert-danger' role='alert'>
        {error}
      </div>
    )}

    <div className='result-container'>
    {airQualityData && (
      <div className='info-levels'>
      <>
      <AirQualityCard data={airQualityData} />
      <PollutantInfo pollutant={airQualityData.dominentpol}/>
      </>
      </div>
    )}

    <AirQualityLevelsTable />

    <button className='remove-favorite-button' onClick={() => removeFavoriteCity(airQualityData.city.name)}>Rimuovi Città Preferita</button>

    <button className='favorite-button' onClick={() => addFavoriteCity(airQualityData.city.name)}>Aggiungi Città Preferita</button>
          {errorMessage && (
            <div className='alert-danger' role='alert'>
              {errorMessage}
            </div>
          )}



    <div className='favorite-cities'>
          <h2 className='preferites-title'>Città Preferite</h2>
          <ul className='favorite-list'>
            {favoriteCities.map((city_name, index) => (
              <li key={index}>{city_name}</li>
            ))}
          </ul>
        </div>

    </div>
    </div>

    </div>

  );
}

export default Home;
