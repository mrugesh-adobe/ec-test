/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero block
 *
 * Source: https://www.plazapremiumlounge.com/en-uk/discover/partner-offers/ppf-mcarthurglen
 * Base Block: hero
 *
 * Block Structure (from block collection example):
 * - Row 1: Block name header ("Hero")
 * - Row 2: Single cell with background image (optional)
 * - Row 3: Single cell with heading, subheading, and optional CTA
 *
 * Source HTML Pattern:
 * <div class="pageBanner-wrapper">
 *   <div class="pageBanner">
 *     <div class="master-slider">
 *       <div class="ms-slide-bgcont"><img src="..."></div>
 *     </div>
 *   </div>
 * </div>
 * Followed by: <h2 class="title">Page Title</h2> (inside .fullContent)
 *
 * Generated: 2026-03-05
 */
export default function parse(element, { document }) {
  // Extract hero banner image
  // VALIDATED: Source HTML uses .ms-slide-bgcont img or direct img inside .master-slider
  const bannerImg = element.querySelector('.ms-slide-bgcont img') ||
                    element.querySelector('.master-slider img') ||
                    element.querySelector('img');

  // Extract page title from the sibling .fullContent area
  // VALIDATED: Source HTML has <h2 class="title"> inside .content-wrapper .fullContent
  const parentWrapper = element.closest('main') || element.parentElement;
  const pageTitle = parentWrapper ? (
    parentWrapper.querySelector('.fullContent > h2.title') ||
    parentWrapper.querySelector('h2.title') ||
    parentWrapper.querySelector('.fullContent h2')
  ) : null;

  // Build cells array matching Hero block structure
  const cells = [];

  // Row 1: Background image
  if (bannerImg) {
    cells.push([bannerImg]);
  }

  // Row 2: Content (heading)
  const contentCell = [];
  if (pageTitle) {
    // Create an h2 element for the title
    const h2 = document.createElement('h2');
    h2.textContent = pageTitle.textContent.trim();
    contentCell.push(h2);
  }

  if (contentCell.length > 0) {
    cells.push(contentCell);
  }

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Hero', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
