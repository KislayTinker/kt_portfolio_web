# Kislay Tinker — Portfolio

Personal portfolio of **Kislay Tinker** — Data Science &amp; Machine Learning Engineer.

**Live site:** https://kislaytinker.github.io/kt_portfolio_web/

## What's here

- **`index.html`** — the portfolio as a single, self-contained file (no build step). This is the page GitHub Pages serves.
- **`portfolio-nextjs/`** — the same site rebuilt as a Next.js 14 + TypeScript + Tailwind CSS project (componentised source). See [`portfolio-nextjs/README.md`](portfolio-nextjs/README.md) to run it locally.

## Highlights

A dark, data-visualisation-forward design featuring a cursor-reactive hero node-network, filterable projects with case-study drawers, hand-built SVG/canvas charts, and an interactive **K-Means clustering** demo implemented from scratch in the browser. Accessible (skip link, focus-trapped modals, `prefers-reduced-motion` support) and responsive.

## Projects

| Project | Focus | Repository |
|---|---|---|
| Text-to-SQL with Clarification Engine | LLM · FastAPI · Streamlit · safe SQL | [text-to-sql-clarification-engine](https://github.com/KislayTinker/text-to-sql-clarification-engine) |
| Customer Personality Segmentation | ML pipeline · FastAPI · Docker | [Customer-Segmentation-Project](https://github.com/KislayTinker/Customer-Segmentation-Project) |
| Hybrid Course Recommendation System | Recommenders · Streamlit | [Courses-Recommendation-System](https://github.com/KislayTinker/Courses-Recommendation-System) |
| College Enquiry Chatbot | Semantic FAQ · Flask · FAISS | [College_Bot](https://github.com/KislayTinker/College_Bot) |
| Stock Price Prediction (LSTM) | Deep learning · TensorFlow/Keras | [Stock-Price-Prediction-](https://github.com/KislayTinker/Stock-Price-Prediction-) |
| Super Store Sales Dashboard | Power BI · DAX | [Super-Store-Sales](https://github.com/KislayTinker/Super-Store-Sales) |
| In-Memory Search Engine | Java · inverted index | [In-Memory-Search-Engine](https://github.com/KislayTinker/In-Memory-Search-Engine) |
| Multimodal Fake-News Detection | PyTorch · BERT + ViT | _in development_ |

## Run locally

The single-file version needs no tooling — open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

The Next.js version (Node 18.17+):

```bash
cd portfolio-nextjs
npm install
npm run dev                    # http://localhost:3000
```
