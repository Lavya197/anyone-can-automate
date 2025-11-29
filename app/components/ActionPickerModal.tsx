"use client";

import { useMemo, useState } from "react";
import { ACTION_CATALOG, ActionDef } from "../utils/actionCatalog";

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (action: ActionDef) => void;
};

export default function ActionPickerModal({ open, onClose, onSelect }: Props) {
  const categories = useMemo(
    () => Array.from(new Set(ACTION_CATALOG.map((a) => a.category))),
    []
  );

  const [activeCategory, setActiveCategory] = useState<string>(
    categories[0] ?? "Navigation"
  );
  const [query, setQuery] = useState("");

  if (!open) return null;

  const filtered = ACTION_CATALOG.filter((a) => {
    if (a.category !== activeCategory) return false;
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      a.name.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.group.toLowerCase().includes(q)
    );
  });

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: "18px", fontWeight: 600 }}>
              Add Step – Action Catalog
            </div>
            <div style={{ fontSize: "13px", color: "#666" }}>
              Choose an action. You’ll configure details in the next panel.
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "transparent",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>

        {/* Category tabs */}
        <div className="category-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={
                "category-pill" +
                (cat === activeCategory ? " category-pill-active" : "")
              }
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Search actions (click, wait, variable, API...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "8px 10px",
              borderRadius: "6px",
              border: "1px solid #ddd",
              fontSize: "14px",
            }}
          />
        </div>

        {/* Action list */}
        <div className="action-list">
          {filtered.map((action) => (
            <div
              key={action.id}
              className="action-card"
              onClick={() => onSelect(action)}
            >
              <div style={{ fontSize: "13px", color: "#666" }}>
                {action.group}
              </div>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  marginTop: "4px",
                  marginBottom: "4px",
                }}
              >
                {action.name}
              </div>
              <div style={{ fontSize: "13px", color: "#555" }}>
                {action.description}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div style={{ fontSize: "14px", color: "#999" }}>
              No actions match this search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
