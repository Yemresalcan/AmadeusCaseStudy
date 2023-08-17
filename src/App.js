import React from 'react';
import './App.css';
import SearchBox from './components/SearchBox'; // SearchBox bileşenini import edin

function App() {
  return (
    <div className="App">
      <h1>Uçuş Arama Uygulaması</h1>
      <SearchBox />  {/* Bileşeni ekleyin */}
    </div>
  );
}

export default App;