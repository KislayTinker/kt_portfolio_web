/* =========================================================================
   Kislay Tinker — Portfolio content
   Single source of truth for the site. Mirrors the tested static build.

   HONESTY CONTRACT (do not break):
   - No invented performance metrics, employment, certifications or awards.
   - Every `repo` points at the project's real GitHub repository. The only
     exception is `fakenews`, which is still in development and has no public
     repo yet, so it links to the profile.
   - Case-study "evaluation"/"result" describe real methodology & capability
     drawn from each project's code/README, not fabricated numbers.
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
   CONFIG — GitHub is real. LinkedIn + email are placeholders until set.
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
    id: "text-to-sql",
    name: "Text-to-SQL with Clarification Engine",
    cat: "AI",
    tag: "Plain-English questions → safe SQL",
    desc: "Answers plain-English questions about a database — but first asks a focused follow-up when the question is ambiguous, then generates safe, read-only SQL.",
    tech: ["Python", "FastAPI", "Streamlit", "LLMs (Groq)", "SQLAlchemy", "SQLite", "pytest"],
    result:
      "An LLM pipeline that clarifies intent, generates validated SELECT-only SQL, self-heals on error, and returns a result table plus a plain-English summary.",
    repo: "https://github.com/KislayTinker/text-to-sql-clarification-engine",
    demo: null,
    study: {
      problem:
        "A naive text-to-SQL prompt guesses when a question is vague — 'show me the top customers' (top by what?) — and can emit unsafe or destructive SQL. Both failure modes erode trust.",
      data:
        "A relational SQLite e-commerce database; the schema (tables, columns, types, primary and foreign keys) is reflected live from the database rather than hard-coded.",
      approach:
        "Route every question through an ambiguity check first. Clear questions go straight to generation; ambiguous ones open a short, targeted clarifying dialogue whose answers enrich the prompt.",
      modeling:
        "An LLM (via the Groq API) classifies ambiguity and generates SQL grounded in the reflected schema and constrained to the SQLite dialect. A multi-turn clarification session assembles the enriched query before generation.",
      evaluation:
        "Defense-in-depth safety: generated SQL must be a single read-only SELECT, pass a mutating/DDL keyword blocklist, and parse cleanly — re-validated after any correction so a fix can't bypass the gate. Unit and end-to-end tests run in CI on every push.",
      result:
        "A question travels from natural language to a validated query, a result table and a one- or two-sentence summary — with a self-healing retry if execution fails.",
    },
  },
  {
    id: "segmentation",
    name: "Customer Personality Segmentation",
    cat: "Machine Learning",
    tag: "Cluster customers, then predict the segment",
    desc: "Groups customers by personality and purchasing behaviour, then predicts which segment a new customer belongs to — served through a web app.",
    tech: ["Python", "scikit-learn", "XGBoost", "FastAPI", "Docker", "MongoDB"],
    result:
      "A config-driven pipeline that clusters customers and trains a classifier to assign new customers to a segment, exposed via a FastAPI service and containerised with Docker.",
    repo: "https://github.com/KislayTinker/Customer-Segmentation-Project",
    demo: null,
    study: {
      problem:
        "Treating every customer the same wastes spend. The useful structure — natural personality and behaviour groups — is hidden in the data, and it needs to be predictable for a brand-new customer, not just the historical ones.",
      data:
        "A marketing-campaign dataset of customer attributes: demographics (birth year, education, marital status, income, household), recency, and spend across product categories (wines, fruit, meat, fish, sweets, gold) and purchase channels.",
      approach:
        "A two-stage design: cluster the existing customers to discover segments, then learn to predict a customer's segment from their attributes so the assignment generalises to new people.",
      modeling:
        "Dimensionality reduction (PCA) feeding clustering, then a supervised classifier — model choice and hyperparameters are driven by a config file with cross-validated grid search, so experiments stay reproducible.",
      evaluation:
        "Model selection via cross-validated grid search; the pipeline is split into distinct training and prediction stages, with schema validation applied to incoming data.",
      result:
        "A reproducible, config-driven segmentation pipeline served behind a FastAPI endpoint and packaged with Docker, so a new customer's segment can be predicted on demand.",
    },
  },
  {
    id: "recommender",
    name: "Hybrid Course Recommendation System",
    cat: "Machine Learning",
    tag: "Collaborative + content, with cold-start handling",
    desc: "Recommends courses by blending what similar learners chose with how similar courses are in content — and still works for brand-new users.",
    tech: ["Python", "scikit-learn", "Pandas", "Streamlit", "NumPy"],
    result:
      "A hybrid recommender with an interactive Streamlit app, evaluated with Precision@K and designed to handle cold-start users.",
    repo: "https://github.com/KislayTinker/Courses-Recommendation-System",
    demo: null,
    study: {
      problem:
        "Learners face choice overload. Pure collaborative filtering stumbles on brand-new items and users (cold start); pure content-based filtering traps people in a narrow band of similar courses.",
      data:
        "A course catalogue (title, category, difficulty, tags) together with user profiles and user–course ratings.",
      approach:
        "Combine two complementary views of similarity — behavioural and content-based — into one ranking, with an explicit path for users who have no history yet.",
      modeling:
        "Content-based filtering with TF-IDF over course category, difficulty and tags plus cosine similarity, blended with user-based collaborative filtering over a user–item matrix.",
      evaluation:
        "Precision@K on held-out interactions, checking whether the hybrid surfaces relevant, diverse courses more reliably than either method alone.",
      result:
        "An interactive Streamlit recommender that mitigates cold-start with content signals while keeping recommendations personal.",
    },
  },
  {
    id: "assistant",
    name: "College Enquiry Chatbot",
    cat: "AI",
    tag: "Semantic FAQ, multilingual, with memory",
    desc: "Answers college admissions, fees, courses and campus questions in natural language — matching meaning rather than keywords, in the user's own language.",
    tech: ["Python", "Flask", "Sentence Transformers", "FAISS", "scikit-learn"],
    result:
      "A semantic FAQ assistant with multilingual support, short-term conversation context, and both a web UI and a Telegram interface.",
    repo: "https://github.com/KislayTinker/College_Bot",
    demo: null,
    study: {
      problem:
        "Prospective students ask the same institutional questions in endless phrasings and different languages. Exact-keyword FAQ lookup misses paraphrases and follow-ups that depend on the previous turn.",
      data:
        "A curated FAQ dataset of college questions and answers tagged by topic — admissions, courses, fees, exams, placements and campus information.",
      approach:
        "Match on meaning, not words: embed every FAQ question once, embed the incoming query, and retrieve the closest answer — carrying a little conversation context so short follow-ups resolve correctly.",
      modeling:
        "Sentence-Transformer embeddings (all-MiniLM-L6-v2) with cosine similarity for semantic retrieval, FAISS for vector search, automatic translation so users can ask in their own language, and a context service that reuses the last topic for short queries.",
      evaluation:
        "Retrieval quality judged by whether the top match answers the intent across paraphrases and languages; conversations are logged for review.",
      result:
        "A Flask service exposing both a web chat UI and a Telegram bot, answering campus questions semantically and multilingually.",
    },
  },
  {
    id: "stock",
    name: "Stock Price Prediction (LSTM)",
    cat: "Machine Learning",
    tag: "Deep learning for time-series forecasting",
    desc: "Forecasts short-term stock price movement from historical market data using an LSTM neural network.",
    tech: ["Python", "TensorFlow", "Keras", "scikit-learn", "Pandas", "NumPy", "Matplotlib"],
    result:
      "An end-to-end LSTM pipeline from raw OHLCV prices to a trained forecaster and an actual-vs-predicted visualisation.",
    repo: "https://github.com/KislayTinker/Stock-Price-Prediction-",
    demo: null,
    study: {
      problem:
        "Stock prices are noisy, sequential and non-stationary. Models that ignore order — or that leak future information into training — produce misleadingly optimistic results.",
      data:
        "Historical market data with Open, High, Low, Close and Volume; the Close price is the forecasting target.",
      approach:
        "Treat forecasting as sequence learning: scale the series, build look-back windows, and split chronologically so the model is always tested on genuinely unseen future data.",
      modeling:
        "An LSTM recurrent neural network (TensorFlow / Keras) trained on MinMax-scaled look-back sequences generated from the historical prices.",
      evaluation:
        "A strict chronological train–test split (no shuffling, no leakage), with performance judged on held-out future prices and an actual-vs-predicted plot.",
      result:
        "A working deep-learning forecaster that captures short-term trend — framed as an educational study of LSTM time-series modelling, not trading advice.",
    },
  },
  {
    id: "retail",
    name: "Super Store Sales Dashboard",
    cat: "Data Analytics",
    tag: "Interactive Power BI sales & profit dashboard",
    desc: "Turns raw retail transactions into an interactive, multi-page Power BI dashboard covering sales, profit, geography and a short-term forecast.",
    tech: ["Power BI", "DAX", "Data Modeling", "Dashboards"],
    result:
      "A multi-page report with KPI cards, category and segment breakdowns, a state-level map, monthly trends and a 15-day sales forecast.",
    repo: "https://github.com/KislayTinker/Super-Store-Sales",
    demo: null,
    study: {
      problem:
        "Raw transaction rows don't tell a store where money is actually made or lost. Decision-makers need sales and profit sliced by product, place and time — at a glance and interactively.",
      data:
        "A Super Store sales dataset: orders with sales, profit, quantity and delivery time across category, sub-category, segment, ship mode, payment mode, region, state and order date.",
      approach:
        "Model the dataset for BI, define the key measures, and lay out linked visuals so a single dashboard answers 'what, where and when' with cross-filtering.",
      modeling:
        "A Power BI report with KPI cards (sales, orders, profit, average ship days), clustered-bar breakdowns by category / sub-category / ship mode / state, monthly sales and profit area charts, donut splits by segment / payment mode / region, a geographic sales-and-profit map, and a region slicer.",
      evaluation:
        "A dedicated forecast page uses Power BI's built-in time-series forecasting to project sales 15 days ahead over the order-date timeline.",
      result:
        "An interactive, multi-page dashboard that makes sales and profit legible by product, geography and time — including a short-term sales forecast.",
    },
  },
  {
    id: "search",
    name: "In-Memory Search Engine",
    cat: "Software",
    tag: "Inverted index & ranked retrieval in pure Java",
    desc: "Indexes a document collection in memory and returns the most relevant documents for a keyword query, ranked by term frequency.",
    tech: ["Java", "Inverted Index", "OOP", "Data Structures"],
    result:
      "A from-scratch retrieval engine — tokenisation, stop-word removal, an inverted index and Top-K ranked results — in pure core Java.",
    repo: "https://github.com/KislayTinker/In-Memory-Search-Engine",
    demo: null,
    study: {
      problem:
        "Scanning every document for every query doesn't scale. Fast keyword retrieval needs the right data structure, not brute force — and building it by hand is the way to understand how search really works.",
      data: "An in-memory collection of text documents supplied to the engine at runtime.",
      approach:
        "Pre-process text into clean tokens, then invert the relationship: instead of mapping documents to words, map each word to the documents (and frequencies) where it appears.",
      modeling:
        "Pure core Java (HashMap / ArrayList / Set) implementing tokenisation with stop-word removal, an inverted index (word → {document → frequency}) and document-level term-frequency counts — organised with clean OOP across Tokenizer, InvertedIndex and search classes.",
      evaluation:
        "Keyword queries return the Top-K documents ranked by term frequency; correctness checked against known document and keyword sets.",
      result:
        "A self-contained, dependency-free search engine that demonstrates inverted-index retrieval and ranking from first principles.",
    },
  },
  {
    id: "fakenews",
    name: "Multimodal Fake-News Detection",
    cat: "AI",
    tag: "Text + image misinformation detection (in progress)",
    desc: "Detects misleading news by reading the words and the picture together, flagging when the two disagree.",
    tech: ["Python", "PyTorch", "Transformers", "BERT", "ViT"],
    result: "In development — an end-to-end pipeline scoring cross-modal inconsistency between a story's text and its image.",
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
];

export const SKILLS: SkillCategory[] = [
  { name: "Programming", icon: "code", items: ["Python", "Java", "SQL", "C++"] },
  { name: "Data Science", icon: "chart", items: ["Pandas", "NumPy", "Matplotlib", "TF-IDF"] },
  {
    name: "Machine Learning",
    icon: "cpu",
    items: ["scikit-learn", "XGBoost", "Clustering", "Classification", "Recommenders", "LSTM"],
  },
  {
    name: "AI / NLP",
    icon: "spark",
    items: ["Transformers", "BERT", "ViT", "PyTorch", "Sentence Transformers", "LLMs (Groq)", "FAISS"],
  },
  { name: "Data & BI", icon: "grid", items: ["Power BI", "DAX", "Data Modeling", "Dashboards"] },
  {
    name: "Engineering & Tools",
    icon: "tool",
    items: ["FastAPI", "Streamlit", "Flask", "Docker", "Git", "GitHub Actions", "pytest"],
  },
];

/** which projects use a given skill token (for hover cross-highlight) */
export const SKILL_TO_PROJ: Record<string, string[]> = {
  Python: ["text-to-sql", "segmentation", "recommender", "assistant", "stock", "fakenews"],
  Java: ["search"],
  SQL: ["text-to-sql"],
  "C++": [],
  Pandas: ["recommender", "segmentation", "stock", "assistant", "text-to-sql"],
  NumPy: ["recommender", "stock", "segmentation"],
  Matplotlib: ["stock"],
  "TF-IDF": ["recommender"],
  "scikit-learn": ["recommender", "segmentation", "stock", "assistant"],
  XGBoost: ["segmentation"],
  Clustering: ["segmentation"],
  Classification: ["segmentation", "fakenews"],
  Recommenders: ["recommender"],
  LSTM: ["stock"],
  Transformers: ["fakenews"],
  BERT: ["fakenews"],
  ViT: ["fakenews"],
  PyTorch: ["fakenews"],
  "Sentence Transformers": ["assistant"],
  "LLMs (Groq)": ["text-to-sql"],
  FAISS: ["assistant"],
  "Power BI": ["retail"],
  DAX: ["retail"],
  "Data Modeling": ["retail"],
  Dashboards: ["retail"],
  FastAPI: ["text-to-sql", "segmentation"],
  Streamlit: ["text-to-sql", "recommender"],
  Flask: ["assistant"],
  Docker: ["segmentation"],
  Git: [],
  "GitHub Actions": ["text-to-sql", "segmentation"],
  pytest: ["text-to-sql"],
};

export const RADAR: RadarPoint[] = [
  { k: "Programming", v: 0.8 },
  { k: "Data Science", v: 0.85 },
  { k: "Machine Learning", v: 0.8 },
  { k: "AI / NLP", v: 0.75 },
  { k: "Data & BI", v: 0.65 },
  { k: "Engineering", v: 0.7 },
];

/** repo card order on the GitHub section — real repos only (fakenews has none yet) */
export const REPO_ORDER = [
  "text-to-sql",
  "recommender",
  "segmentation",
  "stock",
  "assistant",
  "retail",
  "search",
];

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
