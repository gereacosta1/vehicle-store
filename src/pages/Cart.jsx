import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../cart/CartContext";
import { formatUSD } from "../lib/money";

export default function Cart({ i18n }) {
  const { items, totalQty, subtotal, setQty, removeItem, clear } = useCart();

  const title = i18n.lang === "es" ? "Carrito" : "Cart";
  const empty = i18n.lang === "es" ? "Tu carrito está vacío." : "Your cart is empty.";
  const browse = i18n.lang === "es" ? "Ir al inventario" : "Browse inventory";
  const subtotalLabel = i18n.lang === "es" ? "Subtotal" : "Subtotal";
  const clearLabel = i18n.lang === "es" ? "Vaciar" : "Clear";
  const removeLabel = i18n.lang === "es" ? "Quitar" : "Remove";

  return (
    <div className="container container-narrow py-4">
      <div className="card-dark p-4 mb-3">
        <div className="d-flex align-items-center justify-content-between gap-3">
          <div>
            <div className="text-muted" style={{ fontSize: 13 }}>
              {i18n.lang === "es"
                ? "Productos seleccionados (demo)."
                : "Selected items (demo)."}
            </div>
            <h1
              className="m-0"
              style={{
                fontWeight: 950,
                letterSpacing: "-.4px",
                marginTop: 6,
                fontSize: "clamp(22px, 2.2vw, 34px)"
              }}
            >
              {title}
            </h1>
            <div className="text-muted mt-2" style={{ fontSize: 14 }}>
              <span style={{ fontWeight: 800 }}>{totalQty}</span>{" "}
              {i18n.lang === "es" ? "items" : "items"}
            </div>
          </div>

          <div className="d-flex align-items-center gap-2">
            <Link to="/inventory" className="btn btn-ghost">
              {browse}
            </Link>
            {items.length > 0 && (
              <button className="btn btn-ghost" onClick={clear}>
                {clearLabel}
              </button>
            )}
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="card-dark p-4">
          <div className="text-muted">{empty}</div>
        </div>
      ) : (
        <div className="row g-3">
          <div className="col-12 col-lg-8">
            <div className="d-flex flex-column gap-2">
              {items.map((it) => (
                <div key={it.id} className="card-dark p-3">
                  <div className="d-flex gap-3 align-items-center">
                    <div
                      style={{
                        width: 92,
                        height: 64,
                        borderRadius: 12,
                        overflow: "hidden",
                        border: "1px solid rgba(255,255,255,.10)",
                        background: "rgba(255,255,255,.03)",
                        flexShrink: 0
                      }}
                    >
                      {it.image ? (
                        <img
                          src={it.image}
                          alt={it.title}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                          loading="lazy"
                        />
                      ) : null}
                    </div>

                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between gap-2">
                        <div>
                          <Link
                            to={`/vehicle/${it.id}`}
                            style={{ fontWeight: 900, letterSpacing: "-.2px" }}
                          >
                            {it.title}
                          </Link>
                          <div className="text-muted" style={{ fontSize: 13, marginTop: 3 }}>
                            {it.year ? `${it.year} • ` : ""}{it.location || ""} {it.type ? `• ${it.type}` : ""}
                          </div>
                        </div>

                        <div style={{ fontWeight: 950, color: "var(--accent)" }}>
                          {formatUSD(it.priceUsd)}
                        </div>
                      </div>

                      <div className="d-flex align-items-center justify-content-between mt-3">
                        <div className="d-flex align-items-center gap-2">
                          <button
                            type="button"
                            className="btn btn-ghost btn-sm"
                            onClick={() => setQty(it.id, Math.max(1, (it.qty || 1) - 1))}
                          >
                            −
                          </button>

                          <div className="pill" style={{ padding: "8px 12px", minWidth: 54, textAlign: "center" }}>
                            {it.qty}
                          </div>

                          <button
                            type="button"
                            className="btn btn-ghost btn-sm"
                            onClick={() => setQty(it.id, (it.qty || 1) + 1)}
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          className="btn btn-ghost btn-sm"
                          onClick={() => removeItem(it.id)}
                        >
                          {removeLabel}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="card-dark p-4">
              <div className="d-flex align-items-center justify-content-between">
                <div className="text-muted">{subtotalLabel}</div>
                <div style={{ fontWeight: 950, color: "var(--accent)", fontSize: 18 }}>
                  {formatUSD(subtotal)}
                </div>
              </div>

              <hr className="hr-soft my-3" />

              <div className="text-muted" style={{ fontSize: 12 }}>
                {i18n.lang === "es"
                  ? "Demo: el checkout real lo conectamos después (Affirm / Stripe)."
                  : "Demo: we’ll connect real checkout later (Affirm / Stripe)."}
              </div>

              <div className="d-grid gap-2 mt-3">
                <Link className="btn btn-accent" to="/inventory">
                  {i18n.lang === "es" ? "Seguir viendo" : "Continue browsing"}
                </Link>
                <button className="btn btn-ghost" type="button" onClick={clear}>
                  {clearLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
