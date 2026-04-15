// ── NAV ACTIVE STATE
(function(){
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const h = a.getAttribute('href') || '';
    if(h === path || (path === '' && h === 'index.html')) a.classList.add('active');
  });
})();

// ── HAMBURGER
const ham = document.querySelector('.hamburger');
const mob = document.querySelector('.mobile-menu');
if(ham && mob){
  ham.addEventListener('click', () => mob.classList.toggle('open'));
  document.addEventListener('click', e => {
    if(!ham.contains(e.target) && !mob.contains(e.target)) mob.classList.remove('open');
  });
}

// ── SCROLL FADE
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => io.observe(el));
document.querySelectorAll('.stagger > *').forEach((el, i) => {
  el.style.transitionDelay = (i * 0.07) + 's';
  io.observe(el);
});

// ── TIER MANAGEMENT
const TIER_KEY  = 'mh_tier';
const TOKEN_KEY = 'mh_token';
const NAME_KEY  = 'mh_name';

function getTier()  { return parseInt(localStorage.getItem(TIER_KEY)  || '1'); }
function getToken() { return localStorage.getItem(TOKEN_KEY) || ''; }
function getTierName(t){ return t === 3 ? 'Full Course' : t === 2 ? 'Starter Kit' : 'Free'; }

function saveTier(tier, token, name){
  localStorage.setItem(TIER_KEY,  tier);
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(NAME_KEY,  name);
}

function clearTier(){
  localStorage.removeItem(TIER_KEY);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(NAME_KEY);
}

function updateNavBadge(){
  const t = getTier();
  const badge = document.getElementById('tierBadge');
  if(!badge) return;
  const cls  = t === 3 ? 'tier-course' : t === 2 ? 'tier-starter' : 'tier-free';
  const label = t === 3 ? '⭐ Full Course' : t === 2 ? '✦ Starter Kit' : 'Free Access';
  badge.className = 'nav-tier-badge ' + cls;
  badge.textContent = label;
}

