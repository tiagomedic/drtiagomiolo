export default function HubLayout({ children }: { children: React.ReactNode }) {
  // Auth is handled entirely by middleware.ts — no redirect here to avoid loop
  return <>{children}</>
}
