( function () {
	function computeProgress( rect, viewportHeight, isPinned ) {
		var scrolled = viewportHeight - rect.top;
		// Pinned blocks (steps) end their progress where the sticky frame releases,
		// roughly rect.height. Un-pinned blocks (e.g. the hero) are often shorter
		// than one viewport, so they need the full enter-to-exit span instead, or
		// progress saturates at 1 the moment they appear.
		var scrollable = isPinned ? rect.height : rect.height + viewportHeight;
		return Math.min( 1, Math.max( 0, scrolled / Math.max( scrollable, 1 ) ) );
	}

	function init() {
		var galleries = document.querySelectorAll( '.spg-parallax-root' );
		if ( ! galleries.length ) {
			return;
		}

		var entries = Array.prototype.map.call( galleries, function ( gallery ) {
			var steps = gallery.querySelectorAll( '.wp-block-lucasr-scroll-parallax-step' );
			gallery.style.setProperty( '--spg-steps-count', Math.max( steps.length, 1 ) );
			return { gallery: gallery, steps: steps };
		} );

		var ticking = false;

		function updateAll() {
			var viewportHeight = window.innerHeight;

			entries.forEach( function ( entry ) {
				var rect = entry.gallery.getBoundingClientRect();
				var progress = computeProgress( rect, viewportHeight, entry.steps.length > 0 );
				entry.gallery.style.setProperty( '--spg-progress', progress );

				if ( ! entry.steps.length ) {
					return;
				}

				var activeIndex = Math.min(
					entry.steps.length - 1,
					Math.floor( progress * entry.steps.length )
				);

				entry.steps.forEach( function ( step, index ) {
					step.classList.toggle( 'is-active', index === activeIndex );
				} );
			} );

			ticking = false;
		}

		window.addEventListener(
			'scroll',
			function () {
				if ( ! ticking ) {
					window.requestAnimationFrame( updateAll );
					ticking = true;
				}
			},
			{ passive: true }
		);

		window.addEventListener( 'resize', updateAll );
		updateAll();
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
} )();
