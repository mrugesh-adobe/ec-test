/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-awards.
 * Base: columns.
 * Source: https://www.plazapremiumlounge.com/en-uk
 * Source selector: .location.section
 *
 * Columns block structure (from library):
 * Row 1: Block name
 * Row N: Cell 1 | Cell 2 (side by side)
 *
 * Source HTML: .location.section > .container > .lo-wrapper > .row > .column.left + .column.right
 * - .column.left > img (Skytrax award badge)
 * - .column.right > img (Global locations map)
 */
export default function parse(element, { document }) {
  // Extract left column image (Skytrax award)
  // Found in DOM: .lo-wrapper .column.left > img or first img in the section
  const leftImg = element.querySelector('.column.left img')
    || element.querySelector('.lo-wrapper img:first-of-type')
    || element.querySelector('img');

  // Extract right column image (locations map)
  // Found in DOM: .lo-wrapper .column.right > img
  const rightImg = element.querySelector('.column.right img')
    || element.querySelector('.lo-wrapper img:nth-of-type(2)');

  // Build cell 1: left image
  const leftCell = document.createElement('div');
  if (leftImg) {
    const newLeftImg = document.createElement('img');
    newLeftImg.src = leftImg.src || leftImg.getAttribute('data-src') || '';
    newLeftImg.alt = leftImg.alt || 'Award badge';
    leftCell.append(newLeftImg);
  }

  // Build cell 2: right image
  const rightCell = document.createElement('div');
  if (rightImg) {
    const newRightImg = document.createElement('img');
    newRightImg.src = rightImg.src || rightImg.getAttribute('data-src') || '';
    newRightImg.alt = rightImg.alt || 'Global locations';
    rightCell.append(newRightImg);
  }

  const cells = [[leftCell, rightCell]];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-awards', cells });
  element.replaceWith(block);
}
