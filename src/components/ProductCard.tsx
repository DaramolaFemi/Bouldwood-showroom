import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../data/products";
import ResponsiveImage from "./ResponsiveImage";

export default function ProductCard({
  p,
  onQuickView,
}: {
  p: Product;
  onQuickView?: (p: Product) => void;
  imageIndex?: number;
}) {
  return (
    <article className="product-card">
      <div className="product-picture">
        <Link to={"/product/" + p.id} aria-label={`View ${p.name}`}>
          <ResponsiveImage
            src={p.images[0]}
            alt={p.name}
            className="product-photo"
            sizes="(max-width: 640px) 100vw, 33vw"
          />
        </Link>
        <span className="product-badge">
          {p.badges?.[0] || "A future favourite"}
        </span>
        {onQuickView && (
          <button
            className="product-quick-view"
            onClick={() => onQuickView(p)}
            aria-label={"Quick view " + p.name}
          >
            Quick view
          </button>
        )}
      </div>
      <div className="product-meta">
        <Link to={"/product/" + p.id}>
          <h3>{p.name}</h3>
        </Link>
        <span>${p.price.toLocaleString()}</span>
      </div>
      <p className="product-material">{p.material}</p>
      <div
        className="swatches"
        role="img"
        aria-label={"Available finishes: " + p.colors?.join(", ")}
      >
        <i />
        <i />
        <i />
      </div>
    </article>
  );
}
