import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Autocomplete from './components/Autocomplete';
import api from 'services/api/index';
import isEmpty from 'utils/isEmpty';

// simple fallback data for offline testing
// not fetched asynchronously as I included a real API call
const FALLBACK_DATA = [
  'Alejandro Booth',
  'Valerie Moncada',
  'Karla Hernandez',
  'Jose Booth',
  'Yolanda Hernandez',
  'Fernando Booth',
  'Jorge Pineda',
  'Duvania Hernandez',
  'Alejandro Hernandez',
  'Cristiano Ronaldo',
  'Bruno Fernandes',
  'Nemanja Vidic',
  'Paul Scholes',
  'Juan Mata',
  'Mohammed Salah',
  'Luke Shaw',
  'Fred Malinho',
  'Luis Diaz',
  'Fabinho Diaz',
  'Eden Hazard',
  'Gareth Bale',
  'Albert Einstein',
  'Mike Tyson',
  'Evander Holyfield',
  'Manny Pacquiao',
  'Floyd Mayweather',
  'Florentino Perez',
]

function App() {

  const [namesList, setNamesList] = useState<string[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data: any = await api.getUsers();
    !isEmpty(data) ? setNamesList(data) : setNamesList(FALLBACK_DATA);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <Autocomplete namesList={namesList} autoFocus />
        </div>
      </header>
    </div>
  );
}

export default App;
