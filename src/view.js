/**
 * WordPress dependencies
 *
 *
 */
import { getElement, getContext, withScope, store } from '@wordpress/interactivity';
import { navigateToFrame } from './helpers/Events';

const { state, callbacks, actions } = store( 'design-system-frame', {
	state: {
		w: null,
		NF: 50,
		rID: null,
		n: null,
		clientX: 0,
		timer: null,
		output: null,
		endpointer: false,
		y: 0
	},
	actions: {
		_setFrame: () => {
			const { ref } = getElement();
			const context = getContext();

			context.locked = false;
			const target = ref.classList.contains( 'wp-block-design-system-frame' ) ? ref.firstElementChild : ref.parentElement;

			ref.closest('.wp-block-design-system-frame').classList.remove( 'scroll-smoothing' );
			target.style.setProperty( '--i', context.current );

			const { children } = target.firstElementChild;
			[ ...children ].forEach( ( item, index ) => {
				item.ariaCurrent = ( index === context.current ) ? 'step' : null;
			} );
		},
		unify: ( e ) => {
			if(!e) return state.clientX;
			state.clientX = e.changedTouches ? e.changedTouches[ 0 ] : e;
			return state.clientX;
		},
		lock: ( e ) => {
			e.preventDefault();

			const { ref } = getElement();
			const context = getContext();

			const move = withScope((e) => {
				actions.move(e);
			});

			const drag = withScope((e) => {
				actions.drag(e);
			});

			ref.onmousemove = drag;

			ref.onmouseup = move;

			ref.onmouseleave = move;

			ref.ontouchmove = drag;

			ref.ontouchend = move;

			ref.ontouchcancel = move;

			context.x0 = actions.unify( e ).clientX;
			context.locked = true;

			const frame = ref.closest('.wp-block-design-system-frame');
			frame.classList.add( 'scroll-smoothing' );
			frame.classList.add( 'user-interacting' );

			//e.hasOwnProperty('pointerId') && ref.setPointerCapture(e.pointerId);

		},
		drag: ( e ) => {
			e.preventDefault();

			const unifiedY = actions.unify( e ).clientY;

			const yThreshold = state.y - unifiedY;
			const isHorizontal = yThreshold > -3 && yThreshold < 3;

			const context = getContext();

			if ( ! context.locked || !isHorizontal ) {
				state.y = unifiedY;
				state.endpointer = false;
				//state.locked = false;
				return;
			}

			state.y = unifiedY;
			state.endpointer = true;

			const { ref } = getElement();

			context.tension++;

			const unifiedX = actions.unify( e ).clientX;

			const dx = unifiedX - context.x0,
				threshold = +( dx / state.w ).toFixed( 2 );

			const frame = context.current - threshold;

			ref.parentElement.style.setProperty( '--i', `${ frame }` );

			if(threshold > 0.8 || threshold < -0.4 || context.tension > 18) {
				actions.move(e);
			}

		},
		move: ( e ) => {
			e.preventDefault();

			const context = getContext();
			const { ref } = getElement();

			if (!context.locked) {
				return;
			}

			context.locked = false;

			context.tension = 0;

			const dx = actions.unify( e ).clientX - context.x0;
			const s = Math.sign( dx );
			let	f = +( s * dx / state.w ).toFixed( 2 );

			const threshold = +( dx / state.w ).toFixed( 2 );

			context.ini = context.current - ( s * f );
			context.fin = context.current;


			ref.onmousemove = null;

			ref.onmouseup = null;

			ref.onmouseleave = null;

			ref.ontouchmove = null;

			ref.ontouchend = null;

			ref.ontouchcancel = null;

			state.n = 2 + Math.round(f);
			context.x0 = null;

			if(!threshold && state.endpointer) {
				actions._setFrame( e );
				state.endpointer = false;
				return;
			}

			let nextFrame;

			if(threshold > 0) {
				nextFrame = context.current - 1;
				if(nextFrame <= 0) {
					nextFrame = 0;
				}
			} else {
				nextFrame = context.current + 1;
				const MaxLength = context.N - 1;
				if(nextFrame > MaxLength) {
					nextFrame = MaxLength;
				}
			}

			context.current = nextFrame;

			actions._setFrame( e );
			state.endpointer = false;

		},
		keydown: ( e ) => {
			const { keyCode } = e;

			const context = getContext();
			let nextFrame = context.current,
				foundIndex,
				shouldUpdate = false;

			switch ( keyCode ) {
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
		dispatchNavigationEvent: ( e ) => {
			e.preventDefault();

			const context = getContext();

			const { ref } = getElement();
			context.dot.selected = true;
			context.current = 'index' in ref.dataset ? parseInt( ref.dataset.index ) : context.current;

			ref.dispatchEvent( navigateToFrame );
		},
		onNavigation: ( e ) => {
			e.stopPropagation();
			actions._setFrame();
		},
		start: (e) => {
			const { ref } = getElement();
			const context = getContext();

			context.N = ref.children.length;
			context.ready = true;

			state.output = document.querySelector('#output');

			ref.parentElement.style.setProperty( '--n', `${ context.N }` );

			const { children } = ref;
			[ ...children ].forEach( ( item, index ) => {
				item.ariaCurrent = ( index === context.current ) ? 'step' : null;
				item.ariaRoleDescription = 'slide';
				item.role = 'tabpanel';
				item.id = `${ref.id}-${index}`;
			} );

			actions.resize(e);
			actions._setFrame();

		},
		resize: (e) => {

			const { ref } = getElement();

			const frame = ref.closest('.wp-block-design-system-frame');
			frame.classList.add('scroll-smoothing');

			const frameStyles = window.getComputedStyle(frame, null)
			let width = frame.clientWidth;
				width -=
				parseFloat(frameStyles.paddingLeft) +
				parseFloat(frameStyles.paddingRight);

			frame.style.setProperty( '--inner-group-max-width', `${ width }px` );

			const { innerWidth } = window;
			state.w = innerWidth;

		}
	},
	callbacks: {
		autoPlay: () => {
			setInterval(
				withScope( () => {

				} ),
				3_000
			);
		},
		size: (event) => {
			const context = getContext();
			if(context.timer) clearTimeout(context.timer);
			context.timer = setTimeout(withScope(() => {
				actions.resize(event);
			}),10, event);
		},
		resetSelected: () => {
			const context = getContext( 'design-system-frame' );
			context.list.forEach( ( item ) => item.disabled = ( item.index === context.current ) ? 'true' : null );
		},
		bounceOut: (k, a = 2.75, b = 1.5) => {
			return 1 - Math.pow(1 - k, a)*Math.abs(Math.cos(Math.pow(k, b)*(state.n + .5)*Math.PI));
		}
	},
} );
