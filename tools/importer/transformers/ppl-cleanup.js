/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Plaza Premium Lounge cleanup.
 * Selectors from captured DOM of https://www.plazapremiumlounge.com/en-uk
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove cookie consent dialog (found: #cBox in captured DOM)
    // Remove fake loader overlay (found: .fakeloader in captured DOM)
    // Remove ASP.NET hidden fields (found: .aspNetHidden in captured DOM)
    // Remove booking form overlay (found: .bannerForm - interactive, not authorable)
    // Remove mobile booking form (found: .mobile.bannerForm in captured DOM)
    WebImporter.DOMUtils.remove(element, [
      '#cBox',
      '.fakeloader',
      '.aspNetHidden',
      '#ctxM',
      '.bannerForm',
      '.mobile.bannerForm',
    ]);
  }

  if (hookName === H.after) {
    // Remove header (found: header.cd-main-header in captured DOM)
    // Remove footer (found: .footer in captured DOM)
    // Remove mega navigation (found: .wsmain in captured DOM)
    // Remove branding header bar (found: .branding-header in captured DOM)
    // Remove empty book-online section (found: .book-online.section in captured DOM)
    // Remove iframes, noscript, link tags
    WebImporter.DOMUtils.remove(element, [
      'header.cd-main-header',
      '.footer',
      '.wsmain',
      '.branding-header',
      '.book-online.section',
      'iframe',
      'noscript',
      'link',
    ]);

    // Remove tracking attributes from all elements
    element.querySelectorAll('*').forEach((el) => {
      el.removeAttribute('onclick');
      el.removeAttribute('data-track');
      el.removeAttribute('data-gtm');
    });
  }
}
