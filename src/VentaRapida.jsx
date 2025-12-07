import { useState } from "react";
import productosBase from "./data/productos";
import { Link } from "react-router-dom";

export default function VentaRapida() {
  const [productos, setProductos] = useState([]);
  const [input, setInput] = useState("");

  function agregarProducto() {
    if (!input.trim()) return;

    const encontrado = productosBase.find(
      (p) => p.nombre.toLowerCase() === input.toLowerCase()
    );

    if (!encontrado) {
      alert("Producto no existe en inventario base.");
      return setInput("");
    }

    const index = productos.findIndex(
      (p) => p.nombre.toLowerCase() === input.toLowerCase()
    );

    if (index >= 0) {
      const copia = [...productos];
      copia[index].cantidad += 1;
      setProductos(copia);
    } else {
      setProductos([...productos, { ...encontrado, cantidad: 1 }]);
    }

    setInput("");
  }

  function total() {
    return productos.reduce((acc, p) => acc + p.cantidad * p.precio, 0);
  }

  // 🔥 GUARDAR VENTA CON FECHA Y PRODUCTOS
  function finalizarVenta() {
    const venta = {
      fecha: new Date().toLocaleString(),
      total: total(),
      items: productos,
    };

    const historial = JSON.parse(localStorage.getItem("ventas_arstore")) || [];
    historial.push(venta);

    localStorage.setItem("ventas_arstore", JSON.stringify(historial));

    alert("Venta registrada correctamente 🧾");
    setProductos([]);
  }

  return (
    <div className="app" style={{ padding:"20px" }}>

      {/* Volver */}
      <Link className="btn-primary" to="/" style={{ display:"inline-block", marginBottom:"15px" }}>
        🏠 Volver al menú
      </Link>

      <h2 className="app-title">🧾 Venta rápida</h2>
      <p>Escribe o escanea un producto y presiona Enter.</p>

      <input
        placeholder="Ej: Coca-Cola 3lts"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && agregarProducto()}
      />

      <button className="btn-primary" style={{ width:"100%" }} onClick={agregarProducto}>
        Agregar producto
      </button>

      <div style={{ marginTop:"20px" }}>
        {productos.length === 0 && <p>No hay productos agregados.</p>}

        {productos.map((p, i) => (
          <div key={i} className="card" style={{ marginBottom:"10px" }}>
            <div className="card-title">{p.nombre}</div>
            <div className="card-body">
              {p.cantidad} x ${p.precio} = ${p.cantidad * p.precio}
            </div>
          </div>
        ))}
      </div>

      {productos.length > 0 && (
        <>
          <h3>Total: ${total()}</h3>
          <button className="btn-primary" onClick={finalizarVenta} style={{ width:"100%" }}>
            Finalizar venta y guardar 🧾
          </button>
        </>
      )}
    </div>
  );
}
