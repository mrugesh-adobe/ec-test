/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-promo.
 * Base: columns.
 * Source: https://www.plazapremiumlounge.com/en-uk
 * Source selector: .lounge-access
 *
 * Columns block structure (from library):
 * Row 1: Block name
 * Row N: Cell 1 | Cell 2 (side by side)
 *
 * Source HTML: .lounge-access contains two children:
 * - .featureBanner-right .img-wrap > img (left column - feature image)
 * - .txt-area .txt-wrap > h4 + p + a.btn (right column - promo text + CTA)
 */
export default function parse(element, { document }) {
  // Extract feature image from left column
  // Found in DOM: .featureBanner-right .img-wrap > img
  const img = element.querySelector('.featureBanner-right img')
    || element.querySelector('.img-wrap img')
    || element.querySelector('img');

  // Extract heading from right column
  // Found in DOM: .txt-area .txt-wrap h4
  const heading = element.querySelector('.txt-wrap h4, .txt-area h4, h4');

  // Extract description paragraph
  // Found in DOM: .txt-wrap p > big
  const descEl = element.querySelector('.txt-wrap p, .txt-area p, p');

  // Extract CTA button
  // Found in DOM: .txt-wrap a.btn
  const ctaEl = element.querySelector('.txt-wrap a.btn, .txt-area a.btn, a.btn');

  // Build cell 1: image column
  const imageCell = document.createElement('div');
  if (img) {
    const newImg = document.createElement('img');
    newImg.src = img.src || img.getAttribute('data-src') || '';
    newImg.alt = img.alt || 'Lounge interior';
    imageCell.append(newImg);
  }

  // Build cell 2: text + CTA column
  const textCell = document.createElement('div');
  if (heading) {
    const h4 = document.createElement('h4');
    h4.innerHTML = heading.innerHTML;
    textCell.append(h4);
  }
  if (descEl && descEl.textContent.trim()) {
    const p = document.createElement('p');
    p.textContent = descEl.textContent.trim();
    textCell.append(p);
  }
  if (ctaEl) {
    const link = document.createElement('a');
    link.href = ctaEl.href;
    link.textContent = ctaEl.textContent.trim() || 'Book Now & Save';
    const linkP = document.createElement('p');
    const strong = document.createElement('strong');
    strong.append(link);
    linkP.append(strong);
    textCell.append(linkP);
  }

  const cells = [[imageCell, textCell]];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-promo', cells });
  element.replaceWith(block);
}
