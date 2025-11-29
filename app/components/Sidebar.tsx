"use client";

import TestCaseFolder from "./TestCaseFolder";

// ------------------------------------------------------
// TYPES
// ------------------------------------------------------
export interface HiddenLane {
  id: string;
  name: string;
}

export interface SidebarProps {
  onAddLane: () => void;

  hiddenLanes: HiddenLane[];

  onRestoreLane: (id: string) => void;
  onRenameHidden: (id: string, newName: string) => void;

  onOpenVariables: () => void;
  onOpenElements: () => void;
  onDownloadScript: () => void;
}

// ------------------------------------------------------
// COMPONENT
// ------------------------------------------------------

export default function Sidebar({
  onAddLane,
  hiddenLanes,
  onRestoreLane,
  onRenameHidden,
  onOpenVariables,
  onOpenElements,
  onDownloadScript,
}: SidebarProps) {
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
      {/* === LOGO === */}
      <div
        style={{
          width: "100%",
          marginBottom: "25px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src="/logo.png"
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
