import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Observe an element and report when it first enters (or leaves) the viewport.
 * Generic over the element type so the returned ref types cleanly onto any tag.
 */
export function useInView<T extends Element = HTMLDivElement>(
  options: IntersectionObserverInit = { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
  once = true
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.unobserve(entry.target);
        } else if (!once) {
          setInView(false);
        }
      });
    }, options);
    io.observe(node);
    return () => io.disconnect();
    // options is an inline object; intentionally excluded from deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [once]);

  return { ref, inView };
}

/** Track the user's reduced-motion preference reactively. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

/** True only after the component has mounted on the client. */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/** Stable rAF-based tween helper for numeric counters. */
export function useCountUp(target: number, decimals = 0, active = false, durationMs = 1300) {
  const [value, setValue] = useState(0);
  const started = useRef(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;

    if (reduced) {
      setValue(target);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const frame = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(frame);
      else setValue(target);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [active, target, durationMs, reduced]);

  return value.toFixed(decimals);
}

/** Convenience: a callback ref + boolean, for one-shot in-view triggers. */
export function useInViewCallback(threshold = 0.4) {
  const [inView, setInView] = useState(false);
  const seen = useRef(false);
  const ref = useCallback(
    (node: Element | null) => {
      if (!node || seen.current) return;
      if (typeof IntersectionObserver === "undefined") {
        seen.current = true;
        setInView(true);
        return;
      }
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !seen.current) {
              seen.current = true;
              setInView(true);
              io.disconnect();
            }
          });
        },
        { threshold }
      );
      io.observe(node);
    },
    [threshold]
  );
  return { ref, inView };
}
