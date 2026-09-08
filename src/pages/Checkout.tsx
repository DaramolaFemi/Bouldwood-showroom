import ArrowIcon from "../components/ArrowIcon";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
export default function Checkout() {
  const { items } = useCart();
  const [review, setReview] = useState(false);
  return (
    <div className="container mx-auto px-6 py-12 max-w-2xl">
      <p className="eyebrow">ONE STEP CLOSER TO HOME</p>
      <h1>Review your selection</h1>
      {items.length === 0 ? (
        <p className="mt-6">
          Your bag is empty.{" "}
          <Link className="underline" to="/products">
            Explore the collection
          </Link>
        </p>
      ) : (
        <>
          <p className="text-muted mt-6">
            This showroom is a preview. Online ordering and payment are not
            available yet.
          </p>
          <div className="my-8">
            {items.map((i) => (
              <div
                key={i.product.id}
                className="flex justify-between py-4 border-b gap-4"
              >
                <span>
                  {i.product.name} × {i.qty}
                </span>
                <span>${(i.qty * i.product.price).toLocaleString()}</span>
              </div>
            ))}
            <div className="flex justify-between py-6 font-semibold">
              <span>Subtotal</span>
              <span>
                $
                {items
                  .reduce((n, i) => n + i.qty * i.product.price, 0)
                  .toLocaleString()}
              </span>
            </div>
          </div>
          <button onClick={() => setReview(true)} className="button bg-black">
            Save selection on this device <ArrowIcon />
          </button>
          {review && (
            <p role="status" className="mt-4">
              Your selection is saved in this browser. No order has been placed.
            </p>
          )}
          <p className="mt-8">
            <Link className="text-link" to="/cart">
              Return to your bag <ArrowIcon />
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
