/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroHomepageParser from './parsers/hero-homepage.js';
import cardsDealsParser from './parsers/cards-deals.js';
import carouselLoungesParser from './parsers/carousel-lounges.js';
import columnsPromoParser from './parsers/columns-promo.js';
import columnsAwardsParser from './parsers/columns-awards.js';

// TRANSFORMER IMPORTS
import pplCleanupTransformer from './transformers/ppl-cleanup.js';
import pplSectionsTransformer from './transformers/ppl-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-homepage': heroHomepageParser,
  'cards-deals': cardsDealsParser,
  'carousel-lounges': carouselLoungesParser,
  'columns-promo': columnsPromoParser,
  'columns-awards': columnsAwardsParser,
};

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'ppl-homepage',
  description: 'Plaza Premium Lounge homepage with hero carousel, promotional banners, destination finder, service highlights, and brand partner sections.',
  urls: [
    'https://www.plazapremiumlounge.com/en-uk'
  ],
  blocks: [
    {
      name: 'hero-homepage',
      instances: ['.master-slider']
    },
    {
      name: 'cards-deals',
      instances: ['.card-wrapper.features']
    },
    {
      name: 'carousel-lounges',
      instances: ['.owl-carousel.owl-highlights']
    },
    {
      name: 'columns-promo',
      instances: ['.lounge-access']
    },
    {
      name: 'columns-awards',
      instances: ['.location.section']
    }
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero Carousel with Booking Form',
      selector: '.topBannerWrapper',
      style: 'dark',
      blocks: ['hero-homepage'],
      defaultContent: []
    },
    {
      id: 'section-2',
      name: 'Latest Deals & Partner Offers',
      selector: '.news.section',
      style: null,
      blocks: ['cards-deals'],
      defaultContent: ['.news.section h2.title']
    },
    {
      id: 'section-3',
      name: 'New & Reopened Lounges',
      selector: '.news.section',
      style: null,
      blocks: ['carousel-lounges'],
      defaultContent: ['.news.section h2.title:nth-of-type(2)']
    },
    {
      id: 'section-4',
      name: 'Online Exclusive Offer',
      selector: '.lounges.section',
      style: 'dark',
      blocks: ['columns-promo'],
      defaultContent: []
    },
    {
      id: 'section-5',
      name: 'Awards & Recognition',
      selector: '.location.section',
      style: null,
      blocks: ['columns-awards'],
      defaultContent: []
    }
  ]
};

// TRANSFORMER REGISTRY
const transformers = [
  pplCleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [pplSectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, ''),
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
