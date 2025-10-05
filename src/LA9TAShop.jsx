import React, { useState } from "react";
import emailjs from "emailjs-com";

// Fixed image paths for GitHub Pages
const backgroundImage = process.env.PUBLIC_URL + "/images/la9ta-bg.png";
const logoPath = process.env.PUBLIC_URL + "/images/logo.png";

const initialProducts = [
  {
    id: 1,
    name: "LA9TA Design 1",
    price: 59,
    image: [
      process.env.PUBLIC_URL + "/images/tshirt1-a.jpeg",
      process.env.PUBLIC_URL + "/images/tshirt1-b.jpeg"
    ],
    description: "Handmade unique piece — we can make your design a reality.",
  },
  {
    id: 2,
    name: "LA9TA Design 2",
    price: 59,
    image: [
      process.env.PUBLIC_URL + "/images/tshirt2-a.jpg",
      process.env.PUBLIC_URL + "/images/tshirt2-b.jpg"
    ],
    description: "Handmade unique piece — we can make your design a reality.",
  },
  {
    id: 3,
    name: "LA9TA Design 3",
    price: 59,
    image: [
      process.env.PUBLIC_URL + "/images/tshirt3-a.jpg",
      process.env.PUBLIC_URL + "/images/tshirt3-b.jpg"
    ],
    description: "Handmade unique piece — we can make your design a reality.",
  },
];

