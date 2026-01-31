import React from "react";
import { Link } from "react-router-dom";
import { formatUSD } from "../lib/money";

export default function VehicleCard({ vehicle }) {
  const img = vehicle.images?.[0];

  return (
    <div className="card-dark p-3 h-100">
      <div
        style={{
          borderRadius: 14,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,.08)",
          background: "rgba(255,255,255,.03)"
        }}
      >
        {img ? (
          <img
            src={img}
            alt={vehicle.title}
            style={{ width: "100%", height: 180, objectFit: "cover", display: "block" }}
            loading="lazy"
          />
        ) : (
          <div style={{ height: 180 }} />
        )}
      </div>

      <div className="mt-3 d-flex flex-column gap-2">
        <div className="d-flex justify-content-between align-items-start gap-3">
          <div>
            <div style={{ fontWeight: 800 }}>{vehicle.title}</div>
            <div style={{ color: "var(--muted-2)", fontSize: 13 }}>
              {vehicle.year} • {vehicle.location}
            </div>
          </div>
          <div style={{ fontWeight: 800, color: "var(--accent)" }}>
            {formatUSD(vehicle.priceUsd)}
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div className="pill" style={{ padding: "8px 12px", fontSize: 12 }}>
            {vehicle.type}
          </div>
          <Link to={`/vehicle/${vehicle.id}`} className="btn btn-ghost btn-sm">
            View details
          </Link>
        </div>
      </div>
    </div>
  );
}
