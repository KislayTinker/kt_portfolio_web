"use client";

import { useEffect, useRef } from "react";

type Tok = [string, string];

/** The honest, metric-free snippet — represents the real customer-segmentation project. */
const LINES: Tok[][] = [
  [["c", "# customer segmentation — a quick pass"]],
  [["k", "import"], ["", "  pandas "], ["k", "as"], ["", "  pd"]],
  [["k", "from"], ["", "  sklearn.cluster "], ["k", "import"], ["", "  "], ["f", "KMeans"]],
  [["", ""]],
  [["", "df = "], ["", "pd."], ["f", "read_csv"], ["", "("], ["s", '"customers.csv"'], ["", ")"]],
  [["", "X  = "], ["f", "scale"], ["", "(df[features])"]],
  [["", ""]],
  [
    ["", "km = "],
    ["f", "KMeans"],
    ["", "(n_clusters="],
    ["n", "3"],
    ["", ")."],
    ["f", "fit"],
    ["", "(X)"],
  ],
  [
    ["", "df["],
    ["s", '"segment"'],
    ["", "] = km.labels_   "],
    ["c", "# → ready for the classifier"],
  ],
];

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Self-typing "segmentation.ipynb" card. Renders full text immediately under reduced motion. */
export default function NotebookCard() {
  const codeRef = useRef<HTMLPreElement | null>(null);

  useEffect(() => {
    const host = codeRef.current;
    if (!host) return;

    const chars: Tok[] = [];
    for (let i = 0; i < LINES.length; i++) {
      const line = LINES[i];
      for (let j = 0; j < line.length; j++) {
        const [cls, txt] = line[j];
        for (let k = 0; k < txt.length; k++) chars.push([cls, txt.charAt(k)]);
      }
      if (i < LINES.length - 1) chars.push(["", "\n"]);
    }
    const total = chars.length;

    const render = (count: number) => {
      let html = "";
      let curCls: string | null = null;
      let buf = "";
      const flush = () => {
        if (buf) {
          html += curCls ? `<span class="${curCls}">${esc(buf)}</span>` : esc(buf);
          buf = "";
        }
      };
      for (let i = 0; i < count; i++) {
        const c = chars[i];
        if (c[0] !== curCls) {
          flush();
          curCls = c[0];
        }
        buf += c[1];
      }
      flush();
      html += '<span class="nb__caret"></span>';
      host.innerHTML = html;
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      render(total);
      return;
    }

    let n = 0;
    let timer: number | undefined;
    const tick = () => {
      n++;
      render(n);
      if (n >= total) {
        timer = window.setTimeout(() => {
          n = 0;
          render(0);
          timer = window.setTimeout(tick, 460);
        }, 2600);
        return;
      }
      const justTyped = chars[n - 1] && chars[n - 1][1] === "\n";
      const delay = justTyped ? 90 : 20 + Math.random() * 26;
      timer = window.setTimeout(tick, delay);
    };

    render(0);
    const startT = window.setTimeout(tick, 650);

    return () => {
      window.clearTimeout(startT);
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className="hero__nb reveal" data-d="3" aria-hidden="true">
      <div className="nb">
        <div className="nb__bar">
          <span className="d d1" />
          <span className="d d2" />
          <span className="d d3" />
          <span className="nb__file">segmentation.ipynb</span>
        </div>
        <div className="nb__body">
          <pre id="nb-code" className="nb__code" ref={codeRef} />
        </div>
      </div>
    </div>
  );
}
