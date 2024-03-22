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
		n: null
	},
	actions: {
		runAnimation: (cf = 0) => {
			const context = getContext('design-system-frame');

			context.current = context.ini + (context.fin - context.ini)*callbacks.bounceOut(cf/context.anf);

			if(cf === context.anf) {
				actions.cancelAnimation();
				return
			}
			state.rID = requestAnimationFrame(withScope(() => actions.runAnimation(++cf)))

		},
		cancelAnimation: () => {
			cancelAnimationFrame(state.rID);
			state.rID = null
		},
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
			return e.changedTouches ? e.changedTouches[ 0 ] : e;
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

			context.drag = true;
			const { ref } = getElement();
			const unifiedX = actions.unify( e ).clientX;

			const dx = unifiedX - context.x0,
				f = +( dx / state.w ).toFixed( 2 );

			context.tension++;
			ref.parentElement.style.setProperty( '--i', `${ context.current - f }` );
			if(context.tension > 20) {
				actions.move(e);
			}
		},
		move: ( e ) => {
			const context = getContext();
			if ( ! context.locked ) {
				return;
			}
			context.drag = false;

			context.tension = 0;

			const dx = actions.unify( e ).clientX - context.x0;
			const s = Math.sign( dx );
			let	f = +( s * dx / state.w ).toFixed( 2 );

			context.ini = context.current - ( s * f );

			if ( ( context.current > 0 || s < 0 ) && ( context.current < context.N - 1 || s > 0 ) && f > .2 ) {
				context.current -= s;
				f = 1 - f;
			}

			context.fin = context.current;;

			context.anf = Math.round( f * state.NF );

			state.n = 2 + Math.round(f);
			actions.runAnimation();

			context.x0 = null;

			context.current = Math.round( context.fin.toFixed() );

			const { ref } = getElement();

			ref.onpointermove = null;
			ref.releasePointerCapture(e.pointerId);

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

			const { x, width } = ref.parentElement.parentElement.getBoundingClientRect();
			const { innerWidth } = window;
			ref.parentElement.style.setProperty( '--frame-offset-left', `${ x }px` );
			ref.parentElement.style.setProperty( '--frame-offset-right', `${ innerWidth - ( width + x ) }px` );
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
