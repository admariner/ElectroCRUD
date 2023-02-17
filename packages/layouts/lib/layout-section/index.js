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

// src/layout-section/index.tsx
var layout_section_exports = {};
__export(layout_section_exports, {
  LayoutCardSection: () => LayoutCardSection,
  LayoutSection: () => LayoutSection,
  LayoutWidgetsSection: () => LayoutWidgetsSection
});
module.exports = __toCommonJS(layout_section_exports);

// react-import.ts
var import_react = __toESM(require("react"));

// src/layout-section/layout-widgets-section.tsx
var import_react2 = require("@chakra-ui/react");
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
__name(_extends, "_extends");
var LayoutWidgetsSection = /* @__PURE__ */ __name(({ children, sectionProperties = {} }) => {
  return /* @__PURE__ */ import_react.default.createElement(import_react2.Flex, _extends({
    width: "100%"
  }, sectionProperties), children);
}, "LayoutWidgetsSection");

// src/layout-section/layout-section.tsx
var import_react3 = require("@chakra-ui/react");
function _extends2() {
  _extends2 = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends2.apply(this, arguments);
}
__name(_extends2, "_extends");
var LayoutSection = /* @__PURE__ */ __name(({ children, sectionProperties = {} }) => {
  return /* @__PURE__ */ import_react.default.createElement(import_react3.Flex, _extends2({
    flex: 1
  }, sectionProperties), children);
}, "LayoutSection");

// src/layout-section/layout-card-section.tsx
var import_react4 = require("@chakra-ui/react");
function _extends3() {
  _extends3 = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends3.apply(this, arguments);
}
__name(_extends3, "_extends");
var LayoutCardSection = /* @__PURE__ */ __name(({ children, sectionProperties = {}, cardProperties = {}, cardBodyProperties = {} }) => {
  return /* @__PURE__ */ import_react.default.createElement(import_react4.Flex, _extends3({
    width: "100%"
  }, sectionProperties), /* @__PURE__ */ import_react.default.createElement(import_react4.Card, _extends3({}, cardProperties), /* @__PURE__ */ import_react.default.createElement(import_react4.CardBody, _extends3({}, cardBodyProperties), children)));
}, "LayoutCardSection");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LayoutCardSection,
  LayoutSection,
  LayoutWidgetsSection
});
