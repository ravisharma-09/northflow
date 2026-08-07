export type DemoField = {
  name: string;
  label: string;
  type: "text" | "email" | "date" | "number" | "select" | "checkbox";
  placeholder?: string;
  options?: string[];
};

export type DemoSite = {
  slug: "moving" | "event-rental" | "auto-detailing" | "barbershop" | "car-rental";
  businessName: string;
  initials: string;
  industry: string;
  location: string;
  eyebrow: string;
  headline: string;
  description: string;
  image: string;
  imageAlt: string;
  theme: {
    background: string;
    surface: string;
    text: string;
    muted: string;
    border: string;
    accent: string;
    accentText: string;
  };
  primaryAction: string;
  services: Array<{ title: string; text: string }>;
  trustPoints: string[];
  journey: Array<{ number: string; title: string; text: string }>;
  fields: DemoField[];
  nextStep: string;
  faq: Array<{ question: string; answer: string }>;
  metadata: { title: string; description: string };
  designConfig: {
    heroVariant: 'split-right' | 'split-left' | 'centered' | 'full-background' | 'offset-grid';
    servicesVariant: 'grid' | 'editorial-list' | 'dark-cards' | 'minimal-list' | 'features-grid';
    imageStyle: 'sharp' | 'soft-edges' | 'high-contrast' | 'rounded' | 'modern';
  };
};

