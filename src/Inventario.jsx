import { useState } from "react";
import { useInventario } from "./hooks/useInventario";

export default function Inventario() {
  const { productos, agregarProducto, editarProducto, eliminarProducto } = useInventario();

  const [busqueda, setBusqueda] = useState("");
  const [modal, setModal] = useState(false);
  const [modoEditar, setModoEditar] = useState(false);
  const [form, setForm] = useState({ nombre: "", precio: "", stock: "" });
  const [editID, setEditID] = useState(null);

  const abrirNuevo = () => {
    setModoEditar(false);
    setForm({ nombre: "", precio: "", stock: "" });
    setModal(true);
  };

  const abrirEditar = (p) => {
    setModoEditar(true);
    setEditID(p.id);
    setForm({ nombre: p.nombre, precio: p.precio, stock: p.stock });
    setModal(true);
  };

  const guardar = () => {
    if (!form.nombre.trim()) return alert("Nombre requerido");
    if (!form.precio || form.precio <= 0) return alert("Precio inválido");
    if (!form.stock || form.stock < 0) return alert("Stock inválido");

    if (modoEditar) editarProducto(editID, form);
    else agregarProducto(form);

    setModal(false);
  };

  const filtrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>📦 Inventario</h1>
      <p>Control de productos, precios y stock del minimarket.</p>

      <div style={{ margin: "15px 0" }}>
        <input
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ width: "100%", padding: 10, borderRadius: 8 }}
        />
      </div>

      <button
        onClick={abrirNuevo}
        style={{
          background: "linear-gradient(90deg,#ff4bcf,#5d5dff)",
          color: "#fff",
          width: "100%",
          padding: 12,
          borderRadius: 10,
          marginBottom: 15
        }}
      >
        ➕ Agregar producto
      </button>

      {filtrados.length === 0 ? (
        <p>No hay productos registrados aún.</p>
      ) : (
        <table width="100%" style={{ marginTop: 10 }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid #555" }}>
              <th>Producto</th>
              <th>Precio</th>
              <th>Stock</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {filtrados.map(p => (
              <tr key={p.id} style={{ borderBottom: "1px solid #333" }}>
                <td>{p.nombre}</td>
                <td>${p.precio}</td>
                <td>{p.stock}</td>
                <td style={{ textAlign: "right" }}>
                  <button onClick={() => abrirEditar(p)} style={btnSm}>✏️</button>
                  <button onClick={() => eliminarProducto(p.id)} style={btnDel}>🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modal && (
        <div style={modalBg}>
          <div style={modalBox}>
            <h3>{modoEditar ? "Editar producto" : "Nuevo producto"}</h3>

            <input
              placeholder="Nombre"
              value={form.nombre}
              onChange={e => setForm({ ...form, nombre: e.target.value })}
              style={input}
            />
            <input
              type="number"
              placeholder="Precio"
              value={form.precio}
              onChange={e => setForm({ ...form, precio: Number(e.target.value) })}
              style={input}
            />
            <input
              type="number"
              placeholder="Stock"
              value={form.stock}
              onChange={e => setForm({ ...form, stock: Number(e.target.value) })}
              style={input}
            />

            <button onClick={guardar} style={btnOK}>
              {modoEditar ? "Guardar cambios" : "Agregar"}
            </button>
            <button onClick={() => setModal(false)} style={btnCancel}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

// 🔹 estilos internos
const input = { width: "100%", padding: 10, margin: "6px 0", borderRadius: 8 };
const btnOK = { width: "100%", padding: 12, borderRadius: 10, background:"linear-gradient(90deg,#00e6b7,#0099ff)", color:"#fff" };
const btnCancel = { width: "100%", padding: 12, borderRadius: 10, marginTop: 5, background:"#444", color:"#fff" };
const btnSm = { marginRight: 6, background:"#555", color:"#fff", padding:"5px 8px", borderRadius: 6 };
const btnDel = { background:"#d9534f", color:"#fff", padding:"5px 8px", borderRadius: 6 };
const modalBg = { position:"fixed", top:0,left:0,width:"100%",height:"100%",background:"rgba(0,0,0,.7)",display:"flex",justifyContent:"center",alignItems:"center" };
const modalBox = { background:"#111", padding:20, borderRadius:10, width:"90%", maxWidth:350 };
