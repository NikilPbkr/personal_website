// ========================================
// EDIT THIS FILE TO CUSTOMIZE YOUR PORTFOLIO
// ========================================

export const siteData = {
  // --- HERO SECTION ---
  name: "Nikil Prabhakar",
  tagline: "Data Engineer. Interested in anything data and product.",
  profileImage: "/headshot.jpg",

  // --- ABOUT SECTION ---
  about:
    "Hi, I'm Nikil! I'm a junior studying computer science and business at The Ohio State University focused on building robust, scalable systems and infrastructure. I like working on challenging projects that combine technical depth with real-world impact. Outside of CS, I teach Chess, play D1 Spikeball, and love my spotify mixes.",

  // --- PICKS (fun interests/favorites) ---
  picks: {
    title: "My Picks",
    row1: ["Python", "New England Patriots", "MySQL", "PyTorch", "Brent Faiyaz", "FASTAPI"],
    row2: ["FinTech", "Spark", "FIFA", "React", "Shawn Mendes"],
  },

  // --- EXPERIENCE ---
  experience: [
    {
      logo: "/visa-logo.png",
      logoType: "image" as const,
      role: "Data Engineer Intern",
      company: "Visa",
      description: "Data Pipeline ETL + Financial MCP poc",
      dates: "May 2025 - Aug 2025",
    },
    {
      logo: "/ge-aerospace-logo.png",
      logoType: "image" as const,
      role: "Data Science Intern",
      company: "GE Aerospace",
      description: "Delivered Anomaly Detection for Manufacturing Teams",
      dates: "May 2024 - Aug 2024",
    },
    {
      logo: "/nasa-logo.png",
      logoType: "image" as const,
      role: "Innovation Analyst",
      company: "NASA Glenn Research Center",
      description: "Produced Technical Briefs for R&D Initiatives",
      dates: "January 2024 - May 2024",
    },
  ],

  // --- EDUCATION ---
  education: {
    logo: "/osu-logo.png",
    logoType: "image" as const,
    school: "The Ohio State University",
    dates: "Aug 2023 — May 2027",
    degree: "B.S. Computer Science, Minor in Business",
    classes: [
      ["Machine Learning and Statistical Pattern Recognition", "Competitive Analysis Seminar"],
      ["Data Management in Cloud", "Social Ethical Issues in CS"],
      ["Principles of Programming Languages", "Computer Networking"],
    ],
  },

  // --- PICKS 2.0 (link cards) ---
  picks2: [
    {
      title: "Spotify",
      subtitle: "My recent listening history",
      link: "/spotify",
    },
  ],

  // --- PROJECTS ---
  projects: [
    {
      name: "SafetySense",
      description: "AI Hazard Classification & Detection",
    },
    {
      name: "PriceMatch",
      description: "Housing Price Forecasting Model",
    },
    {
      name: "Cyclear",
      description: "Dynamic Rental Bike Pricing Analysis",
    },
  ],

  // --- CONTACT ---
  contact: {
    email: "nikil.prabhakar25@gmail.com",
    linkedin: "https://www.linkedin.com/in/nikil-prabhakar/",
  },

  // --- SPOTIFY PAGE (sample data) ---
  spotifyTracks: [
    { title: "Blinding Lights", artist: "The Weeknd", time: "12m ago" },
    { title: "Levitating", artist: "Dua Lipa", time: "17m ago" },
    { title: "Stay", artist: "The Kid LAROI, Justin Bieber", time: "25m ago" },
    { title: "Peaches", artist: "Justin Bieber", time: "29m ago" },
    { title: "Good Days", artist: "SZA", time: "34m ago" },
    { title: "Montero", artist: "Lil Nas X", time: "38m ago" },
    { title: "Kiss Me More", artist: "Doja Cat, SZA", time: "45m ago" },
    { title: "Save Your Tears", artist: "The Weeknd", time: "50m ago" },
  ],
};
