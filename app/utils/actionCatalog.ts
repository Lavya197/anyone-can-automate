// app/utils/actionCatalog.ts

export type ActionDef = {
  id: string;
  category:
    | "Navigation"
    | "Interactions"
    | "Assertions"
    | "Waits"
    | "Elements & Locators"
    | "Variables & Data"
    | "Conditions & Loops"
    | "Browser & System Actions"
    | "Advanced Automation"
    | "Organizational Meta";
  group: string;        // subcategory
  name: string;
  description: string;
};

export const ACTION_CATALOG: ActionDef[] = [
  // 6.1 Navigation — Page Navigation
  {
    id: "nav-navigate-url",
    category: "Navigation",
    group: "Page Navigation",
    name: "Navigate to URL",
    description: "Open a specific URL in the current tab.",
  },
  {
    id: "nav-reload-page",
    category: "Navigation",
    group: "Page Navigation",
    name: "Reload page",
    description: "Reload the current page.",
  },
  {
    id: "nav-go-back",
    category: "Navigation",
    group: "Page Navigation",
    name: "Go back",
    description: "Navigate back in browser history.",
  },
  {
    id: "nav-go-forward",
    category: "Navigation",
    group: "Page Navigation",
    name: "Go forward",
    description: "Navigate forward in browser history.",
  },
  {
    id: "nav-open-new-tab",
    category: "Navigation",
    group: "Page Navigation",
    name: "Open new tab",
    description: "Open a URL in a new browser tab.",
  },
  {
    id: "nav-switch-tab",
    category: "Navigation",
    group: "Page Navigation",
    name: "Switch to tab",
    description: "Switch focus to another browser tab by index or title.",
  },
  {
    id: "nav-close-tab",
    category: "Navigation",
    group: "Page Navigation",
    name: "Close tab",
    description: "Close the current browser tab.",
  },
  {
    id: "nav-wait-for-navigation",
    category: "Navigation",
    group: "Page Navigation",
    name: "Wait for navigation",
    description: "Wait until the page finishes navigation.",
  },
  {
    id: "nav-wait-for-page-load",
    category: "Navigation",
    group: "Page Navigation",
    name: "Wait for page load",
    description: "Wait until DOM ready or network idle.",
  },

  // 6.1 Navigation — Scroll & Viewport
  {
    id: "nav-scroll-top",
    category: "Navigation",
    group: "Scroll & Viewport",
    name: "Scroll to top",
    description: "Scroll the page to the top.",
  },
  {
    id: "nav-scroll-bottom",
    category: "Navigation",
    group: "Scroll & Viewport",
    name: "Scroll to bottom",
    description: "Scroll the page to the bottom.",
  },
  {
    id: "nav-scroll-to-element",
    category: "Navigation",
    group: "Scroll & Viewport",
    name: "Scroll to element",
    description: "Scroll until a specific element is in view.",
  },
  {
    id: "nav-scroll-to-coordinates",
    category: "Navigation",
    group: "Scroll & Viewport",
    name: "Scroll to coordinates",
    description: "Scroll to given x,y coordinates.",
  },
  {
    id: "nav-set-viewport-size",
    category: "Navigation",
    group: "Scroll & Viewport",
    name: "Set viewport size",
    description: "Set browser viewport width and height.",
  },
  {
    id: "nav-maximize-window",
    category: "Navigation",
    group: "Scroll & Viewport",
    name: "Maximize window",
    description: "Maximize the browser window.",
  },

  // 6.1 Navigation — Cookies & Storage
  {
    id: "nav-add-cookie",
    category: "Navigation",
    group: "Cookies & Storage",
    name: "Add cookie",
    description: "Add a cookie with name, value and options.",
  },
  {
    id: "nav-delete-cookie",
    category: "Navigation",
    group: "Cookies & Storage",
    name: "Delete cookie",
    description: "Delete a cookie by name.",
  },
  {
    id: "nav-clear-cookies",
    category: "Navigation",
    group: "Cookies & Storage",
    name: "Clear cookies",
    description: "Clear all cookies for current domain.",
  },
  {
    id: "nav-get-localstorage",
    category: "Navigation",
    group: "Cookies & Storage",
    name: "Get localStorage value",
    description: "Read a key from localStorage into a variable.",
  },
  {
    id: "nav-set-localstorage",
    category: "Navigation",
    group: "Cookies & Storage",
    name: "Set localStorage value",
    description: "Write a key/value into localStorage.",
  },
  {
    id: "nav-clear-localstorage",
    category: "Navigation",
    group: "Cookies & Storage",
    name: "Clear localStorage",
    description: "Clear all localStorage entries.",
  },

  // 6.1 Navigation — Network Controls (advanced)
  {
    id: "nav-block-urls",
    category: "Navigation",
    group: "Network Controls",
    name: "Block URLs",
    description: "Block specific URL patterns (e.g., analytics, ads).",
  },
  {
    id: "nav-mock-api-response",
    category: "Navigation",
    group: "Network Controls",
    name: "Mock API response",
    description: "Intercept and mock an API response.",
  },
  {
    id: "nav-wait-for-api-call",
    category: "Navigation",
    group: "Network Controls",
    name: "Wait for specific API call",
    description: "Wait until a specific API call has completed.",
  },
  {
    id: "nav-wait-network-idle",
    category: "Navigation",
    group: "Network Controls",
    name: "Wait for network idle",
    description: "Wait until there are no pending network requests.",
  },

  // 6.2 Interactions — Basic Inputs
  {
    id: "int-click",
    category: "Interactions",
    group: "Basic Inputs",
    name: "Click element",
    description: "Click an element using a locator.",
  },
  {
    id: "int-dblclick",
    category: "Interactions",
    group: "Basic Inputs",
    name: "Double click element",
    description: "Double-click an element.",
  },
  {
    id: "int-rightclick",
    category: "Interactions",
    group: "Basic Inputs",
    name: "Right click element",
    description: "Right-click on an element.",
  },
  {
    id: "int-hover",
    category: "Interactions",
    group: "Basic Inputs",
    name: "Hover over element",
    description: "Move mouse over a target element.",
  },
  {
    id: "int-focus",
    category: "Interactions",
    group: "Basic Inputs",
    name: "Focus element",
    description: "Focus a form input or control.",
  },
  {
    id: "int-blur",
    category: "Interactions",
    group: "Basic Inputs",
    name: "Blur element",
    description: "Remove focus from a form control.",
  },
  {
    id: "int-type-text",
    category: "Interactions",
    group: "Basic Inputs",
    name: "Type text",
    description: "Type text into an input using a locator.",
  },
  {
    id: "int-press-key",
    category: "Interactions",
    group: "Basic Inputs",
    name: "Press key",
    description: "Simulate a key press (Enter, Tab, etc.).",
  },
  {
    id: "int-clear-input",
    category: "Interactions",
    group: "Basic Inputs",
    name: "Clear input",
    description: "Clear text from an input field.",
  },

  // 6.2 Interactions — Form Controls
  {
    id: "int-select-dropdown",
    category: "Interactions",
    group: "Form Controls",
    name: "Select dropdown option",
    description: "Select dropdown option by text, value or index.",
  },
  {
    id: "int-toggle-checkbox",
    category: "Interactions",
    group: "Form Controls",
    name: "Toggle checkbox",
    description: "Check or uncheck a checkbox.",
  },
  {
    id: "int-select-radio",
    category: "Interactions",
    group: "Form Controls",
    name: "Select radio option",
    description: "Select a radio button by value or label.",
  },
  {
    id: "int-set-slider",
    category: "Interactions",
    group: "Form Controls",
    name: "Set slider position",
    description: "Set a slider control to a specific value.",
  },

  // 6.2 Interactions — Drag & Drop
  {
    id: "int-drag-drop-element",
    category: "Interactions",
    group: "Drag & Drop",
    name: "Drag and drop element",
    description: "Drag one element onto another element.",
  },
  {
    id: "int-drag-offset",
    category: "Interactions",
    group: "Drag & Drop",
    name: "Drag by offset",
    description: "Drag an element by x,y offset.",
  },
  {
    id: "int-hold-move-release",
    category: "Interactions",
    group: "Drag & Drop",
    name: "Hold → Move → Release",
    description: "Hold mouse button, move, then release.",
  },

  // 6.2 Interactions — File Upload
  {
    id: "int-upload-file-input",
    category: "Interactions",
    group: "File Upload",
    name: "Upload via file input",
    description: "Upload a file using an <input type='file'> element.",
  },
  {
    id: "int-upload-drag-drop",
    category: "Interactions",
    group: "File Upload",
    name: "Upload via drag & drop",
    description: "Upload a file by dragging into a drop zone.",
  },

  // 6.3 Assertions — Element Assertions
  {
    id: "assert-element-exists",
    category: "Assertions",
    group: "Element Assertions",
    name: "Assert element exists",
    description: "Verify that an element exists in the DOM.",
  },
  {
    id: "assert-element-visible",
    category: "Assertions",
    group: "Element Assertions",
    name: "Assert element visible",
    description: "Verify that an element is visible.",
  },
  {
    id: "assert-element-hidden",
    category: "Assertions",
    group: "Element Assertions",
    name: "Assert element hidden",
    description: "Verify that an element is hidden.",
  },
  {
    id: "assert-element-enabled",
    category: "Assertions",
    group: "Element Assertions",
    name: "Assert element enabled",
    description: "Verify that an element is enabled.",
  },
  {
    id: "assert-element-disabled",
    category: "Assertions",
    group: "Element Assertions",
    name: "Assert element disabled",
    description: "Verify that an element is disabled.",
  },
  {
    id: "assert-element-contains-text",
    category: "Assertions",
    group: "Element Assertions",
    name: "Assert element contains text",
    description: "Verify that element text contains expected text.",
  },
  {
    id: "assert-element-text-equals",
    category: "Assertions",
    group: "Element Assertions",
    name: "Assert element text equals",
    description: "Verify that element text exactly matches expected.",
  },
  {
    id: "assert-element-value-equals",
    category: "Assertions",
    group: "Element Assertions",
    name: "Assert element value equals",
    description: "Verify an input's value matches expected.",
  },
  {
    id: "assert-element-attribute",
    category: "Assertions",
    group: "Element Assertions",
    name: "Assert element has attribute",
    description: "Verify element has an attribute with expected value.",
  },
  {
    id: "assert-element-class",
    category: "Assertions",
    group: "Element Assertions",
    name: "Assert element has class",
    description: "Verify element has a specific CSS class.",
  },
  {
    id: "assert-element-count",
    category: "Assertions",
    group: "Element Assertions",
    name: "Assert element count",
    description: "Verify number of matching elements equals expected.",
  },

  // 6.3 Assertions — Page Assertions
  {
    id: "assert-page-title",
    category: "Assertions",
    group: "Page Assertions",
    name: "Assert page title",
    description: "Verify page title equals or contains expected text.",
  },
  {
    id: "assert-url-equals",
    category: "Assertions",
    group: "Page Assertions",
    name: "Assert URL equals",
    description: "Verify current URL exactly matches expected.",
  },
  {
    id: "assert-url-contains",
    category: "Assertions",
    group: "Page Assertions",
    name: "Assert URL contains",
    description: "Verify current URL contains a substring.",
  },
  {
    id: "assert-network-status",
    category: "Assertions",
    group: "Page Assertions",
    name: "Assert network status code",
    description: "Verify an API call returned expected status code.",
  },
  {
    id: "assert-no-console-errors",
    category: "Assertions",
    group: "Page Assertions",
    name: "Assert no console errors",
    description: "Fail test if console error logs are detected.",
  },

  // 6.4 Waits — Explicit Waits
  {
    id: "wait-element-visible",
    category: "Waits",
    group: "Explicit Waits",
    name: "Wait for element visible",
    description: "Wait until an element becomes visible.",
  },
  {
    id: "wait-element-hidden",
    category: "Waits",
    group: "Explicit Waits",
    name: "Wait for element hidden",
    description: "Wait until an element is hidden or removed.",
  },
  {
    id: "wait-element-enabled",
    category: "Waits",
    group: "Explicit Waits",
    name: "Wait for element enabled",
    description: "Wait until an element becomes enabled.",
  },
  {
    id: "wait-element-disabled",
    category: "Waits",
    group: "Explicit Waits",
    name: "Wait for element disabled",
    description: "Wait until an element becomes disabled.",
  },
  {
    id: "wait-text",
    category: "Waits",
    group: "Explicit Waits",
    name: "Wait for text",
    description: "Wait until text appears in an element.",
  },
  {
    id: "wait-selector",
    category: "Waits",
    group: "Explicit Waits",
    name: "Wait for selector",
    description: "Wait until a selector matches an element.",
  },
  {
    id: "wait-url",
    category: "Waits",
    group: "Explicit Waits",
    name: "Wait for URL",
    description: "Wait until URL equals or contains expected text.",
  },
  {
    id: "wait-network-idle",
    category: "Waits",
    group: "Explicit Waits",
    name: "Wait for network idle",
    description: "Wait until there are no active network calls.",
  },
  {
    id: "wait-sleep",
    category: "Waits",
    group: "Explicit Waits",
    name: "Sleep (timeout)",
    description: "Pause the test for a fixed number of milliseconds.",
  },

  // 6.4 Waits — Conditional Waits
  {
    id: "wait-expression-true",
    category: "Waits",
    group: "Conditional Waits",
    name: "Wait until expression true",
    description: "Wait until a JavaScript expression returns true.",
  },
  {
    id: "wait-action-finishes",
    category: "Waits",
    group: "Conditional Waits",
    name: "Wait until action finishes",
    description: "Wait for a specific async action pattern to complete.",
  },

  // 6.5 Elements & Locators
  {
    id: "elem-test-exists",
    category: "Elements & Locators",
    group: "Element Actions",
    name: "Test locator (exists)",
    description: "Check if a locator finds at least one element.",
  },
  {
    id: "elem-test-visible",
    category: "Elements & Locators",
    group: "Element Actions",
    name: "Test locator (visible)",
    description: "Check if locator finds a visible element.",
  },
  {
    id: "elem-use-saved",
    category: "Elements & Locators",
    group: "Element Actions",
    name: "Use saved element",
    description: "Reuse a named element from the repository.",
  },
  {
    id: "elem-add-new",
    category: "Elements & Locators",
    group: "Element Actions",
    name: "Add new element",
    description: "Define a new named element with locator type & value.",
  },

  // 6.6 Variables & Data
  {
    id: "var-set-variable",
    category: "Variables & Data",
    group: "Variable Actions",
    name: "Set variable",
    description: "Set a variable to a fixed value or expression.",
  },
  {
    id: "var-use-variable",
    category: "Variables & Data",
    group: "Variable Actions",
    name: "Use variable in field",
    description: "Insert a variable placeholder into a field.",
  },
  {
    id: "var-random-email",
    category: "Variables & Data",
    group: "Variable Actions",
    name: "Generate random email",
    description: "Generate a random email and store in variable.",
  },
  {
    id: "var-random-phone",
    category: "Variables & Data",
    group: "Variable Actions",
    name: "Generate random phone",
    description: "Generate a random phone number.",
  },
  {
    id: "var-uuid",
    category: "Variables & Data",
    group: "Variable Actions",
    name: "Generate UUID",
    description: "Generate a UUID value for later use.",
  },
  {
    id: "var-timestamp",
    category: "Variables & Data",
    group: "Variable Actions",
    name: "Generate timestamp",
    description: "Store current timestamp as a variable.",
  },

  // 6.6 Variables & Data — Data Extraction
  {
    id: "var-extract-text",
    category: "Variables & Data",
    group: "Data Extraction",
    name: "Extract text → variable",
    description: "Read element text and store into a variable.",
  },
  {
    id: "var-extract-attribute",
    category: "Variables & Data",
    group: "Data Extraction",
    name: "Extract attribute → variable",
    description: "Read an element attribute into a variable.",
  },
  {
    id: "var-extract-url",
    category: "Variables & Data",
    group: "Data Extraction",
    name: "Extract URL → variable",
    description: "Store current URL in a variable.",
  },

  // 6.6 Variables & Data — Data Iteration
  {
    id: "data-loop-n-times",
    category: "Variables & Data",
    group: "Data Iteration",
    name: "Loop N times",
    description: "Repeat inner steps for a fixed number of times.",
  },
  {
    id: "data-loop-table-rows",
    category: "Variables & Data",
    group: "Data Iteration",
    name: "Loop through table rows",
    description: "Iterate over rows in a table element.",
  },
  {
    id: "data-loop-array",
    category: "Variables & Data",
    group: "Data Iteration",
    name: "Loop through array",
    description: "Iterate through an in-memory array or list.",
  },
  {
    id: "data-loop-csv",
    category: "Variables & Data",
    group: "Data Iteration",
    name: "Loop through CSV",
    description: "Iterate test data from a CSV source.",
  },

  // 6.7 Conditions & Logic
  {
    id: "cond-if-element-exists",
    category: "Conditions & Loops",
    group: "If Conditions",
    name: "If element exists",
    description: "Run nested steps only if an element exists.",
  },
  {
    id: "cond-if-text-equals",
    category: "Conditions & Loops",
    group: "If Conditions",
    name: "If text equals",
    description: "Run steps if element text equals expected.",
  },
  {
    id: "cond-if-url-contains",
    category: "Conditions & Loops",
    group: "If Conditions",
    name: "If URL contains",
    description: "Run steps if URL contains a substring.",
  },
  {
    id: "cond-if-var-equals",
    category: "Conditions & Loops",
    group: "If Conditions",
    name: "If variable equals",
    description: "Run steps if variable equals a value.",
  },
  {
    id: "cond-else-if",
    category: "Conditions & Loops",
    group: "Else / Else If",
    name: "Else if",
    description: "Additional condition branch.",
  },
  {
    id: "cond-else",
    category: "Conditions & Loops",
    group: "Else / Else If",
    name: "Else",
    description: "Fallback branch when previous conditions fail.",
  },
  {
    id: "loop-repeat-n",
    category: "Conditions & Loops",
    group: "Loops",
    name: "Repeat N times",
    description: "Repeat enclosed steps a fixed number of times.",
  },
  {
    id: "loop-while-true",
    category: "Conditions & Loops",
    group: "Loops",
    name: "While condition true",
    description: "Repeat steps while a condition remains true.",
  },

  // 6.8 Browser & System Actions
  {
    id: "browser-run-js",
    category: "Browser & System Actions",
    group: "JS Execution",
    name: "Run custom JavaScript",
    description: "Execute custom JS in the browser context.",
  },
  {
    id: "browser-eval-expression",
    category: "Browser & System Actions",
    group: "JS Execution",
    name: "Evaluate expression",
    description: "Evaluate JavaScript and capture the result.",
  },
  {
    id: "browser-assign-output-var",
    category: "Browser & System Actions",
    group: "JS Execution",
    name: "Assign JS output → variable",
    description: "Store the result of JS execution in a variable.",
  },

  // Screenshots
  {
    id: "browser-screenshot-full",
    category: "Browser & System Actions",
    group: "Screenshots",
    name: "Full page screenshot",
    description: "Capture a screenshot of the full page.",
  },
  {
    id: "browser-screenshot-element",
    category: "Browser & System Actions",
    group: "Screenshots",
    name: "Element screenshot",
    description: "Capture screenshot of a specific element.",
  },
  {
    id: "browser-screenshot-on-failure",
    category: "Browser & System Actions",
    group: "Screenshots",
    name: "Screenshot on failure",
    description: "Take screenshot automatically when a step fails.",
  },

  // Network / API Assertions
  {
    id: "browser-wait-api-response",
    category: "Browser & System Actions",
    group: "Network",
    name: "Wait for API response",
    description: "Wait until a specific API call responds.",
  },
  {
    id: "browser-assert-api-json",
    category: "Browser & System Actions",
    group: "Network",
    name: "Assert API JSON",
    description: "Assert fields in a JSON API response.",
  },
  {
    id: "browser-mock-api",
    category: "Browser & System Actions",
    group: "Network",
    name: "Mock API response (browser)",
    description: "Mock an API response at browser layer.",
  },

  // 6.9 Advanced Automation (future but UI-ready)
  {
    id: "adv-api-call-get",
    category: "Advanced Automation",
    group: "API Calls",
    name: "API call (GET)",
    description: "Call an HTTP GET API from the test.",
  },
  {
    id: "adv-api-call-post",
    category: "Advanced Automation",
    group: "API Calls",
    name: "API call (POST)",
    description: "Call an HTTP POST API from the test.",
  },
  {
    id: "adv-visual-diff",
    category: "Advanced Automation",
    group: "Visual",
    name: "Visual diff check",
    description: "Compare screenshots against a baseline.",
  },
  {
    id: "adv-accessibility-scan",
    category: "Advanced Automation",
    group: "Accessibility",
    name: "Accessibility scan",
    description: "Run accessibility checks on current page.",
  },
  {
    id: "adv-pdf-handling",
    category: "Advanced Automation",
    group: "PDF",
    name: "PDF handling",
    description: "Open, download or validate PDF content.",
  },
  {
    id: "adv-performance-metrics",
    category: "Advanced Automation",
    group: "Performance",
    name: "Capture performance metrics",
    description: "Gather performance metrics / timings.",
  },

  // 6.10 Organizational Meta / Commentary
  {
    id: "meta-comment-step",
    category: "Organizational Meta",
    group: "Meta",
    name: "Add comment step",
    description: "Insert a non-executing comment step in flow.",
  },
  {
    id: "meta-separator",
    category: "Organizational Meta",
    group: "Meta",
    name: "Add separator",
    description: "Add a visual separator between flow sections.",
  },
  {
    id: "meta-test-description",
    category: "Organizational Meta",
    group: "Meta",
    name: "Set test description",
    description: "Define a human-readable description of the test.",
  },
  {
    id: "meta-tags",
    category: "Organizational Meta",
    group: "Meta",
    name: "Set test tags",
    description: "Tag test as smoke, regression, auth, etc.",
  },
];
