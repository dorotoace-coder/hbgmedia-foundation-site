import AdminDataViewer from "@/components/AdminDataViewer";

export default function AdminPage() {
  return (
    <main className="dashboard-main admin-page">
      <header className="dashboard-header">
        <div>
          <div className="eyebrow">HBG Admin</div>
          <h1>Ministry Intake Dashboard</h1>
          <p>
            A read-only access point for trusted HBG workers to view HBG Intake Inbox records with clear intake IDs, without logging into Supabase.
          </p>
        </div>
        <a className="btn btn-primary" href="/media">Media Command Center</a>
      </header>
      <AdminDataViewer />
    </main>
  );
}
