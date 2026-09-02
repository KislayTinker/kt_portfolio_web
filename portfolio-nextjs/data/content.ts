/* =========================================================================
   Kislay Tinker — Portfolio content
   Single source of truth for the site. Mirrors the tested static build.

   HONESTY CONTRACT (do not break):
   - No invented performance metrics, employment, certifications or awards.
   - Repo links point to the profile until exact repo URLs are known
     (swap `repo` per project when you have them — avoids 404s).
   - Case-study "evaluation"/"result" describe methodology & capability,
     not fabricated numbers.
   ========================================================================= */

export type Category = "Machine Learning" | "Data Analytics" | "AI" | "Software";

export type IconName =
  | "code"
  | "chart"
  | "cpu"
  | "spark"
  | "grid"
  | "tool";

export interface CaseStudy {
  /** the concrete pain the project addresses */
  problem: string;
  data: string;
  approach: string;
  modeling: string;
  evaluation: string;
  result: string;
}

export interface Project {
  id: string;
  name: string;
  cat: Category;
  tag: string;
  desc: string;
  tech: string[];
  result: string;
  repo: string;
  demo: string | null;
  study?: CaseStudy;
}

export interface SkillCategory {
  name: string;
  icon: IconName;
  items: string[];
}

export interface RadarPoint {
  k: string;
  v: number; // 0..1, self-assessed emphasis (labeled as such in the UI)
}

/* -------------------------------------------------------------------------
   CONFIG — edit these three with real links.
   GitHub is real; LinkedIn + email are placeholders until set.
   ------------------------------------------------------------------------- */
export const SITE = {
  name: "Kislay Tinker",
  role: "Data Science & ML Engineer",
  location: "Jaipur, India",
  github: "https://github.com/KislayTinker",
  githubHandle: "@KislayTinker",
  linkedin: "https://www.linkedin.com/in/your-handle", // TODO: your LinkedIn URL
  email: "your.email@example.com", // TODO: your email
} as const;

export const CAT_COLOR: Record<Category, string> = {
  "Machine Learning": "#5B8CFF",
  "Data Analytics": "#37D3E0",
  AI: "#B18CFF",
  Software: "#3FDD98",
};

export const PROJECTS: Project[] = [
  {
    id: "fakenews",
    name: "Multimodal Fake-News Detection",
    cat: "AI",
    tag: "Text + image misinformation detection",
    desc: "Detects misleading news by reading the words and the picture together, flagging when the two disagree.",
    tech: ["Python", "PyTorch", "Transformers", "BERT", "ViT"],
    result: "In development — an end-to-end pipeline scoring cross-modal inconsistency.",
    repo: SITE.github,
    demo: null,
    study: {
      problem:
        "Misinformation increasingly pairs a genuine-looking image with misleading text (or the reverse). Detectors that read only one modality miss the mismatch entirely.",
      data: "Paired text–image news samples: each item is a written claim plus its associated image.",
      approach: "Encode each modality on its own, then reason about how well the text and the image agree.",
      modeling:
        "A Vision Transformer (ViT) encodes the image and BERT encodes the text; a fusion step compares the two embeddings to model cross-modal inconsistency.",
      evaluation:
        "Framed as binary classification (authentic vs. fake) with a held-out split and standard metrics — accuracy, precision, recall and F1.",
      result:
        "A working multimodal pipeline that flags when a story's words and its imagery contradict each other. Actively in development, so results are not yet finalised.",
    },
  },
  {
    id: "recommender",
    name: "Hybrid Course Recommendation System",
    cat: "Machine Learning",
    tag: "Blends collaborative + content signals",
    desc: "Recommends courses using both what similar learners chose and how similar the courses are in content.",
    tech: ["Python", "Pandas", "NumPy", "scikit-learn"],
    result: "Balances relevance with discovery and softens the cold-start problem.",
    repo: SITE.github,
    demo: null,
    study: {
      problem:
        "Learners face real choice overload. Pure collaborative filtering stumbles on brand-new items (cold start); pure content-based filtering traps people in a narrow band.",
      data: "Course catalogue metadata (content features) together with user–course interaction signals.",
      approach: "Combine two complementary views of similarity — behavioural and content — into one ranking.",
      modeling:
        "Collaborative filtering (user/item similarity) blended with content-based similarity into a single hybrid score.",
      evaluation:
        "Ranking-style checks: does the hybrid surface relevant, diverse courses more reliably than either method on its own?",
      result:
        "A recommender that mitigates cold-start with content signals while keeping recommendations personal and diverse.",
    },
  },
  {
    id: "segmentation",
    name: "Customer Segmentation",
    cat: "Data Analytics",
    tag: "Finding natural groups in customers",
    desc: "Groups customers by behaviour so strategy can be targeted instead of one-size-fits-all.",
    tech: ["Python", "Pandas", "scikit-learn", "Matplotlib", "Seaborn"],
    result: "Distinct, interpretable segments ready to drive targeted action.",
    repo: SITE.github,
    demo: null,
    study: {
      problem:
        "Treating every customer the same wastes effort and spend. The useful structure — the natural groups — is hidden in the data and needs to be surfaced.",
      data: "Customer attributes and behavioural features such as spend, frequency and recency signals.",
      approach: "Let the data reveal its own groups — no predefined labels.",
      modeling:
        "K-Means clustering, with features scaled first and the elbow method / inertia used to choose the number of clusters.",
      evaluation:
        "Judge cluster separation and, more importantly, profile each segment so it means something to the business.",
      result: "A clear set of customer segments that turn a flat customer list into an actionable map.",
    },
  },
  {
    id: "stock",
    name: "Stock Price Prediction",
    cat: "Machine Learning",
    tag: "Forecasting from market history",
    desc: "Learns from historical market data to forecast short-term price movement.",
    tech: ["Python", "Pandas", "NumPy", "scikit-learn", "Matplotlib"],
    result: "A time-series pipeline from raw prices to forecast and visualization.",
    repo: SITE.github,
    demo: null,
  },
  {
    id: "assistant",
    name: "College AI Assistant",
    cat: "AI",
    tag: "Conversational campus Q&A",
    desc: "Answers college and campus questions in natural language, so information isn't scattered.",
    tech: ["Python", "NLP"],
    result: "A conversational front door to institutional information.",
    repo: SITE.github,
    demo: null,
  },
  {
    id: "retail",
    name: "Retail Superstore Analytics",
    cat: "Data Analytics",
    tag: "Sales & profit, made legible",
    desc: "Turns raw retail sales into readable insight — sales, profit and regional trends at a glance.",
    tech: ["Python", "Pandas", "Seaborn", "Power BI"],
    result: "Exploratory analysis and dashboards over the retail superstore dataset.",
    repo: SITE.github,
    demo: null,
  },
  {
    id: "search",
    name: "In-Memory Search Engine",
    cat: "Software",
    tag: "Fast text retrieval in memory",
    desc: "Indexes a document collection in memory to return relevant matches quickly.",
    tech: ["Java", "Data Structures", "Algorithms"],
    result: "An inverted-index retrieval engine with ranked results.",
    repo: SITE.github,
    demo: null,
  },
];

