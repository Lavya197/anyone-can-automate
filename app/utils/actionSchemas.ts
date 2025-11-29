// app/utils/actionSchemas.ts
import { ACTION_CATALOG, ActionDef } from "./actionCatalog";

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "select"
  | "checkbox"
  | "keyvalue";

export type FieldDef = {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  placeholder?: string;
  helperText?: string;
};

export type ActionSchema = {
  actionKey: string;
  fields: FieldDef[];
};

// Common field sets reused across actions

const LOCATOR_FIELDS: FieldDef[] = [
  {
    id: "locatorType",
    label: "Locator Type",
    type: "select",
    required: true,
    options: ["css", "xpath", "id", "name", "text"],
    helperText: "How to locate the element on the page.",
  },
  {
    id: "locatorValue",
    label: "Locator Value",
    type: "text",
    required: true,
    placeholder: "#login-button, //div[@id='x'], etc.",
  },
];

const WAIT_FIELDS: FieldDef[] = [
  {
    id: "timeoutMs",
    label: "Timeout (ms)",
    type: "number",
    placeholder: "5000",
    helperText: "How long to wait before failing.",
  },
];

const VARIABLE_FIELD: FieldDef = {
  id: "variableName",
  label: "Variable Name",
  type: "text",
  required: true,
  placeholder: "userEmail, sessionId, etc.",
};

const GENERIC_NOTES_FIELD: FieldDef = {
  id: "notes",
  label: "Notes / Intent",
  type: "textarea",
  placeholder: "Why this step exists, edge cases, etc.",
};

// Main schema function

