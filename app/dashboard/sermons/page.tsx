import DashboardHeader from "@/components/DashboardHeader";

export default function SermonsPage() {
  return (
    <>
      <DashboardHeader eyebrow="Sermon Intake" title="Capture the Word Before It Scatters">
        Every sermon should become CLT, reels, prayer points, captions, discussion guides, and weekly follow-up.
      </DashboardHeader>
      <section className="command-panel">
        <h2>New Sermon Record</h2>
        <p>This form is static in Phase 1. In Phase 2 it will save to Supabase and feed the CLT and Remotion builders.</p>
        <div className="form-grid">
          <div className="field">
            <label>Sermon Title</label>
            <input placeholder="The Power of Divine Presence" />
          </div>
          <div className="field">
            <label>Main Scripture</label>
            <input placeholder="Psalm 16:11" />
          </div>
          <div className="field span-2">
            <label>Main Message</label>
            <textarea placeholder="Summarize the burden of the message..." />
          </div>
          <div className="field span-2">
            <label>Key Quotes</label>
            <textarea placeholder="Add 3-7 powerful lines for quote reels and graphics." />
          </div>
        </div>
      </section>
    </>
  );
}
