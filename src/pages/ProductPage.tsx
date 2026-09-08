import ArrowIcon from "../components/ArrowIcon";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../context/CartContext";
import { motion, useReducedMotion } from "framer-motion";
import ProductGallery from "../components/ProductGallery";
import ProductCard from "../components/ProductCard";

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const reduce = useReducedMotion();
  const [added, setAdded] = useState(false);
  if (!product)
    return (
      <div className="container mx-auto px-6 py-12">Product not found</div>
    );

  return (
    <div className="container mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
      <div>
        <ProductGallery images={product.images} />
      </div>
      <div>
        <h1 className="text-3xl font-display">{product.name}</h1>
        <div className="mt-4 text-xl font-semibold">${product.price}</div>
        <p className="mt-6 text-muted">{product.description}</p>
        <div className="mt-6">
          <div className="flex items-center gap-3">
            <label htmlFor="quantity">Quantity</label>
            <input
              id="quantity"
              type="number"
              min={1}
              max={99}
              value={qty}
              onChange={(e) =>
                setQty(
                  Math.max(
                    1,
                    Math.min(99, Math.floor(Number(e.target.value)) || 1),
                  ),
                )
              }
              className="w-20 px-2 py-1 border"
            />
          </div>
          <div className="mt-6 flex gap-4">
            <motion.button
              whileTap={reduce ? undefined : { scale: 0.98 }}
              onClick={() => {
                add(product, qty);
                setAdded(true);
              }}
              className="px-6 py-3 bg-black text-white"
            >
              {added ? "Added to bag ✓" : "Add to Cart"}
            </motion.button>
            <a href="/cart" className="px-6 py-3 border">
              View bag <ArrowIcon />
            </a>
          </div>
        </div>
        <div className="mt-8 text-sm text-muted">
          <div>
            <strong>Material:</strong> {product.material}
          </div>
          <div className="mt-2">
            <strong>Dimensions:</strong> {product.dimensions}
          </div>
        </div>
      </div>
      <section className="md:col-span-2 mt-12">
        <h3 className="text-xl font-display">Related</h3>
        <div className="mt-6 grid sm:grid-cols-3 gap-6">
          {products
            .filter((p) => p.id !== product.id)
            .slice(0, 3)
            .map((r) => (
              <ProductCard key={r.id} p={r} />
            ))}
        </div>
      </section>

      <section className="md:col-span-2 mt-12">
        <h3 className="text-xl font-display">Customer reviews</h3>
        <div className="mt-4 space-y-4">
          {[
            { author: "M. Holt", text: "Beautifully made and comfortable." },
            { author: "S. Kim", text: "Great finish and proportion." },
          ].map((r, idx) => (
            <div key={idx} className="p-4 border rounded">
              <div className="text-sm text-muted">{r.text}</div>
              <div className="mt-2 text-sm font-medium">{r.author}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
