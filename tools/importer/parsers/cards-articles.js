/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-articles block
 *
 * Source: https://wknd-trendsetters.site
 * Base Block: cards
 *
 * Block Structure:
 * - Row 1: Block name header
 * - Row 2-N: One card per row, 2 columns (image | content)
 *
 * Source HTML Pattern:
 * <div class="w-layout-grid grid-layout tablet-1-column grid-gap-md">
 *   <a href="..." class="utility-link-content-block">
 *     <div class="w-layout-grid grid-layout...">
 *       <img alt="..." src="..." class="cover-image utility-aspect-1x1">
 *       <div>
 *         <div class="tag">Category</div>
 *         <div class="paragraph-sm">3 min read</div>
 *         <h3 class="h4-heading">Card Title</h3>
 *         <p>Description text...</p>
 *         <div>Read</div>
 *       </div>
 *     </div>
 *   </a>
 *   ... (4 cards total)
 * </div>
 *
 * Generated: 2025-01-19
 */
export default function parse(element, { document }) {
  // Extract card links from the grid
  // VALIDATED: Found a.utility-link-content-block containing card content
  const cardLinks = element.querySelectorAll(':scope > a.utility-link-content-block');

  const cells = [];

  cardLinks.forEach(cardLink => {
    // VALIDATED: img.cover-image contains the card image
    const img = cardLink.querySelector('img.cover-image');

    // VALIDATED: .tag > div contains category text
    const tag = cardLink.querySelector('.tag');

    // VALIDATED: .paragraph-sm contains read time
    const readTime = cardLink.querySelector('.paragraph-sm');

    // VALIDATED: .h4-heading contains card title
    const title = cardLink.querySelector('.h4-heading, h3');

    // VALIDATED: p contains description
    const description = cardLink.querySelector('p');

    // Build image column
    const imageCol = [];
    if (img) {
      imageCol.push(img.cloneNode(true));
    }

    // Build content column
    const contentCol = [];
    if (tag) {
      const tagText = document.createElement('p');
      tagText.textContent = tag.textContent.trim();
      contentCol.push(tagText);
    }
    if (readTime) {
      contentCol.push(readTime.cloneNode(true));
    }
    if (title) {
      const titleEl = document.createElement('h3');
      titleEl.textContent = title.textContent.trim();
      contentCol.push(titleEl);
    }
    if (description) {
      contentCol.push(description.cloneNode(true));
    }

    // Add link to article
    const link = document.createElement('a');
    link.href = cardLink.href;
    link.textContent = 'Read';
    contentCol.push(link);

    // Two columns: image | content
    if (imageCol.length > 0 || contentCol.length > 0) {
      cells.push([imageCol, contentCol]);
    }
  });

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Cards-Articles',
    cells
  });

  // Replace original element with structured block table
  element.replaceWith(block);
}
