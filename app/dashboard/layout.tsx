const links = [
  ["/dashboard", "Overview"],
  ["/dashboard/sermons", "Sermons"],
  ["/dashboard/clt", "CLT Builder"],
  ["/dashboard/video-studio", "Video Studio"],
  ["/dashboard/calendar", "Posting Calendar"],
  ["/dashboard/training", "Training Academy"],
  ["/dashboard/reports", "Reports"],
  ["/admin", "Admin Intake"],
  ["/", "Public Site"]
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <a className="dashboard-logo" href="/dashboard">
          <img src="/assets/hbg-logo-reconstructed.svg" alt="HBG logo" />
          <span>HBG Media Command Center</span>
        </a>
        <nav className="dashboard-nav" aria-label="Dashboard navigation">
          {links.map(([href, label]) => (
            <a href={href} key={href}>{label}</a>
          ))}
        </nav>
      </aside>
      <main className="dashboard-main">{children}</main>
    </div>
  );
}
