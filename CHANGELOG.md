# Changelog

## 1.0.4

- Fix: Plugin Name changed from "Scroll Parallax Gallery Block" to "Scroll Parallax Gallery" so the wp.org-assigned slug matches the `Text Domain` already used throughout the code.

## 1.0.3

- Change: Plugin URI and README updated to the renamed repository (github.com/crixu/scroll-parallax-gallery-plugin).

## 1.0.2

- Change: block namespace renamed from `lucasr/*` to `crixu/*` (`crixu/scroll-parallax-gallery`, `crixu/scroll-parallax-hero`, `crixu/scroll-parallax-step`).

## 1.0.1

- Fix: the gallery block's front-end (`save()`) output was missing the `spg-fade-mask` class that the editor preview applies to the media column. Without it, rotated image rows could overflow the column on the front end and overlap the steps text.

## 1.0.0

- Initial release.
- `lucasr/scroll-parallax-gallery`: pinned parallax gallery with scroll-driven narrative steps.
- `lucasr/scroll-parallax-hero`: parallax background hero with free-form content.
- `lucasr/scroll-parallax-step`: narrative step block used inside the gallery.
