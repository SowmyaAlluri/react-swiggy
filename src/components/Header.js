import { useState } from "react";
import { LOGO_URL } from "../components/utils/constants"

const Header = () => {

  const [loginText, setLoginText] = useState("Login")

  return (
    <div className="header">
      <div className="logo-container">
        <img
          className="logo"
          src= {LOGO_URL}
          alt="logo"
        />
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Cart</li>
          <button className="login-btn" onClick={()=>{
            loginText==="Login" ? setLoginText("Logout") : setLoginText("Login")
          }}>{loginText}</button>
        </ul>
      </div>
    </div>
  );
};

export default Header;