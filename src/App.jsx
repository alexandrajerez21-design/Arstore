import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import VentaRapida from "./VentaRapida.jsx";

export default function App() {
  return (
    <Router>
      <div className="app">

        {/* ---------- HEADER ---------- */}
        <header className="app-header">
          <h1 className="app-title">Minimarket A&R PRO 🚀</h1>
          <div className="app-badge">Arstore · Panel principal</div>
          <p className="app-tagline">
            ¡Wow! Aquí comprar se siente distinto — todo lo que amas más cerca de ti 🌟🛒
          </p>
        </header>

        {/* ---------- TAGS ---------- */}
        <section className="app-summary">
          <span className="chip">📍 Punto físico: A&R Minimarket</span>
          <span className="chip">💳 Métodos: Efectivo · Débito · Crédito</span>
          <span className="chip">🧾 Boleta disponible (futuro módulo)</span>
        </section>

        {/* ---------- MENÚ PRINCIPAL ---------- */}
        <section className="menu-grid">

          {/* CAJA */}
          <article className="card">
            <div className="card-label">Caja</div>
            <h2 className="card-title">Venta rápida</h2>
            <p className="card-body">
              Ideal para el día a día: escaneo de productos, selección manual y registro.
            </p>

            <Link to="/venta" className="btn-primary">Abrir venta rápida</Link>
            <div className="card-footer">
              <span>🔍 Escáner</span><span>🧾 Boleta después</span>
            </div>
          </article>

          {/* CLIENTES */}
          <article className="card">
            <div className="card-label">Clientes</div>
            <h2 className="card-title">Pedidos online</h2>
            <p className="card-body">Recepción de pedidos con retiro en tienda.</p>
            <button className="btn-primary">Ver pedidos</button>
            <div className="card-footer">
              <span>📦 Retiro</span><span>⏳ Próximo módulo</span>
            </div>
          </article>

          {/* INVENTARIO */}
          <article className="card">
            <div className="card-label">Inventario</div>
            <h2 className="card-title">Stock & proveedores</h2>
            <p className="card-body">Control de productos y alertas de quiebre.</p>
            <button className="btn-primary">Gestionar inventario</button>
          </article>

          {/* REPORTES */}
          <article className="card">
            <div className="card-label">Gestión</div>
            <h2 className="card-title">Reportes & ventas</h2>
            <p className="card-body">Resumen por periodo, exportable.</p>
            <button className="btn-primary">Ver reportes</button>
          </article>

        </section>

        {/* ---------- FOOTER ---------- */}
        <footer className="app-footer">
          Arstore · Minimarket A&R PRO · Base lista para crecer 🚀
        </footer>

        {/* ---------- RUTAS ---------- */}
        <Routes>
          <Route path="/venta" element={<VentaRapida />} />
        </Routes>

      </div>
    </Router>
  );
}
