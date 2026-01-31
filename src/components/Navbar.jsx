import React from "react";
import { Link, NavLink } from "react-router-dom";
import LanguageToggle from "./LanguageToggle";

export default function Navbar({ i18n }) {
  return (
    <header className="py-3">
      <div className="container container-narrow d-flex align-items-center justify-content-between gap-3">
        <Link to="/" className="d-flex align-items-center gap-2">
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
            <span style={{ fontWeight: 800, color: "var(--accent)" }}>C</span>
          </div>
          <div className="d-flex flex-column lh-1">
            <span style={{ fontWeight: 800, letterSpacing: ".2px" }}>carMania</span>
            <small style={{ color: "var(--muted-2)" }}>Vehicles</small>
          </div>
        </Link>

        <nav className="d-none d-md-flex align-items-center gap-3">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "pill" : "pill")}
            style={({ isActive }) => ({ color: isActive ? "var(--text)" : "var(--muted)" })}
          >
            {i18n.t("nav.home")}
          </NavLink>
          <NavLink
            to="/inventory"
            className={({ isActive }) => (isActive ? "pill" : "pill")}
            style={({ isActive }) => ({ color: isActive ? "var(--text)" : "var(--muted)" })}
          >
            {i18n.t("nav.inventory")}
          </NavLink>
          <NavLink
            to="/legal"
            className={({ isActive }) => (isActive ? "pill" : "pill")}
            style={({ isActive }) => ({ color: isActive ? "var(--text)" : "var(--muted)" })}
          >
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
