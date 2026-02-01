import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const STORAGE_KEY = "cm_cart_v1";

function safeParse(json) {
  try {
    const v = JSON.parse(json);
    return v && typeof v === "object" ? v : null;
  } catch {
    return null;
  }
}

function loadInitialState() {
  if (typeof window === "undefined") return { items: [] };
  const raw = window.localStorage.getItem(STORAGE_KEY);
  const parsed = raw ? safeParse(raw) : null;
  if (!parsed || !Array.isArray(parsed.items)) return { items: [] };

  // sanitize
  const items = parsed.items
    .filter(Boolean)
    .map((it) => ({
      id: String(it.id),
      title: String(it.title || ""),
      priceUsd: Number(it.priceUsd || 0),
      image: it.image ? String(it.image) : "",
      year: it.year ? Number(it.year) : undefined,
      location: it.location ? String(it.location) : "",
      type: it.type ? String(it.type) : "",
      qty: Math.max(1, Number(it.qty || 1))
    }));

  return { items };
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const item = action.item;
      const qty = Math.max(1, Number(action.qty || 1));

      const existing = state.items.find((x) => x.id === item.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((x) =>
            x.id === item.id ? { ...x, qty: x.qty + qty } : x
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...item, qty }]
      };
    }

    case "REMOVE_ITEM": {
      const id = String(action.id);
      return { ...state, items: state.items.filter((x) => x.id !== id) };
    }

    case "SET_QTY": {
      const id = String(action.id);
      const qty = Math.max(1, Number(action.qty || 1));
      return {
        ...state,
        items: state.items.map((x) => (x.id === id ? { ...x, qty } : x))
      };
    }

    case "CLEAR":
      return { items: [] };

    default:
      return state;
  }
}

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadInitialState);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore storage errors
    }
  }, [state]);

  const value = useMemo(() => {
    const totalQty = state.items.reduce((acc, it) => acc + (it.qty || 0), 0);
    const subtotal = state.items.reduce((acc, it) => acc + (it.qty || 0) * (Number(it.priceUsd) || 0), 0);

    return {
      items: state.items,
      totalQty,
      subtotal,
      addItem: (item, qty = 1) => dispatch({ type: "ADD_ITEM", item, qty }),
      removeItem: (id) => dispatch({ type: "REMOVE_ITEM", id }),
      setQty: (id, qty) => dispatch({ type: "SET_QTY", id, qty }),
      clear: () => dispatch({ type: "CLEAR" })
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
