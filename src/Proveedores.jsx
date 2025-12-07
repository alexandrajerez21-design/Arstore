import { useState } from "react";
import proveedoresBase from "./data/proveedores";

export default function Proveedores() {
  const [proveedores, setProveedores] = useState(proveedoresBase);
  const [nuevoProveedor, setNuevoProveedor] = useState({
    nombre: "",
    contacto: "",
    telefono: "",
    productos: "",
  });

  const agregarProveedor = () => {
    if (!nuevoProveedor.nombre.trim()) return;

    setProveedores([
      ...proveedores,
      {
        id: Date.now(),
        nombre: nuevoProveedor.nombre,
        contacto: nuevoProveedor.contacto,
        telefono: nuevoProveedor.telefono,
        productos: nuevoProveedor.productos.split(",").map(p => p.trim()),
      }
    ]);

    setNuevoProveedor({ nombre: "", contacto: "", telefono: "", productos: "" });
  };

  return (
    <div className="page">
      <h1>📦 Proveedores</h1>
      <p>Registra y administra proveedores de tu minimarket.</p>

      {/* FORMULARIO */}
      <div className="card">
        <h2>Agregar proveedor</h2>

        <input
          type="text"
          placeholder="Nombre del proveedor"
          value={nuevoProveedor.nombre}
          onChange={e => setNuevoProveedor({...nuevoProveedor, nombre: e.target.value})}
        />

        <input
          type="text"
          placeholder="Correo o contacto"
          value={nuevoProveedor.contacto}
          onChange={e => setNuevoProveedor({...nuevoProveedor, contacto: e.target.value})}
        />

        <input
          type="text"
          placeholder="Teléfono"
          value={nuevoProveedor.telefono}
          onChange={e => setNuevoProveedor({...nuevoProveedor, telefono: e.target.value})}
        />

        <input
          type="text"
          placeholder="Productos que provee (separados por coma)"
          value={nuevoProveedor.productos}
          onChange={e => setNuevoProveedor({...nuevoProveedor, productos: e.target.value})}
        />

        <button className="btn-primary" onClick={agregarProveedor}>
          Guardar proveedor
        </button>
      </div>

      {/* LISTA */}
      <h2 style={{marginTop:"30px"}}>Lista de proveedores</h2>

      {proveedores.length === 0 && <p>Aún no hay proveedores registrados.</p>}

      {proveedores.map(p => (
        <div key={p.id} className="card" style={{marginTop:"10px"}}>
          <h3>{p.nombre}</h3>
          <p>📞 {p.telefono || "Sin teléfono"}</p>
          <p>✉ {p.contacto || "Sin contacto"}</p>
          <p>🛒 Productos: {p.productos.join(", ")}</p>
        </div>
      ))}

      <br/><br/>
    </div>
  );
}
