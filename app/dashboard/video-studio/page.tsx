import DashboardHeader from "@/components/DashboardHeader";

const templates = ["Sermon Quote Reel", "CLT Devotional Reel", "Sunday Invitation Reel", "STIR UP Prayer Video", "Salvation Challenge Promo", "Doroto Ace Worship Clip"];

export default function VideoStudioPage() {
  return (
    <>
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
    </>
  );
}
