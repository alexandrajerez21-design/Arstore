import { useState, useEffect } from "react";
import productosBase from "../data/productos";

/**
 * Hook de Inventario global usando localStorage
 * Carga productos desde localStorage si existen,
 * si no, toma la base de data/productos.js
 */

export function useInventario() {
  const [productos, setProductos] = useState([]);

  // Cargar inventario al inicio
  useEffect(() => {
    const data = localStorage.getItem("inventario_ARstore");
    if (data) {
      setProductos(JSON.parse(data));
    } else {
      // Primera vez: usar base
      setProductos(productosBase);
      localStorage.setItem("inventario_ARstore", JSON.stringify(productosBase));
    }
  }, []);

  // Guardar cada vez que cambia
  useEffect(() => {
    if (productos.length > 0) {
      localStorage.setItem("inventario_ARstore", JSON.stringify(productos));
    }
  }, [productos]);

  // Agregar producto
  const agregarProducto = (producto) => {
    setProductos((prev) => [
      ...prev,
      { id: Date.now(), ...producto },
    ]);
  };

  // Editar producto
  const editarProducto = (id, cambios) => {
    setProductos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...cambios } : p))
    );
  };

  // Eliminar producto
  const eliminarProducto = (id) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  // Descontar stock (usado en Venta Rápida)
  const descontarStock = (id, cantidad) => {
    setProductos((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, stock: Math.max(0, (p.stock || 0) - cantidad) }
          : p
      )
    );
  };

  return {
    productos,
    agregarProducto,
    editarProducto,
    eliminarProducto,
    descontarStock,
  };
}
