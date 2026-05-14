import { useState } from "react";
import { LOGO_URL } from "../components/utils/constants";
import { Link } from "react-router-dom";

const Header = () => {

  const [loginText, setLoginText] = useState("Login")

  return (
    <div className="header">
      <div className="logo-container">
       <Link to="/"><img
          className="logo"
          src= {LOGO_URL}
          alt="logo"
        /></Link> 
        <h2>Yum Yum</h2>
      </div>
      <div className="nav-items">
        <ul>
          <li>
          <Link to="/" className="nav-link">Home</Link></li>
          <li>
           <Link to="/about" className="nav-link">About Us</Link></li>
          <li><Link to="/contact" className="nav-link">Contact</Link></li>
          <li className="nav-link">Cart</li>
          <button className="login-btn" onClick={()=>{
            loginText==="Login" ? setLoginText("Logout") : setLoginText("Login")
          }}>{loginText}</button>
        </ul>
      </div>
    </div>
  );
};

export default Header;