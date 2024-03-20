/**
 * WordPress dependencies
 *
 *
 */
import {getElement, getContext, withScope, store} from '@wordpress/interactivity';
import {navigateToFrame} from './helpers/Events';

const {state, callbacks, actions} = store( 'design-system-frame', {
    state: {
        locked: false,
        scrolled: false,
        drag: true,
        current: 0,
        w: null,
        x0: null,
        N: 0,
        ini: null,
        fin: 0,
        anf: null,
        NF: 30
    },
    actions: {
        _setFrame: () => {
            state.locked = false;
            const { ref } = getElement();

            const target = ref.classList.contains('wp-block-design-system-frame') ? ref.firstElementChild : ref.parentElement;

            console.log(target);

            target.style.setProperty('--i', state.current);
            target.classList.remove('smooth');
        },
        unify: (e) => { return e.changedTouches ? e.changedTouches[0] : e },
        lock: (e) => {
            const {ref} = getElement();

            state.x0 = actions.unify(e).clientX;
            state.locked = true;
            ref.parentElement.classList.add('smooth');
        },
        drag: (e) => {
            e.preventDefault();
            if (!state.locked) return;
            state.drag = true;
            const { ref } = getElement();
            const unifiedX = actions.unify(e).clientX;

            let dx = unifiedX - state.x0,
                f = +(dx / state.w).toFixed(2);

            ref.parentElement.style.setProperty('--i', `${state.current - f}`);
        },
        move: (e) => {
            if(!state.locked) return;
            state.drag = false;

            let dx = actions.unify(e).clientX - state.x0,
                s = Math.sign(dx),
                f = +(s*dx/state.w).toFixed(2);

            state.ini = state.current - s*f;

            if((state.current > 0 || s < 0) && (state.current < state.N - 1 || s > 0) && f > .2) {
                state.current -= s;
                f = 1 - f
            }

            const { ref } = getElement();

            state.fin = state.current;
            state.anf = Math.round(f*state.NF);

            state.x0 = null;

            state.current = Math.round(state.fin.toFixed());

            actions._setFrame(e);
        },
        keydown: (e) => {
            const { keyCode } = e;

            let nextFrame = state.current,
                foundIndex,
                shouldUpdate = false;

            switch (keyCode) {
                case 37:
                    e.preventDefault();
                    foundIndex = state.current - 1;
                    shouldUpdate = foundIndex < 0;
                    nextFrame = shouldUpdate ? 0 : foundIndex;
                    break;
                case 39:
                    e.preventDefault();
                    foundIndex = state.current + 1;
                    shouldUpdate = foundIndex >= state.N;
                    nextFrame = shouldUpdate ? state.current : foundIndex;
                    break;
                default:
                    break;
            }

            state.current = nextFrame;
            state.fin = state.current;
            state.locked = shouldUpdate;

            actions._setFrame();
        },
        dispatchNavigationEvent: (e) => {
            e.preventDefault();

            const context = getContext();

            const {ref} = getElement();
            context.dot.selected = true;
            state.current = 'index' in ref.dataset ? parseInt(ref.dataset.index) : state.current;

            ref.dispatchEvent(navigateToFrame);

        },
        onNavigation: function*(e) {
            e.stopPropagation();
            actions._setFrame();
        },
        start: () => {
            const { ref } = getElement();
            const context = getContext();

            callbacks.size();

            state.N = ref.children.length;
            context.ready = true;

            const { x, width } = ref.parentElement.parentElement.getBoundingClientRect();
            const { innerWidth } = window;
            ref.parentElement.style.setProperty('--frame-offset-left', `${x}px`);
            ref.parentElement.style.setProperty('--frame-offset-right', `${innerWidth - (width + x)}px`);
            actions._setFrame();
        }
    },
    callbacks: {
        size: () => {
            state.w = window.innerWidth;
            const { ref } = getElement();

            const { x, width } = ref.parentElement.parentElement.getBoundingClientRect();
            const { innerWidth } = window;
            ref.parentElement.style.setProperty('--frame-offset-left', `${x}px`);
            ref.parentElement.style.setProperty('--frame-offset-right', `${innerWidth - (width + x)}px`);
        },
        resetSelected: () => {
            const context = getContext('design-system-frame');
            context.list.forEach((item) => item.selected = item.index === state.current);
        }
    },
} );
