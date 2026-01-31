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
  return (
    <div className="card-dark p-3">
      <div className="row g-2 align-items-center">
        <div className="col-12 col-md-5">
          <input
            className="form-control"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder={`${i18n.t("filters.search")}...`}
            style={{
              background: "rgba(255,255,255,.03)",
              border: "1px solid rgba(255,255,255,.10)",
              color: "var(--text)"
            }}
          />
        </div>

        <div className="col-6 col-md-3">
          <select
            className="form-select"
            value={type}
            onChange={(e) => onType(e.target.value)}
            style={{
              background: "rgba(255,255,255,.03)",
              border: "1px solid rgba(255,255,255,.10)",
              color: "var(--text)"
            }}
          >
            <option value="all">{i18n.t("filters.all")}</option>
            <option value="car">{i18n.t("filters.car")}</option>
            <option value="motorcycle">{i18n.t("filters.motorcycle")}</option>
          </select>
        </div>

        <div className="col-6 col-md-4">
          <select
            className="form-select"
            value={sort}
            onChange={(e) => onSort(e.target.value)}
            style={{
              background: "rgba(255,255,255,.03)",
              border: "1px solid rgba(255,255,255,.10)",
              color: "var(--text)"
            }}
          >
            <option value="priceLow">{i18n.t("filters.priceLow")}</option>
            <option value="priceHigh">{i18n.t("filters.priceHigh")}</option>
            <option value="yearNew">{i18n.t("filters.yearNew")}</option>
            <option value="yearOld">{i18n.t("filters.yearOld")}</option>
          </select>
        </div>
      </div>
    </div>
  );
}
