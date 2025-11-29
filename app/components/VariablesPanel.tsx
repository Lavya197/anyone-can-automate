"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function VariablesPanel({
  open,
  variables,
  onClose,
  onAdd,
  onUpdate,
  onDelete,
}) {
  const [newVar, setNewVar] = useState({ name: "", value: "" });

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
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
        initial={{ x: -400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -400, opacity: 0 }}
        transition={{ type: "spring", damping: 22, stiffness: 220 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "360px",
          height: "100vh",
          background: "#ffffff",
          boxShadow: "4px 0 20px rgba(0,0,0,0.1)",
          zIndex: 50,
          padding: "16px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>Variables</h2>

        <div style={{ flex: 1, overflowY: "auto" }}>
          {variables.map((v) => (
            <div
              key={v.id}
              style={{
                border: "1px solid #eee",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "10px",
                background: "#f9f9ff",
              }}
            >
              <strong>{v.name}</strong>
              <div style={{ fontSize: "13px", color: "#555" }}>{v.value}</div>

              <button
                onClick={() => onDelete(v.id)}
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

        <div style={{ borderTop: "1px solid #eee", paddingTop: "10px" }}>
          <input
            placeholder="Variable Name"
            value={newVar.name}
            onChange={(e) =>
              setNewVar({ ...newVar, name: e.target.value })
            }
            style={{
              width: "100%",
              marginBottom: "6px",
              padding: "6px 10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
          />
          <input
            placeholder="Value"
            value={newVar.value}
            onChange={(e) =>
              setNewVar({ ...newVar, value: e.target.value })
            }
            style={{
              width: "100%",
              marginBottom: "6px",
              padding: "6px 10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
          />

          <button
            onClick={() => {
              if (!newVar.name.trim()) return;
              onAdd(newVar);
              setNewVar({ name: "", value: "" });
            }}
            style={{
              width: "100%",
              padding: "8px",
              background: "#4f46e5",
              color: "#fff",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Add Variable
          </button>
        </div>
      </motion.div>
    </>
  );
}
