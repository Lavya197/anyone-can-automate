"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FieldBuilder from "./FieldBuilder";
import { getActionSchema } from "../utils/actionSchemas";
import { ACTION_CATALOG } from "../utils/actionCatalog";

export default function StepDetailsPanel({
  open,
  step,
  variables,
  elements,
  onClose,
  onSave,
}) {
  const [values, setValues] = useState({});

  useEffect(() => {
    if (step) setValues(step.config || {});
  }, [step]);

  if (!open || !step) return null;

  const action = ACTION_CATALOG.find((a) => a.id === step.actionKey);
  const schema = getActionSchema(step.actionKey);

  const handleChange = (id, value) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    let newSummary = step.summary;

    if (values.locatorValue) {
      newSummary = `${step.action} (${values.locatorValue})`;
    }

    if (values.url) {
      newSummary = `Navigate to ${values.url}`;
    }

    onSave(values, newSummary);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.25)",
          zIndex: 40,
        }}
      />

      <motion.div
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 400, opacity: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "360px",
          height: "100vh",
          background: "#ffffff",
          boxShadow: "-8px 0 20px rgba(0,0,0,0.1)",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "16px",
            borderBottom: "1px solid #eee",
          }}
        >
          <div style={{ fontSize: "14px", color: "#777" }}>Step Details</div>
          <div style={{ fontSize: "16px", fontWeight: 600 }}>
            {step.action}
          </div>
          {action && (
            <div style={{ fontSize: "12px", color: "#999" }}>
              {action.category} • {action.group}
            </div>
          )}
        </div>

        {/* Body */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px",
          }}
        >
          <FieldBuilder
            fields={schema.fields}
            values={values}
            variables={variables}
            elements={elements}
            onChange={handleChange}
          />
        </div>

        {/* Footer */}
        <div
          style={{
            borderTop: "1px solid #eee",
            padding: "12px",
            display: "flex",
            justifyContent: "space-between",
            background: "#fafafa",
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "6px 14px",
              borderRadius: "6px",
              background: "#f3f4f6",
              border: "1px solid #ccc",
            }}
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            style={{
              padding: "7px 16px",
              borderRadius: "6px",
              background: "#4f46e5",
              color: "white",
              border: "none",
              fontWeight: 600,
            }}
          >
            Save Step
          </button>
        </div>
      </motion.div>
    </>
  );
}
