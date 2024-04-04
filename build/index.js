/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/edit.js":
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _frame_templates__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./frame-templates */ "./src/frame-templates.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */


/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */






/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Render inspector controls for the Group block.
 *
 * @param {Object}   props                 Component props.
 * @param {string}   props.tagName         The HTML tag name.
 * @param {Function} props.onSelectTagName onChange function for the SelectControl.
 *
 * @return {JSX.Element}                The control group.
 */
function GroupAdvancedEditControls({
  tagName,
  onSelectTagName
}) {
  const htmlElementMessages = {
    header: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('The <header> element should represent introductory content, typically a group of introductory or navigational aids.'),
    main: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('The <main> element should be used for the primary content of your document only. '),
    section: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("The <section> element should represent a standalone portion of the document that can't be better represented by another element."),
    article: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('The <article> element should represent a self-contained, syndicatable portion of the document.'),
    aside: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("The <aside> element should represent a portion of a document whose content is only indirectly related to the document's main content."),
    footer: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('The <footer> element should represent a footer for its nearest sectioning element (e.g.: <section>, <article>, <main> etc.).')
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, {
    group: "advanced"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    __nextHasNoMarginBottom: true,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('HTML element'),
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Default (<div>)'),
      value: 'div'
    }, {
      label: '<header>',
      value: 'header'
    }, {
      label: '<main>',
      value: 'main'
    }, {
      label: '<section>',
      value: 'section'
    }, {
      label: '<article>',
      value: 'article'
    }, {
      label: '<aside>',
      value: 'aside'
    }, {
      label: '<footer>',
      value: 'footer'
    }],
    value: tagName,
    onChange: onSelectTagName,
    help: htmlElementMessages[tagName]
  }));
}

/**
 * Render inspector controls for the Group block.
 *
 * @param {Object}   props                  Component props.
 * @param {string}   props.maxWidth         The HTML tag name.
 * @param {Function} props.onMaxWidthChange onChange function for the SelectControl.
 *
 * @return {JSX.Element}                The control group.
 */
function InnerGroupsControl({
  maxWidth,
  onMaxWidthChange
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, {
    key: "setting",
    group: "dimensions"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalUnitControl, {
    help: "Please select the maximum width of the content",
    value: maxWidth,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Max. Width'),
    onChange: onMaxWidthChange
  }));
}

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {WPElement} element
 * @param {number}    element.clientId
 * @param {Object}    element.attributes
 * @param {Function}  element.setAttributes
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
function Edit({
  clientId,
  attributes,
  setAttributes
}) {
  const {
    removeBlock
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.useDispatch)('core/block-editor');
  const {
    blockCount
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.useSelect)(select => ({
    blockCount: select('core/block-editor').getBlockCount(clientId)
  }));
  const {
    tagName: TagName = 'div',
    maxWidth: MaxWidth = '100%',
    blockId: BlockName = clientId,
    navigation: Navigation = []
  } = attributes;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useEffect)(() => {
    if (!BlockName) {
      setAttributes({
        blockId: clientId
      });
    }
  }, []);
  const previousBlockCount = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useRef)(blockCount);
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)({
    style: {
      '--inner-group-max-width': MaxWidth,
      '--child-count': blockCount
    }
  });
  const {
    children,
    ...innerBlocksProps
  } = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useInnerBlocksProps)(blockProps, {
    allowedBlocks: ['core/group'],
    template: _frame_templates__WEBPACK_IMPORTED_MODULE_4__.DEFAULT_TEMPLATE
  });
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useEffect)(() => {
    if (previousBlockCount.current > 0 && blockCount === 0) {
      removeBlock(clientId);
    }
    previousBlockCount.current = blockCount;
    const Dots = [...Array(blockCount)].map((e, i) => {
      return {
        dot: `#${BlockName}-${i + 1}`
      };
    });
    setAttributes({
      navigation: Dots,
      navCount: blockCount
    });
  }, [blockCount, clientId, removeBlock, setAttributes]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(GroupAdvancedEditControls, {
    tagName: TagName,
    onSelectTagName: value => setAttributes({
      tagName: value
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(InnerGroupsControl, {
    maxWidth: MaxWidth,
    onMaxWidthChange: value => {
      setAttributes({
        maxWidth: value
      });
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(TagName, {
    ...innerBlocksProps
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wp-block-design-system-frame__inner-container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wp-block-design-system-frame__track"
  }, children))));
}

/***/ }),

/***/ "./src/frame-templates.js":
/*!********************************!*\
  !*** ./src/frame-templates.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CARD_TEMPLATE: () => (/* binding */ CARD_TEMPLATE),
/* harmony export */   DEFAULT_TEMPLATE: () => (/* binding */ DEFAULT_TEMPLATE),
/* harmony export */   FLIP_FRAME: () => (/* binding */ FLIP_FRAME),
/* harmony export */   FRAME_TEMPLATES: () => (/* binding */ FRAME_TEMPLATES)
/* harmony export */ });
const FLIP_FRAME = [['core/group', {}], ['core/group', {}]];
const CARD_TEMPLATE = {
  template: FLIP_FRAME,
  allowedBlocks: ['core/group'],
  renderAppender: false
};
const DEFAULT_TEMPLATE = [['core/group', {}]];
const FRAME_TEMPLATES = [FLIP_FRAME, DEFAULT_TEMPLATE];

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/block.json");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */




