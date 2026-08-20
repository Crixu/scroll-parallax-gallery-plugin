<?php
/**
 * Plugin Name: Scroll Parallax Gallery Block
 * Plugin URI: https://github.com/Crixu/wp-scroll-parallax-gallery-plugin
 * Description: A Gutenberg block with rows of images that drift sideways at different speeds as the visitor scrolls the section into view.
 * Version: 1.0.0
 * Requires at least: 6.5
 * Requires PHP: 7.4
 * Author: Lucas Radke
 * Author URI: https://crixu.blog/plugins
 * License: GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: scroll-parallax-gallery
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'SPG_BLOCK_DIR', __DIR__ );
define( 'SPG_BLOCK_URL', plugin_dir_url( __FILE__ ) );
define( 'SPG_BLOCK_VERSION', '1.0.0' );

add_action( 'init', 'spg_register_block' );

function spg_register_block() {
	wp_register_script(
		'scroll-parallax-gallery-editor',
		SPG_BLOCK_URL . 'index.js',
		array( 'wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n' ),
		SPG_BLOCK_VERSION,
		true
	);

	wp_register_style(
		'scroll-parallax-gallery-editor-style',
		SPG_BLOCK_URL . 'editor.css',
		array(),
		SPG_BLOCK_VERSION
	);

	wp_register_style(
		'scroll-parallax-gallery-style',
		SPG_BLOCK_URL . 'style.css',
		array(),
		SPG_BLOCK_VERSION
	);

	wp_register_script(
		'scroll-parallax-gallery-view',
		SPG_BLOCK_URL . 'view.js',
		array(),
		SPG_BLOCK_VERSION,
		true
	);

	register_block_type_from_metadata( SPG_BLOCK_DIR );
	register_block_type_from_metadata( SPG_BLOCK_DIR . '/step' );
	register_block_type_from_metadata( SPG_BLOCK_DIR . '/hero' );
}
