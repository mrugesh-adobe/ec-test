/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards block
 *
 * Source: https://www.plazapremiumlounge.com/en-uk/discover/partner-offers/ppf-mcarthurglen
 * Base Block: cards
 *
 * Block Structure (from block collection example):
 * - Row 1: Block name header ("Cards")
 * - Row 2+: Each row has 2 columns: [image, text content]
 *   - Col 1: Image
 *   - Col 2: Heading, description text, optional CTA link
 *
 * Source HTML Pattern:
 * <div id="ritz-accordion-wrapper">
 *   <div class="acc-item" style="background-image: url('...')">
 *     <div class="acc-content">
 *       <span class="acc-city">CITY<br>(CODE)</span>
 *       <span class="acc-address">Address text</span>
 *       <span class="acc-hours-label">Opening Hours</span>
 *       <div class="acc-hours">Hours text</div>
 *       <a class="acc-btn" href="...">Explore Lounge</a>
 *     </div>
 *   </div>
 * </div>
 *
 * Generated: 2026-03-05
 */
export default function parse(element, { document }) {
  // Extract all accordion items (lounge location cards)
  // VALIDATED: Source HTML uses .acc-item with background-image style and .acc-content children
  const accItems = Array.from(element.querySelectorAll('.acc-item'));

  // Build cells array matching Cards block structure
  const cells = [];

  for (const item of accItems) {
    // Extract background image URL from inline style
    // VALIDATED: Source uses style="background-image: url('...')"
    const style = item.getAttribute('style') || '';
    const bgMatch = style.match(/background-image:\s*url\(['"]?(.*?)['"]?\)/);

    // Create image element for the card
    const imgCell = [];
    if (bgMatch && bgMatch[1]) {
      const img = document.createElement('img');
      img.src = bgMatch[1];
      // Extract city name for alt text
      const cityEl = item.querySelector('.acc-city');
      img.alt = cityEl ? cityEl.textContent.replace(/\n/g, ' ').trim() + ' lounge' : 'Lounge';
      imgCell.push(img);
    }

    // Extract text content for the card
    const textCell = [];

    // City name and code as heading
    // VALIDATED: Source uses <span class="acc-city">CITY<br>(CODE)</span>
    const cityEl = item.querySelector('.acc-city');
    if (cityEl) {
      const h3 = document.createElement('h3');
      h3.textContent = cityEl.textContent.replace(/\n/g, ' ').trim();
      textCell.push(h3);
    }

    // Address
    // VALIDATED: Source uses <span class="acc-address">Address text</span>
    const addressEl = item.querySelector('.acc-address');
    if (addressEl) {
      const p = document.createElement('p');
      p.textContent = addressEl.textContent.trim();
      textCell.push(p);
    }

    // Opening hours
    // VALIDATED: Source uses <span class="acc-hours-label"> and <div class="acc-hours">
    const hoursEl = item.querySelector('.acc-hours');
    if (hoursEl) {
      const p = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = 'Opening Hours:';
      p.appendChild(strong);
      p.appendChild(document.createTextNode(' ' + hoursEl.textContent.trim()));
      textCell.push(p);
    }

    // Explore Lounge link (CTA)
    // VALIDATED: Source uses <a class="acc-btn" href="...">Explore Lounge</a>
    const ctaEl = item.querySelector('.acc-btn, a[href*="/find/"]');
    if (ctaEl) {
      const link = document.createElement('a');
      link.href = ctaEl.getAttribute('href') || '';
      link.textContent = ctaEl.textContent.trim() || 'Explore Lounge';
      const p = document.createElement('p');
      p.appendChild(link);
      textCell.push(p);
    }

    // Add row to cells if we have content
    if (imgCell.length > 0 || textCell.length > 0) {
      cells.push([imgCell, textCell]);
    }
  }

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Cards', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
