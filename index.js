( function ( blocks, blockEditor, element, components, i18n ) {
	var el = element.createElement;
	var Fragment = element.Fragment;
	var registerBlockType = blocks.registerBlockType;
	var useBlockProps = blockEditor.useBlockProps;
	var useInnerBlocksProps = blockEditor.useInnerBlocksProps;
	var InspectorControls = blockEditor.InspectorControls;
	var MediaUpload = blockEditor.MediaUpload;
	var MediaUploadCheck = blockEditor.MediaUploadCheck;
	var PanelBody = components.PanelBody;
	var RangeControl = components.RangeControl;
	var Button = components.Button;
	var __ = i18n.__;

	var STEPS_TEMPLATE = [
		[ 'crixu/scroll-parallax-step' ],
		[ 'crixu/scroll-parallax-step' ],
	];

	var HERO_TEMPLATE = [
		[ 'core/heading', { level: 2, placeholder: __( 'Your headline', 'scroll-parallax-gallery' ) } ],
		[ 'core/paragraph', { placeholder: __( 'A short line of supporting text.', 'scroll-parallax-gallery' ) } ],
		[ 'core/buttons', {}, [ [ 'core/button', { text: __( 'Call to action', 'scroll-parallax-gallery' ) } ] ] ],
	];

	// Shared row-editing UI, used by both the gallery and hero blocks.
	function buildRowPanels( rows, setAttributes ) {
		function updateRow( index, changes ) {
			var next = rows.slice();
			next[ index ] = Object.assign( {}, next[ index ], changes );
			setAttributes( { rows: next } );
		}

		function removeRow( index ) {
			var next = rows.slice();
			next.splice( index, 1 );
			setAttributes( { rows: next } );
		}

		function removeImage( rowIndex, imageIndex ) {
			var row = rows[ rowIndex ];
			var nextImages = row.images.slice();
			nextImages.splice( imageIndex, 1 );
			updateRow( rowIndex, { images: nextImages } );
		}

		return rows.map( function ( row, index ) {
			return el(
				PanelBody,
				{
					title: __( 'Row', 'scroll-parallax-gallery' ) + ' ' + ( index + 1 ),
					initialOpen: false,
					key: index,
				},
				el( RangeControl, {
					label: __( 'Speed', 'scroll-parallax-gallery' ),
					help: __( 'Negative moves left, positive moves right, as the visitor scrolls.', 'scroll-parallax-gallery' ),
					value: row.speed,
					onChange: function ( value ) {
						updateRow( index, { speed: value } );
					},
					min: -2,
					max: 2,
					step: 0.1,
				} ),
				el(
					'div',
					{ className: 'spg-editor-thumbs' },
					row.images.map( function ( img, imgIndex ) {
						return el(
							'div',
							{ className: 'spg-editor-thumb', key: img.id || imgIndex },
							el( 'img', { src: img.url, alt: img.alt || '' } ),
							el(
								Button,
								{
									isSmall: true,
									isDestructive: true,
									onClick: function () {
										removeImage( index, imgIndex );
									},
								},
								__( 'Remove', 'scroll-parallax-gallery' )
							)
						);
					} )
				),
				el(
					MediaUploadCheck,
					{},
					el( MediaUpload, {
						multiple: true,
						gallery: true,
						allowedTypes: [ 'image' ],
						onSelect: function ( media ) {
							var images = media.map( function ( item ) {
								return { id: item.id, url: item.url, alt: item.alt || '' };
							} );
							updateRow( index, { images: row.images.concat( images ) } );
						},
						render: function ( obj ) {
							return el(
								Button,
								{ isSecondary: true, onClick: obj.open },
								__( 'Add images', 'scroll-parallax-gallery' )
							);
						},
					} )
				),
				el(
					Button,
					{
						isDestructive: true,
						isLink: true,
						onClick: function () {
							removeRow( index );
						},
					},
					__( 'Remove row', 'scroll-parallax-gallery' )
				)
			);
		} );
	}

	function addRowAttribute( rows, setAttributes ) {
		setAttributes( { rows: rows.concat( [ { speed: 0.5, images: [] } ] ) } );
	}

	// Shared row markup, used by both the gallery and hero blocks.
	function renderRows( rows, isSave ) {
		return rows.map( function ( row, index ) {
			var wrapperProps = {
				className: 'spg-row',
				key: index,
				style: { '--spg-speed': row.speed },
			};
			if ( isSave ) {
				wrapperProps[ 'data-speed' ] = row.speed;
			}
			return el(
				'div',
				wrapperProps,
				row.images.map( function ( img, imgIndex ) {
					var imgProps = { key: img.id || imgIndex, src: img.url, alt: img.alt || '' };
					if ( isSave ) {
						imgProps.loading = 'lazy';
					}
					return el( 'img', imgProps );
				} )
			);
		} );
	}

	registerBlockType( 'crixu/scroll-parallax-gallery', {
		edit: function ( props ) {
			var attributes = props.attributes;
			var setAttributes = props.setAttributes;
			var rotation = attributes.rotation;
			var rows = attributes.rows;
			var stickyHeight = attributes.stickyHeight;
			var scrollPerStep = attributes.scrollPerStep;

			var blockProps = useBlockProps( {
				className: 'spg-parallax-root',
				style: {
					'--spg-rotation': rotation + 'deg',
					'--spg-sticky-height': stickyHeight + 'vh',
					'--spg-step-vh': scrollPerStep + 'vh',
				},
			} );

			var rowPanels = buildRowPanels( rows, setAttributes );
			var previewRows = renderRows( rows, false );

			var stepsProps = useInnerBlocksProps(
				{ className: 'spg-steps' },
				{
					allowedBlocks: [ 'crixu/scroll-parallax-step' ],
					template: STEPS_TEMPLATE,
					templateLock: false,
				}
			);

			return el(
				Fragment,
				{},
				el(
					InspectorControls,
					{},
					el(
						PanelBody,
						{ title: __( 'Gallery settings', 'scroll-parallax-gallery' ) },
						el( RangeControl, {
							label: __( 'Rotation (degrees)', 'scroll-parallax-gallery' ),
							value: rotation,
							onChange: function ( value ) {
								setAttributes( { rotation: value } );
							},
							min: -45,
							max: 45,
						} ),
						el( RangeControl, {
							label: __( 'Frame height (vh)', 'scroll-parallax-gallery' ),
							help: __( 'How tall the pinned area is while scrolling. 100 fills the screen edge to edge; lower it if you want a shorter frame.', 'scroll-parallax-gallery' ),
							value: stickyHeight,
							onChange: function ( value ) {
								setAttributes( { stickyHeight: value } );
							},
							min: 40,
							max: 100,
						} ),
						el( RangeControl, {
							label: __( 'Scroll distance per step (vh)', 'scroll-parallax-gallery' ),
							help: __( 'How much scrolling it takes to move from one step to the next. Higher is slower; this also sets the overall height of the block. Note: scrolling the block into view before it locks also uses up part of this budget, so raise this if steps flip by too fast right after it pins.', 'scroll-parallax-gallery' ),
							value: scrollPerStep,
							onChange: function ( value ) {
								setAttributes( { scrollPerStep: value } );
							},
							min: 50,
							max: 300,
							step: 10,
						} )
					),
					rowPanels,
					el(
						Button,
						{
							isPrimary: true,
							onClick: function () {
								addRowAttribute( rows, setAttributes );
							},
						},
						__( 'Add row', 'scroll-parallax-gallery' )
					)
				),
				el(
					'div',
					blockProps,
					el(
						'div',
						{ className: 'spg-sticky' },
						el(
							'div',
							{ className: 'spg-layout' },
							el(
								'div',
								{ className: 'spg-media-col spg-fade-mask' },
								el( 'div', { className: 'spg-gallery' }, previewRows )
							),
							el(
								'div',
								{ className: 'spg-steps-col' },
								el(
									'div',
									{ className: 'spg-line' },
									el( 'div', { className: 'spg-line-fill' } )
								),
								el( 'div', stepsProps )
							)
						)
					)
				)
			);
		},

		save: function ( props ) {
			var attributes = props.attributes;
			var rotation = attributes.rotation;
			var rows = attributes.rows;
			var stickyHeight = attributes.stickyHeight;
			var scrollPerStep = attributes.scrollPerStep;

			var blockProps = blockEditor.useBlockProps.save( {
				className: 'spg-parallax-root',
				style: {
					'--spg-rotation': rotation + 'deg',
					'--spg-sticky-height': stickyHeight + 'vh',
					'--spg-step-vh': scrollPerStep + 'vh',
				},
			} );

			var savedRows = renderRows( rows, true );
			var stepsProps = blockEditor.useInnerBlocksProps.save( { className: 'spg-steps' } );

			return el(
				'div',
				blockProps,
				el(
					'div',
					{ className: 'spg-sticky' },
					el(
						'div',
						{ className: 'spg-layout' },
						el(
							'div',
							{ className: 'spg-media-col spg-fade-mask' },
							el( 'div', { className: 'spg-gallery' }, savedRows )
						),
						el(
							'div',
							{ className: 'spg-steps-col' },
							el(
								'div',
								{ className: 'spg-line' },
								el( 'div', { className: 'spg-line-fill' } )
							),
							el( 'div', stepsProps )
						)
					)
				)
			);
		},
	} );

	registerBlockType( 'crixu/scroll-parallax-step', {
		edit: function () {
			var blockProps = useBlockProps( { className: 'spg-step' } );
			var innerBlocksProps = useInnerBlocksProps( blockProps, {
				template: [
					[ 'core/heading', { level: 3, placeholder: __( 'Step title', 'scroll-parallax-gallery' ) } ],
					[ 'core/paragraph', { placeholder: __( 'Describe this step…', 'scroll-parallax-gallery' ) } ],
				],
				templateLock: false,
			} );
			return el( 'div', innerBlocksProps );
		},

		save: function () {
			var blockProps = blockEditor.useBlockProps.save( { className: 'spg-step' } );
			var innerBlocksProps = blockEditor.useInnerBlocksProps.save( blockProps );
			return el( 'div', innerBlocksProps );
		},
	} );

	registerBlockType( 'crixu/scroll-parallax-hero', {
		edit: function ( props ) {
			var attributes = props.attributes;
			var setAttributes = props.setAttributes;
			var rotation = attributes.rotation;
			var rows = attributes.rows;
			var overlayOpacity = attributes.overlayOpacity;

			var blockProps = useBlockProps( {
				className: 'spg-parallax-root',
				style: {
					'--spg-rotation': rotation + 'deg',
					'--spg-overlay-opacity': overlayOpacity / 100,
				},
			} );

			var rowPanels = buildRowPanels( rows, setAttributes );
			var previewRows = renderRows( rows, false );

			var contentProps = useInnerBlocksProps(
				{ className: 'spg-hero-content' },
				{ template: HERO_TEMPLATE, templateLock: false }
			);

			return el(
				Fragment,
				{},
				el(
					InspectorControls,
					{},
					el(
						PanelBody,
						{ title: __( 'Background settings', 'scroll-parallax-gallery' ) },
						el( RangeControl, {
							label: __( 'Rotation (degrees)', 'scroll-parallax-gallery' ),
							value: rotation,
							onChange: function ( value ) {
								setAttributes( { rotation: value } );
							},
							min: -45,
							max: 45,
						} ),
						el( RangeControl, {
							label: __( 'Overlay darkness (%)', 'scroll-parallax-gallery' ),
							help: __( 'A dark layer between the background images and your content, for legibility.', 'scroll-parallax-gallery' ),
							value: overlayOpacity,
							onChange: function ( value ) {
								setAttributes( { overlayOpacity: value } );
							},
							min: 0,
							max: 90,
						} )
					),
					rowPanels,
					el(
						Button,
						{
							isPrimary: true,
							onClick: function () {
								addRowAttribute( rows, setAttributes );
							},
						},
						__( 'Add row', 'scroll-parallax-gallery' )
					)
				),
				el(
					'div',
					blockProps,
					el(
						'div',
						{ className: 'spg-gallery-mask spg-fade-mask' },
						el( 'div', { className: 'spg-gallery' }, previewRows )
					),
					el( 'div', { className: 'spg-hero-overlay' } ),
					el( 'div', contentProps )
				)
			);
		},

		save: function ( props ) {
			var attributes = props.attributes;
			var rotation = attributes.rotation;
			var rows = attributes.rows;
			var overlayOpacity = attributes.overlayOpacity;

			var blockProps = blockEditor.useBlockProps.save( {
				className: 'spg-parallax-root',
				style: {
					'--spg-rotation': rotation + 'deg',
					'--spg-overlay-opacity': overlayOpacity / 100,
				},
			} );

			var savedRows = renderRows( rows, true );
			var contentProps = blockEditor.useInnerBlocksProps.save( { className: 'spg-hero-content' } );

			return el(
				'div',
				blockProps,
				el(
					'div',
					{ className: 'spg-gallery-mask spg-fade-mask' },
					el( 'div', { className: 'spg-gallery' }, savedRows )
				),
				el( 'div', { className: 'spg-hero-overlay' } ),
				el( 'div', contentProps )
			);
		},
	} );
} )( window.wp.blocks, window.wp.blockEditor, window.wp.element, window.wp.components, window.wp.i18n );
