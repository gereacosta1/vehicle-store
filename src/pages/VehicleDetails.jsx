import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import inventory from "../data/inventory.sample.json";
import { formatUSD } from "../lib/money";
import { isAffirmReady } from "../lib/affirm";

export default function VehicleDetails({ i18n }) {
  const { id } = useParams();
  const vehicle = useMemo(
    () => (inventory.vehicles || []).find(v => v.id === id),
    [id]
  );

  const [msg, setMsg] = useState("");

  if (!vehicle) {
    return (
      <div className="container container-narrow py-5">
        <div className="card-dark p-4">
          <div style={{ fontWeight: 800 }}>Not found</div>
          <div className="mt-2">
            <Link to="/inventory" className="btn btn-ghost">Back</Link>
          </div>
        </div>
      </div>
    );
  }

  const img = vehicle.images?.[0];
  const ready = isAffirmReady();

  const onBuy = () => {
    // Placeholder until we implement real checkout creation + authorize/capture
    if (!ready) {
      setMsg(i18n.lang === "es"
        ? "Affirm todavía no está configurado (faltan claves)."
        : "Affirm is not configured yet (missing keys)."
      );
      return;
    }
    setMsg(i18n.lang === "es"
      ? "Listo para integrar checkout real de Affirm (siguiente paso)."
      : "Ready to wire real Affirm checkout (next step)."
    );
  };

  return (
    <div className="container container-narrow py-4">
      <div className="mb-3">
        <Link to="/inventory" className="pill">← {i18n.t("nav.inventory")}</Link>
      </div>

      <div className="row g-3">
        <div className="col-12 col-lg-7">
          <div className="card-dark p-3">
            {img ? (
              <img
                src={img}
                alt={vehicle.title}
                style={{ width: "100%", height: 420, objectFit: "cover", borderRadius: 14 }}
              />
            ) : (
              <div style={{ height: 420 }} />
            )}
          </div>
        </div>

        <div className="col-12 col-lg-5">
          <div className="card-dark p-4">
            <div style={{ color: "var(--muted-2)", marginBottom: 6 }}>
              {vehicle.year} • {vehicle.location}
            </div>
            <h1 style={{ fontWeight: 900, marginBottom: 10 }}>{vehicle.title}</h1>

            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="pill">{vehicle.type}</div>
              <div style={{ fontWeight: 900, fontSize: 28, color: "var(--accent)" }}>
                {formatUSD(vehicle.priceUsd)}
              </div>
            </div>

            <div style={{ color: "var(--muted)", marginBottom: 14 }}>
              {vehicle.description}
            </div>

            <div className="d-grid gap-2">
              <button
                className="btn btn-accent"
                onClick={onBuy}
                disabled={!ready}
                title={!ready ? "Need Affirm keys/config first" : ""}
              >
                {i18n.t("vehicle.buy")}
              </button>
              <div style={{ color: "var(--muted-2)", fontSize: 13 }}>
                {i18n.t("vehicle.disclaimer")}
              </div>
            </div>

            {msg ? (
              <div className="mt-3 pill" style={{ color: "var(--text)" }}>
                {msg}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
