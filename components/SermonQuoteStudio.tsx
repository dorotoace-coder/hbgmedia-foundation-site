"use client";

import { Player } from "@remotion/player";
import { useActionState, useMemo, useState } from "react";
import { queueRenderJob } from "@/app/actions";
import { SermonQuoteReel, type SermonQuoteReelProps } from "@/components/remotion/SermonQuoteReel";

const initialData: SermonQuoteReelProps = {
  ministry: "Heartbeat of God Ministry",
  slogan: "A Reason to Live",
  speaker: "Pastor Amos Unogwu",
  title: "The Power of Divine Presence",
  scripture: "Psalm 16:11",
  quote: "A man conscious of God’s presence cannot be stranded.",
  cta: "Join us this Sunday",
  date: "2026-04-29"
};

export default function SermonQuoteStudio() {
  const [data, setData] = useState(initialData);
  const [queueState, queueAction, isQueueing] = useActionState(queueRenderJob, null);
  const inputProps = useMemo(() => data, [data]);

  function update(key: keyof SermonQuoteReelProps, value: string) {
    setData((current) => ({ ...current, [key]: value }));
  }

  function downloadBrief() {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "hbg-sermon-quote-brief.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="command-panel">
      <h2>Sermon Quote Reel Generator</h2>
      <p>
        Enter the message data on the left. The Remotion preview updates the branded vertical reel on the right.
      </p>
      <div className="studio-layout">
        <div className="form-grid studio-form">
          {([
            ["speaker", "Speaker"],
            ["title", "Sermon Title"],
            ["scripture", "Scripture"],
            ["cta", "Call To Action"],
            ["date", "Date"]
          ] as Array<[keyof SermonQuoteReelProps, string]>).map(([key, label]) => (
            <div className="field" key={key}>
              <label>{label}</label>
              <input value={data[key]} onChange={(event) => update(key, event.target.value)} />
            </div>
          ))}
          <div className="field span-2">
            <label>Quote</label>
            <textarea value={data.quote} onChange={(event) => update("quote", event.target.value)} />
          </div>
          <div className="field">
            <label>Ministry</label>
            <input value={data.ministry} onChange={(event) => update("ministry", event.target.value)} />
          </div>
          <div className="field">
            <label>Slogan</label>
            <input value={data.slogan} onChange={(event) => update("slogan", event.target.value)} />
          </div>
          <div className="field span-2">
            <label>Asset URL</label>
            <input
              value={data.assetUrl ?? ""}
              onChange={(event) => update("assetUrl", event.target.value)}
              placeholder="Paste uploaded image/video URL here"
            />
          </div>
          <div className="field span-2">
            <label>Asset Type</label>
            <select value={data.assetType ?? ""} onChange={(event) => update("assetType", event.target.value)}>
              <option value="">No asset</option>
              <option value="image/png">Image</option>
              <option value="video/mp4">Video</option>
              <option value="audio/mpeg">Audio</option>
            </select>
          </div>
          <div className="span-2 form-actions">
            <button className="btn btn-primary" type="button" onClick={downloadBrief}>
              Download Data Brief
            </button>
            <form action={queueAction}>
              <input name="template" type="hidden" value="SermonQuoteReel" />
              <input name="title" type="hidden" value={data.title} />
              <input name="requested_by" type="hidden" value="HBG Media Team" />
              <input name="input_props" type="hidden" value={JSON.stringify(data)} />
              <input name="notes" type="hidden" value={`Queued from protected Video Studio for ${data.scripture}`} />
              <button className="btn btn-secondary" type="submit" disabled={isQueueing}>
                {isQueueing ? "Queueing..." : "Queue Render"}
              </button>
            </form>
            {queueState ? (
              <p className={queueState.ok ? "form-message success" : "form-message error"}>
                {queueState.message}
              </p>
            ) : (
              <p className="form-message">Queue saves this brief into the Render Jobs tab in /admin.</p>
            )}
          </div>
        </div>
        <div className="remotion-preview">
          <Player
            component={SermonQuoteReel}
            inputProps={inputProps}
            durationInFrames={180}
            compositionWidth={1080}
            compositionHeight={1920}
            fps={30}
            controls
            loop
            style={{
              width: "100%",
              aspectRatio: "9 / 16",
              borderRadius: 18,
              overflow: "hidden",
              background: "#06111f"
            }}
          />
        </div>
      </div>
    </section>
  );
}
