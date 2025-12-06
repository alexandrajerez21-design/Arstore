import { useState, useEffect } from "react";

const STORAGE_KEY = "arstore-venta-rapida";

export default function VentaRapida() {
  // -------------------------------
  // 1) CARGAR DESDE LOCALSTORAGE
  // -------------------------------
  const [productos, setProductos] = useState(() => {
    try {
      const guardado = localStorage.getItem(STORAGE_KEY);
      if (!guardado) return [];
      const parsed = JSON.parse(guardado);
      if (!Array.isArray(parsed)) return [];
      return parsed;
    } catch (e) {
      console.error("Error leyendo venta rápida guardada", e);
      return [];
    }
  });

  const [input, setInput] = useState("");

  // -------------------------------
  // 2) GUARDAR CADA VEZ QUE CAMBIE
  // -------------------------------
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(productos));
    } catch (e) {
      console.error("Error guardando venta rápida", e);
    }
  }, [productos]);

  // -------------------------------
  // 3) LÓGICA DE VENTA
  // -------------------------------
  function agregarProducto() {
    if (!input.trim()) return;

    const yaExiste = productos.find(
      (p) => p.nombre.toLowerCase() === input.toLowerCase()
    );

    if (yaExiste) {
      setProductos((prev) =>
        prev.map((p) =>
          p.nombre.toLowerCase() === input.toLowerCase()
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        )
      );
    } else {
      setProductos((prev) => [
        ...prev,
        {
          nombre: input,
          cantidad: 1,
          precio: 1000, // Por ahora fijo, luego lo conectamos con inventario
        },
      ]);
    }

    setInput("");
  }

  function total() {
    return productos.reduce((acc, p) => acc + p.cantidad * p.precio, 0);
  }

  function limpiarVenta() {
    setProductos([]);
    // También limpiamos el storage
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error("Error limpiando venta rápida guardada", e);
    }
  }

  // -------------------------------
  // 4) INTERFAZ
  // -------------------------------
  return (
    <div className="app">
      <h2 className="app-title">🧾 Venta rápida</h2>
      <p>Escribe o escanea un producto y presiona Enter para agregar.</p>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && agregarProducto()}
        placeholder="Ej: Coca-Cola 350ml"
        style={{
          padding: "10px",
          width: "100%",
          marginTop: "10px",
          borderRadius: "8px",
        }}
      />

      <button
        className="btn-primary"
        onClick={agregarProducto}
        style={{ marginTop: "10px" }}
      >
        Agregar
      </button>

      <div style={{ marginTop: "15px" }}>
        {productos.length === 0 && <p>No hay productos todavía.</p>}

        {productos.map((p, i) => (
          <div key={i} className="card" style={{ marginBottom: "10px" }}>
            <div className="card-title">{p.nombre}</div>
            <div className="card-body">
              Cantidad: {p.cantidad} · Precio: ${p.precio}
            </div>
            <div className="card-footer">
              Subtotal: ${p.cantidad * p.precio}
            </div>
          </div>
        ))}
      </div>

      {productos.length > 0 && (
        <>
          <h3 style={{ marginTop: "20px" }}>Total: ${total()}</h3>
          <button
            className="btn-primary"
            style={{ marginTop: "10px" }}
            onClick={limpiarVenta}
          >
            Finalizar venta
          </button>
        </>
      )}
    </div>
  );
}
