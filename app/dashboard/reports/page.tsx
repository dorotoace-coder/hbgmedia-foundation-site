import DashboardHeader from "@/components/DashboardHeader";

const reports = ["Sunday attendance", "First-timers", "Souls won", "Prayer requests", "Follow-ups completed", "CLT posts", "Sermon clips", "WhatsApp views", "Social engagement", "Worker completion"];

export default function ReportsPage() {
  return (
    <>
      <DashboardHeader eyebrow="Weekly Reports" title="What We Track, We Can Steward">
        Growth must not be emotional guesswork. HBG will track what helps shepherd people, strengthen workers, and multiply the message.
      </DashboardHeader>
      <section className="command-panel">
        <h2>Reporting Metrics</h2>
        <div className="checklist">
          {reports.map((report) => (
            <label key={report}>
              <input type="checkbox" />
              <span>{report}</span>
            </label>
          ))}
        </div>
      </section>
    </>
  );
}
