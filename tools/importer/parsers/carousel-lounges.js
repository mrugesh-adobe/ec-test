/* eslint-disable */
/* global WebImporter */

/**
 * Parser for carousel-lounges.
 * Base: carousel.
 * Source: https://www.plazapremiumlounge.com/en-uk
 * Source selector: .owl-carousel.owl-highlights
 *
 * Carousel block structure (from library):
 * Row 1: Block name
 * Row N: Image (cell 1) | Title + description + CTA (cell 2)
 *
 * Source HTML: .owl-carousel.owl-highlights contains .owl-item elements.
 * Each item: .item.lo-bx > .bx-bg > img + .ctn > h4 + span.no
 * Detail panel: .ctn-det > img + .txt-wrap > h4 + a.btn (See More link)
 * Note: Each item has duplicate content in .ctn (thumbnail) and .ctn-det (expanded).
 * Use .ctn-det for richer content (includes See More link).
 */
export default function parse(element, { document }) {
  // Find all carousel items (owl-item contains .item.lo-bx)
  // Found in DOM: .owl-item .item.lo-bx
  const items = element.querySelectorAll('.owl-item .item.lo-bx, .item.lo-bx');

  const cells = [];
  const seen = new Set();

  items.forEach((item) => {
    // Extract from .ctn-det (expanded detail panel) for richer content
    const detailPanel = item.querySelector('.ctn-det');
    const summaryPanel = item.querySelector('.ctn');

    // Extract image from .bx-bg > img (first img, not the duplicate in .ctn-det)
    const img = item.querySelector(':scope > .bx-bg > img')
      || item.querySelector('.bx-bg > img')
      || item.querySelector('img');

    // Extract title from h4 in .ctn-det or .ctn
    const titleEl = (detailPanel && detailPanel.querySelector('h4'))
      || (summaryPanel && summaryPanel.querySelector('h4'))
      || item.querySelector('h4');

    // Extract the title text (h4 contains location name + span.no with date)
    let titleText = '';
    let dateText = '';
    if (titleEl) {
      // Get location name (text before span)
      titleText = titleEl.childNodes[0] ? titleEl.childNodes[0].textContent.trim() : titleEl.textContent.trim();
      const dateSpan = titleEl.querySelector('span.no');
      if (dateSpan) {
        dateText = dateSpan.textContent.trim();
      }
    }

    // Deduplicate (owl carousel duplicates items for infinite scroll)
    if (seen.has(titleText)) return;
    seen.add(titleText);

    // Extract CTA link from .ctn-det a.btn
    const ctaLink = detailPanel ? detailPanel.querySelector('a.btn, a[href]') : item.querySelector('a.btn, a[href]');

    // Build cell 1: image
    const imageCell = document.createElement('div');
    if (img) {
      const newImg = document.createElement('img');
      newImg.src = img.src || img.getAttribute('data-src') || '';
      newImg.alt = titleText || '';
      imageCell.append(newImg);
    }

    // Build cell 2: title + date + CTA (single cell per carousel library)
    const contentCell = document.createElement('div');
    if (titleText) {
      const h4 = document.createElement('h4');
      h4.textContent = titleText;
      contentCell.append(h4);
    }
    if (dateText) {
      const p = document.createElement('p');
      p.textContent = dateText;
      contentCell.append(p);
    }
    if (ctaLink) {
      const link = document.createElement('a');
      link.href = ctaLink.href;
      link.textContent = ctaLink.textContent.trim() || 'See More';
      const linkP = document.createElement('p');
      linkP.append(link);
      contentCell.append(linkP);
    }

    cells.push([imageCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-lounges', cells });
  element.replaceWith(block);
}
