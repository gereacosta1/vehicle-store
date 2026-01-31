import React from "react";
import { Link } from "react-router-dom";
import { formatUSD } from "../lib/money";

export default function VehicleCard({ vehicle }) {
  const img = vehicle.images?.[0];
  const isFeatured = Boolean(vehicle.featured);

  return (
    <div className="card-dark p-3 h-100 hover-raise">
      <div
        style={{
          position: "relative",
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,.10)",
          background: "rgba(255,255,255,.03)"
        }}
      >
        {/* top overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "linear-gradient(180deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,.08) 45%, rgba(0,0,0,.55) 100%)"
          }}
        />

        {/* badges */}
        <div style={{ position: "absolute", top: 10, left: 10, display: "flex", gap: 8, zIndex: 2 }}>
          <div className="pill" style={{ fontSize: 12, padding: "7px 10px" }}>
            {vehicle.type}
          </div>
          {isFeatured && (
            <div
              className="pill"
              style={{
                fontSize: 12,
                padding: "7px 10px",
                background: "rgba(184,245,70,.14)",
                borderColor: "rgba(184,245,70,.25)"
              }}
            >
              Featured
            </div>
          )}
        </div>

        {/* image */}
        {img ? (
          <img
            src={img}
            alt={vehicle.title}
            style={{ width: "100%", height: 190, objectFit: "cover", display: "block" }}
            loading="lazy"
          />
        ) : (
          <div
            style={{
              height: 190,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--muted)",
              fontSize: 13
            }}
          >
            Image coming soon
          </div>
        )}

        {/* bottom overlay row */}
        <div style={{ position: "absolute", left: 12, right: 12, bottom: 12, zIndex: 2 }}>
          <div className="d-flex align-items-center justify-content-between">
            <div style={{ color: "rgba(255,255,255,.92)", fontWeight: 900, fontSize: 13 }}>
              {vehicle.year} • {vehicle.location}
            </div>
            <div style={{ fontWeight: 950, color: "var(--accent)", fontSize: 14 }}>
              {formatUSD(vehicle.priceUsd)}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 d-flex flex-column gap-2">
        <div style={{ fontWeight: 900, letterSpacing: "-.2px" }}>
          {vehicle.title}
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div className="text-muted" style={{ fontSize: 13 }}>
            {vehicle.mileage ? `${Number(vehicle.mileage).toLocaleString("en-US")} mi` : "—"}
          </div>

          <Link to={`/vehicle/${vehicle.id}`} className="btn btn-ghost btn-sm">
            View details
          </Link>
        </div>
      </div>
    </div>
  );
}
