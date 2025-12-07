import { jsPDF } from "jspdf";

export function generarBoletaPDF(venta) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("🧾 Boleta de venta - Minimarket A&R", 10, 15);

  doc.setFontSize(12);
  doc.text(`Fecha: ${new Date().toLocaleString()}`, 10, 30);
  doc.text(`Total: $${venta.total}`, 10, 40);

  doc.text("Productos:", 10, 55);

  venta.items.forEach((item, i) => {
    doc.text(`${i + 1}. ${item.nombre} - $${item.precio}`, 10, 70 + i * 8);
  });

  doc.save(`boleta_ARstore_${Date.now()}.pdf`);
}
