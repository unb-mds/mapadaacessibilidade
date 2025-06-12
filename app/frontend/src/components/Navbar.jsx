import React from "react";
import logo from "../assets/logoAcessibilidade.jpeg"; // Adjust the path as necessary
import { NavLink, useNavigate} from "react-router-dom";





const Navbar = () => {
    const navigate = useNavigate();



  return (
    <div className="navbar">
        <img src={logo} alt ="" width="130px"/>
      <ul>
      <NavLink to='/'><li>Home</li> </NavLink>
        <NavLink to='/cadastro'><li>Cadastro</li></NavLink>
        <NavLink to='/login'><li>Login</li></NavLink>
      </ul>
      <button onClick={()=> navigate('/about', {replace:true})}>Get Started</button>
    </div>
  );
}       
export default Navbar;