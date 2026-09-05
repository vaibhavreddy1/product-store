import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";

export default function ProductsPage() {
  const {
    products,
    loading,
    error,
  } = useProducts();

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="font-display text-4xl font-bold text-slate-900">
          Products
        </h1>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-96 animate-pulse rounded-2xl bg-slate-200"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="font-display text-4xl font-bold text-slate-900">
          Products
        </h1>

        <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
          Product Store
        </p>

        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-slate-900">
          Browse Products
        </h1>

        <p className="mt-3 max-w-2xl text-slate-600">
          Explore our collection of products and find something you'll love.
        </p>

        {/* Result Count */}
        <p className="mt-4 text-sm font-medium text-slate-500">
          {products.length} products found
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}