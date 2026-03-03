import "@testing-library/jest-dom";

if (typeof window !== "undefined" && typeof window.Worker === "undefined") {
  (window as any).Worker = class {
    constructor() {}
    postMessage() {}
    terminate() {}
    addEventListener() {}
    removeEventListener() {}
  };
} else if (
  typeof global !== "undefined" &&
  typeof global.Worker === "undefined"
) {
  (global as any).Worker = class {
    constructor() {}
    postMessage() {}
    terminate() {}
    addEventListener() {}
    removeEventListener() {}
  };
}
