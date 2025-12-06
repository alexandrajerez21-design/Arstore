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

          <article className="card">
            <div className="card-label">Caja</div>
            <h2 className="card-title">Venta rápida</h2>
            <p className="card-body">
              Ideal para el día a día: escaneo de productos, selección manual y registro de la venta por método de pago.
            </p>

            {/* 🔥 Cambiamos Button por Link a /venta */}
            <Link to="/venta" className="btn-primary">Abrir venta rápida</Link>

            <div className="card-footer">
              <span>📷 Escáner · ingreso manual</span>
              <span>🧾 Boleta después</span>
            </div>
          </article>

          <article className="card">
            <div className="card-label">Clientes</div>
            <h2 className="card-title">Pedidos online</h2>
            <p className="card-body">
              Recepción de pedidos por encargo con stock disponible y retiro en tienda. 
              Ideal para WhatsApp o página web.
            </p>
            <button className="btn-primary">Ver pedidos
