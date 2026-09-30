import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        EventHub
      </Link>

      <div className="nav-links">
        <Link to="/">Events</Link>

        {token && (
          <>
            <Link to="/registrations">My Registrations</Link>
            <Link to="/create-event">Create Event</Link>
            <button onClick={logout}>Logout</button>
          </>
        )}

        {!token && <Link to="/login">Login</Link>}
      </div>
    </nav>
  );
}

export default Navbar;