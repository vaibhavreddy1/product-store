import { useState } from "react";

const initialProducts = [
  { id: 1, name: "Laptop", price: 75000 },
  { id: 2, name: "Headphones", price: 5000 },
  { id: 3, name: "Keyboard", price: 3000 },
];

export default function KeysDemoPage() {
  const [products, setProducts] = useState(initialProducts);

  const removeFirstProduct = () => {
    setProducts((currentProducts) => currentProducts.slice(1));
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-display text-4xl font-bold text-slate-900">
        React Keys Demo
      </h1>

      <p className="mt-3 text-slate-600">
        This page demonstrates why stable keys are important when rendering
        dynamic lists.
      </p>

      <button
        type="button"
        onClick={removeFirstProduct}
        className="mt-6 rounded-lg bg-teal-700 px-5 py-3 font-medium text-white hover:bg-teal-800"
      >
        Remove First Product
      </button>

      <div className="mt-8 space-y-4">
        {products.map((product) => (
          <div
            // key={index}
            key={product.id}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <h2 className="font-display text-lg font-bold text-slate-900">
              {product.name}
            </h2>

            <p className="mt-1 text-slate-600">
              ₹{product.price.toLocaleString("en-IN")}
            </p>

            <input
              type="text"
              placeholder="Type something..."
              className="mt-4 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-teal-600"
            />
          </div>
        ))}
      </div>
    </div>
  );
}