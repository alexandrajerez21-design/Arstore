import { useState, useEffect } from "react";

/**
 * Hook de Inventario global usando localStorage
 * Controla productos, stock, precio y CRUD completo.
 */

export function useInventario() {
  const [productos, setProductos] = useState([]);

  // Cargar inventario desde localStorage
  useEffect(() => {
    const data = localStorage.getItem("inventario_ARstore");
    if (data) setProductos(JSON.parse(data));
  }, []);

  // Guardar cada vez que cambie el inventario
  useEffect(() => {
    localStorage.setItem("inventario_ARstore", JSON.stringify(productos));
  }, [productos]);

  // Agregar producto
  const agregarProducto = (producto) => {
    setProductos([...productos, { id: Date.now(), ...producto }]);
  };

  // Editar producto
  const editarProducto = (id, nuevoProducto) => {
    setProductos(productos.map(p => p.id === id ? { ...p, ...nuevoProducto } : p ));
  };

  // Eliminar producto
  const eliminarProducto = (id) => {
    setProductos(productos.filter(p => p.id !== id));
  };

  // Descontar stock desde Venta Rápida próximo paso
  const descontarStock = (id, cantidad) => {
    setProductos(productos.map(p => 
      p.id === id ? { ...p, stock: p.stock - cantidad } : p
    ));
  };

  return {
    productos,
    agregarProducto,
    editarProducto,
    eliminarProducto,
    descontarStock
  };
}
