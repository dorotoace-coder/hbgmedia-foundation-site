import DashboardHeader from "@/components/DashboardHeader";
import InternalAccessGate from "@/components/InternalAccessGate";
import SermonQuoteStudio from "@/components/SermonQuoteStudio";
import SubmitForm from "@/components/SubmitForm";
import { submitMediaTask } from "@/app/actions";

const templates = ["Sermon Quote Reel", "CLT Devotional Reel", "Sunday Invitation Reel", "STIR UP Prayer Video", "Salvation Challenge Promo", "Doroto Ace Worship Clip"];

export default function VideoStudioPage() {
  return (
    <InternalAccessGate
      title="Remotion Video Studio"
      description="Protected workspace for planning HBG video templates and assigning media tasks."
    >
      <DashboardHeader eyebrow="Remotion Studio" title="Choose a Template, Feed the Data, Send the Light">
        Phase 1 defines the video studio structure. Phase 3 will connect these forms to Remotion preview and export.
      </DashboardHeader>
      <section className="tool-grid" style={{ padding: 0 }}>
        {templates.map((template) => (
          <article className="tool-card" key={template}>
            <h2>{template}</h2>
            <p>Prepared for vertical, square, and landscape exports with HBG branding and approval workflow.</p>
          </article>
        ))}
      </section>
      <section className="command-panel">
        <h2>Build With Data, Not Stress</h2>
        <p>
          Remotion will let HBG update a simple data brief while the template handles brand, animation, layout, and export size. The worker changes the message; the system keeps the look consistent.
        </p>
        <pre className="code">{`{
  "ministry": "Heartbeat of God Ministry",
  "slogan": "A Reason to Live",
  "speaker": "Pastor Amos Unogwu",
  "title": "The Power of Divine Presence",
  "scripture": "Psalm 16:11",
  "keyWord": "Presence",
  "quote": "A man conscious of God’s presence cannot be stranded.",
  "cta": "Join us this Sunday",
  "format": "Vertical Reel",
  "date": "2026-04-28"
}`}</pre>
      </section>
      <SermonQuoteStudio />
      <section className="command-panel">
        <h2>Export MP4 Locally</h2>
        <p>
          Use Queue Render to save the current brief into Supabase, or download the data brief and render the MP4 from the project folder. Cloud export inside the browser will come later; this local render path is the first working export engine.
        </p>
        <pre className="code">{`npm run render:sermon -- examples/sermon-quote-brief.json renders/hbg-sermon-quote-reel.mp4`}</pre>
      </section>
      <section className="command-panel">
        <h2>Create Media Task</h2>
        <p>Assign a video or posting task to the media team. In the next phase, this feeds the approval and publishing queue.</p>
        <SubmitForm action={submitMediaTask} submitLabel="Save Media Task">
          <div className="field">
            <label>Task Title</label>
            <input name="title" placeholder="Create sermon quote reel" required />
          </div>
          <div className="field">
            <label>Content Type</label>
            <select name="content_type" defaultValue="Sermon Clip">
              <option>Sermon Clip</option>
              <option>CLT Video</option>
              <option>Sunday Invite</option>
              <option>STIR UP Prayer</option>
              <option>Salvation Challenge Promo</option>
            </select>
          </div>
          <div className="field">
            <label>Platform</label>
            <select name="platform" defaultValue="WhatsApp">
              <option>WhatsApp</option>
              <option>Instagram</option>
              <option>Facebook</option>
              <option>YouTube</option>
              <option>TikTok</option>
            </select>
          </div>
          <div className="field">
            <label>Assigned To</label>
            <input name="assigned_to" placeholder="Media worker name" />
          </div>
          <div className="field">
            <label>Due Date</label>
            <input name="due_date" type="date" />
          </div>
          <div className="field span-2">
            <label>Notes</label>
            <textarea name="notes" placeholder="Creative direction, clip timecodes, caption notes..." />
          </div>
        </SubmitForm>
      </section>
    </InternalAccessGate>
  );
}
