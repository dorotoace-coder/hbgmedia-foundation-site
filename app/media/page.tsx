import DashboardHeader from "@/components/DashboardHeader";
import InternalAccessGate from "@/components/InternalAccessGate";

const stats = [
  ["This Week", "7 outputs"],
  ["Priority", "Sermon to CLT"],
  ["Workers", "4 core roles"],
  ["Rhythm", "Sun-Sat"],
  ["Storage", "HBG Inbox"],
  ["Media Law", "Record everything"]
];

const tools = [
  ["Sermon Intake", "Capture title, scripture, transcript, quotes, altar call, testimony moments, and next actions."],
  ["CLT Builder", "Turn a sermon or prophetic note into HBG-CLT format with Key Word, reflection, prayer, action point, and quiz."],
  ["Video Studio", "Prepare the data structure for Remotion templates: quote reels, CLT videos, STIR UP prayers, and Sunday invites."],
  ["Posting Calendar", "Plan WhatsApp, Instagram, Facebook, TikTok, YouTube, and service screen outputs across the week."],
  ["Training Academy", "Teach media workers how to record, clip, edit, publish, and report with the Heartbeat Way."],
  ["Reports", "Track attendance, first-timers, souls won, prayer requests, clips posted, engagement, and worker follow-through."]
];

export default function Dashboard() {
  return (
    <InternalAccessGate
      title="HBG Media Command Center"
      description="This is a worker-facing space for sermon intake, CLT production, video planning, training, calendar rhythm, and weekly media reports."
    >
      <DashboardHeader eyebrow="Phase 1" title="Media Command Center">
        A protected workspace for HBG workers to organize sermon intake, CLT production, video planning, weekly reporting, and the media rhythm that keeps the Word moving.
      </DashboardHeader>
      <section className="stat-grid" style={{ padding: 0 }}>
        {stats.map(([label, value]) => (
          <article className="stat-card" key={label}>
            <strong>{label}</strong>
            <span>{value}</span>
          </article>
        ))}
      </section>
      <section className="command-panel">
        <h2>Weekly Command Checklist</h2>
        <p>Use this as the operating rhythm for a small team producing consistent Spirit-conscious content every week.</p>
        <div className="checklist">
          {[
            "Record Sunday sermon, worship, altar call, and testimonies.",
            "Upload raw video/audio into the HBG media archive.",
            "Create sermon intake record with scripture, title, quotes, and call to action.",
            "Generate CLT draft and review it in Pastor Amos’s prophetic-practical tone.",
            "Produce one quote reel, one CLT reel, and one Sunday invitation.",
            "Publish posts and record engagement/reporting data."
          ].map((item) => (
            <label key={item}>
              <input type="checkbox" />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </section>
      <section className="tool-grid" style={{ padding: "18px 0 0" }}>
        {tools.map(([title, body]) => (
          <article className="tool-card" key={title}>
            <h2>{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </section>
    </InternalAccessGate>
  );
}
