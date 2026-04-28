import DashboardHeader from "@/components/DashboardHeader";

export default function CltPage() {
  return (
    <>
      <DashboardHeader eyebrow="CLT Builder" title="Come, Listen, Take Heed">
        Build daily devotionals in HBG-CLT format while preserving Pastor Amos’s tone and Heartbeat of God Ministry’s discipleship rhythm.
      </DashboardHeader>
      <section className="command-panel">
        <h2>CLT Structure</h2>
        <div className="checklist">
          {["HBG-CLT heading", "Date", "Pastor Amos Unogwu", "Title", "Opening scripture", "Key Word", "Word Focus", "Main devotional message", "Reflection", "Prayer / Declaration", "Action Point", "3 quiz questions", "Prayer agenda where relevant"].map((item) => (
            <label key={item}>
              <input type="checkbox" />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </section>
    </>
  );
}
