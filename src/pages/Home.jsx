import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import VehicleGrid from "../components/VehicleGrid";
import inventory from "../data/inventory.sample.json";

export default function Home({ i18n }) {
  const featured = useMemo(() => {
    const set = new Set(inventory.featuredIds || []);
    return (inventory.vehicles || []).filter(v => set.has(v.id)).slice(0, 6);
  }, []);

  return (
    <div className="container container-narrow py-4">
      <section className="card-dark p-4 p-md-5">
        <div className="row g-4 align-items-center">
          <div className="col-12 col-lg-7">
            <h1 style={{ fontWeight: 900, fontSize: 42, lineHeight: 1.05, marginBottom: 12 }}>
              {i18n.t("hero.title")}
            </h1>
            <div style={{ color: "var(--muted)", fontSize: 16, maxWidth: 560 }}>
              {i18n.t("hero.subtitle")}
            </div>

            <div className="d-flex flex-wrap gap-2 mt-4">
              <Link to="/inventory" className="btn btn-accent">
                {i18n.t("hero.cta")}
              </Link>
              <Link to="/legal" className="btn btn-ghost">
                {i18n.t("nav.legal")}
              </Link>
            </div>

            <div className="mt-3" style={{ color: "var(--muted-2)", fontSize: 13 }}>
              {i18n.lang === "es"
                ? "Inventario chico (15–20). Diseño minimalista y rápido."
                : "Small inventory (15–20). Minimal, fast and responsive."}
            </div>
          </div>

          <div className="col-12 col-lg-5">
            <div className="card-dark p-3" style={{ background: "rgba(255,255,255,.02)" }}>
              <div style={{ fontWeight: 800, marginBottom: 6 }}>
                {i18n.t("sections.featured")}
              </div>
              <div style={{ color: "var(--muted)", fontSize: 14 }}>
                {i18n.lang === "es"
                  ? "Vehículos destacados listos para ver y comprar."
                  : "Featured vehicles ready to view and buy."}
              </div>
              <hr className="hr-soft my-3" />
              <div className="d-flex flex-column gap-2">
                {featured.slice(0, 3).map(v => (
                  <Link key={v.id} to={`/vehicle/${v.id}`} className="pill d-flex justify-content-between">
                    <span style={{ color: "var(--text)" }}>{v.title}</span>
                    <span style={{ color: "var(--muted-2)" }}>{v.year}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-4">
        <div className="d-flex align-items-end justify-content-between mb-3">
          <h2 style={{ fontWeight: 900, margin: 0 }}>{i18n.t("sections.featured")}</h2>
          <Link to="/inventory" className="pill">View all</Link>
        </div>

        <VehicleGrid vehicles={featured} />
      </section>
    </div>
  );
}
