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
		clientX: 0
	},
	actions: {
		_setFrame: () => {
			const { ref } = getElement();
			const context = getContext();

			context.locked = false;
			const target = ref.classList.contains( 'wp-block-design-system-frame' ) ? ref.firstElementChild : ref.parentElement;

			target.style.setProperty( '--i', context.current );
			target.classList.remove( 'smooth' );

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
			const { ref } = getElement();
			const context = getContext();

			context.x0 = actions.unify( e ).clientX;
			context.locked = true;
			ref.parentElement.classList.add( 'smooth' );
			ref.onpointermove = withScope((e) => {
				actions.drag(e)
			});
			ref.setPointerCapture(e.pointerId);

		},
		drag: ( e ) => {
			e.preventDefault();
			const context = getContext();
			if ( ! context.locked ) {
				return;
			}

			const { ref } = getElement();

			context.drag = true;
			context.tension++;

			const unifiedX = actions.unify( e ).clientX;

			const dx = unifiedX - context.x0,
				threshold = +( dx / state.w ).toFixed( 2 );

			const frame = context.current - threshold;
			ref.parentElement.style.setProperty( '--i', `${ frame }` );

			if(threshold > 0.4 || threshold < -0.4 || context.tension > 12) {
				actions.move(e);
			}

		},
		move: ( e ) => {
			const context = getContext();
			if ( ! context.locked ) {
				return;
			}

			context.tension = 0;

			const dx = actions.unify( e ).clientX - context.x0;
			const s = Math.sign( dx );
			let	f = +( s * dx / state.w ).toFixed( 2 );

			const threshold = +( dx / state.w ).toFixed( 2 );

			context.ini = context.current - ( s * f );
			context.fin = context.current;

			const { ref } = getElement();

			ref.onpointermove = null;
			e && ref.releasePointerCapture(e.pointerId);

			state.n = 2 + Math.round(f);
			context.x0 = null;

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

			actions._setFrame();
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
		start: () => {
			const { ref } = getElement();
			const context = getContext();

			callbacks.size();

			context.N = ref.children.length;
			context.ready = true;

			const { x, width } = ref.parentElement.parentElement.getBoundingClientRect();
			const { innerWidth } = window;

			ref.parentElement.style.setProperty( '--n', `${ context.N }` );
			ref.parentElement.style.setProperty( '--frame-offset-left', `${ x }px` );
			ref.parentElement.style.setProperty( '--frame-offset-right', `${ innerWidth - ( width + x ) }px` );

			const { children } = ref;
			[ ...children ].forEach( ( item, index ) => {
				item.ariaCurrent = ( index === context.current ) ? 'step' : null;
				item.ariaRoleDescription = 'slide';
				item.role = 'tabpanel';
				item.id = `${ref.id}-${index}`;
			} );


			actions._setFrame();
		},
	},
	callbacks: {
		size: () => {
			state.w = window.innerWidth;
			const { ref } = getElement();

			const { x, width } = ref.parentElement.getBoundingClientRect();

			ref.parentElement.style.setProperty( '--inner-group-max-width', `${ width }px` );
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
