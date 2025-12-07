import { useState } from "react";
import productosBase from "./data/productos"; // usamos el listado que ya creamos

export default function Inventario() {
  const [productos, setProductos] = useState(productosBase);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoPrecio, setNuevoPrecio] = useState("");

  const agregarProducto = () => {
    if (!nuevoNombre.trim() || !nuevoPrecio.trim()) return;

    const existe = productos.find(p => p.nombre.toLowerCase() === nuevoNombre.toLowerCase());
    if (existe) {
      alert("Este producto ya existe en inventario.");
      return;
    }

    const nuevo = {
      id: productos.length + 1,
      nombre: nuevoNombre,
      precio: Number(nuevoPrecio)
    };

    setProductos([...productos, nuevo]);
    setNuevoNombre("");
    setNuevoPrecio("");
  };

  const eliminarProducto = (id) => {
    const filtrado = productos.filter(p => p.id !== id);
    setProductos(filtrado);
  };

  return (
    <div className="venta-container">
      <h1>📦 Inventario</h1>
      <p>Administra tus productos base. Agrega, elimina y controla precios.</p>

      {/* formulario */}
      <div className="inventario-form">
        <input
          type="text"
          placeholder="Producto nuevo"
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.target.value)}
        />

        <input
          type="number"
          placeholder="Precio"
          value={nuevoPrecio}
          onChange={(e) => setNuevoPrecio(e.target.value)}
        />

        <button onClick={agregarProducto}>Agregar</button>
      </div>

      {/* lista */}
      <ul className="lista-inventario">
        {productos.length === 0 && <p>No hay productos registrados.</p>}

        {productos.map(item => (
          <li key={item.id} className="producto-item">
            <strong>{item.nombre}</strong>
            <span>${item.precio}</span>
            <button onClick={() => eliminarProducto(item.id)} className="btn-del">
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
