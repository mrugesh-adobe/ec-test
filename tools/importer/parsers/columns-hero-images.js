/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-hero-images block
 *
 * Source: https://wknd-trendsetters.site
 * Base Block: columns
 *
 * Block Structure:
 * - Row 1: Block name header
 * - Row 2: 2 columns, each containing an image
 *
 * Source HTML Pattern:
 * <div class="w-layout-grid grid-layout...">
 *   <div class="utility-aspect-1x1">
 *     <img alt="..." src="./images/hero-dance.avif" class="image cover-image">
 *   </div>
 *   <div class="utility-aspect-1x1">
 *     <img alt="..." src="./images/concert.avif" class="image cover-image">
 *   </div>
 * </div>
 *
 * Generated: 2025-01-19
 */
export default function parse(element, { document }) {
  // Extract images from the grid columns
  // VALIDATED: Found .utility-aspect-1x1 > img.cover-image in source HTML
  const imageCells = element.querySelectorAll(':scope > div.utility-aspect-1x1');

  const cells = [];

  // Build row with images side-by-side
  const imageRow = [];
  imageCells.forEach(cell => {
    // VALIDATED: img.cover-image exists inside each aspect container
    const img = cell.querySelector('img.cover-image, img.image');
    if (img) {
      imageRow.push(img.cloneNode(true));
    }
  });

  if (imageRow.length > 0) {
    cells.push(imageRow);
  }

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Columns-Hero-Images',
    cells
  });

  // Replace original element with structured block table
  element.replaceWith(block);
}
