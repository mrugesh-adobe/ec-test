/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns block
 *
 * Source: https://www.plazapremiumlounge.com/en-uk/discover/partner-offers/ppf-mcarthurglen
 * Base Block: columns
 *
 * Block Structure (from block collection example):
 * - Row 1: Block name header ("Columns")
 * - Row 2+: Multiple columns per row, each cell with text/images/links
 *
 * Source HTML Patterns (3 instances on this page):
 * 1. Offer Details: .flex.flex-col with text left + image right
 * 2. Pricing Comparison: .grid.grid-cols-1.lg\:grid-cols-2 with two pricing cards
 * 3. How It Works: .grid.grid-cols-1.md\:grid-cols-3 with three step columns
 *
 * Generated: 2026-03-05
 */
export default function parse(element, { document }) {
  // Determine column structure by analyzing direct children
  // VALIDATED: Source uses flex/grid layouts with direct child divs as columns
  const directChildren = Array.from(element.querySelectorAll(':scope > div'));

  // Build cells array - each direct child div becomes a column
  const cells = [];
  const row = [];

  for (const child of directChildren) {
    // Clone the child to preserve content
    const cellContent = [];

    // Extract all meaningful content from this column
    const elements = Array.from(child.children);
    for (const el of elements) {
      // Skip empty/spacer elements
      if (el.classList.contains('spacer20') || el.classList.contains('spacer30') || el.classList.contains('spacer10')) continue;
      if (el.textContent.trim() === '' && !el.querySelector('img, a')) continue;

      cellContent.push(el);
    }

    if (cellContent.length > 0) {
      row.push(cellContent);
    }
  }

  if (row.length > 0) {
    cells.push(row);
  }

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Columns', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
