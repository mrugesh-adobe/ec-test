/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards block (VLP gallery variant)
 *
 * Source: https://www.nissan.in/vehicles/new/nissan-magnite.html
 * Base Block: cards
 *
 * Block Structure:
 * - Row 1: Block name header
 * - Row 2-N: One card per row, 2 columns (image | title + description)
 *
 * Source HTML Pattern:
 * <div class="ns-gallery-list">
 *   <div class="ns-gallery-item">
 *     <picture><img src="..." alt="..."></picture>
 *     <div class="ns-gallery-item-content">
 *       <h3>Feature Title</h3>
 *       <p>Description</p>
 *     </div>
 *   </div>
 *   ...
 * </div>
 *
 * Generated: 2026-01-21
 */
export default function parse(element, { document }) {
  // Extract gallery items
  const items = element.querySelectorAll('.ns-gallery-item, .ns-card-item, [class*="gallery-item"]');

  const cells = [];

  items.forEach(item => {
    // Extract image
    const img = item.querySelector('img');
    const imgCol = [];
    if (img) {
      const newImg = document.createElement('img');
      newImg.src = img.src || img.getAttribute('src');
      newImg.alt = img.alt || '';
      imgCol.push(newImg);
    }

    // Extract content (title + description)
    const contentCol = [];

    // Title
    const title = item.querySelector('h3, h4, .ns-gallery-item-title, .ns-card-title');
    if (title && title.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      contentCol.push(strong);
    }

    // Description
    const desc = item.querySelector('p, .ns-gallery-item-description, .ns-card-description');
    if (desc && desc.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = desc.textContent.trim();
      contentCol.push(p);
    }

    // Link if present
    const link = item.querySelector('a[href]');
    if (link && link.href && link.textContent.trim()) {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.textContent.trim();
      contentCol.push(a);
    }

    // Add row: image column | content column
    if (imgCol.length > 0 || contentCol.length > 0) {
      cells.push([imgCol, contentCol]);
    }
  });

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Cards',
    cells
  });

  // Replace original element with structured block table
  element.replaceWith(block);
}
