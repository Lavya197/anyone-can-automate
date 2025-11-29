"use client";

import { FieldDef } from "../utils/actionSchemas";
import { useState } from "react";

export default function FieldBuilder({
  fields,
  values,
  variables,
  elements,
  onChange,
}: {
  fields: FieldDef[];
  values: Record<string, any>;
  variables: { id: number; name: string; value: string }[];
  elements: { id: number; name: string; locatorType: string; locatorValue: string }[];
  onChange: (id: string, value: any) => void;
}) {
  const [showVarPicker, setShowVarPicker] = useState<string | null>(null);
const [showElementPicker, setShowElementPicker] = useState<string | null>(null);


  const isLocatorField = (field: FieldDef) =>
    field.id === "locatorType" || field.id === "locatorValue";

  const renderField = (field: FieldDef) => {
    const value = values[field.id] ?? "";

    const baseStyle: React.CSSProperties = {
      width: "100%",
      padding: "8px 10px",
      borderRadius: "6px",
      border: "1px solid #ddd",
      fontSize: "14px",
      marginTop: "4px",
    };

    const variableButton = (
      <button
        onClick={() => setShowVarPicker(field.id)}
        style={{
          marginLeft: "6px",
          padding: "4px 7px",
          fontSize: "12px",
          background: "#eef1ff",
          border: "1px solid #ccd3ff",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {`{var}`}
      </button>
    );

    const elementButton =
      isLocatorField(field) ? (
        <button
          onClick={() => setShowElementPicker(field.id)}
          style={{
            marginLeft: "6px",
            padding: "4px 7px",
            fontSize: "12px",
            background: "#e0f4ff",
            border: "1px solid #b8e5ff",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Element
        </button>
      ) : null;

    return (
      <div key={field.id} style={{ marginBottom: "18px" }}>
        {/* Label */}
        <label style={{ fontSize: "13px", fontWeight: 600 }}>
          {field.label}
          {field.required && <span style={{ color: "red" }}> *</span>}
        </label>

        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Inputs */}
          {field.type === "text" && (
            <input
              type="text"
              style={baseStyle}
              placeholder={field.placeholder}
              value={value}
              onChange={(e) => onChange(field.id, e.target.value)}
            />
          )}

          {field.type === "textarea" && (
            <textarea
              style={{ ...baseStyle, minHeight: "70px", resize: "vertical" }}
              placeholder={field.placeholder}
              value={value}
              onChange={(e) => onChange(field.id, e.target.value)}
            />
          )}

          {field.type === "number" && (
            <input
              type="number"
              style={baseStyle}
              placeholder={field.placeholder}
              value={value}
              onChange={(e) => onChange(field.id, Number(e.target.value))}
            />
          )}

          {field.type === "select" && (
            <select
              style={baseStyle}
              value={value}
              onChange={(e) => onChange(field.id, e.target.value)}
            >
              <option value="">-- Select --</option>
              {(field.options || []).map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          )}

          {field.type === "checkbox" && (
            <input
              type="checkbox"
              style={{ marginLeft: "8px" }}
              checked={!!value}
              onChange={(e) => onChange(field.id, e.target.checked)}
            />
          )}

          {/* Buttons */}
          {variableButton}
          {elementButton}
        </div>

        {/* Variable Picker Menu */}
        {showVarPicker === field.id && (
          <div
            style={{
              marginTop: "6px",
              border: "1px solid #ddd",
              background: "white",
              padding: "8px",
              borderRadius: "6px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              position: "relative",
              zIndex: 10,
            }}
          >
            <div style={{ fontSize: "12px", marginBottom: "4px" }}>
              Insert Variable:
            </div>

            {variables.length === 0 ? (
              <div style={{ fontSize: "12px", color: "#777" }}>
                No variables yet.
              </div>
            ) : (
              variables.map((v) => (
                <div
                  key={v.id}
                  style={{
                    padding: "6px",
                    cursor: "pointer",
                    borderRadius: "4px",
                  }}
                  onClick={() => {
                    onChange(field.id, `${value}{{${v.name}}}`);
                    setShowVarPicker(null);
                  }}
                >
                  {v.name}
                </div>
              ))
            )}

            <div
              onClick={() => setShowVarPicker(null)}
              style={{
                marginTop: "6px",
                fontSize: "12px",
                cursor: "pointer",
                color: "#555",
              }}
            >
              Close
            </div>
          </div>
        )}

        {/* Element Picker Menu */}
        {showElementPicker === field.id && (
          <div
            style={{
              marginTop: "6px",
              border: "1px solid #ddd",
              background: "white",
              padding: "8px",
              borderRadius: "6px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              position: "relative",
              zIndex: 10,
            }}
          >
            <div style={{ fontSize: "12px", marginBottom: "4px" }}>
              Insert Element:
            </div>

            {elements.length === 0 ? (
              <div style={{ fontSize: "12px", color: "#777" }}>
                No elements saved yet.
              </div>
            ) : (
              elements.map((e) => (
                <div
                  key={e.id}
                  style={{
                    padding: "6px",
                    cursor: "pointer",
                    borderRadius: "4px",
                  }}
                  onClick={() => {
                    onChange("locatorType", e.locatorType);
                    onChange("locatorValue", e.locatorValue);
                    setShowElementPicker(null);
                  }}
                >
                  {e.name}
                </div>
              ))
            )}

            <div
              onClick={() => setShowElementPicker(null)}
              style={{
                marginTop: "6px",
                fontSize: "12px",
                cursor: "pointer",
                color: "#555",
              }}
            >
              Close
            </div>
          </div>
        )}

        {/* Helper text */}
        {field.helperText && (
          <div style={{ fontSize: "11px", color: "#777", marginTop: "3px" }}>
            {field.helperText}
          </div>
        )}
      </div>
    );
  };

  return <>{fields.map(renderField)}</>;
}
