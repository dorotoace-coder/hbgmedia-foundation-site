import DashboardHeader from "@/components/DashboardHeader";

const lessons = [
  ["Media Law", "If it is recorded, it becomes content."],
  ["Sunday Capture", "How to record clean sermon, worship, testimony, and altar call moments."],
  ["Sermon Extraction", "How to identify quotes, scriptures, prayer points, and short clip moments."],
  ["CLT Production", "How to build devotionals in the HBG-CLT structure."],
  ["Publishing Discipline", "How to post with captions, timing, and weekly reporting."],
  ["Worker Spirit", "The way up is down: service, humility, excellence, and consistency."]
];

export default function TrainingPage() {
  return (
    <>
      <DashboardHeader eyebrow="Media Training Academy" title="Train the Workers, Preserve the Fire">
        This is the first structure for HBG media worker training. Later it can include videos, quizzes, certificates, and progress tracking.
      </DashboardHeader>
      <section className="tool-grid" style={{ padding: 0 }}>
        {lessons.map(([title, body]) => (
          <article className="tool-card" key={title}>
            <h2>{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </section>
    </>
  );
}
