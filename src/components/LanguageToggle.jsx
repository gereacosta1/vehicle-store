import React from "react";

export default function LanguageToggle({ lang, onChange }) {
  return (
    <div className="d-flex align-items-center gap-2">
      <button
        type="button"
        className={`btn btn-sm ${lang === "en" ? "btn-accent" : "btn-ghost"}`}
        onClick={() => onChange("en")}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        type="button"
        className={`btn btn-sm ${lang === "es" ? "btn-accent" : "btn-ghost"}`}
        onClick={() => onChange("es")}
        aria-label="Cambiar a Español"
      >
        ES
      </button>
    </div>
  );
}
