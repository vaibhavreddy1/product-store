import {
  Boxes,
  Search,
  ShoppingCart,
} from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">

        {/* Logo */}
        <div className="flex items-center gap-2 text-teal-700">
          <Boxes size={26} strokeWidth={2} />

          <span className="font-display text-xl font-bold tracking-tight">
            Store
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5">

          <button
            type="button"
            className="text-slate-600 transition hover:text-teal-700"
            aria-label="Search"
          >
            <Search size={20} strokeWidth={1.75} />
          </button>

          <button
            type="button"
            className="flex items-center gap-2 text-slate-700 transition hover:text-teal-700"
          >
            <ShoppingCart size={20} strokeWidth={1.75} />
            <span className="hidden sm:inline">Cart</span>
          </button>

        </div>
      </div>
    </nav>
  );
}