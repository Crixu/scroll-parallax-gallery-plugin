=== Scroll Parallax Gallery Block ===
Contributors: crixu
Tags: parallax, gallery, scroll, block, images
Requires at least: 6.5
Tested up to: 7.1
Requires PHP: 7.4
Stable tag: 1.0.1
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

A Gutenberg block with rows of images that drift sideways at different speeds as the visitor scrolls the section into view.

== Description ==

Scroll Parallax Gallery Block adds three native blocks for building scroll-driven image sections without a page builder:

* **Scroll Parallax Gallery** — a pinned, sticky frame with a parallax image gallery on one side and a scroll-driven sequence of narrative steps on the other.
* **Scroll Parallax Hero** — a hero section with parallax images drifting in the background behind any content you place on top.
* **Scroll Step** — a single narrative step used inside the Gallery block; fades in as it becomes active while scrolling.

Everything is configured from the block inspector: add images per row from the Media Library, set each row's scroll speed, and adjust rotation, frame height, and overlay darkness to taste. No build tools, no external services, no tracking, and no options stored outside of the block content itself.

= Features =

* Multiple independently-speed image rows per block, for a layered parallax effect.
* Scroll-pinned narrative steps that highlight in sync with scroll position.
* Works with wide/full alignment, block gap, and color/spacing block supports.
* Responsive: parallax and pinning are disabled below the mobile breakpoint in favor of a simple stacked layout.
* No JavaScript framework or build step — plain enqueued scripts and CSS custom properties.

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/scroll-parallax-gallery` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress.
3. In the block editor, insert the "Scroll Parallax Gallery" or "Scroll Parallax Hero" block and add your images.

== Frequently Asked Questions ==

= Does this require a page builder or theme? =

No. It registers native Gutenberg blocks that work in any block theme or classic theme with block editor support.

= Does the parallax effect work on mobile? =

Below the tablet breakpoint (782px) the layout switches to a static stacked view: rows no longer drift and steps display without pinning, so the content is fully readable without relying on scroll effects.

= Can I control how many images are in each row? =

Yes. Each row has its own "Add images" control in the block sidebar, and images can be reordered by removing and re-adding them.

= Does this plugin send data anywhere or track visitors? =

No. It has no external HTTP requests, no analytics, and stores nothing beyond the block attributes already saved in your post content.

== Screenshots ==

1. The Scroll Parallax Gallery block in the editor: two rows of images alongside scroll-driven narrative steps.
2. The same gallery on the front end, mid-scroll: rows drifting sideways as the active step highlights.

== Changelog ==

= 1.0.1 =
* Fix: the gallery block's front-end output was missing the fade-mask class present in the editor preview, so rotated image rows could overflow their column and overlap the steps text. The front-end markup now matches the editor.

= 1.0.0 =
* Initial release.

== Upgrade Notice ==

= 1.0.1 =
Fixes a front-end layout bug where the gallery image rows could overlap the steps column.
