// api/content.js
// Vercel serverless function — validates the content token issued by
// /api/validate and returns the HTML content for that tier.
// Tier 2 and Tier 3 content ONLY lives here — it never touches the frontend.

const CONTENT_SECRET = process.env.CONTENT_SECRET || 'REPLACE_WITH_RANDOM_SECRET';

// ─── TOKEN VERIFICATION ───────────────────────────────────────────────────────
function verifyToken(token) {
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf8'));
    if (decoded.sig !== CONTENT_SECRET) return null;
    if (Date.now() > decoded.expires)   return null;
    return decoded;
  } catch {
    return null;
  }
}

// ─── TIER 2 CONTENT — STARTER KIT ────────────────────────────────────────────
function tier2HTML() {
  return `
<!-- ═══════════════════════════════════════════════════════════
     SYSTEM 2 — THE NICHE BENDING STARTER KIT
     ═══════════════════════════════════════════════════════════ -->
<section class="sys-section" id="system-2">
  <div class="sys-inner">
    <div class="sys-header">
      <div class="sys-badge">System 02</div>
      <h2 class="sys-title">The Niche Bending Starter Kit</h2>
      <p class="sys-sub">30 done-for-you niche bend ideas across 6 high-RPM niches, 10 plug-and-play Script Bending title templates, and your complete first-video checklist. Everything you need to pick a direction and start.</p>
    </div>

    <div class="kit-grid">

      <!-- 30 NICHE IDEAS -->
      <div class="kit-block full-width">
        <div class="kit-block-header">
          <div class="kit-icon">🎯</div>
          <div>
            <h3>30 Done-for-You Niche Bend Ideas</h3>
            <p>These are ready to use. Each one combines a proven market with a format borrowed from another niche where it's already proven to go viral. Pick one and start.</p>
          </div>
        </div>

        <div class="niche-category">
          <div class="niche-cat-label">💰 Finance &amp; Money — CPM $15–$60</div>
          <div class="niche-items">
            <div class="niche-item"><span class="ni-num">01</span><div><strong>Market:</strong> Personal finance <span class="ni-sep">+</span> <strong>Format:</strong> True crime storytelling → <em>"The Biggest Financial Mistakes That Destroyed Millionaires"</em></div></div>
            <div class="niche-item"><span class="ni-num">02</span><div><strong>Market:</strong> Investing <span class="ni-sep">+</span> <strong>Format:</strong> Tier list ranking → <em>"Every Investment Type Ranked From Worst to Best"</em></div></div>
            <div class="niche-item"><span class="ni-num">03</span><div><strong>Market:</strong> Real estate <span class="ni-sep">+</span> <strong>Format:</strong> "If X does Y it means..." → <em>"If Your Landlord Does These 5 Things, Here's What It Means"</em></div></div>
            <div class="niche-item"><span class="ni-num">04</span><div><strong>Market:</strong> Side hustles <span class="ni-sep">+</span> <strong>Format:</strong> Documentary expose → <em>"The Dark Truth About Every Popular Side Hustle in 2026"</em></div></div>
            <div class="niche-item"><span class="ni-num">05</span><div><strong>Market:</strong> Credit &amp; debt <span class="ni-sep">+</span> <strong>Format:</strong> Survival ranking → <em>"Every Type of Debt Ranked — Which One Will Destroy You Fastest"</em></div></div>
          </div>
        </div>

        <div class="niche-category">
          <div class="niche-cat-label">📜 History — CPM $8–$25</div>
          <div class="niche-items">
            <div class="niche-item"><span class="ni-num">06</span><div><strong>Market:</strong> Ancient civilizations <span class="ni-sep">+</span> <strong>Format:</strong> Gaming tier list → <em>"Every Ancient Empire Ranked by How Brutal Their Punishments Were"</em></div></div>
            <div class="niche-item"><span class="ni-num">07</span><div><strong>Market:</strong> Royal history <span class="ni-sep">+</span> <strong>Format:</strong> "Every X explained" → <em>"Every British Monarch's Death Explained"</em></div></div>
            <div class="niche-item"><span class="ni-num">08</span><div><strong>Market:</strong> Wars &amp; battles <span class="ni-sep">+</span> <strong>Format:</strong> True crime suspense → <em>"The Battle That Should Have Been Impossible to Lose — But They Did"</em></div></div>
            <div class="niche-item"><span class="ni-num">09</span><div><strong>Market:</strong> Historical figures <span class="ni-sep">+</span> <strong>Format:</strong> Comparison breakdown → <em>"Napoleon vs Caesar — Who Was Actually More Powerful?"</em></div></div>
            <div class="niche-item"><span class="ni-num">10</span><div><strong>Market:</strong> Ancient mysteries <span class="ni-sep">+</span> <strong>Format:</strong> "The dark truth about" → <em>"The Dark Truth About What Really Happened to the Library of Alexandria"</em></div></div>
          </div>
        </div>

        <div class="niche-category">
          <div class="niche-cat-label">🐾 Animals &amp; Wildlife — CPM $5–$18</div>
          <div class="niche-items">
            <div class="niche-item"><span class="ni-num">11</span><div><strong>Market:</strong> Predators <span class="ni-sep">+</span> <strong>Format:</strong> Survival tier list → <em>"Every Apex Predator Ranked — Who Wins in a Real Fight?"</em></div></div>
            <div class="niche-item"><span class="ni-num">12</span><div><strong>Market:</strong> Ocean creatures <span class="ni-sep">+</span> <strong>Format:</strong> "If your X does Y" → <em>"If a Shark Does These Things Near You, Here's What It Means"</em></div></div>
            <div class="niche-item"><span class="ni-num">13</span><div><strong>Market:</strong> Extinct animals <span class="ni-sep">+</span> <strong>Format:</strong> Documentary expose → <em>"Every Mass Extinction Event Explained — And the Next One We're Not Ready For"</em></div></div>
            <div class="niche-item"><span class="ni-num">14</span><div><strong>Market:</strong> Insects <span class="ni-sep">+</span> <strong>Format:</strong> True crime storytelling → <em>"The Most Terrifying Insect Attacks in History — Explained"</em></div></div>
            <div class="niche-item"><span class="ni-num">15</span><div><strong>Market:</strong> Animal intelligence <span class="ni-sep">+</span> <strong>Format:</strong> Ranking → <em>"Every Animal Ranked by Intelligence — The Results Will Surprise You"</em></div></div>
          </div>
        </div>

        <div class="niche-category">
          <div class="niche-cat-label">🧠 Psychology &amp; Behavior — CPM $10–$30</div>
          <div class="niche-items">
            <div class="niche-item"><span class="ni-num">16</span><div><strong>Market:</strong> Dark psychology <span class="ni-sep">+</span> <strong>Format:</strong> "If X does Y" → <em>"If Someone Does These 6 Things, They Are Manipulating You"</em></div></div>
            <div class="niche-item"><span class="ni-num">17</span><div><strong>Market:</strong> Social behavior <span class="ni-sep">+</span> <strong>Format:</strong> Expose documentary → <em>"The Dark Truth About Why People Follow Cults — Explained by Psychology"</em></div></div>
            <div class="niche-item"><span class="ni-num">18</span><div><strong>Market:</strong> Body language <span class="ni-sep">+</span> <strong>Format:</strong> Tier list → <em>"Every Body Language Signal Ranked — What Each One Really Means"</em></div></div>
            <div class="niche-item"><span class="ni-num">19</span><div><strong>Market:</strong> Cognitive biases <span class="ni-sep">+</span> <strong>Format:</strong> "Every X explained" → <em>"Every Cognitive Bias Explained — And Which Ones Are Controlling You Right Now"</em></div></div>
            <div class="niche-item"><span class="ni-num">20</span><div><strong>Market:</strong> Narcissism <span class="ni-sep">+</span> <strong>Format:</strong> True crime structure → <em>"The Warning Signs Nobody Talks About — Spotting a Narcissist Before It's Too Late"</em></div></div>
          </div>
        </div>

        <div class="niche-category">
          <div class="niche-cat-label">🔍 True Crime &amp; Mystery — CPM $6–$20</div>
          <div class="niche-items">
            <div class="niche-item"><span class="ni-num">21</span><div><strong>Market:</strong> Unsolved cases <span class="ni-sep">+</span> <strong>Format:</strong> Finance expose style → <em>"The Crimes That Should Have Been Solved — But Someone Didn't Want Them To Be"</em></div></div>
            <div class="niche-item"><span class="ni-num">22</span><div><strong>Market:</strong> Historical crimes <span class="ni-sep">+</span> <strong>Format:</strong> Tier list → <em>"Every Serial Killer From the 1900s Ranked by How They Were Finally Caught"</em></div></div>
            <div class="niche-item"><span class="ni-num">23</span><div><strong>Market:</strong> Government secrets <span class="ni-sep">+</span> <strong>Format:</strong> Documentary → <em>"Every Declassified Government Secret Explained — What They Hid and Why"</em></div></div>
            <div class="niche-item"><span class="ni-num">24</span><div><strong>Market:</strong> Disappearances <span class="ni-sep">+</span> <strong>Format:</strong> "Every X explained" → <em>"Every Famous Disappearance That Was Never Solved — Explained"</em></div></div>
            <div class="niche-item"><span class="ni-num">25</span><div><strong>Market:</strong> Cults <span class="ni-sep">+</span> <strong>Format:</strong> Survival ranking → <em>"Every Major Cult Ranked by How Dangerous They Actually Were"</em></div></div>
          </div>
        </div>

        <div class="niche-category">
          <div class="niche-cat-label">💻 Technology &amp; AI — CPM $10–$25</div>
          <div class="niche-items">
            <div class="niche-item"><span class="ni-num">26</span><div><strong>Market:</strong> AI tools <span class="ni-sep">+</span> <strong>Format:</strong> True crime style → <em>"The AI Tools That Are Quietly Replacing Entire Industries — And Nobody's Talking About It"</em></div></div>
            <div class="niche-item"><span class="ni-num">27</span><div><strong>Market:</strong> Tech companies <span class="ni-sep">+</span> <strong>Format:</strong> Tier list → <em>"Every Big Tech Company Ranked — Which Ones Are Actually Evil?"</em></div></div>
            <div class="niche-item"><span class="ni-num">28</span><div><strong>Market:</strong> Cybersecurity <span class="ni-sep">+</span> <strong>Format:</strong> "If X does Y" → <em>"If Your Phone Does These 7 Things, Someone Is Watching You"</em></div></div>
            <div class="niche-item"><span class="ni-num">29</span><div><strong>Market:</strong> Social media <span class="ni-sep">+</span> <strong>Format:</strong> Expose documentary → <em>"The Dark Truth About How Every Social Media Platform Is Designed to Addict You"</em></div></div>
            <div class="niche-item"><span class="ni-num">30</span><div><strong>Market:</strong> Failed tech <span class="ni-sep">+</span> <strong>Format:</strong> "Every X explained" → <em>"Every Major Tech Failure Explained — And What Killed Them"</em></div></div>
          </div>
        </div>
      </div>

      <!-- TITLE TEMPLATES -->
      <div class="kit-block full-width">
        <div class="kit-block-header">
          <div class="kit-icon">✍️</div>
          <div>
            <h3>10 Plug-and-Play Script Bending Title Templates</h3>
            <p>Replace the brackets with your topic. Each framework has been proven to drive clicks in USA/UK markets.</p>
          </div>
        </div>
        <div class="template-list">
          <div class="tmpl"><span class="tmpl-num">01</span><div class="tmpl-body"><div class="tmpl-title">"Every [Subject] [Action] Explained"</div><div class="tmpl-ex">e.g. "Every Roman Emperor's Death Explained"</div></div></div>
          <div class="tmpl"><span class="tmpl-num">02</span><div class="tmpl-body"><div class="tmpl-title">"Every [Category] Ranked — From [Extreme A] to [Extreme B]"</div><div class="tmpl-ex">e.g. "Every Predator Ranked — From Harmless to Most Deadly"</div></div></div>
          <div class="tmpl"><span class="tmpl-num">03</span><div class="tmpl-body"><div class="tmpl-title">"The Dark Truth About [Topic] Nobody Talks About"</div><div class="tmpl-ex">e.g. "The Dark Truth About Passive Income Nobody Talks About"</div></div></div>
          <div class="tmpl"><span class="tmpl-num">04</span><div class="tmpl-body"><div class="tmpl-title">"If [Person/Animal/Thing] Does [Behavior], It Means [Revelation]"</div><div class="tmpl-ex">e.g. "If Your Boss Does These 5 Things, He's Planning to Fire You"</div></div></div>
          <div class="tmpl"><span class="tmpl-num">05</span><div class="tmpl-body"><div class="tmpl-title">"[A] vs [B] — Which Is Actually [More Extreme]?"</div><div class="tmpl-ex">e.g. "Napoleon vs Caesar — Who Was Actually More Ruthless?"</div></div></div>
          <div class="tmpl"><span class="tmpl-num">06</span><div class="tmpl-body"><div class="tmpl-title">"The [Number] [Subjects] That [Shocking Outcome]"</div><div class="tmpl-ex">e.g. "The 7 Investments That Made Ordinary People Millionaires"</div></div></div>
          <div class="tmpl"><span class="tmpl-num">07</span><div class="tmpl-body"><div class="tmpl-title">"What Happens When [Scenario] — Explained"</div><div class="tmpl-ex">e.g. "What Happens When an Apex Predator Has No Natural Enemies — Explained"</div></div></div>
          <div class="tmpl"><span class="tmpl-num">08</span><div class="tmpl-body"><div class="tmpl-title">"[Subject] That Should Have [Expected Outcome] — But Didn't"</div><div class="tmpl-ex">e.g. "The Empire That Should Have Survived — But Collapsed in 30 Days"</div></div></div>
          <div class="tmpl"><span class="tmpl-num">09</span><div class="tmpl-body"><div class="tmpl-title">"How [Subject] [Did Something] — And Why It Will Never Happen Again"</div><div class="tmpl-ex">e.g. "How One Man Crashed an Entire Economy — And Why It Will Never Happen Again"</div></div></div>
          <div class="tmpl"><span class="tmpl-num">10</span><div class="tmpl-body"><div class="tmpl-title">"Every [Subject] Warning Sign — And What To Do About Each One"</div><div class="tmpl-ex">e.g. "Every Financial Red Flag Warning Sign — And What To Do About Each One"</div></div></div>
        </div>
      </div>

      <!-- TITLE TEMPLATES -->
      <div class="kit-block full-width">
        <div class="kit-block-header">
          <div class="kit-icon">⚙️</div>
          <div>
            <h3>How to Copy any YouTube Channel in 30 minutes</h3>
            <p>Use this strategy to copy any YouTube Channel in 30 minutes. Or use the prompts in the 'System 3 AI - Tools'</p>
          </div>
        </div>
        <div class="template-list">
          <div class="tmpl"><span class="tmpl-num">01</span><div class="tmpl-body"><div class="tmpl-title">Break down their channel</div><div class="tmpl-ex">Start with titles & thumbnails, then break down their scripts. You need to understand how they structure them before you can 'script bend'</div></div></div>
          <div class="tmpl"><span class="tmpl-num">02</span><div class="tmpl-body"><div class="tmpl-title">Niche Bend it</div><div class="tmpl-ex">Find a content category where the original viral format has never been used before. This way, you create a "blue ocean" for yourself.</div></div></div>
          <div class="tmpl"><span class="tmpl-num">03</span><div class="tmpl-body"><div class="tmpl-title">Script Bend it</div><div class="tmpl-ex">Take all their best videos and rewrite their scripts following the same structure, but update the idea while adapting it to your niche.</div></div></div>
          <div class="tmpl"><span class="tmpl-num">04</span><div class="tmpl-body"><div class="tmpl-title">Break down visuals</div><div class="tmpl-ex">Your goal is to be 5% better or 50% different. If you can achieve better quality - do it. If you can't, find how you can be different without changing the style too much.</div></div></div>
          <div class="tmpl"><span class="tmpl-num">05</span><div class="tmpl-body"><div class="tmpl-title">Hire & launch</div><div class="tmpl-ex">Forget Upwork, hire from high-ROI markets like the CIS, and you'll be fine.</div></div></div>
        </div>
      </div>

      <!-- FIRST VIDEO CHECKLIST -->
      <div class="kit-block full-width">
        <div class="kit-block-header">
          <div class="kit-icon">✅</div>
          <div>
            <h3>Your First Video Checklist</h3>
            <p>Complete every item in order. This is the exact sequence Marcus followed for his first viral video.</p>
          </div>
        </div>
        <div class="checklist">
          <div class="cl-group"><div class="cl-group-label">Before You Script</div>
            <div class="cl-item"><input type="checkbox" id="c1"/><label for="c1">Choose your Market (the topic you genuinely know something about)</label></div>
            <div class="cl-item"><input type="checkbox" id="c2"/><label for="c2">Choose your Format (borrowed from a different niche where it already went viral)</label></div>
            <div class="cl-item"><input type="checkbox" id="c3"/><label for="c3">Find 2–3 competitor videos in your market and extract their transcripts using youtubetotranscript.com</label></div>
            <div class="cl-item"><input type="checkbox" id="c4"/><label for="c4">Use the Niche Rater prompt (System 3 AI Tools) to score your idea before spending time on it</label></div>
            <div class="cl-item"><input type="checkbox" id="c5"/><label for="c5">Confirm your target country (USA / UK / Canada / Australia) and choose a voice accent to match</label></div>
          </div>
          <div class="cl-group"><div class="cl-group-label">Scripting &amp; Production</div>
            <div class="cl-item"><input type="checkbox" id="c6"/><label for="c6">Use the Script Writer prompt (System 3 AI Tools) to generate your full script + visual prompts</label></div>
            <div class="cl-item"><input type="checkbox" id="c7"/><label for="c7">Read the script aloud — rewrite any sentence that sounds awkward when spoken</label></div>
            <div class="cl-item"><input type="checkbox" id="c8"/><label for="c8">Generate all images using Google Flow (labs.google/fx/tools/flow) — aim for 12–20 images</label></div>
            <div class="cl-item"><input type="checkbox" id="c9"/><label for="c9">Generate AI voiceover using ElevenLabs or similar — American or British accent</label></div>
            <div class="cl-item"><input type="checkbox" id="c10"/><label for="c10">(Optional) Generate 3–5 Grok video clips for key dramatic moments</label></div>
          </div>
          <div class="cl-group"><div class="cl-group-label">Editing in CapCut</div>
            <div class="cl-item"><input type="checkbox" id="c11"/><label for="c11">Import voiceover as base audio track first</label></div>
            <div class="cl-item"><input type="checkbox" id="c12"/><label for="c12">Add images and video clips timed to narration (3–5 seconds per image)</label></div>
            <div class="cl-item"><input type="checkbox" id="c13"/><label for="c13">Add zoom animation to every still image (Animation → In → Zoom In, 0.5s)</label></div>
            <div class="cl-item"><input type="checkbox" id="c14"/><label for="c14">Auto-generate captions and fix any errors</label></div>
            <div class="cl-item"><input type="checkbox" id="c15"/><label for="c15">Add background music at 10–15% volume</label></div>
            <div class="cl-item"><input type="checkbox" id="c16"/><label for="c16">Export at 1080p</label></div>
          </div>
          <div class="cl-group"><div class="cl-group-label">Before You Publish</div>
            <div class="cl-item"><input type="checkbox" id="c17"/><label for="c17">Write YouTube title using a Script Bending framework (front-load the keyword)</label></div>
            <div class="cl-item"><input type="checkbox" id="c18"/><label for="c18">Design thumbnail in Canva — 3–4 bold words, high contrast</label></div>
            <div class="cl-item"><input type="checkbox" id="c19"/><label for="c19">Write SEO description — first 150 characters include main keyword</label></div>
            <div class="cl-item"><input type="checkbox" id="c20"/><label for="c20">Add 5–8 tags using VidIQ or TubeBuddy free tier</label></div>
            <div class="cl-item"><input type="checkbox" id="c21"/><label for="c21">Schedule publish time: 9 AM–12 PM Eastern Time (USA) on Tuesday, Wednesday, or Thursday</label></div>
            <div class="cl-item"><input type="checkbox" id="c22"/><label for="c22">Pin a question as your first comment immediately after publishing</label></div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>`;
}

