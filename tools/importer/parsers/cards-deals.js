/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-deals.
 * Base: cards.
 * Source: https://www.plazapremiumlounge.com/en-uk
 * Source selector: .card-wrapper.features
 *
 * Cards block structure (from library):
 * Row 1: Block name
 * Row N: Image (cell 1) | Title + description + CTA (cell 2)
 *
 * Source HTML: .card-wrapper.features contains 4 .card elements.
 * Each card: a.cardBx > .cardHeader > .feaImg > img + .cardContent > h3 + p
 * The entire card is wrapped in an <a> link.
 */
export default function parse(element, { document }) {
  // Find all card elements
  // Found in DOM: .card-wrapper.features .card
  const cards = element.querySelectorAll(':scope .card');

  const cells = [];

  cards.forEach((card) => {
    // Extract image - try multiple selectors and attributes
    // Found in DOM: .feaImg > img, also check data-src for lazy loading
    const img = card.querySelector('.feaImg img')
      || card.querySelector('.cardHeader img')
      || card.querySelector('img');

    // Extract title from h3
    const title = card.querySelector('.cardContent h3, h3');

    // Extract description from .cardContent p
    const desc = card.querySelector('.cardContent p, p');

    // Extract link href from the wrapping <a> tag
    const link = card.querySelector('a.cardBx, a[href]');
    const href = link ? link.href : '';

    // Build cell 1: image - handle lazy-loaded images
    const imageCell = document.createElement('div');
    if (img) {
      const imgSrc = img.src || img.getAttribute('data-src') || img.getAttribute('data-lazy') || '';
      if (imgSrc) {
        const newImg = document.createElement('img');
        newImg.src = imgSrc;
        newImg.alt = img.alt || '';
        imageCell.append(newImg);
      } else {
        // Fallback: directly move the img element
        imageCell.append(img);
      }
    }

    // Build cell 2: title + description + CTA link
    const contentCell = document.createElement('div');
    if (title) {
      const h3 = document.createElement('h3');
      h3.textContent = title.textContent.trim();
      contentCell.append(h3);
    }
    if (desc && desc.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = desc.textContent.trim();
      contentCell.append(p);
    }
    if (href) {
      const ctaLink = document.createElement('a');
      ctaLink.href = href;
      ctaLink.textContent = 'Learn More';
      const ctaP = document.createElement('p');
      ctaP.append(ctaLink);
      contentCell.append(ctaP);
    }

    cells.push([imageCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-deals', cells });
  element.replaceWith(block);
}
