import { Link } from "react-router-dom";
import { Star } from "lucide-react";

export default function ProductCard({ product }) {
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

          <span className="shrink-0 text-lg font-bold text-slate-900">
            ${product.price}
          </span>
        </div>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
          {product.description}
        </p>

        <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
          <Star size={16} fill="currentColor" />
          <span>{product.rating}</span>
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