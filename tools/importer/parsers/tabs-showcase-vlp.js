/* eslint-disable */
/* global WebImporter */

/**
 * Parser for tabs-showcase block (VLP variant selector)
 *
 * Source: https://www.nissan.in/vehicles/new/nissan-magnite.html
 * Base Block: tabs
 *
 * Block Structure:
 * - Row 1: Block name header
 * - Row 2-N: One row per variant tab (tab label | image + price)
 *
 * Source HTML Pattern:
 * <div class="enhanced-grade-walk-container">
 *   <ul class="wds-carousel-slider">
 *     <li class="carousel-card">
 *       <div class="gradewalk-card">
 *         <picture><img src="..."></picture>
 *         <h3 class="gradewalk-card-tagline">VISIA</h3>
 *         <p class="msrp-price">₹561,643</p>
 *       </div>
 *     </li>
 *     ...
 *   </ul>
 * </div>
 *
 * Generated: 2026-01-21
 */
export default function parse(element, { document }) {
  // Extract variant cards from carousel
  const variantCards = element.querySelectorAll('.gradewalk-card, .carousel-card .top-section');

  const cells = [];

  variantCards.forEach(card => {
    // Get variant name (tab label)
    const variantName = card.querySelector('.gradewalk-card-tagline .gradewalk-disclaimer-container, .gradewalk-card-tagline');
    const labelText = variantName ? variantName.textContent.trim() : '';

    if (!labelText) return;

    // Build label column
    const labelCol = document.createElement('p');
    labelCol.textContent = labelText;

    // Build content column (image + price)
    const contentCol = [];

    // Variant image
    const img = card.querySelector('picture img, .card-image-container img');
    if (img) {
      const newImg = document.createElement('img');
      newImg.src = img.src || img.getAttribute('src');
      newImg.alt = img.alt || labelText;
      contentCol.push(newImg);
    }

    // Price
    const price = card.querySelector('.msrp-price');
    if (price && price.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = `Starting at ${price.textContent.trim()}`;
      contentCol.push(p);
    }

    // Two columns: variant label | image + price content
    if (contentCol.length > 0) {
      cells.push([[labelCol], contentCol]);
    }
  });

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Tabs-Showcase',
    cells
  });

  // Replace original element with structured block table
  element.replaceWith(block);
}
