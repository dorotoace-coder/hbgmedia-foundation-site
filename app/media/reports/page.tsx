import DashboardHeader from "@/components/DashboardHeader";
import InternalAccessGate from "@/components/InternalAccessGate";
import SubmitForm from "@/components/SubmitForm";
import { submitWeeklyReport } from "@/app/actions";

const reports = ["Sunday attendance", "First-timers", "Souls won", "Prayer requests", "Follow-ups completed", "CLT posts", "Sermon clips", "WhatsApp views", "Social engagement", "Worker completion"];

export default function ReportsPage() {
  return (
    <InternalAccessGate
      title="Weekly Reports"
      description="Protected reporting space for media, evangelism, and follow-up metrics."
    >
      <DashboardHeader eyebrow="Weekly Reports" title="What We Track, We Can Steward">
        Growth must not be emotional guesswork. HBG will track what helps shepherd people, strengthen workers, and multiply the message.
      </DashboardHeader>
      <section className="command-panel">
        <h2>Submit Weekly Report</h2>
        <SubmitForm action={submitWeeklyReport} submitLabel="Save Weekly Report">
          <div className="field">
            <label>Week Start</label>
            <input name="week_start" type="date" required />
          </div>
          {reports.slice(0, 7).map((report) => (
            <div className="field" key={report}>
              <label>{report}</label>
              <input name={report.toLowerCase().replaceAll(" ", "_").replaceAll("-", "_")} type="number" min="0" defaultValue="0" />
            </div>
          ))}
          <div className="field span-2">
            <label>Notes</label>
            <textarea name="notes" placeholder="Stories, blockers, testimonies, worker updates..." />
          </div>
        </SubmitForm>
      </section>
    </InternalAccessGate>
  );
}
