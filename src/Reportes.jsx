import * as XLSX from "xlsx";
import { obtenerVentas, limpiarVentas } from "./utils/guardarVentas";

export default function Reportes() {
  const ventas = obtenerVentas(); // ← carga todo lo guardado

  const exportarExcel = () => {
    if (ventas.length === 0) {
      alert("No hay ventas para exportar ❗");
      return;
    }

    const hoja = XLSX.utils.json_to_sheet(ventas);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Ventas");

    XLSX.writeFile(libro, "ventas_ARstore.xlsx");
    alert("📁 Archivo Excel generado con éxito");
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h2>📊 Reportes de ventas</h2>
      <p>Historial completo del sistema</p>

      <button
        onClick={exportarExcel}
        style={{ marginTop: 15, padding: 8, width: "100%", background: "#6c5ce7", color: "white", borderRadius: 8 }}
      >
        📥 Exportar a Excel
      </button>

      <button
        onClick={() => { limpiarVentas(); location.reload(); }}
        style={{ marginTop: 10, padding: 8, width: "100%", background: "#d63031", color: "white", borderRadius: 8 }}
      >
        🗑 Borrar historial
      </button>

      <hr style={{ margin: "20px 0" }} />

      {ventas.length === 0 && <p>No hay ventas registradas aún.</p>}

      {ventas.map((v, i) => (
        <div key={i} style={{ background: "#222", color: "#fff", padding: 10, marginBottom: 10, borderRadius: 8 }}>
          <p><b>Venta #{i + 1}</b></p>
          <p><b>Fecha:</b> {v.fecha}</p>
          <p><b>Total:</b> ${v.total}</p>

          <details style={{ marginTop: 5 }}>
            <summary style={{ cursor: "pointer" }}>Ver productos</summary>
            {v.productos.map((p, idx) => (
              <p key={idx}>- {p.nombre}: {p.cantidad} x ${p.precio}</p>
            ))}
          </details>
        </div>
      ))}
    </div>
  );
}