// ─── TIER 3 CONTENT — FULL COURSE ────────────────────────────────────────────
// The full course HTML is large — it's injected here as a section.
// In production this could be split into multiple files and concatenated.
function tier3HTML() {
  return `
<!-- ═══════════════════════════════════════════════════════════
     SYSTEM 3 — THE FULL COURSE
     ═══════════════════════════════════════════════════════════ -->
<section class="sys-section" id="system-3">
  <div class="sys-inner">
    <div class="sys-header">
      <div class="sys-badge sys-badge-gold">System 03</div>
      <h2 class="sys-title">The Complete Faceless YouTube System</h2>
      <p class="sys-sub">The full 12-module course, AI Tools page, Script Writer prompt, Niche Rater prompt, posting strategy, monetization playbook, and YouTube safety guide. Everything Marcus used to hit 20M views and monetize in 30 days.</p>
    </div>
    <div class="course-nav-wrap">
      <div class="course-sidebar" id="courseSidebar">
        <div class="csb-head">
          <div class="csb-label">Course Modules</div>
          <div class="prog-row-inner"><span id="cpct">0%</span></div>
          <div class="prog-track"><div class="prog-fill" id="cpfill" style="width:0%"></div></div>
        </div>
        <ul class="csb-nav" id="csbNav">
          <li><a onclick="cGo(0)" data-cm="0" class="active"><span class="csb-dot">1</span>Intro &amp; Mindset</a></li>
          <li><a onclick="cGo(1)" data-cm="1"><span class="csb-dot">2</span>Niche Bending</a></li>
          <li><a onclick="cGo(2)" data-cm="2"><span class="csb-dot">3</span>Script Bending</a></li>
          <li><a onclick="cGo(3)" data-cm="3"><span class="csb-dot">4</span>Target Countries</a></li>
          <li><a onclick="cGo(4)" data-cm="4"><span class="csb-dot">5</span>Channel Setup</a></li>
          <li><a onclick="cGo(5)" data-cm="5"><span class="csb-dot">6</span>Visuals — Google Flow</a></li>
          <li><a onclick="cGo(6)" data-cm="6"><span class="csb-dot">7</span>Video — Grok</a></li>
          <li><a onclick="cGo(7)" data-cm="7"><span class="csb-dot">8</span>Editing — CapCut</a></li>
          <li><a onclick="cGo(8)" data-cm="8"><span class="csb-dot">9</span>Posting Strategy</a></li>
          <li><a onclick="cGo(9)" data-cm="9"><span class="csb-dot">10</span>YouTube Growth</a></li>
          <li><a onclick="cGo(10)" data-cm="10"><span class="csb-dot">11</span>Monetization</a></li>
          <li><a onclick="cGo(11)" data-cm="11"><span class="csb-dot">12</span>Stay Safe — AI Policy</a></li>
        </ul>
      </div>
      <div class="course-content-area" id="courseContentArea">
        <select class="mob-course-select" onchange="cGo(this.value)">
          <option value="0">Module 1 — Intro &amp; Mindset</option>
          <option value="1">Module 2 — Niche Bending</option>
          <option value="2">Module 3 — Script Bending</option>
          <option value="3">Module 4 — Target Countries</option>
          <option value="4">Module 5 — Channel Setup</option>
          <option value="5">Module 6 — Visuals with Google Flow</option>
          <option value="6">Module 7 — Video with Grok</option>
          <option value="7">Module 8 — Editing with CapCut</option>
          <option value="8">Module 9 — Posting Strategy</option>
          <option value="9">Module 10 — YouTube Growth</option>
          <option value="10">Module 11 — Monetization</option>
          <option value="11">Module 12 — Stay Safe</option>
        </select>
        <div id="courseModules"></div>
      </div>
    </div>
  </div>
</section>

<!-- AI TOOLS SECTION (part of System 3) -->
<section class="sys-section sys-section-alt" id="system-3-tools">
  <div class="sys-inner">
    <div class="sys-header">
      <div class="sys-badge sys-badge-gold">System 03 — AI Tools</div>
      <h2 class="sys-title">Copy-Paste Claude AI Prompts</h2>
      <p class="sys-sub">Open claude.ai in a new tab. Copy a prompt below, paste it into Claude, and follow the guided workflow step by step.</p>
    </div>

    <div class="prompt-tabs-inner">
      <button class="ptab-inner active" onclick="switchPTab('protocol')">📋 Protocol Clerk</button>
      <button class="ptab-inner" onclick="switchPTab('niche')">🎯 Niche Bending</button>
      <button class="ptab-inner" onclick="switchPTab('script')">✍️ Script Stealing</button>
      <button class="ptab-inner" onclick="switchPTab('thumb')">🖼 Thumbnail Generator</button>
    </div>
<div id="ptab-protocol" class="ptab-panel active">
  <div class="prompt-card-inner">
    <div class="pci-header">
      <div>
        <h3>Protocol Clerk</h3>
        <p>Analyzes a competitor channel and builds your scripting SOP.</p>
      </div>
      <button class="copy-btn-inner" onclick="copyInner('protocolPrompt','this')">Copy</button>
    </div>
    <div class="pci-body" id="protocolPrompt">
PASTE YOUR FULL PROTOCOL CLERK PROMPT HERE
    </div>
  </div>
</div>
<div id="ptab-niche" class="ptab-panel">
  <div class="prompt-card-inner">
    <div class="pci-header">
      <div>
        <h3>Niche Bending Protocol</h3>
        <p>Creates 3 niche bends and builds your complete channel SOP.</p>
      </div>
      <button class="copy-btn-inner" onclick="copyInner('nichePrompt','this')">Copy</button>
    </div>
    <div class="pci-body" id="nichePrompt">
PASTE YOUR FULL NICHE BENDING PROTOCOL HERE
    </div>
  </div>
</div>
<div id="ptab-script" class="ptab-panel">
  <div class="prompt-card-inner">
    <div class="pci-header">
      <div>
        <h3>Script Stealing Protocol</h3>
        <p>Rebuilds competitor scripts into your own niche.</p>
      </div>
      <button class="copy-btn-inner" onclick="copyInner('scriptPrompt','this')">Copy</button>
    </div>
    <div class="pci-body" id="scriptPrompt">
PASTE YOUR FULL SCRIPT STEALING PROTOCOL HERE
    </div>
  </div>
</div>
<div id="ptab-thumb" class="ptab-panel">
  <div class="prompt-card-inner">
    <div class="pci-header">
      <div>
        <h3>Thumbnail Generator Protocol</h3>
        <p>Learns your style and creates matching thumbnail prompts.</p>
      </div>
      <button class="copy-btn-inner" onclick="copyInner('thumbPrompt','this')">Copy</button>
    </div>
    <div class="pci-body" id="thumbPrompt">
PASTE YOUR FULL THUMBNAIL GENERATOR PROMPT HERE
    </div>
  </div>
</div>
  </div>
  </section>

// ─── HANDLER ──────────────────────────────────────────────────────────────────
module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { token, tier: requestedTier } = req.body || {};

  if (!token) return res.status(400).json({ error: 'No token provided' });

  const decoded = verifyToken(token);
  if (!decoded) return res.status(401).json({ error: 'Invalid or expired token' });

  const { tier } = decoded;

  // Return content up to and including the validated tier
  let html = '';
  if (tier >= 2) html += tier2HTML();
  if (tier >= 3) html += tier3HTML();

  return res.status(200).json({ html, tier });
};
