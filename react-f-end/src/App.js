import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importa anche Routes
import { Link } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import Home from './components/Home';

function App() {



  return (
<Router>
    <div className='container'>
      <header className='header-login'>
        <Link to='/' className='nav-text'>Home</Link> {/* Utilizza Link per creare il link */}
        <Link to='/login' className='nav-text'>Login</Link> {/* Utilizza Link per creare il link */}
        <Link to='/signup' className='nav-text'>Signup</Link> {/* Utilizza Link per creare il link */}
      </header>

        <Routes>
          <Route path='/' element={<Home />} /> 
          <Route path='/login' element={<Login />} /> 
          <Route path='/signup' element={<Signup />} /> 
        </Routes>
    </div>
  </Router>
  );
}

export default App;
