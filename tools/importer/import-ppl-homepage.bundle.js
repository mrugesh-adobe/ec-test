var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-ppl-homepage.js
  var import_ppl_homepage_exports = {};
  __export(import_ppl_homepage_exports, {
    default: () => import_ppl_homepage_default
  });

  // tools/importer/parsers/hero-homepage.js
  function parse(element, { document }) {
    const selectedSlide = element.querySelector(".ms-slide.ms-sl-selected .ms-slide-bgcont img") || element.querySelector(".ms-slide .ms-slide-bgcont img");
    const cells = [];
    if (selectedSlide) {
      cells.push([selectedSlide]);
    }
    const contentDiv = document.createElement("div");
    const heading = document.createElement("h1");
    heading.textContent = "Your Journey Starts Here";
    contentDiv.append(heading);
    const cta = document.createElement("a");
    cta.href = "/en-uk/system-file/chef-series";
    cta.textContent = "Book Now";
    const ctaP = document.createElement("p");
    const ctaStrong = document.createElement("strong");
    ctaStrong.append(cta);
    ctaP.append(ctaStrong);
    contentDiv.append(ctaP);
    cells.push([contentDiv]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-homepage", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-deals.js
  function parse2(element, { document }) {
    const cards = element.querySelectorAll(":scope .card");
    const cells = [];
    cards.forEach((card) => {
      const img = card.querySelector(".feaImg img") || card.querySelector(".cardHeader img") || card.querySelector("img");
      const title = card.querySelector(".cardContent h3, h3");
      const desc = card.querySelector(".cardContent p, p");
      const link = card.querySelector("a.cardBx, a[href]");
      const href = link ? link.href : "";
      const imageCell = document.createElement("div");
      if (img) {
        const imgSrc = img.src || img.getAttribute("data-src") || img.getAttribute("data-lazy") || "";
        if (imgSrc) {
          const newImg = document.createElement("img");
          newImg.src = imgSrc;
          newImg.alt = img.alt || "";
          imageCell.append(newImg);
        } else {
          imageCell.append(img);
        }
      }
      const contentCell = document.createElement("div");
      if (title) {
        const h3 = document.createElement("h3");
        h3.textContent = title.textContent.trim();
        contentCell.append(h3);
      }
      if (desc && desc.textContent.trim()) {
        const p = document.createElement("p");
        p.textContent = desc.textContent.trim();
        contentCell.append(p);
      }
      if (href) {
        const ctaLink = document.createElement("a");
        ctaLink.href = href;
        ctaLink.textContent = "Learn More";
        const ctaP = document.createElement("p");
        ctaP.append(ctaLink);
        contentCell.append(ctaP);
      }
      cells.push([imageCell, contentCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-deals", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-lounges.js
  function parse3(element, { document }) {
    const items = element.querySelectorAll(".owl-item .item.lo-bx, .item.lo-bx");
    const cells = [];
    const seen = /* @__PURE__ */ new Set();
    items.forEach((item) => {
      const detailPanel = item.querySelector(".ctn-det");
      const summaryPanel = item.querySelector(".ctn");
      const img = item.querySelector(":scope > .bx-bg > img") || item.querySelector(".bx-bg > img") || item.querySelector("img");
      const titleEl = detailPanel && detailPanel.querySelector("h4") || summaryPanel && summaryPanel.querySelector("h4") || item.querySelector("h4");
      let titleText = "";
      let dateText = "";
      if (titleEl) {
        titleText = titleEl.childNodes[0] ? titleEl.childNodes[0].textContent.trim() : titleEl.textContent.trim();
        const dateSpan = titleEl.querySelector("span.no");
        if (dateSpan) {
          dateText = dateSpan.textContent.trim();
        }
      }
      if (seen.has(titleText)) return;
      seen.add(titleText);
      const ctaLink = detailPanel ? detailPanel.querySelector("a.btn, a[href]") : item.querySelector("a.btn, a[href]");
      const imageCell = document.createElement("div");
      if (img) {
        const newImg = document.createElement("img");
        newImg.src = img.src || img.getAttribute("data-src") || "";
        newImg.alt = titleText || "";
        imageCell.append(newImg);
      }
      const contentCell = document.createElement("div");
      if (titleText) {
        const h4 = document.createElement("h4");
        h4.textContent = titleText;
        contentCell.append(h4);
      }
      if (dateText) {
        const p = document.createElement("p");
        p.textContent = dateText;
        contentCell.append(p);
      }
      if (ctaLink) {
        const link = document.createElement("a");
        link.href = ctaLink.href;
        link.textContent = ctaLink.textContent.trim() || "See More";
        const linkP = document.createElement("p");
        linkP.append(link);
        contentCell.append(linkP);
      }
      cells.push([imageCell, contentCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-lounges", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-promo.js
  function parse4(element, { document }) {
    const img = element.querySelector(".featureBanner-right img") || element.querySelector(".img-wrap img") || element.querySelector("img");
    const heading = element.querySelector(".txt-wrap h4, .txt-area h4, h4");
    const descEl = element.querySelector(".txt-wrap p, .txt-area p, p");
    const ctaEl = element.querySelector(".txt-wrap a.btn, .txt-area a.btn, a.btn");
    const imageCell = document.createElement("div");
    if (img) {
      const newImg = document.createElement("img");
      newImg.src = img.src || img.getAttribute("data-src") || "";
      newImg.alt = img.alt || "Lounge interior";
      imageCell.append(newImg);
    }
    const textCell = document.createElement("div");
    if (heading) {
      const h4 = document.createElement("h4");
      h4.innerHTML = heading.innerHTML;
      textCell.append(h4);
    }
    if (descEl && descEl.textContent.trim()) {
      const p = document.createElement("p");
      p.textContent = descEl.textContent.trim();
      textCell.append(p);
    }
    if (ctaEl) {
      const link = document.createElement("a");
      link.href = ctaEl.href;
      link.textContent = ctaEl.textContent.trim() || "Book Now & Save";
      const linkP = document.createElement("p");
      const strong = document.createElement("strong");
      strong.append(link);
      linkP.append(strong);
      textCell.append(linkP);
    }
    const cells = [[imageCell, textCell]];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-promo", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-awards.js
  function parse5(element, { document }) {
    const leftImg = element.querySelector(".column.left img") || element.querySelector(".lo-wrapper img:first-of-type") || element.querySelector("img");
    const rightImg = element.querySelector(".column.right img") || element.querySelector(".lo-wrapper img:nth-of-type(2)");
    const leftCell = document.createElement("div");
    if (leftImg) {
      const newLeftImg = document.createElement("img");
      newLeftImg.src = leftImg.src || leftImg.getAttribute("data-src") || "";
      newLeftImg.alt = leftImg.alt || "Award badge";
      leftCell.append(newLeftImg);
    }
    const rightCell = document.createElement("div");
    if (rightImg) {
      const newRightImg = document.createElement("img");
      newRightImg.src = rightImg.src || rightImg.getAttribute("data-src") || "";
      newRightImg.alt = rightImg.alt || "Global locations";
      rightCell.append(newRightImg);
    }
    const cells = [[leftCell, rightCell]];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-awards", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/ppl-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, [
        "#cBox",
        ".fakeloader",
        ".aspNetHidden",
        "#ctxM",
        ".bannerForm",
        ".mobile.bannerForm"
      ]);
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, [
        "header.cd-main-header",
        ".footer",
        ".wsmain",
        ".branding-header",
        ".book-online.section",
        "iframe",
        "noscript",
        "link"
      ]);
      element.querySelectorAll("*").forEach((el) => {
        el.removeAttribute("onclick");
        el.removeAttribute("data-track");
        el.removeAttribute("data-gtm");
      });
    }
  }

  // tools/importer/transformers/ppl-sections.js
  var H2 = { before: "beforeTransform", after: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === H2.after) {
      const template = payload && payload.template;
      if (!template || !template.sections || template.sections.length < 2) return;
      const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document };
      const sections = template.sections;
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        const selector = Array.isArray(section.selector) ? section.selector : [section.selector];
        let sectionEl = null;
        for (const sel of selector) {
          sectionEl = element.querySelector(sel);
          if (sectionEl) break;
        }
        if (!sectionEl) continue;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(sectionMetadata);
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-ppl-homepage.js
  var parsers = {
    "hero-homepage": parse,
    "cards-deals": parse2,
    "carousel-lounges": parse3,
    "columns-promo": parse4,
    "columns-awards": parse5
  };
  var PAGE_TEMPLATE = {
    name: "ppl-homepage",
    description: "Plaza Premium Lounge homepage with hero carousel, promotional banners, destination finder, service highlights, and brand partner sections.",
    urls: [
      "https://www.plazapremiumlounge.com/en-uk"
    ],
    blocks: [
      {
        name: "hero-homepage",
        instances: [".master-slider"]
      },
      {
        name: "cards-deals",
        instances: [".card-wrapper.features"]
      },
      {
        name: "carousel-lounges",
        instances: [".owl-carousel.owl-highlights"]
      },
      {
        name: "columns-promo",
        instances: [".lounge-access"]
      },
      {
        name: "columns-awards",
        instances: [".location.section"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero Carousel with Booking Form",
        selector: ".topBannerWrapper",
        style: "dark",
        blocks: ["hero-homepage"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Latest Deals & Partner Offers",
        selector: ".news.section",
        style: null,
        blocks: ["cards-deals"],
        defaultContent: [".news.section h2.title"]
      },
      {
        id: "section-3",
        name: "New & Reopened Lounges",
        selector: ".news.section",
        style: null,
        blocks: ["carousel-lounges"],
        defaultContent: [".news.section h2.title:nth-of-type(2)"]
      },
      {
        id: "section-4",
        name: "Online Exclusive Offer",
        selector: ".lounges.section",
        style: "dark",
        blocks: ["columns-promo"],
        defaultContent: []
      },
      {
        id: "section-5",
        name: "Awards & Recognition",
        selector: ".location.section",
        style: null,
        blocks: ["columns-awards"],
        defaultContent: []
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            element
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_ppl_homepage_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_ppl_homepage_exports);
})();
