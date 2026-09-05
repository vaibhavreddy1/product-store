import ProductForm from "../components/ProductForm";

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
          Admin
        </p>

        <h1 className="mt-2 font-display text-4xl font-bold text-slate-900">
          Add Product
        </h1>

        <p className="mt-3 text-slate-600">
          Create a new product using the form below.
        </p>
      </div>

      <ProductForm />
    </div>
  );
}