import AdminDataViewer from "@/components/AdminDataViewer";

export default function AdminPage() {
  return (
    <main className="dashboard-main admin-page">
      <header className="dashboard-header">
        <div>
          <div className="eyebrow">HBG Admin</div>
          <h1>Ministry Intake Dashboard</h1>
          <p>
            A read-only access point for trusted HBG workers to view prayer requests, first-timers, sermons, CLT drafts, media tasks, and weekly reports without logging into Supabase.
          </p>
        </div>
        <a className="btn btn-primary" href="/media">Media Command Center</a>
      </header>
      <AdminDataViewer />
    </main>
  );
}
