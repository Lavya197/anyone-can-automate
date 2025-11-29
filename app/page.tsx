"use client";

import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Lane from "./components/Lane";
import ActionPickerModal from "./components/ActionPickerModal";
import StepDetailsPanel from "./components/StepDetailsPanel";
import VariablesPanel from "./components/VariablesPanel";
import ElementsPanel from "./components/ElementsPanel";
import ScriptDownloadModal from "./components/ScriptDownloadModal";

import BugReportModal from "./components/forms/BugReportModal";
import EnhancementModal from "./components/forms/EnhancementModal";
import ContactModal from "./components/forms/ContactModal";

import { generatePythonScript } from "./utils/scriptGenerator";

import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import type { ActionDef } from "./utils/actionCatalog";

// -------------------- TYPES --------------------
export interface LaneType {
  id: string;
  name: string;
  isHiding?: boolean;
  isRestored?: boolean;
}

export interface StepType {
  id: string;
  action: string;
  summary: string;
  category?: string;
  actionKey?: string;
  config?: Record<string, any>;
}

export interface VariablesType {
  id: number;
  name: string;
  value: string;
}

export interface ElementType {
  id: number;
  name: string;
  locatorType: string;
  locatorValue: string;
}
// ------------------------------------------------

export default function Home() {
  const [walkthroughOpen, setWalkthroughOpen] = useState(false);

  const [lanes, setLanes] = useState<LaneType[]>([]);
  const [steps, setSteps] = useState<Record<string, StepType[]>>({});
  const [hiddenLanes, setHiddenLanes] = useState<LaneType[]>([]);

  const [pickerOpen, setPickerOpen] = useState(false);
  const [activeLaneForPicker, setActiveLaneForPicker] = useState<string | null>(
    null
  );

  const [selectedStepRef, setSelectedStepRef] = useState<{
    laneId: string;
    stepId: string;
  } | null>(null);

  const [detailsOpen, setDetailsOpen] = useState(false);

  const [variables, setVariables] = useState<VariablesType[]>([]);
  const [elements, setElements] = useState<ElementType[]>([]);

  const [variablesOpen, setVariablesOpen] = useState(false);
  const [elementsOpen, setElementsOpen] = useState(false);

  const [scriptModalOpen, setScriptModalOpen] = useState(false);

  // === Newly Added States for Forms ===
  const [bugModal, setBugModal] = useState(false);
  const [enhModal, setEnhModal] = useState(false);
  const [contactModal, setContactModal] = useState(false);

  // ---------------------------
  // Walkthrough
  // ---------------------------
  useEffect(() => {
    const hide = localStorage.getItem("hideWalkthrough");
    if (!hide) {
      setWalkthroughOpen(true);
    }
  }, []);

  // -----------------------------------------------
  // Lane actions
  // -----------------------------------------------
  const addLane = () => {
    const getNumber = (name: string) => {
      const match = name.match(/Test Case (\d+)/);
      return match ? parseInt(match[1]) : 0;
    };

    const allNames = [
      ...lanes.map((l) => l.name),
      ...hiddenLanes.map((l) => l.name),
    ];

    const maxNum = allNames
      .map((n) => getNumber(n))
      .reduce((a, b) => Math.max(a, b), 0);

    const nextNumber = maxNum + 1;
    const id = "lane-" + Date.now();

    const newLane: LaneType = {
      id,
      name: `Test Case ${nextNumber}`,
      isHiding: false,
    };

    setLanes([...lanes, newLane]);

    setSteps({
      ...steps,
      [id]: [],
    });
  };

  const renameLane = (id: string, newName: string) => {
    setLanes(lanes.map((l) => (l.id === id ? { ...l, name: newName } : l)));
  };

  const renameHiddenLane = (id: string, newName: string) => {
    setHiddenLanes(
      hiddenLanes.map((l) => (l.id === id ? { ...l, name: newName } : l))
    );
  };

  const deleteLane = (id: string) => {
    setLanes(lanes.filter((l) => l.id !== id));
    const copy = { ...steps };
    delete copy[id];
    setSteps(copy);
  };

  // -----------------------------------------------
  // Hide lane → folder
  // -----------------------------------------------
  const requestHideLane = (id: string) => {
    setLanes(lanes.map((l) => (l.id === id ? { ...l, isHiding: true } : l)));
  };

  const completeHideLane = (id: string) => {
    const lane = lanes.find((l) => l.id === id);
    if (!lane) return;

    setHiddenLanes([...hiddenLanes, { id: lane.id, name: lane.name }]);
    setLanes(lanes.filter((l) => l.id !== id));
  };

  const restoreLane = (id: string) => {
    const lane = hiddenLanes.find((l) => l.id === id);
    if (!lane) return;

    setHiddenLanes(hiddenLanes.filter((l) => l.id !== id));

    const restored: LaneType = {
      id: lane.id,
      name: lane.name,
      isHiding: false,
      isRestored: true,
    };

    setLanes([...lanes, restored]);

    setTimeout(() => {
      setLanes((current) =>
        current.map((l) =>
          l.id === lane.id ? { ...l, isRestored: false } : l
        )
      );
    }, 700);
  };

  // -----------------------------------------------
  // Steps — add from action picker
  // -----------------------------------------------
  const addStep = (laneId: string) => {
    setActiveLaneForPicker(laneId);
    setPickerOpen(true);
  };

  const handleActionSelect = (action: ActionDef) => {
    if (!activeLaneForPicker) return;

    const laneId = activeLaneForPicker;
    const laneSteps = steps[laneId] || [];

    const newStep: StepType = {
      id: "step-" + Date.now(),
      action: action.name,
      summary: action.description,
      category: action.category,
      actionKey: action.id,
      config: {},
    };

    setSteps({
      ...steps,
      [laneId]: [...laneSteps, newStep],
    });

    setPickerOpen(false);
    setActiveLaneForPicker(null);
  };

  const closePicker = () => {
    setPickerOpen(false);
    setActiveLaneForPicker(null);
  };

  // -----------------------------------------------
  // Step Details Panel
  // -----------------------------------------------
  const selectedStep = (() => {
    if (!selectedStepRef) return null;
    const laneSteps = steps[selectedStepRef.laneId] || [];
    return laneSteps.find((s) => s.id === selectedStepRef.stepId) || null;
  })();

  const handleSaveStepConfig = (
    config: Record<string, any>,
    newSummary?: string
  ) => {
    if (!selectedStepRef) return;

    const { laneId, stepId } = selectedStepRef;
    const laneSteps = steps[laneId] || [];

    const updated = laneSteps.map((s) =>
      s.id === stepId ? { ...s, config, summary: newSummary || s.summary } : s
    );

    setSteps({
      ...steps,
      [laneId]: updated,
    });

    setDetailsOpen(false);
  };

  // -----------------------------------------------
  // Drag & drop
  // -----------------------------------------------
  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    if (result.type === "LANE") {
      const arranged = Array.from(lanes);
      const [removed] = arranged.splice(result.source.index, 1);
      arranged.splice(result.destination.index, 0, removed);
      setLanes(arranged);
      return;
    }

    if (result.type === "STEP") {
      const sourceLane = result.source.droppableId;
      const destLane = result.destination.droppableId;

      const sourceSteps = Array.from(steps[sourceLane] || []);
      const [moved] = sourceSteps.splice(result.source.index, 1);

      if (sourceLane === destLane) {
        sourceSteps.splice(result.destination.index, 0, moved);
        setSteps({ ...steps, [sourceLane]: sourceSteps });
      } else {
        const destSteps = Array.from(steps[destLane] || []);
        destSteps.splice(result.destination.index, 0, moved);

        setSteps({
          ...steps,
          [sourceLane]: sourceSteps,
          [destLane]: destSteps,
        });
      }
    }
  };

  // -----------------------------------------------
  // Script Download
  // -----------------------------------------------
  const handleDownloadScript = () => setScriptModalOpen(true);

  const triggerDownload = (filename: string, content: string) => {
    const blob = new Blob([content], { type: "text/x-python" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleGenerateScript = (includeInstructions: boolean) => {
    const script = generatePythonScript(
      {
        lanes,
        steps,
        variables,
        elements,
      },
      { includeInstructions }
    );

    const filename = includeInstructions
      ? "automation_script_with_instructions.py"
      : "automation_script.py";

    triggerDownload(filename, script);
    setScriptModalOpen(false);
  };

  // -----------------------------------------------
  // Render
  // -----------------------------------------------
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar
        onAddLane={addLane}
        hiddenLanes={hiddenLanes}
        onRestoreLane={restoreLane}
        onRenameHidden={renameHiddenLane}
        onOpenVariables={() => setVariablesOpen(true)}
        onOpenElements={() => setElementsOpen(true)}
        onDownloadScript={handleDownloadScript}
        onShowWalkthrough={() => setWalkthroughOpen(true)}
      />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        {/* UPDATED TOPBAR WITH CALLBACKS */}
        <Topbar
          onOpenBug={() => setBugModal(true)}
          onOpenEnhancement={() => setEnhModal(true)}
          onOpenContact={() => setContactModal(true)}
        />

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="board" direction="horizontal" type="LANE">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  flex: 1,
                  overflowX: "auto",
                  display: "flex",
                  gap: "20px",
                  padding: "20px",
                }}
              >
                {lanes.length === 0 && (
                  <div style={{ fontSize: "18px", color: "#666" }}>
                    Click “Add Test Case” to begin →
                  </div>
                )}

                {lanes.map((lane, index) => (
                  <Lane
                    key={lane.id}
                    lane={lane}
                    index={index}
                    steps={steps[lane.id] || []}
                    onRename={renameLane}
                    onDelete={deleteLane}
                    onAddStep={addStep}
                    onHideRequest={requestHideLane}
                    onHideComplete={completeHideLane}
                    isHiding={!!lane.isHiding}
                    isRestored={!!lane.isRestored}
                    onStepClick={(laneId: string, stepId: string) => {
                      setSelectedStepRef({ laneId, stepId });
                      setDetailsOpen(true);
                    }}
                    onDeleteStep={(laneId: string, stepId: string) => {
                      setSteps((prev) => {
                        const updated = (prev[laneId] || []).filter(
                          (s) => s.id !== stepId
                        );
                        return { ...prev, [laneId]: updated };
                      });
                    }}
                  />
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <ActionPickerModal
        open={pickerOpen}
        onClose={closePicker}
        onSelect={handleActionSelect}
      />

      <StepDetailsPanel
        open={detailsOpen}
        step={selectedStep}
        variables={variables}
        elements={elements}
        onClose={() => setDetailsOpen(false)}
        onSave={handleSaveStepConfig}
      />

      <VariablesPanel
        open={variablesOpen}
        variables={variables}
        onClose={() => setVariablesOpen(false)}
        onAdd={(v) => setVariables([...variables, { id: Date.now(), ...v }])}
        onDelete={(id) =>
          setVariables(variables.filter((x) => x.id !== id))
        }
      />

      <ElementsPanel
        open={elementsOpen}
        elements={elements}
        onClose={() => setElementsOpen(false)}
        onAdd={(e) =>
          setElements([
            ...elements,
            {
              id: Date.now(),
              ...e,
            } as ElementType,
          ])
        }
        onDelete={(id) =>
          setElements(elements.filter((x) => x.id !== id))
        }
      />

      <ScriptDownloadModal
        open={scriptModalOpen}
        onClose={() => setScriptModalOpen(false)}
        onGenerate={handleGenerateScript}
      />

      {/* NEW FORMS */}
      <BugReportModal open={bugModal} onClose={() => setBugModal(false)} />
      <EnhancementModal open={enhModal} onClose={() => setEnhModal(false)} />
      <ContactModal open={contactModal} onClose={() => setContactModal(false)} />
    </div>
  );
}
