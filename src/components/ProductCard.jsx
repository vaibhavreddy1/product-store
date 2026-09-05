import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import {
  formatPrice,
  getDiscountedPrice,
} from "../utils/format";

export default function ProductCard({ product }) {
  const rating = product.rating || 0;

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="h-52 w-full object-cover"
      />

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-display text-lg font-bold text-slate-900">
            {product.title}
          </h2>

          <div className="shrink-0 text-right">
            <span className="block text-lg font-bold text-slate-900">
              {formatPrice(getDiscountedPrice(product))}
            </span>

            <span className="text-sm text-slate-400 line-through">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
          {product.description}
        </p>

        {/* Five Star Rating */}
        <div className="mt-4 flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => {
            const fillPercentage = Math.min(
              100,
              Math.max(0, (rating - (star - 1)) * 100)
            );

            return (
              <span key={star} className="relative inline-block">
                {/* Empty Star */}
                <Star
                  size={16}
                  className="text-slate-300"
                />

                {/* Filled Star */}
                <span
                  className="absolute left-0 top-0 overflow-hidden"
                  style={{ width: `${fillPercentage}%` }}
                >
                  <Star
                    size={16}
                    className="fill-current text-yellow-400"
                  />
                </span>
              </span>
            );
          })}

          <span className="ml-1 text-sm text-slate-600">
            {rating}
          </span>
        </div>

        <Link
          to={`/products/${product.id}`}
          className="mt-5 block rounded-lg bg-teal-700 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-teal-800"
        >
          View Product
        </Link>
      </div>
    </article>
  );
}