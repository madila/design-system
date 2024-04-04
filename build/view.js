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
const navigateToFrame = new CustomEvent('frame-navigates-to', {
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
    NF: 50,
    rID: null,
    n: null,
    clientX: 0,
    timer: null
  },
  actions: {
    _setFrame: () => {
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      context.locked = false;
      const target = ref.classList.contains('wp-block-design-system-frame') ? ref.firstElementChild : ref.parentElement;
      ref.closest('.wp-block-design-system-frame').classList.remove('scroll-smoothing');
      target.style.setProperty('--i', context.current);
      const {
        children
      } = target.firstElementChild;
      [...children].forEach((item, index) => {
        item.ariaCurrent = index === context.current ? 'step' : null;
      });
    },
    unify: e => {
      if (!e) return state.clientX;
      state.clientX = e.changedTouches ? e.changedTouches[0] : e;
      return state.clientX;
    },
    lock: e => {
      e.preventDefault();
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      const move = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.withScope)(e => {
        actions.move(e);
      });
      const drag = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.withScope)(e => {
        actions.drag(e);
      });
      ref.onmousemove = drag;
      ref.onmouseup = move;
      ref.onmouseleave = move;
      ref.ontouchmove = drag;
      ref.ontouchend = move;
      ref.ontouchcancel = move;
      context.x0 = actions.unify(e).clientX;
      context.locked = true;
      const frame = ref.closest('.wp-block-design-system-frame');
      frame.classList.add('scroll-smoothing');
      frame.classList.add('user-interacting');

      //e.hasOwnProperty('pointerId') && ref.setPointerCapture(e.pointerId);
    },
    drag: e => {
      e.preventDefault();
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      if (!context.locked) {
        return;
      }
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      context.tension++;
      const unifiedX = actions.unify(e).clientX;
      const dx = unifiedX - context.x0,
        threshold = +(dx / state.w).toFixed(2);
      const frame = context.current - threshold;
      ref.parentElement.style.setProperty('--i', `${frame}`);
      if (threshold > 0.8 || threshold < -0.4 || context.tension > 18) {
        actions.move(e);
      }
    },
    move: e => {
      e.preventDefault();
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      if (!context.locked) {
        actions._setFrame(e);
        return;
      }
      context.locked = false;
      context.tension = 0;
      const dx = actions.unify(e).clientX - context.x0;
      const s = Math.sign(dx);
      let f = +(s * dx / state.w).toFixed(2);
      const threshold = +(dx / state.w).toFixed(2);
      context.ini = context.current - s * f;
      context.fin = context.current;
      ref.onmousemove = null;
      ref.onmouseup = null;
      ref.onmouseleave = null;
      ref.ontouchmove = null;
      ref.ontouchend = null;
      ref.ontouchcancel = null;
      state.n = 2 + Math.round(f);
      context.x0 = null;
      if (!threshold) {
        actions._setFrame(e);
        return;
      }
      let nextFrame;
      if (threshold > 0) {
        nextFrame = context.current - 1;
        if (nextFrame <= 0) {
          nextFrame = 0;
        }
      } else {
        nextFrame = context.current + 1;
        const MaxLength = context.N - 1;
        if (nextFrame > MaxLength) {
          nextFrame = MaxLength;
        }
      }
      context.current = nextFrame;
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
      actions._setFrame(e);
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
    start: e => {
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      context.N = ref.children.length;
      context.ready = true;
      ref.parentElement.style.setProperty('--n', `${context.N}`);
      const {
        children
      } = ref;
      [...children].forEach((item, index) => {
        item.ariaCurrent = index === context.current ? 'step' : null;
        item.ariaRoleDescription = 'slide';
        item.role = 'tabpanel';
        item.id = `${ref.id}-${index}`;
      });
      actions.resize(e);
      actions._setFrame();
    },
    resize: e => {
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      const frame = ref.closest('.wp-block-design-system-frame');
      frame.classList.add('scroll-smoothing');
      const frameStyles = window.getComputedStyle(frame, null);
      let width = frame.clientWidth;
      width -= parseFloat(frameStyles.paddingLeft) + parseFloat(frameStyles.paddingRight);
      frame.style.setProperty('--inner-group-max-width', `${width}px`);
      const {
        innerWidth
      } = window;
      state.w = innerWidth;
    }
  },
  callbacks: {
    autoPlay: () => {
      setInterval((0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.withScope)(() => {}), 3_000);
    },
    size: event => {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      if (context.timer) clearTimeout(context.timer);
      context.timer = setTimeout((0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.withScope)(() => {
        actions.resize(event);
      }), 10, event);
    },
    resetSelected: () => {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)('design-system-frame');
      context.list.forEach(item => item.disabled = item.index === context.current ? 'true' : null);
    },
    bounceOut: (k, a = 2.75, b = 1.5) => {
      return 1 - Math.pow(1 - k, a) * Math.abs(Math.cos(Math.pow(k, b) * (state.n + .5) * Math.PI));
    }
  }
});
})();


//# sourceMappingURL=view.js.map