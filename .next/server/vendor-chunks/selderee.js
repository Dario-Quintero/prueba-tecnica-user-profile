"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/selderee";
exports.ids = ["vendor-chunks/selderee"];
exports.modules = {

/***/ "(ssr)/./node_modules/selderee/lib/selderee.mjs":
/*!************************************************!*\
  !*** ./node_modules/selderee/lib/selderee.mjs ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Ast: () => (/* binding */ Ast),\n/* harmony export */   DecisionTree: () => (/* binding */ DecisionTree),\n/* harmony export */   Picker: () => (/* binding */ Picker),\n/* harmony export */   Treeify: () => (/* binding */ TreeifyBuilder),\n/* harmony export */   Types: () => (/* binding */ Types)\n/* harmony export */ });\n/* harmony import */ var parseley__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! parseley */ \"(ssr)/./node_modules/parseley/lib/parseley.mjs\");\n\n\n\nvar Ast = /*#__PURE__*/Object.freeze({\n    __proto__: null\n});\n\nvar Types = /*#__PURE__*/Object.freeze({\n    __proto__: null\n});\n\nconst treeify = (nodes) => '▽\\n' + treeifyArray(nodes, thinLines);\nconst thinLines = [['├─', '│ '], ['└─', '  ']];\nconst heavyLines = [['┠─', '┃ '], ['┖─', '  ']];\nconst doubleLines = [['╟─', '║ '], ['╙─', '  ']];\nfunction treeifyArray(nodes, tpl = heavyLines) {\n    return prefixItems(tpl, nodes.map(n => treeifyNode(n)));\n}\nfunction treeifyNode(node) {\n    switch (node.type) {\n        case 'terminal': {\n            const vctr = node.valueContainer;\n            return `◁ #${vctr.index} ${JSON.stringify(vctr.specificity)} ${vctr.value}`;\n        }\n        case 'tagName':\n            return `◻ Tag name\\n${treeifyArray(node.variants, doubleLines)}`;\n        case 'attrValue':\n            return `▣ Attr value: ${node.name}\\n${treeifyArray(node.matchers, doubleLines)}`;\n        case 'attrPresence':\n            return `◨ Attr presence: ${node.name}\\n${treeifyArray(node.cont)}`;\n        case 'pushElement':\n            return `◉ Push element: ${node.combinator}\\n${treeifyArray(node.cont, thinLines)}`;\n        case 'popElement':\n            return `◌ Pop element\\n${treeifyArray(node.cont, thinLines)}`;\n        case 'variant':\n            return `◇ = ${node.value}\\n${treeifyArray(node.cont)}`;\n        case 'matcher':\n            return `◈ ${node.matcher} \"${node.value}\"${node.modifier || ''}\\n${treeifyArray(node.cont)}`;\n    }\n}\nfunction prefixItems(tpl, items) {\n    return items\n        .map((item, i, { length }) => prefixItem(tpl, item, i === length - 1))\n        .join('\\n');\n}\nfunction prefixItem(tpl, item, tail = true) {\n    const tpl1 = tpl[tail ? 1 : 0];\n    return tpl1[0] + item.split('\\n').join('\\n' + tpl1[1]);\n}\n\nvar TreeifyBuilder = /*#__PURE__*/Object.freeze({\n    __proto__: null,\n    treeify: treeify\n});\n\nclass DecisionTree {\n    constructor(input) {\n        this.branches = weave(toAstTerminalPairs(input));\n    }\n    build(builder) {\n        return builder(this.branches);\n    }\n}\nfunction toAstTerminalPairs(array) {\n    const len = array.length;\n    const results = new Array(len);\n    for (let i = 0; i < len; i++) {\n        const [selectorString, val] = array[i];\n        const ast = preprocess(parseley__WEBPACK_IMPORTED_MODULE_0__.parse1(selectorString));\n        results[i] = {\n            ast: ast,\n            terminal: {\n                type: 'terminal',\n                valueContainer: { index: i, value: val, specificity: ast.specificity }\n            }\n        };\n    }\n    return results;\n}\nfunction preprocess(ast) {\n    reduceSelectorVariants(ast);\n    parseley__WEBPACK_IMPORTED_MODULE_0__.normalize(ast);\n    return ast;\n}\nfunction reduceSelectorVariants(ast) {\n    const newList = [];\n    ast.list.forEach(sel => {\n        switch (sel.type) {\n            case 'class':\n                newList.push({\n                    matcher: '~=',\n                    modifier: null,\n                    name: 'class',\n                    namespace: null,\n                    specificity: sel.specificity,\n                    type: 'attrValue',\n                    value: sel.name,\n                });\n                break;\n            case 'id':\n                newList.push({\n                    matcher: '=',\n                    modifier: null,\n                    name: 'id',\n                    namespace: null,\n                    specificity: sel.specificity,\n                    type: 'attrValue',\n                    value: sel.name,\n                });\n                break;\n            case 'combinator':\n                reduceSelectorVariants(sel.left);\n                newList.push(sel);\n                break;\n            case 'universal':\n                break;\n            default:\n                newList.push(sel);\n                break;\n        }\n    });\n    ast.list = newList;\n}\nfunction weave(items) {\n    const branches = [];\n    while (items.length) {\n        const topKind = findTopKey(items, (sel) => true, getSelectorKind);\n        const { matches, nonmatches, empty } = breakByKind(items, topKind);\n        items = nonmatches;\n        if (matches.length) {\n            branches.push(branchOfKind(topKind, matches));\n        }\n        if (empty.length) {\n            branches.push(...terminate(empty));\n        }\n    }\n    return branches;\n}\nfunction terminate(items) {\n    const results = [];\n    for (const item of items) {\n        const terminal = item.terminal;\n        if (terminal.type === 'terminal') {\n            results.push(terminal);\n        }\n        else {\n            const { matches, rest } = partition(terminal.cont, (node) => node.type === 'terminal');\n            matches.forEach((node) => results.push(node));\n            if (rest.length) {\n                terminal.cont = rest;\n                results.push(terminal);\n            }\n        }\n    }\n    return results;\n}\nfunction breakByKind(items, selectedKind) {\n    const matches = [];\n    const nonmatches = [];\n    const empty = [];\n    for (const item of items) {\n        const simpsels = item.ast.list;\n        if (simpsels.length) {\n            const isMatch = simpsels.some(node => getSelectorKind(node) === selectedKind);\n            (isMatch ? matches : nonmatches).push(item);\n        }\n        else {\n            empty.push(item);\n        }\n    }\n    return { matches, nonmatches, empty };\n}\nfunction getSelectorKind(sel) {\n    switch (sel.type) {\n        case 'attrPresence':\n            return `attrPresence ${sel.name}`;\n        case 'attrValue':\n            return `attrValue ${sel.name}`;\n        case 'combinator':\n            return `combinator ${sel.combinator}`;\n        default:\n            return sel.type;\n    }\n}\nfunction branchOfKind(kind, items) {\n    if (kind === 'tag') {\n        return tagNameBranch(items);\n    }\n    if (kind.startsWith('attrValue ')) {\n        return attrValueBranch(kind.substring(10), items);\n    }\n    if (kind.startsWith('attrPresence ')) {\n        return attrPresenceBranch(kind.substring(13), items);\n    }\n    if (kind === 'combinator >') {\n        return combinatorBranch('>', items);\n    }\n    if (kind === 'combinator +') {\n        return combinatorBranch('+', items);\n    }\n    throw new Error(`Unsupported selector kind: ${kind}`);\n}\nfunction tagNameBranch(items) {\n    const groups = spliceAndGroup(items, (x) => x.type === 'tag', (x) => x.name);\n    const variants = Object.entries(groups).map(([name, group]) => ({\n        type: 'variant',\n        value: name,\n        cont: weave(group.items)\n    }));\n    return {\n        type: 'tagName',\n        variants: variants\n    };\n}\nfunction attrPresenceBranch(name, items) {\n    for (const item of items) {\n        spliceSimpleSelector(item, (x) => (x.type === 'attrPresence') && (x.name === name));\n    }\n    return {\n        type: 'attrPresence',\n        name: name,\n        cont: weave(items)\n    };\n}\nfunction attrValueBranch(name, items) {\n    const groups = spliceAndGroup(items, (x) => (x.type === 'attrValue') && (x.name === name), (x) => `${x.matcher} ${x.modifier || ''} ${x.value}`);\n    const matchers = [];\n    for (const group of Object.values(groups)) {\n        const sel = group.oneSimpleSelector;\n        const predicate = getAttrPredicate(sel);\n        const continuation = weave(group.items);\n        matchers.push({\n            type: 'matcher',\n            matcher: sel.matcher,\n            modifier: sel.modifier,\n            value: sel.value,\n            predicate: predicate,\n            cont: continuation\n        });\n    }\n    return {\n        type: 'attrValue',\n        name: name,\n        matchers: matchers\n    };\n}\nfunction getAttrPredicate(sel) {\n    if (sel.modifier === 'i') {\n        const expected = sel.value.toLowerCase();\n        switch (sel.matcher) {\n            case '=':\n                return (actual) => expected === actual.toLowerCase();\n            case '~=':\n                return (actual) => actual.toLowerCase().split(/[ \\t]+/).includes(expected);\n            case '^=':\n                return (actual) => actual.toLowerCase().startsWith(expected);\n            case '$=':\n                return (actual) => actual.toLowerCase().endsWith(expected);\n            case '*=':\n                return (actual) => actual.toLowerCase().includes(expected);\n            case '|=':\n                return (actual) => {\n                    const lower = actual.toLowerCase();\n                    return (expected === lower) || (lower.startsWith(expected) && lower[expected.length] === '-');\n                };\n        }\n    }\n    else {\n        const expected = sel.value;\n        switch (sel.matcher) {\n            case '=':\n                return (actual) => expected === actual;\n            case '~=':\n                return (actual) => actual.split(/[ \\t]+/).includes(expected);\n            case '^=':\n                return (actual) => actual.startsWith(expected);\n            case '$=':\n                return (actual) => actual.endsWith(expected);\n            case '*=':\n                return (actual) => actual.includes(expected);\n            case '|=':\n                return (actual) => (expected === actual) || (actual.startsWith(expected) && actual[expected.length] === '-');\n        }\n    }\n}\nfunction combinatorBranch(combinator, items) {\n    const groups = spliceAndGroup(items, (x) => (x.type === 'combinator') && (x.combinator === combinator), (x) => parseley__WEBPACK_IMPORTED_MODULE_0__.serialize(x.left));\n    const leftItems = [];\n    for (const group of Object.values(groups)) {\n        const rightCont = weave(group.items);\n        const leftAst = group.oneSimpleSelector.left;\n        leftItems.push({\n            ast: leftAst,\n            terminal: { type: 'popElement', cont: rightCont }\n        });\n    }\n    return {\n        type: 'pushElement',\n        combinator: combinator,\n        cont: weave(leftItems)\n    };\n}\nfunction spliceAndGroup(items, predicate, keyCallback) {\n    const groups = {};\n    while (items.length) {\n        const bestKey = findTopKey(items, predicate, keyCallback);\n        const bestKeyPredicate = (sel) => predicate(sel) && keyCallback(sel) === bestKey;\n        const hasBestKeyPredicate = (item) => item.ast.list.some(bestKeyPredicate);\n        const { matches, rest } = partition1(items, hasBestKeyPredicate);\n        let oneSimpleSelector = null;\n        for (const item of matches) {\n            const splicedNode = spliceSimpleSelector(item, bestKeyPredicate);\n            if (!oneSimpleSelector) {\n                oneSimpleSelector = splicedNode;\n            }\n        }\n        if (oneSimpleSelector == null) {\n            throw new Error('No simple selector is found.');\n        }\n        groups[bestKey] = { oneSimpleSelector: oneSimpleSelector, items: matches };\n        items = rest;\n    }\n    return groups;\n}\nfunction spliceSimpleSelector(item, predicate) {\n    const simpsels = item.ast.list;\n    const matches = new Array(simpsels.length);\n    let firstIndex = -1;\n    for (let i = simpsels.length; i-- > 0;) {\n        if (predicate(simpsels[i])) {\n            matches[i] = true;\n            firstIndex = i;\n        }\n    }\n    if (firstIndex == -1) {\n        throw new Error(`Couldn't find the required simple selector.`);\n    }\n    const result = simpsels[firstIndex];\n    item.ast.list = simpsels.filter((sel, i) => !matches[i]);\n    return result;\n}\nfunction findTopKey(items, predicate, keyCallback) {\n    const candidates = {};\n    for (const item of items) {\n        const candidates1 = {};\n        for (const node of item.ast.list.filter(predicate)) {\n            candidates1[keyCallback(node)] = true;\n        }\n        for (const key of Object.keys(candidates1)) {\n            if (candidates[key]) {\n                candidates[key]++;\n            }\n            else {\n                candidates[key] = 1;\n            }\n        }\n    }\n    let topKind = '';\n    let topCounter = 0;\n    for (const entry of Object.entries(candidates)) {\n        if (entry[1] > topCounter) {\n            topKind = entry[0];\n            topCounter = entry[1];\n        }\n    }\n    return topKind;\n}\nfunction partition(src, predicate) {\n    const matches = [];\n    const rest = [];\n    for (const x of src) {\n        if (predicate(x)) {\n            matches.push(x);\n        }\n        else {\n            rest.push(x);\n        }\n    }\n    return { matches, rest };\n}\nfunction partition1(src, predicate) {\n    const matches = [];\n    const rest = [];\n    for (const x of src) {\n        if (predicate(x)) {\n            matches.push(x);\n        }\n        else {\n            rest.push(x);\n        }\n    }\n    return { matches, rest };\n}\n\nclass Picker {\n    constructor(f) {\n        this.f = f;\n    }\n    pickAll(el) {\n        return this.f(el);\n    }\n    pick1(el, preferFirst = false) {\n        const results = this.f(el);\n        const len = results.length;\n        if (len === 0) {\n            return null;\n        }\n        if (len === 1) {\n            return results[0].value;\n        }\n        const comparator = (preferFirst)\n            ? comparatorPreferFirst\n            : comparatorPreferLast;\n        let result = results[0];\n        for (let i = 1; i < len; i++) {\n            const next = results[i];\n            if (comparator(result, next)) {\n                result = next;\n            }\n        }\n        return result.value;\n    }\n}\nfunction comparatorPreferFirst(acc, next) {\n    const diff = (0,parseley__WEBPACK_IMPORTED_MODULE_0__.compareSpecificity)(next.specificity, acc.specificity);\n    return diff > 0 || (diff === 0 && next.index < acc.index);\n}\nfunction comparatorPreferLast(acc, next) {\n    const diff = (0,parseley__WEBPACK_IMPORTED_MODULE_0__.compareSpecificity)(next.specificity, acc.specificity);\n    return diff > 0 || (diff === 0 && next.index > acc.index);\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc2VsZGVyZWUvbGliL3NlbGRlcmVlLm1qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBcUM7QUFDUzs7QUFFOUM7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixZQUFZLEVBQUUsa0NBQWtDLEVBQUUsV0FBVztBQUN0RjtBQUNBO0FBQ0Esa0NBQWtDLHlDQUF5QztBQUMzRTtBQUNBLG9DQUFvQyxVQUFVLElBQUkseUNBQXlDO0FBQzNGO0FBQ0EsdUNBQXVDLFVBQVUsSUFBSSx3QkFBd0I7QUFDN0U7QUFDQSxzQ0FBc0MsZ0JBQWdCLElBQUksbUNBQW1DO0FBQzdGO0FBQ0EscUNBQXFDLG1DQUFtQztBQUN4RTtBQUNBLDBCQUEwQixXQUFXLElBQUksd0JBQXdCO0FBQ2pFO0FBQ0Esd0JBQXdCLGNBQWMsR0FBRyxXQUFXLEdBQUcsb0JBQW9CLElBQUksd0JBQXdCO0FBQ3ZHO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLFFBQVE7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixTQUFTO0FBQzdCO0FBQ0EsK0JBQStCLDRDQUFlO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSwrQ0FBa0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsNERBQWtCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiw0REFBa0I7QUFDbkM7QUFDQTs7QUFFdUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wcnVlYmEtdGVjbmljYS8uL25vZGVfbW9kdWxlcy9zZWxkZXJlZS9saWIvc2VsZGVyZWUubWpzP2I1MjgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgcGFyc2VsZXkgZnJvbSAncGFyc2VsZXknO1xuaW1wb3J0IHsgY29tcGFyZVNwZWNpZmljaXR5IH0gZnJvbSAncGFyc2VsZXknO1xuXG52YXIgQXN0ID0gLyojX19QVVJFX18qL09iamVjdC5mcmVlemUoe1xuICAgIF9fcHJvdG9fXzogbnVsbFxufSk7XG5cbnZhciBUeXBlcyA9IC8qI19fUFVSRV9fKi9PYmplY3QuZnJlZXplKHtcbiAgICBfX3Byb3RvX186IG51bGxcbn0pO1xuXG5jb25zdCB0cmVlaWZ5ID0gKG5vZGVzKSA9PiAn4pa9XFxuJyArIHRyZWVpZnlBcnJheShub2RlcywgdGhpbkxpbmVzKTtcbmNvbnN0IHRoaW5MaW5lcyA9IFtbJ+KUnOKUgCcsICfilIIgJ10sIFsn4pSU4pSAJywgJyAgJ11dO1xuY29uc3QgaGVhdnlMaW5lcyA9IFtbJ+KUoOKUgCcsICfilIMgJ10sIFsn4pSW4pSAJywgJyAgJ11dO1xuY29uc3QgZG91YmxlTGluZXMgPSBbWyfilZ/ilIAnLCAn4pWRICddLCBbJ+KVmeKUgCcsICcgICddXTtcbmZ1bmN0aW9uIHRyZWVpZnlBcnJheShub2RlcywgdHBsID0gaGVhdnlMaW5lcykge1xuICAgIHJldHVybiBwcmVmaXhJdGVtcyh0cGwsIG5vZGVzLm1hcChuID0+IHRyZWVpZnlOb2RlKG4pKSk7XG59XG5mdW5jdGlvbiB0cmVlaWZ5Tm9kZShub2RlKSB7XG4gICAgc3dpdGNoIChub2RlLnR5cGUpIHtcbiAgICAgICAgY2FzZSAndGVybWluYWwnOiB7XG4gICAgICAgICAgICBjb25zdCB2Y3RyID0gbm9kZS52YWx1ZUNvbnRhaW5lcjtcbiAgICAgICAgICAgIHJldHVybiBg4peBICMke3ZjdHIuaW5kZXh9ICR7SlNPTi5zdHJpbmdpZnkodmN0ci5zcGVjaWZpY2l0eSl9ICR7dmN0ci52YWx1ZX1gO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3RhZ05hbWUnOlxuICAgICAgICAgICAgcmV0dXJuIGDil7sgVGFnIG5hbWVcXG4ke3RyZWVpZnlBcnJheShub2RlLnZhcmlhbnRzLCBkb3VibGVMaW5lcyl9YDtcbiAgICAgICAgY2FzZSAnYXR0clZhbHVlJzpcbiAgICAgICAgICAgIHJldHVybiBg4pajIEF0dHIgdmFsdWU6ICR7bm9kZS5uYW1lfVxcbiR7dHJlZWlmeUFycmF5KG5vZGUubWF0Y2hlcnMsIGRvdWJsZUxpbmVzKX1gO1xuICAgICAgICBjYXNlICdhdHRyUHJlc2VuY2UnOlxuICAgICAgICAgICAgcmV0dXJuIGDil6ggQXR0ciBwcmVzZW5jZTogJHtub2RlLm5hbWV9XFxuJHt0cmVlaWZ5QXJyYXkobm9kZS5jb250KX1gO1xuICAgICAgICBjYXNlICdwdXNoRWxlbWVudCc6XG4gICAgICAgICAgICByZXR1cm4gYOKXiSBQdXNoIGVsZW1lbnQ6ICR7bm9kZS5jb21iaW5hdG9yfVxcbiR7dHJlZWlmeUFycmF5KG5vZGUuY29udCwgdGhpbkxpbmVzKX1gO1xuICAgICAgICBjYXNlICdwb3BFbGVtZW50JzpcbiAgICAgICAgICAgIHJldHVybiBg4peMIFBvcCBlbGVtZW50XFxuJHt0cmVlaWZ5QXJyYXkobm9kZS5jb250LCB0aGluTGluZXMpfWA7XG4gICAgICAgIGNhc2UgJ3ZhcmlhbnQnOlxuICAgICAgICAgICAgcmV0dXJuIGDil4cgPSAke25vZGUudmFsdWV9XFxuJHt0cmVlaWZ5QXJyYXkobm9kZS5jb250KX1gO1xuICAgICAgICBjYXNlICdtYXRjaGVyJzpcbiAgICAgICAgICAgIHJldHVybiBg4peIICR7bm9kZS5tYXRjaGVyfSBcIiR7bm9kZS52YWx1ZX1cIiR7bm9kZS5tb2RpZmllciB8fCAnJ31cXG4ke3RyZWVpZnlBcnJheShub2RlLmNvbnQpfWA7XG4gICAgfVxufVxuZnVuY3Rpb24gcHJlZml4SXRlbXModHBsLCBpdGVtcykge1xuICAgIHJldHVybiBpdGVtc1xuICAgICAgICAubWFwKChpdGVtLCBpLCB7IGxlbmd0aCB9KSA9PiBwcmVmaXhJdGVtKHRwbCwgaXRlbSwgaSA9PT0gbGVuZ3RoIC0gMSkpXG4gICAgICAgIC5qb2luKCdcXG4nKTtcbn1cbmZ1bmN0aW9uIHByZWZpeEl0ZW0odHBsLCBpdGVtLCB0YWlsID0gdHJ1ZSkge1xuICAgIGNvbnN0IHRwbDEgPSB0cGxbdGFpbCA/IDEgOiAwXTtcbiAgICByZXR1cm4gdHBsMVswXSArIGl0ZW0uc3BsaXQoJ1xcbicpLmpvaW4oJ1xcbicgKyB0cGwxWzFdKTtcbn1cblxudmFyIFRyZWVpZnlCdWlsZGVyID0gLyojX19QVVJFX18qL09iamVjdC5mcmVlemUoe1xuICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICB0cmVlaWZ5OiB0cmVlaWZ5XG59KTtcblxuY2xhc3MgRGVjaXNpb25UcmVlIHtcbiAgICBjb25zdHJ1Y3RvcihpbnB1dCkge1xuICAgICAgICB0aGlzLmJyYW5jaGVzID0gd2VhdmUodG9Bc3RUZXJtaW5hbFBhaXJzKGlucHV0KSk7XG4gICAgfVxuICAgIGJ1aWxkKGJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGJ1aWxkZXIodGhpcy5icmFuY2hlcyk7XG4gICAgfVxufVxuZnVuY3Rpb24gdG9Bc3RUZXJtaW5hbFBhaXJzKGFycmF5KSB7XG4gICAgY29uc3QgbGVuID0gYXJyYXkubGVuZ3RoO1xuICAgIGNvbnN0IHJlc3VsdHMgPSBuZXcgQXJyYXkobGVuKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGNvbnN0IFtzZWxlY3RvclN0cmluZywgdmFsXSA9IGFycmF5W2ldO1xuICAgICAgICBjb25zdCBhc3QgPSBwcmVwcm9jZXNzKHBhcnNlbGV5LnBhcnNlMShzZWxlY3RvclN0cmluZykpO1xuICAgICAgICByZXN1bHRzW2ldID0ge1xuICAgICAgICAgICAgYXN0OiBhc3QsXG4gICAgICAgICAgICB0ZXJtaW5hbDoge1xuICAgICAgICAgICAgICAgIHR5cGU6ICd0ZXJtaW5hbCcsXG4gICAgICAgICAgICAgICAgdmFsdWVDb250YWluZXI6IHsgaW5kZXg6IGksIHZhbHVlOiB2YWwsIHNwZWNpZmljaXR5OiBhc3Quc3BlY2lmaWNpdHkgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0cztcbn1cbmZ1bmN0aW9uIHByZXByb2Nlc3MoYXN0KSB7XG4gICAgcmVkdWNlU2VsZWN0b3JWYXJpYW50cyhhc3QpO1xuICAgIHBhcnNlbGV5Lm5vcm1hbGl6ZShhc3QpO1xuICAgIHJldHVybiBhc3Q7XG59XG5mdW5jdGlvbiByZWR1Y2VTZWxlY3RvclZhcmlhbnRzKGFzdCkge1xuICAgIGNvbnN0IG5ld0xpc3QgPSBbXTtcbiAgICBhc3QubGlzdC5mb3JFYWNoKHNlbCA9PiB7XG4gICAgICAgIHN3aXRjaCAoc2VsLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2NsYXNzJzpcbiAgICAgICAgICAgICAgICBuZXdMaXN0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBtYXRjaGVyOiAnfj0nLFxuICAgICAgICAgICAgICAgICAgICBtb2RpZmllcjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2NsYXNzJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZXNwYWNlOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBzcGVjaWZpY2l0eTogc2VsLnNwZWNpZmljaXR5LFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnYXR0clZhbHVlJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHNlbC5uYW1lLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnaWQnOlxuICAgICAgICAgICAgICAgIG5ld0xpc3QucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIG1hdGNoZXI6ICc9JyxcbiAgICAgICAgICAgICAgICAgICAgbW9kaWZpZXI6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdpZCcsXG4gICAgICAgICAgICAgICAgICAgIG5hbWVzcGFjZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgc3BlY2lmaWNpdHk6IHNlbC5zcGVjaWZpY2l0eSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2F0dHJWYWx1ZScsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBzZWwubmFtZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2NvbWJpbmF0b3InOlxuICAgICAgICAgICAgICAgIHJlZHVjZVNlbGVjdG9yVmFyaWFudHMoc2VsLmxlZnQpO1xuICAgICAgICAgICAgICAgIG5ld0xpc3QucHVzaChzZWwpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndW5pdmVyc2FsJzpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgbmV3TGlzdC5wdXNoKHNlbCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBhc3QubGlzdCA9IG5ld0xpc3Q7XG59XG5mdW5jdGlvbiB3ZWF2ZShpdGVtcykge1xuICAgIGNvbnN0IGJyYW5jaGVzID0gW107XG4gICAgd2hpbGUgKGl0ZW1zLmxlbmd0aCkge1xuICAgICAgICBjb25zdCB0b3BLaW5kID0gZmluZFRvcEtleShpdGVtcywgKHNlbCkgPT4gdHJ1ZSwgZ2V0U2VsZWN0b3JLaW5kKTtcbiAgICAgICAgY29uc3QgeyBtYXRjaGVzLCBub25tYXRjaGVzLCBlbXB0eSB9ID0gYnJlYWtCeUtpbmQoaXRlbXMsIHRvcEtpbmQpO1xuICAgICAgICBpdGVtcyA9IG5vbm1hdGNoZXM7XG4gICAgICAgIGlmIChtYXRjaGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgYnJhbmNoZXMucHVzaChicmFuY2hPZktpbmQodG9wS2luZCwgbWF0Y2hlcykpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlbXB0eS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGJyYW5jaGVzLnB1c2goLi4udGVybWluYXRlKGVtcHR5KSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGJyYW5jaGVzO1xufVxuZnVuY3Rpb24gdGVybWluYXRlKGl0ZW1zKSB7XG4gICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgICBjb25zdCB0ZXJtaW5hbCA9IGl0ZW0udGVybWluYWw7XG4gICAgICAgIGlmICh0ZXJtaW5hbC50eXBlID09PSAndGVybWluYWwnKSB7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2godGVybWluYWwpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgeyBtYXRjaGVzLCByZXN0IH0gPSBwYXJ0aXRpb24odGVybWluYWwuY29udCwgKG5vZGUpID0+IG5vZGUudHlwZSA9PT0gJ3Rlcm1pbmFsJyk7XG4gICAgICAgICAgICBtYXRjaGVzLmZvckVhY2goKG5vZGUpID0+IHJlc3VsdHMucHVzaChub2RlKSk7XG4gICAgICAgICAgICBpZiAocmVzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0ZXJtaW5hbC5jb250ID0gcmVzdDtcbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2godGVybWluYWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xufVxuZnVuY3Rpb24gYnJlYWtCeUtpbmQoaXRlbXMsIHNlbGVjdGVkS2luZCkge1xuICAgIGNvbnN0IG1hdGNoZXMgPSBbXTtcbiAgICBjb25zdCBub25tYXRjaGVzID0gW107XG4gICAgY29uc3QgZW1wdHkgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgICAgY29uc3Qgc2ltcHNlbHMgPSBpdGVtLmFzdC5saXN0O1xuICAgICAgICBpZiAoc2ltcHNlbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBpc01hdGNoID0gc2ltcHNlbHMuc29tZShub2RlID0+IGdldFNlbGVjdG9yS2luZChub2RlKSA9PT0gc2VsZWN0ZWRLaW5kKTtcbiAgICAgICAgICAgIChpc01hdGNoID8gbWF0Y2hlcyA6IG5vbm1hdGNoZXMpLnB1c2goaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbXB0eS5wdXNoKGl0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IG1hdGNoZXMsIG5vbm1hdGNoZXMsIGVtcHR5IH07XG59XG5mdW5jdGlvbiBnZXRTZWxlY3RvcktpbmQoc2VsKSB7XG4gICAgc3dpdGNoIChzZWwudHlwZSkge1xuICAgICAgICBjYXNlICdhdHRyUHJlc2VuY2UnOlxuICAgICAgICAgICAgcmV0dXJuIGBhdHRyUHJlc2VuY2UgJHtzZWwubmFtZX1gO1xuICAgICAgICBjYXNlICdhdHRyVmFsdWUnOlxuICAgICAgICAgICAgcmV0dXJuIGBhdHRyVmFsdWUgJHtzZWwubmFtZX1gO1xuICAgICAgICBjYXNlICdjb21iaW5hdG9yJzpcbiAgICAgICAgICAgIHJldHVybiBgY29tYmluYXRvciAke3NlbC5jb21iaW5hdG9yfWA7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc2VsLnR5cGU7XG4gICAgfVxufVxuZnVuY3Rpb24gYnJhbmNoT2ZLaW5kKGtpbmQsIGl0ZW1zKSB7XG4gICAgaWYgKGtpbmQgPT09ICd0YWcnKSB7XG4gICAgICAgIHJldHVybiB0YWdOYW1lQnJhbmNoKGl0ZW1zKTtcbiAgICB9XG4gICAgaWYgKGtpbmQuc3RhcnRzV2l0aCgnYXR0clZhbHVlICcpKSB7XG4gICAgICAgIHJldHVybiBhdHRyVmFsdWVCcmFuY2goa2luZC5zdWJzdHJpbmcoMTApLCBpdGVtcyk7XG4gICAgfVxuICAgIGlmIChraW5kLnN0YXJ0c1dpdGgoJ2F0dHJQcmVzZW5jZSAnKSkge1xuICAgICAgICByZXR1cm4gYXR0clByZXNlbmNlQnJhbmNoKGtpbmQuc3Vic3RyaW5nKDEzKSwgaXRlbXMpO1xuICAgIH1cbiAgICBpZiAoa2luZCA9PT0gJ2NvbWJpbmF0b3IgPicpIHtcbiAgICAgICAgcmV0dXJuIGNvbWJpbmF0b3JCcmFuY2goJz4nLCBpdGVtcyk7XG4gICAgfVxuICAgIGlmIChraW5kID09PSAnY29tYmluYXRvciArJykge1xuICAgICAgICByZXR1cm4gY29tYmluYXRvckJyYW5jaCgnKycsIGl0ZW1zKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBzZWxlY3RvciBraW5kOiAke2tpbmR9YCk7XG59XG5mdW5jdGlvbiB0YWdOYW1lQnJhbmNoKGl0ZW1zKSB7XG4gICAgY29uc3QgZ3JvdXBzID0gc3BsaWNlQW5kR3JvdXAoaXRlbXMsICh4KSA9PiB4LnR5cGUgPT09ICd0YWcnLCAoeCkgPT4geC5uYW1lKTtcbiAgICBjb25zdCB2YXJpYW50cyA9IE9iamVjdC5lbnRyaWVzKGdyb3VwcykubWFwKChbbmFtZSwgZ3JvdXBdKSA9PiAoe1xuICAgICAgICB0eXBlOiAndmFyaWFudCcsXG4gICAgICAgIHZhbHVlOiBuYW1lLFxuICAgICAgICBjb250OiB3ZWF2ZShncm91cC5pdGVtcylcbiAgICB9KSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ3RhZ05hbWUnLFxuICAgICAgICB2YXJpYW50czogdmFyaWFudHNcbiAgICB9O1xufVxuZnVuY3Rpb24gYXR0clByZXNlbmNlQnJhbmNoKG5hbWUsIGl0ZW1zKSB7XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgIHNwbGljZVNpbXBsZVNlbGVjdG9yKGl0ZW0sICh4KSA9PiAoeC50eXBlID09PSAnYXR0clByZXNlbmNlJykgJiYgKHgubmFtZSA9PT0gbmFtZSkpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnYXR0clByZXNlbmNlJyxcbiAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgY29udDogd2VhdmUoaXRlbXMpXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGF0dHJWYWx1ZUJyYW5jaChuYW1lLCBpdGVtcykge1xuICAgIGNvbnN0IGdyb3VwcyA9IHNwbGljZUFuZEdyb3VwKGl0ZW1zLCAoeCkgPT4gKHgudHlwZSA9PT0gJ2F0dHJWYWx1ZScpICYmICh4Lm5hbWUgPT09IG5hbWUpLCAoeCkgPT4gYCR7eC5tYXRjaGVyfSAke3gubW9kaWZpZXIgfHwgJyd9ICR7eC52YWx1ZX1gKTtcbiAgICBjb25zdCBtYXRjaGVycyA9IFtdO1xuICAgIGZvciAoY29uc3QgZ3JvdXAgb2YgT2JqZWN0LnZhbHVlcyhncm91cHMpKSB7XG4gICAgICAgIGNvbnN0IHNlbCA9IGdyb3VwLm9uZVNpbXBsZVNlbGVjdG9yO1xuICAgICAgICBjb25zdCBwcmVkaWNhdGUgPSBnZXRBdHRyUHJlZGljYXRlKHNlbCk7XG4gICAgICAgIGNvbnN0IGNvbnRpbnVhdGlvbiA9IHdlYXZlKGdyb3VwLml0ZW1zKTtcbiAgICAgICAgbWF0Y2hlcnMucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiAnbWF0Y2hlcicsXG4gICAgICAgICAgICBtYXRjaGVyOiBzZWwubWF0Y2hlcixcbiAgICAgICAgICAgIG1vZGlmaWVyOiBzZWwubW9kaWZpZXIsXG4gICAgICAgICAgICB2YWx1ZTogc2VsLnZhbHVlLFxuICAgICAgICAgICAgcHJlZGljYXRlOiBwcmVkaWNhdGUsXG4gICAgICAgICAgICBjb250OiBjb250aW51YXRpb25cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6ICdhdHRyVmFsdWUnLFxuICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICBtYXRjaGVyczogbWF0Y2hlcnNcbiAgICB9O1xufVxuZnVuY3Rpb24gZ2V0QXR0clByZWRpY2F0ZShzZWwpIHtcbiAgICBpZiAoc2VsLm1vZGlmaWVyID09PSAnaScpIHtcbiAgICAgICAgY29uc3QgZXhwZWN0ZWQgPSBzZWwudmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgc3dpdGNoIChzZWwubWF0Y2hlcikge1xuICAgICAgICAgICAgY2FzZSAnPSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIChhY3R1YWwpID0+IGV4cGVjdGVkID09PSBhY3R1YWwudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGNhc2UgJ349JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gKGFjdHVhbCkgPT4gYWN0dWFsLnRvTG93ZXJDYXNlKCkuc3BsaXQoL1sgXFx0XSsvKS5pbmNsdWRlcyhleHBlY3RlZCk7XG4gICAgICAgICAgICBjYXNlICdePSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIChhY3R1YWwpID0+IGFjdHVhbC50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoZXhwZWN0ZWQpO1xuICAgICAgICAgICAgY2FzZSAnJD0nOlxuICAgICAgICAgICAgICAgIHJldHVybiAoYWN0dWFsKSA9PiBhY3R1YWwudG9Mb3dlckNhc2UoKS5lbmRzV2l0aChleHBlY3RlZCk7XG4gICAgICAgICAgICBjYXNlICcqPSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIChhY3R1YWwpID0+IGFjdHVhbC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKGV4cGVjdGVkKTtcbiAgICAgICAgICAgIGNhc2UgJ3w9JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gKGFjdHVhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsb3dlciA9IGFjdHVhbC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGV4cGVjdGVkID09PSBsb3dlcikgfHwgKGxvd2VyLnN0YXJ0c1dpdGgoZXhwZWN0ZWQpICYmIGxvd2VyW2V4cGVjdGVkLmxlbmd0aF0gPT09ICctJyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc3QgZXhwZWN0ZWQgPSBzZWwudmFsdWU7XG4gICAgICAgIHN3aXRjaCAoc2VsLm1hdGNoZXIpIHtcbiAgICAgICAgICAgIGNhc2UgJz0nOlxuICAgICAgICAgICAgICAgIHJldHVybiAoYWN0dWFsKSA9PiBleHBlY3RlZCA9PT0gYWN0dWFsO1xuICAgICAgICAgICAgY2FzZSAnfj0nOlxuICAgICAgICAgICAgICAgIHJldHVybiAoYWN0dWFsKSA9PiBhY3R1YWwuc3BsaXQoL1sgXFx0XSsvKS5pbmNsdWRlcyhleHBlY3RlZCk7XG4gICAgICAgICAgICBjYXNlICdePSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIChhY3R1YWwpID0+IGFjdHVhbC5zdGFydHNXaXRoKGV4cGVjdGVkKTtcbiAgICAgICAgICAgIGNhc2UgJyQ9JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gKGFjdHVhbCkgPT4gYWN0dWFsLmVuZHNXaXRoKGV4cGVjdGVkKTtcbiAgICAgICAgICAgIGNhc2UgJyo9JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gKGFjdHVhbCkgPT4gYWN0dWFsLmluY2x1ZGVzKGV4cGVjdGVkKTtcbiAgICAgICAgICAgIGNhc2UgJ3w9JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gKGFjdHVhbCkgPT4gKGV4cGVjdGVkID09PSBhY3R1YWwpIHx8IChhY3R1YWwuc3RhcnRzV2l0aChleHBlY3RlZCkgJiYgYWN0dWFsW2V4cGVjdGVkLmxlbmd0aF0gPT09ICctJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBjb21iaW5hdG9yQnJhbmNoKGNvbWJpbmF0b3IsIGl0ZW1zKSB7XG4gICAgY29uc3QgZ3JvdXBzID0gc3BsaWNlQW5kR3JvdXAoaXRlbXMsICh4KSA9PiAoeC50eXBlID09PSAnY29tYmluYXRvcicpICYmICh4LmNvbWJpbmF0b3IgPT09IGNvbWJpbmF0b3IpLCAoeCkgPT4gcGFyc2VsZXkuc2VyaWFsaXplKHgubGVmdCkpO1xuICAgIGNvbnN0IGxlZnRJdGVtcyA9IFtdO1xuICAgIGZvciAoY29uc3QgZ3JvdXAgb2YgT2JqZWN0LnZhbHVlcyhncm91cHMpKSB7XG4gICAgICAgIGNvbnN0IHJpZ2h0Q29udCA9IHdlYXZlKGdyb3VwLml0ZW1zKTtcbiAgICAgICAgY29uc3QgbGVmdEFzdCA9IGdyb3VwLm9uZVNpbXBsZVNlbGVjdG9yLmxlZnQ7XG4gICAgICAgIGxlZnRJdGVtcy5wdXNoKHtcbiAgICAgICAgICAgIGFzdDogbGVmdEFzdCxcbiAgICAgICAgICAgIHRlcm1pbmFsOiB7IHR5cGU6ICdwb3BFbGVtZW50JywgY29udDogcmlnaHRDb250IH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6ICdwdXNoRWxlbWVudCcsXG4gICAgICAgIGNvbWJpbmF0b3I6IGNvbWJpbmF0b3IsXG4gICAgICAgIGNvbnQ6IHdlYXZlKGxlZnRJdGVtcylcbiAgICB9O1xufVxuZnVuY3Rpb24gc3BsaWNlQW5kR3JvdXAoaXRlbXMsIHByZWRpY2F0ZSwga2V5Q2FsbGJhY2spIHtcbiAgICBjb25zdCBncm91cHMgPSB7fTtcbiAgICB3aGlsZSAoaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IGJlc3RLZXkgPSBmaW5kVG9wS2V5KGl0ZW1zLCBwcmVkaWNhdGUsIGtleUNhbGxiYWNrKTtcbiAgICAgICAgY29uc3QgYmVzdEtleVByZWRpY2F0ZSA9IChzZWwpID0+IHByZWRpY2F0ZShzZWwpICYmIGtleUNhbGxiYWNrKHNlbCkgPT09IGJlc3RLZXk7XG4gICAgICAgIGNvbnN0IGhhc0Jlc3RLZXlQcmVkaWNhdGUgPSAoaXRlbSkgPT4gaXRlbS5hc3QubGlzdC5zb21lKGJlc3RLZXlQcmVkaWNhdGUpO1xuICAgICAgICBjb25zdCB7IG1hdGNoZXMsIHJlc3QgfSA9IHBhcnRpdGlvbjEoaXRlbXMsIGhhc0Jlc3RLZXlQcmVkaWNhdGUpO1xuICAgICAgICBsZXQgb25lU2ltcGxlU2VsZWN0b3IgPSBudWxsO1xuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgbWF0Y2hlcykge1xuICAgICAgICAgICAgY29uc3Qgc3BsaWNlZE5vZGUgPSBzcGxpY2VTaW1wbGVTZWxlY3RvcihpdGVtLCBiZXN0S2V5UHJlZGljYXRlKTtcbiAgICAgICAgICAgIGlmICghb25lU2ltcGxlU2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICBvbmVTaW1wbGVTZWxlY3RvciA9IHNwbGljZWROb2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChvbmVTaW1wbGVTZWxlY3RvciA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHNpbXBsZSBzZWxlY3RvciBpcyBmb3VuZC4nKTtcbiAgICAgICAgfVxuICAgICAgICBncm91cHNbYmVzdEtleV0gPSB7IG9uZVNpbXBsZVNlbGVjdG9yOiBvbmVTaW1wbGVTZWxlY3RvciwgaXRlbXM6IG1hdGNoZXMgfTtcbiAgICAgICAgaXRlbXMgPSByZXN0O1xuICAgIH1cbiAgICByZXR1cm4gZ3JvdXBzO1xufVxuZnVuY3Rpb24gc3BsaWNlU2ltcGxlU2VsZWN0b3IoaXRlbSwgcHJlZGljYXRlKSB7XG4gICAgY29uc3Qgc2ltcHNlbHMgPSBpdGVtLmFzdC5saXN0O1xuICAgIGNvbnN0IG1hdGNoZXMgPSBuZXcgQXJyYXkoc2ltcHNlbHMubGVuZ3RoKTtcbiAgICBsZXQgZmlyc3RJbmRleCA9IC0xO1xuICAgIGZvciAobGV0IGkgPSBzaW1wc2Vscy5sZW5ndGg7IGktLSA+IDA7KSB7XG4gICAgICAgIGlmIChwcmVkaWNhdGUoc2ltcHNlbHNbaV0pKSB7XG4gICAgICAgICAgICBtYXRjaGVzW2ldID0gdHJ1ZTtcbiAgICAgICAgICAgIGZpcnN0SW5kZXggPSBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChmaXJzdEluZGV4ID09IC0xKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGRuJ3QgZmluZCB0aGUgcmVxdWlyZWQgc2ltcGxlIHNlbGVjdG9yLmApO1xuICAgIH1cbiAgICBjb25zdCByZXN1bHQgPSBzaW1wc2Vsc1tmaXJzdEluZGV4XTtcbiAgICBpdGVtLmFzdC5saXN0ID0gc2ltcHNlbHMuZmlsdGVyKChzZWwsIGkpID0+ICFtYXRjaGVzW2ldKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gZmluZFRvcEtleShpdGVtcywgcHJlZGljYXRlLCBrZXlDYWxsYmFjaykge1xuICAgIGNvbnN0IGNhbmRpZGF0ZXMgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgICAgY29uc3QgY2FuZGlkYXRlczEgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBub2RlIG9mIGl0ZW0uYXN0Lmxpc3QuZmlsdGVyKHByZWRpY2F0ZSkpIHtcbiAgICAgICAgICAgIGNhbmRpZGF0ZXMxW2tleUNhbGxiYWNrKG5vZGUpXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoY2FuZGlkYXRlczEpKSB7XG4gICAgICAgICAgICBpZiAoY2FuZGlkYXRlc1trZXldKSB7XG4gICAgICAgICAgICAgICAgY2FuZGlkYXRlc1trZXldKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYW5kaWRhdGVzW2tleV0gPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGxldCB0b3BLaW5kID0gJyc7XG4gICAgbGV0IHRvcENvdW50ZXIgPSAwO1xuICAgIGZvciAoY29uc3QgZW50cnkgb2YgT2JqZWN0LmVudHJpZXMoY2FuZGlkYXRlcykpIHtcbiAgICAgICAgaWYgKGVudHJ5WzFdID4gdG9wQ291bnRlcikge1xuICAgICAgICAgICAgdG9wS2luZCA9IGVudHJ5WzBdO1xuICAgICAgICAgICAgdG9wQ291bnRlciA9IGVudHJ5WzFdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0b3BLaW5kO1xufVxuZnVuY3Rpb24gcGFydGl0aW9uKHNyYywgcHJlZGljYXRlKSB7XG4gICAgY29uc3QgbWF0Y2hlcyA9IFtdO1xuICAgIGNvbnN0IHJlc3QgPSBbXTtcbiAgICBmb3IgKGNvbnN0IHggb2Ygc3JjKSB7XG4gICAgICAgIGlmIChwcmVkaWNhdGUoeCkpIHtcbiAgICAgICAgICAgIG1hdGNoZXMucHVzaCh4KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlc3QucHVzaCh4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyBtYXRjaGVzLCByZXN0IH07XG59XG5mdW5jdGlvbiBwYXJ0aXRpb24xKHNyYywgcHJlZGljYXRlKSB7XG4gICAgY29uc3QgbWF0Y2hlcyA9IFtdO1xuICAgIGNvbnN0IHJlc3QgPSBbXTtcbiAgICBmb3IgKGNvbnN0IHggb2Ygc3JjKSB7XG4gICAgICAgIGlmIChwcmVkaWNhdGUoeCkpIHtcbiAgICAgICAgICAgIG1hdGNoZXMucHVzaCh4KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlc3QucHVzaCh4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyBtYXRjaGVzLCByZXN0IH07XG59XG5cbmNsYXNzIFBpY2tlciB7XG4gICAgY29uc3RydWN0b3IoZikge1xuICAgICAgICB0aGlzLmYgPSBmO1xuICAgIH1cbiAgICBwaWNrQWxsKGVsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmYoZWwpO1xuICAgIH1cbiAgICBwaWNrMShlbCwgcHJlZmVyRmlyc3QgPSBmYWxzZSkge1xuICAgICAgICBjb25zdCByZXN1bHRzID0gdGhpcy5mKGVsKTtcbiAgICAgICAgY29uc3QgbGVuID0gcmVzdWx0cy5sZW5ndGg7XG4gICAgICAgIGlmIChsZW4gPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsZW4gPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHRzWzBdLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbXBhcmF0b3IgPSAocHJlZmVyRmlyc3QpXG4gICAgICAgICAgICA/IGNvbXBhcmF0b3JQcmVmZXJGaXJzdFxuICAgICAgICAgICAgOiBjb21wYXJhdG9yUHJlZmVyTGFzdDtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHJlc3VsdHNbMF07XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHQgPSByZXN1bHRzW2ldO1xuICAgICAgICAgICAgaWYgKGNvbXBhcmF0b3IocmVzdWx0LCBuZXh0KSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdC52YWx1ZTtcbiAgICB9XG59XG5mdW5jdGlvbiBjb21wYXJhdG9yUHJlZmVyRmlyc3QoYWNjLCBuZXh0KSB7XG4gICAgY29uc3QgZGlmZiA9IGNvbXBhcmVTcGVjaWZpY2l0eShuZXh0LnNwZWNpZmljaXR5LCBhY2Muc3BlY2lmaWNpdHkpO1xuICAgIHJldHVybiBkaWZmID4gMCB8fCAoZGlmZiA9PT0gMCAmJiBuZXh0LmluZGV4IDwgYWNjLmluZGV4KTtcbn1cbmZ1bmN0aW9uIGNvbXBhcmF0b3JQcmVmZXJMYXN0KGFjYywgbmV4dCkge1xuICAgIGNvbnN0IGRpZmYgPSBjb21wYXJlU3BlY2lmaWNpdHkobmV4dC5zcGVjaWZpY2l0eSwgYWNjLnNwZWNpZmljaXR5KTtcbiAgICByZXR1cm4gZGlmZiA+IDAgfHwgKGRpZmYgPT09IDAgJiYgbmV4dC5pbmRleCA+IGFjYy5pbmRleCk7XG59XG5cbmV4cG9ydCB7IEFzdCwgRGVjaXNpb25UcmVlLCBQaWNrZXIsIFRyZWVpZnlCdWlsZGVyIGFzIFRyZWVpZnksIFR5cGVzIH07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/selderee/lib/selderee.mjs\n");

/***/ })

};
;