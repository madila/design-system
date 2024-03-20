import * as __WEBPACK_EXTERNAL_MODULE__wordpress_interactivity_8e89b257__ from "@wordpress/interactivity";
/******/ var __webpack_modules__ = ({

/***/ "./src/helpers/Events.js":
/*!*******************************!*\
  !*** ./src/helpers/Events.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   navigateToFrame: () => (/* binding */ navigateToFrame)
/* harmony export */ });
const navigateToFrame = new CustomEvent("frame-navigates-to", {
  bubbles: true
});

/***/ }),

/***/ "@wordpress/interactivity":
/*!*******************************************!*\
  !*** external "@wordpress/interactivity" ***!
  \*******************************************/
/***/ ((module) => {

var x = (y) => {
	var x = {}; __webpack_require__.d(x, y); return x
} 
var y = (x) => (() => (x))
module.exports = __WEBPACK_EXTERNAL_MODULE__wordpress_interactivity_8e89b257__;

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/interactivity */ "@wordpress/interactivity");
/* harmony import */ var _helpers_Events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/Events */ "./src/helpers/Events.js");
/**
 * WordPress dependencies
 *
 *
 */


const {
  state,
  callbacks,
  actions
} = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.store)('design-system-frame', {
  state: {
    w: null,
    NF: 30
  },
  actions: {
    _setFrame: () => {
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      context.locked = false;
      const target = ref.classList.contains('wp-block-design-system-frame') ? ref.firstElementChild : ref.parentElement;
      target.style.setProperty('--i', context.current);
      target.classList.remove('smooth');
      const {
        children
      } = target.firstElementChild;
      [...children].forEach((item, index) => {
        item.ariaCurrent = index === context.current ? 'step' : null;
      });
    },
    unify: e => {
      return e.changedTouches ? e.changedTouches[0] : e;
    },
    lock: e => {
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      context.x0 = actions.unify(e).clientX;
      context.locked = true;
      ref.parentElement.classList.add('smooth');
    },
    drag: e => {
      e.preventDefault();
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      if (!context.locked) return;
      context.drag = true;
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      const unifiedX = actions.unify(e).clientX;
      let dx = unifiedX - context.x0,
        f = +(dx / state.w).toFixed(2);
      ref.parentElement.style.setProperty('--i', `${context.current - f}`);
    },
    move: e => {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      if (!context.locked) return;
      context.drag = false;
      let dx = actions.unify(e).clientX - context.x0,
        s = Math.sign(dx),
        f = +(s * dx / state.w).toFixed(2);
      context.ini = context.current - s * f;
      if ((context.current > 0 || s < 0) && (context.current < context.N - 1 || s > 0) && f > .2) {
        context.current -= s;
        f = 1 - f;
      }
      context.fin = context.current;
      context.anf = Math.round(f * context.NF);
      context.x0 = null;
      context.current = Math.round(context.fin.toFixed());
      actions._setFrame(e);
    },
    keydown: e => {
      const {
        keyCode
      } = e;
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      let nextFrame = context.current,
        foundIndex,
        shouldUpdate = false;
      switch (keyCode) {
        case 37:
          e.preventDefault();
          foundIndex = context.current - 1;
          shouldUpdate = foundIndex < 0;
          nextFrame = shouldUpdate ? 0 : foundIndex;
          break;
        case 39:
          e.preventDefault();
          foundIndex = context.current + 1;
          shouldUpdate = foundIndex >= context.N;
          nextFrame = shouldUpdate ? context.current : foundIndex;
          break;
        default:
          break;
      }
      context.current = nextFrame;
      context.fin = context.current;
      context.locked = shouldUpdate;
      actions._setFrame();
    },
    dispatchNavigationEvent: e => {
      e.preventDefault();
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      context.dot.selected = true;
      context.current = 'index' in ref.dataset ? parseInt(ref.dataset.index) : context.current;
      ref.dispatchEvent(_helpers_Events__WEBPACK_IMPORTED_MODULE_1__.navigateToFrame);
    },
    onNavigation: e => {
      e.stopPropagation();
      actions._setFrame();
    },
    start: () => {
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      callbacks.size();
      context.N = ref.children.length;
      context.ready = true;
      const {
        x,
        width
      } = ref.parentElement.parentElement.getBoundingClientRect();
      const {
        innerWidth
      } = window;
      ref.parentElement.style.setProperty('--n', `${context.N}`);
      ref.parentElement.style.setProperty('--frame-offset-left', `${x}px`);
      ref.parentElement.style.setProperty('--frame-offset-right', `${innerWidth - (width + x)}px`);
      actions._setFrame();
    }
  },
  callbacks: {
    size: () => {
      state.w = window.innerWidth;
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      const {
        x,
        width
      } = ref.parentElement.parentElement.getBoundingClientRect();
      const {
        innerWidth
      } = window;
      ref.parentElement.style.setProperty('--frame-offset-left', `${x}px`);
      ref.parentElement.style.setProperty('--frame-offset-right', `${innerWidth - (width + x)}px`);
    },
    resetSelected: e => {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)('design-system-frame');
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      context.list.forEach(item => item.selected = item.index === context.current ? 'disabled' : null);
    }
  }
});
})();


//# sourceMappingURL=view.js.map