import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Star } from "lucide-react";
import { getProductById } from "../api/products";

export default function ProductDetailPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        setError("");

        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError("Unable to load this product.");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="h-8 w-48 animate-pulse rounded bg-slate-200" />

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <div className="h-[450px] animate-pulse rounded-2xl bg-slate-200" />

          <div className="space-y-5">
            <div className="h-10 w-3/4 animate-pulse rounded bg-slate-200" />
            <div className="h-6 w-1/3 animate-pulse rounded bg-slate-200" />
            <div className="h-24 animate-pulse rounded bg-slate-200" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h1 className="font-display text-3xl font-bold text-slate-900">
          Product Not Found
        </h1>

        <p className="mt-3 text-slate-600">
          {error || "We couldn't find this product."}
        </p>

        <Link
          to="/products"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-teal-700 px-5 py-3 font-medium text-white hover:bg-teal-800"
        >
          <ArrowLeft size={18} />
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-teal-700"
      >
        <ArrowLeft size={18} />
        Back to Products
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full max-h-[500px] w-full object-cover"
          />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
            {product.category}
          </p>

          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-slate-900">
            {product.title}
          </h1>

          <div className="mt-4 flex items-center gap-2">
            <Star size={18} fill="currentColor" />
            <span className="font-medium text-slate-700">
              {product.rating}
            </span>
          </div>

          <p className="mt-6 text-3xl font-bold text-slate-900">
            ${product.price}
          </p>

          <p className="mt-6 leading-7 text-slate-600">
            {product.description}
          </p>

          <div className="mt-8 rounded-xl bg-slate-100 p-5">
            <p className="text-sm text-slate-600">
              Availability
            </p>

            <p className="mt-1 font-semibold text-slate-900">
              {product.stock} units in stock
            </p>
          </div>

          <button
            type="button"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white transition hover:bg-teal-800"
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}