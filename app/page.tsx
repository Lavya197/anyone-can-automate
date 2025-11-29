"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Lane from "./components/Lane";
import ActionPickerModal from "./components/ActionPickerModal";
import StepDetailsPanel from "./components/StepDetailsPanel";
import VariablesPanel from "./components/VariablesPanel";
import ElementsPanel from "./components/ElementsPanel";
import ScriptDownloadModal from "./components/ScriptDownloadModal";

import { generatePythonScript } from "./utils/scriptGenerator";

import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import type { ActionDef } from "./utils/actionCatalog";

export default function Home() {
  const [lanes, setLanes] = useState([]);
  const [steps, setSteps] = useState({});
  const [hiddenLanes, setHiddenLanes] = useState([]);

  const [pickerOpen, setPickerOpen] = useState(false);
  const [activeLaneForPicker, setActiveLaneForPicker] = useState(null);

  const [selectedStepRef, setSelectedStepRef] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const [variables, setVariables] = useState([]);
  const [elements, setElements] = useState([]);

  const [variablesOpen, setVariablesOpen] = useState(false);
  const [elementsOpen, setElementsOpen] = useState(false);

  // 🔹 Phase 7: Script download modal
  const [scriptModalOpen, setScriptModalOpen] = useState(false);

  // -----------------------------------------------
  // Lane actions
  // -----------------------------------------------
  const addLane = () => {
    const getNumber = (name: string) => {
      const match = name.match(/Test Case (\d+)/);
      return match ? parseInt(match[1]) : 0;
    };

    const allNames = [
      ...lanes.map((l: any) => l.name),
      ...hiddenLanes.map((l: any) => l.name),
    ];

    const maxNum = allNames
      .map(getNumber)
      .reduce((a, b) => Math.max(a, b), 0);

    const nextNumber = maxNum + 1;
    const id = "lane-" + Date.now();

    setLanes([
      ...lanes,
      { id, name: `Test Case ${nextNumber}`, isHiding: false },
    ]);

    setSteps({
      ...steps,
      [id]: [],
    });
  };

  const renameLane = (id: string, newName: string) => {
    setLanes(
      lanes.map((l: any) => (l.id === id ? { ...l, name: newName } : l))
    );
  };

  const renameHiddenLane = (id: string, newName: string) => {
    setHiddenLanes(
      hiddenLanes.map((l: any) =>
        l.id === id ? { ...l, name: newName } : l
      )
    );
  };

  const deleteLane = (id: string) => {
    setLanes(lanes.filter((l: any) => l.id !== id));
    const copy: any = { ...steps };
    delete copy[id];
    setSteps(copy);
  };

  // -----------------------------------------------
  // Hide lane → folder
  // -----------------------------------------------
  const requestHideLane = (id: string) => {
    setLanes(
      lanes.map((l: any) => (l.id === id ? { ...l, isHiding: true } : l))
    );
  };

  const completeHideLane = (id: string) => {
    const lane: any = lanes.find((l: any) => l.id === id);
    if (!lane) return;

    setHiddenLanes([...hiddenLanes, { id: lane.id, name: lane.name }]);
    setLanes(lanes.filter((l: any) => l.id !== id));
  };

  const restoreLane = (id: string) => {
    const lane: any = hiddenLanes.find((l: any) => l.id === id);
    if (!lane) return;

    setHiddenLanes(hiddenLanes.filter((l: any) => l.id !== id));

    setLanes([
      ...lanes,
      {
        id: lane.id,
        name: lane.name,
        isHiding: false,
        isRestored: true,
      },
    ]);

    setTimeout(() => {
      setLanes((current: any[]) =>
        current.map((l: any) =>
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
    const laneSteps = (steps as any)[laneId] || [];

    const newStep = {
      id: "step-" + Date.now(),
      action: action.name,
      summary: action.description,
      category: action.category,
      actionKey: action.id,
      config: {},
    };

    setSteps({
      ...(steps as any),
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
    const laneSteps = (steps as any)[selectedStepRef.laneId] || [];
    return laneSteps.find((s: any) => s.id === selectedStepRef.stepId) || null;
  })();

  const handleSaveStepConfig = (config: any, newSummary?: string) => {
    if (!selectedStepRef) return;

    const { laneId, stepId } = selectedStepRef;
    const laneSteps = (steps as any)[laneId] || [];

    const updated = laneSteps.map((s: any) =>
      s.id === stepId
        ? { ...s, config, summary: newSummary || s.summary }
        : s
    );

    setSteps({
      ...(steps as any),
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

      const sourceSteps = Array.from((steps as any)[sourceLane] || []);
      const [moved] = sourceSteps.splice(result.source.index, 1);

      if (sourceLane === destLane) {
        sourceSteps.splice(result.destination.index, 0, moved);
        setSteps({ ...(steps as any), [sourceLane]: sourceSteps });
      } else {
        const destSteps = Array.from((steps as any)[destLane] || []);
        destSteps.splice(result.destination.index, 0, moved);

        setSteps({
          ...(steps as any),
          [sourceLane]: sourceSteps,
          [destLane]: destSteps,
        });
      }
    }
  };

  // -----------------------------------------------
  // Script Download (Phase 7)
  // -----------------------------------------------
  const handleDownloadScript = () => {
    setScriptModalOpen(true);
  };

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
        lanes: lanes as any,
        steps: steps as any,
        variables: variables as any,
        elements: elements as any,
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
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Topbar />

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

                {lanes.map((lane: any, index: number) => (
                  <Lane
  key={lane.id}
  lane={lane}
  index={index}
  steps={(steps as any)[lane.id] || []}
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
    setSteps((prev: any) => {
      const updated = (prev[laneId] || []).filter(
        (s: any) => s.id !== stepId
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

      {/* Variables & Elements Panels */}
      <VariablesPanel
        open={variablesOpen}
        variables={variables}
        onClose={() => setVariablesOpen(false)}
        onAdd={(v: any) =>
          setVariables([...variables, { id: Date.now(), ...v }])
        }
        onDelete={(id: number | string) =>
          setVariables(variables.filter((x: any) => x.id !== id))
        }
      />

      <ElementsPanel
        open={elementsOpen}
        elements={elements}
        onClose={() => setElementsOpen(false)}
        onAdd={(e: any) =>
          setElements([...elements, { id: Date.now(), ...e }])
        }
        onDelete={(id: number | string) =>
          setElements(elements.filter((x: any) => x.id !== id))
        }
      />

      {/* Phase 7: Script Download Modal */}
      <ScriptDownloadModal
        open={scriptModalOpen}
        onClose={() => setScriptModalOpen(false)}
        onGenerate={handleGenerateScript}
      />
    </div>
  );
}
