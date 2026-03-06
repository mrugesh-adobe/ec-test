/* eslint-disable */
/* global WebImporter */

/**
 * Transformer for ALLWAYS VIP website cleanup
 * Purpose: Remove non-content elements (cookie banner, navigation, footer, overlays)
 * Applies to: www.allwaysvip.com (all templates)
 * Tested: /about-us
 * Generated: 2026-03-03
 *
 * SELECTORS EXTRACTED FROM:
 * - Captured DOM during migration workflow (Playwright snapshot)
 * - Elements identified: cookie consent dialog, header nav, footer, breadcrumb
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform',
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove cookie consent dialog
    // EXTRACTED: Found alertdialog role element with cookie consent text
    const cookieDialog = element.querySelector('[role="alertdialog"]');
    if (cookieDialog) cookieDialog.remove();

    // Remove header/navigation region
    // EXTRACTED: Found <header> or banner role element with site nav
    WebImporter.DOMUtils.remove(element, [
      'header',
      '[role="banner"]',
    ]);

    // Remove breadcrumb navigation
    // EXTRACTED: Found <ol class="breadcrumb"> in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '.breadcrumb',
      'ol.breadcrumb',
    ]);

    // Remove footer
    // EXTRACTED: Found <footer> / contentinfo role with Plaza Premium Group links
    WebImporter.DOMUtils.remove(element, [
      'footer',
      '[role="contentinfo"]',
    ]);

    // Remove skip-to-content link
    // EXTRACTED: Found <a href="#main-content">Skip to main content</a>
    const skipLink = element.querySelector('a[href="#main-content"]');
    if (skipLink) skipLink.remove();
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove remaining iframes (YouTube embeds handled by parser)
    // Standard HTML elements - safe to remove after block parsing
    WebImporter.DOMUtils.remove(element, [
      'link',
      'noscript',
    ]);
  }
}
