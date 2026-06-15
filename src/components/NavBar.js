import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function NavBar() {

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("role"));

  const handleLogout = () => {
    localStorage.removeItem("role")
    localStorage.removeItem("employeeId")
    setIsLoggedIn(false);
    navigate("/login");
    window.location.reload();
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Asset Management App</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {!isLoggedIn ? (
                <li className="nav-item ms-3">
                  <Link className="nav-link active fw-bold" aria-current="page" to="/login">Login</Link>
                </li>
              ) : (
                <li className="nav-item">
                  <button className="nav-link active fw-bold" onClick={handleLogout} > Logout </button>
                </li>
              )}

            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
