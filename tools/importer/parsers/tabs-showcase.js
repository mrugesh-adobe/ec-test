/* eslint-disable */
/* global WebImporter */

/**
 * Parser for tabs-showcase block
 *
 * Source: https://wknd-trendsetters.site
 * Base Block: tabs
 *
 * Block Structure:
 * - Row 1: Block name header
 * - Row 2-N: One row per tab, 2 columns (tab label | tab content)
 *
 * Source HTML Pattern:
 * <div class="w-tabs">
 *   <div class="w-tab-menu" role="tablist">
 *     <a data-w-tab="Tab 1" class="w-tab-link">Trends</a>
 *     <a data-w-tab="Tab 2" class="w-tab-link">Sporty</a>
 *     <a data-w-tab="Tab 3" class="w-tab-link">Nightlife</a>
 *   </div>
 *   <div class="w-tab-content">
 *     <div data-w-tab="Tab 1" class="w-tab-pane">
 *       <h3>Heading</h3>
 *       <img src="...">
 *     </div>
 *     ...
 *   </div>
 * </div>
 *
 * Generated: 2025-01-19
 */
export default function parse(element, { document }) {
  // Extract tab links and content panes
  // VALIDATED: Found .w-tab-link elements in tab menu
  const tabLinks = element.querySelectorAll('.w-tab-menu .w-tab-link');

  // VALIDATED: Found .w-tab-pane elements containing tab content
  const tabPanes = element.querySelectorAll('.w-tab-content .w-tab-pane');

  const cells = [];

  tabLinks.forEach((tabLink, index) => {
    const tabPane = tabPanes[index];
    if (!tabPane) return;

    // Get tab label text
    // VALIDATED: .paragraph-lg contains tab label text
    const labelEl = tabLink.querySelector('.paragraph-lg');
    const labelText = labelEl ? labelEl.textContent.trim() : tabLink.textContent.trim();

    // Build label column
    const labelCol = document.createElement('p');
    labelCol.textContent = labelText;

    // Build content column from pane
    const contentCol = [];

    // VALIDATED: .h2-heading contains tab heading
    const heading = tabPane.querySelector('.h2-heading, h3');
    if (heading) {
      const h3 = document.createElement('h3');
      h3.textContent = heading.textContent.trim();
      contentCol.push(h3);
    }

    // VALIDATED: img.cover-image contains tab image
    const img = tabPane.querySelector('img.cover-image, img.image');
    if (img) {
      contentCol.push(img.cloneNode(true));
    }

    // Two columns: tab label | tab content
    cells.push([[labelCol], contentCol]);
  });

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Tabs-Showcase',
    cells
  });

  // Replace original element with structured block table
  element.replaceWith(block);
}
