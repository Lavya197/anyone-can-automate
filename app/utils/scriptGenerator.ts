// app/utils/scriptGenerator.ts

type Lane = {
  id: string;
  name: string;
};

type Step = {
  id: string;
  action: string;
  summary: string;
  category?: string;
  actionKey?: string;
  config?: Record<string, any>;
};

type Variable = {
  id: number | string;
  name: string;
  value: string;
};

type ElementRepoItem = {
  id: number | string;
  name: string;
  locatorType: string;
  locatorValue: string;
};

type BuilderState = {
  lanes: Lane[];
  steps: Record<string, Step[]>;
  variables: Variable[];
  elements: ElementRepoItem[];
};

function pyEscape(str: string): string {
  return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

// If full string is {{varName}} → use variables["varName"]
function renderValue(v: any): string {
  if (typeof v !== "string") return JSON.stringify(v);

  const match = v.trim().match(/^{{\s*([\w\-]+)\s*}}$/);
  if (match) {
    return `variables["${match[1]}"]`;
  }

  return `"${pyEscape(v)}"`;
}

function indent(line: string, level: number = 1): string {
  return "    ".repeat(level) + line;
}

// Map one step → list of Python lines (no indentation)
function renderStep(step: Step): string[] {
  const c = step.config || {};
  const lines: string[] = [];
  const actionLower = (step.action || "").toLowerCase();
  const category = (step.category || "").toLowerCase();

  // 1) Navigation: URL
  if (c.url) {
    lines.push(`driver.get(${renderValue(c.url)})`);
    if (c.waitUntil && c.waitUntil !== "none") {
      lines.push(`# Wait strategy: ${c.waitUntil}`);
    }
    return lines;
  }

  // 2) Locators present → click / type / generic interaction
  if (c.locatorType && c.locatorValue) {
    lines.push(
      `el = wait_for_element(driver, "${c.locatorType}", ${renderValue(
        c.locatorValue
      )}, timeout=${c.timeoutMs ? Math.round(c.timeoutMs / 1000) : 10})`
    );

    // Click
    if (actionLower.includes("click")) {
      lines.push("el.click()");
      return lines;
    }

    // Type
    if (actionLower.includes("type") || c.text || c.value) {
      const textVal = c.text || c.value || "";
      if (textVal) {
        lines.push(`el.send_keys(${renderValue(textVal)})`);
      } else {
        lines.push("# TODO: add text value for typing");
      }
      return lines;
    }

    // Generic interaction fallback
    lines.push("# TODO: implement specific interaction for this step");
    return lines;
  }

  // 3) Assertions
  if (category === "assertions") {
    const assertType = (c.assertType || "").toLowerCase();
    const expected = c.expected;

    if (c.locatorType && c.locatorValue && expected) {
      lines.push(
        `el = wait_for_element(driver, "${c.locatorType}", ${renderValue(
          c.locatorValue
        )})`
      );
      lines.push("actual = el.text");
      if (assertType.includes("contains")) {
        lines.push(`assert ${renderValue(expected)} in actual`);
      } else {
        lines.push(`assert actual == ${renderValue(expected)}`);
      }
      return lines;
    }

    if (expected) {
      lines.push("page_source = driver.page_source");
      if (assertType.includes("contains") || !assertType) {
        lines.push(`assert ${renderValue(expected)} in page_source`);
      } else {
        lines.push("# TODO: refine assertion logic");
      }
      return lines;
    }

    lines.push("# TODO: implement assertion for this step");
    return lines;
  }

  // 4) Waits
  if (category === "waits" && c.timeoutMs) {
    const sec = c.timeoutMs / 1000;
    lines.push(`time.sleep(${sec.toFixed(2)})`);
    return lines;
  }

  // 5) Screenshots
  if (actionLower.includes("screenshot")) {
    const name = c.fileName || `screenshot_${step.id}.png`;
    lines.push(`driver.save_screenshot(${renderValue(name)})`);
    return lines;
  }

  // 6) JS Execution
  if (category === "browser & system actions" && c.script) {
    lines.push(`driver.execute_script(${renderValue(c.script)})`);
    return lines;
  }

  // Fallback
  lines.push(`# TODO: implement action "${step.action}" with config: ${JSON.stringify(c)}`);
  return lines;
}

function buildHeader(includeInstructions: boolean, laneCount: number): string[] {
  const lines: string[] = [];

  if (includeInstructions) {
    lines.push(`"""`);
    lines.push(`===========================================================`);
    lines.push(` AUTO-GENERATED SELENIUM TEST SCRIPT`);
    lines.push(` Source: No-Code Automation Builder`);
    lines.push(`===========================================================`);
    lines.push(``);
    lines.push(`Prerequisites:`);
    lines.push(`-------------`);
    lines.push(`1. Install Python 3.8+`);
    lines.push(`2. Install dependencies:`);
    lines.push(`   pip install selenium webdriver-manager`);
    lines.push(``);
    lines.push(`To Run:`);
    lines.push(`-------`);
    lines.push(`python automation_script.py`);
    lines.push(``);
    lines.push(`Structure:`);
    lines.push(`----------`);
    lines.push(`- Each Test Case is generated from your lanes in the builder.`);
    lines.push(`- Test Case count: ${laneCount}`);
    lines.push(`- Variables and elements come from the Variables / Elements panels.`);
    lines.push(``);
    lines.push(`Notes:`);
    lines.push(`------`);
    lines.push(`- This file is auto-generated; prefer editing flows in the builder UI.`);
    lines.push(`- You can customize small details here if needed.`);
    lines.push(`===========================================================`);
    lines.push(`"""`);
    lines.push(``);
  } else {
    lines.push(`# Auto-generated Selenium script from No-Code Automation Builder`);
    lines.push(`# Clean standalone version (no instructions).`);
    lines.push(``);
  }

  lines.push(`from selenium import webdriver`);
  lines.push(`from selenium.webdriver.common.by import By`);
  lines.push(`from selenium.webdriver.common.keys import Keys`);
  lines.push(`from selenium.webdriver.support.ui import WebDriverWait`);
  lines.push(`from selenium.webdriver.support import expected_conditions as EC`);
  lines.push(`from webdriver_manager.chrome import ChromeDriverManager`);
  lines.push(`import time`);
  lines.push(``);
  return lines;
}

function buildVariablesBlock(variables: Variable[]): string[] {
  const lines: string[] = [];
  lines.push(`# ===========================`);
  lines.push(`# Global Variables`);
  lines.push(`# ===========================`);
  lines.push(`variables = {`);
  variables.forEach((v) => {
    if (!v.name) return;
    lines.push(`    "${v.name}": ${renderValue(v.value)},`);
  });
  lines.push(`}`);
  lines.push(``);
  return lines;
}

function buildElementsComment(elements: ElementRepoItem[]): string[] {
  const lines: string[] = [];
  lines.push(`# ===========================`);
  lines.push(`# Element Repository (Reference)`);
  lines.push(`# ===========================`);
  if (elements.length === 0) {
    lines.push(`# No elements saved in the builder.`);
  } else {
    elements.forEach((e) => {
      lines.push(
        `# ${e.name}: ${e.locatorType} = ${e.locatorValue}`
      );
    });
  }
  lines.push(``);
  return lines;
}

function buildHelpers(): string[] {
  const lines: string[] = [];
  lines.push(`# ===========================`);
  lines.push(`# Helper Functions`);
  lines.push(`# ===========================`);
  lines.push(`def wait_for_element(driver, locator_type, locator_value, timeout=10):`);
  lines.push(indent(`by_map = {`));
  lines.push(indent(`"id": By.ID,`, 2));
  lines.push(indent(`"xpath": By.XPATH,`, 2));
  lines.push(indent(`"css": By.CSS_SELECTOR,`, 2));
  lines.push(indent(`"name": By.NAME,`, 2));
  lines.push(indent(`"tag": By.TAG_NAME,`, 2));
  lines.push(indent(`"class": By.CLASS_NAME,`, 2));
  lines.push(indent(`"link_text": By.LINK_TEXT,`, 2));
  lines.push(indent(`}`, 1));
  lines.push(indent(`by = by_map.get(locator_type.lower())`));
  lines.push(indent(`if by is None:`));
  lines.push(indent(`raise ValueError(f"Unsupported locator type: {locator_type}")`, 2));
  lines.push(indent(`return WebDriverWait(driver, timeout).until(`));
  lines.push(indent(`EC.presence_of_element_located((by, locator_value))`, 2));
  lines.push(indent(`)`));
  lines.push(``);
  return lines;
}

function buildTestCases(state: BuilderState): { lines: string[]; functionNames: string[] } {
  const lines: string[] = [];
  const fnNames: string[] = [];

  lines.push(`# ====================================================`);
  lines.push(`#                     TEST CASES`);
  lines.push(`# ====================================================`);
  lines.push(``);

  state.lanes.forEach((lane, index) => {
    const fnName = `test_case_${index + 1}`;
    fnNames.push(fnName);

    lines.push(`def ${fnName}(driver):`);
    lines.push(indent(`print("Running ${fnName} - ${lane.name}")`));

    const laneSteps = state.steps[lane.id] || [];
    if (laneSteps.length === 0) {
      lines.push(indent(`# No steps defined for this test case`));
      lines.push(``);
      return;
    }

    laneSteps.forEach((step, i) => {
      lines.push(indent(`# Step ${i + 1}: ${step.action}`));
      const stepLines = renderStep(step);
      stepLines.forEach((sl) => lines.push(indent(sl)));
      lines.push(``);
    });

    lines.push(``);
  });

  return { lines, functionNames: fnNames };
}

function buildMainBlock(functionNames: string[]): string[] {
  const lines: string[] = [];
  lines.push(`# ====================================================`);
  lines.push(`#                    MAIN EXECUTION`);
  lines.push(`# ====================================================`);
  lines.push(`if __name__ == "__main__":`);
  lines.push(indent(`driver = webdriver.Chrome(ChromeDriverManager().install())`));
  lines.push(indent(`try:`));
  if (functionNames.length === 0) {
    lines.push(indent(`print("No test cases defined.")`, 2));
  } else {
    functionNames.forEach((fn) => {
      lines.push(indent(`${fn}(driver)`, 2));
    });
  }
  lines.push(indent(`finally:`));
  lines.push(indent(`driver.quit()`, 2));
  lines.push(``);
  return lines;
}

export function generatePythonScript(
  state: BuilderState,
  opts: { includeInstructions: boolean }
): string {
  const lines: string[] = [];

  // 1) Header & imports
  lines.push(
    ...buildHeader(opts.includeInstructions, state.lanes.length)
  );

  // 2) Variables
  lines.push(...buildVariablesBlock(state.variables));

  // 3) Elements (comment only)
  lines.push(...buildElementsComment(state.elements));

  // 4) Helpers
  lines.push(...buildHelpers());

  // 5) Test cases
  const { lines: tcLines, functionNames } = buildTestCases(state);
  lines.push(...tcLines);

  // 6) Main
  lines.push(...buildMainBlock(functionNames));

  return lines.join("\n");
}