// ── COURSE MODULE DATA
window.COURSE_MODULES = [
  {
    tag: 'Module 01', title: 'Welcome. Let\'s Set You Up Right.',
    intro: 'Before strategy, let\'s make sure you understand what this is and why it works differently from everything else you\'ve tried.',
    blocks: [
      { h: 'What is a Faceless YouTube Channel?', p: 'A channel where you never appear on screen. No camera. Not even your own voice. Videos are made entirely with AI tools — and they can earn just as much as regular channels, often more. You\'ve already seen them: history, true crime, finance, animal facts — calm narrator, great visuals, no person on screen. That\'s a faceless channel.' },
      { h: 'Why most people fail at this', ul: ['They pick a topic that\'s already completely crowded','They copy other channels and compete head-to-head','They target everyone worldwide instead of high-paying countries','They use too many tools and overwhelm themselves','They chase quantity over quality and get flagged by YouTube'] },
      { h: 'What you need to start', ul: ['A laptop or computer (most steps work on phone too)','A free Google/Gmail account','Free accounts on Google Flow and CapCut','Grok account — free tier to test, $10/month to produce','A Claude.ai free account for the AI prompts in this system','$0 starting budget required','1–2 hours per day'] },
    ],
    tip: 'This system fixes all the reasons people fail. We start with Niche Bending — a strategy that puts you in a position where you\'re not competing with anyone. You\'re creating something that simply doesn\'t exist yet in that form.'
  },
  {
    tag: 'Module 02 — Core Strategy', title: 'Niche Bending — The Heart of Everything',
    intro: 'This is the main strategy. Everything else supports it. Understanding Niche Bending is the difference between a channel that grows and one that disappears after 10 uploads.',
    formula: { eq: ['Market', '+', 'Format', '=', 'Your Bent Niche'], note: 'A Market is the topic. A Format is the video style. Combine a proven viral format with a market where nobody is using it yet — that\'s your Niche Bend.' },
    blocks: [
      { h: 'What is a Market?', p: 'A stable topic with an established audience. Examples: History, animals, true crime, personal finance, science, psychology, technology, food.' },
      { h: 'What is a Format?', p: 'The delivery structure. Formats go viral then spread to new markets. Your job: find a format that blew up in one market but hasn\'t reached yours yet.', ul: ['"Every [X] Explained" series', '"Ranking every [X] from worst to best"', '"If [X] does [Y], here\'s what it means"', '100-day challenge style', 'True crime storytelling applied to a new topic', 'Tier lists (huge in gaming, rare in history/finance)'] },
      { h: 'How to find format ideas', ul: ['Watch viral videos outside your market for one week','Ask yourself: what is the structure here, not the topic?','Save the format container — ignore the subject','Look for formats common in gaming/sports but missing in your market'] },
    ],
    warn: 'Never steal topics from existing channels. YouTube puts your video head-to-head with theirs. The idea must be yours — only the format is borrowed from another market.'
  },
  {
    tag: 'Module 03 — Core Strategy', title: 'Script Bending — Writing Scripts That Go Viral',
    intro: 'Once you have your bent niche, you need videos people watch all the way through. Script Bending gives you a system for writing compelling scripts — even if you\'ve never written one.',
    formula: { eq: ['Original Idea', '+', 'Proven Framework', '=', 'Viral Script'], note: 'The idea must be yours. The framework is borrowed. That\'s the whole system.' },
    blocks: [
      { h: 'Viral frameworks to use', ul: ['"Every __ __ Explained" — any market with a list of subjects', '"The Dark Truth About __" — history, finance, food, companies', '"If your __ does __, it means..." — psychology, pets, human behavior', '"__ vs __ — Which Is More __?" — comparisons in any market', '"I Ranked Every __ From Worst to Best" — tier list format'] },
      { h: 'AIDA Script Structure', ul: ['A — Attention (0–30 sec): Open with the most compelling fact or question. No "welcome back." Get to the point immediately.', 'I — Interest (30 sec–2 min): Context and why it matters. 2–3 data points or examples that make them curious.', 'D — Desire (2–7 min): Main content. Stories, facts, rankings. Pattern interrupt every 60–90 seconds.', 'A — Action (last 30 sec): Ask a question for comments. Recommend your next video. Keep it natural.'] },
      { h: 'Script writing rules for beginners', ul: ['Write like you\'re explaining to a 12-year-old — simple words', 'Short sentences. Max 20 words each.', 'Never start with "Hey guys, welcome back to my channel"', 'Read aloud before finalizing — if it sounds weird, rewrite it', 'Add [PAUSE] markers between sections for AI voice tools'] },
    ],
    tip: 'The Script Writer prompt in the AI Tools section walks Claude through learning from competitor transcripts, then generates a full script plus line-by-line image and video prompts for your exact topic.'
  },
  {
    tag: 'Module 04', title: 'Target USA, UK, Canada & Australia',
    intro: 'This is the secret most new creators completely ignore. Where your audience comes from determines how much you earn per 1,000 views — and the difference is massive.',
    blocks: [
      { h: 'What is RPM?', p: 'Revenue Per Mille — how much you earn per 1,000 views. It depends on your niche AND your viewers\' location. A USA viewer in the finance niche can be worth 15–30× more than a viewer from elsewhere.' },
      { h: 'How to attract USA/UK viewers — practical steps', ul: ['English-language content only — natural, clear American or British English', 'Topics familiar to English speakers — American history, British royals, science for English-speaking audiences', 'Upload when USA is awake — 9 AM–2 PM Eastern Time (US East Coast)', 'Reference familiar places and events — mention US cities, British culture naturally in scripts', 'Use an American or British AI voice — match your target audience', 'Set channel location to United States in YouTube Studio → Settings → Channel → Basic Info'] },
    ],
    tip: 'The Shorts path to monetization (10M views in 90 days) is often faster than long-form. Start with Shorts, get monetized, then add long-form for higher RPM. Don\'t try both at once in the beginning.'
  },
  {
    tag: 'Module 05', title: 'Setting Up Your Channel',
    intro: 'Do this once. Takes under an hour. Setting it up correctly from the beginning saves major headaches later.',
    blocks: [
      { h: 'Step-by-step setup', ul: ['1. Create a Google Account — use a brand-related name, not your personal name', '2. Create YouTube Channel — youtube.com → profile → "Create a channel." Short name, under 3 words.', '3. Design Channel Art in Canva (free) — banner 2560×1440px. 1–2 colors, clean and professional.', '4. Write Channel Description — first 150 characters show in YouTube search. Include your topic and value.', '5. Set Channel Location to United States — YouTube Studio → Settings → Channel → Basic Info.', '6. Create 3 Videos Before Going Public — don\'t launch with 1 video. Batch first, then publish.'] },
    ],
    tip: 'Create playlists from day 1. Group videos by topic. Playlists autoplay and extend watch sessions — critical for hitting the 4,000 watch hours needed for monetization.'
  },
  {
    tag: 'Module 06', title: 'AI Image Generation with Google Flow',
    intro: 'Google Flow is a free AI image generator from Google Labs. Creates high-quality, cinematic images from text prompts — perfect for your video visuals without a camera or designer.',
    blocks: [
      { h: 'Why Google Flow?', ul: ['Completely free — no subscription required', 'High-quality realistic and cinematic images', 'Works directly in your browser — no download needed', 'Consistent output when you reuse similar prompt structures', 'Visit: labs.google/fx/tools/flow'] },
      { h: 'Image prompt formula', p: '[Subject] + [Setting] + [Mood/Lighting] + [Style]\n\nExample: "Ancient Roman soldiers marching through a grand stone forum, golden sunset lighting, dust in the air, cinematic hyperrealistic photography style"' },
      { h: 'Workflow', ul: ['Generate 12–20 images per video', 'Save images organized by scene number (scene-01.jpg, scene-02.jpg)', 'Use the Script Writer AI prompt — it generates ready image prompts for you', 'Keep a "prompt library" of your best prompts for consistent channel style'] },
    ],
    tip: 'The Script Writer prompt generates line-by-line Google Flow image prompts for every scene — you won\'t need to write them yourself. Just paste each prompt into Google Flow.'
  },
  {
    tag: 'Module 07', title: 'AI Video Generation with Grok',
    intro: 'Grok (by xAI) turns text prompts or images into cinematic short video clips. This takes your channel to a completely different visual level.',
    blocks: [
      { h: 'Why Grok?', ul: ['Generates realistic cinematic clips from text or image input', '$10/month plan gives enough credits to start', '$30/month unlocks higher limits and better video quality', 'Pairs perfectly with Google Flow — generate image, then animate it', 'Visit: grok.com'] },
      { h: 'Two modes', ul: ['Text-to-video: describe a scene and get a clip (3–8 seconds)', 'Image-to-video: upload a Google Flow image and tell Grok how to animate it — most control'] },
      { h: 'Smart production tip', p: 'You don\'t need video clips for every scene. Mix: key moments get Grok video clips, other scenes use animated Google Flow images with zoom in CapCut. Cuts cost and production time significantly.' },
    ],
    warn: 'Avoid generating video clips depicting real people\'s faces or voices. Grok\'s terms prohibit deepfakes and YouTube\'s 2026 inauthentic content policy flags synthetic portrayals of real individuals.'
  },
  {
    tag: 'Module 08', title: 'Editing Your Video in CapCut',
    intro: 'CapCut is free, beginner-friendly, and produces professional-looking YouTube videos. This is where Google Flow images, Grok clips, and your AI voice all come together.',
    blocks: [
      { h: 'Step-by-step editing', ul: ['1. Download CapCut Desktop (capcut.com). New Project → canvas: 1920×1080 for long-form, 1080×1920 for Shorts.', '2. Import AI voiceover first — drag MP3 to audio track. This is your foundation.', '3. Add images and video clips timed to narration. Images: 3–5 seconds each.', '4. Add zoom animation to every still image: Animation → In → Zoom In, duration 0.5s.', '5. Auto-generate captions: Text → Auto Captions. Fix errors. White text, dark outline.', '6. Add background music at 10–15% volume — felt but not heard.', '7. Export at 1080p.'] },
    ],
    tip: 'Captions alone boost watch time by 20–30%. Many people watch YouTube with sound off — especially on mobile. Auto-captions in CapCut take 30 seconds and are worth every second.'
  },
  {
    tag: 'Module 09', title: 'Posting Strategy — When, How Often, and How',
    intro: 'Publishing consistently is one of the biggest signals you send to YouTube\'s algorithm. Consistency doesn\'t mean every day — it means a schedule you can actually keep.',
    blocks: [
      { h: 'Two paths to monetization — choose one to start', ul: ['Shorts path: 1,000 subs + 10M Shorts views in 90 days → fastest (Marcus\'s method)', 'Long-form path: 1,000 subs + 4,000 watch hours in 12 months → slower but higher RPM', 'Start with one. Don\'t split energy at the beginning.'] },
      { h: 'Recommended posting schedules', ul: ['YouTube Shorts: 1–2 per day, every day, at 9 AM or 7 PM EST', 'Long-form (starting out): 2 per week, Tue + Thu, at 10 AM–12 PM EST', 'Long-form (established): 3 per week, Mon + Wed + Fri', 'Mixing both: 1 long-form + 3 Shorts per week'] },
      { h: 'Batch production — the secret to consistency', ul: ['Write all scripts → generate all voices → collect all images → edit all → schedule all', 'Batch 4–5 videos in one session — same time as 1–2 individually but gives a week\'s content', 'Use YouTube Studio\'s Schedule feature to auto-publish at optimal times'] },
      { h: 'Engagement rules', ul: ['Reply to every comment in the first 24 hours after publishing', 'Pin a question as your top comment to start conversations', 'At the end of every video, ask a specific question', 'Use Community posts between uploads to stay visible'] },
    ],
    warn: 'Don\'t post more than 2 videos per day. Sudden bursts of high-frequency uploading is one of the patterns YouTube\'s inauthentic content system flags. A human pace = 1–2 per day maximum.'
  },
  {
    tag: 'Module 10', title: 'YouTube Growth Strategy',
    intro: 'Great content alone isn\'t enough. You need to give YouTube the right signals so it recommends your videos to new viewers.',
    blocks: [
      { h: 'Title formula', ul: ['Front-load the keyword: "Ancient Rome\'s Most Brutal Emperors Ranked" not "Ranking the Emperors of Ancient Rome"', 'Use your Script Bending framework in the title', 'Keep under 60 characters so nothing gets cut off in search', 'Numbers work well: "The 7 Most Deadly Battles in History — Explained"'] },
      { h: 'Thumbnail rules', ul: ['Use one of your Google Flow images as the base', 'Add 3–4 bold words — readable on a phone at thumbnail size', 'High contrast: white text on dark image, or black text on light', 'Create in Canva (free) — they have YouTube thumbnail templates'] },
      { h: 'Key metrics in YouTube Studio', ul: ['CTR: Target 4–8%. Below 3% means thumbnail/title needs work.', 'AVD: Target 40%+ on long-form. Below 30% = hook or pacing problem.', 'Traffic source: "Browse features" = algorithm is recommending you. Aim for this.', 'Subscriber source: which video gained the most subs? Make more like it.'] },
    ],
    tip: 'Free tools to stack: VidIQ (keyword research, competitor tracking) and TubeBuddy (A/B thumbnail testing). Both have free tiers. Use them to find keywords your niche audience searches for.'
  },
  {
    tag: 'Module 11', title: 'Getting Monetized & Starting to Earn',
    intro: 'Here\'s exactly how YouTube monetization works in 2026 and how to reach it as fast as possible.',
    blocks: [
      { h: 'YouTube Partner Program (YPP) — 2026 Requirements', ul: ['Full ad revenue: 1,000 subscribers + 4,000 public watch hours (last 12 months) OR 10M Shorts views (last 90 days)', 'Early access tier: 500 subs + 3,000 watch hours OR 3M Shorts views → unlocks memberships, Super Thanks', 'Linked Google AdSense account', 'No active community strikes', 'Channel at least 30 days old'] },
      { h: 'Revenue streams beyond ads', ul: ['Affiliate marketing — from day 1, no subscriber minimum: add affiliate links in descriptions', 'Channel memberships (500 subs+): monthly fee for exclusive content', 'Super Thanks: viewers tip you directly on any video', 'Brand sponsorships: companies reach out once you have consistent 10K+ monthly views', 'Digital products: sell templates, guides, or mini-courses in your niche'] },
    ],
    tip: 'Don\'t wait for YPP. From video 1, add 2–3 relevant affiliate links in your description. Even 100 views a day in a finance or tech niche can generate $30–$80/month in affiliate income while you grow toward monetization.'
  },
  {
    tag: 'Module 12 — Must Read', title: 'Stay Safe from YouTube\'s AI Policy',
    intro: 'In July 2025, YouTube updated its policy. In January 2026, thousands of channels were deleted overnight. Here\'s what happened — and how to make sure it never happens to you.',
    blocks: [
      { h: 'What got channels deleted — the exact patterns', ul: ['AI voice over stock footage with zero human editorial input', 'Same script template used 50+ times — only the title changed', 'Uploading 5–12 videos per day (impossible for a human to produce)', 'Reddit story narration with no original commentary added', 'AI-generated "news" presented as real journalism'] },
      { h: 'The 5 rules to stay safe', ul: ['1. Add your editorial layer — fact-check, adjust framing, rewrite anything generic', '2. Vary your production — don\'t use the same intro, music, and thumbnail design every video', '3. Upload at a human pace — maximum 2 videos per day', '4. Label synthetic content when required — use YouTube Studio\'s "Altered Content" label', '5. Quality over quantity — one video with 60% AVD beats 10 videos with 15% AVD'] },
    ],
    tip: 'The test: "Could a machine have produced this with zero human judgment?" If yes — it\'s inauthentic. If your topic selection, script voice, image choices, and pacing required human thinking — you\'re safe.'
  },
];

