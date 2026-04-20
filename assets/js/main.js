// ─── NAV ACTIVE STATE ───────────────────────────────────────────────────────
(function(){
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const h = a.getAttribute('href') || '';
    if(h === path || (path === '' && h === 'index.html')) a.classList.add('active');
  });
})();

// ─── HAMBURGER ──────────────────────────────────────────────────────────────
const ham = document.querySelector('.hamburger');
const mob = document.querySelector('.mobile-menu');
if(ham && mob){
  ham.addEventListener('click', () => mob.classList.toggle('open'));
  document.addEventListener('click', e => {
    if(!ham.contains(e.target) && !mob.contains(e.target)) mob.classList.remove('open');
  });
}

// ─── SCROLL FADE ────────────────────────────────────────────────────────────
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => io.observe(el));
document.querySelectorAll('.stagger > *').forEach((el, i) => {
  el.style.transitionDelay = (i * 0.07) + 's';
  io.observe(el);
});

// ─── TIER MANAGEMENT ────────────────────────────────────────────────────────
const TIER_KEY  = 'mh_tier';
const TOKEN_KEY = 'mh_token';
const NAME_KEY  = 'mh_name';

function getTier()  { return parseInt(localStorage.getItem(TIER_KEY) || '0'); }
function getToken() { return localStorage.getItem(TOKEN_KEY) || ''; }

function saveTier(tier, token, name){
  localStorage.setItem(TIER_KEY,  String(tier));
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
  const cls   = t === 3 ? 'tier-course' : t === 2 ? 'tier-starter' : t === 1 ? 'tier-free' : 'tier-free';
  const label = t === 3 ? '⭐ Full Course' : t === 2 ? '✦ Starter Kit' : t === 1 ? '◎ Free Guide' : 'No Access';
  badge.className = 'nav-tier-badge ' + cls;
  badge.textContent = label;
}

// ─── CONGRATULATIONS POPUP ──────────────────────────────────────────────────
// Call showCongrats(title, message) from any page to show the popup.
// Automatically shown on key unlock and course completion.
function showCongrats(title, message){
  // Remove any existing popup
  const existing = document.getElementById('congrats-popup');
  if(existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'congrats-popup';
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:9999;
    display:flex;align-items:center;justify-content:center;
    background:rgba(0,0,0,0.45);backdrop-filter:blur(4px);
    padding:20px;animation:fadeInOverlay 0.3s ease;
  `;

  overlay.innerHTML = `
    <style>
      @keyframes fadeInOverlay{from{opacity:0}to{opacity:1}}
      @keyframes slideUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
      #congrats-card{animation:slideUp 0.35s ease;}
      .confetti-emoji{display:inline-block;animation:bounce 0.6s ease infinite alternate;}
      @keyframes bounce{from{transform:translateY(0)}to{transform:translateY(-6px)}}
    </style>
    <div id="congrats-card" style="
      background:#fff;border-radius:20px;
      padding:40px 36px;max-width:420px;width:100%;
      text-align:center;box-shadow:0 20px 60px rgba(0,0,0,0.18);
    ">
      <div style="font-size:3rem;margin-bottom:12px">
        <span class="confetti-emoji">🎉</span>
      </div>
      <h2 style="font-family:'Instrument Serif',serif;font-size:1.7rem;color:#111;margin-bottom:10px;line-height:1.2">${title}</h2>
      <p style="font-size:0.9rem;color:#6b7280;line-height:1.75;margin-bottom:24px">${message}</p>
      <button onclick="document.getElementById('congrats-popup').remove()" style="
        background:#2563eb;color:#fff;border:none;
        padding:11px 28px;border-radius:10px;
        font-family:'DM Sans',sans-serif;font-size:0.9rem;
        font-weight:600;cursor:pointer;
        transition:background 0.2s;
      " onmouseover="this.style.background='#1d4ed8'" onmouseout="this.style.background='#2563eb'">
        Continue →
      </button>
    </div>
  `;

  // Close on overlay click
  overlay.addEventListener('click', e => {
    if(e.target === overlay) overlay.remove();
  });

  document.body.appendChild(overlay);
}

// ─── COURSE PROGRESS PERSISTENCE ─────────────────────────────────────────────
// Each course page calls saveProgress(courseId, moduleIndex) when a module is opened.
// Progress is stored per-course in localStorage.
// Call loadProgress(courseId) to get a Set of completed module indices.

const PROGRESS_PREFIX = 'mh_progress_';

function saveProgress(courseId, moduleIndex){
  const key  = PROGRESS_PREFIX + courseId;
  const data = JSON.parse(localStorage.getItem(key) || '[]');
  if(!data.includes(moduleIndex)) data.push(moduleIndex);
  localStorage.setItem(key, JSON.stringify(data));
}

function loadProgress(courseId){
  const key  = PROGRESS_PREFIX + courseId;
  const data = JSON.parse(localStorage.getItem(key) || '[]');
  return new Set(data);
}

function clearProgress(courseId){
  localStorage.removeItem(PROGRESS_PREFIX + courseId);
}

// Make helpers globally available
window.getTier      = getTier;
window.getToken     = getToken;
window.saveTier     = saveTier;
window.clearTier    = clearTier;
window.updateNavBadge = updateNavBadge;
window.showCongrats   = showCongrats;
window.saveProgress   = saveProgress;
window.loadProgress   = loadProgress;
window.clearProgress  = clearProgress;
