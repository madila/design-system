import * as __WEBPACK_EXTERNAL_MODULE__wordpress_interactivity_8e89b257__ from "@wordpress/interactivity";
/******/ var __webpack_modules__ = ({

/***/ "./src/helpers/timing-functions.js":
/*!*****************************************!*\
  !*** ./src/helpers/timing-functions.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TFN: () => (/* binding */ TFN)
/* harmony export */ });
const TFN = {
  'linear': function (k) {
    return k;
  },
  'ease-in': function (k, e = 1.675) {
    return Math.pow(k, e);
  },
  'ease-out': function (k, e = 1.675) {
    return 1 - Math.pow(1 - k, e);
  },
  'ease-in-out': function (k) {
    return .5 * (Math.sin((k - .5) * Math.PI) + 1);
  },
  'bounce-out': function (k, n = 3, a = 2.75, b = 1.5) {
    return 1 - Math.pow(1 - k, a) * Math.abs(Math.cos(Math.pow(k, b) * (n + .5) * Math.PI));
  }
};

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
/* harmony import */ var _helpers_timing_functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/timing-functions */ "./src/helpers/timing-functions.js");
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
    locked: false,
    scrolled: false,
    w: null,
    x0: null,
    N: 0,
    ini: null,
    fin: 0,
    i: 0,
    rID: null,
    anf: null,
    NF: 30,
    cf: 0
  },
  actions: {
    lock: e => {
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      state.x0 = actions.unify(e).clientX;
      state.locked = true;
      ref.classList.add('smooth');
    },
    unify: e => {
      return e.changedTouches ? e.changedTouches[0] : e;
    },
    animate: () => {
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      if (Number.isNaN(_helpers_timing_functions__WEBPACK_IMPORTED_MODULE_1__.TFN['ease-out'](state.cf / state.anf))) return;
      ref.style.setProperty('--i', state.ini + (state.fin - state.ini) * _helpers_timing_functions__WEBPACK_IMPORTED_MODULE_1__.TFN['ease-out'](state.cf / state.anf));
      if (state.cf === state.anf) {
        actions.stopAnimation();
      }
    },
    stopAnimation: () => {
      cancelAnimationFrame(state.rID);
      state.rID = null;
    },
    drag: e => {
      e.preventDefault();
      if (!state.locked) return;
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      const unifiedX = actions.unify(e).clientX;
      ref.style.setProperty('--tx', `${Math.round(unifiedX - state.x0)}px`);
      let dx = unifiedX - state.x0,
        f = +(dx / state.w).toFixed(2);
      ref.style.setProperty('--i', state.i - f);
    },
    move: e => {
      if (!state.locked) return;
      let dx = actions.unify(e).clientX - state.x0,
        s = Math.sign(dx),
        f = +(s * dx / state.w).toFixed(2);
      state.ini = state.i - s * f;
      if ((state.i > 0 || s < 0) && (state.i < state.N - 1 || s > 0) && f > .2) {
        state.i -= s;
        f = 1 - f;
      }
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      state.fin = state.i;
      state.anf = Math.round(f * state.NF);

      //ref.style.setProperty('--i', Math.round(state.fin.toFixed()));
      state.i = Math.round(state.fin.toFixed());

      //actions.animate();
      state.x0 = null;
      const swipe = new CustomEvent("frame-change-step", {
        detail: {
          scroll: false,
          getIndex: () => {
            return state.fin;
          }
        },
        bubbles: true
      });
      ref.dispatchEvent(swipe);
      ref.classList.remove('smooth');
      state.locked = false;
    },
    keydown: e => {
      const {
        keyCode
      } = e;
      let nextFrame;
      switch (keyCode) {
        case 37:
          e.preventDefault();
          nextFrame = state.i - 1 < 0 ? 0 : state.i - 1;
          state.locked = true;
          break;
        case 39:
          e.preventDefault();
          nextFrame = state.i + 1 >= state.N ? state.i : state.i + 1;
          state.locked = true;
          break;
        default:
          nextFrame = state.i;
          state.locked = true;
          return false;
      }
      state.i = nextFrame;
      state.fin = state.i;
      //ref.style.setProperty('--i', state.i);
      state.locked = false;
    },
    go: e => {
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      context.dot.selected = true;
      state.i = parseInt(ref.dataset.index);
      state.fin = state.i.toFixed();
    },
    init: () => {
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      callbacks.size();
      state.N = ref.children.length;
      ref.style.setProperty('--n', state.N.toString());
      context.ready = true;
    }
  },
  callbacks: {
    size: () => {
      state.w = window.innerWidth;
    },
    resetSelected: () => {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)('design-system-frame');
      context.list.forEach(item => item.selected = item.index === state.i);
    }
  }
});
})();


//# sourceMappingURL=view.js.map