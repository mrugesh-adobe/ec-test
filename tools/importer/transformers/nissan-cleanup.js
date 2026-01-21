/* eslint-disable */
/* global WebImporter */

/**
 * Transformer for Nissan India website cleanup
 * Purpose: Remove non-content elements and prepare DOM for block parsing
 * Applies to: nissan.in
 * Generated: 2026-01-21
 *
 * SELECTORS EXTRACTED FROM:
 * - Captured DOM during migration workflow
 * - cleaned.html from page scraping phase
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform'
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove cookie banner
    // EXTRACTED: Found .c_128.cookie-full-bleed in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '.c_128.cookie-full-bleed',
      '.cookies-container'
    ]);

    // Remove vehicle JSON data iframe
    // EXTRACTED: Found .allVehiclesPricesSSI containing embedded JSON
    WebImporter.DOMUtils.remove(element, [
      '.allVehiclesPricesSSI',
      '.universalPriceAllVehicleSSI'
    ]);

    // Remove header navigation (auto-populated by EDS)
    // EXTRACTED: Found header.c_010D in captured DOM
    WebImporter.DOMUtils.remove(element, [
      'header.c_010D',
      '.c_010D',
      '.skiplinks',
      '.header .noindex'
    ]);

    // Remove footer (auto-populated by EDS)
    WebImporter.DOMUtils.remove(element, [
      'footer',
      '.footer',
      '.c_003-footer',
      '#footer-element'
    ]);

    // Remove scripts and tracking elements
    WebImporter.DOMUtils.remove(element, [
      'script',
      'noscript',
      'iframe',
      '.noindex'
    ]);

    // Remove hidden elements and print-only elements
    WebImporter.DOMUtils.remove(element, [
      '.print-info',
      '[aria-hidden="true"]'
    ]);

    // Re-enable scrolling if overflow hidden
    if (element.style && element.style.overflow === 'hidden') {
      element.setAttribute('style', 'overflow: scroll;');
    }
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove empty containers left after parsing
    const emptyDivs = element.querySelectorAll('div:empty');
    emptyDivs.forEach(div => {
      if (!div.children.length && !div.textContent.trim()) {
        div.remove();
      }
    });

    // Remove remaining style and link elements
    WebImporter.DOMUtils.remove(element, [
      'style',
      'link[rel="stylesheet"]',
      'link[rel="preload"]'
    ]);

    // Clean up Nissan tracking attributes
    const allElements = element.querySelectorAll('*');
    allElements.forEach(el => {
      el.removeAttribute('data-di-res-id');
      el.removeAttribute('data-di-rand');
      el.removeAttribute('data-content-id');
      el.removeAttribute('data-cmp');
    });

    // Remove accordion end tags (Nissan-specific markup)
    WebImporter.DOMUtils.remove(element, [
      '.responsiveAccordionGroup-end',
      '.responsiveAccordion-end',
      '.endtag'
    ]);
  }
}
