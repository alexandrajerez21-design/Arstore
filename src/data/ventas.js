// ==== Gestión de ventas con LocalStorage ====
// Guarda y lee ventas del sistema sin necesidad de backend por ahora.

let ventas = JSON.parse(localStorage.getItem("ventas_ARstore") || "[]");

// Guardar una venta en historial
export function guardarVenta(venta) {
  ventas.push(venta);
  localStorage.setItem("ventas_ARstore", JSON.stringify(ventas));
}

// Obtener todas las ventas guardadas
export function obtenerVentas() {
  return ventas;
}
