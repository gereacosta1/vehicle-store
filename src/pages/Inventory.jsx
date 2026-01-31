import React, { useMemo, useState } from "react";
import FiltersBar from "../components/FiltersBar";
import VehicleGrid from "../components/VehicleGrid";
import inventory from "../data/inventory.sample.json";

export default function Inventory({ i18n }) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [sort, setSort] = useState("priceLow");

  const vehicles = useMemo(() => {
    let list = [...(inventory.vehicles || [])];

    if (type !== "all") list = list.filter(v => v.type === type);

    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(v =>
        `${v.title} ${v.location} ${v.year}`.toLowerCase().includes(q)
      );
    }

    list.sort((a, b) => {
      if (sort === "priceLow") return a.priceUsd - b.priceUsd;
      if (sort === "priceHigh") return b.priceUsd - a.priceUsd;
      if (sort === "yearNew") return b.year - a.year;
      if (sort === "yearOld") return a.year - b.year;
      return 0;
    });

    return list;
  }, [search, type, sort]);

  return (
    <div className="container container-narrow py-4">
      <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-between gap-2 mb-3">
        <div>
          <h1 style={{ fontWeight: 900, marginBottom: 6 }}>{i18n.t("nav.inventory")}</h1>
          <div style={{ color: "var(--muted)" }}>
            {vehicles.length} {i18n.lang === "es" ? "resultados" : "results"}
          </div>
        </div>
      </div>

      <FiltersBar
        i18n={i18n}
        search={search}
        onSearch={setSearch}
        type={type}
        onType={setType}
        sort={sort}
        onSort={setSort}
      />

      <div className="mt-3">
        <VehicleGrid vehicles={vehicles} />
      </div>
    </div>
  );
}
