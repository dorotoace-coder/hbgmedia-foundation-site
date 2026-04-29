import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig
} from "remotion";

export type SermonQuoteReelProps = {
  ministry: string;
  slogan: string;
  speaker: string;
  title: string;
  scripture: string;
  quote: string;
  cta: string;
  date: string;
};

const defaultProps: SermonQuoteReelProps = {
  ministry: "Heartbeat of God Ministry",
  slogan: "A Reason to Live",
  speaker: "Pastor Amos Unogwu",
  title: "The Power of Divine Presence",
  scripture: "Psalm 16:11",
  quote: "A man conscious of God’s presence cannot be stranded.",
  cta: "Join us this Sunday",
  date: "2026-04-29"
};

export function SermonQuoteReel(props: Partial<SermonQuoteReelProps>) {
  const data = { ...defaultProps, ...props };
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrance = spring({ frame, fps, config: { damping: 18, stiffness: 90 } });
  const glow = interpolate(Math.sin(frame / 18), [-1, 1], [0.32, 0.68]);
  const slowDrift = interpolate(frame, [0, 180], [0, -42], {
    extrapolateRight: "clamp"
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 68% 18%, rgba(244,216,139,0.26), transparent 26%), linear-gradient(180deg, #06111f 0%, #0c2543 52%, #030912 100%)",
        color: "#fffaf0",
        fontFamily: "Inter, Arial, sans-serif",
        overflow: "hidden"
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "68px 68px",
          opacity: 0.22,
          transform: `translateY(${slowDrift}px)`
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 820,
          height: 820,
          right: -260,
          top: -130,
          borderRadius: "50%",
          border: "2px solid rgba(244,216,139,0.28)",
          boxShadow: `0 0 ${90 + glow * 80}px rgba(244,216,139,${glow})`
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 78,
          display: "flex",
          alignItems: "center",
          gap: 22,
          opacity: entrance,
          transform: `translateY(${interpolate(entrance, [0, 1], [40, 0])}px)`
        }}
      >
        <div
          style={{
            width: 164,
            height: 104,
            background: "rgba(255,255,255,0.96)",
            borderRadius: 18,
            display: "grid",
            placeItems: "center",
            boxShadow: "0 20px 60px rgba(0,0,0,0.26)"
          }}
        >
          <Img src={staticFile("assets/hbg-logo-reconstructed.svg")} style={{ width: 142 }} />
        </div>
        <div>
          <div style={{ color: "#f4d88b", fontSize: 28, fontWeight: 900, letterSpacing: 4 }}>
            {data.slogan.toUpperCase()}
          </div>
          <div style={{ color: "rgba(255,255,255,0.72)", fontSize: 25, fontWeight: 800 }}>
            {data.ministry}
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 76,
          right: 76,
          top: 325,
          opacity: entrance,
          transform: `scale(${interpolate(entrance, [0, 1], [0.96, 1])})`
        }}
      >
        <div
          style={{
            color: "#f4d88b",
            fontSize: 34,
            fontWeight: 950,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 30
          }}
        >
          {data.scripture}
        </div>
        <div
          style={{
            color: "#ffffff",
            fontSize: 74,
            fontWeight: 950,
            lineHeight: 1.07,
            letterSpacing: 0,
            textShadow: "0 22px 70px rgba(0,0,0,0.42)"
          }}
        >
          “{data.quote}”
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 76,
          right: 76,
          bottom: 305,
          paddingTop: 28,
          borderTop: "2px solid rgba(244,216,139,0.42)"
        }}
      >
        <div style={{ color: "#f4d88b", fontSize: 38, fontWeight: 950 }}>{data.title}</div>
        <div style={{ color: "rgba(255,255,255,0.76)", fontSize: 30, fontWeight: 800, marginTop: 8 }}>
          {data.speaker}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 76,
          right: 76,
          bottom: 95,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 26
        }}
      >
        <div
          style={{
            background: "#f4d88b",
            color: "#132033",
            borderRadius: 20,
            padding: "24px 34px",
            fontSize: 34,
            fontWeight: 950,
            boxShadow: "0 24px 70px rgba(244,216,139,0.26)"
          }}
        >
          {data.cta}
        </div>
        <div style={{ color: "rgba(255,255,255,0.68)", fontSize: 24, fontWeight: 800 }}>{data.date}</div>
      </div>
    </AbsoluteFill>
  );
}
