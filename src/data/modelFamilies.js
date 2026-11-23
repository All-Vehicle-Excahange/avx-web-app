/**
 * Model Family & Multi-Model Mapping Configuration for Reecomm Search
 *
 * Rules:
 * 1. COMMON / GENERIC FAMILY NAME SEARCH (e.g. "Scorpio", "Thar", "i10", "Swift", "Innova"):
 *    - Automatically identifies the parent brand and selects ALL related generations/models
 *      (e.g., searching "Thar" selects Mahindra and [Thar, Thar Roxx];
 *       searching "Scorpio" selects Mahindra and [Scorpio, Scorpio Classic, Scorpio-N];
 *       searching "i10" selects Hyundai and [i10, Grand i10, Grand i10 Nios, Grand i10 Prime]).
 *
 * 2. PARTICULAR / SPECIFIC SUB-MODEL SEARCH (e.g. "Thar Roxx", "Scorpio Classic", "Grand i10", "Innova Crysta"):
 *    - Only selects that specific sub-model/variant, NOT the generic parent models
 *      (e.g., searching "Thar Roxx" selects ONLY [Thar Roxx], NOT base Thar;
 *       searching "Grand i10" or "i10 grand" selects ONLY Grand i10 models, NOT original base i10;
 *       searching "Scorpio Classic" selects ONLY [Scorpio Classic];
 *       searching "Innova Crysta" selects ONLY [Innova Crysta]).
 */

