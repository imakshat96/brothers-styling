import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Scissors } from "lucide-react";

type Spark = { id: number; x: number; y: number };

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [cutting, setCutting] = useState(false);
  const [sparks, setSparks] = useState<Spark[]>([]);
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
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest("a, button, [role=button], input, textarea, select, label"));
    };
    const down = (e: MouseEvent) => {
      const baseScale = hover ? 1.25 : 1;
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
  }, [enabled, x, y, hover]);

  if (!enabled) return null;

  const baseRotate = hover ? -15 : -45;
  const baseScale = hover ? 1.25 : 1;
  const scissorAnimate = cutting
    ? {
        rotate: [baseRotate, baseRotate + 40, baseRotate],
        scale: [baseScale, 0.7, baseScale],
      }
    : {
        rotate: baseRotate,
        scale: baseScale,
      };
  const scissorTransition = cutting
    ? { duration: 0.28, ease: "easeOut" as const }
    : { type: "spring" as const, damping: 18, stiffness: 220 };

  return (
    <>
      <motion.div
        style={{ translateX: sx, translateY: sy }}
        className="pointer-events-none fixed left-0 top-0 z-[100]"
      >
        <motion.div
          animate={scissorAnimate}
          transition={scissorTransition}
          initial={{ rotate: -45, scale: 1 }}
          className="-translate-x-1/2 -translate-y-1/2"
          style={{ filter: "drop-shadow(0 0 8px rgba(200,169,81,0.7))" }}
        >
          <Scissors size={22} strokeWidth={1.75} color="#c8a951" />
        </motion.div>
      </motion.div>
      {sparks.map((s) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 1, scale: 0.4 }}
          animate={{ opacity: 0, scale: 1.8 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="pointer-events-none fixed z-[99] rounded-full"
          style={{
            left: s.x - 8,
            top: s.y - 8,
            width: 16,
            height: 16,
            border: "1.5px solid #c8a951",
            boxShadow: "0 0 10px rgba(200,169,81,0.6)",
          }}
        />
      ))}
    </>
  );
}
