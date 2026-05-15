import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Spark = { id: number; x: number; y: number };

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [cutting, setCutting] = useState(false);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const hoverRef = useRef(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 22, stiffness: 260, mass: 0.4 });
  const sy = useSpring(y, { damping: 22, stiffness: 260, mass: 0.4 });
  const cutTimeoutRef = useRef<number | null>(null);
  const resetSparkTimeoutRef = useRef<Map<number, number>>(new Map());

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const isHovering = !!t?.closest("a, button, [role=button], input, textarea, select, label");
      hoverRef.current = isHovering;
      setHover(isHovering);
    };

    const down = (e: MouseEvent) => {
      const id = Date.now() + Math.random();
      setSparks((s) => [...s, { id, x: e.clientX, y: e.clientY }]);

      const sparkTimeout = window.setTimeout(() => {
        setSparks((s) => s.filter((sp) => sp.id !== id));
        resetSparkTimeoutRef.current.delete(id);
      }, 400);

      resetSparkTimeoutRef.current.set(id, sparkTimeout);

      if (cutTimeoutRef.current) {
        window.clearTimeout(cutTimeoutRef.current);
      }

      setCutting(false);
      window.requestAnimationFrame(() => {
        setHover(hoverRef.current);
        setCutting(true);
        cutTimeoutRef.current = window.setTimeout(() => {
          setCutting(false);
          cutTimeoutRef.current = null;
        }, 280);
      });
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mousedown", down, true);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down, true);

      if (cutTimeoutRef.current) {
        window.clearTimeout(cutTimeoutRef.current);
      }

      resetSparkTimeoutRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      resetSparkTimeoutRef.current.clear();
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const baseRotate = hover ? -18 : -32;
  const baseScale = hover ? 1.18 : 1;
  const bladeOpen = hover ? 18 : 24;

  const cursorAnimate = cutting
    ? { rotate: baseRotate, scale: [baseScale, baseScale * 0.9, baseScale] }
    : { rotate: baseRotate, scale: baseScale };

  const cursorTransition = cutting
    ? { duration: 0.28, ease: "easeOut" as const }
    : { type: "spring" as const, damping: 18, stiffness: 220 };

  const topBladeAnimate = cutting
    ? { rotate: [-bladeOpen, -3, -bladeOpen] }
    : { rotate: -bladeOpen };

  const bottomBladeAnimate = cutting
    ? { rotate: [bladeOpen, 3, bladeOpen] }
    : { rotate: bladeOpen };

  const bladeTransition = cutting
    ? { duration: 0.22, ease: "easeInOut" as const }
    : { type: "spring" as const, damping: 20, stiffness: 260 };

  return (
    <>
      <motion.div
        style={{ translateX: sx, translateY: sy }}
        className="pointer-events-none fixed left-0 top-0 z-[100] text-primary"
      >
        <motion.div
          animate={cursorAnimate}
          transition={cursorTransition}
          initial={{ rotate: -32, scale: 1 }}
          className="-translate-x-1/2 -translate-y-1/2"
          style={{ filter: "drop-shadow(0 0 10px currentColor)" }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <g transform="translate(12 14)">
              <motion.g animate={topBladeAnimate} transition={bladeTransition}>
                <path d="M0 0H12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M0 0L-3.5 -1.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="-7.8" cy="-3.2" r="4.4" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="-7.8" cy="-3.2" r="1.7" stroke="currentColor" strokeWidth="1.4" />
              </motion.g>

              <motion.g animate={bottomBladeAnimate} transition={bladeTransition}>
                <path d="M0 0H12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M0 0L-3.5 1.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="-7.8" cy="3.2" r="4.4" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="-7.8" cy="3.2" r="1.7" stroke="currentColor" strokeWidth="1.4" />
              </motion.g>

              <circle cx="0" cy="0" r="1.75" fill="currentColor" />
            </g>
          </svg>
        </motion.div>
      </motion.div>

      {sparks.map((s) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 1, scale: 0.4 }}
          animate={{ opacity: 0, scale: 1.8 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="pointer-events-none fixed z-[99] rounded-full border border-current text-primary"
          style={{
            left: s.x - 8,
            top: s.y - 8,
            width: 16,
            height: 16,
            boxShadow: "0 0 10px currentColor",
          }}
        />
      ))}
    </>
  );
}
