import { useLocation } from "react-router-dom";
import Logout from "./Logout";

const Header = () => {
  const location = useLocation();

  return (
    <div className="header">
      <h1>Audio Player App</h1>
      {location.pathname !== "/login" && <Logout />}
    </div>
  );
};

export default Header;
