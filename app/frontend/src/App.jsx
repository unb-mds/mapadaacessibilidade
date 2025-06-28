import React  from "react";
import Home from "./pages/Home.jsx"; // Adjust the path as necessary
import Cadastro from "./pages/Cadastro.jsx"; // Adjust the path as necessary
import Login from "./pages/Login.jsx"; // Adjust the path as necessary
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Sobre from "./pages/Sobre.jsx";
import Contato from "./pages/Contato.jsx";
import FAQ from "./pages/FAQ.jsx"; 
import Eventos from "./pages/Eventos.jsx";
import 'leaflet/dist/leaflet.css';
import Local from './pages/Local.jsx';

const App = () => {
  return (
    <div>
      <Header />
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sobre-nos' element={<Sobre />} />
        <Route path='/contato' element={<Contato />} />
        <Route path='/perguntas-frequentes' element={<FAQ />} />
        <Route path='/eventos' element={<Eventos />} />
        <Route path='/adicionar-local' element={<Local />} />
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path='/Login' element={<Login />} />
               
      </Routes>
      <Footer />
      
    </div>
  );
}
export default App;
