// src/Reportes.jsx
import { obtenerVentas, exportarExcel } from "./utils/guardarVentas";
import { Link } from "react-router-dom";

export default function Reportes() {
  const ventas = obtenerVentas();

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h1>📊 Reportes de ventas</h1>
      <p>Historial guardado en el sistema.</p>

      <button
        style={{ marginTop: "15px", padding: "10px", background: "green", borderRadius: "5px" }}
        onClick={exportarExcel}
      >
        📥 Exportar a Excel
      </button>

      {ventas.length === 0 ? (
        <p style={{ marginTop: "20px" }}>No hay ventas registradas aún.</p>
      ) : (
        <div style={{ marginTop: "20px" }}>
          {ventas.map(v => (
            <div key={v.id} style={{ marginBottom: "10px", background: "#1a1a1a", padding: "10px", borderRadius: "5px" }}>
              <p><b>ID:</b> {v.id}</p>
              <p><b>Fecha:</b> {v.fecha}</p>
              <p><b>Productos:</b> {v.productos}</p>
              <p><b>Total:</b> ${v.total}</p>
            </div>
          ))}
        </div>
      )}

      <br />
      <Link to="/">⬅ Volver</Link>
    </div>
  );
}
