import { useState } from "react";
import CreateProductForm from "../components/CreateProductForm";
import Modal from "../components/Modal";

export default function AdminPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
            Admin
          </p>

          <h1 className="mt-2 font-display text-4xl font-bold text-slate-900">
            Admin Dashboard
          </h1>

          <p className="mt-3 text-slate-600">
            Manage products from the admin dashboard.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white transition hover:bg-teal-800"
        >
          Add Product
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Product"
      >
        <CreateProductForm
          onSuccess={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}