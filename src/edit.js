/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useInnerBlocksProps,
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';

import { SelectControl, __experimentalUnitControl as UnitControl } from '@wordpress/components';

import { DEFAULT_TEMPLATE } from './frame-templates';

import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * Render inspector controls for the Group block.
 *
 * @param {Object}   props                 Component props.
 * @param {string}   props.tagName         The HTML tag name.
 * @param {Function} props.onSelectTagName onChange function for the SelectControl.
 *
 * @return {JSX.Element}                The control group.
 */
function GroupAdvancedEditControls( { tagName, onSelectTagName } ) {
	const htmlElementMessages = {
		header: __(
			'The <header> element should represent introductory content, typically a group of introductory or navigational aids.'
		),
		main: __(
			'The <main> element should be used for the primary content of your document only. '
		),
		section: __(
			"The <section> element should represent a standalone portion of the document that can't be better represented by another element."
		),
		article: __(
			'The <article> element should represent a self-contained, syndicatable portion of the document.'
		),
		aside: __(
			"The <aside> element should represent a portion of a document whose content is only indirectly related to the document's main content."
		),
		footer: __(
			'The <footer> element should represent a footer for its nearest sectioning element (e.g.: <section>, <article>, <main> etc.).'
		),
	};
	return (
		<InspectorControls group="advanced">
			<SelectControl
				__nextHasNoMarginBottom
				label={ __( 'HTML element' ) }
				options={ [
					{ label: __( 'Default (<div>)' ), value: 'div' },
					{ label: '<header>', value: 'header' },
					{ label: '<main>', value: 'main' },
					{ label: '<section>', value: 'section' },
					{ label: '<article>', value: 'article' },
					{ label: '<aside>', value: 'aside' },
					{ label: '<footer>', value: 'footer' },
				] }
				value={ tagName }
				onChange={ onSelectTagName }
				help={ htmlElementMessages[ tagName ] }
			/>
		</InspectorControls>

	);
}

/**
 * Render inspector controls for the Group block.
 *
 * @param {Object}   props                  Component props.
 * @param {string}   props.maxWidth         The HTML tag name.
 * @param {Function} props.onMaxWidthChange onChange function for the SelectControl.
 *
 * @return {JSX.Element}                The control group.
 */
function InnerGroupsControl( { maxWidth, onMaxWidthChange } ) {
	return (
		<InspectorControls key="setting" group="dimensions">
			<UnitControl
				help="Please select the maximum width of the content"
				value={ maxWidth }
				label={ __( 'Max. Width' ) }
				onChange={ onMaxWidthChange }
			/>
		</InspectorControls>
	);
}

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {WPElement} element
 * @param {number}    element.clientId
 * @param {Object}    element.attributes
 * @param {Function}  element.setAttributes
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( {
	clientId,
	attributes,
	setAttributes,
} ) {
	const { removeBlock } = useDispatch( 'core/block-editor' );

	const { blockCount } = useSelect( ( select ) => ( {
		blockCount: select( 'core/block-editor' ).getBlockCount( clientId ),
	} ) );

	const {
		tagName: TagName = 'div',
		maxWidth: MaxWidth = '100%',
		blockId: BlockName = clientId,
		navigation: Navigation = []
	} = attributes;

	useEffect( () => {
		if ( ! BlockName ) {
			setAttributes( { blockId: clientId } );
		}
	}, [] );

	const previousBlockCount = useRef( blockCount );

	const blockProps = useBlockProps( {
		style: {
			'--inner-group-max-width': MaxWidth,
			'--child-count': blockCount.toNumber,
		},
	} );

	const { children, ...innerBlocksProps } = useInnerBlocksProps(
		blockProps,
		{
			allowedBlocks: [ 'core/group' ],
			template: DEFAULT_TEMPLATE,
		}
	);

	useEffect( () => {
		if ( previousBlockCount.current > 0 && blockCount === 0 ) {
			removeBlock( clientId );
		}

		previousBlockCount.current = blockCount;

		const Dots = [ ...Array( blockCount ) ].map( ( e, i ) => {
			return {
				dot: `#${BlockName}-${ i + 1 }`,
			};
		} );

		setAttributes( { navigation: Dots, navCount: blockCount } );
	}, [ blockCount, clientId, removeBlock, setAttributes ] );

	return (
		<>
			<GroupAdvancedEditControls
				tagName={ TagName }
				onSelectTagName={ ( value ) =>
					setAttributes( { tagName: value } )
				}
			/>
			<InnerGroupsControl
				maxWidth={ MaxWidth }
				onMaxWidthChange={ ( value ) => {
					setAttributes( { maxWidth: value } );
				} }
			/>
			<TagName { ...innerBlocksProps }>
				<div className="wp-block-design-system-frame__inner-container">
					{ children }
				</div>
			</TagName>
		</>
	);
}
