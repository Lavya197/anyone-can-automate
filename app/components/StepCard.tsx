"use client";

export default function StepCard({
  step,
  onClick,
  onDeleteStep,
}: {
  step: any;
  onClick?: () => void;
  onDeleteStep?: () => void;
}) {
  return (
    <div
      style={{
        background: "#f8f9ff",
        border: "1px solid #dfe3ff",
        borderRadius: "8px",
        padding: "10px",
        marginBottom: "10px",
        boxShadow: "0px 2px 6px rgba(0,0,0,0.05)",
        cursor: "pointer",
        transition: "0.15s",
        position: "relative",
      }}
    >
      {/* Delete Icon */}
      <div
        onClick={(e) => {
          e.stopPropagation(); // prevent opening details panel
          onDeleteStep?.();
        }}
        style={{
          position: "absolute",
          top: "6px",
          right: "6px",
          fontSize: "14px",
          cursor: "pointer",
          color: "#888",
        }}
      >
        ✕
      </div>

      <div
        onClick={onClick}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div
          style={{
            fontWeight: 600,
            marginBottom: "5px",
            fontSize: "14px",
          }}
        >
          {step.action}
        </div>

        <div style={{ color: "#555", fontSize: "13px" }}>
          {step.summary}
        </div>

        {step.category && (
          <div style={{ marginTop: "4px", fontSize: "11px", color: "#777" }}>
            {step.category}
          </div>
        )}
      </div>
    </div>
  );
}
