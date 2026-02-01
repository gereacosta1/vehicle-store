import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import inventory from "../data/inventory.sample.json";
import { formatUSD } from "../lib/money";
import { isAffirmReady } from "../lib/affirm";
import VehicleGrid from "../components/VehicleGrid";
import { useCart } from "../cart/CartContext";

function spec(label, value) {
  return (
    <div className="pill d-flex justify-content-between" style={{ gap: 12 }}>
      <span className="text-muted" style={{ fontSize: 13 }}>{label}</span>
      <span style={{ fontWeight: 800 }}>{value}</span>
    </div>
  );
}

export default function VehicleDetails({ i18n }) {
  const { id } = useParams();
  const { addItem } = useCart();

  const vehicle = useMemo(() => {
    return (inventory.vehicles || []).find(v => v.id === id);
  }, [id]);

  const similar = useMemo(() => {
    if (!vehicle) return [];
    return (inventory.vehicles || [])
      .filter(v => v.id !== vehicle.id && v.type === vehicle.type)
      .slice(0, 6);
  }, [vehicle]);

  if (!vehicle) {
    return (
      <div className="container container-narrow py-4">
        <div className="card-dark p-4">
          <h2 className="h2-section mb-2">Not found</h2>
          <div className="text-muted mb-3">This vehicle does not exist.</div>
          <Link className="btn btn-ghost" to="/inventory">Back to inventory</Link>
        </div>
      </div>
    );
  }

  const img = (vehicle.images && vehicle.images[0]) || "";
  const ready = isAffirmReady();

  const addLabel = i18n.lang === "es" ? "Agregar al carrito" : "Add to cart";
  const scheduleLabel = i18n.lang === "es" ? "Agendar visita" : "Schedule a viewing";

  const onAdd = () => {
    addItem(
      {
        id: vehicle.id,
        title: vehicle.title,
        priceUsd: vehicle.priceUsd,
        image: img || "",
        year: vehicle.year,
        location: vehicle.location,
        type: vehicle.type
      },
      1
    );
  };

  return (
    <div className="container container-narrow py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Link to="/inventory" className="pill">← Inventory</Link>
        <div className="text-muted" style={{ fontSize: 13 }}>
          {i18n.lang === "es" ? "Sujeto a aprobación. Los términos varían." : "Subject to approval. Terms vary."}
        </div>
      </div>

      <div className="row g-3">
        {/* Left: image */}
        <div className="col-12 col-lg-7">
          <div className="card-dark p-3">
            <div
              style={{
                borderRadius: 16,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,.10)"
              }}
            >
              {img ? (
                <img
                  src={img}
                  alt={vehicle.title}
                  style={{ width: "100%", height: "auto", display: "block" }}
                  loading="lazy"
                />
              ) : (
                <div style={{ aspectRatio: "16/10", background: "rgba(255,255,255,.03)" }} />
              )}
            </div>

            <div className="d-flex flex-wrap gap-2 mt-3">
              <div className="pill">{vehicle.type}</div>
              <div className="pill">{vehicle.year}</div>
              <div className="pill">{vehicle.location}</div>
              <div className="pill">{Number(vehicle.mileage || 0).toLocaleString("en-US")} mi</div>
            </div>
          </div>
        </div>

        {/* Right: details */}
        <div className="col-12 col-lg-5">
          <div className="card-dark p-4 h-100">
            <div className="text-muted" style={{ fontSize: 13 }}>
              {vehicle.year} · {vehicle.location}
            </div>

            <h1 className="h2-section" style={{ fontSize: "clamp(22px, 2.2vw, 34px)", marginTop: 6 }}>
              {vehicle.title}
            </h1>

            <div className="d-flex align-items-center justify-content-between mt-3">
              <div className="pill" style={{ textTransform: "capitalize" }}>{vehicle.type}</div>
              <div style={{ color: "var(--accent)", fontWeight: 900, fontSize: 22 }}>
                {formatUSD(vehicle.priceUsd)}
              </div>
            </div>

            <div className="text-muted mt-3" style={{ fontSize: 14 }}>
              {vehicle.description || (i18n.lang === "es" ? "Detalles disponibles pronto." : "Details coming soon.")}
            </div>

            <hr className="hr-soft my-4" />

            <div className="d-flex flex-column gap-2">
              {spec(i18n.lang === "es" ? "Año" : "Year", String(vehicle.year))}
              {spec(i18n.lang === "es" ? "Ubicación" : "Location", vehicle.location)}
              {spec(i18n.lang === "es" ? "Kilometraje" : "Mileage", `${Number(vehicle.mileage || 0).toLocaleString("en-US")} mi`)}
              {spec(i18n.lang === "es" ? "Precio" : "Price", formatUSD(vehicle.priceUsd))}
            </div>

            <div className="mt-4 d-grid gap-2">
              <button className="btn btn-ghost" onClick={onAdd}>
                {addLabel}
              </button>

              <button className="btn btn-accent" disabled={!ready}>
                Buy with Affirm
              </button>

              <button className="btn btn-ghost">
                {scheduleLabel}
              </button>
            </div>

            {!ready && (
              <div className="text-muted mt-2" style={{ fontSize: 12 }}>
                Affirm is not loaded yet (keys/snippet not configured).
              </div>
            )}

            <div className="text-muted mt-3" style={{ fontSize: 12 }}>
              {i18n.lang === "es"
                ? "Este listado es demostración. Luego lo ajustamos con info real del dealer."
                : "Demo listing. We’ll finalize with the dealer’s real info."}
            </div>
          </div>
        </div>
      </div>

      {/* Similar */}
      <section className="section-gap">
        <div className="d-flex align-items-end justify-content-between mb-3">
          <h2 className="h2-section m-0">{i18n.lang === "es" ? "Similares" : "Similar vehicles"}</h2>
          <Link className="pill" to="/inventory">Browse all</Link>
        </div>
        <VehicleGrid vehicles={similar} i18n={i18n} />
      </section>
    </div>
  );
}
