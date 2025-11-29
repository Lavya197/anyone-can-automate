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

  // ⭐ NEW: Walkthrough button handler
  onShowWalkthrough: () => void;
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
  onShowWalkthrough,
}: SidebarProps) {
  return (
    <div
      id="sidebar-root"
      style={{
        width: "250px",
        background: "rgba(255,255,255,0.6)",
        backdropFilter: "blur(10px)",
        borderRight: "1px solid #ddd",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",

        // ⭐ crucial fix
        position: "relative",
        height: "100vh",
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
          id="logo-highlight"
          style={{
            width: "180px",
            height: "auto",
            objectFit: "contain",
            borderRadius: "8px",
          }}
        />
      </div>

      {/* === BUTTONS === */}
      <button id="btn-add-testcase" className="side-btn" onClick={onAddLane}>
        + Add Test Case
      </button>

      <button id="btn-open-variables" className="side-btn" onClick={onOpenVariables}>
        Variables
      </button>

      <button id="btn-open-elements" className="side-btn" onClick={onOpenElements}>
        Elements
      </button>

      <button id="btn-download-script" className="side-btn" onClick={onDownloadScript}>
        Download Script
      </button>

      <button
        id="btn-open-walkthrough"
        className="side-btn"
        style={{ marginTop: "10px", background: "#eef3ff" }}
        onClick={onShowWalkthrough}
      >
        Restart Walkthrough
      </button>

      {/* === TEST CASE FOLDER === */}
      <TestCaseFolder
        hiddenLanes={hiddenLanes}
        onRestore={onRestoreLane}
        onRenameHidden={onRenameHidden}
      />

      {/* ⭐ Pushes version tag to TRUE bottom */}
      <div style={{ marginTop: "auto" }} />

      {/* === VERSION BOX === */}
      <div
        style={{
          textAlign: "center",
          color: "#777",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        v1.1
      </div>
    </div>
  );
}
