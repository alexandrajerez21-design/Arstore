import { useState } from "react";
import { productosBase } from "./data/productos";

export default function VentaRapida() {
  const [productos, setProductos] = useState([]);
  const [input, setInput] = useState("");

  function agregarProducto() {
    if (!input.trim()) return;

    const productoDB = productosBase.find(
      (p) => p.nombre.toLowerCase() === input.toLowerCase()
    );

    if (!productoDB) {
      alert("❗ Producto no registrado. Agrégalo luego en Inventario.");
      return;
    }

    const repetido = productos.find(
      (p) => p.nombre.toLowerCase() === input.toLowerCase()
    );

    if (repetido) {
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
        { nombre: productoDB.nombre, cantidad: 1, precio: productoDB.precio },
      ]);
    }

    setInput("");
  }

  function limpiarVenta() {
    setProductos([]);
  }

  const total = productos.reduce((acc, p) => acc + p.cantidad * p.precio, 0);

  return (
    <div className="app">
      <h2 className="app-title">🧾 Venta rápida</h2>
      <p>Escribe o escanea un producto y presiona Enter para agregar.</p>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && agregarProducto()}
        placeholder="Ej: Coca Cola 3lts"
        style={{
          padding: "10px",
          width: "100%",
          marginTop: "10px",
          borderRadius: "8px",
        }}
      />

      <button className="btn-primary" onClick={agregarProducto} style={{ marginTop: "10px" }}>
        Agregar
      </button>

      <div style={{ marginTop: "15px" }}>
        {productos.length === 0 && <p>No hay productos todavía.</p>}

        {productos.map((p, i) => (
          <div key={i} className="card" style={{ marginBottom: "10px" }}>
            <h3>{p.nombre}</h3>
            <p>Cantidad: {p.cantidad} · Precio: ${p.precio}</p>
            <p><b>Subtotal:</b> ${p.cantidad * p.precio}</p>
          </div>
        ))}

        {productos.length > 0 && (
          <>
            <h3 style={{ marginTop: "20px" }}>Total: ${total}</h3>
            <button className="btn-primary" style={{ marginTop: "10px" }} onClick={limpiarVenta}>
              Finalizar venta
            </button>
          </>
        )}
      </div>
    </div>
  );
}