/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ }),

/***/ "./src/save.js":
/*!*********************!*\
  !*** ./src/save.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */


/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @param {WPElement} element
 * @param {string}    element.clientId
 * @param {Object}    element.attributes
 * @param {string}    element.attributes.tagName
 * @param {string}    element.attributes.maxWidth
 * @param {Array}     element.attributes.navigation
 * @param {Array}     element.attributes.navCount
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return { WPElement } Element to render.
 */
function save({
  attributes: {
    blockId: BlockName,
    tagName: TagName,
    maxWidth: MaxWidth,
    blockCount: NavCount,
    navigation: Navigation
  }
}) {
  const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
    style: {
      '--inner-group-max-width': MaxWidth
    }
  });
  let dots = [];
  Navigation && Navigation.map((dot, index) => {
    const intIndex = parseInt(index);
    dots.push({
      id: `${BlockName}-tab-${intIndex}`,
      href: `#${BlockName}-${intIndex}`,
      index: intIndex,
      disabled: null
    });
  });
  const {
    children,
    ...innerBlocksProps
  } = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useInnerBlocksProps.save(blockProps);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(TagName, {
    ...innerBlocksProps,
    "aria-atomic": "false",
    "aria-live": "polite",
    "data-wp-interactive": "design-system-frame",
    "data-wp-on--frame-navigates-to": "actions.onNavigation",
    "data-wp-context": `{"ready": false, "timer": null, "drag": false, "locked": false, "tension": 0, "x0": null, "N": ${NavCount}, "ini": null, "fin": 0, "anf": null, "current": 0, "list": ${JSON.stringify(dots)}}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wp-block-design-system-frame__track"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wp-block-design-system-frame__inner-container",
    role: "group",
    id: BlockName,
    "aria-roledescription": "carousel",
    "data-wp-class--ready": "context.ready",
    "data-wp-init--start": "actions.start",
    "data-wp-on--touchstart": "actions.lock",
    "data-wp-on--mousedown": "actions.lock",
    "data-wp-on--keydown": "actions.keydown",
    "data-wp-on-window--resize": "callbacks.size",
    "data-wp-watch": "callbacks.resetSelected",
    tabIndex: "0"
  }, children)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tablist", {
    className: "wp-block-design-system-frame__navigation",
    role: "group",
    "aria-label": "Choose slide to display."
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("template", {
    "data-wp-each--dot": "context.list",
    "data-wp-each-key": "context.dot.id"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tab", {
    "data-wp-bind--data-href": "context.dot.href",
    "data-wp-on--click": "actions.dispatchNavigationEvent",
    className: "wp-block-design-system-frame__navigation__dot",
    "data-wp-bind--aria-disabled": "context.dot.disabled",
    "data-wp-bind--data-index": "context.dot.index"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    "data-wp-text": "context.dot.index"
  }))), Navigation && Navigation.map((dot, index) => {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      role: "tab",
      key: dot.id,
      id: dot.id,
      "aria-controls": dot.href,
      "data-wp-each-child": true,
      "data-href": dot.href,
      "data-index": index,
      className: "wp-block-design-system-frame__navigation__dot"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, index));
  })));
}

/***/ }),

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./src/block.json":
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"design-system/frame","version":"0.1.0","title":"Frame","category":"design","icon":"screenoptions","description":"Create all kind of visual displays.","example":{},"supports":{"__experimentalOnEnter":true,"__experimentalOnMerge":true,"__experimentalSettings":true,"align":true,"anchor":true,"ariaLabel":true,"html":false,"color":{"gradients":true,"heading":true,"link":true,"__experimentalDefaultControls":{"background":true,"text":true}},"shadow":true,"spacing":{"margin":["top","bottom"],"padding":true,"blockGap":true,"__experimentalDefaultControls":{"padding":true,"blockGap":true}},"dimensions":{"minHeight":true},"__experimentalBorder":{"color":true,"radius":true,"style":true,"width":true,"__experimentalDefaultControls":{"color":true,"radius":true,"style":true,"width":true}},"position":{"sticky":true},"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalFontWeight":true,"__experimentalFontStyle":true,"__experimentalTextTransform":true,"__experimentalTextDecoration":true,"__experimentalLetterSpacing":true,"__experimentalDefaultControls":{"fontSize":true}},"layout":{"allowSizingOnChildren":true,"default":{"type":"flex","orientation":"horizontal","flexWrap":"nowrap"}},"interactivity":true},"textdomain":"designsystem","attributes":{"maxWidth":{"type":"string","default":"100%"},"tagName":{"type":"string","default":"div"},"blockId":{"type":"string"},"blockCount":{"type":"number","default":0},"templateLock":{"type":["string","boolean"],"enum":["all","insert","contentOnly",false]},"allowedBlocks":{"type":"array"},"navigation":{"type":"array","source":"query","selector":".wp-block-design-system-frame__navigation__dot","query":{"dot":{"type":"string","source":"attribute","attribute":"data-href","default":"#"}}}},"editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","viewScriptModule":"file:./view.js"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkdesign_system"] = globalThis["webpackChunkdesign_system"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map