import React from "react";
import { Link, NavLink } from "react-router-dom";
import LanguageToggle from "./LanguageToggle";

export default function Navbar({ i18n }) {
  const linkStyle = ({ isActive }) => ({
    color: isActive ? "var(--text)" : "var(--muted)",
    background: isActive ? "rgba(255,255,255,.04)" : "rgba(255,255,255,.02)",
    borderColor: isActive ? "rgba(255,255,255,.12)" : "rgba(255,255,255,.08)"
  });

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        background: "rgba(10,12,14,.55)",
        borderBottom: "1px solid rgba(255,255,255,.06)"
      }}
      className="py-3"
    >
      <div className="container container-narrow d-flex align-items-center justify-content-between gap-3">
        <Link to="/" className="d-flex align-items-center gap-2" style={{ textDecoration: "none" }}>
          <div
            className="d-inline-flex align-items-center justify-content-center"
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              background: "rgba(184,245,70,.14)",
              border: "1px solid rgba(184,245,70,.25)"
            }}
          >
            <span style={{ fontWeight: 900, color: "var(--accent)" }}>C</span>
          </div>
          <div className="d-flex flex-column lh-1">
            <span style={{ fontWeight: 900, letterSpacing: ".2px", color: "var(--text)" }}>
              carMania
            </span>
            <small style={{ color: "var(--muted-2)" }}>Vehicles</small>
          </div>
        </Link>

        <nav className="d-none d-md-flex align-items-center gap-2">
          <NavLink to="/" className="pill" style={linkStyle}>
            {i18n.t("nav.home")}
          </NavLink>
          <NavLink to="/inventory" className="pill" style={linkStyle}>
            {i18n.t("nav.inventory")}
          </NavLink>
          <NavLink to="/legal" className="pill" style={linkStyle}>
            {i18n.t("nav.legal")}
          </NavLink>
        </nav>

        <div className="d-flex align-items-center gap-2">
          <LanguageToggle lang={i18n.lang} onChange={i18n.setLang} />
        </div>
      </div>
    </header>
  );
}
