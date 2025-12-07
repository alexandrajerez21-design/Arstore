import { useState } from "react";
import productosBase from "./data/productos";
import { generarBoletaPDF } from "./utils/boletaPDF";

export default function VentaRapida() {
  const [producto, setProducto] = useState("");
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);

  const agregarProducto = () => {
    if (!producto.trim()) return;

    const encontrado = productosBase.find(
      (p) => p.nombre.toLowerCase() === producto.toLowerCase()
    );

    if (!encontrado) {
      alert("Producto no encontrado en inventario");
      return;
    }

    const nuevo = { nombre: encontrado.nombre, precio: encontrado.precio };
    setCarrito([...carrito, nuevo]);
    setTotal((prev) => prev + encontrado.precio);
    setProducto("");
  };

  const finalizarVenta = () => {
    if (carrito.length === 0) return alert("No hay productos");

    const venta = {
      id: Date.now(),
      fecha: new Date().toLocaleString(),
      items: carrito,
      total,
    };

    // Guardar en localStorage
    const historial = JSON.parse(localStorage.getItem("ventas")) || [];
    historial.push(venta);
    localStorage.setItem("ventas", JSON.stringify(historial));

    generarBoletaPDF(venta); // 👉 generar boleta PDF

    alert("Venta guardada y boleta generada 📄");

    setCarrito([]);
    setTotal(0);
  };

  // 👉 Enviar por WhatsApp
  const enviarWhatsApp = () => {
    if (carrito.length === 0) return alert("No hay productos");

    const items = carrito.map((p) => `• ${p.nombre} - $${p.precio}`).join("%0A");
    const mensaje = `🧾 *Compra ARstore*%0A${items}%0A-------------%0A*Total: $${total}*`;
    const telefono = prompt("Número WhatsApp (Ej: +569XXXXXXXX):");

    if (telefono) {
      window.open(`https://wa.me/${telefono}?text=${mensaje}`, "_blank");
    }
  };

  return (
    <div className="ventaRapida">
      <h2>🧾 Venta rápida</h2>
      <input
        type="text"
        placeholder="Escribe producto exacto..."
        value={producto}
        onChange={(e) => setProducto(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && agregarProducto()}
      />
      <button onClick={agregarProducto}>Agregar</button>

      {carrito.length > 0 && (
        <ul>
          {carrito.map((item, i) => (
            <li key={i}>{item.nombre} - ${item.precio}</li>
          ))}
        </ul>
      )}

      <h3>Total: ${total}</h3>

      <button style={{ background:"linear-gradient(90deg,#8a2be2,#00e5ff)" }} onClick={finalizarVenta}>
        Finalizar & PDF
      </button>

      <button style={{ marginTop:10, background:"#25d366", color:"#000" }} onClick={enviarWhatsApp}>
        📤 Enviar por WhatsApp
      </button>
    </div>
  );
}
