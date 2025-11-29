"use client";

import { useState, useEffect } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import StepCard from "./StepCard";
import { motion, useAnimation } from "framer-motion";

export default function Lane({
  lane,
  index,
  steps,
  onRename,
  onDelete,
  onAddStep,
  onHideRequest,
  onHideComplete,
  isHiding,
  isRestored,
  onStepClick,
  onDeleteStep, // 🔹 NEW
}) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(lane.name);

  const controls = useAnimation();

  useEffect(() => {
    controls.set({
      scale: 1,
      x: 0,
      y: 0,
      opacity: 1,
      rotate: 0,
    });
  }, []);

  useEffect(() => {
    if (!isHiding) return;

    controls
      .start({
        scale: 0.2,
        x: -90,
        y: 90,
        rotate: -6,
        opacity: 0,
        transition: {
          type: "spring",
          stiffness: 260,
          damping: 22,
          mass: 0.45,
        },
      })
      .then(() => {
        onHideComplete(lane.id);
      });
  }, [isHiding, controls, lane.id, onHideComplete]);

  useEffect(() => {
    if (!isRestored) return;

    controls.set({
      scale: 0.3,
      x: -60,
      y: 60,
      opacity: 0,
      rotate: 4,
    });

    const run = async () => {
      await controls.start({
        scale: 1.05,
        opacity: 0.7,
        x: -15,
        y: -10,
        rotate: -2,
        transition: {
          duration: 0.25,
          ease: "easeOut",
        },
      });

      controls.start({
        scale: 1,
        opacity: 1,
        x: 0,
        y: 0,
        rotate: 0,
        transition: {
          type: "spring",
          stiffness: 260,
          damping: 20,
        },
      });
    };

    run();
  }, [isRestored, controls]);

  const saveName = () => {
    setEditing(false);
    onRename(lane.id, name);
  };

  return (
    <Draggable draggableId={lane.id} index={index}>
      {(provided) => (
        <motion.div
          {...provided.draggableProps}
          ref={provided.innerRef}
          animate={controls}
          initial={false}
          style={{
            ...provided.draggableProps.style,
            width: "300px",
            minWidth: "300px",
            background: "white",
            borderRadius: "10px",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
            padding: "15px",
            display: "flex",
            flexDirection: "column",
            maxHeight: "85vh",

            // 🔥 FIX: remove scroll from outer div
            overflow: "hidden",
          }}
        >
          {/* === FIXED HEADER === */}
          <div
            {...provided.dragHandleProps}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: "10px",
              borderBottom: "1px solid #eee",
            }}
          >
            {editing ? (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={saveName}
                autoFocus
                style={{
                  width: "70%",
                  fontSize: "18px",
                  padding: "4px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                }}
              />
            ) : (
              <div
                style={{ fontSize: "18px", fontWeight: 600, cursor: "pointer" }}
                onClick={() => setEditing(true)}
              >
                {lane.name}
              </div>
            )}

            <div style={{ display: "flex", gap: "6px" }}>
              <button
                style={{
                  padding: "4px 8px",
                  background: "#FFE9E9",
                  border: "1px solid #ffbaba",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
                onClick={() => onHideRequest(lane.id)}
              >
                Hide
              </button>

              <button
                style={{
                  background: "transparent",
                  fontSize: "18px",
                  cursor: "pointer",
                  border: "none",
                }}
                onClick={() => onDelete(lane.id)}
              >
                ✕
              </button>
            </div>
          </div>

          {/* === SCROLLABLE STEPS LIST === */}
          <Droppable droppableId={lane.id} type="STEP">
            {(providedDrop) => (
              <div
                ref={providedDrop.innerRef}
                {...providedDrop.droppableProps}
                style={{
                  flex: 1,
                  overflowY: "auto",
                  paddingRight: "4px",
                  marginTop: "10px",
                }}
              >
                {steps.map((step, i) => (
                  <Draggable key={step.id} draggableId={step.id} index={i}>
                    {(stepProvided) => (
                      <div
                        ref={stepProvided.innerRef}
                        {...stepProvided.draggableProps}
                        {...stepProvided.dragHandleProps}
                      >
                        <StepCard
                          step={step}
                          onClick={() => onStepClick(lane.id, step.id)}
                          onDeleteStep={() => onDeleteStep(lane.id, step.id)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {providedDrop.placeholder}
              </div>
            )}
          </Droppable>

          {/* === FIXED ADD STEP BUTTON === */}
          <button
            onClick={() => onAddStep(lane.id)}
            style={{
              marginTop: "10px",
              padding: "10px",
              background: "#eef2ff",
              border: "1px solid #c7d2fe",
              borderRadius: "8px",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            + Add Step
          </button>
        </motion.div>
      )}
    </Draggable>
  );
}
