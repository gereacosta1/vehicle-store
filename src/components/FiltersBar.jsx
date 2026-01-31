import React from "react";

export default function FiltersBar({
  i18n,
  search,
  onSearch,
  type,
  onType,
  sort,
  onSort
}) {
  const hasAny = Boolean(search.trim()) || type !== "all" || sort !== "priceLow";

  const clear = () => {
    onSearch("");
    onType("all");
    onSort("priceLow");
  };

  return (
    <div className="card-dark p-3">
      <div className="row g-2 align-items-center">
        {/* Search */}
        <div className="col-12 col-md-5">
          <div style={{ position: "relative" }}>
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--muted-2)",
                fontSize: 14
              }}
            >
              ⌕
            </span>

            <input
              className="form-control input-dark"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder={`${i18n.t("filters.search")}...`}
              style={{ paddingLeft: 34 }}
            />
          </div>
        </div>

        {/* Type */}
        <div className="col-6 col-md-3">
          <select
            className="form-select select-dark"
            value={type}
            onChange={(e) => onType(e.target.value)}
          >
            <option value="all">{i18n.t("filters.all")}</option>
            <option value="car">{i18n.t("filters.car")}</option>
            <option value="motorcycle">{i18n.t("filters.motorcycle")}</option>
          </select>
        </div>

        {/* Sort */}
        <div className="col-6 col-md-4 d-flex gap-2">
          <select
            className="form-select select-dark"
            value={sort}
            onChange={(e) => onSort(e.target.value)}
          >
            <option value="priceLow">{i18n.t("filters.priceLow")}</option>
            <option value="priceHigh">{i18n.t("filters.priceHigh")}</option>
            <option value="yearNew">{i18n.t("filters.yearNew")}</option>
            <option value="yearOld">{i18n.t("filters.yearOld")}</option>
          </select>

          {hasAny && (
            <button type="button" className="btn btn-ghost" onClick={clear}>
              {i18n.lang === "es" ? "Limpiar" : "Clear"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
