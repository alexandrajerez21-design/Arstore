import jsPDF from "jspdf";
import "jspdf-autotable";

export function generarBoletaPDF(venta) {
  if (!venta) return;

  const doc = new jsPDF();

  // Encabezado
  doc.setFontSize(20);
  doc.text("🧾 Minimarket A&R - Boleta de venta", 14, 20);

  doc.setFontSize(12);
  doc.text(`Fecha: ${venta.fecha}`, 14, 32);
  doc.text("Gracias por su compra 🛍️", 14, 40);

  // Tabla con los productos
  const tabla = venta.items.map((i) => [
    i.nombre,
    i.cantidad,
    `$${i.precio}`,
    `$${i.precio * i.cantidad}`,
  ]);

  doc.autoTable({
    head: [["Producto", "Cant.", "Precio", "Subtotal"]],
    body: tabla,
    startY: 50,
  });

  // Total final
  doc.setFontSize(16);
  doc.text(`TOTAL: $${venta.total}`, 14, doc.lastAutoTable.finalY + 15);

  // Guarda PDF
  doc.save(`Boleta_${Date.now()}.pdf`);
}
