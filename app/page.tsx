import HeroCanvas from "@/components/HeroCanvas";

const metrics = [
  ["Vision", "Bring men to the sense of God’s divine presence."],
  ["Mission", "WIN • BUILD • SEND"],
  ["Voice", "Prophetic, practical, fatherly, and faith-filled."],
  ["Media Law", "If it is recorded, it becomes content."]
];

const templates = [
  ["01", "CLT Devotional Video", "HBG-CLT heading, date, Pastor Amos Unogwu, title, scripture, Key Word, devotional message, prayer, action point, and quiz prompt.", "Daily discipleship"],
  ["02", "Sermon Quote Reel", "Powerful quote, scripture, sermon title, Pastor Amos lower third, animated captions, and Sunday invitation.", "Message multiplication"],
  ["03", "Sunday Invitation Video", "Theme, service time, venue, prayer expectation, and a warm call to encounter Christ and grow in God’s presence.", "Weekly gathering"],
  ["04", "STIR UP Prayer Video", "Day number, date, scripture, prayer focus, declarations, and the charge: preparing for what God has prepared for us.", "Prayer momentum"],
  ["05", "Salvation Challenge Promo", "Quarterly evangelism conference promos that mobilize believers to win souls and sustain outreach momentum.", "Evangelism fire"],
  ["06", "Doroto Ace Worship Clip", "Music, worship, lyrics, performance clips, and ministry sound packaged for short-form platforms and Gospel reach.", "Sound and spirit"]
];

const week = [
  ["Sunday", "Record sermon, worship, testimonies, altar call, first-timers, and clean photos."],
  ["Monday", "Transcribe, extract scriptures, identify quotes, select clips, and draft CLT."],
  ["Tuesday", "Export CLT devotional video, sermon quote reel, and prayer declaration."],
  ["Wednesday", "Post teaching clip, send midweek encouragement, and update archive."],
  ["Thursday", "Create Sunday invitation, captions, WhatsApp copy, and outreach reminder."],
  ["Friday", "Publish invitation video, schedule posts, and confirm workers."],
  ["Saturday", "Post evangelism content, prepare service media, and support outreach."]
];

