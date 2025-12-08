import { useState } from "react";
import { useInventario } from "./hooks/useInventario";
import { generarBoletaPDF } from "./utils/boletaPDF";

export default function VentaRapida() {
  const { productos, descontarStock } = useInventario();

  const [busqueda, setBusqueda] = useState("");
  const [carrito, setCarrito] = useState([]);

  const productoEncontrado = productos.find(
    (p) => p.nombre.toLowerCase() === busqueda.toLowerCase()
  );

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const agregarAlCarrito = () => {
    if (!productoEncontrado) {
      alert("Producto no encontrado en inventario (nombre exacto).");
      return;
    }

    if (!productoEncontrado.stock || productoEncontrado.stock <= 0) {
      alert("Sin stock disponible para este producto.");
      return;
    }

    // Por ahora siempre 1 unidad por click
    const item = {
      id: productoEncontrado.id,
      nombre: productoEncontrado.nombre,
      precio: productoEncontrado.precio,
      cantidad: 1,
      stockAntes: productoEncontrado.stock,
    };

    setCarrito((prev) => [...prev, item]);
    setBusqueda("");
  };

  const finalizarVenta = () => {
    if (carrito.length === 0) {
      alert("No hay productos en el carrito.");
      return;
    }

    // Descontar stock según carrito
    carrito.forEach((item) => {
      descontarStock(item.id, item.cantidad);
    });

    // Armar objeto venta para boleta
    const venta = {
      fecha: new Date().toLocaleString(),
      total,
      items: carrito.map((i) => ({
        nombre: i.nombre,
        cantidad: i.cantidad,
        precio: i.precio,
      })),
    };

    generarBoletaPDF(venta);

    alert("Venta realizada. Stock actualizado y boleta generada.");
    setCarrito([]);
  };

  const enviarWhatsApp = () => {
    if (carrito.length === 0) {
      alert("No hay productos en el carrito.");
      return;
    }

    const detalle = carrito
      .map(
        (i) => `• ${i.nombre}  x${i.cantidad}  $${i.precio} = $${i.precio * i.cantidad}`
      )
      .join("%0A");

    const mensaje = `🧾 *Compra Minimarket A&R*%0A${detalle}%0A———————%0A*Total: $${total}*`;

    const telefono = prompt("Ingresa número WhatsApp (formato internacional, ej: 569XXXXXXXX):");
    if (!telefono) return;

    window.open(`https://wa.me/${telefono}?text=${mensaje}`, "_blank");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🛒 Venta rápida</h2>
      <p>
        Escribe el <b>nombre EXACTO</b> del producto como está en inventario.
      </p>

      <input
        type="text"
        placeholder="Ej: Coca-Cola 1.5L"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && agregarAlCarrito()}
        style={{
          width: "100%",
          padding: 10,
          borderRadius: 8,
          marginBottom: 10,
        }}
      />

      <button
        onClick={agregarAlCarrito}
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 8,
          background: "dodgerblue",
          color: "#fff",
          fontWeight: "bold",
          marginBottom: 15,
          border: "none",
        }}
      >
        ➕ Agregar al carrito
      </button>

      <h3>Carrito</h3>

      {carrito.length === 0 && <p>No hay productos agregados.</p>}

      {carrito.map((item, idx) => (
        <div
          key={idx}
          style={{
            background: "#222",
            color: "#fff",
            padding: 10,
            borderRadius: 8,
            marginBottom: 8,
          }}
        >
          <b>{item.nombre}</b>
          <p>
            {item.cantidad} x ${item.precio} = ${item.cantidad * item.precio}
          </p>
        </div>
      ))}

      <h2>Total: ${total}</h2>

      {carrito.length > 0 && (
        <>
          <button
            onClick={finalizarVenta}
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 8,
              background: "purple",
              color: "#fff",
              fontWeight: "bold",
              border: "none",
              marginTop: 10,
            }}
          >
            ✅ Finalizar venta & generar boleta
          </button>

          <button
            onClick={enviarWhatsApp}
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 8,
              background: "#25D366",
              color: "#000",
              fontWeight: "bold",
              border: "none",
              marginTop: 10,
            }}
          >
            📲 Enviar resumen por WhatsApp
          </button>
        </>
      )}
    </div>
  );
}import { useState } from "react";
import { useInventario } from "./hooks/useInventario";
import { generarBoletaPDF } from "./utils/boletaPDF";

