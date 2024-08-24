import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthenticationContext } from "../../store/AuthenticationContext";

export default function Navbar() {
  const { isAuthenticated } = useContext(AuthenticationContext);

  return (
    <div className="navbar fixed top-0 z-[999] bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Django + React Challenge
        </Link>
      </div>
      <div className="flex-none">
        <ul
          className={
            "menu menu-horizontal px-1 opacity-100 transition-opacity ease-linear" +
            (isAuthenticated === undefined ? "pointer-events-none !opacity-0" : "")
          }
        >
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/logout">Log Out</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
