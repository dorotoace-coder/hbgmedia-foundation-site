import DashboardHeader from "@/components/DashboardHeader";
import SubmitForm from "@/components/SubmitForm";
import { submitCltDraft } from "@/app/actions";

export default function CltPage() {
  return (
    <>
      <DashboardHeader eyebrow="CLT Builder" title="Come, Listen, Take Heed">
        Build daily devotionals in HBG-CLT format while preserving Pastor Amos’s tone and Heartbeat of God Ministry’s discipleship rhythm.
      </DashboardHeader>
      <section className="command-panel">
        <h2>New CLT Draft</h2>
        <SubmitForm action={submitCltDraft} submitLabel="Save CLT Draft">
          <div className="field">
            <label>Devotional Date</label>
            <input name="devotional_date" type="date" />
          </div>
          <div className="field">
            <label>Title</label>
            <input name="title" placeholder="The Consciousness of His Presence" required />
          </div>
          <div className="field">
            <label>Scripture</label>
            <input name="scripture" placeholder="Psalm 16:11" />
          </div>
          <div className="field">
            <label>Key Word</label>
            <input name="key_word" placeholder="Presence" />
          </div>
          <div className="field span-2">
            <label>Word Focus</label>
            <textarea name="word_focus" placeholder="The central burden of today's CLT..." />
          </div>
          <div className="field span-2">
            <label>Main Devotional Message</label>
            <textarea name="message" placeholder="Write the CLT message..." />
          </div>
          <div className="field span-2">
            <label>Prayer / Declaration</label>
            <textarea name="prayer" placeholder="I declare..." />
          </div>
          <div className="field">
            <label>Action Point</label>
            <input name="action_point" placeholder="Pray for 15 minutes..." />
          </div>
          <div className="field">
            <label>Quiz Questions</label>
            <input name="quiz_questions" placeholder="3 questions separated by semicolons" />
          </div>
        </SubmitForm>
      </section>
    </>
  );
}
