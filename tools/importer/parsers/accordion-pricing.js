/* eslint-disable */
/* global WebImporter */

/**
 * Parser for accordion-pricing block
 *
 * Source: https://www.nissan.in/prices-list.html
 * Base Block: accordion
 *
 * Block Structure:
 * - Row 1: Block name header
 * - Row 2-N: One row per accordion item, 2 columns (title | price table)
 *
 * Source HTML Pattern:
 * <div class="accordion-group accordion-list">
 *   <div class="accordion-header variant1">
 *     <h2 class="accordion-title">Section Title</h2>
 *   </div>
 *   <div class="accordion-panel">
 *     <table>
 *       <tr><th>Variant</th><th>Ex-Showroom Price (INR)</th></tr>
 *       <tr><td>Model Name</td><td>Price</td></tr>
 *       ...
 *     </table>
 *   </div>
 * </div>
 *
 * Generated: 2026-01-21
 */
export default function parse(element, { document }) {
  const cells = [];

  // Extract the accordion title
  // VALIDATED: .accordion-title contains the section heading
  const titleEl = element.querySelector('.accordion-title, h2.accordion-title');
  const title = titleEl ? titleEl.textContent.trim() : 'Pricing';

  // Build title column
  const titleCol = document.createElement('p');
  titleCol.textContent = title;

  // Extract the price table from accordion panel
  // VALIDATED: .accordion-panel contains the pricing table
  const panelEl = element.querySelector('.accordion-panel');
  const contentCol = [];

  if (panelEl) {
    // Look for table within the panel
    const table = panelEl.querySelector('table');

    if (table) {
      // Clone the entire table to preserve structure
      const clonedTable = table.cloneNode(true);

      // Clean up any inline styles that might interfere
      clonedTable.removeAttribute('style');
      clonedTable.querySelectorAll('*').forEach(el => {
        el.removeAttribute('style');
        el.removeAttribute('class');
      });

      contentCol.push(clonedTable);
    } else {
      // Fallback: extract text content if no table
      const contentP = document.createElement('p');
      contentP.textContent = panelEl.textContent.trim();
      contentCol.push(contentP);
    }
  }

  // Two columns: title | content (price table)
  cells.push([[titleCol], contentCol]);

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Accordion-Pricing',
    cells
  });

  // Replace original element with structured block table
  element.replaceWith(block);
}
