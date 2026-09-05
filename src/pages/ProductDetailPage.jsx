import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Star } from "lucide-react";
import { getProductById } from "../api/products";
import useCartStore from "../store/useCartStore";
import {
  formatPrice,
  getDiscountedPrice,
  toTitleCase,
} from "../utils/format";

export default function ProductDetailPage() {
  const { id } = useParams();
  const addItem = useCartStore((state) => state.addItem);

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

  const rating = product.rating || 0;

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
            {toTitleCase(product.category)}
          </p>

          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-slate-900">
            {product.title}
          </h1>

          {/* Five Star Rating */}
          <div className="mt-4 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => {
              const fillPercentage = Math.min(
                100,
                Math.max(0, (rating - (star - 1)) * 100)
              );

              return (
                <span
                  key={star}
                  className="relative inline-block"
                >
                  {/* Empty Star */}
                  <Star
                    size={18}
                    className="text-slate-300"
                  />

                  {/* Filled Star */}
                  <span
                    className="absolute left-0 top-0 overflow-hidden"
                    style={{
                      width: `${fillPercentage}%`,
                    }}
                  >
                    <Star
                      size={18}
                      className="fill-current text-yellow-400"
                    />
                  </span>
                </span>
              );
            })}

            <span className="ml-2 font-medium text-slate-700">
              {rating}
            </span>
          </div>

          {/* Price */}
          <div className="mt-6">
            <p className="text-3xl font-bold text-slate-900">
              {formatPrice(getDiscountedPrice(product))}
            </p>

            <p className="mt-1 text-lg text-slate-400 line-through">
              {formatPrice(product.price)}
            </p>
          </div>

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
            onClick={() => addItem(product)}
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