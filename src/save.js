/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {useInnerBlocksProps, useBlockProps} from '@wordpress/block-editor';
import {useEffect, useRef} from "@wordpress/element";
import {useSelect} from '@wordpress/data';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({clientId, attributes: {tagName: TagName, maxWidth: MaxWidth, navigation: Navigation}}) {


    const blockProps = useBlockProps.save({
        style: {
            '--inner-group-max-width': MaxWidth
        }
    });

    const dots = Navigation.map((dot, index) => {
        return {
            id: `slide-${parseInt(index)}`,
            href: `#slide-${parseInt(index)}`,
            index: parseInt(index),
            selected: false
        }
    });

    const {children, ...innerBlocksProps} = useInnerBlocksProps.save(blockProps);

    return (<TagName {...innerBlocksProps}
                 data-wp-interactive="design-system-frame"
                 data-wp-on--frame-navigates-to="actions.onNavigation"
                 data-wp-context={`{"ready": false, "list": ${JSON.stringify(dots)}}`}>
            <div className="wp-block-design-system-frame__track">
            <div className="wp-block-design-system-frame__inner-container"
                 data-wp-class--ready="context.ready"
                 data-wp-style----n="state.N"
                 data-wp-init--start="actions.start"
                 data-wp-on--pointerdown="actions.lock"
                 data-wp-on--pointermove="actions.drag"
                 data-wp-on--pointerout="actions.move"
                 data-wp-on--keydown="actions.keydown"
                 data-wp-on--pointerup="actions.move"
                 data-wp-on-window--resize="callbacks.size"
                 data-wp-watch="callbacks.resetSelected"
                 tabIndex="0">
                {children}
            </div>
            </div>
            <ul
                className="wp-block-design-system-frame__navigation">
                <template data-wp-each--dot="context.list"
                          data-wp-each-key="context.dot.id">
                    <li><a data-wp-bind--href="context.dot.href"
                           data-wp-on--click="actions.dispatchNavigationEvent"
                           className="wp-block-design-system-frame__navigation__dot"
                           data-wp-class--active="context.dot.selected"
                           data-wp-bind--data-index="context.dot.index"
                           data-wp-text="context.dot.index"></a></li>
                </template>
                { Navigation.map((dot, index) => {
                    return <li data-wp-each-child><a href={`#slide-${index}`} data-index={index}
                                  className="wp-block-design-system-frame__navigation__dot">{index}</a></li>
                }) }
            </ul>
        </TagName>);
}
