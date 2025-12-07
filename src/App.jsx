import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import VentaRapida from "./VentaRapida";
import Inventario from "./Inventario";
import Reportes from "./Reportes";
import Proveedores from "./Proveedores";

export default function App() {
  return (
    <Router>
      <div className="app" style={{ padding: "20px" }}>
        
        <h1 className="app-title">Minimarket A&R PRO 🛒</h1>
        <p>Panel principal del sistema</p>

        <hr style={{ margin: "15px 0" }}/>

        {/* Venta */}
        <h2>Venta rápida</h2>
        <p>Registrar ventas rápidamente.</p>
        <Link to="/venta" className="btn-primary">Abrir venta</Link>

        <hr style={{ margin: "15px 0" }}/>

        {/* Inventario */}
        <h2>Inventario</h2>
        <p>Gestión de productos y precios.</p>
        <Link to="/inventario" className="btn-primary">Gestionar</Link>

        <hr style={{ margin: "15px 0" }}/>

        {/* Proveedores */}
        <h2>Proveedores</h2>
        <p>Registra contactos y productos que abastecen tu negocio.</p>
        <Link to="/proveedores" className="btn-primary">Ver proveedores</Link>

        <hr style={{ margin: "15px 0" }}/>

        {/* Reportes */}
        <h2>Reportes</h2>
        <p>Revisión de ventas guardadas.</p>
        <Link to="/reportes" className="btn-primary">Ver reportes</Link>

      </div>

      {/* Rutas del sistema */}
      <Routes>
        <Route path="/venta" element={<VentaRapida />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/proveedores" element={<Proveedores />} />
      </Routes>
    </Router>
  );
}
