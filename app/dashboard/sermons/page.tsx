import DashboardHeader from "@/components/DashboardHeader";
import SubmitForm from "@/components/SubmitForm";
import { submitSermon } from "@/app/actions";

export default function SermonsPage() {
  return (
    <>
      <DashboardHeader eyebrow="Sermon Intake" title="Capture the Word Before It Scatters">
        Every sermon should become CLT, reels, prayer points, captions, discussion guides, and weekly follow-up.
      </DashboardHeader>
      <section className="command-panel">
        <h2>New Sermon Record</h2>
        <p>This form is static in Phase 1. In Phase 2 it will save to Supabase and feed the CLT and Remotion builders.</p>
        <SubmitForm action={submitSermon} submitLabel="Save Sermon Intake">
          <div className="field">
            <label>Sermon Date</label>
            <input name="sermon_date" type="date" />
          </div>
          <div className="field">
            <label>Speaker</label>
            <input name="speaker" defaultValue="Pastor Amos Unogwu" />
          </div>
          <div className="field">
            <label>Sermon Title</label>
            <input name="title" placeholder="The Power of Divine Presence" required />
          </div>
          <div className="field">
            <label>Main Scripture</label>
            <input name="scripture" placeholder="Psalm 16:11" />
          </div>
          <div className="field span-2">
            <label>Main Message</label>
            <textarea name="main_message" placeholder="Summarize the burden of the message..." />
          </div>
          <div className="field span-2">
            <label>Key Quotes</label>
            <textarea name="key_quotes" placeholder="Add 3-7 powerful lines for quote reels and graphics." />
          </div>
          <div className="field">
            <label>Media URL</label>
            <input name="media_url" placeholder="YouTube, Drive, or archive link" />
          </div>
          <div className="field">
            <label>Call To Action</label>
            <input name="call_to_action" placeholder="Join us Sunday / Pray / Give / Outreach" />
          </div>
        </SubmitForm>
      </section>
    </>
  );
}
