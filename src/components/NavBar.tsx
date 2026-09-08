import ArrowIcon from "./ArrowIcon";
import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Logo from "./Logo";
export default function NavBar() {
  const { items } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem("bw_theme") === "dark";
    } catch {
      return false;
    }
  });
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("bw_theme", dark ? "dark" : "light");
    } catch {}
  }, [dark]);
  useEffect(() => {
    setOpen(false);
    setSearch(false);
  }, [location]);
  return (
    <header className="site-header">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="nav-inner">
        <Link to="/" aria-label="Bouldwood home">
          <Logo />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <NavLink to="/products">The collection</NavLink>
          <Link to="/#story">Our philosophy</Link>
          <Link to="/#details">The details</Link>
        </nav>
        <div className="nav-actions">
          <button
            className="icon-button"
            aria-label="Search"
            aria-expanded={search}
            onClick={() => setSearch(!search)}
          >
            <svg viewBox="0 0 24 24">
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="m16 16 5 5" />
            </svg>
          </button>
          <button
            className="icon-button"
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setDark(!dark)}
          >
            {dark ? "☼" : "◐"}
          </button>
          <Link className="bag-link" to="/cart">
            Bag <span>{items.reduce((n, i) => n + i.qty, 0)}</span>
          </Link>
          <button
            className="menu-button icon-button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? "×" : "☰"}
          </button>
        </div>
      </div>
      {search && (
        <form
          className="nav-search"
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/products?q=" + encodeURIComponent(query));
          }}
        >
          <input
            autoFocus
            aria-label="Search collection"
            placeholder="Find your next favourite piece…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search <ArrowIcon /></button>
        </form>
      )}
      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <Link to="/products">The collection <ArrowIcon /></Link>
          <Link to="/#story">Our philosophy <ArrowIcon /></Link>
          <Link to="/#details">The details <ArrowIcon /></Link>
        </nav>
      )}
    </header>
  );
}
