import React, { useMemo, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { getLang, setLang, t } from "./i18n/i18n";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import VehicleDetails from "./pages/VehicleDetails";
import Legal from "./pages/Legal";

export default function App() {
  const [lang, _setLang] = useState(getLang());

  const i18n = useMemo(() => ({
    lang,
    setLang: (next) => _setLang(setLang(next)),
    t: (key) => t(key, lang)
  }), [lang]);

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar i18n={i18n} />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home i18n={i18n} />} />
          <Route path="/inventory" element={<Inventory i18n={i18n} />} />
          <Route path="/vehicle/:id" element={<VehicleDetails i18n={i18n} />} />
          <Route path="/legal" element={<Legal i18n={i18n} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer i18n={i18n} />
    </div>
  );
}
