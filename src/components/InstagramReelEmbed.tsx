import { useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Renders a real Instagram reel using Instagram's own official embed widget
// (the same script/markup their "Embed" button generates on any public post).
// This is a temporary stand-in for the "Reels & Latest Looks" section, using
// real content pulled live from @thebrothersstyling, until the client picks
// which photos/videos he wants uploaded directly.
// ─────────────────────────────────────────────────────────────────────────────

declare global {
  interface Window {
    instgrm?: {
      Embeds: { process: () => void };
    };
  }
}

let scriptLoadPromise: Promise<void> | null = null;

function loadInstagramEmbedScript(): Promise<void> {
  if (window.instgrm) return Promise.resolve();
  if (scriptLoadPromise) return scriptLoadPromise;
  scriptLoadPromise = new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
  return scriptLoadPromise;
}

interface InstagramReelEmbedProps {
  permalink: string;
}

export function InstagramReelEmbed({ permalink }: InstagramReelEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    loadInstagramEmbedScript().then(() => {
      if (!cancelled) window.instgrm?.Embeds.process();
    });
    return () => {
      cancelled = true;
    };
  }, [permalink]);

  return (
    <div ref={containerRef} className="overflow-hidden rounded-md bg-obsidian-2">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={permalink}
        data-instgrm-version="14"
        style={{ background: "#000", margin: 0, width: "100%", minWidth: "unset" }}
      />
    </div>
  );
}