export const SKILLS: SkillCategory[] = [
  { name: "Programming", icon: "code", items: ["Python", "Java", "SQL", "C++"] },
  { name: "Data Science", icon: "chart", items: ["Pandas", "NumPy", "Matplotlib", "Seaborn"] },
  {
    name: "Machine Learning",
    icon: "cpu",
    items: ["scikit-learn", "Regression", "Clustering", "Recommenders", "Model Evaluation"],
  },
  { name: "AI / NLP", icon: "spark", items: ["BERT", "ViT", "Transformers", "PyTorch", "NLP"] },
  { name: "Data & BI", icon: "grid", items: ["Power BI", "DAX", "Excel", "Dashboards"] },
  { name: "Tools", icon: "tool", items: ["Git", "GitHub", "Jupyter", "VS Code", "Google Colab"] },
];

/** which projects use a given skill token (for hover cross-highlight) */
export const SKILL_TO_PROJ: Record<string, string[]> = {
  Python: ["fakenews", "recommender", "segmentation", "stock", "assistant", "retail"],
  Java: ["search"],
  SQL: ["segmentation", "retail"],
  "C++": [],
  Pandas: ["recommender", "segmentation", "stock", "retail"],
  NumPy: ["recommender", "stock"],
  Matplotlib: ["segmentation", "stock"],
  Seaborn: ["segmentation", "retail"],
  "scikit-learn": ["recommender", "segmentation", "stock"],
  Regression: ["stock"],
  Clustering: ["segmentation"],
  Recommenders: ["recommender"],
  "Model Evaluation": ["fakenews", "stock"],
  BERT: ["fakenews"],
  ViT: ["fakenews"],
  Transformers: ["fakenews"],
  PyTorch: ["fakenews"],
  NLP: ["assistant", "fakenews"],
  "Power BI": ["retail"],
  DAX: ["retail"],
  Excel: ["retail"],
  Dashboards: ["retail"],
  "Data Structures": ["search"],
  Algorithms: ["search"],
  Git: [],
  GitHub: [],
  Jupyter: [],
  "VS Code": [],
  "Google Colab": [],
};

export const RADAR: RadarPoint[] = [
  { k: "Programming", v: 0.85 },
  { k: "Data Science", v: 0.9 },
  { k: "Machine Learning", v: 0.82 },
  { k: "AI / NLP", v: 0.7 },
  { k: "SQL / DSA", v: 0.8 },
  { k: "BI & Viz", v: 0.65 },
];

/** repo card order on the GitHub section */
export const REPO_ORDER = ["recommender", "stock", "assistant", "retail", "search", "segmentation"];

export const PROBLEM_TOPICS = [
  "Arrays",
  "Strings",
  "Hashing",
  "Two Pointers",
  "Binary Search",
  "Sorting",
  "Trees",
  "Graphs",
  "Dynamic Programming",
  "Recursion",
  "SQL Queries",
  "Greedy",
];

export function projectById(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}
