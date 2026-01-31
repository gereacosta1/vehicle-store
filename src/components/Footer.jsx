import React from "react";
import { Link } from "react-router-dom";

export default function Footer({ i18n }) {
  return (
    <footer className="py-5 mt-4">
      <div className="container container-narrow">
        <div className="card-dark p-4">
          <div className="row g-4">
            <div className="col-12 col-md-6">
              <div style={{ fontWeight: 800, fontSize: 18 }}>carMania</div>
              <div style={{ color: "var(--muted)", marginTop: 6 }}>
                {i18n.lang === "es"
                  ? "Venta de vehículos con checkout rápido."
                  : "Vehicle listings with a clean, fast checkout."}
              </div>
              <hr className="hr-soft my-4" />
              <div style={{ color: "var(--muted-2)", fontSize: 13 }}>
                {i18n.lang === "es"
                  ? "Affirm está sujeto a aprobación. Los términos varían."
                  : "Affirm is subject to approval. Terms vary."}
              </div>
            </div>

            <div className="col-12 col-md-3">
              <div style={{ fontWeight: 700, marginBottom: 10 }}>{i18n.t("footer.support")}</div>
              <div style={{ color: "var(--muted)" }}>{i18n.t("footer.email")}: support@carmania.com</div>
              <div style={{ color: "var(--muted)" }}>{i18n.t("footer.phone")}: (000) 000-0000</div>
              <div style={{ color: "var(--muted)" }}>{i18n.t("footer.hours")}: Mon–Fri, 9AM–6PM</div>
            </div>

            <div className="col-12 col-md-3">
              <div style={{ fontWeight: 700, marginBottom: 10 }}>Links</div>
              <div className="d-flex flex-column gap-2">
                <Link to="/inventory" className="pill">Inventory</Link>
                <Link to="/legal" className="pill">Legal</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-4" style={{ color: "var(--muted-2)", fontSize: 12 }}>
          © {new Date().getFullYear()} carMania. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
