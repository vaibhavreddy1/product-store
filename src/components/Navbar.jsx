import {
  Boxes,
  ShoppingCart,
} from "lucide-react";

import useCartStore from "../store/useCartStore";
import useAuthStore from "../store/useAuthStore";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const toggleAdmin = useAuthStore((state) => state.toggleAdmin);

  const linkClasses = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive
        ? "text-teal-700"
        : "text-slate-600 hover:text-teal-700"
    }`;

  const items = useCartStore((state) => state.items);

  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">

        {/* Logo */}
        <NavLink
          to="/products"
          className="flex items-center gap-2 text-teal-700"
        >
          <Boxes size={26} strokeWidth={2} />

          <span className="font-display text-xl font-bold tracking-tight">
            Store
          </span>
        </NavLink>

        {/* Navigation */}
        <div className="flex items-center gap-6">

          {/* Products */}
          <NavLink
            to="/products"
            className={linkClasses}
          >
            Products
          </NavLink>
        {isAdmin && (
  <NavLink
    to="/admin"
    className={linkClasses}
  >
    Admin
  </NavLink>
)}
          {/* Cart */}
          <NavLink
            to="/cart"
            className="flex items-center gap-2 text-slate-600 transition hover:text-teal-700"
          >
            <ShoppingCart size={20} strokeWidth={1.75} />

            <span>Cart</span>

            {cartCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-teal-700 px-1 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </NavLink>

          {/* Admin Toggle */}
          <button
            type="button"
            onClick={toggleAdmin}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-teal-600 hover:text-teal-700"
          >
            {isAdmin ? "Log out as admin" : "Log in as admin"}
          </button>

        </div>
      </div>
    </nav>
  );
}