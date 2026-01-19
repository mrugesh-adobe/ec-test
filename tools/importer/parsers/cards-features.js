/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-features block
 *
 * Source: https://wknd-trendsetters.site
 * Base Block: cards
 *
 * Block Structure:
 * - Row 1: Block name header
 * - Row 2-N: One card per row, single column with text content
 *
 * Source HTML Pattern:
 * <div class="w-layout-grid grid-layout desktop-4-column...">
 *   <div class="flex-horizontal flex-gap-xxs">
 *     <p class="utility-margin-bottom-0">Card text content...</p>
 *   </div>
 *   ... (8 items total)
 * </div>
 *
 * Generated: 2025-01-19
 */
export default function parse(element, { document }) {
  // Extract card items from the grid
  // VALIDATED: Found .flex-horizontal.flex-gap-xxs containing paragraph text
  const cardItems = element.querySelectorAll(':scope > div.flex-horizontal');

  const cells = [];

  // Each card is a single row with text content
  cardItems.forEach(item => {
    // VALIDATED: p element contains the card text
    const paragraph = item.querySelector('p');
    if (paragraph) {
      // Single column per row - just text content
      cells.push([paragraph.cloneNode(true)]);
    }
  });

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Cards-Features',
    cells
  });

  // Replace original element with structured block table
  element.replaceWith(block);
}
