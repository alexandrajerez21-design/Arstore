import { useState } from "react";
import { productosBase } from "./data/productos";

export default function VentaRapida() {

  const [productos, setProductos] = useState([]);
  const [input, setInput] = useState("");

  function agregarProducto() {
    if (!input.trim()) return;

    const encontrado = productosBase.find(
      (p) => p.nombre.toLowerCase() === input.toLowerCase()
    );

    if (!encontrado) {
      alert("Producto no encontrado en inventario base.");
      return setInput("");
    }

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
        { nombre: encontrado.nombre, precio: encontrado.precio, cantidad: 1 },
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
