import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 text-center">
      <p className="text-sm font-medium text-teal-700">
        404
      </p>

      <h1 className="mt-2 font-display text-4xl font-bold text-slate-900">
        Page Not Found
      </h1>

      <p className="mt-3 text-slate-600">
        The page you're looking for doesn't exist.
      </p>

      <Link
        to="/products"
        className="mt-6 inline-block rounded-lg bg-teal-700 px-5 py-3 font-medium text-white hover:bg-teal-800"
      >
        Go to Products
      </Link>
    </div>
  );
}