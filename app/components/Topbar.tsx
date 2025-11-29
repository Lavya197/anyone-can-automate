"use client";

import { useState } from "react";

export default function Topbar() {
  const [editing, setEditing] = useState(false);
  const [projectName, setProjectName] = useState("Demo Automation");

  const handleSave = () => {
    setEditing(false);
    if (!projectName.trim()) {
      setProjectName("Untitled Project");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "55px",
        background: "rgba(255,255,255,0.5)",
        backdropFilter: "blur(6px)",
        borderBottom: "1px solid #ddd",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
      }}
    >
      {/* ===== Left: Editable Project Name ===== */}
      <div style={{ fontSize: "18px", fontWeight: 600 }}>
        {editing ? (
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            autoFocus
            style={{
              fontSize: "18px",
              padding: "4px 6px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
        ) : (
          <span
            style={{ cursor: "pointer" }}
            onClick={() => setEditing(true)}
          >
            Project: {projectName}
          </span>
        )}
      </div>

      {/* ===== Right: Undo/Redo/Autosave ===== */}
      <div style={{ display: "flex", gap: "10px" }}>
        <button className="top-btn">Undo</button>
        <button className="top-btn">Redo</button>
        <span style={{ color: "#777" }}>Autosaved</span>
      </div>
    </div>
  );
}
