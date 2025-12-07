import { useState, useEffect } from "react";

export default function Reportes() {
  const [ventas, setVentas] = useState([]);

  // Cargar ventas guardadas
  useEffect(() => {
    const data = localStorage.getItem("ventas_arstore");
    if (data) setVentas(JSON.parse(data));
  }, []);

  function totalDelDia() {
    return ventas.reduce((acc, v) => acc + v.total, 0);
  }