export default function LA9TAShop() {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "" });

  function addToCart(p) {
    setCart((c) => {
      const existing = c.find((item) => item.product.id === p.id);
      if (existing) {
        return c.map((item) =>
          item.product.id === p.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...c, { product: p, quantity: 1 }];
    });
  }

  function removeFromCart(idx) {
    setCart((c) => c.filter((_, i) => i !== idx));
  }

  function openOrder(p) {
    setSelected(p);
    setShowOrderModal(true);
  }

  function placeOrder() {
    if (!customer.name || !customer.phone || !customer.address) {
      alert("Please fill in your name, phone, and address.");
      return;
    }

    const orderItems = cart.length ? cart : [{ product: selected, quantity: 1 }];
    const total = orderItems.reduce((s, it) => s + it.product.price * it.quantity, 0);

    const itemsText = orderItems
      .map(
        (it) => `${it.product.name} x ${it.quantity} - ${(it.product.price * it.quantity).toFixed(2)} TND`
      )
      .join("\n");

    const templateParams = {
      name: customer.name,
      phone: customer.phone,
      address: customer.address,
      items: itemsText,
      total: `${total.toFixed(2)} TND`,
      to_email: "azertyuiopwxcvbnamoun@gmail.com"
    };

    emailjs
      .send(
        "service_m7wzdhx",
        "template_kb4ntjs",
        templateParams,
        "neV2zqUQaeac61msT"
      )
      .then(() => {
        alert("Order sent successfully by email!");
        setCart([]);
        setShowOrderModal(false);
        setSelected(null);
        setCustomer({ name: "", phone: "", address: "" });
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        alert("Failed to send order. Check console.");
      });
  }

  const total = cart.reduce((s, it) => s + it.product.price * it.quantity, 0);

  return (
    <div
      style={{
        ...styles.app,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
      }}
    >
      <div style={styles.overlay}>
        <header style={styles.header}>
          <div style={styles.brand}>
            <img src={logoPath} alt="LA9TA logo" style={styles.logo} />
            <div>
              <h1 style={{ margin: 0, color: "#fff" }}>LA9TA — Handmade</h1>
              <div style={{ fontSize: 13, color: "#ccc" }}>
                Unique drops — we make your ideas real
              </div>
            </div>
          </div>
          <div style={styles.cartSummary}>
            <div style={{ color: "#eee" }}>Cart: {cart.reduce((s, it) => s + it.quantity, 0)} item(s)</div>
            <div style={{ fontWeight: 700, color: "#fff" }}>
              {total ? `${total.toFixed(2)} TND` : ""}
            </div>
          </div>
        </header>

        <main style={styles.main}>
          <section style={styles.grid}>
            {products.map((p) => (
              <article key={p.id} style={styles.card}>
                <div style={styles.doubleImageWrap}>
                  {p.image.map((src, idx) => (
                    <img key={idx} src={src} alt={`${p.name} ${idx + 1}`} style={styles.img} />
                  ))}
                </div>
                <div style={styles.cardBody}>
                  <h3 style={{ margin: "6px 0" }}>{p.name}</h3>
                  <div style={{ color: "#777", fontSize: 14 }}>{p.description}</div>
                  <div style={styles.row}>
                    <div style={{ fontWeight: 700 }}>{p.price} TND</div>
                    <div style={styles.actions}>
                      <button style={styles.btn} onClick={() => addToCart(p)}>
                        Add to Cart
                      </button>
                      <button style={{ ...styles.btn, ...styles.primary }} onClick={() => openOrder(p)}>
                        Order
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <aside style={styles.side}>
            <h3>Cart</h3>
            {cart.length === 0 ? (
              <div style={{ color: "#666" }}>Your cart is empty</div>
            ) : (
              <div>
                {cart.map((it, i) => (
                  <div key={i} style={styles.cartItem}>
                    <img src={it.product.image[0]} style={styles.cartThumb} alt="thumb" />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14 }}>{it.product.name}</div>
                      <div style={{ fontSize: 12, color: "#666" }}>
                        {it.product.price} TND x {it.quantity} = {(it.product.price * it.quantity).toFixed(2)} TND
                      </div>
                    </div>
                    <button style={styles.removeBtn} onClick={() => removeFromCart(i)}>✕</button>
                  </div>
                ))}
                <div style={{ marginTop: 12, fontWeight: 700 }}>Total: {total.toFixed(2)} TND</div>
                <button style={{ ...styles.btn, ...styles.primary, marginTop: 10 }} onClick={() => setShowOrderModal(true)}>
                  Checkout
                </button>
              </div>
            )}
          </aside>
        </main>

        {showOrderModal && (
          <div style={styles.modalBackdrop} onClick={() => setShowOrderModal(false)}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
              <h2>Place Order</h2>
              <div style={{ marginBottom: 8, color: "#666" }}>
                Item: {selected ? selected.name : `${cart.reduce((s, it) => s + it.quantity, 0)} item(s)`}
              </div>
              <input
                placeholder="Full name"
                value={customer.name}
                onChange={(e) => setCustomer((s) => ({ ...s, name: e.target.value }))}
                style={styles.input}
              />
              <input
                placeholder="Phone"
                value={customer.phone}
                onChange={(e) => setCustomer((s) => ({ ...s, phone: e.target.value }))}
                style={styles.input}
              />
              <textarea
                placeholder="Address"
                value={customer.address}
                onChange={(e) => setCustomer((s) => ({ ...s, address: e.target.value }))}
                style={{ ...styles.input, height: 80 }}
              />
              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                <button style={styles.btn} onClick={() => setShowOrderModal(false)}>Cancel</button>
                <button style={{ ...styles.btn, ...styles.primary }} onClick={placeOrder}>Place Order</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  app: { fontFamily: "Inter, Arial, sans-serif", color: "#222" },
  overlay: { backgroundColor: "rgba(0,0,0,0.6)", minHeight: "100vh", width: "100%" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 30px", flexWrap: "wrap" },
  brand: { display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" },
  logo: { width: 72, height: 72, objectFit: "contain", background: "white", padding: 6, borderRadius: 8, boxShadow: "0 6px 18px rgba(0,0,0,0.3)" },
  cartSummary: { textAlign: "right", fontSize: 14 },
  main: { display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 20, padding: 20 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18, flex: 1 },
  card: { background: "rgba(255,255,255,0.9)", borderRadius: 12, boxShadow: "0 6px 18px rgba(0,0,0,0.15)", overflow: "hidden", backdropFilter: "blur(10px)" },
  doubleImageWrap: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, width: "100%", aspectRatio: "1", background: "#fafafa" },
  img: { width: "100%", height: "100%", objectFit: "cover" },
  cardBody: { padding: 12, display: "flex", flexDirection: "column", gap: 6 },
  row: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 },
  actions: { display: "flex", gap: 8, flexWrap: "wrap" },
  btn: { padding: "8px 12px", borderRadius: 8, border: "1px solid #ddd", background: "white", cursor: "pointer", fontWeight: 600 },
  primary: { background: "#111", color: "white", borderColor: "#111", transition: "0.3s" },
  side: { padding: 12, borderRadius: 12, background: "rgba(255,255,255,0.9)", boxShadow: "0 6px 18px rgba(0,0,0,0.15)", backdropFilter: "blur(10px)", minWidth: 280 },
  cartItem: { display: "flex", gap: 8, alignItems: "center", marginBottom: 10 },
  cartThumb: { width: 56, height: 56, objectFit: "cover", borderRadius: 8, border: "1px solid #eee" },
  removeBtn: { border: "none", background: "transparent", cursor: "pointer", color: "#a00", fontSize: 16 },
  modalBackdrop: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 },
  modal: { width: "90%", maxWidth: 520, background: "white", padding: 20, borderRadius: 12, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" },
  input: { width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ddd", marginBottom: 8 },
};

