import { useState, useEffect } from "react";
import { generarBoletaPDF } from "./utils/boletaPDF"; 
import { guardarVenta, obtenerVentas } from "./data/productos";
import * as XLSX from "xlsx";

export default function VentaRapida() {
  const [producto, setProducto] = useState("");
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);

  // Cargar historial si existe
  useEffect(() => {
    const ventasPrevias = obtenerVentas();
    if (ventasPrevias?.length > 0) console.log("Ventas guardadas:", ventasPrevias);
  }, []);

  // Agregar producto al carrito
  const agregarProducto = () => {
    if (!producto.trim()) return;

    const nuevo = {
      id: Date.now(),
      nombre: producto,
      precio: 1000, // Luego será editable
      cantidad: 1
    };

    const actualizado = [...carrito, nuevo];
    setCarrito(actualizado);
    setTotal(actualizado.reduce((acc, p) => acc + p.precio * p.cantidad, 0));
    setProducto("");
  };

  // Finalizar venta y guardar historial
  const finalizarVenta = () => {
    if (carrito.length === 0) return alert("No hay productos en la venta");

    const venta = {
      id: Date.now(),
      fecha: new Date().toLocaleString(),
      productos: carrito,
      total
    };

    guardarVenta(venta);
    generarBoletaPDF(carrito, total);

    alert("Venta guardada y boleta generada");
    setCarrito([]);
    setTotal(0);
  };

  // Exportar historial completo a Excel
  const exportarExcel = () => {
    const ventas = obtenerVentas();
    if (!ventas.length) return alert("Aún no hay ventas guardadas");

    const wb = XLSX.utils.book_new();
    const data = ventas.map(v => ({
      ID: v.id,
      Fecha: v.fecha,
      Productos: v.productos.map(p => `${p.nombre} x${p.cantidad}`).join(", "),
      Total: v.total
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Ventas");
    XLSX.writeFile(wb, "ventas_ARstore.xlsx");

    alert("Reporte Excel exportado 📄");
  };

  return (
    <div className="page">
      <h2>🧾 Venta rápida</h2>
      <p>Ingresa o escanea un producto y presiona Agregar.</p>

      <input
        type="text"
        placeholder="Ej: Coca-Cola 350ml"
        value={producto}
        onChange={(e) => setProducto(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && agregarProducto()}
      />

      <button onClick={agregarProducto}>Agregar</button>

      {carrito.length === 0 && <p>No hay productos agregados.</p>}

      {carrito.map((p) => (
        <div key={p.id} className="item">
          <p>{p.nombre} — ${p.precio} x {p.cantidad}</p>
        </div>
      ))}

      <h3>Total: ${total}</h3>

      {carrito.length > 0 && (
        <button onClick={finalizarVenta} className="btn-finalizar">
          Finalizar venta
        </button>
      )}

      <hr />

      <h3>📁 Exportar historial</h3>
      <button onClick={exportarExcel}>Exportar a Excel</button>
    </div>
  );
}
