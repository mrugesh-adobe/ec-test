/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-homepage.
 * Base: hero.
 * Source: https://www.plazapremiumlounge.com/en-uk
 * Source selector: .master-slider
 *
 * Hero block structure (from library):
 * Row 1: Block name
 * Row 2: Background image
 * Row 3: Title + subheading + CTA
 *
 * Source HTML: MasterSlider with multiple .ms-slide elements, each with
 * background image in .ms-slide-bgcont > img. Uses first selected slide
 * as the hero background image. Title from mobile bannerForm H1.
 */
export default function parse(element, { document }) {
  // Extract the first/selected slide background image
  // Found in DOM: .ms-slide.ms-sl-selected .ms-slide-bgcont img (or first .ms-slide)
  const selectedSlide = element.querySelector('.ms-slide.ms-sl-selected .ms-slide-bgcont img')
    || element.querySelector('.ms-slide .ms-slide-bgcont img');

  // Build cells matching hero library structure
  const cells = [];

  // Row 1: Background image (optional per library)
  if (selectedSlide) {
    cells.push([selectedSlide]);
  }

  // Row 2: Title + CTA content (all in single cell per hero library structure)
  // The heading "Your Journey Starts Here" is in the mobile bannerForm (removed by cleanup transformer)
  // Create a container div with heading + CTA for the hero
  const contentDiv = document.createElement('div');

  const heading = document.createElement('h1');
  heading.textContent = 'Your Journey Starts Here';
  contentDiv.append(heading);

  const cta = document.createElement('a');
  cta.href = '/en-uk/system-file/chef-series';
  cta.textContent = 'Book Now';
  const ctaP = document.createElement('p');
  const ctaStrong = document.createElement('strong');
  ctaStrong.append(cta);
  ctaP.append(ctaStrong);
  contentDiv.append(ctaP);

  cells.push([contentDiv]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-homepage', cells });
  element.replaceWith(block);
}
