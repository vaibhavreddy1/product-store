import {
  Boxes,
  ShoppingCart,
} from "lucide-react";

import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClasses = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive
        ? "text-teal-700"
        : "text-slate-600 hover:text-teal-700"
    }`;

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">

        <NavLink
          to="/products"
          className="flex items-center gap-2 text-teal-700"
        >
          <Boxes size={26} strokeWidth={2} />

          <span className="font-display text-xl font-bold tracking-tight">
            Store
          </span>
        </NavLink>

        <div className="flex items-center gap-6">

          <NavLink
            to="/products"
            className={linkClasses}
          >
            Products
          </NavLink>

          <NavLink
            to="/cart"
            className="flex items-center gap-2 text-slate-600 transition hover:text-teal-700"
          >
            <ShoppingCart size={20} strokeWidth={1.75} />
            <span>Cart</span>
          </NavLink>

        </div>
      </div>
    </nav>
  );
}