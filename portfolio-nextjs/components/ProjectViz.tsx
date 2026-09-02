import { type ReactElement } from "react";

const B = "#5B8CFF";
const C = "#37D3E0";
const V = "#B18CFF";
const G = "#3FDD98";
const M = "#5D6779";

/** Distinct little diagram per project. Fully deterministic (SSR-safe). */
export default function ProjectViz({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {children(id)}
    </svg>
  );
}

function children(id: string): ReactElement[] {
  switch (id) {
    case "fakenews":
      return [
        <rect key="r1" x="44" y="66" width="120" height="94" rx="9" fill="none" stroke={B} strokeWidth="1.4" opacity="0.8" />,
        <line key="l1" x1="62" y1="92" x2="146" y2="92" stroke={M} strokeWidth="5" strokeLinecap="round" />,
        <line key="l2" x1="62" y1="108" x2="132" y2="108" stroke={M} strokeWidth="5" strokeLinecap="round" opacity="0.7" />,
        <line key="l3" x1="62" y1="124" x2="140" y2="124" stroke={M} strokeWidth="5" strokeLinecap="round" opacity="0.5" />,
        <rect key="r2" x="236" y="66" width="120" height="94" rx="9" fill="rgba(177,140,255,.08)" stroke={V} strokeWidth="1.4" opacity="0.85" />,
        <path key="p1" d="M250 150 L280 116 L300 138 L318 118 L342 150 Z" fill="rgba(177,140,255,.35)" />,
        <circle key="c1" cx="330" cy="90" r="8" fill={V} />,
        <path key="p2" d="M164 113 H236" stroke={C} strokeWidth="1.4" strokeDasharray="4 5" />,
        <circle key="c2" cx="200" cy="113" r="15" fill="#0E141D" stroke={C} strokeWidth="1.6" />,
        <path key="p3" d="M195 108l10 10M205 108l-10 10" stroke={C} strokeWidth="1.8" strokeLinecap="round" />,
      ];
    case "recommender": {
      const lx = 90;
      const rx = 310;
      const ys = [70, 112, 154];
      const out: ReactElement[] = [];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          out.push(
            <line
              key={`ln-${i}-${j}`}
              x1={lx}
              y1={ys[i]}
              x2={rx}
              y2={ys[j]}
              stroke={B}
              strokeWidth="1"
              opacity={0.12 + ((i + j) % 2) * 0.18}
            />
          );
        }
      }
      for (let i = 0; i < 3; i++) {
        out.push(
          <circle key={`lc-${i}`} cx={lx} cy={ys[i]} r="9" fill="#0E141D" stroke={C} strokeWidth="1.6" />,
          <circle key={`rc-${i}`} cx={rx} cy={ys[i]} r="9" fill="#0E141D" stroke={V} strokeWidth="1.6" />
        );
      }
      out.push(
        <circle key="halo" cx={rx} cy="112" r="13" fill="none" stroke={V} strokeWidth="1.6" opacity="0.7" />
      );
      return out;
    }
    case "stock": {
      const xs = [40, 80, 120, 160, 200, 240, 280, 320, 360];
      const yy = [170, 150, 158, 120, 132, 92, 104, 64, 78];
      const line = xs.map((x, i) => `${x},${yy[i]}`).join(" ");
      const out: ReactElement[] = [
        <polyline key="pl" points={line} fill="none" stroke={G} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />,
        <polygon key="pg" points={`${line} 360,200 40,200`} fill="rgba(63,221,152,.10)" />,
      ];
      xs.forEach((x, i) => out.push(<circle key={`d-${i}`} cx={x} cy={yy[i]} r="2.6" fill={G} />));
      return out;
    }
    case "assistant":
      return [
        <rect key="a1" x="46" y="70" width="150" height="40" rx="12" fill="rgba(91,140,255,.12)" stroke={B} strokeWidth="1.2" />,
        <line key="a2" x1="66" y1="90" x2="176" y2="90" stroke={B} strokeWidth="4" strokeLinecap="round" opacity="0.6" />,
        <rect key="a3" x="204" y="126" width="150" height="40" rx="12" fill="rgba(177,140,255,.12)" stroke={V} strokeWidth="1.2" />,
        <line key="a4" x1="224" y1="146" x2="334" y2="146" stroke={V} strokeWidth="4" strokeLinecap="round" opacity="0.6" />,
        <circle key="a5" cx="352" cy="86" r="4" fill={C} />,
        <circle key="a6" cx="366" cy="86" r="4" fill={C} opacity="0.6" />,
      ];
    case "retail": {
      const bh = [70, 110, 55, 130, 90, 120];
      const bx = 54;
      const out: ReactElement[] = [];
      bh.forEach((h, b) => {
        out.push(
          <rect
            key={`bar-${b}`}
            x={bx + b * 54}
            y={185 - h}
            width="34"
            height={h}
            rx="4"
            fill={b % 2 ? C : B}
            opacity={0.55 + 0.06 * b}
          />
        );
      });
      out.push(<line key="axis" x1="40" y1="185" x2="372" y2="185" stroke={M} strokeWidth="1.2" opacity="0.5" />);
      return out;
    }
    case "search": {
      const out: ReactElement[] = [];
      for (let r = 0; r < 4; r++) {
        out.push(
          <rect
            key={`row-${r}`}
            x="52"
            y={64 + r * 32}
            width="200"
            height="16"
            rx="4"
            fill="#131A25"
            stroke={r === 1 ? C : M}
            strokeWidth="1.2"
            opacity={r === 1 ? 1 : 0.5}
          />
        );
      }
      out.push(
        <circle key="lens" cx="300" cy="104" r="26" fill="none" stroke={B} strokeWidth="2.4" />,
        <line key="handle" x1="320" y1="124" x2="342" y2="146" stroke={B} strokeWidth="3" strokeLinecap="round" />,
        <circle key="fill" cx="300" cy="104" r="12" fill="rgba(91,140,255,.16)" />
      );
      return out;
    }
    case "segmentation": {
      const clusters: [number, number, string][] = [
        [110, 90, B],
        [280, 80, V],
        [200, 160, C],
      ];
      const out: ReactElement[] = [];
      clusters.forEach(([cx, cy, col], c) => {
        for (let p = 0; p < 9; p++) {
          const ang = (p / 9) * 6.28;
          const rad = 14 + (p % 3) * 11;
          out.push(
            <circle
              key={`s-${c}-${p}`}
              cx={cx + Math.cos(ang + c) * rad}
              cy={cy + Math.sin(ang + c) * rad}
              r="3.4"
              fill={col}
              opacity="0.85"
            />
          );
        }
        out.push(
          <circle key={`center-${c}`} cx={cx} cy={cy} r="4.6" fill="none" stroke={col} strokeWidth="1.6" />
        );
      });
      return out;
    }
    default:
      return [<circle key="d" cx="200" cy="112" r="60" fill="none" stroke={B} strokeWidth="1.4" />];
  }
}
