import React from 'react';
import facebookIcon from '../../assets/images/facebook.png'
import instagramIcon from '../../assets/images/instagram.jfif'
import telegramIcon from '../../assets/images/telegram.avif'
import tewiterIcon from '../../assets/images/tewiter.png'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer-container">
      <div className="left-footer">
        <p className="description">
          <span>Powered by intelligent technology</span> our platform combines
          AI-driven recommendations, secure transactions, and seamless shopping
          experiences. We’re building the future of e‑commerce—personalized,
          efficient, and customer‑focused
        </p>
        <p className="copy-right">
          &#169; Bell Tech Solutin. All Rights Reserved 2026.
        </p>
      </div>
      <div className="footer-middle">
        <h3>Stay Updated</h3>
        <p>Subscribe to get AI-powered shopping tips and updates.</p>
        <form className="newsletter-form">
          <input type="email" placeholder="Enter your email" required />
          <button type="submit">Subscribe</button>
        </form>
      </div>
      <div className="right-footer">
        <h3>Social Media links</h3>
        <div className="social-media">
          <ul>
            <li><img src={facebookIcon} alt="facebook" /></li>
            <li><img src={instagramIcon} alt="instagram" /></li>
            <li><img src={telegramIcon} alt="telegram" /></li>
            <li><img src={tewiterIcon} alt="tewiter" /></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