export function getActionSchema(actionKey: string): ActionSchema {
  const action: ActionDef | undefined = ACTION_CATALOG.find(
    (a) => a.id === actionKey
  );

  if (!action) {
    // Fallback generic schema
    return {
      actionKey,
      fields: [
        {
          id: "details",
          label: "Step Details",
          type: "textarea",
          placeholder: "Additional info for this step.",
        },
      ],
    };
  }

  const { category, group, id } = action;

  // 🔵 NAVIGATION
  if (category === "Navigation") {
    if (id === "nav-navigate-url") {
      return {
        actionKey,
        fields: [
          {
            id: "url",
            label: "URL",
            type: "text",
            required: true,
            placeholder: "https://example.com",
          },
          {
            id: "waitUntil",
            label: "Wait Until",
            type: "select",
            options: ["domcontentloaded", "networkidle", "load", "none"],
            helperText: "How long Selenium should wait after navigation.",
          },
          ...WAIT_FIELDS,
        ],
      };
    }

    if (group === "Page Navigation") {
      return {
        actionKey,
        fields: [
          {
            id: "waitAfter",
            label: "Wait After Action",
            type: "select",
            options: ["none", "page-load", "network-idle"],
          },
          ...WAIT_FIELDS,
        ],
      };
    }

    if (group === "Scroll & Viewport") {
      return {
        actionKey,
        fields: [
          ...LOCATOR_FIELDS,
          {
            id: "scrollBehavior",
            label: "Scroll Behavior",
            type: "select",
            options: ["smooth", "instant"],
          },
          ...WAIT_FIELDS,
        ],
      };
    }

    if (group === "Cookies & Storage") {
      return {
        actionKey,
        fields: [
          {
            id: "key",
            label: "Key / Name",
            type: "text",
            required: true,
          },
          {
            id: "value",
            label: "Value",
            type: "text",
          },
          VARIABLE_FIELD,
        ],
      };
    }

    // Network controls
    return {
      actionKey,
      fields: [
        {
          id: "pattern",
          label: "URL Pattern / Filter",
          type: "text",
          placeholder: "*/api/*",
        },
        ...WAIT_FIELDS,
      ],
    };
  }

  // 🔵 INTERACTIONS
  if (category === "Interactions") {
    if (id === "int-type-text") {
      return {
        actionKey,
        fields: [
          ...LOCATOR_FIELDS,
          {
            id: "text",
            label: "Text to Type",
            type: "text",
            required: true,
          },
          {
            id: "pressEnter",
            label: "Press Enter after typing",
            type: "checkbox",
          },
          ...WAIT_FIELDS,
        ],
      };
    }

    if (group === "Basic Inputs" || group === "Form Controls") {
      return {
        actionKey,
        fields: [
          ...LOCATOR_FIELDS,
          {
            id: "value",
            label: "Value / Option (if applicable)",
            type: "text",
          },
          ...WAIT_FIELDS,
        ],
      };
    }

    if (group === "Drag & Drop") {
      return {
        actionKey,
        fields: [
          ...LOCATOR_FIELDS,
          {
            id: "targetLocatorType",
            label: "Target Locator Type",
            type: "select",
            options: ["css", "xpath", "id", "name", "text"],
          },
          {
            id: "targetLocatorValue",
            label: "Target Locator Value",
            type: "text",
          },
        ],
      };
    }

    if (group === "File Upload") {
      return {
        actionKey,
        fields: [
          ...LOCATOR_FIELDS,
          {
            id: "filePath",
            label: "Local File Path",
            type: "text",
            placeholder: "C:\\path\\to\\file.png",
          },
        ],
      };
    }
  }

  // 🔵 ASSERTIONS
  if (category === "Assertions") {
    if (group === "Element Assertions") {
      return {
        actionKey,
        fields: [
          ...LOCATOR_FIELDS,
          {
            id: "assertType",
            label: "Assertion Type",
            type: "select",
            options: [
              "exists",
              "visible",
              "hidden",
              "enabled",
              "disabled",
              "text-contains",
              "text-equals",
              "value-equals",
            ],
          },
          {
            id: "expected",
            label: "Expected Text/Value (if applicable)",
            type: "text",
          },
          {
            id: "caseSensitive",
            label: "Case Sensitive",
            type: "checkbox",
          },
          ...WAIT_FIELDS,
        ],
      };
    }

    if (group === "Page Assertions") {
      return {
        actionKey,
        fields: [
          {
            id: "assertTarget",
            label: "Target",
            type: "select",
            options: ["title", "url", "status-code", "console-errors"],
          },
          {
            id: "expected",
            label: "Expected Value (where applicable)",
            type: "text",
          },
          ...WAIT_FIELDS,
        ],
      };
    }
  }

  // 🔵 WAITS
  if (category === "Waits") {
    return {
      actionKey,
      fields: [
        ...LOCATOR_FIELDS,
        ...WAIT_FIELDS,
        {
          id: "pollIntervalMs",
          label: "Poll Interval (ms)",
          type: "number",
          placeholder: "250",
        },
      ],
    };
  }

  // 🔵 ELEMENTS & LOCATORS
  if (category === "Elements & Locators") {
    return {
      actionKey,
      fields: [
        {
          id: "elementName",
          label: "Element Name (repository key)",
          type: "text",
          required: true,
        },
        ...LOCATOR_FIELDS,
      ],
    };
  }

  // 🔵 VARIABLES & DATA
  if (category === "Variables & Data") {
    if (group === "Variable Actions") {
      return {
        actionKey,
        fields: [
          VARIABLE_FIELD,
          {
            id: "valueMode",
            label: "Value Mode",
            type: "select",
            options: ["fixed-text", "number", "expression"],
          },
          {
            id: "value",
            label: "Value / Expression",
            type: "text",
          },
        ],
      };
    }

    if (group === "Data Extraction") {
      return {
        actionKey,
        fields: [
          ...LOCATOR_FIELDS,
          VARIABLE_FIELD,
        ],
      };
    }

    if (group === "Data Iteration") {
      return {
        actionKey,
        fields: [
          {
            id: "sourceType",
            label: "Data Source Type",
            type: "select",
            options: ["table", "array", "csv", "range"],
          },
          VARIABLE_FIELD,
        ],
      };
    }
  }

  // 🔵 CONDITIONS & LOOPS
  if (category === "Conditions & Loops") {
    return {
      actionKey,
      fields: [
        ...LOCATOR_FIELDS,
        {
          id: "conditionMode",
          label: "Condition Type",
          type: "select",
          options: ["element-exists", "text-equals", "url-contains", "var-equals"],
        },
        {
          id: "expected",
          label: "Expected Value (if applicable)",
          type: "text",
        },
      ],
    };
  }

  // 🔵 BROWSER & SYSTEM ACTIONS
  if (category === "Browser & System Actions") {
    if (group === "JS Execution") {
      return {
        actionKey,
        fields: [
          {
            id: "script",
            label: "JavaScript Code",
            type: "textarea",
            required: true,
          },
          VARIABLE_FIELD,
        ],
      };
    }

    if (group === "Screenshots") {
      return {
        actionKey,
        fields: [
          ...LOCATOR_FIELDS,
          {
            id: "fileName",
            label: "Screenshot Name",
            type: "text",
            placeholder: "home-page.png",
          },
        ],
      };
    }

    if (group === "Network") {
      return {
        actionKey,
        fields: [
          {
            id: "apiPattern",
            label: "API URL Pattern",
            type: "text",
          },
          VARIABLE_FIELD,
        ],
      };
    }
  }

  // 🔵 ADVANCED AUTOMATION
  if (category === "Advanced Automation") {
    if (group === "API Calls") {
      return {
        actionKey,
        fields: [
          {
            id: "method",
            label: "Method",
            type: "select",
            options: ["GET", "POST", "PUT", "DELETE"],
            required: true,
          },
          {
            id: "url",
            label: "API URL",
            type: "text",
            required: true,
          },
          {
            id: "headers",
            label: "Headers",
            type: "keyvalue",
            helperText: "Key-value HTTP headers.",
          },
          {
            id: "body",
            label: "Body (JSON)",
            type: "textarea",
            placeholder: '{ "name": "John" }',
          },
          VARIABLE_FIELD,
        ],
      };
    }

    if (group === "Visual" || group === "Accessibility" || group === "Performance") {
      return {
        actionKey,
        fields: [VARIABLE_FIELD, GENERIC_NOTES_FIELD],
      };
    }
  }

  // 🔵 ORGANIZATIONAL META
  if (category === "Organizational Meta") {
    return {
      actionKey,
      fields: [
        {
          id: "comment",
          label: "Comment / Description",
          type: "textarea",
          required: true,
        },
        {
          id: "tags",
          label: "Tags (comma separated)",
          type: "text",
          placeholder: "smoke, regression, auth",
        },
      ],
    };
  }

  // Final fallback
  return {
    actionKey,
    fields: [GENERIC_NOTES_FIELD],
  };
}
