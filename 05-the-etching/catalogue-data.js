(function (global) {
  "use strict";

  var TIERS = {
    taster: {
      name: "Taster",
      price: 240,
      count: 12,
      expectedValue: 250,
      expectedPercent: 4,
      descriptor: "Everyday discovery",
      multiplier: 0.55,
      distribution: [
        { name:"Common", percent:64 },
        { name:"Uncommon", percent:32 },
        { name:"Rare", percent:4 }
      ],
      rarities: ["Common", "Common", "Common", "Common", "Common", "Common", "Common", "Common", "Uncommon", "Uncommon", "Uncommon", "Rare"]
    },
    cellar: {
      name: "Cellar",
      price: 600,
      count: 12,
      expectedValue: 700,
      expectedPercent: 17,
      descriptor: "The standard crate",
      multiplier: 1,
      distribution: [
        { name:"Common", percent:62 },
        { name:"Uncommon", percent:34 },
        { name:"Rare", percent:3 },
        { name:"Epic", percent:1 }
      ],
      rarities: ["Common", "Common", "Common", "Common", "Common", "Common", "Common", "Uncommon", "Uncommon", "Uncommon", "Rare", "Epic"]
    },
    reserve: {
      name: "Reserve",
      price: 6500,
      count: 12,
      expectedValue: 8250,
      expectedPercent: 27,
      descriptor: "Classed growths",
      multiplier: 9.5,
      distribution: [
        { name:"Uncommon", percent:18 },
        { name:"Rare", percent:62 },
        { name:"Epic", percent:18 },
        { name:"Grail", percent:2 }
      ],
      rarities: ["Uncommon", "Uncommon", "Rare", "Rare", "Rare", "Rare", "Rare", "Rare", "Rare", "Epic", "Epic", "Grail"]
    },
    grand: {
      name: "Grand Cru",
      price: 12000,
      count: 12,
      expectedValue: 14750,
      expectedPercent: 23,
      descriptor: "The rarest pulls",
      multiplier: 18,
      distribution: [
        { name:"Rare", percent:45 },
        { name:"Epic", percent:52 },
        { name:"Grail", percent:3 }
      ],
      rarities: ["Rare", "Rare", "Rare", "Rare", "Rare", "Epic", "Epic", "Epic", "Epic", "Epic", "Epic", "Grail"]
    }
  };

  function bottle(name, vintage, appellation, note, value, art) {
    return { name:name, vintage:vintage, region:appellation, note:note, baseValue:value, art:art };
  }

  var REGIONS = {
    bordeaux: {
      name: "Bordeaux",
      country: "France",
      motif: "vine",
      accent: "#80152A",
      descriptor: "Classed growths",
      bottles: [
        bottle("Château Bonnet Réserve", "2020", "Entre-Deux-Mers", "Blackcurrant, cedar and graphite.", 58, 0),
        bottle("Château Gloria", "2019", "Saint-Julien", "Cassis, tobacco and polished tannin.", 95, 0),
        bottle("Château Lanessan", "2018", "Haut-Médoc", "Plum, pencil shaving and bay.", 64, 0),
        bottle("Château Cantemerle", "2019", "Haut-Médoc", "Violet, dark cherry and gravel.", 82, 0),
        bottle("Château Batailley", "2016", "Pauillac", "Cedar, black fruit and iron.", 118, 0),
        bottle("Château Branaire-Ducru", "2018", "Saint-Julien", "Silken cassis and dried herbs.", 136, 0),
        bottle("Château Lagrange", "2019", "Saint-Julien", "Blackberry, graphite and spice.", 122, 0),
        bottle("Château Grand-Puy-Lacoste", "2017", "Pauillac", "Currant, cigar box and stone.", 154, 0),
        bottle("Château Rauzan-Ségla", "2018", "Margaux", "Violet, plum and fine tannin.", 188, 0),
        bottle("Château Léoville Barton", "2016", "Saint-Julien", "Dense cassis and mineral length.", 210, 0),
        bottle("Château Canon", "2018", "Saint-Émilion", "Red plum, chalk and rose.", 246, 0),
        bottle("Château Palmer", "2015", "Margaux", "Perfumed berry, silk and spice.", 390, 0)
      ]
    },
    burgundy: {
      name: "Burgundy",
      country: "France",
      motif: "leaf",
      accent: "#63304F",
      descriptor: "Pinot & Chardonnay",
      bottles: [
        bottle("Joseph Drouhin Côte de Beaune", "2021", "Côte de Beaune", "Red cherry and forest floor.", 72, 1),
        bottle("Domaine Faiveley Mercurey", "2020", "Mercurey", "Cranberry, earth and gentle spice.", 68, 1),
        bottle("Domaine de Montille Bourgogne", "2021", "Burgundy", "Fine red fruit and chalk.", 76, 1),
        bottle("Domaine Leflaive Mâcon-Verzé", "2021", "Mâconnais", "White flowers, lemon and mineral.", 121, 6),
        bottle("Domaine Tollot-Beaut", "2020", "Aloxe-Corton", "Cherry skin and savory earth.", 116, 1),
        bottle("Domaine Jobard Meursault", "2020", "Meursault", "Hazelnut, citrus and stone.", 165, 6),
        bottle("Domaine Fourrier Vieilles Vignes", "2019", "Gevrey-Chambertin", "Wild strawberry and sous-bois.", 194, 1),
        bottle("Domaine Roulot Bourgogne Blanc", "2020", "Burgundy", "Lemon oil and crushed shell.", 182, 6),
        bottle("Domaine Marquis d’Angerville", "2019", "Volnay", "Rose, cherry and mineral lift.", 224, 1),
        bottle("Domaine Arlaud Premier Cru", "2018", "Morey-Saint-Denis", "Black cherry and woodland spice.", 248, 1),
        bottle("Domaine Ponsot Cuvée", "2017", "Morey-Saint-Denis", "Perfumed fruit and long earth.", 315, 1),
        bottle("Domaine Dujac Premier Cru", "2018", "Morey-Saint-Denis", "Silk, spice and red fruit.", 420, 1)
      ]
    },
    napa: {
      name: "Napa",
      country: "United States",
      motif: "sun",
      accent: "#4E6B50",
      descriptor: "Cult Cabernet",
      bottles: [
        bottle("Frog’s Leap Cabernet Sauvignon", "2021", "Rutherford", "Cassis, sage and cedar.", 76, 0),
        bottle("Heitz Cellar Cabernet Sauvignon", "2018", "Napa Valley", "Mint, currant and tobacco.", 92, 0),
        bottle("Matthiasson Cabernet Sauvignon", "2020", "Napa Valley", "Fresh berry and bay leaf.", 88, 0),
        bottle("Chateau Montelena Chardonnay", "2021", "Napa Valley", "Stone fruit and mineral lift.", 134, 6),
        bottle("Corison Cabernet Sauvignon", "2019", "St. Helena", "Violet, cassis and restraint.", 156, 0),
        bottle("Mayacamas Cabernet Sauvignon", "2018", "Mount Veeder", "Mountain herb and graphite.", 172, 0),
        bottle("Stag’s Leap Wine Cellars Fay", "2019", "Stags Leap District", "Plush cherry and cocoa.", 184, 0),
        bottle("Dunn Cabernet Sauvignon", "2018", "Howell Mountain", "Black fruit and firm mineral.", 198, 0),
        bottle("Shafer Hillside Select", "2018", "Stags Leap District", "Dense cassis and polished oak.", 286, 0),
        bottle("Spottswoode Estate Cabernet", "2019", "St. Helena", "Floral cassis and long graphite.", 312, 0),
        bottle("Dominus Estate", "2018", "Yountville", "Plum, tobacco and iron.", 348, 0),
        bottle("Harlan Estate", "2017", "Oakville", "Layered black fruit and cedar.", 680, 0)
      ]
    },
    tuscany: {
      name: "Tuscany",
      country: "Italy",
      motif: "cypress",
      accent: "#9A4E32",
      descriptor: "Super-Tuscans",
      bottles: [
        bottle("Fèlsina Berardenga", "2020", "Chianti Classico", "Sour cherry and wild herbs.", 54, 4),
        bottle("Fontodi Chianti Classico", "2019", "Panzano", "Cherry, leather and earth.", 68, 4),
        bottle("Isole e Olena Cepparello", "2018", "Tuscany", "Red fruit, cedar and length.", 112, 4),
        bottle("Le Macchiole Bolgheri Rosso", "2020", "Bolgheri", "Plum, cocoa and Mediterranean herbs.", 86, 4),
        bottle("Castello di Ama San Lorenzo", "2018", "Gaiole", "Cherry, tobacco and mineral.", 126, 4),
        bottle("Antinori Tignanello", "2019", "Tuscany", "Black cherry, spice and polish.", 158, 4),
        bottle("Tenuta San Guido Guidalberto", "2020", "Bolgheri", "Cassis, bay and soft tannin.", 118, 4),
        bottle("Petrolo Galatrona", "2018", "Val d’Arno", "Plush plum and graphite.", 166, 4),
        bottle("Ornellaia", "2018", "Bolgheri", "Dark fruit, cedar and silk.", 248, 4),
        bottle("Solaia", "2017", "Tuscany", "Cassis, spice and long tannin.", 292, 4),
        bottle("Masseto", "2017", "Bolgheri", "Velvet plum and cocoa.", 610, 4),
        bottle("Sassicaia", "2016", "Bolgheri Sassicaia", "Cedar, currant and mineral poise.", 420, 4)
      ]
    },
    champagne: {
      name: "Champagne",
      country: "France",
      motif: "star",
      accent: "#9A7222",
      descriptor: "Grower & Grande Marque",
      bottles: [
        bottle("Bollinger Special Cuvée", "NV", "Aÿ", "Brioche, orchard fruit and chalk.", 125, 3),
        bottle("Billecart-Salmon Brut Réserve", "NV", "Mareuil-sur-Aÿ", "Pear, citrus and fine mousse.", 104, 3),
        bottle("Agrapart Terroirs", "NV", "Avize", "Lemon, chalk and saline length.", 138, 3),
        bottle("Pierre Péters Cuvée de Réserve", "NV", "Le Mesnil-sur-Oger", "White flowers and crushed shell.", 126, 3),
        bottle("Laherte Frères Ultradition", "NV", "Chavot", "Apple skin and pastry.", 96, 3),
        bottle("Jacquesson Cuvée 745", "NV", "Dizy", "Citrus oil and vinous depth.", 148, 3),
        bottle("Egly-Ouriet Grand Cru", "NV", "Ambonnay", "Red apple, chalk and toast.", 214, 3),
        bottle("Vilmart Coeur de Cuvée", "2015", "Rilly-la-Montagne", "Golden fruit and mineral drive.", 238, 3),
        bottle("Krug Grande Cuvée", "NV", "Reims", "Hazelnut, citrus and profound length.", 312, 3),
        bottle("Dom Pérignon", "2013", "Épernay", "Smoke, lemon and fine chalk.", 286, 3),
        bottle("Salon Blanc de Blancs", "2012", "Le Mesnil-sur-Oger", "Pure citrus and endless mineral.", 980, 3),
        bottle("Jacques Selosse Initial", "NV", "Avize", "Oxidative spice and deep chalk.", 720, 3)
      ]
    },
    mix: {
      name: "Cellar Mix",
      country: "Many regions",
      motif: "monogram",
      accent: "#40556F",
      descriptor: "Across regions",
      bottles: [
        bottle("Ridge Estate Cabernet Sauvignon", "2019", "Santa Cruz Mountains", "Structured, cedar and cassis.", 128, 0),
        bottle("Domaine Tempier Bandol Rouge", "2020", "Bandol, Provence", "Wild herbs and dark plum.", 142, 1),
        bottle("Produttori del Barbaresco", "2019", "Piedmont", "Rose petal, tar and fine tannin.", 118, 2),
        bottle("Château Musar Rouge", "2017", "Bekaa Valley", "Fig, leather and sweet spice.", 155, 0),
        bottle("Viña Tondonia Reserva", "2011", "Rioja", "Dried cherry, cedar and length.", 168, 4),
        bottle("Domaine Huet Le Mont Sec", "2022", "Vouvray, Loire", "Quince, chalk and quiet power.", 112, 5),
        bottle("Chateau Montelena Chardonnay", "2021", "Napa Valley", "Stone fruit and mineral lift.", 134, 6),
        bottle("Vietti Barolo Castiglione", "2019", "Piedmont", "Sour cherry, licorice and grip.", 176, 2),
        bottle("Jean-Louis Chave Saint-Joseph", "2020", "Northern Rhône", "Black olive, violet and granite.", 149, 7),
        bottle("Bollinger Special Cuvée", "NV", "Champagne", "Brioche, orchard fruit and chalk.", 125, 3),
        bottle("Dönnhoff Hermannshöhle Riesling", "2021", "Nahe", "Citrus oil, slate and focus.", 138, 5),
        bottle("Domaine Leflaive Mâcon-Verzé", "2021", "Burgundy", "White flowers, lemon and mineral.", 121, 6)
      ]
    }
  };

  function getBottles(regionKey, tierKey) {
    var region = REGIONS[regionKey] || REGIONS.bordeaux;
    var tier = TIERS[tierKey] || TIERS.cellar;
    return region.bottles.slice(0, tier.count).map(function (source, index) {
      return {
        name: source.name,
        vintage: source.vintage,
        region: source.region,
        note: source.note,
        price: Math.max(1, Math.round(source.baseValue * tier.multiplier)),
        buyback: Math.max(1, Math.round(source.baseValue * tier.multiplier * 0.85)),
        rarity: tier.rarities[index],
        art: source.art,
        plate: String(index + 1)
      };
    });
  }

  global.CELLAR_CATALOGUE = {
    regions: REGIONS,
    tiers: TIERS,
    getBottles: getBottles,
    buybackRate: 0.85
  };
})(window);
