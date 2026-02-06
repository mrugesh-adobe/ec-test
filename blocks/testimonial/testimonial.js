import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Testimonial block with category label, quote, attribution, CTA, and image
 * Supports content authored with paragraphs or BR-separated text
 *
 * Content structure (either format):
 * Col 1: Category, Quote, Attribution, CTA (as paragraphs or BR-separated)
 * Col 2: Image
 */
export default function decorate(block) {
  const rows = [...block.children];

  if (rows.length === 1 && rows[0].children.length === 2) {
    const [contentCol, imageCol] = rows[0].children;

    // Add base classes
    contentCol.classList.add('testimonial-content');
    imageCol.classList.add('testimonial-image');

    // Check if content is BR-separated (single text block) or paragraph-based
    const paragraphs = contentCol.querySelectorAll('p');

    if (paragraphs.length === 0) {
      // Content is BR-separated text - restructure it
      restructureBrContent(contentCol);
    } else {
      // Content has paragraphs - classify them
      classifyParagraphContent(contentCol, paragraphs);
    }

    // Ensure links have button class
    contentCol.querySelectorAll('a').forEach((link) => {
      if (!link.closest('.testimonial-cta')) {
        const wrapper = document.createElement('p');
        wrapper.classList.add('testimonial-cta');
        link.parentNode.insertBefore(wrapper, link);
        wrapper.appendChild(link);
      }
      link.classList.add('button');
    });
  }

  // Process images - don't use createOptimizedPicture for external URLs
  block.querySelectorAll('picture > img').forEach((img) => {
    // Only optimize local images
    if (!img.src.startsWith('http://') && !img.src.startsWith('https://')) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '600' }]);
      img.closest('picture').replaceWith(optimizedPic);
    }
  });
}

/**
 * Restructure BR-separated content into proper elements
 */
function restructureBrContent(contentCol) {
  const html = contentCol.innerHTML;
  // Split by double BR tags (paragraph separators)
  const parts = html.split(/<br\s*\/?>\s*<br\s*\/?>/gi).map((p) => p.trim()).filter((p) => p);

  contentCol.innerHTML = '';

  parts.forEach((part, index) => {
    const p = document.createElement('p');
    p.innerHTML = part;
    const text = p.textContent.trim();

    if (index === 0 && text.length < 50 && !text.startsWith('"')) {
      // First short text is category
      p.classList.add('testimonial-category');
    } else if (text.startsWith('"') || text.startsWith('"')) {
      // Quote text
      p.classList.add('testimonial-quote');
    } else if (text.startsWith('-') || text.startsWith('–') || text.startsWith('—')) {
      // Attribution
      p.classList.add('testimonial-attribution');
    } else if (p.querySelector('a')) {
      // CTA link
      p.classList.add('testimonial-cta');
    }

    contentCol.appendChild(p);
  });
}

/**
 * Classify existing paragraph elements
 */
function classifyParagraphContent(contentCol, paragraphs) {
  paragraphs.forEach((p, index) => {
    const text = p.textContent.trim();

    if (index === 0 && text.length < 50 && !text.startsWith('"') && !p.querySelector('a')) {
      p.classList.add('testimonial-category');
    } else if (text.startsWith('"') || text.startsWith('"')) {
      p.classList.add('testimonial-quote');
    } else if (text.startsWith('-') || text.startsWith('–') || text.startsWith('—')) {
      p.classList.add('testimonial-attribution');
    } else if (p.querySelector('a')) {
      p.classList.add('testimonial-cta');
    }
  });
}
