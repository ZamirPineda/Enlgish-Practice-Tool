import "@testing-library/jest-dom";

if (typeof Worker === "undefined") {
  (global as any).Worker = class {
    constructor() {}
    postMessage() {}
    terminate() {}
    addEventListener() {}
    removeEventListener() {}
  };
}
