import { Link } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const displayName = user?.name || user?.email || "Compte";

  return (
    <nav className="navbar">
      <Link className="brand" to="/">
        <strong>Marketplace</strong>
      </Link>

      <div className="nav-links">
        <Link to="/">Marketplace</Link>

        {!isAuthenticated && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <button className="icon-button" type="button" aria-label="Panier">
              <ShoppingCart size={20} />
            </button>
          </>
        )}

        {isAuthenticated && (
          <>
            {isAdmin && <Link to="/admin">Gestion boutique</Link>}
            <span className="user-chip">
              <User size={18} />
              {isAdmin ? "Admin" : displayName}
            </span>
            {!isAdmin && (
              <button className="icon-button" type="button" aria-label="Panier">
                <ShoppingCart size={20} />
              </button>
            )}
            <button type="button" onClick={logout}>
              Logout
            </button>
          </>
        )}

      </div>
    </nav>
  );
}
