// src/utils/guardarVentas.js

// Guardar venta en localStorage
export function guardarVenta(productos) {
  let ventas = JSON.parse(localStorage.getItem("ventas")) || [];

  const total = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  ventas.push({
    id: Date.now(),
    fecha: new Date().toLocaleString(),
    productos: productos.map(p => `${p.nombre} (${p.cantidad} x $${p.precio})`).join(", "),
    total
  });

  localStorage.setItem("ventas", JSON.stringify(ventas));
}

// Obtener ventas
export function obtenerVentas() {
  return JSON.parse(localStorage.getItem("ventas")) || [];
}

// Exportar Excel con formato correcto
export function exportarExcel() {
  const ventas = obtenerVentas();
  if (ventas.length === 0) return alert("No hay ventas para exportar.");

  const encabezado = ["ID", "Fecha", "Productos", "Total"];
  const filas = ventas.map(v => [v.id, v.fecha, v.productos, v.total]);

  const contenido = [encabezado, ...filas]
    .map(row => row.join(","))
    .join("\n");

  const blob = new Blob([contenido], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "ventas_ARstore.csv";
  link.click();
}
