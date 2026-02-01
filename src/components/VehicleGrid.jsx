// src/components/VehicleGrid.jsx
import React from "react";
import VehicleCard from "./VehicleCard";

export default function VehicleGrid({ vehicles, i18n }) {
  return (
    <div className="row g-3">
      {vehicles.map((v) => (
        <div key={v.id} className="col-12 col-md-6 col-lg-4 col-xxl-3">
          <VehicleCard vehicle={v} i18n={i18n} />
        </div>
      ))}
    </div>
  );
}
