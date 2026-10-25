export type BikeType = "hybrid" | "e-bike" | "mountain" | "kids" | "tandem" | "cargo";

export type Bike = {
  slug: string;
  name: string;
  type: BikeType;
  tagline: string;
  description: string;
  pricePerDay: number;
  sizes: string[];
  features: string[];
  colour: string;
};

export type Campsite = {
  slug: string;
  name: string;
  town: string;
  region: string;
  country: "England" | "Scotland" | "Wales";
  lat: number;
  lng: number;
  description: string;
  highlights: string[];
  trails: { name: string; distanceKm: number; difficulty: "Easy" | "Moderate" | "Challenging" }[];
  // bike slug -> number of bikes stationed at this campsite
  fleet: Record<string, number>;
};

export const bikes: Bike[] = [
  {
    slug: "trailblazer-hybrid",
    name: "Trailblazer Hybrid",
    type: "hybrid",
    tagline: "The all-rounder for lanes, towpaths and the village pub.",
    description:
      "A comfortable upright hybrid with 21 gears, puncture-resistant tyres and a rear rack. Ideal for gentle exploring on mixed surfaces.",
    pricePerDay: 22,
    sizes: ["S", "M", "L", "XL"],
    features: ["21-speed Shimano", "Rear rack", "Front & rear lights", "Lock included"],
    colour: "#2d5b3d",
  },
  {
    slug: "voltaire-e-bike",
    name: "Voltaire E-Bike",
    type: "e-bike",
    tagline: "Hills? What hills? 80km of electric assist.",
    description:
      "Our most popular bike. A step-through electric hybrid with a mid-drive motor and an 80km range, delivered fully charged every morning.",
    pricePerDay: 38,
    sizes: ["S/M", "L/XL"],
    features: ["Bosch mid-drive", "80km range", "Hydraulic disc brakes", "Fully charged daily"],
    colour: "#3e7150",
  },
  {
    slug: "ridgeback-mtb",
    name: "Ridgeback MTB",
    type: "mountain",
    tagline: "Full-suspension fun for forest trails and fell tracks.",
    description:
      "A capable full-suspension mountain bike with dropper post and grippy tyres, set up for blue and red graded trails.",
    pricePerDay: 30,
    sizes: ["S", "M", "L"],
    features: ["120mm full suspension", "Dropper post", "Tubeless tyres", "Trail map included"],
    colour: "#1c3926",
  },
  {
    slug: "little-explorer",
    name: "Little Explorer",
    type: "kids",
    tagline: "Proper bikes for small adventurers.",
    description:
      "Lightweight kids' bikes in three wheel sizes, with easy-pull brakes and a helmet in every size. Stabilisers available on request.",
    pricePerDay: 12,
    sizes: ['16"', '20"', '24"'],
    features: ["Lightweight alloy frame", "Kid-sized brake levers", "Helmet included", "Stabilisers on request"],
    colour: "#b39b5e",
  },
  {
    slug: "twin-tandem",
    name: "Twin Tandem",
    type: "tandem",
    tagline: "Twice the legs, all of the giggles.",
    description:
      "A sturdy touring tandem for couples or a grown-up and a confident older child. Great on flat coastal paths.",
    pricePerDay: 35,
    sizes: ["One size"],
    features: ["Adjustable stoker bars", "16 gears", "Disc brakes", "Two helmets included"],
    colour: "#5b7f4a",
  },
  {
    slug: "family-cargo",
    name: "Family Cargo E-Bike",
    type: "cargo",
    tagline: "Two little ones, a picnic and zero effort.",
    description:
      "A long-tail electric cargo bike with seating and footrests for two children, rain cover and enough space for the beach kit.",
    pricePerDay: 48,
    sizes: ["One size"],
    features: ["Seats two children", "Electric assist", "Rain canopy", "Child helmets included"],
    colour: "#8a7444",
  },
];

export const bikeTypeLabels: Record<BikeType, string> = {
  hybrid: "Hybrid",
  "e-bike": "E-bike",
  mountain: "Mountain",
  kids: "Kids",
  tandem: "Tandem",
  cargo: "Cargo",
};

