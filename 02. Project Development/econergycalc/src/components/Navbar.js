import LogoIcon from '../assets/LogoIcon.png';
import Logo from '../assets/Logo.png';
import React from 'react';
import PropTypes from 'prop-types';


export default function Navbar() {
  return (
    <nav className="navbar bg-body-tertiary ">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <a className="navbar-brand" href="/">
                <img src={Logo} alt="Bootstrap" height="40" />
              </a>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">Add Appliance</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">Recommendations</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">Forum</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Username
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="/">Account Settings</a></li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li><a className="dropdown-item" href="/">Logout</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <a className="navbar-brand" href="/">
            <img src={LogoIcon} alt="Bootstrap" width="50" />
          </a>
        </div>
      </nav>
  )
}

Navbar.propTypes = {title: PropTypes.string}