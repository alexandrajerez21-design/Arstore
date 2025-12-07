// Guarda una venta nueva en localStorage
export function guardarVenta(productos, total) {
  const ventasGuardadas = JSON.parse(localStorage.getItem("ventas")) || [];

  const nuevaVenta = {
    id: Date.now(),
    fecha: new Date().toLocaleString(),
    productos,
    total
  };

  ventasGuardadas.push(nuevaVenta);
  localStorage.setItem("ventas", JSON.stringify(ventasGuardadas));
}

// Obtiene todas las ventas guardadas
export function obtenerVentas() {
  return JSON.parse(localStorage.getItem("ventas")) || [];
}

// Limpia el historial (opcional si luego agregamos botón)
export function limpiarVentas() {
  localStorage.removeItem("ventas");
}
