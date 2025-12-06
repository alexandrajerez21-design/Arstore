export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Minimarket A&amp;R PRO</h1>
        <div className="app-badge">ARstore · Panel principal</div>
        <p className="app-tagline">
          ¡Waw! Aquí comprar se siente distinto — todo lo que amas
          más cerca de ti 💫🛒
        </p>
      </header>

      <section className="app-summary">
        <span className="chip">📍 Punto físico: A&amp;R Minimarket</span>
        <span className="chip">💳 Métodos: Efectivo · Débito · Crédito</span>
        <span className="chip">🧾 Boleta disponible (futuro módulo)</span>
      </section>

      <section className="menu-grid">
        <article className="card">
          <div className="card-label">Caja</div>
          <h2 className="card-title">Venta rápida</h2>
          <p className="card-body">
            Ideal para el día a día: escaneo de productos, selección
            manual y registro de la venta por método de pago.
          </p>
          <button className="btn-primary">Abrir venta rápida</button>
          <div className="card-footer">
            <span>Escáner + ingreso manual</span>
            <span>🧾 Boleta después</span>
          </div>
        </article>

        <article className="card">
          <div className="card-label">Clientes</div>
          <h2 className="card-title">Pedidos online</h2>
          <p className="card-body">
            Recepción de pedidos por encargo con stock disponible y retiro
            en tienda. Ideal para WhatsApp o página web.
          </p>
          <button className="btn-primary">Ver pedidos</button>
          <div className="card-footer">
            <span>🛍️ Retiro en punto</span>
            <span>Próximo módulo</span>
          </div>
        </article>

        <article className="card">
          <div className="card-label">Inventario</div>
          <h2 className="card-title">Stock &amp; proveedores</h2>
          <p className="card-body">
            Control de productos, mínimos, alertas de quiebre y base de
            proveedores para reposición rápida.
          </p>
          <button className="btn-primary">Gestionar inventario</button>
          <div className="card-footer">
            <span>📦 Control de stock</span>
            <span>🔔 Alertas</span>
          </div>
        </article>

        <article className="card">
          <div className="card-label">Gestión</div>
          <h2 className="card-title">Reportes &amp; ventas</h2>
          <p className="card-body">
            Resumen de ventas por día, semana o mes, filtrado por método
            de pago. Exportable a Excel en la siguiente versión.
          </p>
          <button className="btn-primary">Ver reportes</button>
          <div className="card-footer">
            <span>📊 Estadísticas</span>
            <span>⬇ Exportar (futuro)</span>
          </div>
        </article>
      </section>

      <footer className="app-footer">
        ARstore · Minimarket A&amp;R PRO · Versión base de interfaz lista para
        seguir construyendo 🚀
      </footer>
    </div>
  );
}
