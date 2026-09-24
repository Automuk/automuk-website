export type Work = {
  slug: string;
  url: string;
  name: string;
  domain: string;
  description: string;
  accent: string;
  imageUrl: string;
  /** Shown as one of the highlighted cards on the homepage. */
  featured?: boolean;
};

export const works: Work[] = [
  {
    slug: "westra",
    url: "https://westra.in/",
    name: "Westra",
    domain: "westra.in",
    description:
      "A premium women's fashion eCommerce platform blending timeless elegance with a modern shopping experience. We built the full storefront with live Facebook selling integration, mobile-first UX, and conversion-focused design.",
    accent: "#3168FA",
    imageUrl: "https://cdn.autom.uk/cdn-cgi/image/format=webp,quality=80,width=800/westra.png",
  },
  {
    slug: "animhaus",
    url: "https://animhaus.com/",
    name: "Animhaus",
    domain: "animhaus.com",
    description:
      "A cinematic website for a premium animation and visual engineering studio. We crafted an immersive, high-performance platform showcasing their anime, game asset, and motion design services with dynamic layouts and smooth animations.",
    accent: "#8B5CF6",
    imageUrl: "https://cdn.autom.uk/cdn-cgi/image/format=webp,quality=80,width=800/animhaus.png",
  },
  {
    slug: "grabfabs",
    url: "https://grabfabs.com/",
    name: "Grabfabs",
    domain: "grabfabs.com",
    description:
      "A product sourcing and wholesale marketplace connecting buyers with verified manufacturers. We engineered the full-stack platform including catalogue management, RFQ workflows, and an AI-powered product tagging system that cut listing time by 60%.",
    accent: "#10B981",
    imageUrl: "https://cdn.autom.uk/cdn-cgi/image/format=webp,quality=80,width=800/grabfabs.png",
    featured: true,
  },
  {
    slug: "awakynn",
    url: "https://awakynn.com/",
    name: "Awakynn",
    domain: "awakynn.com",
    description:
      "A serene digital experience for a holistic health and wellness brand. We designed a responsive, SEO-optimised platform showcasing yoga, meditation, Ayurvedic wellness, and personalised consultations with smooth animations throughout.",
    accent: "#F59E0B",
    imageUrl: "https://cdn.autom.uk/cdn-cgi/image/format=webp,quality=80,width=800/awakynn.png",
    featured: true,
  },
  {
    slug: "shurerdhara",
    url: "https://shurerdhara.com/",
    name: "Shurerdhara",
    domain: "shurerdhara.com",
    description:
      "A heritage digital destination honouring Padma Shri awardee Rezwana Choudhury Bannya. We built an immersive, multimedia-rich website with performance archives, event showcases, and cinematic visuals inspired by Bengali classical aesthetics.",
    accent: "#EC4899",
    imageUrl: "https://cdn.autom.uk/cdn-cgi/image/format=webp,quality=80,width=800/shurerdhara.png",
    featured: true,
  },
  {
    slug: "kdiae",
    url: "https://kdiae.in/",
    name: "KDIAE",
    domain: "kdiae.in",
    description:
      "A full digital ecosystem for a leading educational institution. We built the public website alongside a custom School Management System centralising admissions, fee management, attendance, timetables, and role-based administration in one dashboard.",
    accent: "#06B6D4",
    imageUrl: "https://cdn.autom.uk/cdn-cgi/image/format=webp,quality=80,width=800/kdiae.png",
  },
  {
    slug: "bhoomi-pla-industries",
    url: "https://bhoomiplaindustries.in/",
    name: "Bhoomi PLA Industries",
    domain: "bhoomiplaindustries.in",
    description:
      "A nature-inspired digital showcase for a compostable and biodegradable PLA carry bag manufacturer. We built an immersive product experience highlighting their plant-based bags, sustainability philosophy, and manufacturing credentials with earthy, elegant visuals.",
    accent: "#84CC16",
    imageUrl: "https://cdn.autom.uk/bhoomi-pla-industries.png",
    featured: true,
  },
];

export function getWorkBySlug(slug: string): Work | undefined {
  return works.find((work) => work.slug === slug);
}

/** Homepage highlight order: shown in full on 2xl, with "awakynn" dropped at the lg breakpoint. */
export const featuredWorkSlugs = ["grabfabs", "shurerdhara", "awakynn", "bhoomi-pla-industries"];
