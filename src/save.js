/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @param {WPElement} element
 * @param {Object}    element.attributes
 * @param {string}    element.attributes.anchor
 * @param {string}    element.attributes.tagName
 * @param {string}    element.attributes.maxWidth
 * @param {Array}     element.attributes.navigation
 * @param {Array}     element.attributes.blockCount
 * @param {Array}     element.attributes.accentColor
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return { WPElement } Element to render.
 */
export default function save( { attributes: { anchor: Anchor, tagName: TagName, maxWidth: MaxWidth, blockCount: NavCount, navigation: Navigation, accentColor: AccentColor } } ) {

	const blockProps = useBlockProps.save( {
		style: {
			'--inner-group-max-width': MaxWidth,
			'--accent-color': AccentColor,
		}
	} );

	let dots = [];

	Navigation && Navigation.map( ( dot, index ) => {
		const intIndex = parseInt( index );
		dots.push( {
			id: `${ Anchor }-tab-${ intIndex }`,
			href: `#${ Anchor }-${ intIndex }`,
			index: intIndex,
			disabled: null
		});
	} );

	const { children, ...innerBlocksProps } = useInnerBlocksProps.save( blockProps );

	return ( <TagName { ...innerBlocksProps }
		aria-atomic="false"
		aria-live="polite"
		data-wp-interactive="design-system-frame"
		data-wp-on--frame-navigates-to="actions.onNavigation"
		data-wp-context={ `{"ready": false, "timer": null, "drag": false, "locked": false, "tension": 0, "x0": null, "N": ${ NavCount }, "ini": null, "fin": 0, "anf": null, "current": 0, "list": ${ JSON.stringify( dots ) }}` }>
		<div className="wp-block-design-system-frame__track">
			<div className="wp-block-design-system-frame__inner-container"
				role="group"
				aria-roledescription="carousel"
				data-wp-class--ready="context.ready"
				data-wp-init--start="actions.start"
				data-wp-on--touchstart="actions.lock"
				data-wp-on--mousedown="actions.lock"
				data-wp-on--keydown="actions.keydown"
				data-wp-on-window--resize="callbacks.size"
				data-wp-watch="callbacks.resetSelected"
				tabIndex="0">
				{ children }
			</div>
		</div>
		<tablist
			className="wp-block-design-system-frame__navigation" role="group" aria-label="Choose slide to display.">
			<template data-wp-each--dot="context.list"
				data-wp-each-key="context.dot.id">
				<tab data-wp-bind--data-href="context.dot.href"
					data-wp-on--click="actions.dispatchNavigationEvent"
					className="wp-block-design-system-frame__navigation__dot"
					data-wp-bind--aria-disabled="context.dot.disabled"
					data-wp-bind--data-index="context.dot.index"><span data-wp-text="context.dot.index"></span></tab>
			</template>
			{ Navigation && Navigation.map( ( dot, index ) => {
				return <a role="tab" key={ dot.id } id={ dot.id } aria-controls={dot.href} data-wp-each-child data-href={ dot.href } data-index={ index } className="wp-block-design-system-frame__navigation__dot"><span>{ index }</span></a>;
			} ) }
		</tablist>
	</TagName> );
}