export const campsites: Campsite[] = [
  {
    slug: "fernbrook-meadows",
    name: "Fernbrook Meadows",
    town: "Keswick",
    region: "Lake District",
    country: "England",
    lat: 54.6,
    lng: -3.134,
    description:
      "A lakeside meadow site in the shadow of Skiddaw, with easy access to the old railway path and the Derwentwater loop.",
    highlights: ["Keswick railway path on the doorstep", "Lakeside pitches", "Drying room for kit"],
    trails: [
      { name: "Keswick to Threlkeld Railway Path", distanceKm: 12, difficulty: "Easy" },
      { name: "Derwentwater Loop", distanceKm: 24, difficulty: "Moderate" },
      { name: "Whinlatter Forest Altura Trail", distanceKm: 19, difficulty: "Challenging" },
    ],
    fleet: { "trailblazer-hybrid": 6, "voltaire-e-bike": 8, "ridgeback-mtb": 4, "little-explorer": 6 },
  },
  {
    slug: "harbour-hill",
    name: "Harbour Hill Camping",
    town: "St Ives",
    region: "Cornwall",
    country: "England",
    lat: 50.208,
    lng: -5.48,
    description:
      "Clifftop pitches with sea views across St Ives Bay, a short freewheel down to the harbour and the coast-to-coast trail.",
    highlights: ["Sea-view pitches", "Close to the Hayle estuary path", "Surf & cycle combo days"],
    trails: [
      { name: "Hayle Estuary Path", distanceKm: 9, difficulty: "Easy" },
      { name: "Coast to Coast Trail (Portreath)", distanceKm: 18, difficulty: "Moderate" },
    ],
    fleet: { "trailblazer-hybrid": 5, "voltaire-e-bike": 10, "little-explorer": 4, "family-cargo": 2 },
  },
  {
    slug: "oak-hollow",
    name: "Oak Hollow",
    town: "Brockenhurst",
    region: "New Forest",
    country: "England",
    lat: 50.82,
    lng: -1.573,
    description:
      "Woodland camping among ancient oaks, with ponies wandering past and over 100 miles of gravel forest tracks to explore.",
    highlights: ["Direct forest track access", "Pony-spotting guaranteed", "Pub ride to Beaulieu"],
    trails: [
      { name: "Brockenhurst & Rhinefield Loop", distanceKm: 16, difficulty: "Easy" },
      { name: "Beaulieu Road Gravel Ride", distanceKm: 28, difficulty: "Moderate" },
    ],
    fleet: {
      "trailblazer-hybrid": 10,
      "voltaire-e-bike": 6,
      "little-explorer": 8,
      "twin-tandem": 2,
      "family-cargo": 2,
    },
  },
  {
    slug: "moorside-farm",
    name: "Moorside Farm Camping",
    town: "Hawes",
    region: "Yorkshire Dales",
    country: "England",
    lat: 54.304,
    lng: -2.197,
    description:
      "A working hill farm at the head of Wensleydale, surrounded by drystone walls, waterfalls and some of England's finest climbs.",
    highlights: ["Tour de Yorkshire climbs", "Farm shop breakfasts", "Hardraw Force nearby"],
    trails: [
      { name: "Wensleydale Valley Ride", distanceKm: 22, difficulty: "Moderate" },
      { name: "Buttertubs Pass", distanceKm: 26, difficulty: "Challenging" },
    ],
    fleet: { "voltaire-e-bike": 8, "ridgeback-mtb": 4, "trailblazer-hybrid": 4 },
  },
  {
    slug: "glenmore-pines",
    name: "Glenmore Pines",
    town: "Aviemore",
    region: "Cairngorms",
    country: "Scotland",
    lat: 57.167,
    lng: -3.698,
    description:
      "Pitches tucked into Caledonian pine forest by Loch Morlich, with sandy beaches, red squirrels and graded forest trails.",
    highlights: ["Loch Morlich beach", "Red squirrel hides", "Graded forest trail network"],
    trails: [
      { name: "Loch Morlich Circuit", distanceKm: 7, difficulty: "Easy" },
      { name: "Rothiemurchus Estate Loop", distanceKm: 18, difficulty: "Moderate" },
      { name: "Ryvoan Pass", distanceKm: 21, difficulty: "Challenging" },
    ],
    fleet: { "trailblazer-hybrid": 6, "voltaire-e-bike": 6, "ridgeback-mtb": 6, "little-explorer": 6 },
  },
  {
    slug: "afon-valley",
    name: "Afon Valley Glamping",
    town: "Betws-y-Coed",
    region: "Eryri (Snowdonia)",
    country: "Wales",
    lat: 53.093,
    lng: -3.801,
    description:
      "Bell tents and pods beside the River Conwy, minutes from Gwydir Forest's waymarked trails and the Lôn Gwyrfai.",
    highlights: ["Riverside bell tents", "Gwydir Forest trailhead", "Swallow Falls ride"],
    trails: [
      { name: "Conwy Valley Riverside", distanceKm: 14, difficulty: "Easy" },
      { name: "Marin Trail, Gwydir", distanceKm: 25, difficulty: "Challenging" },
    ],
    fleet: { "voltaire-e-bike": 6, "ridgeback-mtb": 6, "trailblazer-hybrid": 4, "little-explorer": 3 },
  },
  {
    slug: "sandpiper-dunes",
    name: "Sandpiper Dunes",
    town: "Wells-next-the-Sea",
    region: "Norfolk Coast",
    country: "England",
    lat: 52.953,
    lng: 0.851,
    description:
      "Flat, quiet lanes, salt marshes and big skies. A dune-side site perfect for families and first-time riders.",
    highlights: ["Pancake-flat lanes", "Seal trips at Blakeney", "Beach huts by bike"],
    trails: [
      { name: "Wells to Holkham Beach", distanceKm: 6, difficulty: "Easy" },
      { name: "Norfolk Coast Cycleway to Blakeney", distanceKm: 20, difficulty: "Easy" },
    ],
    fleet: {
      "trailblazer-hybrid": 8,
      "little-explorer": 8,
      "twin-tandem": 3,
      "family-cargo": 3,
      "voltaire-e-bike": 4,
    },
  },
  {
    slug: "cotswold-brook",
    name: "Cotswold Brook",
    town: "Bourton-on-the-Water",
    region: "Cotswolds",
    country: "England",
    lat: 51.885,
    lng: -1.757,
    description:
      "A brookside site amid honey-stone villages, rolling hills and tea rooms. E-bikes make light work of the wolds.",
    highlights: ["Village-hopping routes", "Tea room trail", "Quiet lanes"],
    trails: [
      { name: "The Slaughters Loop", distanceKm: 11, difficulty: "Easy" },
      { name: "Stow & Northleach Wolds", distanceKm: 32, difficulty: "Moderate" },
    ],
    fleet: { "voltaire-e-bike": 10, "trailblazer-hybrid": 6, "twin-tandem": 2 },
  },
  {
    slug: "peak-view",
    name: "Peak View Campsite",
    town: "Hathersage",
    region: "Peak District",
    country: "England",
    lat: 53.33,
    lng: -1.652,
    description:
      "Beneath Stanage Edge, with the Monsal and Tissington trails a short ride away and gritstone views in every direction.",
    highlights: ["Stanage Edge views", "Ladybower reservoir loop", "Outdoor pool in the village"],
    trails: [
      { name: "Ladybower Reservoir Loop", distanceKm: 18, difficulty: "Easy" },
      { name: "Monsal Trail", distanceKm: 14, difficulty: "Easy" },
      { name: "Stanage Edge Bridleway", distanceKm: 15, difficulty: "Challenging" },
    ],
    fleet: { "trailblazer-hybrid": 6, "voltaire-e-bike": 8, "ridgeback-mtb": 5, "little-explorer": 4 },
  },
  {
    slug: "jurassic-edge",
    name: "Jurassic Edge",
    town: "Lulworth",
    region: "Dorset",
    country: "England",
    lat: 50.623,
    lng: -2.248,
    description:
      "Rolling chalk downland above the Jurassic Coast, close to Lulworth Cove and Durdle Door.",
    highlights: ["Durdle Door by bike", "Fossil-hunting rides", "Sunset downland loops"],
    trails: [
      { name: "Lulworth to Wool", distanceKm: 10, difficulty: "Easy" },
      { name: "Purbeck Ridge", distanceKm: 24, difficulty: "Challenging" },
    ],
    fleet: { "voltaire-e-bike": 6, "trailblazer-hybrid": 6, "little-explorer": 4, "family-cargo": 1 },
  },
  {
    slug: "kielder-waters-edge",
    name: "Kielder Water's Edge",
    town: "Kielder",
    region: "Northumberland",
    country: "England",
    lat: 55.234,
    lng: -2.581,
    description:
      "Dark-sky camping beside England's largest forest and reservoir, with the Lakeside Way circling the water.",
    highlights: ["Gold-tier dark sky park", "Lakeside Way", "Kielder bike park"],
    trails: [
      { name: "Lakeside Way", distanceKm: 42, difficulty: "Moderate" },
      { name: "Borderline Trail", distanceKm: 9, difficulty: "Challenging" },
    ],
    fleet: { "ridgeback-mtb": 8, "voltaire-e-bike": 6, "trailblazer-hybrid": 4, "little-explorer": 3 },
  },
  {
    slug: "pembroke-cliffs",
    name: "Pembroke Cliffs",
    town: "St Davids",
    region: "Pembrokeshire",
    country: "Wales",
    lat: 51.882,
    lng: -5.269,
    description:
      "Wildflower meadows a mile from Britain's smallest city, with coastal lanes, coves and puffin-boat trips nearby.",
    highlights: ["Whitesands Bay", "Cathedral city rides", "Coastal lanes"],
    trails: [
      { name: "St Davids Peninsula Loop", distanceKm: 16, difficulty: "Moderate" },
      { name: "Solva Harbour Ride", distanceKm: 12, difficulty: "Easy" },
    ],
    fleet: { "voltaire-e-bike": 8, "trailblazer-hybrid": 4, "little-explorer": 4 },
  },
  {
    slug: "south-downs-hideaway",
    name: "South Downs Hideaway",
    town: "Arundel",
    region: "South Downs",
    country: "England",
    lat: 50.855,
    lng: -0.554,
    description:
      "A secluded site below Arundel Castle with river-valley rides and the South Downs Way on the ridge above.",
    highlights: ["Arundel Castle", "River Arun towpath", "South Downs Way access"],
    trails: [
      { name: "Arun Valley Towpath", distanceKm: 10, difficulty: "Easy" },
      { name: "South Downs Way: Amberley to Bignor", distanceKm: 20, difficulty: "Challenging" },
    ],
    fleet: { "trailblazer-hybrid": 6, "voltaire-e-bike": 6, "ridgeback-mtb": 3, "twin-tandem": 2 },
  },
  {
    slug: "loch-lomond-shores",
    name: "Loch Lomond Shores",
    town: "Balloch",
    region: "Loch Lomond & The Trossachs",
    country: "Scotland",
    lat: 56.004,
    lng: -4.583,
    description:
      "Lochside pitches at the gateway to the Trossachs, on National Cycle Route 7 with island views and ferry-and-bike days.",
    highlights: ["On National Cycle Route 7", "Bike + water bus days", "Lochside sunsets"],
    trails: [
      { name: "Balloch to Luss", distanceKm: 15, difficulty: "Easy" },
      { name: "Three Lochs Way section", distanceKm: 22, difficulty: "Moderate" },
    ],
    fleet: { "trailblazer-hybrid": 6, "voltaire-e-bike": 8, "little-explorer": 4, "family-cargo": 2 },
  },
];

export function getBike(slug: string) {
  return bikes.find((b) => b.slug === slug);
}

export function getCampsite(slug: string) {
  return campsites.find((c) => c.slug === slug);
}

export function bikesAtCampsite(campsite: Campsite) {
  return bikes
    .filter((b) => (campsite.fleet[b.slug] ?? 0) > 0)
    .map((bike) => ({ bike, total: campsite.fleet[bike.slug] }));
}

export function campsitesWithBike(bikeSlug: string) {
  return campsites.filter((c) => (c.fleet[bikeSlug] ?? 0) > 0);
}

export const regions = Array.from(new Set(campsites.map((c) => c.region))).sort();
