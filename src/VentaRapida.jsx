// src/VentaRapida.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { guardarVenta } from "./utils/guardarVentas";
import { generarBoletaPDF } from "./utils/boletaPDF";

export default function VentaRapida() {
  const [producto, setProducto] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [carrito, setCarrito] = useState([]);

  const agregar = () => {
    if (!producto.trim()) return alert("Ingresa nombre del producto");
    if (!precio || precio <= 0) return alert("Precio inválido");

    const item = {
      nombre: producto,
      precio: Number(precio),
      cantidad: Number(cantidad)
    };

    setCarrito([...carrito, item]);
    setProducto("");
    setPrecio("");
    setCantidad(1);
  };

  const finalizarVenta = () => {
    if (carrito.length === 0) return alert("Agrega productos primero");

    // calcula total
    const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

    // guarda en Reportes
    guardarVenta(
      carrito.map(p => ({
        nombre: p.nombre,
        cantidad: p.cantidad,
        precio: p.precio
      }))
    );

    // genera boleta PDF
    generarBoletaPDF(carrito, total);

    alert("Venta finalizada ✔ Boleta generada");
    setCarrito([]);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "550px", margin: "auto", color: "white" }}>
      
      <Link to="/" style={{ color: "violet", fontWeight: "bold" }}>⬅ Volver al menú</Link>
      <h2 style={{ marginTop: "15px" }}>🧾 Venta rápida</h2>

      {/* ingreso de producto */}
      <input
        type="text"
        placeholder="Nombre del producto"
        value={producto}
        onChange={(e) => setProducto(e.target.value)}
        style={inputStyle}
      />

      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        style={inputStyle}
      />

      <input
        type="number"
        placeholder="Cantidad"
        value={cantidad}
        min="1"
        onChange={(e) => setCantidad(e.target.value)}
        style={inputStyle}
      />

      <button style={btn} onClick={agregar}>Agregar producto ➕</button>

      <hr style={{ margin: "20px 0" }}/>

      <h3>Carrito</h3>

      {carrito.length === 0 && <p>No hay productos aún.</p>}

      {carrito.map((p, i) => (
        <div key={i} style={itemCard}>
          <b>{p.nombre}</b>
          <p>{p.cantidad} x ${p.precio}</p>
        </div>
      ))}

      {/* botón final */}
      {carrito.length > 0 && (
        <button style={{ ...btn, background:"purple" }} onClick={finalizarVenta}>
          Finalizar venta y generar boleta 🧾
        </button>
      )}
    </div>
  );
}

/* ——— estilos rápidos ——— */
const btn = {
  width:"100%", padding:"12px", 
  background:"violet", border:"none", marginTop:"8px",
  color:"white", fontWeight:"bold", borderRadius:"6px"
};

const inputStyle = {
  width:"100%", padding:"10px", marginTop:"10px", 
  borderRadius:"6px", border:"none"
};

const itemCard = {
  background:"#1a1a1a", borderRadius:"6px",
  padding:"10px", marginTop:"10px"
};
