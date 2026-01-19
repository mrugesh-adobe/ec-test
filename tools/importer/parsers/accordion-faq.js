/* eslint-disable */
/* global WebImporter */

/**
 * Parser for accordion-faq block
 *
 * Source: https://wknd-trendsetters.site
 * Base Block: accordion
 *
 * Block Structure:
 * - Row 1: Block name header
 * - Row 2-N: One row per accordion item, 2 columns (question | answer)
 *
 * Source HTML Pattern:
 * <div class="flex-vertical">
 *   <div class="accordion transparent-accordion">
 *     <div class="flex-horizontal y-center...">
 *       <div class="paragraph-lg">Question text?</div>
 *     </div>
 *     <div class="accordion-content">
 *       <div class="rich-text">
 *         <p>Answer text...</p>
 *       </div>
 *     </div>
 *   </div>
 *   ... (4 items total)
 * </div>
 *
 * Generated: 2025-01-19
 */
export default function parse(element, { document }) {
  // Extract accordion items
  // VALIDATED: Found .accordion.transparent-accordion elements
  const accordionItems = element.querySelectorAll('.accordion.transparent-accordion');

  const cells = [];

  accordionItems.forEach(item => {
    // VALIDATED: .paragraph-lg contains the question text
    const questionEl = item.querySelector('.paragraph-lg');

    // VALIDATED: .accordion-content .rich-text contains the answer
    const answerContainer = item.querySelector('.accordion-content .rich-text');

    if (questionEl) {
      // Build question column
      const questionCol = document.createElement('p');
      questionCol.textContent = questionEl.textContent.trim();

      // Build answer column
      const answerCol = [];
      if (answerContainer) {
        // Clone all paragraph content from rich-text
        const paragraphs = answerContainer.querySelectorAll('p');
        paragraphs.forEach(p => {
          answerCol.push(p.cloneNode(true));
        });

        // If no paragraphs found, use the text content
        if (answerCol.length === 0) {
          const answerP = document.createElement('p');
          answerP.textContent = answerContainer.textContent.trim();
          answerCol.push(answerP);
        }
      }

      // Two columns: question | answer
      cells.push([[questionCol], answerCol]);
    }
  });

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Accordion-Faq',
    cells
  });

  // Replace original element with structured block table
  element.replaceWith(block);
}
