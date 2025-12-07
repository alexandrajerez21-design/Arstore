import { useState } from "react";
import { Link } from "react-router-dom";
import productosBase from "./data/productos.js";

export default function VentaRapida() {
  const [productos, setProductos] = useState([]);
  const [input, setInput] = useState("");

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
      // Precio base por ahora obtenido desde base de productos
      const encontrado = productosBase.find(
        (p) => p.nombre.toLowerCase() === input.toLowerCase()
      );

      setProductos((prev) => [
        ...prev,
        {
          nombre: input,
          cantidad: 1,
          precio: encontrado?.precio || 1000, // Control si no lo encuentra
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
  }

  return (
    <div className="app" style={{ padding: "20px" }}>
      
      <div style={{ marginBottom: "15px" }}>
        {/* 🔙 BOTÓN VOLVER AL PANEL */}
        <Link to="/" className="btn-primary" style={{ display: "inline-block", padding:"10px 20px" }}>
          🏠 Volver al panel
        </Link>
      </div>

      <h2 className="app-title">🧾 Venta rápida</h2>
      <p>Escribe o escanea un producto y presiona Enter para agregar.</p>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && agregarProducto()}
        placeholder="Ej: Coca-Cola 350ml"
        style={{
          padding: "12px",
          width: "100%",
          marginTop: "10px",
          marginBottom: "10px",
          borderRadius: "8px",
        }}
      />

      <button className="btn-primary" onClick={agregarProducto} style={{ width:"100%" }}>
        Agregar
      </button>

      <div style={{ marginTop: "20px" }}>
        {productos.length === 0 && <p>No hay productos todavía.</p>}

        {productos.map((p, i) => (
          <div key={i} className="card" style={{ marginBottom: "10px" }}>
            <div className="card-title">{p.nombre}</div>
            <div className="card-body">Cantidad: {p.cantidad} · Precio: ${p.precio}</div>
            <div className="card-footer">Subtotal: ${p.cantidad * p.precio}</div>
          </div>
        ))}
      </div>

      {productos.length > 0 && (
        <>
          <h3 style={{ marginTop: "20px" }}>Total: ${total()}</h3>
          <button
            className="btn-primary"
            onClick={limpiarVenta}
            style={{ width:"100%", marginTop:"10px" }}
          >
            Finalizar venta
          </button>
        </>
      )}
    </div>
  );
}
