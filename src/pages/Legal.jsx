import React from "react";

export default function Legal({ i18n }) {
  return (
    <div className="container container-narrow py-4">
      <h1 style={{ fontWeight: 900 }}>{i18n.t("legal.title")}</h1>
      <div className="mt-3 card-dark p-4">
        <div className="d-flex flex-column gap-2">
          <div className="pill">{i18n.t("legal.privacy")} (placeholder)</div>
          <div className="pill">{i18n.t("legal.terms")} (placeholder)</div>
          <div className="pill">{i18n.t("legal.contact")} (placeholder)</div>
          <div className="pill">About us (placeholder)</div>
        </div>
        <hr className="hr-soft my-4" />
        <div style={{ color: "var(--muted)", fontSize: 14 }}>
          {i18n.lang === "es"
            ? "Estas páginas se completan cuando tengas la info real del cliente."
            : "These pages will be completed once you have the client’s real info."}
        </div>
      </div>
    </div>
  );
}
