import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar fixed top-0 z-[999] bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Django + React Challenge
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Log In</a>
          </li>
          <li>
            <a>Sign Up</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
