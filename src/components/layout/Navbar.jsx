import { Link } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { clearCart, totalItems } = useCart();
  const displayName = user?.name || user?.email || "Compte";

  const handleLogout = () => {
    clearCart();
    logout();
  };

  return (
    <nav className="navbar">
      <Link className="brand" to="/">
        <strong>Marketplace</strong>
      </Link>

      <div className="nav-links">
        

        {!isAuthenticated && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {isAuthenticated && (
          <>
            {isAdmin && <Link to="/admin">Gestion boutique</Link>}
            {!isAdmin && <Link to="/orders">Mes commandes</Link>}
            <span className="user-chip">
              <User size={18} />
              {isAdmin ? "Admin" : displayName}
            </span>
            {!isAdmin && (
              <Link className="icon-button" to="/cart" aria-label="Panier">
                <ShoppingCart size={20} />
                {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
              </Link>
            )}
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}

      </div>
    </nav>
  );
}
