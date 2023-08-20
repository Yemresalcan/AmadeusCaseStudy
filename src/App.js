import React from 'react'; // index.css dosyasını import edin
import SearchBox from './components/SearchBox'; // SearchBox bileşenini import edin
import './index.css'; // index.css dosyasını import edin
import NavbarComp from './components/NavbarComp';
import Footer from './components/Footer';
function App() {
  return (
    
    <div className="App">
      <NavbarComp />
      <SearchBox />  
      <Footer/>
    </div>
  );
}   

export default App;