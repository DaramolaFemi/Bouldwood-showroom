import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

export default function LottieFetched({
  url,
  loop = true,
  style,
}: {
  url: string;
  loop?: boolean;
  style?: React.CSSProperties;
}) {
  const [data, setData] = useState<any>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch");
        return r.json();
      })
      .then((json) => {
        if (mounted) setData(json);
      })
      .catch(() => {
        if (mounted) setErr(true);
      });
    return () => {
      mounted = false;
    };
  }, [url]);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (err)
    return <div className="text-sm text-muted">Animation unavailable</div>;
  if (!data)
    return <div className="w-full h-40 bg-gray-100 animate-pulse rounded" />;

  if (prefersReduced) {
    // Render a subtle static depiction for reduced-motion users
    return (
      <div className="w-full h-40 rounded bg-gradient-to-br from-amber-50 to-emerald-50 flex items-center justify-center">
        <svg
          width="120"
          height="40"
          viewBox="0 0 120 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <rect width="120" height="40" rx="6" fill="#FFF" opacity="0.6" />
          <path
            d="M8 28C28 8 44 32 64 12C84 -8 100 28 112 20"
            stroke="#0f1724"
            strokeOpacity="0.7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  return <Lottie animationData={data} loop={loop} style={style} />;
}
