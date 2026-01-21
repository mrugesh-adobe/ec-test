/*
 * Accordion Pricing Block
 * Recreate an accordion for pricing tables
 * Based on https://www.hlx.live/developer/block-collection/accordion
 */

export default function decorate(block) {
  [...block.children].forEach((row) => {
    // decorate accordion item label
    const label = row.children[0];
    const summary = document.createElement('summary');
    summary.className = 'accordion-pricing-item-label';
    summary.append(...label.childNodes);
    // decorate accordion item body
    const body = row.children[1];
    body.className = 'accordion-pricing-item-body';
    // decorate accordion item
    const details = document.createElement('details');
    details.className = 'accordion-pricing-item';
    details.append(summary, body);
    row.replaceWith(details);
  });
}
