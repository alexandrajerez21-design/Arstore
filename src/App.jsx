import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import VentaRapida from "./VentaRapida.jsx";
import Inventario from "./Inventario.jsx";

export default function App() {
  return (
    <Router>
      <div className="app">

        <header className="app-header">
          <h1 className="app-title">Minimarket A&R PRO 🛒</h1>
          <p>Panel principal del sistema</p>
        </header>

        {/* menú principal */}
        <div className="menu-grid">

          <div className="card">
            <h2>Venta rápida</h2>
            <p>Registrar ventas rápidamente.</p>
            <Link to="/venta" className="btn-primary">Abrir venta</Link>
          </div>

          <div className="card">
            <h2>Inventario</h2>
            <p>Gestión de productos y precios.</p>
            <Link to="/inventario" className="btn-primary">Gestionar</Link>
          </div>

        </div>

        {/* rutas */}
        <Routes>
          <Route path="/venta" element={<VentaRapida />} />
          <Route path="/inventario" element={<Inventario />} />
        </Routes>

      </div>
    </Router>
  );
}
