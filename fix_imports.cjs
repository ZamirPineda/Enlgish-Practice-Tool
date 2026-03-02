const fs = require("fs");
const path = require("path");
const glob = require("fs")
  .readdirSync("components")
  .filter((f) => f.endsWith("View.tsx"));

glob.forEach((f) => {
  const p = path.join("components", f);
  let c = fs.readFileSync(p, "utf-8");
  if (c.includes("useRef<number>")) {
    if (
      !c.includes("useRef,") &&
      !c.includes(" useRef ") &&
      !c.includes(", useRef,")
    ) {
      c = c.replace(
        /import React, \{ (.*?useState.*?) \} from "react";/,
        'import React, { useRef, $1 } from "react";',
      );
      c = c.replace(
        /import \{ (.*?useState.*?) \} from "react";/,
        'import { useRef, $1 } from "react";',
      );
      // Fallback
      if (!c.includes("useRef")) {
        console.log("Failed to match in " + f);
      }
      fs.writeFileSync(p, c);
      console.log(`Fixed import in ${f}`);
    }
  }
});
