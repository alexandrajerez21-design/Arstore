import { useState } from "react";
import { Link } from "react-router-dom";
import { guardarVenta } from "./utils/guardarVentas";

export default function VentaRapida() {
  const [producto, setProducto] = useState("");
  const [lista, setLista] = useState([]);
  const [total, setTotal] = useState(0);

  const agregarProducto = () => {
    if (!producto.trim()) return;

    let precio = prompt("Ingrese precio del producto:");
    precio = Number(precio);

    if (!precio || precio <= 0) return alert("Precio inválido");

    const nuevo = { nombre: producto, precio, cantidad: 1 };

    setLista([...lista, nuevo]);
    setTotal(total + precio);
    setProducto("");
  };

  const finalizarVenta = () => {
    if (lista.length === 0) return alert("No hay productos registrados");

    guardarVenta(lista, total);
    alert("Venta guardada con éxito ✨");

    setLista([]);
    setTotal(0);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <Link to="/">⬅ Volver</Link>
      <h2>🧾 Venta rápida</h2>

      <input
        type="text"
        placeholder="Ej: Coca-Cola 350ml"
        value={producto}
        onChange={(e) => setProducto(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && agregarProducto()}
        style={{ width: "100%", padding: "10px", marginTop: "10px" }}
      />

      <button 
        onClick={agregarProducto} 
        style={{ marginTop: "10px", width: "100%", padding: "10px" }}
      >
        Agregar
      </button>

      <div style={{ marginTop: "20px" }}>
        {lista.length === 0 && <p>No hay productos aún.</p>}

        {lista.map((item, i) => (
          <div key={i} style={{ background: "#222", padding: "10px", marginTop: "10px" }}>
            <strong>{item.nombre}</strong>
            <p>Precio: ${item.precio}</p>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: "20px" }}>Total: ${total}</h3>

      <button 
        onClick={finalizarVenta} 
        style={{ marginTop: "10px", width: "100%", padding: "10px", background: "purple", color: "white" }}
      >
        Finalizar venta
      </button>
    </div>
  );
}
