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

  const typeLabel = (t) => {
    if (t === "all") return i18n.lang === "es" ? "Todo" : "All";
    if (t === "car") return i18n.lang === "es" ? "Autos" : "Cars";
    if (t === "motorcycle") return i18n.lang === "es" ? "Motos" : "Motorcycles";
    return t;
  };

  const clearAll = () => {
    setSearch("");
    setType("all");
    setSort("priceLow");
  };

  const hasFilters = Boolean(search.trim()) || type !== "all" || sort !== "priceLow";

  return (
    <div className="container container-narrow py-4">
      {/* Header */}
      <div className="card-dark p-4 mb-3">
        <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3">
          <div>
            <div className="text-muted" style={{ fontSize: 13 }}>
              {i18n.lang === "es"
                ? "Explorá el inventario y revisá detalles antes del checkout."
                : "Browse inventory and review details before checkout."}
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
              {i18n.t("nav.inventory")}
            </h1>

            <div style={{ color: "var(--muted)", marginTop: 6, fontSize: 14 }}>
              <span style={{ fontWeight: 800 }}>{vehicles.length}</span>{" "}
              {i18n.lang === "es" ? "resultados" : "results"} ·{" "}
              {i18n.lang === "es"
                ? "Checkout con Affirm (sujeto a aprobación)."
                : "Affirm checkout (subject to approval)."}
            </div>
          </div>

          <div className="d-flex align-items-center gap-2">
            {hasFilters && (
              <button className="btn btn-ghost" onClick={clearAll}>
                {i18n.lang === "es" ? "Limpiar" : "Clear"}
              </button>
            )}
            <div className="pill">
              {i18n.lang === "es" ? "Estado: Demo" : "Status: Demo"}
            </div>
          </div>
        </div>

        {/* Quick type chips */}
        <div className="d-flex flex-wrap gap-2 mt-3">
          {["all", "car", "motorcycle"].map((t) => (
            <button
              key={t}
              type="button"
              className="pill"
              onClick={() => setType(t)}
              style={{
                border: "1px solid rgba(255,255,255,.10)",
                background: type === t ? "rgba(184,245,70,.14)" : "rgba(255,255,255,.03)",
                color: type === t ? "var(--text)" : "var(--muted)",
                fontWeight: 850
              }}
            >
              {typeLabel(t)}
            </button>
          ))}
        </div>
      </div>

      {/* Your existing filters */}
      <FiltersBar
        i18n={i18n}
        search={search}
        onSearch={setSearch}
        type={type}
        onType={setType}
        sort={sort}
        onSort={setSort}
      />

      {/* Results */}
      <div className="mt-3">
        <VehicleGrid vehicles={vehicles} i18n={i18n} />
      </div>
    </div>
  );
}
