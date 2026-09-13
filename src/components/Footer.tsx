import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="site-footer section-shell">
      <div className="footer-top">
        <div>
          <Link to="/" aria-label="Bouldwood home">
            <Logo />
          </Link>
          <p>Thoughtfully chosen. Beautifully lived in.</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link to="/products">The collection</Link>
          <Link to="/#story">Our philosophy</Link>
          <Link to="/cart">Your bag</Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Bouldwood</span>
        <span>Objects with purpose. Spaces with soul.</span>
        <a href="#main">Back to top</a>
      </div>
    </footer>
  );
}
