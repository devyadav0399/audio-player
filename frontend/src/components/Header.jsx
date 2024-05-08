import { useLocation } from "react-router-dom";
import Logout from "./Logout";

import "./Header.css";

const Header = () => {
  const location = useLocation();

  return (
    <div className="header">
      <div className="logo">
        <img id="ipod" src="ipod.png" alt="" />
      </div>
      <div className="title">
        <h1>Audio Player App</h1>
      </div>
      <div className="logout">
        {location.pathname !== "/login" && <Logout />}
      </div>
    </div>
  );
};

export default Header;
