/* eslint-disable */
/* global WebImporter */

/**
 * Transformer for Smashing Magazine website cleanup
 * Purpose: Remove non-content elements (header, sidebar, ads, comments, footer)
 * Applies to: www.smashingmagazine.com (all article templates)
 * Tested: /2026/02/designing-streak-system-ux-psychology/
 * Generated: 2026-02-25
 *
 * SELECTORS EXTRACTED FROM:
 * - Captured DOM during migration workflow (cleaned.html)
 * - Page structure analysis from page migration workflow
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform',
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove skip navigation links
    // EXTRACTED: Found <a href="#main-heading" class="skip-main"> in captured DOM (line 6-9)
    WebImporter.DOMUtils.remove(element, [
      'a.skip-main',
    ]);

    // Remove top anchor
    // EXTRACTED: Found <div id="top"> in captured DOM (line 2)
    WebImporter.DOMUtils.remove(element, [
      '#top',
    ]);

    // Remove global site header with logo and main navigation
    // EXTRACTED: Found <header class="global-header header"> in captured DOM (line 10)
    WebImporter.DOMUtils.remove(element, [
      'header.global-header',
    ]);

    // Remove search results container
    // EXTRACTED: Found <div class="search-results"> in captured DOM (line 94)
    WebImporter.DOMUtils.remove(element, [
      '.search-results',
    ]);

    // Remove topic sub-navigation bar
    // EXTRACTED: Found <header class="subnav__header" id="all-topics"> in captured DOM (line 99)
    WebImporter.DOMUtils.remove(element, [
      'header.subnav__header',
    ]);

    // Remove article header meta (author, date, comments link)
    // EXTRACTED: Found <ul class="article-header--meta"> in captured DOM (line 166)
    WebImporter.DOMUtils.remove(element, [
      '.article-header--meta',
    ]);

    // Remove meta box (reading time, tags, share links)
    // EXTRACTED: Found <ul class="meta-box meta-box--article"> in captured DOM (line 187)
    WebImporter.DOMUtils.remove(element, [
      '.meta-box',
    ]);

    // Remove sidebar: author bio section
    // EXTRACTED: Found <div class="c-garfield-aside--meta"> containing .l-author-bio in captured DOM (line 198-219)
    WebImporter.DOMUtils.remove(element, [
      '.c-garfield-aside--meta',
    ]);

    // Remove sidebar: email newsletter signup form
    // EXTRACTED: Found <div class="c-garfield__nl"> in captured DOM (line 220-237)
    WebImporter.DOMUtils.remove(element, [
      '.c-garfield__nl',
    ]);

    // Remove sidebar: partner/sponsor ad panels
    // EXTRACTED: Found multiple <div class="c-garfield-native-panel"> and
    // <div class="c-garfield-native-panel__right"> in captured DOM (lines 239-300)
    WebImporter.DOMUtils.remove(element, [
      '.c-garfield-native-panel__right',
      '.c-garfield-native-panel',
    ]);

    // Remove partner ads at article end
    // EXTRACTED: Found <div id="partners-article-end" class="c-friskies-box..."> in captured DOM (line 620)
    WebImporter.DOMUtils.remove(element, [
      '#partners-article-end',
    ]);

    // Remove book/newsletter promotion grid at article end
    // EXTRACTED: Found <div id="promo-article-end"> with .book-grid in captured DOM (lines 622-664)
    WebImporter.DOMUtils.remove(element, [
      '[id^="promo-article-end"]',
    ]);

    // Remove comments section
    // EXTRACTED: Found <div id="comments-designing-streak-system-ux-psychology"> in captured DOM (line 665)
    WebImporter.DOMUtils.remove(element, [
      '[id^="comments-"]',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove footer sections
    // EXTRACTED: Found <div class="footer__topics">, <div class="footer__notes">,
    // <ul class="footer__links"> in captured DOM (lines 745-858)
    WebImporter.DOMUtils.remove(element, [
      '.footer__topics',
      '.footer__notes',
      '.footer__links',
    ]);

    // Remove remaining ad/partner boxes that parsers may have left behind
    // EXTRACTED: Found multiple <div class="c-friskies-box c-friskies-box--ad partners..."> in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '.c-friskies-box',
    ]);

    // Remove remaining unwanted HTML elements
    WebImporter.DOMUtils.remove(element, [
      'iframe',
      'link',
      'noscript',
      'form',
    ]);
  }
}
