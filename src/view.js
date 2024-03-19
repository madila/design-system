/**
 * WordPress dependencies
 *
 *
 */
import {getElement, getContext, withScope, store} from '@wordpress/interactivity';
import {TFN} from "./helpers/timing-functions";

const {state, callbacks, actions} = store( 'design-system-frame', {
    state: {
        locked: false,
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
        lock: (e) => {
            const {ref} = getElement();

            state.x0 = actions.unify(e).clientX;
            state.locked = true;
            ref.classList.add('smooth');
        },
        unify: (e) => { return e.changedTouches ? e.changedTouches[0] : e },
        animate: () => {
            const { ref } = getElement();

            if(Number.isNaN(TFN['ease-out'](state.cf/state.anf))) return;

            ref.style.setProperty('--i', state.ini + (state.fin - state.ini)*TFN['ease-out'](state.cf/state.anf));

            if(state.cf === state.anf) {
                actions.stopAnimation();
            }

        },
        stopAnimation: () => {
            cancelAnimationFrame(state.rID);
            state.rID = null
        },
        drag: (e) => {
            e.preventDefault();
            if (!state.locked) return;

            const { ref } = getElement();

            const unifiedX = actions.unify(e).clientX;

            ref.style.setProperty('--tx', `${Math.round(unifiedX - state.x0)}px`)

            let dx = unifiedX - state.x0,
                f = +(dx / state.w).toFixed(2);

            ref.style.setProperty('--i', state.i - f);

        },
        move: (e) => {
            if (!state.locked) return;

            let dx = actions.unify(e).clientX - state.x0,
                s = Math.sign(dx),
                f = +(s*dx/state.w).toFixed(2);

            state.ini = state.i - s*f;

            if((state.i > 0 || s < 0) && (state.i < state.N - 1 || s > 0) && f > .2) {
                state.i -= s;
                f = 1 - f
            }

            const { ref } = getElement();

            state.fin = state.i;
            state.anf = Math.round(f*state.NF);

            //ref.style.setProperty('--i', Math.round(state.fin.toFixed()));
            state.i = Math.round(state.fin.toFixed());

            //actions.animate();
            state.x0 = null;

            const swipe = new CustomEvent("frame-change-step", {
                detail: {
                    scroll: false,
                    getIndex: () => {
                        return state.fin
                    }
                },
                bubbles: true
            });

            ref.dispatchEvent(swipe);

            ref.classList.remove('smooth');
            state.locked = false;
        },
        keydown: (e) => {
            const {keyCode} = e;

            let nextFrame;

            switch (keyCode) {
                case 37:
                    e.preventDefault();
                    nextFrame = state.i - 1 < 0 ? 0 : state.i -1;
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
        go: (e) => {
            const {ref} = getElement();
            const context = getContext();


            context.dot.selected = true;
            state.i = parseInt(ref.dataset.index);
            state.fin = state.i.toFixed();
        },
        init: () => {
            const { ref } = getElement();
            const context = getContext();

            callbacks.size();

            state.N = ref.children.length;

            ref.style.setProperty('--n', state.N.toString());
            context.ready = true;

        }
    },
    callbacks: {
        size: () => {
            state.w = window.innerWidth
        },
        resetSelected: () => {
            const context = getContext('design-system-frame');
            context.list.forEach((item) => item.selected = item.index === state.i);
        }
    },
} );
