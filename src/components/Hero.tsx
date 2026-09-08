import ArrowIcon from "./ArrowIcon";
import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
export default function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="hero">
      <img
        className="hero-image"
        src="/assets/editorial/living-1600.webp"
        srcSet="/assets/editorial/living-640.webp 640w, /assets/editorial/living-960.webp 960w, /assets/editorial/living-1600.webp 1600w"
        sizes="100vw"
        alt="Warm, sunlit living room with natural textures and considered furniture"
        fetchPriority="high"
      />
      <div className="hero-shade" />
      <motion.div
        className="hero-content"
        initial={reduce ? false : { opacity: 1, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="eyebrow">CONSIDERED DESIGN. EVERYDAY LIVING.</p>
        <h1>
          A slower kind
          <br />
          of <em>living.</em>
        </h1>
        <p className="hero-description">
          Objects with purpose. Spaces with soul.
          <br />
          Furniture that feels like coming home.
        </p>
        <Link to="/products" className="button button-light">
          Explore the collection <ArrowIcon />
        </Link>
      </motion.div>
      <div className="hero-bottom">
        <span>Made to belong. Built to stay.</span>
        <a href="#collections">
          SCROLL TO DISCOVER <ArrowIcon direction="down" />
        </a>
        <span>01 — THE ART OF HOME</span>
      </div>
    </section>
  );
}
