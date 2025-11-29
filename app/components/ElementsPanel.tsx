"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ElementsPanel({
  open,
  elements,
  onClose,
  onAdd,
  onDelete,
}) {
  const [entry, setEntry] = useState({
    name: "",
    locatorType: "css",
    locatorValue: "",
  });

  if (!open) return null;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.2)",
          zIndex: 40,
        }}
      />

      <motion.div
        initial={{ x: -400 }}
        animate={{ x: 0 }}
        exit={{ x: -400 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "360px",
          height: "100vh",
          background: "#fff",
          boxShadow: "4px 0 20px rgba(0,0,0,0.1)",
          zIndex: 50,
          padding: "16px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>Elements Repository</h2>

        <div style={{ flex: 1, overflowY: "auto" }}>
          {elements.map((e) => (
            <div
              key={e.id}
              style={{
                border: "1px solid #eee",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "10px",
                background: "#f0f7ff",
              }}
            >
              <strong>{e.name}</strong>
              <div style={{ fontSize: "13px", color: "#555" }}>
                {e.locatorType}: {e.locatorValue}
              </div>

              <button
                onClick={() => onDelete(e.id)}
                style={{
                  marginTop: "6px",
                  border: "none",
                  padding: "5px 8px",
                  background: "#ffe0e0",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid #eee", paddingTop: "12px" }}>
          <input
            placeholder="Element Name"
            value={entry.name}
            onChange={(e) =>
              setEntry({ ...entry, name: e.target.value })
            }
            style={{
              width: "100%",
              marginBottom: "6px",
              padding: "6px 10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
          />

          <select
            value={entry.locatorType}
            onChange={(e) =>
              setEntry({ ...entry, locatorType: e.target.value })
            }
            style={{
              width: "100%",
              marginBottom: "6px",
              padding: "6px 10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
          >
            <option value="css">CSS Selector</option>
            <option value="xpath">XPath</option>
            <option value="id">ID</option>
            <option value="name">Name</option>
            <option value="text">Text</option>
          </select>

          <input
            placeholder="Locator Value"
            value={entry.locatorValue}
            onChange={(e) =>
              setEntry({ ...entry, locatorValue: e.target.value })
            }
            style={{
              width: "100%",
              marginBottom: "10px",
              padding: "6px 10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
          />

          <button
            onClick={() => {
              if (!entry.name || !entry.locatorValue) return;
              onAdd(entry);
              setEntry({
                name: "",
                locatorType: "css",
                locatorValue: "",
              });
            }}
            style={{
              width: "100%",
              padding: "8px",
              background: "#2563eb",
              color: "#fff",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Add Element
          </button>
        </div>
      </motion.div>
    </>
  );
}
