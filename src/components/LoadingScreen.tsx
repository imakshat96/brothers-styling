import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DISPLAY_MS = 2500;

// ─── Barber pole ──────────────────────────────────────────────────────────────

function BarberPole({ side }: { side: "left" | "right" }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.4 }}
      transition={{ duration: 0.6 }}
      style={{
        position: "fixed",
        [side]: 0,
        top: "30%",
        width: 6,
        height: "40vh",
        overflow: "hidden",
      }}
    >
      <motion.div
        animate={{ y: ["0%", "-50%"] }}
        transition={{ duration: 1.8, ease: "linear", repeat: Infinity }}
        style={{
          width: "100%",
          height: "200%",
          background:
            "repeating-linear-gradient(-45deg,#c8151f 0px,#c8151f 8px,#ffffff 8px,#ffffff 16px,#1a3a8f 16px,#1a3a8f 24px,#ffffff 24px,#ffffff 32px)",
        }}
      />
    </motion.div>
  );
}

// ─── Clipper SVG ──────────────────────────────────────────────────────────────

function ClipperSVG() {
  return (
    <svg
      width="80"
      height="138"
      viewBox="0 0 55 95"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 0 8px rgba(200,169,81,0.5))" }}
    >
      {/* Main body */}
      <rect x="7" y="3" width="41" height="62" rx="9" stroke="#c8a951" strokeWidth="1.5" />

      {/* Power ring — open at the top */}
      <path
        d="M 33.5 18.5 A 7.5 7.5 0 1 1 21.5 18.5"
        stroke="#c8a951"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Power line */}
      <line x1="27.5" y1="13.5" x2="27.5" y2="22" stroke="#c8a951" strokeWidth="1.5" strokeLinecap="round" />

      {/* Grip lines */}
      <line x1="13" y1="43" x2="42" y2="43" stroke="#c8a951" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="13" y1="50" x2="42" y2="50" stroke="#c8a951" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="13" y1="57" x2="42" y2="57" stroke="#c8a951" strokeWidth="1.2" strokeLinecap="round" />

      {/* Blade housing — slightly wider than body */}
      <rect x="3" y="65" width="49" height="15" rx="3" stroke="#c8a951" strokeWidth="1.5" />

      {/* Blade teeth — 5 teeth */}
      <rect x="5"    y="80" width="7.5" height="12" rx="1.5" stroke="#c8a951" strokeWidth="1.2" />
      <rect x="14.5" y="80" width="7.5" height="12" rx="1.5" stroke="#c8a951" strokeWidth="1.2" />
      <rect x="24"   y="80" width="7.5" height="12" rx="1.5" stroke="#c8a951" strokeWidth="1.2" />
      <rect x="33.5" y="80" width="7.5" height="12" rx="1.5" stroke="#c8a951" strokeWidth="1.2" />
      <rect x="43"   y="80" width="5"   height="12" rx="1.5" stroke="#c8a951" strokeWidth="1.2" />
    </svg>
  );
}

// ─── Loading screen ───────────────────────────────────────────────────────────

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const start = Date.now();

    // Percentage counter — 0 → 100 over DISPLAY_MS
    const pctId = setInterval(() => {
      const next = Math.min(100, Math.round(((Date.now() - start) / DISPLAY_MS) * 100));
      setPct(next);
      if (next >= 100) clearInterval(pctId);
    }, 30);

    // Dismiss after minimum display time
    const timerId = setTimeout(() => setVisible(false), DISPLAY_MS);

    return () => {
      clearInterval(pctId);
      clearTimeout(timerId);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "#0a0a0a",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Barber poles — far left / right edges */}
          <BarberPole side="left" />
          <BarberPole side="right" />

          {/* ── Logo ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ textAlign: "center", marginBottom: 40 }}
          >
            <p
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 28,
                letterSpacing: "0.2em",
                color: "#ffffff",
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              THE BROTHER'S
            </p>
            <p
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 28,
                letterSpacing: "0.2em",
                color: "#c8a951",
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              STYLING
            </p>
          </motion.div>

          {/* ── Clipper animation area ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            style={{ position: "relative", width: 260, height: 200 }}
          >
            {/* Ghost percentage — sits behind the clipper */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 80,
                color: "rgba(200,169,81,0.12)",
                letterSpacing: "0.04em",
                pointerEvents: "none",
                zIndex: 0,
                userSelect: "none",
              }}
            >
              {pct}%
            </div>

            {/* Clipper — left ↔ right sweep with fixed -15° tilt */}
            <motion.div
              style={{
                position: "absolute",
                top: 14,
                left: "50%",
                marginLeft: -40,
                zIndex: 2,
                rotate: -15,
              }}
              animate={{ x: [-60, 60] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            >
              <ClipperSVG />
            </motion.div>

            {/* Gold hair line — draws in sync with clipper sweep */}
            <div
              style={{
                position: "absolute",
                bottom: 28,
                left: "50%",
                marginLeft: -100,
                width: 200,
                height: 2,
                backgroundColor: "rgba(200,169,81,0.15)",
                zIndex: 1,
              }}
            >
              <motion.div
                style={{
                  height: "100%",
                  backgroundColor: "#c8a951",
                  transformOrigin: "left center",
                }}
                animate={{ scaleX: [0, 1] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>

          {/* ── Bottom progress bar — fixed at very bottom of viewport ── */}
          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              height: 3,
              backgroundColor: "rgba(200,169,81,0.12)",
            }}
          >
            <motion.div
              style={{
                height: "100%",
                backgroundColor: "#c8a951",
                transformOrigin: "left center",
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: DISPLAY_MS / 1000, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
