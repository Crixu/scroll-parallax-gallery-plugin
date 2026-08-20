# Scroll Parallax Gallery Block

A Gutenberg block plugin with rows of images that drift sideways at different speeds as the visitor scrolls the section into view. No build step, no dependencies — just plain JS and CSS.

Repo: https://github.com/Crixu/wp-scroll-parallax-gallery-plugin · Author: https://lucas-radke.de/#plugins

## Blocks

- **Scroll Parallax Gallery** (`lucasr/scroll-parallax-gallery`) — a pinned, sticky frame with a parallax image gallery on one side and a scroll-driven sequence of narrative steps on the other.
- **Scroll Parallax Hero** (`lucasr/scroll-parallax-hero`) — a hero section with parallax images drifting in the background behind any content you place on top.
- **Scroll Step** (`lucasr/scroll-parallax-step`) — a single narrative step used inside the Gallery block; fades in as it becomes active.

## Requirements

- WordPress 6.5+ (uses Block API v3)
- No build tools required — the plugin ships plain JS/CSS and registers blocks directly via `block.json`.

## Installation

1. Download or clone this repository into `wp-content/plugins/scroll-parallax-gallery`.
2. Activate **Scroll Parallax Gallery Block** from the Plugins screen.
3. Add the "Scroll Parallax Gallery" or "Scroll Parallax Hero" block from the block inserter.

## Usage

- **Gallery block**: open the "Row" panels in the block settings to add images and set each row's scroll speed (negative drifts left, positive drifts right). Add narrative steps in the right-hand column — each one fades in as the visitor scrolls it into view. Use "Frame height" and "Scroll distance per step" to control pacing.
- **Hero block**: add background image rows the same way, then place headings, text, and buttons on top. Adjust "Overlay darkness" for legibility.

## License

GPL-2.0-or-later. See [LICENSE](LICENSE).
