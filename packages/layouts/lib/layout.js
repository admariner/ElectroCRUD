var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/layout.tsx
var layout_exports = {};
__export(layout_exports, {
  Layout: () => Layout
});
module.exports = __toCommonJS(layout_exports);

// react-import.ts
var import_react = __toESM(require("react"));

// src/layout.tsx
var import_react2 = require("@chakra-ui/react");
var Layout = /* @__PURE__ */ __name(({ sections = [] }) => {
  return /* @__PURE__ */ import_react.default.createElement(import_react2.Flex, {
    w: "100%",
    borderRadius: "lg",
    overflow: "hidden",
    flexDirection: "column"
  }, /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, sections.map((item) => /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, item))));
}, "Layout");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Layout
});