export default function VentaRapida() {
  const { productos, descontarStock } = useInventario();

  const [busqueda, setBusqueda] = useState("");
  const [carrito, setCarrito] = useState([]);

  const productoEncontrado = productos.find(
    (p) => p.nombre.toLowerCase() === busqueda.toLowerCase()
  );

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const agregarAlCarrito = () => {
    if (!productoEncontrado) {
      alert("Producto no encontrado en inventario (nombre exacto).");
      return;
    }

    if (!productoEncontrado.stock || productoEncontrado.stock <= 0) {
      alert("Sin stock disponible para este producto.");
      return;
    }

    // Por ahora siempre 1 unidad por click
    const item = {
      id: productoEncontrado.id,
      nombre: productoEncontrado.nombre,
      precio: productoEncontrado.precio,
      cantidad: 1,
      stockAntes: productoEncontrado.stock,
    };

    setCarrito((prev) => [...prev, item]);
    setBusqueda("");
  };

  const finalizarVenta = () => {
    if (carrito.length === 0) {
      alert("No hay productos en el carrito.");
      return;
    }

    // Descontar stock según carrito
    carrito.forEach((item) => {
      descontarStock(item.id, item.cantidad);
    });

    // Armar objeto venta para boleta
    const venta = {
      fecha: new Date().toLocaleString(),
      total,
      items: carrito.map((i) => ({
        nombre: i.nombre,
        cantidad: i.cantidad,
        precio: i.precio,
      })),
    };

    generarBoletaPDF(venta);

    alert("Venta realizada. Stock actualizado y boleta generada.");
    setCarrito([]);
  };

  const enviarWhatsApp = () => {
    if (carrito.length === 0) {
      alert("No hay productos en el carrito.");
      return;
    }

    const detalle = carrito
      .map(
        (i) => `• ${i.nombre}  x${i.cantidad}  $${i.precio} = $${i.precio * i.cantidad}`
      )
      .join("%0A");

    const mensaje = `🧾 *Compra Minimarket A&R*%0A${detalle}%0A———————%0A*Total: $${total}*`;

    const telefono = prompt("Ingresa número WhatsApp (formato internacional, ej: 569XXXXXXXX):");
    if (!telefono) return;

    window.open(`https://wa.me/${telefono}?text=${mensaje}`, "_blank");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🛒 Venta rápida</h2>
      <p>
        Escribe el <b>nombre EXACTO</b> del producto como está en inventario.
      </p>

      <input
        type="text"
        placeholder="Ej: Coca-Cola 1.5L"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && agregarAlCarrito()}
        style={{
          width: "100%",
          padding: 10,
          borderRadius: 8,
          marginBottom: 10,
        }}
      />

      <button
        onClick={agregarAlCarrito}
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 8,
          background: "dodgerblue",
          color: "#fff",
          fontWeight: "bold",
          marginBottom: 15,
          border: "none",
        }}
      >
        ➕ Agregar al carrito
      </button>

      <h3>Carrito</h3>

      {carrito.length === 0 && <p>No hay productos agregados.</p>}

      {carrito.map((item, idx) => (
        <div
          key={idx}
          style={{
            background: "#222",
            color: "#fff",
            padding: 10,
            borderRadius: 8,
            marginBottom: 8,
          }}
        >
          <b>{item.nombre}</b>
          <p>
            {item.cantidad} x ${item.precio} = ${item.cantidad * item.precio}
          </p>
        </div>
      ))}

      <h2>Total: ${total}</h2>

      {carrito.length > 0 && (
        <>
          <button
            onClick={finalizarVenta}
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 8,
              background: "purple",
              color: "#fff",
              fontWeight: "bold",
              border: "none",
              marginTop: 10,
            }}
          >
            ✅ Finalizar venta & generar boleta
          </button>

          <button
            onClick={enviarWhatsApp}
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 8,
              background: "#25D366",
              color: "#000",
              fontWeight: "bold",
              border: "none",
              marginTop: 10,
            }}
          >
            📲 Enviar resumen por WhatsApp
          </button>
        </>
      )}
    </div>
  );
}
