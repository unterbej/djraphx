// Weicher Seitenübergang: jede v2-Seite blendet kurz ein (CSS, nur opacity/transform).
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="v2-page">{children}</div>;
}
