"use client";

import { useState } from "react";

export default function TestCaseFolder({
  hiddenLanes,
  onRestore,
  onRenameHidden,
}) {
  const [open, setOpen] = useState(true);

  return (
    <div style={{ marginTop: "20px" }}>
      <div
        style={{
          fontWeight: 600,
          marginBottom: "8px",
          fontSize: "16px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
        onClick={() => setOpen(!open)}
      >
        📁 Test Case Folder
        <span style={{ fontSize: "12px", color: "#777" }}>
          ({hiddenLanes.length})
        </span>
      </div>

      {open && (
        <div
  style={{
    border: "1px solid #ddd",
    padding: "10px",
    borderRadius: "8px",
    background: "rgba(255,255,255,0.5)",
    maxHeight: "350px",       // ← NEW
    overflowY: "auto",        // ← NEW
  }}
>

          {hiddenLanes.length === 0 && (
            <div style={{ color: "#888", fontSize: "13px" }}>
              No hidden test cases.
            </div>
          )}

          {hiddenLanes.map((lane) => (
            <div
              key={lane.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px",
                borderRadius: "6px",
                marginBottom: "6px",
                background: "#f3f4ff",
                border: "1px solid #cdd1ff",
              }}
            >
              {/* rename in folder */}
              <input
                value={lane.name}
                onChange={(e) => onRenameHidden(lane.id, e.target.value)}
                style={{
                  width: "70%",
                  padding: "4px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  fontSize: "14px",
                }}
              />

              <button
                onClick={() => onRestore(lane.id)}
                style={{
                  padding: "5px 10px",
                  background: "#d1d9ff",
                  border: "1px solid #aab4ff",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Restore
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
