<?php
/**
 * Plugin Name:       Design System
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.5
 * Requires PHP:      7.0
 * Version:           0.1.3.1
 * Author:            Ruben Madila
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Github Plugin URI: madila/design-system
 * Primary Branch:    main
 * Text Domain:       design-system
 *
 * @package           Design System
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_design_system_frame_block_init() {
	register_block_type_from_metadata( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_design_system_frame_block_init' );


