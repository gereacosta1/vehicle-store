import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import VehicleGrid from "../components/VehicleGrid";
import inventory from "../data/inventory.sample.json";

export default function Home({ i18n }) {
  const featured = useMemo(() => {
    const set = new Set(inventory.featuredIds || []);
    return (inventory.vehicles || []).filter(v => set.has(v.id)).slice(0, 6);
  }, []);

  const recent = useMemo(() => {
    return [...(inventory.vehicles || [])].slice(0, 6);
  }, []);

  return (
    <div className="container container-narrow py-4">
      {/* HERO */}
      <section className="card-dark p-4 p-md-5">
        <div className="row g-4 align-items-center">
          <div className="col-12 col-lg-7">
            <h1 className="h1-hero" style={{ marginBottom: 12 }}>
              {i18n.t("hero.title")}
            </h1>

            <div className="text-muted" style={{ fontSize: 17, maxWidth: 620 }}>
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

            {/* Trust badges */}
            <div className="d-flex flex-wrap gap-2 mt-4">
              <div className="pill">Verified listings</div>
              <div className="pill">Fast checkout</div>
              <div className="pill">Florida inventory</div>
            </div>
          </div>

          <div className="col-12 col-lg-5">
            <div
              className="card-dark p-3"
              style={{ background: "rgba(255,255,255,.02)" }}
            >
              <div style={{ fontWeight: 900, marginBottom: 6 }}>
                {i18n.t("sections.featured")}
              </div>
              <div className="text-muted" style={{ fontSize: 14 }}>
                {i18n.lang === "es"
                  ? "Destacados listos para ver y comprar."
                  : "Featured picks ready to view and buy."}
              </div>
              <hr className="hr-soft my-3" />
              <div className="d-flex flex-column gap-2">
                {featured.slice(0, 4).map(v => (
                  <Link
                    key={v.id}
                    to={`/vehicle/${v.id}`}
                    className="pill d-flex justify-content-between"
                  >
                    <span style={{ color: "var(--text)", fontWeight: 700 }}>
                      {v.title}
                    </span>
                    <span style={{ color: "var(--muted-2)" }}>{v.year}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED GRID */}
      <section className="section-gap">
        <div className="d-flex align-items-end justify-content-between mb-3">
          <h2 className="h2-section m-0">{i18n.t("sections.featured")}</h2>
          <Link to="/inventory" className="pill">
            View all
          </Link>
        </div>
        <VehicleGrid vehicles={featured} />
      </section>

      {/* WHY / FEATURES */}
      <section className="section-gap">
        <div className="row g-3">
          <div className="col-12 col-lg-6">
            <div className="card-dark p-4 h-100">
              <div className="h2-section" style={{ marginBottom: 10 }}>
                {i18n.lang === "es" ? "Por qué carMania" : "Why carMania"}
              </div>
              <div className="text-muted" style={{ fontSize: 15 }}>
                {i18n.lang === "es"
                  ? "Minimalista, rápido y pensado para que la compra sea simple."
                  : "Minimal, fast, and built so buying feels straightforward."}
              </div>

              <div className="d-flex flex-column gap-2 mt-3">
                <div className="pill">Clean UI + responsive</div>
                <div className="pill">Small inventory (easy to browse)</div>
                <div className="pill">Detailed vehicle pages</div>
                <div className="pill">Affirm-ready checkout flow</div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="card-dark p-4 h-100">
              <div className="h2-section" style={{ marginBottom: 10 }}>
                {i18n.lang === "es" ? "Cómo funciona" : "How it works"}
              </div>

              <div className="row g-2 mt-1">
                <div className="col-12">
                  <div
                    className="card-dark p-3"
                    style={{ background: "rgba(255,255,255,.02)" }}
                  >
                    <div style={{ fontWeight: 900 }}>1) Browse</div>
                    <div className="text-muted" style={{ fontSize: 14 }}>
                      {i18n.lang === "es"
                        ? "Elegí un vehículo y mirá detalles."
                        : "Pick a vehicle and review details."}
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div
                    className="card-dark p-3"
                    style={{ background: "rgba(255,255,255,.02)" }}
                  >
                    <div style={{ fontWeight: 900 }}>2) Checkout</div>
                    <div className="text-muted" style={{ fontSize: 14 }}>
                      {i18n.lang === "es"
                        ? "Iniciás el checkout con Affirm."
                        : "Start checkout with Affirm."}
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div
                    className="card-dark p-3"
                    style={{ background: "rgba(255,255,255,.02)" }}
                  >
                    <div style={{ fontWeight: 900 }}>3) Approval</div>
                    <div className="text-muted" style={{ fontSize: 14 }}>
                      {i18n.lang === "es"
                        ? "Affirm aprueba (si aplica) y confirmás."
                        : "Affirm approves (if eligible) and you confirm."}
                    </div>
                  </div>
                </div>
              </div>

              <hr className="hr-soft my-3" />
              <div className="text-muted" style={{ fontSize: 13 }}>
                {i18n.lang === "es"
                  ? "Sujeto a aprobación. Los términos varían."
                  : "Subject to approval. Terms vary."}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AFFIRM INFO */}
      <section className="section-gap">
        <div className="card-dark p-4 p-md-5">
          <div className="row g-3 align-items-center">
            <div className="col-12 col-lg-8">
              <div className="h2-section" style={{ marginBottom: 8 }}>
                {i18n.lang === "es"
                  ? "Financiación con Affirm"
                  : "Affirm financing"}
              </div>
              <div className="text-muted" style={{ fontSize: 15 }}>
                {i18n.lang === "es"
                  ? "Pagá a tu ritmo. Elegís un plan al momento del checkout."
                  : "Pay over time. Choose your plan at checkout."}
              </div>

              <div className="d-flex flex-wrap gap-2 mt-3">
                <div className="pill">Transparent terms</div>
                <div className="pill">Fast application</div>
                <div className="pill">No surprises</div>
              </div>

              <div className="mt-3 text-muted" style={{ fontSize: 13 }}>
                {i18n.lang === "es"
                  ? "Affirm está sujeto a aprobación y elegibilidad. Las tasas y términos pueden variar."
                  : "Affirm is subject to approval and eligibility. Rates and terms may vary."}
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div
                className="card-dark p-3"
                style={{ background: "rgba(255,255,255,.02)" }}
              >
                <div style={{ fontWeight: 900, marginBottom: 8 }}>
                  {i18n.lang === "es" ? "Consejo" : "Tip"}
                </div>
                <div className="text-muted" style={{ fontSize: 14 }}>
                  {i18n.lang === "es"
                    ? "Para vehículos, lo más común es financiar el total, pero depende del merchant y el flujo aprobado."
                    : "For vehicles, it’s common to finance the total, but merchant approval and flow matter."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RECENTLY ADDED */}
      <section className="section-gap">
        <div className="d-flex align-items-end justify-content-between mb-3">
          <h2 className="h2-section m-0">
            {i18n.lang === "es" ? "Recientes" : "Recently added"}
          </h2>
          <Link to="/inventory" className="pill">
            Browse all
          </Link>
        </div>
        <VehicleGrid vehicles={recent} />
      </section>

      {/* FAQ */}
      <section className="section-gap mb-2">
        <div className="card-dark p-4">
          <h2 className="h2-section" style={{ marginBottom: 12 }}>
            {i18n.lang === "es" ? "Preguntas frecuentes" : "FAQ"}
          </h2>

          <div className="accordion" id="faq">
            <div
              className="accordion-item"
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,.10)",
                borderRadius: 14
              }}
            >
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed input-dark"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#q1"
                >
                  {i18n.lang === "es"
                    ? "¿Affirm aprueba a todos?"
                    : "Does Affirm approve everyone?"}
                </button>
              </h2>
              <div
                id="q1"
                className="accordion-collapse collapse"
                data-bs-parent="#faq"
              >
                <div className="accordion-body text-muted">
                  {i18n.lang === "es"
                    ? "No. La aprobación depende de elegibilidad, verificación y condiciones del usuario."
                    : "No. Approval depends on eligibility, verification, and user terms."}
                </div>
              </div>
            </div>

            <div
              className="accordion-item mt-2"
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,.10)",
                borderRadius: 14
              }}
            >
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed input-dark"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#q2"
                >
                  {i18n.lang === "es"
                    ? "¿Puedo ver el vehículo antes?"
                    : "Can I see the vehicle before buying?"}
                </button>
              </h2>
              <div
                id="q2"
                className="accordion-collapse collapse"
                data-bs-parent="#faq"
              >
                <div className="accordion-body text-muted">
                  {i18n.lang === "es"
                    ? "Sí. Cada listing incluye ubicación e info básica. Cuando el cliente te pase datos reales, agregamos visita/test drive."
                    : "Yes. Each listing includes basic info. Once you have real client info, we’ll add viewing/test drive details."}
                </div>
              </div>
            </div>

            <div
              className="accordion-item mt-2"
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,.10)",
                borderRadius: 14
              }}
            >
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed input-dark"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#q3"
                >
                  {i18n.lang === "es"
                    ? "¿Cómo agrego más vehículos?"
                    : "How do I add more vehicles?"}
                </button>
              </h2>
              <div
                id="q3"
                className="accordion-collapse collapse"
                data-bs-parent="#faq"
              >
                <div className="accordion-body text-muted">
                  {i18n.lang === "es"
                    ? "Editás el JSON del inventario desde VSCode. Más adelante podemos pasar a una DB si crece."
                    : "Edit the inventory JSON from VSCode. Later we can migrate to a database if it grows."}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 text-muted" style={{ fontSize: 13 }}>
            {i18n.lang === "es"
              ? "Esto es base. Después lo ajustamos a políticas reales del cliente."
              : "This is a base. Later we align it with the client’s real policies."}
          </div>
        </div>
      </section>
    </div>
  );
}
