/* eslint-disable */
/* global WebImporter */

/**
 * Parser for embed block
 *
 * Source: https://www.allwaysvip.com/about-us
 * Base Block: embed
 *
 * Block Structure (from block collection example):
 * - Row 1: Block name header ("Embed")
 * - Row 2: Single cell with video URL (and optional poster image above)
 *
 * Source HTML Pattern:
 * <div class="video-embed-field-provider-youtube video-embed-field-responsive-video form-group">
 *   <iframe src="https://www.youtube.com/embed/17iSs0kmhBI?autoplay=1&start=0&rel=0"></iframe>
 * </div>
 *
 * Generated: 2026-03-03
 */
export default function parse(element, { document }) {
  // Extract YouTube video URL from iframe
  // VALIDATED: Source HTML uses iframe with src containing youtube.com/embed/{videoId}
  const iframe = element.querySelector('iframe');

  let videoUrl = '';
  if (iframe) {
    const src = iframe.getAttribute('src') || '';
    // Convert embed URL to standard YouTube watch URL
    const embedMatch = src.match(/youtube\.com\/embed\/([^?&]+)/);
    if (embedMatch) {
      videoUrl = `https://www.youtube.com/watch?v=${embedMatch[1]}`;
    } else {
      // Fallback: use the iframe src directly
      videoUrl = src;
    }
  }

  // Check for optional poster image (above the iframe in some variations)
  const posterImage = element.querySelector('img');

  // Build cells array matching Embed block structure
  const cells = [];

  // Single content row: optional poster image + video URL link
  const contentCell = [];

  if (posterImage) {
    contentCell.push(posterImage);
  }

  if (videoUrl) {
    const link = document.createElement('a');
    link.href = videoUrl;
    link.textContent = videoUrl;
    contentCell.push(link);
  }

  cells.push(contentCell);

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Embed', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
