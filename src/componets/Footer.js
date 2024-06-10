import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer" style={{background: 'linear-gradient(0deg, rgba(1,18,40,1) 39%, rgba(38,66,71,1) 100%)'}}>
      <div className="footer-container">
        <div className="newsletter pt-4">
          <h5 className='fw-bold'>JOIN OUR NEWSLETTER</h5>
          <p>Sign up to receive awesome content</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email address" />
            <button onClick={(e) => { e.preventDefault(); }}>Let’s keep in touch</button>
          </form>
        </div>
        <div className="contact-info pt-4 text-center">
          <h5 className='fw-bold'>CONTACT INFO</h5>
          <ul>
            <li>701 218 385</li>
            <li>info@bookStore.com</li>
            <li>BookStore Gallery, Chelannur, Kozhikode, India.</li>
          </ul>
        </div>

      </div>
      <div className="footer-bottom pb-1">
        <p>© Copyright 2023 BookStore Gallery. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;