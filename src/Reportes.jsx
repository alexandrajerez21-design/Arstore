import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

export default function Reportes() {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("ventas");
    if (data) setVentas(JSON.parse(data));
  }, []);

  function exportarExcel() {
    if (ventas.length === 0) {
      alert("No hay ventas para exportar");
      return;
    }

    const hoja = ventas.map((v, i) => ({
      "#": i + 1,
      Producto: v.nombre,
      Cantidad: v.cantidad,
      PrecioUnitario: "$" + v.precio,
      Total: "$" + v.total,
      Fecha: v.fecha
    }));

    const libro = XLSX.utils.book_new();
    const hojaExcel = XLSX.utils.json_to_sheet(hoja);
    XLSX.utils.book_append_sheet(libro, hojaExcel, "Ventas");

    XLSX.writeFile(libro, "ventas_minimarket.xlsx");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 Reportes de ventas</h2>
      <p>Historial guardado en el sistema.</p>

      <button onClick={exportarExcel}
        className="btn-primary"
        style={{ marginBottom: "15px" }}>
        📥 Exportar a Excel
      </button>

      {ventas.length === 0 && <p>No hay ventas registradas aún.</p>}

      {ventas.map((v, i) => (
        <div key={i} className="card" style={{ marginBottom: "10px" }}>
          <p><b>{v.nombre}</b> — {v.cantidad}u — ${v.precio} c/u</p>
          <p>Total: ${v.total}</p>
          <p style={{ fontSize: "12px", opacity: .6 }}>{v.fecha}</p>
        </div>
      ))}
    </div>
  );
}
