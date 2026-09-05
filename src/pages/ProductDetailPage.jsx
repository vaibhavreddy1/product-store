import { useParams } from "react-router-dom";

export default function ProductDetailPage() {
  const { id } = useParams();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-display text-4xl font-bold text-slate-900">
        Product Details
      </h1>

      <p className="mt-3 text-slate-600">
        Product ID: {id}
      </p>
    </div>
  );
}