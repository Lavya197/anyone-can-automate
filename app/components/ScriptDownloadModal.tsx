// app/components/ScriptDownloadModal.tsx
"use client";

export default function ScriptDownloadModal({
  open,
  onClose,
  onGenerate,
}: {
  open: boolean;
  onClose: () => void;
  onGenerate: (includeInstructions: boolean) => void;
}) {
  if (!open) return null;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.25)",
          zIndex: 40,
        }}
      />

      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "360px",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          zIndex: 50,
          padding: "18px 20px",
        }}
      >
        <h3 style={{ marginBottom: "10px", fontSize: "18px", fontWeight: 600 }}>
          Download Selenium Script
        </h3>

        <p style={{ fontSize: "13px", color: "#555", marginBottom: "12px" }}>
          Choose the format for your generated script:
        </p>

        <div style={{ marginBottom: "14px", fontSize: "13px" }}>
          <label style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            <input
              type="radio"
              name="scriptType"
              defaultChecked
              onChange={() => {}}
              id="script-with-instructions"
            />
            <div>
              <div style={{ fontWeight: 600 }}>
                Script with Instructions (Recommended)
              </div>
              <div style={{ fontSize: "12px", color: "#666" }}>
                Includes prerequisites, setup steps, and test case level
                comments inside the script.
              </div>
            </div>
          </label>
        </div>

        <div style={{ marginBottom: "18px", fontSize: "13px" }}>
          <label style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            <input
              type="radio"
              name="scriptType"
              onChange={() => {}}
              id="script-standalone"
            />
            <div>
              <div style={{ fontWeight: 600 }}>Clean Standalone Script</div>
              <div style={{ fontSize: "12px", color: "#666" }}>
                Minimal comments, focused purely on executable code. Best for
                CI/CD and power users.
              </div>
            </div>
          </label>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "8px",
            marginTop: "10px",
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              border: "1px solid #ddd",
              background: "#f5f5f5",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>

          <button
            onClick={() => {
              const withInstructions = (
                document.getElementById(
                  "script-with-instructions"
                ) as HTMLInputElement
              )?.checked;

              onGenerate(!!withInstructions);
            }}
            style={{
              padding: "7px 16px",
              borderRadius: "6px",
              border: "none",
              background: "#4f46e5",
              color: "#fff",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Generate
          </button>
        </div>
      </div>
    </>
  );
}
