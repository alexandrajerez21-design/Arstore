import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import VentaRapida from "./VentaRapida";

export default function App() {
  return (
    <Router>
      <div className="app">

        <header className="app-header">
          <h1 className="app-title">Minimarket A&R PRO 🛒</h1>
          <div className="app-badge">ARstore · Panel principal</div>
          <p className="app-tagline">
            ¡Wow! Aquí comprar se siente distinto — todo lo que amas más cerca de ti ✨
          </p>
        </header>

        <section className="app-summary">
          <span className="chip">📍 Punto físico: A&R Minimarket</span>
          <span className="chip">💳 Métodos: Efectivo · Débito · Crédito</span>
          <span className="chip">🧾 Boleta disponible (futuro módulo)</span>
        </section>

        <section className="menu-grid">

          {/* MODULO CAJA */}
          <article className="card">
            <div className="card-label">Caja</div>
            <h2 className="card-title">Venta rápida</h2>
            <p className="card-body">
              Registro rápido de ventas con productos automáticos, lectura manual o scanner.
            </p>
            <Link to="/venta" className="btn-primary">Abrir venta rápida</Link>
          </article>

          {/* FUTURO MÓDULO */}
          <article className="card">
            <div className="card-label">Clientes</div>
            <h2 className="card-title">Pedidos online</h2>
            <p className="card-body">Módulo en desarrollo</p>
            <button className="btn-primary">Ver pedidos</button>
          </article>

          <article className="card">
            <div className="card-label">Inventario</div>
            <h2 className="card-title">Stock & Proveedores</h2>
            <p className="card-body">Módulo en desarrollo</p>
            <button className="btn-primary">Gestionar inventario</button>
          </article>

          <article className="card">
            <div className="card-label">Gestión</div>
            <h2 className="card-title">Reportes & Ventas</h2>
            <p className="card-body">Módulo en desarrollo</p>
            <button className="btn-primary">Ver reportes</button>
          </article>

        </section>

        <footer className="app-footer">
          ARstore · Minimarket A&R PRO · Base lista para crecer 🚀
        </footer>
      </div>

      {/* RUTAS */}
      <Routes>
        <Route path="/venta" element={<VentaRapida />} />
      </Routes>

    </Router>
  );
}