export default function Home() {
  return (
    <>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Heartbeat of God Foundation">
          <span className="brand-mark">
            <img src="/assets/hbg-logo-reconstructed.svg" alt="HBG logo" />
          </span>
          <span>Heartbeat of God Foundation</span>
        </a>
        <nav className="nav" aria-label="Primary navigation">
          <a href="#mandate">Mandate</a>
          <a href="#templates">Media Engine</a>
          <a href="#workflow">Workflow</a>
          <a href="/dashboard">Command Center</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="top">
          <HeroCanvas />
          <div className="hero-content">
            <div className="hero-logo">
              <img src="/assets/hbg-logo-reconstructed.svg" alt="Heartbeat of God Ministry logo" />
            </div>
            <div className="eyebrow">A Reason to Live</div>
            <h1>Win Souls. Build Believers. Send Lights.</h1>
            <p className="hero-lead">
              Heartbeat of God Ministry is building a digital media engine for the AI era: sermons become discipleship, CLT becomes daily formation, prayer becomes movement, and every recorded moment carries light beyond the room.
            </p>
            <div className="actions">
              <a className="btn btn-primary" href="/dashboard">Open Command Center</a>
              <a className="btn btn-secondary" href="#templates">See the Media Engine</a>
            </div>
            <div className="hero-metrics" aria-label="Heartbeat of God Ministry identity">
              {metrics.map(([label, text]) => (
                <div className="metric" key={label}>
                  <strong>{label}</strong>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="mandate" className="dark">
          <div className="wrap">
            <div className="section-head">
              <h2>The Mandate Is Movement</h2>
              <p className="lead">Few dedicated workers can carry a large vision when the work is structured, Spirit-led, and multiplied through wise systems.</p>
            </div>
            <div className="grid-3">
              {[
                ["1", "Win", "Bring people to Christ through evangelism, Salvation Challenge, altar calls, outreach, testimony, and digital Gospel visibility."],
                ["2", "Build", "Nurture believers through CLT devotionals, prayer, the Word, HLCI teaching, service culture, and Holy Spirit consciousness."],
                ["3", "Send", "Release lights into families, communities, media, business, music, leadership, and digital mission fields across nations."]
              ].map(([number, title, body]) => (
                <article className="panel" key={title}>
                  <span className="panel-number">{number}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="image-band">
          <div className="wrap">
            <div className="eyebrow">The Heartbeat Way</div>
            <h2>From this village you will navigate the world.</h2>
            <p>The way up is down. Waiting is speed. HBG will grow through humility, order, prayer, service, and a media system that keeps the Word moving all week.</p>
          </div>
        </section>

        <section className="founder-band" aria-label="Pastor Amos Unogwu media vision">
          <div className="wrap">
            <div className="founder-layout">
              <div className="founder-content">
                <div className="eyebrow">Visionary Leadership</div>
                <h2>Pastor Amos Unogwu: a fatherly voice for a generation that must not lose the sense of God’s presence.</h2>
                <p>Heartbeat of God Ministry carries a prophetic-practical mandate: to raise believers who know Christ, grow strong in the Word, live conscious of the Holy Spirit, serve faithfully, and influence the world with light.</p>
                <p>The media system exists to preserve that voice, multiply the Word, and make every sermon, CLT devotional, prayer session, worship moment, and testimony travel with purpose.</p>
                <div className="signature-line">
                  <span>Pastor Amos Unogwu / Doroto Ace</span>
                  <span>Founder, Heartbeat of God Ministry</span>
                </div>
              </div>
              <div className="portrait-stage" aria-label="Cinematic portrait of Pastor Amos Unogwu">
                <div className="light-beam beam-one" />
                <div className="light-beam beam-two" />
                <div className="portrait-frame" />
                <div className="cinema-plaque plaque-top">
                  <strong>Mandate</strong>
                  <span>Bring men to the sense of God’s divine presence.</span>
                </div>
                <div className="cinema-plaque plaque-bottom">
                  <strong>The Heartbeat Way</strong>
                  <span>Win Souls. Build Believers. Send Lights.</span>
                </div>
                <div className="portrait-caption">The Word must not end on Sunday. The message must travel.</div>
              </div>
            </div>
          </div>
        </section>

        <section id="templates" className="cream">
          <div className="wrap">
            <div className="section-head">
              <h2>The Custom Remotion Media Engine</h2>
              <p className="lead">These templates turn ministry moments into fast, branded, repeatable videos for WhatsApp, Instagram, TikTok, Facebook, YouTube, and service screens.</p>
            </div>
            <div className="templates">
              {templates.map(([number, title, body, label]) => (
                <article className="template" key={title}>
                  <div className="badge">{number}</div>
                  <div>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                  <small>{label}</small>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="workflow" className="deep">
          <div className="wrap">
            <div className="section-head">
              <h2>One Week. One Sermon. Many Lights.</h2>
              <p className="lead">A weekly rhythm that helps few workers produce consistent, Spirit-conscious content without confusion.</p>
            </div>
            <div className="week">
              {week.map(([day, text]) => (
                <div className="day" key={day}>
                  <strong>{day}</strong>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="wrap">
            <div className="section-head">
              <h2>Build It With Data, Not Stress</h2>
              <p className="lead">Remotion lets HBG update a simple data brief while the template handles brand, animation, layout, and export size.</p>
            </div>
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
            <div className="pill-row" aria-label="HBG content pillars">
              {["CLT Devotionals", "STIR UP Prayers", "Salvation Challenge", "Sermon Clips", "Worship Reels", "Testimony Videos", "Sunday Invites", "Leadership Training"].map((pillar) => (
                <span className="pill" key={pillar}>{pillar}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="cream" id="launch">
          <div className="wrap">
            <div className="section-head">
              <h2>30-Day Launch Plan</h2>
              <p className="lead">Do not start with twenty templates. Start with three that can run every week, then expand.</p>
            </div>
            <div className="steps">
              {[
                ["Week 1: Foundation", "Create the HBG media folder, collect logo/colors/fonts/photos, set up the Remotion project, and build the vertical reel layout."],
                ["Week 2: Three Core Templates", "Build Sermon Quote Reel, CLT Devotional Reel, and Sunday Invitation Reel. Export the first three public HBG videos."],
                ["Week 3: Prayer and Evangelism", "Add STIR UP Prayer, Salvation Challenge Promo, and Testimony Reel templates. Train one worker to update data and export."],
                ["Week 4: Rhythm and Report", "Produce one full content week from one sermon, publish across platforms, and submit the first HBG weekly media report."]
              ].map(([title, body]) => (
                <article className="step" key={title}>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="wrap">
            <h2>The Word must not end on Sunday.</h2>
            <p>Heartbeat of God Ministry will preserve the message, multiply the fire, and send lights through Spirit-filled media, disciplined systems, and faithful workers.</p>
            <div className="actions" style={{ justifyContent: "center" }}>
              <a className="btn btn-primary" href="/dashboard">Enter Media Command Center</a>
              <a className="btn btn-secondary" href="#templates">Review the Templates</a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <span>Heartbeat of God Foundation</span>
          <span>Win Souls. Build Believers. Send Lights.</span>
        </div>
      </footer>
    </>
  );
}
