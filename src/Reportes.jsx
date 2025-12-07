import { useState, useEffect } from "react";

export default function Reportes() {
  const [ventas, setVentas] = useState([]);

  // Cargar ventas guardadas
  useEffect(() => {
    const data = localStorage.getItem("ventas_arstore");
    if (data) setVentas(JSON.parse(data));
  }, []);

  function totalDelDia() {
    return ventas.reduce((acc, v) => acc + v.total, 0);
  }

  function limpiarHistorial() {
    if (confirm("¿Borrar todas las ventas registradas?")) {
      localStorage.removeItem("ventas_arstore");
      setVentas([]);
    }
  }

  return (
    <div className="app">
      <h2 className="app-title">📊 Reportes & Ventas</h2>
      <p>Historial de transacciones realizadas en el sistema.</p>

      {ventas.length === 0 && <p style={{ marginTop: "20px" }}>No hay ventas registradas aún.</p>}

      {ventas.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Total vendido hoy: <strong>${totalDelDia()}</strong></h3>

          {ventas.map((v, i) => (
            <div key={i} className="card" style={{ marginTop: "12px" }}>
              <div className="card-title">Venta #{i + 1}</div>
              <div className="card-body">
                Fecha: {v.fecha}<br />
                Total: <strong>${v.total}</strong>
              </div>
              <div className="card-footer">
                {v.items.map((p, j) => (
                  <div key={j}>
                    {p.nombre} — {p.cantidad} x ${p.precio} = ${p.cantidad * p.precio}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <button className="btn-primary" style={{ marginTop: "20px" }} onClick={limpiarHistorial}>
            Borrar historial 🗑
          </button>
        </div>
      )}
    </div>
  );
}
