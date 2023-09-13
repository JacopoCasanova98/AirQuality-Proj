import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importa anche Routes
import { Link } from 'react-router-dom';
import AirQualityCard from './components/AirQualityCard';
import AirQualityLevelsTable from './components/AirQualityLevelsTable';
import CitySearch from './components/CitySearch';
import Login from './pages/login';
import PollutantInfo from './components/PollutantInfo';
import Signup from './pages/signup';

function App() {

  const [airQualityData, setAirQualityData] = useState(null);
  const [error, setError] = useState(null);

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

    const footer = document.querySelector('footer');
    footer.style.position = 'relative';
    footer.style.top = '10em';
  }



  return (
    <Router>
    <div className='container'>
      <header className='header-login'>
        <Link to='/' className='nav-text'>Home</Link> {/* Utilizza Link per creare il link */}
        <Link to='/login' className='nav-text'>Login</Link> {/* Utilizza Link per creare il link */}
        <Link to='/signup' className='nav-text'>Signup</Link> {/* Utilizza Link per creare il link */}
      </header>

      <div className='items-center'>

      <div className='login-form'>
        <Routes>
          <Route path='/login' element={<Login />} /> 
          <Route path='/signup' element={<Signup />} /> 
        </Routes>
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

    </div>
    </div>

     <div class="footer-section">
        <footer> 
            <div class="text-footer">by Jacopo Casanova</div>
        </footer>
    </div>
    </div>
    </Router>
  );
}

export default App;
