import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import VentaRapida from "./VentaRapida";
import Inventario from "./Inventario";
import Proveedores from "./Proveedores";

export default function App() {
  return (
    <Router>
      <div className="page">
        <h1>Minimarket A&R PRO 🛒</h1>
        <p>Panel principal del sistema</p>

        <div className="card">
          <h2>Venta rápida</h2>
          <p>Registrar ventas rápidamente.</p>
          <Link to="/venta">Abrir venta</Link>
        </div>

        <div className="card">
          <h2>Inventario</h2>
          <p>Gestión de productos y precios.</p>
          <Link to="/inventario">Gestionar</Link>
        </div>

        <div className="card">
          <h2>Proveedores</h2>
          <p>Registra contactos y productos que abastecen tu negocio.</p>
          <Link to="/proveedores">Ver proveedores</Link>
        </div>

        <Routes>
          <Route path="/venta" element={<VentaRapida />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/proveedores" element={<Proveedores />} />
        </Routes>
      </div>
    </Router>
  );
}
