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
 * @param {string}    element.clientId
 * @param {Object}    element.attributes
 * @param {string}    element.attributes.tagName
 * @param {string}    element.attributes.maxWidth
 * @param {Array}     element.attributes.navigation
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return { WPElement } Element to render.
 */
export default function save( { attributes: { blockId, tagName: TagName, maxWidth: MaxWidth, navCount: NavCount, navigation: Navigation } } ) {
	const blockProps = useBlockProps.save( {
		style: {
			'--inner-group-max-width': MaxWidth,
		}
	} );

	console.log(blockId);

	const dots = Navigation.map( ( dot, index ) => {
		const intIndex = parseInt( index );
		return {
			id: `${ blockId }-tab-${ intIndex }`,
			href: `#${ blockId }-${ intIndex }`,
			index: intIndex,
			disabled: null
		};
	} );

	const { children, ...innerBlocksProps } = useInnerBlocksProps.save( blockProps );

	return ( <TagName { ...innerBlocksProps }
		aria-atomic="false"
		aria-live="polite"
		data-wp-interactive="design-system-frame"
		data-wp-on--frame-navigates-to="actions.onNavigation"
		data-wp-context={ `{"ready": false, "drag": false, "locked": false, "x0": null, "N": ${ NavCount }, "ini": null, "fin": 0, "anf": null, "current": 0, "list": ${ JSON.stringify( dots ) }}` }>
		<div className="wp-block-design-system-frame__track">
			<div className="wp-block-design-system-frame__inner-container"
				role="group" id={blockId}
				aria-roledescription="carousel"
				data-wp-class--ready="context.ready"
				data-wp-init--start="actions.start"
				data-wp-on--pointerdown="actions.lock"
				data-wp-on--pointermove="actions.drag"
				data-wp-on--pointerout="actions.move"
				data-wp-on--keydown="actions.keydown"
				data-wp-on--pointerup="actions.move"
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
					data-wp-bind--data-index="context.dot.index"
					data-wp-text="context.dot.index"></tab>
			</template>
			{ Navigation.map( ( dot, index ) => {
				return <a role="tab" key={ dot.id } id={ dot.id } aria-controls={dot.href} data-wp-each-child data-href={ dot.href } data-index={ index } className="wp-block-design-system-frame__navigation__dot">{ index }</a>;
			} ) }
		</tablist>
	</TagName> );
}
