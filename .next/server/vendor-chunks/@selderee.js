"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@selderee";
exports.ids = ["vendor-chunks/@selderee"];
exports.modules = {

/***/ "(ssr)/./node_modules/@selderee/plugin-htmlparser2/lib/hp2-builder.mjs":
/*!***********************************************************************!*\
  !*** ./node_modules/@selderee/plugin-htmlparser2/lib/hp2-builder.mjs ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   hp2Builder: () => (/* binding */ hp2Builder)\n/* harmony export */ });\n/* harmony import */ var domhandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! domhandler */ \"(ssr)/./node_modules/domhandler/lib/esm/index.js\");\n/* harmony import */ var selderee__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! selderee */ \"(ssr)/./node_modules/selderee/lib/selderee.mjs\");\n\n\n\nfunction hp2Builder(nodes) {\n    return new selderee__WEBPACK_IMPORTED_MODULE_1__.Picker(handleArray(nodes));\n}\nfunction handleArray(nodes) {\n    const matchers = nodes.map(handleNode);\n    return (el, ...tail) => matchers.flatMap(m => m(el, ...tail));\n}\nfunction handleNode(node) {\n    switch (node.type) {\n        case 'terminal': {\n            const result = [node.valueContainer];\n            return (el, ...tail) => result;\n        }\n        case 'tagName':\n            return handleTagName(node);\n        case 'attrValue':\n            return handleAttrValueName(node);\n        case 'attrPresence':\n            return handleAttrPresenceName(node);\n        case 'pushElement':\n            return handlePushElementNode(node);\n        case 'popElement':\n            return handlePopElementNode(node);\n    }\n}\nfunction handleTagName(node) {\n    const variants = {};\n    for (const variant of node.variants) {\n        variants[variant.value] = handleArray(variant.cont);\n    }\n    return (el, ...tail) => {\n        const continuation = variants[el.name];\n        return (continuation) ? continuation(el, ...tail) : [];\n    };\n}\nfunction handleAttrPresenceName(node) {\n    const attrName = node.name;\n    const continuation = handleArray(node.cont);\n    return (el, ...tail) => (Object.prototype.hasOwnProperty.call(el.attribs, attrName))\n        ? continuation(el, ...tail)\n        : [];\n}\nfunction handleAttrValueName(node) {\n    const callbacks = [];\n    for (const matcher of node.matchers) {\n        const predicate = matcher.predicate;\n        const continuation = handleArray(matcher.cont);\n        callbacks.push((attr, el, ...tail) => (predicate(attr) ? continuation(el, ...tail) : []));\n    }\n    const attrName = node.name;\n    return (el, ...tail) => {\n        const attr = el.attribs[attrName];\n        return (attr || attr === '')\n            ? callbacks.flatMap(cb => cb(attr, el, ...tail))\n            : [];\n    };\n}\nfunction handlePushElementNode(node) {\n    const continuation = handleArray(node.cont);\n    const leftElementGetter = (node.combinator === '+')\n        ? getPrecedingElement\n        : getParentElement;\n    return (el, ...tail) => {\n        const next = leftElementGetter(el);\n        if (next === null) {\n            return [];\n        }\n        return continuation(next, el, ...tail);\n    };\n}\nconst getPrecedingElement = (el) => {\n    const prev = el.prev;\n    if (prev === null) {\n        return null;\n    }\n    return ((0,domhandler__WEBPACK_IMPORTED_MODULE_0__.isTag)(prev)) ? prev : getPrecedingElement(prev);\n};\nconst getParentElement = (el) => {\n    const parent = el.parent;\n    return (parent && (0,domhandler__WEBPACK_IMPORTED_MODULE_0__.isTag)(parent)) ? parent : null;\n};\nfunction handlePopElementNode(node) {\n    const continuation = handleArray(node.cont);\n    return (el, next, ...tail) => continuation(next, ...tail);\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvQHNlbGRlcmVlL3BsdWdpbi1odG1scGFyc2VyMi9saWIvaHAyLWJ1aWxkZXIubWpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFtQztBQUNEOztBQUVsQztBQUNBLGVBQWUsNENBQU07QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLGlEQUFLO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixpREFBSztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVzQiIsInNvdXJjZXMiOlsid2VicGFjazovL3BydWViYS10ZWNuaWNhLy4vbm9kZV9tb2R1bGVzL0BzZWxkZXJlZS9wbHVnaW4taHRtbHBhcnNlcjIvbGliL2hwMi1idWlsZGVyLm1qcz9iMTgzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzVGFnIH0gZnJvbSAnZG9taGFuZGxlcic7XG5pbXBvcnQgeyBQaWNrZXIgfSBmcm9tICdzZWxkZXJlZSc7XG5cbmZ1bmN0aW9uIGhwMkJ1aWxkZXIobm9kZXMpIHtcbiAgICByZXR1cm4gbmV3IFBpY2tlcihoYW5kbGVBcnJheShub2RlcykpO1xufVxuZnVuY3Rpb24gaGFuZGxlQXJyYXkobm9kZXMpIHtcbiAgICBjb25zdCBtYXRjaGVycyA9IG5vZGVzLm1hcChoYW5kbGVOb2RlKTtcbiAgICByZXR1cm4gKGVsLCAuLi50YWlsKSA9PiBtYXRjaGVycy5mbGF0TWFwKG0gPT4gbShlbCwgLi4udGFpbCkpO1xufVxuZnVuY3Rpb24gaGFuZGxlTm9kZShub2RlKSB7XG4gICAgc3dpdGNoIChub2RlLnR5cGUpIHtcbiAgICAgICAgY2FzZSAndGVybWluYWwnOiB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBbbm9kZS52YWx1ZUNvbnRhaW5lcl07XG4gICAgICAgICAgICByZXR1cm4gKGVsLCAuLi50YWlsKSA9PiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAndGFnTmFtZSc6XG4gICAgICAgICAgICByZXR1cm4gaGFuZGxlVGFnTmFtZShub2RlKTtcbiAgICAgICAgY2FzZSAnYXR0clZhbHVlJzpcbiAgICAgICAgICAgIHJldHVybiBoYW5kbGVBdHRyVmFsdWVOYW1lKG5vZGUpO1xuICAgICAgICBjYXNlICdhdHRyUHJlc2VuY2UnOlxuICAgICAgICAgICAgcmV0dXJuIGhhbmRsZUF0dHJQcmVzZW5jZU5hbWUobm9kZSk7XG4gICAgICAgIGNhc2UgJ3B1c2hFbGVtZW50JzpcbiAgICAgICAgICAgIHJldHVybiBoYW5kbGVQdXNoRWxlbWVudE5vZGUobm9kZSk7XG4gICAgICAgIGNhc2UgJ3BvcEVsZW1lbnQnOlxuICAgICAgICAgICAgcmV0dXJuIGhhbmRsZVBvcEVsZW1lbnROb2RlKG5vZGUpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGhhbmRsZVRhZ05hbWUobm9kZSkge1xuICAgIGNvbnN0IHZhcmlhbnRzID0ge307XG4gICAgZm9yIChjb25zdCB2YXJpYW50IG9mIG5vZGUudmFyaWFudHMpIHtcbiAgICAgICAgdmFyaWFudHNbdmFyaWFudC52YWx1ZV0gPSBoYW5kbGVBcnJheSh2YXJpYW50LmNvbnQpO1xuICAgIH1cbiAgICByZXR1cm4gKGVsLCAuLi50YWlsKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnRpbnVhdGlvbiA9IHZhcmlhbnRzW2VsLm5hbWVdO1xuICAgICAgICByZXR1cm4gKGNvbnRpbnVhdGlvbikgPyBjb250aW51YXRpb24oZWwsIC4uLnRhaWwpIDogW107XG4gICAgfTtcbn1cbmZ1bmN0aW9uIGhhbmRsZUF0dHJQcmVzZW5jZU5hbWUobm9kZSkge1xuICAgIGNvbnN0IGF0dHJOYW1lID0gbm9kZS5uYW1lO1xuICAgIGNvbnN0IGNvbnRpbnVhdGlvbiA9IGhhbmRsZUFycmF5KG5vZGUuY29udCk7XG4gICAgcmV0dXJuIChlbCwgLi4udGFpbCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlbC5hdHRyaWJzLCBhdHRyTmFtZSkpXG4gICAgICAgID8gY29udGludWF0aW9uKGVsLCAuLi50YWlsKVxuICAgICAgICA6IFtdO1xufVxuZnVuY3Rpb24gaGFuZGxlQXR0clZhbHVlTmFtZShub2RlKSB7XG4gICAgY29uc3QgY2FsbGJhY2tzID0gW107XG4gICAgZm9yIChjb25zdCBtYXRjaGVyIG9mIG5vZGUubWF0Y2hlcnMpIHtcbiAgICAgICAgY29uc3QgcHJlZGljYXRlID0gbWF0Y2hlci5wcmVkaWNhdGU7XG4gICAgICAgIGNvbnN0IGNvbnRpbnVhdGlvbiA9IGhhbmRsZUFycmF5KG1hdGNoZXIuY29udCk7XG4gICAgICAgIGNhbGxiYWNrcy5wdXNoKChhdHRyLCBlbCwgLi4udGFpbCkgPT4gKHByZWRpY2F0ZShhdHRyKSA/IGNvbnRpbnVhdGlvbihlbCwgLi4udGFpbCkgOiBbXSkpO1xuICAgIH1cbiAgICBjb25zdCBhdHRyTmFtZSA9IG5vZGUubmFtZTtcbiAgICByZXR1cm4gKGVsLCAuLi50YWlsKSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dHIgPSBlbC5hdHRyaWJzW2F0dHJOYW1lXTtcbiAgICAgICAgcmV0dXJuIChhdHRyIHx8IGF0dHIgPT09ICcnKVxuICAgICAgICAgICAgPyBjYWxsYmFja3MuZmxhdE1hcChjYiA9PiBjYihhdHRyLCBlbCwgLi4udGFpbCkpXG4gICAgICAgICAgICA6IFtdO1xuICAgIH07XG59XG5mdW5jdGlvbiBoYW5kbGVQdXNoRWxlbWVudE5vZGUobm9kZSkge1xuICAgIGNvbnN0IGNvbnRpbnVhdGlvbiA9IGhhbmRsZUFycmF5KG5vZGUuY29udCk7XG4gICAgY29uc3QgbGVmdEVsZW1lbnRHZXR0ZXIgPSAobm9kZS5jb21iaW5hdG9yID09PSAnKycpXG4gICAgICAgID8gZ2V0UHJlY2VkaW5nRWxlbWVudFxuICAgICAgICA6IGdldFBhcmVudEVsZW1lbnQ7XG4gICAgcmV0dXJuIChlbCwgLi4udGFpbCkgPT4ge1xuICAgICAgICBjb25zdCBuZXh0ID0gbGVmdEVsZW1lbnRHZXR0ZXIoZWwpO1xuICAgICAgICBpZiAobmV4dCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb250aW51YXRpb24obmV4dCwgZWwsIC4uLnRhaWwpO1xuICAgIH07XG59XG5jb25zdCBnZXRQcmVjZWRpbmdFbGVtZW50ID0gKGVsKSA9PiB7XG4gICAgY29uc3QgcHJldiA9IGVsLnByZXY7XG4gICAgaWYgKHByZXYgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiAoaXNUYWcocHJldikpID8gcHJldiA6IGdldFByZWNlZGluZ0VsZW1lbnQocHJldik7XG59O1xuY29uc3QgZ2V0UGFyZW50RWxlbWVudCA9IChlbCkgPT4ge1xuICAgIGNvbnN0IHBhcmVudCA9IGVsLnBhcmVudDtcbiAgICByZXR1cm4gKHBhcmVudCAmJiBpc1RhZyhwYXJlbnQpKSA/IHBhcmVudCA6IG51bGw7XG59O1xuZnVuY3Rpb24gaGFuZGxlUG9wRWxlbWVudE5vZGUobm9kZSkge1xuICAgIGNvbnN0IGNvbnRpbnVhdGlvbiA9IGhhbmRsZUFycmF5KG5vZGUuY29udCk7XG4gICAgcmV0dXJuIChlbCwgbmV4dCwgLi4udGFpbCkgPT4gY29udGludWF0aW9uKG5leHQsIC4uLnRhaWwpO1xufVxuXG5leHBvcnQgeyBocDJCdWlsZGVyIH07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/@selderee/plugin-htmlparser2/lib/hp2-builder.mjs\n");

/***/ })

};
;