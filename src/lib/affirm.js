export function isAffirmReady() {
  // When the real Affirm snippet is installed, "affirm" exists on window.
  return typeof window !== "undefined" && typeof window.affirm !== "undefined";
}
