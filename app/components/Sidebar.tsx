"use client";

import TestCaseFolder from "./TestCaseFolder";

export default function Sidebar({
  onAddLane,
  hiddenLanes,
  onRestoreLane,
  onRenameHidden,
  onOpenVariables,
  onOpenElements,
  onDownloadScript,
}) {
  return (
    <div
      style={{
        width: "250px",
        background: "rgba(255,255,255,0.6)",
        backdropFilter: "blur(10px)",
        borderRight: "1px solid #ddd",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      {/* === LOGO IMAGE === */}
      <div
        style={{
          width: "100%",
          marginBottom: "25px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src="/logo.png
" // ← PUT YOUR IMAGE URL HERE
          alt="Logo"
          style={{
            width: "180px",
            height: "auto",
            objectFit: "contain",
            borderRadius: "8px",
          }}
        />
      </div>

      <button className="side-btn" onClick={onAddLane}>
        + Add Test Case
      </button>

      <button className="side-btn" onClick={onOpenVariables}>
        Variables
      </button>

      <button className="side-btn" onClick={onOpenElements}>
        Elements
      </button>

      <button className="side-btn" onClick={onDownloadScript}>
        Download Script
      </button>

      <TestCaseFolder
        hiddenLanes={hiddenLanes}
        onRestore={onRestoreLane}
        onRenameHidden={onRenameHidden}
      />

      <div style={{ flex: 1 }} />
      <div style={{ textAlign: "center", color: "#777" }}>v1.0</div>
    </div>
  );
}
