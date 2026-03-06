/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Plaza Premium Lounge section breaks and section-metadata.
 * Runs afterTransform only. Uses payload.template.sections from page-templates.json.
 * Selectors from captured DOM of https://www.plazapremiumlounge.com/en-uk
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.after) {
    const template = payload && payload.template;
    if (!template || !template.sections || template.sections.length < 2) return;

    const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document };
    const sections = template.sections;

    // Process sections in reverse order to avoid DOM position shifts
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i];
      const selector = Array.isArray(section.selector) ? section.selector : [section.selector];

      let sectionEl = null;
      for (const sel of selector) {
        sectionEl = element.querySelector(sel);
        if (sectionEl) break;
      }

      if (!sectionEl) continue;

      // Add section-metadata block if section has a style
      if (section.style) {
        const sectionMetadata = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.after(sectionMetadata);
      }

      // Add <hr> section break before each section (except the first)
      if (i > 0) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    }
  }
}
