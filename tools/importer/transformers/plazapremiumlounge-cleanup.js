/* eslint-disable */
/* global WebImporter */

/**
 * Transformer for Plaza Premium Lounge website cleanup
 * Purpose: Remove non-content elements (cookie banner, navigation, footer, overlays, breadcrumbs)
 * Applies to: www.plazapremiumlounge.com (all templates)
 * Tested: /en-uk/discover/partner-offers/ppf-mcarthurglen
 * Generated: 2026-03-05
 *
 * SELECTORS EXTRACTED FROM:
 * - Captured DOM during migration workflow (Playwright snapshot)
 * - Elements identified: cookie consent, header/banner, footer, breadcrumb, notification banners
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform',
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove cookie consent dialog
    // EXTRACTED: Found <input id="dismissCookies" class="ConsentButton btn btn-default">
    // and parent wrapper with cookie consent text
    const cookieButton = element.querySelector('#dismissCookies');
    if (cookieButton) {
      const cookieWrapper = cookieButton.closest('[class*="Consent"], [class*="cookie"]') || cookieButton.parentElement;
      if (cookieWrapper) cookieWrapper.remove();
    }

    // Remove notification banner (Smart Traveller popup iframe)
    // EXTRACTED: Found <div smtmsgid="smtMessage" id="st_notification_banner">
    WebImporter.DOMUtils.remove(element, [
      '#st_notification_banner',
      '.st_preview_frame_banner',
      '[id*="smtMessage"]',
    ]);

    // Remove header/navigation region
    // EXTRACTED: Found <header> / banner role element with site logo and nav
    WebImporter.DOMUtils.remove(element, [
      'header',
      '[role="banner"]',
    ]);

    // Remove breadcrumb navigation
    // EXTRACTED: Found <ol class="breadcrumb style-1"> inside .breadcrumb-wrapper
    WebImporter.DOMUtils.remove(element, [
      '.breadcrumb-wrapper',
      'ol.breadcrumb',
    ]);

    // Remove footer section
    // EXTRACTED: Found <div class="footer"> with newsletter, social media, partner brands, copyright
    WebImporter.DOMUtils.remove(element, [
      '.footer',
      '[role="contentinfo"]',
      'footer',
    ]);

    // Remove chat widget iframe
    // EXTRACTED: Found iframe with chat button at bottom of page
    const chatIframes = element.querySelectorAll('iframe[title*="chat"], iframe[id*="chat"]');
    chatIframes.forEach((iframe) => iframe.remove());
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove remaining non-content elements
    // Standard HTML elements - safe to remove after block parsing
    WebImporter.DOMUtils.remove(element, [
      'link',
      'noscript',
      'iframe',
    ]);

    // Remove spacer divs
    // EXTRACTED: Found <div class="spacer20">&nbsp;</div> and spacer30 in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '.spacer20',
      '.spacer30',
      '.spacer10',
    ]);

    // Remove hidden form inputs
    // EXTRACTED: Found multiple hidden inputs for ASP.NET WebForms postback
    const hiddenInputs = element.querySelectorAll('input[type="hidden"]');
    hiddenInputs.forEach((input) => input.remove());
  }
}
