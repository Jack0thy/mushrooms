/** Inline SVG motifs: mycelium, spore, lab, local pickup */

export function MyceliumLines({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M0 20 Q30 5 60 20 T120 20"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeOpacity="0.4"
        fill="none"
      />
      <path
        d="M0 25 Q25 15 50 25 T100 25"
        stroke="currentColor"
        strokeWidth="0.4"
        strokeOpacity="0.3"
        fill="none"
      />
      <path
        d="M10 35 Q40 20 70 35"
        stroke="currentColor"
        strokeWidth="0.4"
        strokeOpacity="0.25"
        fill="none"
      />
    </svg>
  );
}

export function SporeCircles({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" fill="none" />
      <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.4" fill="none" />
      <circle cx="24" cy="24" r="6" fill="currentColor" fillOpacity="0.3" />
    </svg>
  );
}

export function LabIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3v6h2M21 9h-2v6h2M7 19h10V5H7z" />
      <path d="M12 9v6M9 12h6" opacity="0.7" />
    </svg>
  );
}

export function LocalPickupIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
