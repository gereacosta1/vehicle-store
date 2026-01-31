import { en } from "./strings.en";
import { es } from "./strings.es";

const KEY = "lang";
const supported = ["en", "es"];

export function getLang() {
  const stored = localStorage.getItem(KEY);
  if (stored && supported.includes(stored)) return stored;
  return "en";
}

export function setLang(next) {
  const safe = supported.includes(next) ? next : "en";
  localStorage.setItem(KEY, safe);
  return safe;
}

export function t(path, lang) {
  const dict = lang === "es" ? es : en;
  const parts = String(path).split(".");
  let cur = dict;
  for (const p of parts) {
    cur = cur?.[p];
    if (cur == null) return path;
  }
  return cur;
}
