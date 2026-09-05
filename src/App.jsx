import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-12">

        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-teal-700">
          Module 02
        </p>

        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900">
          Product Store
        </h1>

        <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
          A modern product browser built with React.
        </p>

      </main>

    </div>
  );
}

export default App;