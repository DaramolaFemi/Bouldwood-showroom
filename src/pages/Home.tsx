import ArrowIcon from "../components/ArrowIcon";
import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 1, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65 }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <section className="intro section-shell">
        <p className="eyebrow">LESS, BUT MORE MEANINGFUL</p>
        <Reveal>
          <h2>
            Good design doesn’t shout.
            <br />
            It makes you <em>feel something.</em>
          </h2>
        </Reveal>
        <p>
          Natural materials. Thoughtful proportions. A quiet attention to
          detail.
          <br className="desktop-break" /> We believe the things you live with
          should only get better with time.
        </p>
      </section>
      <section id="collections" className="section-shell collection-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE CONSIDERED COLLECTION</p>
            <h2>
              Your everyday, <em>elevated.</em>
            </h2>
          </div>
          <Link className="text-link" to="/products">
            Discover all pieces
          </Link>
        </div>
        <Reveal className="product-grid">
          {products.map((p, i) => (
            <ProductCard key={p.id} p={p} imageIndex={i} />
          ))}
        </Reveal>
      </section>
      <section id="story" className="story section-shell">
        <Reveal className="story-image">
          <img
            src="/assets/editorial/living-960.webp"
            loading="lazy"
            alt="Soft neutrals, wood and natural light in a thoughtfully furnished home"
          />
          <span>A LITTLE CLOSER TO NATURE.</span>
        </Reveal>
        <Reveal className="story-copy">
          <p className="eyebrow">THE BOULDWOOD PHILOSOPHY</p>
          <h2>
            Not just a piece.
            <br />
            <em>A part of your life.</em>
          </h2>
          <p>
            The morning coffee. The long conversations. The Sunday with nowhere
            to be. We design for the moments that make a house your home.
          </p>
          <p>
            Honest materials and enduring forms, chosen with intention. Because
            the most beautiful spaces are the ones that feel like you.
          </p>
          <Link to="/products" className="text-link">
            Find your piece
          </Link>
        </Reveal>
      </section>
      <section id="details" className="values section-shell">
        <div>
          <span>01 / MATERIAL</span>
          <h3>Honest by nature.</h3>
          <p>
            Rich timber, tactile textiles, and finishes you’ll want to reach out
            and touch.
          </p>
        </div>
        <div>
          <span>02 / FORM</span>
          <h3>Room to breathe.</h3>
          <p>
            Considered silhouettes that bring balance to the spaces you call
            your own.
          </p>
        </div>
        <div>
          <span>03 / EVERYDAY</span>
          <h3>Made for living.</h3>
          <p>
            Comfort and character in equal measure. Pieces for all of life’s
            little rituals.
          </p>
        </div>
      </section>
      <section className="closing">
        <p className="eyebrow">MAKE ROOM FOR WHAT MATTERS</p>
        <h2>
          Your home.
          <br />
          <em>Your kind of beautiful.</em>
        </h2>
        <Link to="/products" className="button button-light">
          Find something to come home to <ArrowIcon />
        </Link>
      </section>
    </>
  );
}
