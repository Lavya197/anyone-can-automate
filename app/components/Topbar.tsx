"use client";

import { useState } from "react";

interface TopbarProps {
  onOpenBug: () => void;
  onOpenEnhancement: () => void;
  onOpenContact: () => void;
}

export default function Topbar({
  onOpenBug,
  onOpenEnhancement,
  onOpenContact,
}: TopbarProps) {
  const [editing, setEditing] = useState(false);
  const [projectName, setProjectName] = useState("Demo Automation");
  const [menuOpen, setMenuOpen] = useState(false);

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
        position: "relative",
        zIndex: 10,
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

      {/* ===== Right: Undo / Redo / Autosaved ===== */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button className="top-btn">Undo</button>
        <button className="top-btn">Redo</button>
        <span style={{ color: "#777" }}>Autosaved</span>

        {/* ===== More Menu Button ===== */}
        <div style={{ position: "relative" }}>
          <button
            className="top-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ padding: "6px 10px" }}
          >
            ⋮ More
          </button>

          {menuOpen && (
            <div
              style={{
                position: "absolute",
                top: "40px",
                right: 0,
                background: "white",
                border: "1px solid #ddd",
                borderRadius: "8px",
                width: "220px",
                padding: "8px 0",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                zIndex: 20,
              }}
            >
              <div
                onClick={() => {
                  setMenuOpen(false);
                  onOpenBug();
                }}
                style={{
                  padding: "10px 16px",
                  cursor: "pointer",
                }}
                className="menu-item"
              >
                🐞 Report Bug
              </div>

              <div
                onClick={() => {
                  setMenuOpen(false);
                  onOpenEnhancement();
                }}
                style={{
                  padding: "10px 16px",
                  cursor: "pointer",
                }}
                className="menu-item"
              >
                Enhancement Suggestion
              </div>

              <div
                onClick={() => {
                  setMenuOpen(false);
                  onOpenContact();
                }}
                style={{
                  padding: "10px 16px",
                  cursor: "pointer",
                }}
                className="menu-item"
              >
                Contact Us
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
