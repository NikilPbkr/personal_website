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
      logoDarkBg: true,
      role: "Data Science Intern",
      company: "GE Aerospace",
      description: "Anomaly Detection for Manufacturing Teams",
      dates: "May 2024 - Aug 2024",
    },
    {
      logo: "/nasa-logo.png",
      logoType: "image" as const,
      role: "Innovation Analyst",
      company: "NASA Glenn Research Center",
      description: "Technical Briefs for R&D Initiatives",
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
    involvements: [
      { org: "Honors Integrated Business and Engineering Program", role: "VP of Operations 24-25" },
      {
        org: "Buckeye Undergraduate Consulting Club",
        role: "Project Lead 3x",
        clients: ["J.P. Morgan Chase", "Versiti", "Cameron Mitchell Restaurants"],
      },
      { org: "Buckeye Private Equity Venture Capital" },
      { org: "Chess Club" },
      { org: "Spikeball Club" },
      { org: "OnRamp Innovation Strategies" },
    ],
  },

  // --- PICKS 2.0 (link cards) ---
  picks2: [
    {
      title: "Spotify",
      subtitle: "My top songs right now",
      link: "/spotify",
    },
  ],

  // --- PROJECTS ---
  projects: [
    {
      name: "SafetySense",
      description: "AI Hazard Classification & Detection",
      fullTitle: "AEP Challenge",
      techStack: "Llama, BERT, Ollama, pandas, NLTK",
      bullets: [
        "Engineered advanced NLP pipelines to analyze 20K safety observation records using embeddings, semantic similarity, and hazard classification, extracting high-value actionable insights for risk management.",
        "Converted model outputs into actionable insights by clustering hazards and prioritizing risks, improving detection of safety issues by 30% and reducing reporting time 25%, strengthening worker safety protocols and project-wide decisions.",
      ],
    },
    {
      name: "PriceMatch",
      description: "Housing Price Forecasting Model",
      fullTitle: "3rd place at Ohio's AI Hackathon",
      techStack: "TensorFlow, Scikit-learn, AWS SageMaker, PyTorch",
      bullets: [
        "Developed and fine-tuned regression and ensemble models incorporating demographic, geographic, and economic features, improving housing price prediction accuracy by 18% and revealing key market patterns.",
        "Built end-to-end model pipelines on cloud infrastructure, performing feature engineering, hyperparameter optimization, and cross-validation, delivering robust forecasts and actionable insights that accelerated data-driven decision-making.",
      ],
    },
    {
      name: "Cyclear",
      description: "Dynamic Rental Bike Pricing Analysis",
      fullTitle: "Best Insights at Ohio's Premier Data Hackathon",
      techStack: "pandas, matplotlib, NumPy, Django",
      bullets: [
        "Developed and deployed algorithmic pricing models for 600K+ cycling trips using temporal-spatial pattern recognition, demand elasticity modeling, and frequency-based feature engineering to optimize revenue and utilization.",
        "Built end-to-end data pipelines with advanced preprocessing including outlier detection (IQR), missing value imputation, and cross-feature interaction analysis, producing adaptive price forecasts and actionable operational insights.",
      ],
    },
  ],

  // --- CONTACT ---
  contact: {
    email: "nikil.prabhakar25@gmail.com",
    linkedin: "https://www.linkedin.com/in/nikil-prabhakar/",
  },

  // --- SPOTIFY PAGE (My top songs right now) ---
  topSongs: [
    { title: "Butterflies", artist: "Brent Faiyaz" },
    { title: "What Did I Miss", artist: "Drake" },
    { title: "Bahamas Promise", artist: "Drake" },
    { title: "Latch", artist: "Disclosure" },
    { title: "Honeymoon Avenue", artist: "Ariana Grande" },
    { title: "Camouflage", artist: "Weston Estate" },
    { title: "Secrets", artist: "The Weeknd" },
    { title: "Where Were You In The Morning", artist: "Shawn Mendes" },
    { title: "Recognize", artist: "PARTYNEXTDOOR" },
    { title: "Emails I Can't Send", artist: "Sabrina Carpenter" },
    { title: "Home", artist: "Eddie Benjamin" },
    { title: "Thinkin Bout You", artist: "Ariana Grande" },
    { title: "One of Wun", artist: "Gunna" },
    { title: "Company", artist: "Justin Bieber" },
    { title: "Slowly", artist: "Weston Estate" },
  ],
};
