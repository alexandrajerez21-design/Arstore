import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import VentaRapida from "./VentaRapida.jsx";

export default function App() {
  return (
    <Router>
      <div className="app">

        <header className="app-header">
          <h1 className="app-title">Minimarket A&R PRO 🌌</h1>
          <div className="app-badge">ARstore · Panel principal</div>
          <p className="app-tagline">
            ¡Wow! Aquí comprar se siente distinto — todo lo que amas más cerca de ti 🌟🛒
          </p>
        </header>

        <section className="app-summary">
          <span className="chip">🏪 Punto físico: A&R Minimarket</span>
          <span className="chip">💳 Métodos: Efectivo · Débito · Crédito</span>
          <span className="chip">🧾 Boleta disponible (futuro módulo)</span>
        </section>

        <section className="menu-grid">

          {/* CAJA */}
          <article className="card">
            <div className="card-label">Caja</div>
            <h2 className="card-title">Venta rápida</h2>
            <p className="card-body">
              Ideal para el día a día: escaneo de productos, selección manual
              y registro de venta por método de pago.
            </p>

            {/* 🔥 Botón que ahora abre /venta */}
            <Link to="/venta" className="btn-primary">Abrir venta rápida</Link>

            <div className="card-footer">
              <span>📷 Escáner · manual</span>
              <span>🧾 Boleta después</span>
            </div>
          </article>

          {/* PEDIDOS */}
          <article className="card">
            <div className="card-label">Clientes</div>
            <h2 className="card-title">Pedidos online</h2>
            <p className="card-body">
              Registro y control de pedidos con retiro en tienda.
              Ideal para WhatsApp + catálogo web.
            </p>
            <button className="btn-primary">Ver pedidos</button>
            <div className="card-footer">
              <span>📦 Retiro</span>
              <span>🚀 Próximo módulo</span>
            </div>
          </article>

          {/* INVENTARIO */}
          <article className="card">
            <div className="card-label">Inventario</div>
            <h2 className="card-title">Stock & proveedores</h2>
            <p className="card-body">
              Control de productos, mínimos, alertas de quiebre y base de proveedores.
            </p>
            <button className="btn-primary">Gestionar inventario</button>
            <div className="card-footer">
              <span>🔍 Control stock</span>
              <span>⚠ Alertas</span>
            </div>
          </article>

          {/* REPORTES */}
          <article className="card">
            <div className="card-label">Gestión</div>
            <h2 className="card-title">Reportes & ventas</h2>
            <p className="card-body">
              Ventas por período, filtrado por medio de pago.
              Exportable en próximas versiones.
            </p>
            <button className="btn-primary">Ver reportes</button>
            <div className="card-footer">
              <span>📊 Estadísticas</span>
              <span>📤 Exportar</span>
            </div>
          </article>

        </section>

        <footer className="app-footer">
          ARstore · Minimarket A&R PRO · Versión base lista para crecer 🚀
        </footer>
      </div>

      {/* 🔥 RUTAS REALES */}
      <Routes>
        <Route path="/venta" element={<VentaRapida />} />
      </Routes>
    </Router>
  );
}