export const MODEL_FAMILIES = {
  // ═══════════════════════════════════════════════════════════════════════════
  // MAHINDRA (makerId: 20)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── Specific / Particular Mahindra Models (Evaluated First) ───────────────
  "thar-roxx": {
    key: "thar-roxx",
    brandName: "Mahindra",
    makerId: 20,
    familyName: "Thar Roxx",
    aliases: ["thar roxx", "thar-roxx", "mahindra thar roxx", "roxx"],
    targetUrl: "/search/buy-used-mahindra-thar-roxx-cars",
    urlSlug: "buy-used-mahindra-thar-roxx-cars",
    isSubModel: true,
    models: [{ modelId: 714, modelName: "Thar Roxx" }],
  },
  "scorpio-classic": {
    key: "scorpio-classic",
    brandName: "Mahindra",
    makerId: 20,
    familyName: "Scorpio Classic",
    aliases: ["scorpio classic", "mahindra scorpio classic"],
    targetUrl: "/search/buy-used-mahindra-scorpio-classic-cars",
    urlSlug: "buy-used-mahindra-scorpio-classic-cars",
    isSubModel: true,
    models: [{ modelId: 638, modelName: "Scorpio Classic" }],
  },
  "scorpio-n": {
    key: "scorpio-n",
    brandName: "Mahindra",
    makerId: 20,
    familyName: "Scorpio-N",
    aliases: ["scorpio n", "scorpio-n", "mahindra scorpio n", "mahindra scorpio-n"],
    targetUrl: "/search/buy-used-mahindra-scorpio-n-cars",
    urlSlug: "buy-used-mahindra-scorpio-n-cars",
    isSubModel: true,
    models: [{ modelId: 642, modelName: "Scorpio-N" }],
  },
  "bolero-neo": {
    key: "bolero-neo",
    brandName: "Mahindra",
    makerId: 20,
    familyName: "Bolero Neo",
    aliases: [
      "bolero neo",
      "bolero-neo",
      "bolero neo plus",
      "mahindra bolero neo",
      "mahindra bolero neo plus",
    ],
    targetUrl: "/search/buy-used-mahindra-bolero-neo-cars",
    urlSlug: "buy-used-mahindra-bolero-neo-cars",
    isSubModel: true,
    models: [
      { modelId: 602, modelName: "Bolero Neo" },
      { modelId: 711, modelName: "Bolero Neo Plus" },
    ],
  },
  "xuv-3xo": {
    key: "xuv-3xo",
    brandName: "Mahindra",
    makerId: 20,
    familyName: "XUV 3XO",
    aliases: ["xuv 3xo", "xuv3xo", "3xo", "mahindra xuv 3xo", "mahindra 3xo", "xuv 3xo ev"],
    targetUrl: "/search/buy-used-mahindra-xuv-3xo-cars",
    urlSlug: "buy-used-mahindra-xuv-3xo-cars",
    isSubModel: true,
    models: [
      { modelId: 678, modelName: "XUV 3XO" },
      { modelId: 756, modelName: "XUV 3XO EV" },
    ],
  },
  "xuv-7xo": {
    key: "xuv-7xo",
    brandName: "Mahindra",
    makerId: 20,
    familyName: "XUV 7XO",
    aliases: ["xuv 7xo", "xuv7xo", "7xo", "mahindra xuv 7xo"],
    targetUrl: "/search/buy-used-mahindra-xuv-7xo-cars",
    urlSlug: "buy-used-mahindra-xuv-7xo-cars",
    isSubModel: true,
    models: [{ modelId: 755, modelName: "XUV 7XO" }],
  },

  // ── Common / Generic Mahindra Families ────────────────────────────────────
  scorpio: {
    key: "scorpio",
    brandName: "Mahindra",
    makerId: 20,
    familyName: "Scorpio",
    aliases: ["scorpio", "mahindra scorpio"],
    targetUrl: "/search/buy-used-mahindra-scorpio-cars",
    urlSlug: "buy-used-mahindra-scorpio-cars",
    models: [
      { modelId: 127, modelName: "Scorpio" },
      { modelId: 638, modelName: "Scorpio Classic" },
      { modelId: 642, modelName: "Scorpio-N" },
    ],
  },
  thar: {
    key: "thar",
    brandName: "Mahindra",
    makerId: 20,
    familyName: "Thar",
    aliases: ["thar", "mahindra thar"],
    targetUrl: "/search/buy-used-mahindra-thar-cars",
    urlSlug: "buy-used-mahindra-thar-cars",
    models: [
      { modelId: 128, modelName: "Thar" },
      { modelId: 714, modelName: "Thar Roxx" },
    ],
  },
  bolero: {
    key: "bolero",
    brandName: "Mahindra",
    makerId: 20,
    familyName: "Bolero",
    aliases: ["bolero", "mahindra bolero"],
    targetUrl: "/search/buy-used-mahindra-bolero-cars",
    urlSlug: "buy-used-mahindra-bolero-cars",
    models: [
      { modelId: 123, modelName: "Bolero" },
      { modelId: 602, modelName: "Bolero Neo" },
      { modelId: 711, modelName: "Bolero Neo Plus" },
    ],
  },
  xuv300: {
    key: "xuv300",
    brandName: "Mahindra",
    makerId: 20,
    familyName: "XUV300",
    aliases: ["xuv300", "xuv 300", "mahindra xuv300", "xuv 300 ev"],
    targetUrl: "/search/buy-used-mahindra-xuv300-cars",
    urlSlug: "buy-used-mahindra-xuv300-cars",
    models: [
      { modelId: 454, modelName: "XUV300" },
      { modelId: 678, modelName: "XUV 3XO" },
      { modelId: 756, modelName: "XUV 3XO EV" },
    ],
  },
  xuv700: {
    key: "xuv700",
    brandName: "Mahindra",
    makerId: 20,
    familyName: "XUV700",
    aliases: ["xuv700", "xuv 700", "mahindra xuv700"],
    targetUrl: "/search/buy-used-mahindra-xuv700-cars",
    urlSlug: "buy-used-mahindra-xuv700-cars",
    models: [
      { modelId: 611, modelName: "XUV700" },
      { modelId: 755, modelName: "XUV 7XO" },
    ],
  },
  tuv300: {
    key: "tuv300",
    brandName: "Mahindra",
    makerId: 20,
    familyName: "TUV300",
    aliases: ["tuv300", "tuv 300", "tuv 300 plus", "mahindra tuv300"],
    targetUrl: "/search/buy-used-mahindra-tuv300-cars",
    urlSlug: "buy-used-mahindra-tuv300-cars",
    models: [
      { modelId: 329, modelName: "TUV300" },
      { modelId: 394, modelName: "TUV 300 Plus" },
    ],
  },
  kuv100: {
    key: "kuv100",
    brandName: "Mahindra",
    makerId: 20,
    familyName: "KUV100",
    aliases: ["kuv100", "kuv 100", "kuv 100 nxt", "mahindra kuv100"],
    targetUrl: "/search/buy-used-mahindra-kuv100-cars",
    urlSlug: "buy-used-mahindra-kuv100-cars",
    models: [
      { modelId: 341, modelName: "Kuv100" },
      { modelId: 390, modelName: "KUV 100 NXT" },
    ],
  },
  verito: {
    key: "verito",
    brandName: "Mahindra",
    makerId: 20,
    familyName: "Verito",
    aliases: ["verito", "mahindra verito", "verito vibe", "e verito"],
    targetUrl: "/search/buy-used-mahindra-verito-cars",
    urlSlug: "buy-used-mahindra-verito-cars",
    models: [
      { modelId: 129, modelName: "Verito" },
      { modelId: 130, modelName: "Verito Vibe CS" },
      { modelId: 502, modelName: "E VERITO" },
    ],
  },
  xev: {
    key: "xev",
    brandName: "Mahindra",
    makerId: 20,
    familyName: "XEV",
    aliases: ["xev", "xev 9e", "xev 9s", "mahindra xev"],
    targetUrl: "/search/buy-used-mahindra-xev-cars",
    urlSlug: "buy-used-mahindra-xev-cars",
    models: [
      { modelId: 721, modelName: "XEV 9e" },
      { modelId: 751, modelName: "XEV 9S" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HYUNDAI (makerId: 15)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── Specific / Particular Hyundai Models (Evaluated First) ────────────────
  "grand-i10": {
    key: "grand-i10",
    brandName: "Hyundai",
    makerId: 15,
    familyName: "Grand i10",
    aliases: [
      "grand i10",
      "i10 grand",
      "grand-i10",
      "hyundai grand i10",
      "hyundai i10 grand",
    ],
    targetUrl: "/search/buy-used-hyundai-grand-i10-cars",
    urlSlug: "buy-used-hyundai-grand-i10-cars",
    isSubModel: true,
    models: [
      { modelId: 94, modelName: "Grand i10" },
      { modelId: 487, modelName: "Grand i10 Nios" },
      { modelId: 470, modelName: "Grand i10 Prime" },
    ],
  },
  "grand-i10-nios": {
    key: "grand-i10-nios",
    brandName: "Hyundai",
    makerId: 15,
    familyName: "Grand i10 Nios",
    aliases: ["grand i10 nios", "i10 nios", "hyundai grand i10 nios", "hyundai nios"],
    targetUrl: "/search/buy-used-hyundai-grand-i10-nios-cars",
    urlSlug: "buy-used-hyundai-grand-i10-nios-cars",
    isSubModel: true,
    models: [{ modelId: 487, modelName: "Grand i10 Nios" }],
  },
  "elite-i20": {
    key: "elite-i20",
    brandName: "Hyundai",
    makerId: 15,
    familyName: "Elite i20",
    aliases: ["elite i20", "i20 elite", "hyundai elite i20"],
    targetUrl: "/search/buy-used-hyundai-elite-i20-cars",
    urlSlug: "buy-used-hyundai-elite-i20-cars",
    isSubModel: true,
    models: [{ modelId: 91, modelName: "Elite i20" }],
  },
  "i20-n-line": {
    key: "i20-n-line",
    brandName: "Hyundai",
    makerId: 15,
    familyName: "i20 N Line",
    aliases: ["i20 n line", "i20 nline", "hyundai i20 n line"],
    targetUrl: "/search/buy-used-hyundai-i20-n-line-cars",
    urlSlug: "buy-used-hyundai-i20-n-line-cars",
    isSubModel: true,
    models: [{ modelId: 608, modelName: "New i20 N Line" }],
  },
  "creta-n-line": {
    key: "creta-n-line",
    brandName: "Hyundai",
    makerId: 15,
    familyName: "Creta N Line",
    aliases: ["creta n line", "creta nline", "hyundai creta n line"],
    targetUrl: "/search/buy-used-hyundai-creta-n-line-cars",
    urlSlug: "buy-used-hyundai-creta-n-line-cars",
    isSubModel: true,
    models: [{ modelId: 674, modelName: "Creta N Line" }],
  },
  "creta-electric": {
    key: "creta-electric",
    brandName: "Hyundai",
    makerId: 15,
    familyName: "Creta Electric",
    aliases: ["creta electric", "creta ev", "hyundai creta electric", "hyundai creta ev"],
    targetUrl: "/search/buy-used-hyundai-creta-electric-cars",
    urlSlug: "buy-used-hyundai-creta-electric-cars",
    isSubModel: true,
    models: [{ modelId: 734, modelName: "Creta Electric" }],
  },
  "venue-n-line": {
    key: "venue-n-line",
    brandName: "Hyundai",
    makerId: 15,
    familyName: "Venue N Line",
    aliases: ["venue n line", "venue nline", "hyundai venue n line"],
    targetUrl: "/search/buy-used-hyundai-venue-n-line-cars",
    urlSlug: "buy-used-hyundai-venue-n-line-cars",
    isSubModel: true,
    models: [{ modelId: 641, modelName: "Venue N Line" }],
  },

  // ── Common / Generic Hyundai Families ─────────────────────────────────────
  i10: {
    key: "i10",
    brandName: "Hyundai",
    makerId: 15,
    familyName: "i10",
    aliases: ["i10", "hyundai i10"],
    targetUrl: "/search/buy-used-hyundai-i10-cars",
    urlSlug: "buy-used-hyundai-i10-cars",
    models: [
      { modelId: 95, modelName: "i10" },
      { modelId: 94, modelName: "Grand i10" },
      { modelId: 487, modelName: "Grand i10 Nios" },
      { modelId: 470, modelName: "Grand i10 Prime" },
    ],
  },
  i20: {
    key: "i20",
    brandName: "Hyundai",
    makerId: 15,
    familyName: "i20",
    aliases: ["i20", "hyundai i20", "new i20", "i20 active"],
    targetUrl: "/search/buy-used-hyundai-i20-cars",
    urlSlug: "buy-used-hyundai-i20-cars",
    models: [
      { modelId: 96, modelName: "i20" },
      { modelId: 91, modelName: "Elite i20" },
      { modelId: 321, modelName: "i20 Active" },
      { modelId: 582, modelName: "New i20" },
      { modelId: 608, modelName: "New i20 N Line" },
    ],
  },
  creta: {
    key: "creta",
    brandName: "Hyundai",
    makerId: 15,
    familyName: "Creta",
    aliases: ["creta", "hyundai creta"],
    targetUrl: "/search/buy-used-hyundai-creta-cars",
    urlSlug: "buy-used-hyundai-creta-cars",
    models: [
      { modelId: 320, modelName: "Creta" },
      { modelId: 674, modelName: "Creta N Line" },
      { modelId: 734, modelName: "Creta Electric" },
    ],
  },
  venue: {
    key: "venue",
    brandName: "Hyundai",
    makerId: 15,
    familyName: "Venue",
    aliases: ["venue", "hyundai venue"],
    targetUrl: "/search/buy-used-hyundai-venue-cars",
    urlSlug: "buy-used-hyundai-venue-cars",
    models: [
      { modelId: 462, modelName: "Venue" },
      { modelId: 641, modelName: "Venue N Line" },
    ],
  },
  santro: {
    key: "santro",
    brandName: "Hyundai",
    makerId: 15,
    familyName: "Santro",
    aliases: ["santro", "hyundai santro", "santro xing", "new santro"],
    targetUrl: "/search/buy-used-hyundai-santro-cars",
    urlSlug: "buy-used-hyundai-santro-cars",
    models: [
      { modelId: 308, modelName: "Santro" },
      { modelId: 99, modelName: "Santro Xing" },
      { modelId: 421, modelName: "New Santro" },
    ],
  },
  xcent: {
    key: "xcent",
    brandName: "Hyundai",
    makerId: 15,
    familyName: "Xcent",
    aliases: ["xcent", "hyundai xcent", "xcent prime"],
    targetUrl: "/search/buy-used-hyundai-xcent-cars",
    urlSlug: "buy-used-hyundai-xcent-cars",
    models: [
      { modelId: 103, modelName: "Xcent" },
      { modelId: 446, modelName: "Xcent Prime" },
    ],
  },
  sonata: {
    key: "sonata",
    brandName: "Hyundai",
    makerId: 15,
    familyName: "Sonata",
    aliases: ["sonata", "hyundai sonata", "sonata embera", "sonata transform"],
    targetUrl: "/search/buy-used-hyundai-sonata-cars",
    urlSlug: "buy-used-hyundai-sonata-cars",
    models: [
      { modelId: 100, modelName: "Sonata" },
      { modelId: 279, modelName: "Sonata Embera" },
      { modelId: 101, modelName: "Sonata Transform" },
    ],
  },
  getz: {
    key: "getz",
    brandName: "Hyundai",
    makerId: 15,
    familyName: "Getz",
    aliases: ["getz", "hyundai getz", "getz prime"],
    targetUrl: "/search/buy-used-hyundai-getz-cars",
    urlSlug: "buy-used-hyundai-getz-cars",
    models: [
      { modelId: 294, modelName: "Getz" },
      { modelId: 273, modelName: "Getz Prime" },
    ],
  },
  elantra: {
    key: "elantra",
    brandName: "Hyundai",
    makerId: 15,
    familyName: "Elantra",
    aliases: ["elantra", "hyundai elantra", "new elantra"],
    targetUrl: "/search/buy-used-hyundai-elantra-cars",
    urlSlug: "buy-used-hyundai-elantra-cars",
    models: [
      { modelId: 90, modelName: "Elantra" },
      { modelId: 97, modelName: "New Elantra" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MARUTI SUZUKI (makerId: 21)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── Specific / Particular Maruti Suzuki Models (Evaluated First) ──────────
  dzire: {
    key: "dzire",
    brandName: "Maruti Suzuki",
    makerId: 21,
    familyName: "Dzire",
    aliases: [
      "dzire",
      "swift dzire",
      "maruti dzire",
      "maruti swift dzire",
      "maruti suzuki dzire",
    ],
    targetUrl: "/search/buy-used-maruti-suzuki-dzire-cars",
    urlSlug: "buy-used-maruti-suzuki-dzire-cars",
    isSubModel: true,
    models: [
      { modelId: 348, modelName: "Dzire" },
      { modelId: 147, modelName: "Swift Dzire" },
    ],
  },
  "alto-k10": {
    key: "alto-k10",
    brandName: "Maruti Suzuki",
    makerId: 21,
    familyName: "Alto K10",
    aliases: ["alto k10", "altok10", "maruti alto k10", "maruti suzuki alto k10"],
    targetUrl: "/search/buy-used-maruti-suzuki-alto-k10-cars",
    urlSlug: "buy-used-maruti-suzuki-alto-k10-cars",
    isSubModel: true,
    models: [{ modelId: 330, modelName: "Alto K10" }],
  },
  "alto-800": {
    key: "alto-800",
    brandName: "Maruti Suzuki",
    makerId: 21,
    familyName: "Alto 800",
    aliases: ["alto 800", "maruti alto 800", "maruti suzuki alto 800"],
    targetUrl: "/search/buy-used-maruti-suzuki-alto-800-cars",
    urlSlug: "buy-used-maruti-suzuki-alto-800-cars",
    isSubModel: true,
    models: [{ modelId: 136, modelName: "Alto 800" }],
  },
  "vitara-brezza": {
    key: "vitara-brezza",
    brandName: "Maruti Suzuki",
    makerId: 21,
    familyName: "Vitara Brezza",
    aliases: ["vitara brezza", "maruti vitara brezza"],
    targetUrl: "/search/buy-used-maruti-suzuki-vitara-brezza-cars",
    urlSlug: "buy-used-maruti-suzuki-vitara-brezza-cars",
    isSubModel: true,
    models: [{ modelId: 338, modelName: "Vitara Brezza" }],
  },

  // ── Common / Generic Maruti Suzuki Families ───────────────────────────────
  swift: {
    key: "swift",
    brandName: "Maruti Suzuki",
    makerId: 21,
    familyName: "Swift",
    aliases: ["swift", "maruti swift", "maruti suzuki swift"],
    targetUrl: "/search/buy-used-maruti-suzuki-swift-cars",
    urlSlug: "buy-used-maruti-suzuki-swift-cars",
    models: [
      { modelId: 146, modelName: "Swift" },
      { modelId: 147, modelName: "Swift Dzire" },
      { modelId: 348, modelName: "Dzire" },
    ],
  },
  "wagon-r": {
    key: "wagon-r",
    brandName: "Maruti Suzuki",
    makerId: 21,
    familyName: "Wagon R",
    aliases: [
      "wagon r",
      "wagonr",
      "wagon-r",
      "maruti wagon r",
      "maruti suzuki wagon r",
      "wagon r stingray",
      "stingray",
      "new wagon r",
      "wagon r duo",
    ],
    targetUrl: "/search/buy-used-maruti-suzuki-wagon-r-cars",
    urlSlug: "buy-used-maruti-suzuki-wagon-r-cars",
    models: [
      { modelId: 149, modelName: "Wagon R" },
      { modelId: 150, modelName: "Wagon R 1.0" },
      { modelId: 276, modelName: "Wagon R Duo" },
      { modelId: 151, modelName: "Wagon R Stingray" },
      { modelId: 427, modelName: "Wagon R MAV" },
      { modelId: 460, modelName: "New Wagon-R" },
    ],
  },
  alto: {
    key: "alto",
    brandName: "Maruti Suzuki",
    makerId: 21,
    familyName: "Alto",
    aliases: ["alto", "maruti alto", "maruti suzuki alto"],
    targetUrl: "/search/buy-used-maruti-suzuki-alto-cars",
    urlSlug: "buy-used-maruti-suzuki-alto-cars",
    models: [
      { modelId: 135, modelName: "Alto" },
      { modelId: 136, modelName: "Alto 800" },
      { modelId: 330, modelName: "Alto K10" },
    ],
  },
  brezza: {
    key: "brezza",
    brandName: "Maruti Suzuki",
    makerId: 21,
    familyName: "Brezza",
    aliases: ["brezza", "maruti brezza", "maruti suzuki brezza"],
    targetUrl: "/search/buy-used-maruti-suzuki-brezza-cars",
    urlSlug: "buy-used-maruti-suzuki-brezza-cars",
    models: [
      { modelId: 338, modelName: "Vitara Brezza" },
      { modelId: 635, modelName: "Brezza" },
    ],
  },
  celerio: {
    key: "celerio",
    brandName: "Maruti Suzuki",
    makerId: 21,
    familyName: "Celerio",
    aliases: ["celerio", "celerio x", "maruti celerio", "maruti suzuki celerio"],
    targetUrl: "/search/buy-used-maruti-suzuki-celerio-cars",
    urlSlug: "buy-used-maruti-suzuki-celerio-cars",
    models: [
      { modelId: 137, modelName: "Celerio" },
      { modelId: 346, modelName: "Celerio X" },
    ],
  },
  zen: {
    key: "zen",
    brandName: "Maruti Suzuki",
    makerId: 21,
    familyName: "Zen",
    aliases: ["zen", "zen estilo", "maruti zen", "maruti suzuki zen"],
    targetUrl: "/search/buy-used-maruti-suzuki-zen-cars",
    urlSlug: "buy-used-maruti-suzuki-zen-cars",
    models: [
      { modelId: 300, modelName: "Zen" },
      { modelId: 152, modelName: "Zen Estilo" },
    ],
  },
  omni: {
    key: "omni",
    brandName: "Maruti Suzuki",
    makerId: 21,
    familyName: "Omni",
    aliases: ["omni", "omni e", "maruti omni", "maruti suzuki omni"],
    targetUrl: "/search/buy-used-maruti-suzuki-omni-cars",
    urlSlug: "buy-used-maruti-suzuki-omni-cars",
    models: [
      { modelId: 144, modelName: "Omni" },
      { modelId: 398, modelName: "Omni E" },
    ],
  },
  sx4: {
    key: "sx4",
    brandName: "Maruti Suzuki",
    makerId: 21,
    familyName: "SX4",
    aliases: ["sx4", "maruti sx4", "sx4 hatchback"],
    targetUrl: "/search/buy-used-maruti-suzuki-sx4-cars",
    urlSlug: "buy-used-maruti-suzuki-sx4-cars",
    models: [
      { modelId: 148, modelName: "SX4" },
      { modelId: 653, modelName: "SX4 Hatchback" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TATA (makerId: 34)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── Specific / Particular Tata Models (Evaluated First) ───────────────────
  "safari-storme": {
    key: "safari-storme",
    brandName: "Tata",
    makerId: 34,
    familyName: "Safari Storme",
    aliases: ["safari storme", "storme", "tata safari storme"],
    targetUrl: "/search/buy-used-tata-safari-storme-cars",
    urlSlug: "buy-used-tata-safari-storme-cars",
    isSubModel: true,
    models: [{ modelId: 229, modelName: "Safari Storme" }],
  },
  "nexon-ev": {
    key: "nexon-ev",
    brandName: "Tata",
    makerId: 34,
    familyName: "Nexon EV",
    aliases: ["nexon ev", "tata nexon ev"],
    targetUrl: "/search/buy-used-tata-nexon-ev-cars",
    urlSlug: "buy-used-tata-nexon-ev-cars",
    isSubModel: true,
    models: [{ modelId: 504, modelName: "Nexon EV" }],
  },
  "punch-ev": {
    key: "punch-ev",
    brandName: "Tata",
    makerId: 34,
    familyName: "Punch EV",
    aliases: ["punch ev", "tata punch ev"],
    targetUrl: "/search/buy-used-tata-punch-ev-cars",
    urlSlug: "buy-used-tata-punch-ev-cars",
    isSubModel: true,
    models: [{ modelId: 673, modelName: "Punch EV" }],
  },
  "tiago-ev": {
    key: "tiago-ev",
    brandName: "Tata",
    makerId: 34,
    familyName: "Tiago EV",
    aliases: ["tiago ev", "tata tiago ev"],
    targetUrl: "/search/buy-used-tata-tiago-ev-cars",
    urlSlug: "buy-used-tata-tiago-ev-cars",
    isSubModel: true,
    models: [{ modelId: 644, modelName: "Tiago EV" }],
  },
  "harrier-ev": {
    key: "harrier-ev",
    brandName: "Tata",
    makerId: 34,
    familyName: "Harrier EV",
    aliases: ["harrier ev", "tata harrier ev"],
    targetUrl: "/search/buy-used-tata-harrier-ev-cars",
    urlSlug: "buy-used-tata-harrier-ev-cars",
    isSubModel: true,
    models: [{ modelId: 737, modelName: "Harrier EV" }],
  },
  "curvv-ev": {
    key: "curvv-ev",
    brandName: "Tata",
    makerId: 34,
    familyName: "Curvv EV",
    aliases: ["curvv ev", "tata curvv ev"],
    targetUrl: "/search/buy-used-tata-curvv-ev-cars",
    urlSlug: "buy-used-tata-curvv-ev-cars",
    isSubModel: true,
    models: [{ modelId: 713, modelName: "Curvv EV" }],
  },

  // ── Common / Generic Tata Families ────────────────────────────────────────
  safari: {
    key: "safari",
    brandName: "Tata",
    makerId: 34,
    familyName: "Safari",
    aliases: ["safari", "tata safari"],
    targetUrl: "/search/buy-used-tata-safari-cars",
    urlSlug: "buy-used-tata-safari-cars",
    models: [
      { modelId: 228, modelName: "Safari" },
      { modelId: 229, modelName: "Safari Storme" },
    ],
  },
  harrier: {
    key: "harrier",
    brandName: "Tata",
    makerId: 34,
    familyName: "Harrier",
    aliases: ["harrier", "tata harrier"],
    targetUrl: "/search/buy-used-tata-harrier-cars",
    urlSlug: "buy-used-tata-harrier-cars",
    models: [
      { modelId: 455, modelName: "Harrier" },
      { modelId: 737, modelName: "Harrier EV" },
    ],
  },
  nexon: {
    key: "nexon",
    brandName: "Tata",
    makerId: 34,
    familyName: "Nexon",
    aliases: ["nexon", "tata nexon"],
    targetUrl: "/search/buy-used-tata-nexon-cars",
    urlSlug: "buy-used-tata-nexon-cars",
    models: [
      { modelId: 359, modelName: "Nexon" },
      { modelId: 504, modelName: "Nexon EV" },
    ],
  },
  punch: {
    key: "punch",
    brandName: "Tata",
    makerId: 34,
    familyName: "Punch",
    aliases: ["punch", "tata punch"],
    targetUrl: "/search/buy-used-tata-punch-cars",
    urlSlug: "buy-used-tata-punch-cars",
    models: [
      { modelId: 607, modelName: "Punch" },
      { modelId: 673, modelName: "Punch EV" },
    ],
  },
  tiago: {
    key: "tiago",
    brandName: "Tata",
    makerId: 34,
    familyName: "Tiago",
    aliases: ["tiago", "tata tiago", "tiago nrg", "tiago jtp"],
    targetUrl: "/search/buy-used-tata-tiago-cars",
    urlSlug: "buy-used-tata-tiago-cars",
    models: [
      { modelId: 336, modelName: "Tiago" },
      { modelId: 644, modelName: "Tiago EV" },
      { modelId: 422, modelName: "Tiago NRG" },
      { modelId: 465, modelName: "Tiago JTP" },
    ],
  },
  tigor: {
    key: "tigor",
    brandName: "Tata",
    makerId: 34,
    familyName: "Tigor",
    aliases: ["tigor", "tata tigor", "tigor ev", "tigor buzz", "tigor jtp"],
    targetUrl: "/search/buy-used-tata-tigor-cars",
    urlSlug: "buy-used-tata-tigor-cars",
    models: [
      { modelId: 363, modelName: "Tigor" },
      { modelId: 591, modelName: "Tigor EV" },
      { modelId: 453, modelName: "Tigor Buzz" },
      { modelId: 474, modelName: "Tigor JTP" },
    ],
  },
  curvv: {
    key: "curvv",
    brandName: "Tata",
    makerId: 34,
    familyName: "Curvv",
    aliases: ["curvv", "tata curvv"],
    targetUrl: "/search/buy-used-tata-curvv-cars",
    urlSlug: "buy-used-tata-curvv-cars",
    models: [
      { modelId: 712, modelName: "Curvv" },
      { modelId: 713, modelName: "Curvv EV" },
    ],
  },
  sumo: {
    key: "sumo",
    brandName: "Tata",
    makerId: 34,
    familyName: "Sumo",
    aliases: ["sumo", "tata sumo", "sumo gold", "sumo grande", "sumo victa"],
    targetUrl: "/search/buy-used-tata-sumo-cars",
    urlSlug: "buy-used-tata-sumo-cars",
    models: [
      { modelId: 230, modelName: "Sumo" },
      { modelId: 231, modelName: "Sumo Gold" },
      { modelId: 232, modelName: "Sumo Grande" },
      { modelId: 568, modelName: "Sumo Victa" },
    ],
  },
  indica: {
    key: "indica",
    brandName: "Tata",
    makerId: 34,
    familyName: "Indica",
    aliases: ["indica", "tata indica", "indica vista", "indica v2", "indica ev2", "indicab"],
    targetUrl: "/search/buy-used-tata-indica-cars",
    urlSlug: "buy-used-tata-indica-cars",
    models: [
      { modelId: 218, modelName: "Indica" },
      { modelId: 221, modelName: "Indica V2" },
      { modelId: 284, modelName: "Indica V2 Turbo" },
      { modelId: 222, modelName: "Indica V2 Xeta" },
      { modelId: 223, modelName: "Indica Vista" },
      { modelId: 220, modelName: "Indica EV2" },
      { modelId: 318, modelName: "Indica EV2 Xeta" },
      { modelId: 296, modelName: "Indicab" },
    ],
  },
  indigo: {
    key: "indigo",
    brandName: "Tata",
    makerId: 34,
    familyName: "Indigo",
    aliases: ["indigo", "tata indigo", "indigo cs", "indigo ecs", "indigo marina", "indigo xl"],
    targetUrl: "/search/buy-used-tata-indigo-cars",
    urlSlug: "buy-used-tata-indigo-cars",
    models: [
      { modelId: 280, modelName: "Indigo" },
      { modelId: 268, modelName: "Indigo CS" },
      { modelId: 224, modelName: "Indigo ECS" },
      { modelId: 278, modelName: "Indigo Marina" },
      { modelId: 269, modelName: "Indigo XL" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TOYOTA (makerId: 35)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── Specific / Particular Toyota Models (Evaluated First) ─────────────────
  "innova-crysta": {
    key: "innova-crysta",
    brandName: "Toyota",
    makerId: 35,
    familyName: "Innova Crysta",
    aliases: ["innova crysta", "crysta", "toyota innova crysta", "toyota crysta"],
    targetUrl: "/search/buy-used-toyota-innova-crysta-cars",
    urlSlug: "buy-used-toyota-innova-crysta-cars",
    isSubModel: true,
    models: [{ modelId: 339, modelName: "Innova Crysta" }],
  },
  "innova-hycross": {
    key: "innova-hycross",
    brandName: "Toyota",
    makerId: 35,
    familyName: "Innova Hycross",
    aliases: ["innova hycross", "hycross", "toyota innova hycross", "toyota hycross"],
    targetUrl: "/search/buy-used-toyota-innova-hycross-cars",
    urlSlug: "buy-used-toyota-innova-hycross-cars",
    isSubModel: true,
    models: [{ modelId: 647, modelName: "Innova Hycross" }],
  },

  // ── Common / Generic Toyota Families ──────────────────────────────────────
  innova: {
    key: "innova",
    brandName: "Toyota",
    makerId: 35,
    familyName: "Innova",
    aliases: ["innova", "toyota innova"],
    targetUrl: "/search/buy-used-toyota-innova-cars",
    urlSlug: "buy-used-toyota-innova-cars",
    models: [
      { modelId: 244, modelName: "Innova" },
      { modelId: 339, modelName: "Innova Crysta" },
      { modelId: 647, modelName: "Innova Hycross" },
    ],
  },
  corolla: {
    key: "corolla",
    brandName: "Toyota",
    makerId: 35,
    familyName: "Corolla",
    aliases: ["corolla", "toyota corolla", "corolla altis"],
    targetUrl: "/search/buy-used-toyota-corolla-cars",
    urlSlug: "buy-used-toyota-corolla-cars",
    models: [
      { modelId: 286, modelName: "Corolla" },
      { modelId: 240, modelName: "Corolla Altis" },
      { modelId: 637, modelName: "Corolla Axio" },
      { modelId: 579, modelName: "Corolla Fielder" },
    ],
  },
  etios: {
    key: "etios",
    brandName: "Toyota",
    makerId: 35,
    familyName: "Etios",
    aliases: ["etios", "toyota etios", "etios liva"],
    targetUrl: "/search/buy-used-toyota-etios-cars",
    urlSlug: "buy-used-toyota-etios-cars",
    models: [
      { modelId: 241, modelName: "Etios" },
      { modelId: 242, modelName: "Etios Liva" },
    ],
  },
  "urban-cruiser": {
    key: "urban-cruiser",
    brandName: "Toyota",
    makerId: 35,
    familyName: "Urban Cruiser",
    aliases: ["urban cruiser", "urban-cruiser", "toyota urban cruiser", "hyryder", "taisor"],
    targetUrl: "/search/buy-used-toyota-urban-cruiser-cars",
    urlSlug: "buy-used-toyota-urban-cruiser-cars",
    models: [
      { modelId: 559, modelName: "Urban Cruiser" },
      { modelId: 643, modelName: "Urban Cruiser Hyryder" },
      { modelId: 677, modelName: "Urban Cruiser Taisor" },
    ],
  },
  "land-cruiser": {
    key: "land-cruiser",
    brandName: "Toyota",
    makerId: 35,
    familyName: "Land Cruiser",
    aliases: ["land cruiser", "land-cruiser", "toyota land cruiser", "prado"],
    targetUrl: "/search/buy-used-toyota-land-cruiser-cars",
    urlSlug: "buy-used-toyota-land-cruiser-cars",
    models: [
      { modelId: 245, modelName: "Land Cruiser" },
      { modelId: 246, modelName: "Land Cruiser Prado" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HONDA (makerId: 14)
  // ═══════════════════════════════════════════════════════════════════════════
  city: {
    key: "city",
    brandName: "Honda",
    makerId: 14,
    familyName: "City",
    aliases: ["honda city", "city zx"],
    targetUrl: "/search/buy-used-honda-city-cars",
    urlSlug: "buy-used-honda-city-cars",
    models: [
      { modelId: 83, modelName: "City" },
      { modelId: 281, modelName: "City ZX" },
    ],
  },
  civic: {
    key: "civic",
    brandName: "Honda",
    makerId: 14,
    familyName: "Civic",
    aliases: ["civic", "honda civic", "civic hybrid"],
    targetUrl: "/search/buy-used-honda-civic-cars",
    urlSlug: "buy-used-honda-civic-cars",
    models: [
      { modelId: 84, modelName: "Civic" },
      { modelId: 272, modelName: "Civic Hybrid" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KIA (makerId: 51)
  // ═══════════════════════════════════════════════════════════════════════════
  carens: {
    key: "carens",
    brandName: "KIA",
    makerId: 51,
    familyName: "Carens",
    aliases: ["carens", "kia carens", "carens clavis"],
    targetUrl: "/search/buy-used-kia-carens-cars",
    urlSlug: "buy-used-kia-carens-cars",
    models: [
      { modelId: 615, modelName: "Carens" },
      { modelId: 733, modelName: "Carens Clavis" },
      { modelId: 739, modelName: "Carens Clavis EV" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // VOLKSWAGEN (makerId: 36)
  // ═══════════════════════════════════════════════════════════════════════════
  polo: {
    key: "polo",
    brandName: "Volkswagen",
    makerId: 36,
    familyName: "Polo",
    aliases: ["polo", "volkswagen polo", "vw polo", "cross polo"],
    targetUrl: "/search/buy-used-volkswagen-polo-cars",
    urlSlug: "buy-used-volkswagen-polo-cars",
    models: [
      { modelId: 253, modelName: "Polo" },
      { modelId: 249, modelName: "Cross Polo" },
    ],
  },
  passat: {
    key: "passat",
    brandName: "Volkswagen",
    makerId: 36,
    familyName: "Passat",
    aliases: ["passat", "volkswagen passat", "passat estate"],
    targetUrl: "/search/buy-used-volkswagen-passat-cars",
    urlSlug: "buy-used-volkswagen-passat-cars",
    models: [
      { modelId: 251, modelName: "Passat" },
      { modelId: 435, modelName: "Passat Estate" },
    ],
  },
  tiguan: {
    key: "tiguan",
    brandName: "Volkswagen",
    makerId: 36,
    familyName: "Tiguan",
    aliases: ["tiguan", "volkswagen tiguan", "tiguan r line", "tiguan r-line"],
    targetUrl: "/search/buy-used-volkswagen-tiguan-cars",
    urlSlug: "buy-used-volkswagen-tiguan-cars",
    models: [
      { modelId: 380, modelName: "Tiguan" },
      { modelId: 736, modelName: "Tiguan R-Line" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SKODA (makerId: 32)
  // ═══════════════════════════════════════════════════════════════════════════
  octavia: {
    key: "octavia",
    brandName: "Skoda",
    makerId: 32,
    familyName: "Octavia",
    aliases: ["octavia", "skoda octavia", "octavia combi"],
    targetUrl: "/search/buy-used-skoda-octavia-cars",
    urlSlug: "buy-used-skoda-octavia-cars",
    models: [
      { modelId: 210, modelName: "Octavia" },
      { modelId: 283, modelName: "Octavia Combi" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // BMW (makerId: 5)
  // ═══════════════════════════════════════════════════════════════════════════
  "3-series": {
    key: "3-series",
    brandName: "BMW",
    makerId: 5,
    familyName: "3 Series",
    aliases: ["3 series", "bmw 3 series", "3-series", "m340i"],
    targetUrl: "/search/buy-used-bmw-3-series-cars",
    urlSlug: "buy-used-bmw-3-series-cars",
    models: [
      { modelId: 33, modelName: "3 Series" },
      { modelId: 606, modelName: "3 Series Gran Limousine" },
      { modelId: 651, modelName: "M340i" },
    ],
  },
  "5-series": {
    key: "5-series",
    brandName: "BMW",
    makerId: 5,
    familyName: "5 Series",
    aliases: ["5 series", "bmw 5 series", "5-series"],
    targetUrl: "/search/buy-used-bmw-5-series-cars",
    urlSlug: "buy-used-bmw-5-series-cars",
    models: [
      { modelId: 34, modelName: "5 Series" },
      { modelId: 35, modelName: "5 Series GT" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // AUDI (makerId: 3)
  // ═══════════════════════════════════════════════════════════════════════════
  q8: {
    key: "q8",
    brandName: "Audi",
    makerId: 3,
    familyName: "Q8",
    aliases: ["q8", "audi q8", "rs q8", "q8 e-tron", "q8 etron"],
    targetUrl: "/search/buy-used-audi-q8-cars",
    urlSlug: "buy-used-audi-q8-cars",
    models: [
      { modelId: 621, modelName: "Q8" },
      { modelId: 703, modelName: "Q8 e-tron" },
      { modelId: 704, modelName: "Q8 Sportback e-tron" },
      { modelId: 622, modelName: "RS Q8" },
    ],
  },
  "e-tron": {
    key: "e-tron",
    brandName: "Audi",
    makerId: 3,
    familyName: "e-tron",
    aliases: ["e-tron", "etron", "audi e-tron", "audi etron"],
    targetUrl: "/search/buy-used-audi-e-tron-cars",
    urlSlug: "buy-used-audi-e-tron-cars",
    models: [
      { modelId: 630, modelName: "e-tron" },
      { modelId: 632, modelName: "e-tron GT" },
      { modelId: 631, modelName: "e-tron Sportback" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // FORCE MOTORS (makerId: 11)
  // ═══════════════════════════════════════════════════════════════════════════
  trax: {
    key: "trax",
    brandName: "Force Motors",
    makerId: 11,
    familyName: "Trax",
    aliases: ["trax", "force trax", "trax cruiser", "trax gama", "tempo trax", "toofan trax"],
    targetUrl: "/search/buy-used-force-motors-trax-cars",
    urlSlug: "buy-used-force-motors-trax-cars",
    models: [
      { modelId: 411, modelName: "Trax Cruiser" },
      { modelId: 496, modelName: "Trax Gama" },
      { modelId: 442, modelName: "Tempo Trax" },
      { modelId: 452, modelName: "Toofan Trax" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TWO-WHEELERS (Strict 2W Isolation, targetUrl: -two-wheelers)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── HONDA TWO-WHEELERS (makerId: 15011) ──────────────────────────────────
  "activa-125": {
    key: "activa-125",
    brandName: "Honda",
    makerId: 15011,
    vehicleType: "TWO_WHEELER",
    familyName: "Activa 125",
    aliases: ["activa 125", "honda activa 125"],
    targetUrl: "/search/buy-used-honda-activa-125-two-wheelers",
    urlSlug: "buy-used-honda-activa-125-two-wheelers",
    isSubModel: true,
    models: [{ modelId: 25278, modelName: "Activa 125" }],
  },
  "activa-6g": {
    key: "activa-6g",
    brandName: "Honda",
    makerId: 15011,
    vehicleType: "TWO_WHEELER",
    familyName: "Activa 6G",
    aliases: ["activa 6g", "honda activa 6g"],
    targetUrl: "/search/buy-used-honda-activa-6g-two-wheelers",
    urlSlug: "buy-used-honda-activa-6g-two-wheelers",
    isSubModel: true,
    models: [{ modelId: 25282, modelName: "Activa 6G" }],
  },
  activa: {
    key: "activa",
    brandName: "Honda",
    makerId: 15011,
    vehicleType: "TWO_WHEELER",
    familyName: "Activa",
    aliases: ["activa", "honda activa", "activa 5g", "activa 4g", "activa 3g", "activa 110", "activa e", "activa scooter"],
    targetUrl: "/search/buy-used-honda-activa-two-wheelers",
    urlSlug: "buy-used-honda-activa-two-wheelers",
    models: [
      { modelId: 25277, modelName: "Activa 110" },
      { modelId: 25278, modelName: "Activa 125" },
      { modelId: 25279, modelName: "Activa 3G 110" },
      { modelId: 25280, modelName: "Activa 4G 110" },
      { modelId: 25281, modelName: "Activa 5G 110" },
      { modelId: 25282, modelName: "Activa 6G" },
      { modelId: 25283, modelName: "Activa E" },
      { modelId: 25284, modelName: "Activa I 110" },
      { modelId: 25285, modelName: "Activa Premium" },
    ],
  },
  "cb-shine": {
    key: "cb-shine",
    brandName: "Honda",
    makerId: 15011,
    vehicleType: "TWO_WHEELER",
    familyName: "CB Shine",
    aliases: ["cb shine", "cb shine 125", "cb shine sp 125", "honda cb shine"],
    targetUrl: "/search/buy-used-honda-cb-shine-125-two-wheelers",
    urlSlug: "buy-used-honda-cb-shine-125-two-wheelers",
    isSubModel: true,
    models: [
      { modelId: 25308, modelName: "CB Shine 125" },
      { modelId: 25309, modelName: "CB Shine SP 125" },
    ],
  },
  "sp-125": {
    key: "sp-125",
    brandName: "Honda",
    makerId: 15011,
    vehicleType: "TWO_WHEELER",
    familyName: "SP 125",
    aliases: ["sp 125", "sp125", "honda sp 125", "honda sp125"],
    targetUrl: "/search/buy-used-honda-sp125-two-wheelers",
    urlSlug: "buy-used-honda-sp125-two-wheelers",
    isSubModel: true,
    models: [{ modelId: 25335, modelName: "SP125" }],
  },
  shine: {
    key: "shine",
    brandName: "Honda",
    makerId: 15011,
    vehicleType: "TWO_WHEELER",
    familyName: "Shine",
    aliases: ["shine", "honda shine", "shine 125", "shine 100", "honda shine 125", "honda shine 100"],
    targetUrl: "/search/buy-used-honda-shine-two-wheelers",
    urlSlug: "buy-used-honda-shine-two-wheelers",
    models: [
      { modelId: 25308, modelName: "CB Shine 125" },
      { modelId: 25309, modelName: "CB Shine SP 125" },
      { modelId: 25333, modelName: "Shine 100" },
      { modelId: 25334, modelName: "Shine 125" },
      { modelId: 25335, modelName: "SP125" },
    ],
  },
  dio: {
    key: "dio",
    brandName: "Honda",
    makerId: 15011,
    vehicleType: "TWO_WHEELER",
    familyName: "Dio",
    aliases: ["dio", "honda dio", "dio 110", "dio 125"],
    targetUrl: "/search/buy-used-honda-dio-110-two-wheelers",
    urlSlug: "buy-used-honda-dio-110-two-wheelers",
    models: [
      { modelId: 25317, modelName: "DIO 110" },
      { modelId: 25318, modelName: "DIO 125" },
    ],
  },
  unicorn: {
    key: "unicorn",
    brandName: "Honda",
    makerId: 15011,
    vehicleType: "TWO_WHEELER",
    familyName: "Unicorn",
    aliases: ["unicorn", "honda unicorn", "cb unicorn", "unicorn 160", "cb unicorn 150"],
    targetUrl: "/search/buy-used-honda-unicorn-160-two-wheelers",
    urlSlug: "buy-used-honda-unicorn-160-two-wheelers",
    models: [
      { modelId: 25312, modelName: "CB UNICORN 150" },
      { modelId: 25313, modelName: "CB UNICORN 160" },
      { modelId: 25314, modelName: "CB UNICORN DAZZLER 150" },
      { modelId: 25337, modelName: "UNICORN 160" },
    ],
  },

  // ── SUZUKI TWO-WHEELERS (makerId: 15020) ─────────────────────────────────
  "access-125": {
    key: "access-125",
    brandName: "Suzuki",
    makerId: 15020,
    vehicleType: "TWO_WHEELER",
    familyName: "Access 125",
    aliases: ["access", "access 125", "suzuki access", "suzuki access 125", "access fi 125"],
    targetUrl: "/search/buy-used-suzuki-access-125-two-wheelers",
    urlSlug: "buy-used-suzuki-access-125-two-wheelers",
    models: [
      { modelId: 25485, modelName: "Access 125" },
      { modelId: 25486, modelName: "Access FI 125" },
    ],
  },
  "burgman-street": {
    key: "burgman-street",
    brandName: "Suzuki",
    makerId: 15020,
    vehicleType: "TWO_WHEELER",
    familyName: "Burgman Street",
    aliases: ["burgman", "burgman street", "suzuki burgman", "suzuki burgman street"],
    targetUrl: "/search/buy-used-suzuki-burgman-street-125-two-wheelers",
    urlSlug: "buy-used-suzuki-burgman-street-125-two-wheelers",
    models: [{ modelId: 25489, modelName: "Burgman Street 125" }],
  },
  gixxer: {
    key: "gixxer",
    brandName: "Suzuki",
    makerId: 15020,
    vehicleType: "TWO_WHEELER",
    familyName: "Gixxer",
    aliases: ["gixxer", "suzuki gixxer", "gixxer sf", "gixxer 150", "gixxer 250"],
    targetUrl: "/search/buy-used-suzuki-gixxer-two-wheelers",
    urlSlug: "buy-used-suzuki-gixxer-two-wheelers",
    models: [
      { modelId: 25491, modelName: "Gixxer" },
      { modelId: 25492, modelName: "Gixxer 150" },
      { modelId: 25493, modelName: "Gixxer 250" },
    ],
  },

  // ── TVS TWO-WHEELERS (makerId: 15021) ────────────────────────────────────
  "jupiter-125": {
    key: "jupiter-125",
    brandName: "TVS",
    makerId: 15021,
    vehicleType: "TWO_WHEELER",
    familyName: "Jupiter 125",
    aliases: ["jupiter 125", "tvs jupiter 125"],
    targetUrl: "/search/buy-used-tvs-jupiter-125-two-wheelers",
    urlSlug: "buy-used-tvs-jupiter-125-two-wheelers",
    isSubModel: true,
    models: [{ modelId: 25541, modelName: "Jupiter 125" }],
  },
  jupiter: {
    key: "jupiter",
    brandName: "TVS",
    makerId: 15021,
    vehicleType: "TWO_WHEELER",
    familyName: "Jupiter",
    aliases: ["jupiter", "tvs jupiter", "jupiter 110"],
    targetUrl: "/search/buy-used-tvs-jupiter-two-wheelers",
    urlSlug: "buy-used-tvs-jupiter-two-wheelers",
    models: [
      { modelId: 25540, modelName: "Jupiter 110" },
      { modelId: 25541, modelName: "Jupiter 125" },
    ],
  },
  apache: {
    key: "apache",
    brandName: "TVS",
    makerId: 15021,
    vehicleType: "TWO_WHEELER",
    familyName: "Apache",
    aliases: ["apache", "tvs apache", "apache rtr", "rtr 160", "rtr 200", "apache rr 310"],
    targetUrl: "/search/buy-used-tvs-apache-two-wheelers",
    urlSlug: "buy-used-tvs-apache-two-wheelers",
    models: [
      { modelId: 25524, modelName: "Apache 150" },
      { modelId: 25525, modelName: "Apache RR 310" },
      { modelId: 25526, modelName: "Apache RTR 160" },
      { modelId: 25530, modelName: "Apache RTR 180" },
      { modelId: 25532, modelName: "Apache RTR 200 4V" },
    ],
  },
  ntorq: {
    key: "ntorq",
    brandName: "TVS",
    makerId: 15021,
    vehicleType: "TWO_WHEELER",
    familyName: "Ntorq",
    aliases: ["ntorq", "tvs ntorq", "ntorq 125"],
    targetUrl: "/search/buy-used-tvs-ntorq-two-wheelers",
    urlSlug: "buy-used-tvs-ntorq-two-wheelers",
    models: [
      { modelId: 25544, modelName: "Ntorq 125" },
      { modelId: 25545, modelName: "Ntorq 125 Super Squad" },
    ],
  },
  raider: {
    key: "raider",
    brandName: "TVS",
    makerId: 15021,
    vehicleType: "TWO_WHEELER",
    familyName: "Raider",
    aliases: ["raider", "tvs raider", "raider 125"],
    targetUrl: "/search/buy-used-tvs-raider-two-wheelers",
    urlSlug: "buy-used-tvs-raider-two-wheelers",
    models: [{ modelId: 25547, modelName: "Raider 125" }],
  },

  // ── HERO TWO-WHEELERS (makerId: 15010) ───────────────────────────────────
  "super-splendor": {
    key: "super-splendor",
    brandName: "Hero",
    makerId: 15010,
    vehicleType: "TWO_WHEELER",
    familyName: "Super Splendor",
    aliases: ["super splendor", "hero super splendor", "super splendor 125"],
    targetUrl: "/search/buy-used-hero-super-splendor-two-wheelers",
    urlSlug: "buy-used-hero-super-splendor-two-wheelers",
    isSubModel: true,
    models: [
      { modelId: 25257, modelName: "Super Splendor 125" },
      { modelId: 25258, modelName: "Super Splendor X Tec 125" },
    ],
  },
  splendor: {
    key: "splendor",
    brandName: "Hero",
    makerId: 15010,
    vehicleType: "TWO_WHEELER",
    familyName: "Splendor",
    aliases: ["splendor", "hero splendor", "splendor plus", "splendor pro", "splendor ismart", "splendor xtec"],
    targetUrl: "/search/buy-used-hero-splendor-two-wheelers",
    urlSlug: "buy-used-hero-splendor-two-wheelers",
    models: [
      { modelId: 25249, modelName: "Splendor Ismart 100" },
      { modelId: 25253, modelName: "Splendor Plus 100" },
      { modelId: 25254, modelName: "Splendor PRO 100" },
      { modelId: 25256, modelName: "Splendor X Tec 100" },
      { modelId: 25257, modelName: "Super Splendor 125" },
    ],
  },
  "hf-deluxe": {
    key: "hf-deluxe",
    brandName: "Hero",
    makerId: 15010,
    vehicleType: "TWO_WHEELER",
    familyName: "HF Deluxe",
    aliases: ["hf deluxe", "hero hf deluxe", "hf deluxe 100", "hf deluxe eco"],
    targetUrl: "/search/buy-used-hero-hf-deluxe-two-wheelers",
    urlSlug: "buy-used-hero-hf-deluxe-two-wheelers",
    models: [
      { modelId: 25203, modelName: "HF Deluxe 100" },
      { modelId: 25204, modelName: "HF Deluxe Eco 100" },
      { modelId: 25205, modelName: "HF Deluxe Pro 100" },
    ],
  },
  passion: {
    key: "passion",
    brandName: "Hero",
    makerId: 15010,
    vehicleType: "TWO_WHEELER",
    familyName: "Passion",
    aliases: ["passion", "hero passion", "passion pro", "passion plus", "passion xpro"],
    targetUrl: "/search/buy-used-hero-passion-two-wheelers",
    urlSlug: "buy-used-hero-passion-two-wheelers",
    models: [
      { modelId: 25227, modelName: "Passion Plus 100" },
      { modelId: 25228, modelName: "Passion PRO 100" },
      { modelId: 25229, modelName: "Passion PRO 110" },
    ],
  },
  glamour: {
    key: "glamour",
    brandName: "Hero",
    makerId: 15010,
    vehicleType: "TWO_WHEELER",
    familyName: "Glamour",
    aliases: ["glamour", "hero glamour", "glamour 125", "glamour xtec"],
    targetUrl: "/search/buy-used-hero-glamour-two-wheelers",
    urlSlug: "buy-used-hero-glamour-two-wheelers",
    models: [
      { modelId: 25197, modelName: "Glamour 125" },
      { modelId: 25199, modelName: "Glamour X Tec 125" },
    ],
  },

  // ── BAJAJ TWO-WHEELERS (makerId: 15005) ──────────────────────────────────
  "pulsar-150": {
    key: "pulsar-150",
    brandName: "Bajaj",
    makerId: 15005,
    vehicleType: "TWO_WHEELER",
    familyName: "Pulsar 150",
    aliases: ["pulsar 150", "bajaj pulsar 150"],
    targetUrl: "/search/buy-used-bajaj-pulsar-150-two-wheelers",
    urlSlug: "buy-used-bajaj-pulsar-150-two-wheelers",
    isSubModel: true,
    models: [{ modelId: 25119, modelName: "Pulsar 150" }],
  },
  "pulsar-ns200": {
    key: "pulsar-ns200",
    brandName: "Bajaj",
    makerId: 15005,
    vehicleType: "TWO_WHEELER",
    familyName: "Pulsar NS200",
    aliases: ["pulsar ns200", "pulsar ns 200", "ns200", "bajaj pulsar ns200"],
    targetUrl: "/search/buy-used-bajaj-pulsar-ns-200-two-wheelers",
    urlSlug: "buy-used-bajaj-pulsar-ns-200-two-wheelers",
    isSubModel: true,
    models: [{ modelId: 25136, modelName: "Pulsar NS 200" }],
  },
  pulsar: {
    key: "pulsar",
    brandName: "Bajaj",
    makerId: 15005,
    vehicleType: "TWO_WHEELER",
    familyName: "Pulsar",
    aliases: ["pulsar", "bajaj pulsar", "pulsar 125", "pulsar 220f", "pulsar n160", "pulsar ns"],
    targetUrl: "/search/buy-used-bajaj-pulsar-two-wheelers",
    urlSlug: "buy-used-bajaj-pulsar-two-wheelers",
    models: [
      { modelId: 25118, modelName: "Pulsar 125" },
      { modelId: 25119, modelName: "Pulsar 150" },
      { modelId: 25124, modelName: "Pulsar 220F" },
      { modelId: 25131, modelName: "Pulsar N160" },
      { modelId: 25136, modelName: "Pulsar NS 200" },
    ],
  },
  platina: {
    key: "platina",
    brandName: "Bajaj",
    makerId: 15005,
    vehicleType: "TWO_WHEELER",
    familyName: "Platina",
    aliases: ["platina", "bajaj platina", "platina 100", "platina 110"],
    targetUrl: "/search/buy-used-bajaj-platina-two-wheelers",
    urlSlug: "buy-used-bajaj-platina-two-wheelers",
    models: [
      { modelId: 25114, modelName: "Platina 100" },
      { modelId: 25115, modelName: "Platina 110" },
    ],
  },
  avenger: {
    key: "avenger",
    brandName: "Bajaj",
    makerId: 15005,
    vehicleType: "TWO_WHEELER",
    familyName: "Avenger",
    aliases: ["avenger", "bajaj avenger", "avenger 160", "avenger 220", "avenger cruise", "avenger street"],
    targetUrl: "/search/buy-used-bajaj-avenger-two-wheelers",
    urlSlug: "buy-used-bajaj-avenger-two-wheelers",
    models: [
      { modelId: 25081, modelName: "Avenger Cruise 220" },
      { modelId: 25082, modelName: "Avenger Street 160" },
    ],
  },

  // ── ROYAL ENFIELD (makerId: 15019) ────────────────────────────────────────
  "classic-350": {
    key: "classic-350",
    brandName: "Royal Enfield",
    makerId: 15019,
    vehicleType: "TWO_WHEELER",
    familyName: "Classic 350",
    aliases: ["classic 350", "royal enfield classic 350", "re classic 350", "classic reborn"],
    targetUrl: "/search/buy-used-royal-enfield-classic-350-two-wheelers",
    urlSlug: "buy-used-royal-enfield-classic-350-two-wheelers",
    models: [
      { modelId: 25455, modelName: "Classic 350" },
      { modelId: 25460, modelName: "Classic Gunmetal Grey 350" },
      { modelId: 25466, modelName: "Goan Classic 350" },
    ],
  },
  "bullet-350": {
    key: "bullet-350",
    brandName: "Royal Enfield",
    makerId: 15019,
    vehicleType: "TWO_WHEELER",
    familyName: "Bullet 350",
    aliases: ["bullet", "bullet 350", "royal enfield bullet", "royal enfield bullet 350", "re bullet"],
    targetUrl: "/search/buy-used-royal-enfield-bullet-350-two-wheelers",
    urlSlug: "buy-used-royal-enfield-bullet-350-two-wheelers",
    models: [
      { modelId: 25447, modelName: "Bullet 350" },
      { modelId: 25453, modelName: "Bullet Twinspark 350" },
    ],
  },
  "hunter-350": {
    key: "hunter-350",
    brandName: "Royal Enfield",
    makerId: 15019,
    vehicleType: "TWO_WHEELER",
    familyName: "Hunter 350",
    aliases: ["hunter", "hunter 350", "royal enfield hunter", "royal enfield hunter 350"],
    targetUrl: "/search/buy-used-royal-enfield-hunter-350-two-wheelers",
    urlSlug: "buy-used-royal-enfield-hunter-350-two-wheelers",
    models: [{ modelId: 25471, modelName: "Hunter 350" }],
  },
  "meteor-350": {
    key: "meteor-350",
    brandName: "Royal Enfield",
    makerId: 15019,
    vehicleType: "TWO_WHEELER",
    familyName: "Meteor 350",
    aliases: ["meteor", "meteor 350", "royal enfield meteor", "royal enfield meteor 350"],
    targetUrl: "/search/buy-used-royal-enfield-meteor-350-two-wheelers",
    urlSlug: "buy-used-royal-enfield-meteor-350-two-wheelers",
    models: [{ modelId: 25474, modelName: "Meteor 350" }],
  },
  himalayan: {
    key: "himalayan",
    brandName: "Royal Enfield",
    makerId: 15019,
    vehicleType: "TWO_WHEELER",
    familyName: "Himalayan",
    aliases: ["himalayan", "royal enfield himalayan", "himalayan 450", "himalayan 411"],
    targetUrl: "/search/buy-used-royal-enfield-himalayan-two-wheelers",
    urlSlug: "buy-used-royal-enfield-himalayan-two-wheelers",
    models: [
      { modelId: 25469, modelName: "Himalayan" },
      { modelId: 25470, modelName: "Himalayan 450" },
    ],
  },

  // ── YAMAHA TWO-WHEELERS (makerId: 15024) ─────────────────────────────────
  r15: {
    key: "r15",
    brandName: "Yamaha",
    makerId: 15024,
    vehicleType: "TWO_WHEELER",
    familyName: "R15",
    aliases: ["r15", "yamaha r15", "r15 v4", "r15 v3", "r15m", "yzf r15"],
    targetUrl: "/search/buy-used-yamaha-r15-two-wheelers",
    urlSlug: "buy-used-yamaha-r15-two-wheelers",
    models: [
      { modelId: 25643, modelName: "R15 V3" },
      { modelId: 25644, modelName: "R15 V4" },
      { modelId: 25639, modelName: "R15M" },
    ],
  },
  "mt-15": {
    key: "mt-15",
    brandName: "Yamaha",
    makerId: 15024,
    vehicleType: "TWO_WHEELER",
    familyName: "MT 15",
    aliases: ["mt 15", "mt15", "yamaha mt 15", "yamaha mt15", "mt 15 v2"],
    targetUrl: "/search/buy-used-yamaha-mt-15-two-wheelers",
    urlSlug: "buy-used-yamaha-mt-15-two-wheelers",
    models: [{ modelId: 25633, modelName: "MT 15" }],
  },
  fz: {
    key: "fz",
    brandName: "Yamaha",
    makerId: 15024,
    vehicleType: "TWO_WHEELER",
    familyName: "FZ",
    aliases: ["fz", "yamaha fz", "fz s", "fzs", "fz v3", "fz x"],
    targetUrl: "/search/buy-used-yamaha-fz-two-wheelers",
    urlSlug: "buy-used-yamaha-fz-two-wheelers",
    models: [
      { modelId: 25621, modelName: "FZ" },
      { modelId: 25623, modelName: "FZ S" },
    ],
  },

  // ── KTM TWO-WHEELERS (makerId: 15014) ────────────────────────────────────
  duke: {
    key: "duke",
    brandName: "KTM",
    makerId: 15014,
    vehicleType: "TWO_WHEELER",
    familyName: "Duke",
    aliases: ["duke", "ktm duke", "duke 200", "duke 390", "duke 250", "duke 125"],
    targetUrl: "/search/buy-used-ktm-duke-two-wheelers",
    urlSlug: "buy-used-ktm-duke-two-wheelers",
    models: [
      { modelId: 25361, modelName: "Duke 125" },
      { modelId: 25363, modelName: "Duke 200" },
      { modelId: 25364, modelName: "Duke 250" },
      { modelId: 25365, modelName: "Duke 390" },
    ],
  },
  rc: {
    key: "rc",
    brandName: "KTM",
    makerId: 15014,
    vehicleType: "TWO_WHEELER",
    familyName: "RC",
    aliases: ["rc", "ktm rc", "rc 200", "rc 390", "rc 125"],
    targetUrl: "/search/buy-used-ktm-rc-two-wheelers",
    urlSlug: "buy-used-ktm-rc-two-wheelers",
    models: [
      { modelId: 25368, modelName: "RC 200" },
      { modelId: 25369, modelName: "RC 390" },
    ],
  },

  // ── ATHER ELECTRIC (makerId: 15003) ──────────────────────────────────────
  "ather-450": {
    key: "ather-450",
    brandName: "Ather",
    makerId: 15003,
    vehicleType: "TWO_WHEELER",
    familyName: "Ather 450",
    aliases: ["ather", "ather 450", "450x", "450s", "ather 450x", "ather 450s"],
    targetUrl: "/search/buy-used-ather-450-two-wheelers",
    urlSlug: "buy-used-ather-450-two-wheelers",
    models: [
      { modelId: 25041, modelName: "450S" },
      { modelId: 25042, modelName: "450X" },
    ],
  },

  // ── OLA ELECTRIC (makerId: 15017) ────────────────────────────────────────
  "s1-pro": {
    key: "s1-pro",
    brandName: "OLA",
    makerId: 15017,
    vehicleType: "TWO_WHEELER",
    familyName: "S1 Pro",
    aliases: ["s1 pro", "ola s1 pro"],
    targetUrl: "/search/buy-used-ola-s1-pro-two-wheelers",
    urlSlug: "buy-used-ola-s1-pro-two-wheelers",
    models: [{ modelId: 25440, modelName: "S1 Pro" }],
  },
  "s1-air": {
    key: "s1-air",
    brandName: "OLA",
    makerId: 15017,
    vehicleType: "TWO_WHEELER",
    familyName: "S1 Air",
    aliases: ["s1 air", "ola s1 air"],
    targetUrl: "/search/buy-used-ola-s1-air-two-wheelers",
    urlSlug: "buy-used-ola-s1-air-two-wheelers",
    models: [{ modelId: 25439, modelName: "S1" }],
  },
  "s1-x": {
    key: "s1-x",
    brandName: "OLA",
    makerId: 15017,
    vehicleType: "TWO_WHEELER",
    familyName: "S1 X",
    aliases: ["s1 x", "ola s1 x"],
    targetUrl: "/search/buy-used-ola-s1-x-two-wheelers",
    urlSlug: "buy-used-ola-s1-x-two-wheelers",
    models: [{ modelId: 25441, modelName: "S1 X" }],
  },
};

/**
 * Match a raw query string or search keyword to a known model family.
 * Evaluates specific sub-models first (e.g. "thar roxx", "grand i10", "scorpio classic")
 * before generic common names (e.g. "thar", "i10", "scorpio").
 *
 * @param {string} query
 * @returns {object|null} Matched family config or null
 */
export function findModelFamily(query) {
  if (!query) return null;
  const clean = String(query).toLowerCase().trim().replace(/[\s-]+/g, " ");
  const cleanNoUsed = clean
    .replace(/\bused\b/g, "")
    .replace(/\b(cars?|bikes?|two[- ]?wheelers?|scooters?)\b/g, "")
    .trim();

  // Sort families so specific sub-models / longer keys are checked FIRST!
  const sortedFamilies = Object.values(MODEL_FAMILIES).sort(
    (a, b) => (b.isSubModel ? 1 : 0) - (a.isSubModel ? 1 : 0) || b.key.length - a.key.length
  );

  // 1. Direct key match or alias match (highest priority)
  for (const family of sortedFamilies) {
    if (clean === family.key || cleanNoUsed === family.key) return family;
    for (const alias of family.aliases) {
      const cleanAlias = alias.toLowerCase().replace(/[\s-]+/g, " ");
      if (clean === cleanAlias || cleanNoUsed === cleanAlias) return family;
    }
  }

  // 2. Word boundary match on longer keys / aliases first
  for (const family of sortedFamilies) {
    for (const alias of family.aliases) {
      const escapedAlias = alias.replace(/[\s-]+/g, "[\\s-]");
      const aliasRegex = new RegExp(`\\b${escapedAlias}\\b`, "i");
      if (aliasRegex.test(clean) || aliasRegex.test(cleanNoUsed)) return family;
    }
    const keyRegex = new RegExp(`\\b${family.key.replace(/-/g, "[\\s-]?")}\\b`, "i");
    if (keyRegex.test(cleanNoUsed)) return family;
  }

  return null;
}

/**
 * Match by SEO slug segment (e.g., "mahindra-thar-roxx", "mahindra-scorpio", "hyundai-grand-i10").
 * Checks specific sub-model slugs first, then general brand+model slugs.
 *
 * @param {string} segment
 * @returns {object|null} Matched family config or null
 */
export function findModelFamilyBySlugSegment(segment) {
  if (!segment) return null;
  const rawLower = String(segment).toLowerCase().trim();
  const norm = rawLower.replace(/[\s-]+/g, "");

  // Sort families so sub-models / longer keys are checked FIRST!
  const sortedFamilies = Object.values(MODEL_FAMILIES).sort(
    (a, b) => (b.isSubModel ? 1 : 0) - (a.isSubModel ? 1 : 0) || b.key.length - a.key.length
  );

  // Priority 1: Exact matches (urlSlug, brand+family, or key)
  for (const family of sortedFamilies) {
    const keyNorm = family.key.toLowerCase().replace(/[\s-]+/g, "");
    const brandFamilyNorm = `${family.brandName}${family.familyName}`
      .toLowerCase()
      .replace(/[\s-]+/g, "");
    const slugNorm = (family.urlSlug || "").toLowerCase().replace(/[\s-]+/g, "");

    if (norm === slugNorm || norm === brandFamilyNorm || norm === keyNorm) {
      return family;
    }
  }

  // Priority 2: Contains brand + family together (e.g. "buy-used-mahindra-thar-roxx-cars-ahmedabad")
  for (const family of sortedFamilies) {
    const brandFamilyNorm = `${family.brandName}${family.familyName}`
      .toLowerCase()
      .replace(/[\s-]+/g, "");
    if (norm.includes(brandFamilyNorm)) {
      return family;
    }
  }

  // Priority 3: Word/hyphen-boundary match on key or familyName
  for (const family of sortedFamilies) {
    const keySlug = family.key.toLowerCase().replace(/[\s_]+/g, "-");
    const familySlug = family.familyName.toLowerCase().replace(/[\s_]+/g, "-");

    const regex = new RegExp(`(^|-)${keySlug}(-|$)`, "i");
    const familyRegex = new RegExp(`(^|-)${familySlug}(-|$)`, "i");

    if (regex.test(rawLower) || familyRegex.test(rawLower)) {
      return family;
    }
  }

  return null;
}

/**
 * Check if a list of model IDs all belong to a specific model family.
 * @param {Array<string|number>} modelIds
 * @param {string} familyKey
 * @returns {boolean}
 */
export function isModelFamilySelection(modelIds = [], familyKey) {
  if (!familyKey || !MODEL_FAMILIES[familyKey]) return false;
  const family = MODEL_FAMILIES[familyKey];
  const familyModelIds = new Set(family.models.map((m) => String(m.modelId)));
  const currentModelIds = modelIds.map(String);

  if (currentModelIds.length === 0) return false;
  return currentModelIds.every((id) => familyModelIds.has(id));
}

/**
 * Detect if an active selection of models belongs to any known model family.
 * Gives preference to more specific sub-models when there is an exact match.
 *
 * @param {Array<string|number>} modelIds
 * @param {string|number} makerId
 * @returns {object|null} Matched family config or null
 */
export function detectFamilyFromSelection(modelIds = [], makerId = null) {
  if (!modelIds || modelIds.length === 0) return null;
  const currentModelIds = modelIds.map(String);

  let bestFamily = null;
  let bestScore = -1;

  for (const family of Object.values(MODEL_FAMILIES)) {
    if (makerId && String(family.makerId) !== String(makerId)) {
      continue;
    }
    const familyModelIds = new Set(family.models.map((m) => String(m.modelId)));
    const matchesAny = currentModelIds.some((id) => familyModelIds.has(id));
    const allBelong = currentModelIds.every((id) => familyModelIds.has(id));

    if (matchesAny && allBelong) {
      // Score: higher score for more specific match (exact subset or sub-model)
      const coverage = currentModelIds.length / familyModelIds.size;
      const score = coverage + (family.isSubModel ? 0.1 : 0);
      if (score > bestScore) {
        bestScore = score;
        bestFamily = family;
      }
    }
  }

  return bestFamily;
}
