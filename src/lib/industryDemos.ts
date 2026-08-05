export type IndustryDemo = {
  slug: string;
  industry: string;
  industryPlural: string;
  businessName: string;
  initials: string;
  category: string;
  headline: string;
  subheadline: string;
  journeyIntro: string;
  image: string;
  imageAlt: string;
  accent: string;
  accentMuted: string;
  location: string;
  leadScenario: string;
  primaryAction: string;
  secondaryAction: string;
  requestFields: string[];
  journey: Array<{
    title: string;
    text: string;
  }>;
  system: Array<{
    title: string;
    text: string;
  }>;
  metadata: {
    title: string;
    description: string;
  };
};

export const industryDemos: IndustryDemo[] = [
  {
    slug: "moving-companies",
    industry: "Moving company",
    industryPlural: "Moving companies",
    businessName: "Beacon Moving Co.",
    initials: "BM",
    category: "Local moves · long distance · packing",
    headline: "Move day, handled.",
    subheadline:
      "A concept website and request flow that helps a moving team collect addresses, dates, inventory and packing needs before the first call.",
    journeyIntro:
      "Moving enquiries usually need context before they can become useful estimates. This concept routes visitors from service education into a structured request, then into a follow-up-ready CRM record.",
    image: "/demos/moving-demo.png",
    imageAlt: "Concept demo screenshot for a moving company website system",
    accent: "#f26545",
    accentMuted: "rgba(242,101,69,0.14)",
    location: "Charlotte region",
    leadScenario: "2-bedroom move · estimate request",
    primaryAction: "Build my moving estimate",
    secondaryAction: "Call the coordinator",
    requestFields: [
      "Move date",
      "Origin and destination",
      "Home size",
      "Large item notes",
      "Packing help",
    ],
    journey: [
      {
        title: "Visitor chooses a move type",
        text: "The page separates home moves, packing support and business moves so the enquiry starts with the right context.",
      },
      {
        title: "Request form captures useful scope",
        text: "The form asks for timing, locations, inventory signals and packing needs before the team spends time on a call.",
      },
      {
        title: "Lead enters the operating layer",
        text: "The CRM can assign ownership, preserve notes and keep follow-up tied to the requested move date.",
      },
    ],
    system: [
      {
        title: "Website",
        text: "Service pages explain what the moving team handles and guide visitors toward the estimate request.",
      },
      {
        title: "Automation",
        text: "Confirmation and reminder messages reduce phone-tag while the team reviews the move details.",
      },
      {
        title: "CRM",
        text: "Lead records hold dates, locations, notes, status and assigned team ownership.",
      },
    ],
    metadata: {
      title: "Moving Company Concept Demo",
      description:
        "A NorthFlow concept demo for moving companies, showing a website, estimate request flow, follow-up and CRM journey.",
    },
  },
  {
    slug: "event-rental-companies",
    industry: "Event-rental company",
    industryPlural: "Event-rental companies",
    businessName: "Everly Event Co.",
    initials: "EE",
    category: "Tent rentals · furniture · tableware",
    headline: "The room people remember.",
    subheadline:
      "A concept request journey for event-rental teams that need event dates, guest counts, rental categories and availability checks before confirming scope.",
    journeyIntro:
      "Event rental is rarely instant checkout. This concept positions availability as request-and-confirm, then collects the details a coordinator needs to respond clearly.",
    image: "/demos/event-rental-demo.png",
    imageAlt: "Concept demo screenshot for an event rental website system",
    accent: "#c77b45",
    accentMuted: "rgba(199,123,69,0.14)",
    location: "Metro event market",
    leadScenario: "Outdoor celebration · rental request",
    primaryAction: "Start an event request",
    secondaryAction: "Browse rental categories",
    requestFields: [
      "Event date",
      "Venue or ZIP code",
      "Guest count",
      "Rental categories",
      "Delivery window",
    ],
    journey: [
      {
        title: "Visitor explores the event need",
        text: "The page frames common rental categories while keeping the path focused on a coordinator-reviewed request.",
      },
      {
        title: "Request captures availability signals",
        text: "Date, location, guest count and product categories give the rental team enough information to check feasibility.",
      },
      {
        title: "Coordinator follows up from CRM",
        text: "The lead record can preserve event details, status, notes and next actions without pretending inventory is real-time.",
      },
    ],
    system: [
      {
        title: "Website",
        text: "Category sections make the offer understandable without turning the page into a complex inventory catalog.",
      },
      {
        title: "Automation",
        text: "Request confirmations and internal alerts help the coordinator respond faster.",
      },
      {
        title: "CRM",
        text: "Event date, delivery needs and product interest stay attached to the lead record.",
      },
    ],
    metadata: {
      title: "Event Rental Company Concept Demo",
      description:
        "A NorthFlow concept demo for event-rental companies, showing a premium request-and-confirm customer journey.",
    },
  },
  {
    slug: "auto-detailing-businesses",
    industry: "Auto-detailing business",
    industryPlural: "Auto-detailing businesses",
    businessName: "Apex Detail Lab",
    initials: "AD",
    category: "Interior · exterior · correction",
    headline: "Your car, reset.",
    subheadline:
      "A concept booking path that helps detailers separate quick maintenance details from higher-scope correction and protection work.",
    journeyIntro:
      "Auto detailing enquiries need vehicle context and service intent. This concept guides visitors from package education into a form that helps the shop qualify the request.",
    image: "/demos/detailing-demo.png",
    imageAlt: "Concept demo screenshot for an auto-detailing website system",
    accent: "#4f7d78",
    accentMuted: "rgba(79,125,120,0.14)",
    location: "Local detailing market",
    leadScenario: "SUV interior reset · booking request",
    primaryAction: "Request a detail",
    secondaryAction: "Compare packages",
    requestFields: [
      "Vehicle type",
      "Service package",
      "Vehicle condition",
      "Preferred date",
      "Add-on interest",
    ],
    journey: [
      {
        title: "Visitor identifies the service level",
        text: "Package content helps visitors choose between maintenance, deep cleaning and correction-oriented work.",
      },
      {
        title: "Booking request captures vehicle context",
        text: "The form gives the shop condition, vehicle and timing details before confirming final scope.",
      },
      {
        title: "Follow-up stays connected",
        text: "The CRM can hold the package request, vehicle notes, assigned owner and appointment status.",
      },
    ],
    system: [
      {
        title: "Website",
        text: "A polished service menu explains what each package is for and where custom review is needed.",
      },
      {
        title: "Automation",
        text: "Confirmations and reminders keep the request moving without over-promising instant final pricing.",
      },
      {
        title: "CRM",
        text: "Vehicle details, package interest and follow-up notes stay organized in one place.",
      },
    ],
    metadata: {
      title: "Auto Detailing Concept Demo",
      description:
        "A NorthFlow concept demo for auto-detailing businesses, showing a service menu, booking request and CRM journey.",
    },
  },
  {
    slug: "barbershops",
    industry: "Barbershop",
    industryPlural: "Barbershops",
    businessName: "Northline Barbers",
    initials: "NB",
    category: "Cuts · beard work · appointments",
    headline: "Good cuts. No guesswork.",
    subheadline:
      "A concept site for barbershops that need a premium first impression, clear service options and a booking path that fits existing tools.",
    journeyIntro:
      "Barbershops often already have booking tools. This concept focuses on positioning, services and care-plan-friendly upkeep while routing visitors into the right next step.",
    image: "/demos/barber-demo.png",
    imageAlt: "Concept demo screenshot for a barbershop website system",
    accent: "#8f6b4f",
    accentMuted: "rgba(143,107,79,0.14)",
    location: "Neighborhood barbershop",
    leadScenario: "First-time client · service selection",
    primaryAction: "Book a chair",
    secondaryAction: "View services",
    requestFields: [
      "Service type",
      "Preferred barber",
      "Appointment time",
      "First visit notes",
      "Reminder preference",
    ],
    journey: [
      {
        title: "Visitor understands the shop",
        text: "The page makes services, tone and booking expectations clear before the visitor reaches the scheduler.",
      },
      {
        title: "Booking path stays simple",
        text: "The concept can route to an existing booking tool instead of replacing a workflow that already works.",
      },
      {
        title: "Care plan supports changes",
        text: "Ongoing support can cover service updates, barber changes, seasonal pages and content polish.",
      },
    ],
    system: [
      {
        title: "Website",
        text: "A premium brand layer gives the shop a stronger first impression and clearer service structure.",
      },
      {
        title: "Automation",
        text: "Simple reminders and follow-up prompts can support first-time client journeys.",
      },
      {
        title: "CRM",
        text: "When needed, enquiries and high-value service requests can be organized outside the public booking tool.",
      },
    ],
    metadata: {
      title: "Barbershop Concept Demo",
      description:
        "A NorthFlow concept demo for barbershops, showing a premium website and booking-friendly customer journey.",
    },
  },
  {
    slug: "independent-car-rental-companies",
    industry: "Independent car-rental company",
    industryPlural: "Independent car-rental companies",
    businessName: "Sol Drive Rentals",
    initials: "SD",
    category: "Daily rental · airport pickup · local delivery",
    headline: "Phoenix, on your terms.",
    subheadline:
      "A concept rental request flow for independent operators that need dates, location, vehicle class and policy context before confirming availability.",
    journeyIntro:
      "Independent rental teams need trust and clarity before handing over keys. This concept makes policies visible and keeps availability request-based.",
    image: "/demos/car-rental-demo.png",
    imageAlt: "Concept demo screenshot for an independent car-rental website system",
    accent: "#d09a3c",
    accentMuted: "rgba(208,154,60,0.16)",
    location: "Phoenix metro",
    leadScenario: "Weekend SUV request · availability check",
    primaryAction: "Request availability",
    secondaryAction: "Compare vehicle classes",
    requestFields: [
      "Pickup and return dates",
      "Pickup location",
      "Vehicle class",
      "Driver age",
      "Insurance question",
    ],
    journey: [
      {
        title: "Visitor selects rental intent",
        text: "The page separates use cases and vehicle classes so the request starts with realistic expectations.",
      },
      {
        title: "Request protects availability",
        text: "Dates, location and vehicle class are collected before any final availability promise is made.",
      },
      {
        title: "Follow-up handles policy details",
        text: "The CRM can hold driver questions, insurance notes, next actions and availability status.",
      },
    ],
    system: [
      {
        title: "Website",
        text: "The public page builds confidence by explaining rental policies, vehicle types and service area.",
      },
      {
        title: "Automation",
        text: "Request confirmations and internal alerts keep the operator moving quickly.",
      },
      {
        title: "CRM",
        text: "Rental dates, vehicle class, location and follow-up status stay attached to the lead.",
      },
    ],
    metadata: {
      title: "Independent Car Rental Concept Demo",
      description:
        "A NorthFlow concept demo for independent car-rental companies, showing a request-based availability and CRM journey.",
    },
  },
];

export function getIndustryDemo(slug: string) {
  return industryDemos.find((demo) => demo.slug === slug);
}
