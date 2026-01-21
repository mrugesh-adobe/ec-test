/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-vlp block
 *
 * Source: https://www.nissan.in/vehicles/new/nissan-magnite.html
 * Base Block: hero
 *
 * Block Structure:
 * - Row 1: Block name header
 * - Row 2: Single cell with background image, heading, description, CTAs
 *
 * Source HTML Pattern:
 * <div class="ns-inview-trigger ns-story">
 *   <picture class="inview-background-img">
 *     <img src="..." alt="...">
 *   </picture>
 *   <div class="ns-story-content-section">
 *     <h2 class="ns-v-line-text">Eyebrow Text</h2>
 *     <h2 class="ns-heading-text">Main Heading</h2>
 *     <p>Description text</p>
 *     <a class="ns-button">CTA Button</a>
 *   </div>
 * </div>
 *
 * Generated: 2026-01-21
 */
export default function parse(element, { document }) {
  const cells = [];
  const contentCell = [];

  // Extract background image
  const bgPicture = element.querySelector('picture.inview-background-img img, .inview-background-img img');
  if (bgPicture) {
    const img = document.createElement('img');
    img.src = bgPicture.src || bgPicture.getAttribute('src');
    img.alt = bgPicture.alt || '';
    contentCell.push(img);
  }

  // Extract eyebrow text (small heading above main heading)
  const eyebrow = element.querySelector('.ns-v-line-text span, .ns-eyebrow');
  if (eyebrow && eyebrow.textContent.trim()) {
    const p = document.createElement('p');
    p.textContent = eyebrow.textContent.trim();
    contentCell.push(p);
  }

  // Extract main heading
  const heading = element.querySelector('.ns-heading-text, h2:not(.ns-v-line-text), h1');
  if (heading && heading.textContent.trim()) {
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent.trim();
    contentCell.push(h2);
  }

  // Extract description paragraphs
  const description = element.querySelector('.ns-description, .ns-common-body p:not(.ns-v-line-text)');
  if (description && description.textContent.trim()) {
    const p = document.createElement('p');
    p.textContent = description.textContent.trim();
    contentCell.push(p);
  }

  // Extract CTA buttons
  const buttons = element.querySelectorAll('.ns-button, a.btn-primary, a.btn-secondary');
  buttons.forEach(btn => {
    if (btn.textContent.trim() && btn.href) {
      const a = document.createElement('a');
      a.href = btn.href;
      a.textContent = btn.textContent.trim();
      const strong = document.createElement('strong');
      strong.appendChild(a);
      contentCell.push(strong);
    }
  });

  // Single row with all content
  if (contentCell.length > 0) {
    cells.push([contentCell]);
  }

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Hero-Vlp',
    cells
  });

  // Replace original element with structured block table
  element.replaceWith(block);
}