export const demoSites: DemoSite[] = [
  {
    slug: "moving",
    businessName: "Beacon Moving Co.",
    initials: "BM",
    industry: "Moving company",
    location: "Charlotte and the surrounding region",
    eyebrow: "Local moves · long distance · packing",
    headline: "Move day, handled.",
    description:
      "Share the route, timing and level of help you need. This concept turns a vague moving enquiry into an organized estimate request.",
    image: "/demos/moving-hero.png",
    imageAlt: "Moving professionals carrying boxes into a home",
    theme: {
      background: "#f4eee7",
      surface: "#fffaf4",
      text: "#171411",
      muted: "#655f58",
      border: "#d9d0c7",
      accent: "#ed7658",
      accentText: "#171411",
    },
    primaryAction: "Build my moving estimate",
    services: [
      { title: "Local moving", text: "A clear plan for homes, apartments and in-city moves." },
      { title: "Long distance", text: "Route, timing and access details captured before the first call." },
      { title: "Packing help", text: "Select full, partial or fragile-only packing support." },
    ],
    trustPoints: ["Clear scope before the call", "Coordinator-reviewed estimates", "Request updates by email"],
    journey: [
      { number: "01", title: "Describe the move", text: "Collect route, date, home size and the service level in one guided request." },
      { number: "02", title: "Review the details", text: "A coordinator checks access, timing and any special items before estimating." },
      { number: "03", title: "Confirm the plan", text: "The team follows up with scope, next steps and questions still needing an answer." },
    ],
    fields: [
      { name: "origin", label: "Starting ZIP or city", type: "text", placeholder: "Charlotte, NC" },
      { name: "destination", label: "Destination ZIP or city", type: "text", placeholder: "Raleigh, NC" },
      { name: "moveDate", label: "Move date", type: "date" },
      { name: "homeSize", label: "Home size", type: "select", options: ["Studio", "1 bedroom", "2 bedrooms", "3 bedrooms", "4+ bedrooms", "Office"] },
      { name: "service", label: "Service required", type: "select", options: ["Moving only", "Moving + partial packing", "Full packing + moving", "Labor only"] },
    ],
    nextStep: "A moving coordinator would review access, inventory and travel details before returning an estimate.",
    faq: [
      { question: "Is the estimate instant?", answer: "No. This concept collects the details needed for a coordinator-reviewed estimate." },
      { question: "Can special items be included?", answer: "Yes. A production version can add inventory, stairs, piano and access questions to the same journey." },
    ],
    metadata: {
      title: "Beacon Moving Co. — Moving Company Concept Demo",
      description: "Concept Demo: a fictional moving company website with a guided estimate-request journey built by NorthFlow.",
    },
    designConfig: {
      heroVariant: 'split-right',
      servicesVariant: 'grid',
      imageStyle: 'sharp'
    },
  },
  {
    slug: "event-rental",
    businessName: "Everly Event Co.",
    initials: "EE",
    industry: "Event-rental company",
    location: "Thoughtful event rentals across Austin",
    eyebrow: "Tents · tables · seating · finishing pieces",
    headline: "The room people remember.",
    description:
      "Explore a considered rental collection, then share the date, guest count and delivery details for a coordinator-built proposal.",
    image: "/demos/event-rental-hero-v2.jpg",
    imageAlt: "Elegant outdoor event tent prepared for dinner",
    theme: {
      background: "#f6f0ec",
      surface: "#fffaf7",
      text: "#321527",
      muted: "#705f69",
      border: "#ddcfcf",
      accent: "#bd9274",
      accentText: "#241811",
    },
    primaryAction: "Start an event proposal",
    services: [
      { title: "Tents and structure", text: "Weather-aware tenting and floor-plan foundations." },
      { title: "Tables and seating", text: "Collections shaped around guest count and venue style." },
      { title: "Finishing pieces", text: "Linens, lighting and tabletop details brought into one request." },
    ],
    trustPoints: ["Curated rental categories", "Delivery and setup planning", "One event contact"],
    journey: [
      { number: "01", title: "Share the occasion", text: "Start with the event type, date, location and expected guest count." },
      { number: "02", title: "Shape the collection", text: "Choose the rental categories that matter without pretending inventory is live." },
      { number: "03", title: "Receive a proposal", text: "A coordinator reviews availability and returns a practical, scoped proposal." },
    ],
    fields: [
      { name: "eventType", label: "Event type", type: "select", options: ["Wedding", "Corporate event", "Private dinner", "Celebration", "Community event"] },
      { name: "eventDate", label: "Event date", type: "date" },
      { name: "guests", label: "Guest count", type: "number", placeholder: "120" },
      { name: "categories", label: "Rental categories", type: "checkbox", options: ["Tents", "Tables", "Seating", "Tableware", "Lighting"] },
      { name: "delivery", label: "Delivery location", type: "text", placeholder: "Venue or ZIP code" },
    ],
    nextStep: "An event coordinator would check inventory, access and delivery timing before preparing a proposal.",
    faq: [
      { question: "Does this show live inventory?", answer: "No. It is intentionally request-and-confirm until the operator's real inventory software is connected." },
      { question: "Can venues and delivery windows be captured?", answer: "Yes. A production flow can add venue access, setup, collection and floor-plan details." },
    ],
    metadata: {
      title: "Everly Event Co. — Event Rental Concept Demo",
      description: "Concept Demo: a fictional event-rental website with a guided proposal-request journey built by NorthFlow.",
    },
    designConfig: {
      heroVariant: 'full-background',
      servicesVariant: 'editorial-list',
      imageStyle: 'soft-edges'
    },
  },
  {
    slug: "auto-detailing",
    businessName: "Apex Detail Lab",
    initials: "AD",
    industry: "Auto-detailing business",
    location: "Detailing by appointment in Scottsdale",
    eyebrow: "Paint correction · ceramic · interior reset",
    headline: "Your car, reset.",
    description:
      "Choose the outcome your vehicle needs, see what belongs in the service and prepare a protected appointment request.",
    image: "/demos/auto-detailing-hero.png",
    imageAlt: "Detailing professional polishing a black car in a studio",
    theme: {
      background: "#0d1310",
      surface: "#141b17",
      text: "#f4f6ef",
      muted: "#a1aaa2",
      border: "#303a33",
      accent: "#baf257",
      accentText: "#0d1310",
    },
    primaryAction: "Find my detail package",
    services: [
      { title: "Interior reset", text: "A deep clean shaped around vehicle size and condition." },
      { title: "Paint correction", text: "A consultation-led path for defects, clarity and finish." },
      { title: "Ceramic protection", text: "Preparation and coating requirements explained before booking." },
    ],
    trustPoints: ["Paint-safe process", "Appointment-led studio", "Photo updates available"],
    journey: [
      { number: "01", title: "Choose the outcome", text: "Package language starts with the result, then clarifies what the service includes." },
      { number: "02", title: "Describe the vehicle", text: "Vehicle type, condition, location and preferred date qualify the request." },
      { number: "03", title: "Protect the appointment", text: "The studio reviews scope before confirming timing or final service." },
    ],
    fields: [
      { name: "vehicle", label: "Vehicle type", type: "select", options: ["Sedan", "SUV", "Truck", "Coupe", "Luxury / specialty"] },
      { name: "package", label: "Desired package", type: "select", options: ["Interior reset", "Exterior detail", "Paint correction", "Ceramic coating", "Help me choose"] },
      { name: "preferredDate", label: "Preferred date", type: "date" },
      { name: "serviceMode", label: "Service location", type: "select", options: ["Studio", "Mobile service", "Either"] },
      { name: "contact", label: "Contact preference", type: "select", options: ["Text", "Email", "Phone call"] },
    ],
    nextStep: "A detailing specialist would review condition and package fit before protecting the appointment time.",
    faq: [
      { question: "Is final scope confirmed online?", answer: "No. Correction and coating work should be reviewed against the vehicle's actual condition." },
      { question: "Can the flow support mobile and studio work?", answer: "Yes. Location preference is captured early so the team can route the request correctly." },
    ],
    metadata: {
      title: "Apex Detail Lab — Auto Detailing Concept Demo",
      description: "Concept Demo: a fictional auto-detailing website with a guided package and appointment-request journey built by NorthFlow.",
    },
    designConfig: {
      heroVariant: 'split-left',
      servicesVariant: 'dark-cards',
      imageStyle: 'high-contrast'
    },
  },
  {
    slug: "barbershop",
    businessName: "Northline Barbers",
    initials: "NB",
    industry: "Barbershop",
    location: "A neighborhood shop built around appointments",
    eyebrow: "Cuts · beard work · considered service",
    headline: "Good cuts. No guesswork.",
    description:
      "A straightforward service menu and appointment path designed to fit the tools a working barbershop already uses.",
    image: "/demos/barbershop-hero.png",
    imageAlt: "Barber cutting a client's hair in a warm neighborhood shop",
    theme: {
      background: "#eee9df",
      surface: "#f8f4ec",
      text: "#18261e",
      muted: "#59645c",
      border: "#c9c9bb",
      accent: "#cf6f4e",
      accentText: "#18261e",
    },
    primaryAction: "Choose a chair",
    services: [
      { title: "Signature cut", text: "Consultation, cut and finish with enough time to get it right." },
      { title: "Cut and beard", text: "One appointment for a complete, balanced service." },
      { title: "Shape-up", text: "A focused maintenance visit between full cuts." },
    ],
    trustPoints: ["Clear service menu", "Barber preference captured", "Existing booking tools supported"],
    journey: [
      { number: "01", title: "Choose the service", text: "Visitors understand duration and fit before they reach the appointment step." },
      { number: "02", title: "Choose the preference", text: "Barber, date, time and contact preference travel together." },
      { number: "03", title: "Continue to booking", text: "A production version can hand off to the shop's existing scheduler without replacing it." },
    ],
    fields: [
      { name: "service", label: "Service", type: "select", options: ["Signature cut", "Cut + beard", "Beard service", "Shape-up"] },
      { name: "barber", label: "Barber preference", type: "select", options: ["No preference", "First available", "Choose in booking tool"] },
      { name: "date", label: "Date", type: "date" },
      { name: "time", label: "Time", type: "select", options: ["Morning", "Afternoon", "Evening"] },
      { name: "contact", label: "Contact preference", type: "select", options: ["Text", "Email", "Phone call"] },
    ],
    nextStep: "A live version would hand these preferences to the barbershop's confirmed booking tool.",
    faq: [
      { question: "Does NorthFlow replace the booking tool?", answer: "Only when needed. This pattern can preserve a scheduler that already works and improve the website around it." },
      { question: "Can individual barber profiles be added?", answer: "Yes. Services, working days and direct booking links can be configured per barber." },
    ],
    metadata: {
      title: "Northline Barbers — Barbershop Concept Demo",
      description: "Concept Demo: a fictional barbershop website with a service and booking-preference journey built by NorthFlow.",
    },
    designConfig: {
      heroVariant: 'centered',
      servicesVariant: 'minimal-list',
      imageStyle: 'rounded'
    },
  },
  {
    slug: "car-rental",
    businessName: "Sol Drive Rentals",
    initials: "SD",
    industry: "Independent car-rental company",
    location: "Local pickup near central Phoenix",
    eyebrow: "Phoenix pickup · flexible mileage · human support",
    headline: "Phoenix, on your terms.",
    description:
      "Choose a vehicle class, share the trip and receive a confirmed rental option from a local team before you make the drive.",
    image: "/demos/car-rental-hero.png",
    imageAlt: "Three rental vehicle classes outside a modern desert property",
    theme: {
      background: "#f2f3f8",
      surface: "#fafbff",
      text: "#16233d",
      muted: "#697287",
      border: "#ccd1dd",
      accent: "#ef6c52",
      accentText: "#16233d",
    },
    primaryAction: "Request a vehicle",
    services: [
      { title: "City car", text: "Simple local travel with an efficient, easy-to-park class." },
      { title: "Comfort SUV", text: "Space for luggage, families and longer Arizona drives." },
      { title: "Pickup", text: "A practical class for work, cargo and weekend projects." },
    ],
    trustPoints: ["Clear requirements", "Local team review", "Request-and-confirm availability"],
    journey: [
      { number: "01", title: "Describe the trip", text: "Pickup, return, location and driver age establish the real rental context." },
      { number: "02", title: "Choose a class", text: "Visitors request a suitable category without implying exact live inventory." },
      { number: "03", title: "Confirm with the team", text: "The operator checks availability and follows up with the vehicle and requirements." },
    ],
    fields: [
      { name: "pickupLocation", label: "Pickup location", type: "text", placeholder: "Phoenix Sky Harbor or central Phoenix" },
      { name: "pickupDate", label: "Pickup date", type: "date" },
      { name: "returnDate", label: "Return date", type: "date" },
      { name: "vehicle", label: "Vehicle category", type: "select", options: ["City car", "Sedan", "Comfort SUV", "Pickup truck"] },
      { name: "age", label: "Driver age", type: "number", placeholder: "30" },
      { name: "contact", label: "Contact details", type: "email", placeholder: "you@example.com" },
    ],
    nextStep: "A local team member would verify dates, requirements and the available vehicle before confirming anything.",
    faq: [
      { question: "Is the displayed fleet live inventory?", answer: "No. This concept is deliberately request-and-confirm and makes no real-time availability claim." },
      { question: "Can policy checks be added?", answer: "Yes. Driver age, licence, deposit, insurance and mileage requirements can be captured before follow-up." },
    ],
    metadata: {
      title: "Sol Drive Rentals — Car Rental Concept Demo",
      description: "Concept Demo: a fictional independent car-rental website with a request-and-confirm journey built by NorthFlow.",
    },
    designConfig: {
      heroVariant: 'offset-grid',
      servicesVariant: 'features-grid',
      imageStyle: 'modern'
    },
  },
];

export function getDemoSite(slug: string) {
  return demoSites.find((demo) => demo.slug === slug);
}
