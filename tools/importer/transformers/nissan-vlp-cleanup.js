/* eslint-disable */

/**
 * Transformer for Nissan VLP pages
 *
 * Source: https://www.nissan.in/vehicles/new/nissan-magnite.html
 * Purpose: Clean up DOM before block parsing
 *
 * Removes:
 * - Cookie banners
 * - Header navigation
 * - Footer
 * - Sticky navigation
 * - Hidden/utility elements
 * - Skip links
 *
 * Generated: 2026-01-21
 */
export default function transform(document) {
  // Elements to remove completely
  const selectorsToRemove = [
    // Cookie banner
    '.c_128',
    '.cookies-container',

    // Header and navigation
    '.header',
    '.c_010D',
    '.meganav-container',
    '.sidebar-mobile',
    '.sidebar-desktop',

    // Sticky navigation
    '.ns-sticky-nav',
    '.stickynav',

    // Footer
    'footer',
    '.footer',
    '#footer-element',

    // Skip links and utility
    '.skiplinks',
    '.noindex',
    '.print-info',

    // Price JSON data
    '.allVehiclesPricesSSI',

    // Hidden elements
    '[style*="display: none"]',
    '[hidden]',

    // React placeholders
    '.placeholder-container',
    '.placeholder-content'
  ];

  selectorsToRemove.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => el.remove());
  });

  // Clean up empty divs
  document.querySelectorAll('div:empty').forEach(el => {
    if (!el.id && !el.className) {
      el.remove();
    }
  });

  // Remove inline styles that hide content
  document.querySelectorAll('[style]').forEach(el => {
    const style = el.getAttribute('style');
    if (style && (style.includes('display: none') || style.includes('visibility: hidden'))) {
      el.remove();
    }
  });

  // Return modified document
  return document;
}
