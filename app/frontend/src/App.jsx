import React  from "react";
import Navbar from "./components/Navbar.jsx"; // Adjust the path as necessary
import Home from "./pages/Home.jsx"; // Adjust the path as necessary
import Cadastro from "./pages/Cadastro.jsx"; // Adjust the path as necessary
import Login from "./pages/Login.jsx"; // Adjust the path as necessary
import { Routes, Route } from "react-router-dom";




const App = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
      <Routes>  
        <Route path='/' element={<Home />} />
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path='/Login' element={<Login />} />
        
      </Routes>
      </div>
    </div>
  );
}
export default App;
