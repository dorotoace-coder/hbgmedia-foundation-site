import DashboardHeader from "@/components/DashboardHeader";
import InternalAccessGate from "@/components/InternalAccessGate";

const days = [
  ["Sunday", "Record and collect"],
  ["Monday", "Transcribe and extract"],
  ["Tuesday", "CLT and quote reel"],
  ["Wednesday", "Teaching clip"],
  ["Thursday", "Sunday invitation"],
  ["Friday", "Schedule and publish"],
  ["Saturday", "Outreach reminder"]
];

export default function CalendarPage() {
  return (
    <InternalAccessGate
      title="Posting Calendar"
      description="Protected weekly rhythm for HBG media workers."
    >
      <DashboardHeader eyebrow="Posting Calendar" title="One Week. One Sermon. Many Lights.">
        This calendar gives the media team a repeatable rhythm before auto-posting is connected.
      </DashboardHeader>
      <section className="week" style={{ padding: 0 }}>
        {days.map(([day, task]) => (
          <div className="day" key={day}>
            <strong>{day}</strong>
            <span>{task}</span>
          </div>
        ))}
      </section>
    </InternalAccessGate>
  );
}
