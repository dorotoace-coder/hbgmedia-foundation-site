import AdminDataViewer from "@/components/AdminDataViewer";

export default function AdminPage() {
  return (
    <main className="dashboard-main admin-page">
      <header className="dashboard-header">
        <div>
          <div className="eyebrow">HBG Admin</div>
          <h1>Ministry Intake Dashboard</h1>
          <p>
            A trusted access point for HBG workers to view, copy, export, update, archive, and delete HBG Intake Inbox records without opening Supabase.
          </p>
        </div>
        <a className="btn btn-primary" href="/media">Media Command Center</a>
      </header>
      <AdminDataViewer />
    </main>
  );
}
