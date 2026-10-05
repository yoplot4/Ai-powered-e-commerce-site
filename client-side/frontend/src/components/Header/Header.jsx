import React from 'react'
import logoPic from '../../assets/images/logo.jpg'
import searchIcon from '../../assets/images/search.png'
import cartIcon from '../../assets/images/cart.png'
import  './Header.css';
function Header() {
  return (
    <header>
      <div className="header-container">
        <div className="left-header-container">
          <div className="left-header-container-logo">
            <a href="index.html">
              <img className="logo-img" src={logoPic} alt="logo" />
            </a>
          </div>
          <div className="left-header-container-title">
            <h2 className="header-title">Ai Powered E-Commerce</h2>
          </div>
        </div>
        <div className="middle-header-container">
          <div className="search-container">
            <input type="text" placeholder="Search..." />
            <img
              className="search-icon"
              src={searchIcon}
              alt="search-icon"
            />
          </div>
          <div className="navbar-container">
            <ul className="navbar-list">
              <li className="navbar-list-item"><a href="index.html">Home</a></li>
              <li className="navbar-list-item"><a href="#">Products</a></li>
              <li className="navbar-list-item"><a href="#">About</a></li>
              <li className="navbar-list-item"><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="right-header-container">
          <div className="cart-container">
            <div className="count-cart">
              <span>1</span>
            </div>
            <a href="#">
              <img src={cartIcon} alt="cart image" />
            </a>
          </div>
          <div className="signUp-container">
            <a href="register.html">Sign Up</a>
          </div>
          <div className="login-container">
            <a href="login.html">Login</a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
