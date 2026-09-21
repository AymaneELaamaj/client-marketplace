import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function AdminPage() {
  const { isAdmin, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <section className="auth-page">
        <div>
          <h1>Admin</h1>
          <p>Connecte-toi avec un compte admin pour acceder au dashboard.</p>
          <p>
            <Link to="/login">Login</Link>
          </p>
        </div>
      </section>
    );
  }

  if (!isAdmin) {
    return (
      <section className="auth-page">
        <div>
          <h1>Admin</h1>
          <p>Ton compte est connecte, mais il n'a pas le role admin.</p>
        </div>
      </section>
    );
  }

  return <h1>Admin Dashboard</h1>;
}
