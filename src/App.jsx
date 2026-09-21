import './App.css'
import { Routes, Route } from 'react-router-dom'
import MarketplacePage from './pages/marketplace/MarketplacePage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import AdminPage from './pages/admin/AdminPage'
function App() {
  return (
    <Routes>
      <Route path="/" element={<MarketplacePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

export default App
