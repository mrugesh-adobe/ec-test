/* eslint-disable */
/* global WebImporter */

/**
 * Transformer for WKND Trendsetters website cleanup
 * Purpose: Remove non-content elements and prepare DOM for block parsing
 * Applies to: wknd-trendsetters.site
 * Generated: 2025-01-19
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
    // Remove navigation header (auto-populated by EDS)
    // EXTRACTED: Found <nav class="nav"> in captured DOM
    WebImporter.DOMUtils.remove(element, [
      'nav.nav',
      '.nav-container',
      '.navbar'
    ]);

    // Remove footer (auto-populated by EDS)
    // EXTRACTED: Found <footer class="footer"> in captured DOM
    WebImporter.DOMUtils.remove(element, [
      'footer.footer',
      '.footer-container'
    ]);

    // Remove Webflow badge and scripts
    // EXTRACTED: Webflow-specific elements in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '.w-webflow-badge',
      'script',
      'noscript'
    ]);

    // Re-enable scrolling if overflow hidden
    if (element.style && element.style.overflow === 'hidden') {
      element.setAttribute('style', 'overflow: scroll;');
    }
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove remaining Webflow utility classes from elements
    // These are safe to remove in afterTransform as they don't affect parsing

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

    // Clean up tracking attributes
    const allElements = element.querySelectorAll('*');
    allElements.forEach(el => {
      el.removeAttribute('data-w-tab');
      el.removeAttribute('data-wf-page');
      el.removeAttribute('data-wf-site');
    });
  }
}
