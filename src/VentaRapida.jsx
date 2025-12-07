import { useState } from "react";
import { generarBoletaPDF } from "./utils/boletaPDF";
import { useInventario } from "./hooks/useInventario";

export default function VentaRapida() {
  const { productos, editarProducto, descontarStock } = useInventario();

  const [productoBuscar, setProductoBuscar] = useState("");
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);

  // Buscar producto existente (ignora mayúsculas)
  const buscarProducto = productos.find(
    p => p.nombre.toLowerCase() === productoBuscar.toLowerCase()
  );

  const agregar = () => {
    if (!buscarProducto) return alert("Producto no encontrado en inventario");
    if (buscarProducto.stock <= 0) return alert("Sin stock disponible");

    // Agregar al carrito
    const item = { ...buscarProducto, cantidad: 1 };
    setCarrito([...carrito, item]);
    setTotal(total + item.precio);
    setProductoBuscar("");
  };

  const finalizarVenta = () => {
    if (carrito.length === 0) return alert("Carrito vacío");

    // Descontar stock por cada producto
    carrito.forEach(p => descontarStock(p.id, p.cantidad));

    const venta = {
      id: Date.now(),
      fecha: new Date().toLocaleString(),
      items: carrito,
      total
    };

    generarBoletaPDF(venta); // PDF listo

    alert("Venta completada ✔ Stock actualizado");
    setCarrito([]);
    setTotal(0);
  };

  const enviarWhatsApp = () => {
    if (carrito.length === 0) return alert("No hay productos");

    const items = carrito.map(
      p => `• ${p.nombre}  x${p.cantidad}  $${p.precio}`
    ).join("%0A");

    const msg = 
      `🧾 *Compra Minimarket A&R*%0A${items}%0A———————%0A*Total: $${total}*`;

    const numero = prompt("Número WhatsApp EJ:+569XXXXXXXX:");
    if (!numero) return;

    window.open(`https://wa.me/${numero}?text=${msg}`, "_blank");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🛒 Venta rápida</h2>

      <input
        placeholder="Escribe producto exacto..."
        value={productoBuscar}
        onChange={e => setProductoBuscar(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && agregar()}
        style={input}
      />

      <button onClick={agregar} style={btnAgregar}>Agregar producto ➕</button>

      <hr style={{ margin:"15px 0" }}/>

      <h3>Carrito</h3>

      {carrito.length === 0 && <p>No hay productos aún.</p>}

      {carrito.map((p, i) => (
        <div key={i} style={card}>
          <b>{p.nombre}</b> — ${p.precio}
          <p>Stock actual: {p.stock}</p>
        </div>
      ))}

      <h2>Total: ${total}</h2>

      {carrito.length > 0 && (
        <>
          <button 
            onClick={finalizarVenta} 
            style={{ ...btn, background:"purple" }}
          >
            Finalizar venta + PDF
          </button>

          <button onClick={enviarWhatsApp} style={btnWhatsapp}>
            📩 Enviar por WhatsApp
          </button>
        </>
      )}
    </div>
  );
}

/* === Estilos rápidos === */
const input = { width:"100%", padding:10, borderRadius:8, marginBottom:10 };
const btn = { width:"100%", padding:12, color:"#fff", borderRadius:8, marginTop:10 };
const btnAgregar = { ...btn, background:"dodgerblue" };
const btnWhatsapp = { ...btn, background:"#25d366", fontWeight:"bold", color:"#000" };
const card = { background:"#222", padding:10, borderRadius:6, marginTop:8 };
