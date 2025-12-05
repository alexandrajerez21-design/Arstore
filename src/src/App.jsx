export default function App() {
  return (
    <div style={{
      height: "100vh",
      background: "linear-gradient(135deg, #4b0082, #ff00ff, #00d4ff)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      textAlign: "center",
      fontFamily: "Poppins, sans-serif",
      padding: "20px"
    }}>
      <h1 style={{ fontSize: "2.2rem", marginBottom: "10px" }}>
        Minimarket A&R 🪐
      </h1>
      <p style={{ fontSize: "1.1rem", maxWidth: "300px", lineHeight: "1.5" }}>
        ¡Waw! Aquí comprar se siente distinto —<br />
        todo lo que amas más cerca de ti 💫🛒
      </p>
      <p style={{ marginTop: "25px", opacity: 0.7 }}>Cargando sistema...</p>
    </div>
  );
}
