import { useState } from "react";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="font-display text-4xl font-bold text-slate-900">
          Modal Demo
        </h1>

        <p className="mt-4 text-slate-600">
          Test all of the modal interactions before continuing.
        </p>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="mt-8 rounded-lg bg-teal-700 px-5 py-3 font-medium text-white transition hover:bg-teal-800"
        >
          Open Modal
        </button>

        <div className="mt-12 h-[1200px] rounded-xl bg-white p-6">
          <p className="text-slate-600">
            This extra content lets us test body scroll locking.
          </p>
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Test Modal"
      >
        <p className="text-slate-600">
          This is a reusable modal component.
        </p>

        <button
          type="button"
          onClick={() => setIsModalOpen(false)}
          className="mt-6 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        >
          Close
        </button>
      </Modal>
    </div>
  );
}

export default App;