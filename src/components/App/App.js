import './App.css';
import React, {useState} from 'react';
import Header from '../Header/Header';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn}/>
    </div>
  );
}

export default App;