// ── COURSE MODULE RENDERER (used in System 3)
window.cDone = new Set();
window.cGo = function(i){
  i = parseInt(i);
  const area = document.getElementById('courseModules');
  if(!area) return;
  // Render all modules if not yet done
  if(!area.dataset.rendered){
    area.dataset.rendered = '1';
    COURSE_MODULES.forEach((m, idx) => {
      const d = document.createElement('div');
      d.className = 'cm-section' + (idx === 0 ? ' active' : '');
      d.id = 'cm' + idx;
      let inner = `<div class="cm-tag">${m.tag}</div><h2 class="cm-title">${m.title}</h2><p class="cm-intro">${m.intro}</p>`;
      if(m.formula){
        inner += `<div class="formula-strip"><div class="feq">${m.formula.eq.map((p,pi)=>pi%2===0?`<span class="hl">${p}</span>`:p).join(' ')}</div><p>${m.formula.note}</p></div>`;
      }
      (m.blocks||[]).forEach(b => {
        inner += `<div class="cb"><h3>${b.h}</h3>`;
        if(b.p) inner += `<p style="white-space:pre-line">${b.p}</p>`;
        if(b.ul) inner += `<ul>${b.ul.map(x=>`<li>${x}</li>`).join('')}</ul>`;
        inner += `</div>`;
      });
      if(m.tip)  inner += `<div class="tip"><span>💡</span><p>${m.tip}</p></div>`;
      if(m.warn) inner += `<div class="warn"><span>⚠️</span><p>${m.warn}</p></div>`;
      inner += `<div class="cm-nav"><button class="btn btn-secondary btn-sm" ${idx===0?'style="visibility:hidden"':''} onclick="cGo(${idx-1})">← Previous</button><button class="btn btn-primary btn-sm" onclick="cGo(${idx+1<COURSE_MODULES.length?idx+1:idx})">${idx+1<COURSE_MODULES.length?'Next Module →':'Done ✓'}</button></div>`;
      d.innerHTML = inner;
      area.appendChild(d);
    });
  }
  document.querySelectorAll('.cm-section').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('cm'+i);
  if(target) target.classList.add('active');
  document.querySelectorAll('.csb-nav a').forEach(a => a.classList.remove('active'));
  const lnk = document.querySelector(`[data-cm="${i}"]`);
  if(lnk) lnk.classList.add('active');
  cDone.add(i);
  cDone.forEach(n => {
    const el = document.querySelector(`[data-cm="${n}"]`);
    if(el && n !== i) el.classList.add('done');
  });
  const pct = Math.round((cDone.size / COURSE_MODULES.length) * 100);
  const pctEl = document.getElementById('cpct');
  const pfill = document.getElementById('cpfill');
  if(pctEl) pctEl.textContent = pct + '%';
  if(pfill) pfill.style.width = pct + '%';
  const mob = document.querySelector('.mob-course-select');
  if(mob) mob.value = i;
  // Scroll course area to top
  const ca = document.getElementById('courseContentArea');
  if(ca) ca.scrollTop = 0;
};

// ── INNER PROMPT TABS
window.switchPTab = function(name){
  document.querySelectorAll('.ptab-inner').forEach((b,i)=>{
    b.classList.toggle('active',(i===0&&name.includes('rater'))||(i===1&&name.includes('script')));
  });
  ['rater2','script2'].forEach(id => {
    const el = document.getElementById('ptab-'+id);
    if(el) el.classList.toggle('active', 'ptab-'+id === 'ptab-'+name);
  });
};

// ── COPY INNER PROMPT
window.copyInner = function(id, btnRef){
  const text = document.getElementById(id)?.textContent || '';
  const btn = document.querySelector(`[onclick="copyInner('${id}','this')"]`);
  navigator.clipboard.writeText(text).then(()=>{
    if(btn){ btn.textContent='✓ Copied!'; btn.classList.add('copied'); setTimeout(()=>{ btn.textContent='Copy'; btn.classList.remove('copied'); },2000); }
  });
};
