import HeroCanvas from "@/components/HeroCanvas";
import SubmitForm from "@/components/SubmitForm";
import { submitFirstTimer, submitPrayerRequest } from "@/app/actions";

const metrics = [
  ["Vision", "Bring men to the sense of God’s divine presence."],
  ["Mission", "WIN • BUILD • SEND"],
  ["Voice", "Prophetic, practical, fatherly, and faith-filled."],
  ["Media Law", "If it is recorded, it becomes content."]
];

const templates = [
  ["01", "CLT Devotionals", "Daily spiritual formation that helps believers come, listen, and take heed to the Word with prayer, reflection, and action.", "Daily discipleship"],
  ["02", "Sermon Clips", "Short, clear moments from the Word that keep the message alive beyond Sunday and reach people where they already are.", "Message multiplication"],
  ["03", "Prayer Moments", "Declarations, prayer charges, and STIR UP focuses that awaken faith and keep the church aligned in the Spirit.", "Prayer momentum"],
  ["04", "Worship Reels", "Worship and Doroto Ace music moments that carry sound, atmosphere, and encouragement into the week.", "Sound and spirit"],
  ["05", "Testimony Videos", "Stories of God’s faithfulness preserved and shared so others can believe, pray, and return with expectation.", "Witness"],
  ["06", "Salvation Challenge", "Evangelism-centered media that mobilizes believers to win souls and sustain outreach momentum.", "Evangelism fire"]
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
          <a href="#connect">Connect</a>
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
              <a className="btn btn-primary" href="#connect">Connect With HBG</a>
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
              <h2>The Message Must Travel</h2>
              <p className="lead">Every message, prayer, testimony, and worship moment is preserved and shared so more people can encounter Christ and grow in the sense of God’s divine presence.</p>
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
              <h2>What The Public Receives</h2>
              <p className="lead">The internal media system serves a public spiritual purpose: helping people hear the Word, remember the message, pray with focus, and connect with the ministry.</p>
            </div>
            <div className="grid-3">
              {[
                ["A Word For The Week", "Sermon clips and CLT devotionals help people carry Sunday’s message into Monday, Tuesday, and beyond."],
                ["A Place To Respond", "Prayer and first-timer forms make it easy for people to ask for care, follow-up, and spiritual support."],
                ["A Witness To Share", "Worship, testimony, and outreach media give members simple ways to invite others into what God is doing."]
              ].map(([title, body]) => (
                <article className="panel" key={title}>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="public-form-band" id="connect">
          <div className="wrap public-form-layout">
            <div className="public-form-copy">
              <div className="eyebrow">Connect With HBG</div>
              <h2>Prayer, follow-up, and care must never be left to memory.</h2>
              <p className="lead">
                These forms are the first Supabase-powered intake points for the HBG growth system. Prayer requests and first-timer records can flow into the Media Command Center for pastoral care and follow-up.
              </p>
            </div>
            <div className="grid-2">
              <article className="command-panel" style={{ marginTop: 0 }}>
                <h2>Prayer Request</h2>
                <p>Share a request for the prayer and care team.</p>
                <SubmitForm action={submitPrayerRequest} submitLabel="Send Prayer Request">
                  <div className="field">
                    <label>Name</label>
                    <input name="name" placeholder="Your name" required />
                  </div>
                  <div className="field">
                    <label>Phone</label>
                    <input name="phone" placeholder="+1..." />
                  </div>
                  <div className="field">
                    <label>Email</label>
                    <input name="email" type="email" placeholder="you@example.com" />
                  </div>
                  <div className="field">
                    <label>Category</label>
                    <select name="category" defaultValue="General">
                      <option>General</option>
                      <option>Healing</option>
                      <option>Family</option>
                      <option>Work / Business</option>
                      <option>Salvation</option>
                      <option>Testimony</option>
                    </select>
                  </div>
                  <div className="field span-2">
                    <label>Request</label>
                    <textarea name="request" placeholder="How can we pray with you?" required />
                  </div>
                  <label className="span-2">
                    <input name="can_contact" type="checkbox" defaultChecked /> The team may contact me.
                  </label>
                  <label className="span-2">
                    <input name="confidential" type="checkbox" /> Keep this confidential.
                  </label>
                </SubmitForm>
              </article>
              <article className="command-panel" style={{ marginTop: 0 }}>
                <h2>First-Timer Card</h2>
                <p>Help the follow-up team connect with every visitor.</p>
                <SubmitForm action={submitFirstTimer} submitLabel="Submit First-Timer Card">
                  <div className="field">
                    <label>Name</label>
                    <input name="name" placeholder="Full name" required />
                  </div>
                  <div className="field">
                    <label>Phone</label>
                    <input name="phone" placeholder="+234..." />
                  </div>
                  <div className="field">
                    <label>Email</label>
                    <input name="email" type="email" placeholder="you@example.com" />
                  </div>
                  <div className="field">
                    <label>Area</label>
                    <input name="area" placeholder="City / area" />
                  </div>
                  <div className="field">
                    <label>Visit Type</label>
                    <select name="visit_type" defaultValue="first_time">
                      <option value="first_time">First time</option>
                      <option value="returning">Returning guest</option>
                      <option value="new_convert">New convert</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Invited By</label>
                    <input name="invited_by" placeholder="Who invited you?" />
                  </div>
                  <div className="field span-2">
                    <label>Prayer Need</label>
                    <textarea name="prayer_need" placeholder="Optional prayer need" />
                  </div>
                </SubmitForm>
              </article>
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
              <a className="btn btn-primary" href="#connect">Send Prayer Request</a>
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
