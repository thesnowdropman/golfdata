// App shell: top bar, bottom tabs (Home · Courses · Stats · BGA), the Home handicap card
// and score record, and the inline BGA page. The original sections are moved into the
// tabs as-is, so every id and handler in tracker.js and bga.js keeps working.
(function(){
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const wrap = document.querySelector('.wrap');
  if(!wrap){ document.documentElement.classList.remove('app-loading'); return; }
  document.documentElement.classList.add('app');

  // ---------- Shell ----------
  const TABS = [
    {id:'home',    label:'Home',    icon:'<path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>'},
    {id:'courses', label:'Courses', icon:'<path d="M7 21V3l10 4-10 4"/><path d="M4 21h10"/>'},
    {id:'stats',   label:'Stats',   icon:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'},
    {id:'bga',     label:'BGA',     icon:'<path d="M7 4h10v4a5 5 0 0 1-10 0z"/><path d="M7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4M12 13v4M8 21h8M9 17h6"/>'}
  ];
  const bar = document.createElement('header');
  bar.className = 'app-top';
  bar.innerHTML = `<div class="app-top-in"><span class="app-brand">Ange's Golf</span><span class="app-tabname" id="appTabName">Home</span></div>`;
  document.body.insertBefore(bar, document.body.firstChild);
  // Heron from the original header, top right
  const heron = document.querySelector('img[alt="Heron"]');
  if(heron){ const h = heron.cloneNode(); h.className = 'app-heron'; h.removeAttribute('style'); bar.querySelector('.app-top-in').appendChild(h); }

  const panels = {};
  TABS.forEach(t => { const d = document.createElement('div'); d.className = 'app-panel'; d.id = 'tab-'+t.id; d.hidden = true; panels[t.id] = d; });

  const nav = document.createElement('nav');
  nav.className = 'app-nav';
  nav.setAttribute('aria-label', 'Sections');
  nav.innerHTML = TABS.map(t => `<button type="button" data-tab="${t.id}"><svg viewBox="0 0 24 24" aria-hidden="true">${t.icon}</svg><span>${t.label}</span></button>`).join('');
  document.body.appendChild(nav);

  // Find the old sections by a child id, then move them into their tabs
  const sec = id => { const el = $(id); return el ? el.closest('section') : null; };
  const sChart = sec('diffChart'), sFuture = sec('futureRoundsList'), sHistory = sec('score-table'), sCourses = sec('course-record-table');
  const strip = wrap.querySelector('.strip'), foot = $('rounds-footnote');
  const bgaLink = $('backyardOpenLink'), stLink = $('showAllStatsLink');

  // Home
  const home = panels.home;
  home.innerHTML = `
    <div class="hc-card" id="hcCard"></div>
    <div class="app-actions">
      <button type="button" class="app-btn primary" id="appPost">+ Post Score</button>
      <button type="button" class="app-btn bga" id="appPlay"><img src="bga.png" alt="" onerror="this.remove()">Play BGA</button>
    </div>
    <div id="homeUpcoming"></div>
    <div class="app-sec-h"><h2>Round History</h2><span class="app-cap" id="recCount"></span></div>
    <div class="seg" id="recSeg"><button type="button" data-v="recent" class="on">Recent 20</button><button type="button" data-v="all">All</button><button type="button" data-v="best">Best</button></div>
    <div class="rec-list" id="recList"></div>
    <button type="button" class="rec-more" id="recMore" hidden>Show more</button>`;
  if(sFuture){ home.querySelector('#homeUpcoming').appendChild(sFuture); sFuture.classList.add('app-card'); const h = sFuture.querySelector('h2'); if(h) h.lastChild.textContent = 'Upcoming'; }
  if(sHistory){ sHistory.classList.add('app-legacy'); home.appendChild(sHistory); }

  // Courses
  if(sCourses){ panels.courses.appendChild(sCourses); sCourses.classList.add('app-card'); }
  if(bgaLink) bgaLink.classList.add('app-legacy');

  // Stats
  const st = panels.stats;
  st.innerHTML = `<div class="app-sec-h"><h2>Handicap</h2></div>`;
  if(strip) st.appendChild(strip);
  if(foot) st.appendChild(foot);
  if(sChart){ st.appendChild(sChart); sChart.classList.add('app-card'); }
  const season = document.createElement('div'); season.id = 'seasonCard'; st.appendChild(season);
  if(stLink){ const box = document.createElement('div'); box.className = 'app-card app-linkcard'; box.appendChild(stLink); st.appendChild(box); }

  // BGA
  panels.bga.innerHTML = `<div id="bgaPage"></div>`;

  // Old header and sky are replaced by the top bar
  const hero = wrap.querySelector('header.hero'); if(hero) hero.classList.add('app-legacy');
  Object.values(panels).forEach(p => wrap.appendChild(p));
  // Courses tab: move the "All Courses" link under the table (it lives inside the section already)

  // ---------- Tab switching ----------
  let current = 'home';
  try{ const saved = localStorage.getItem('anges-golf-tab'); if(panels[saved]) current = saved; }catch(e){}
  function show(id){
    current = id;
    TABS.forEach(t => { panels[t.id].hidden = t.id !== id; });
    nav.querySelectorAll('button').forEach(b => b.setAttribute('aria-current', b.dataset.tab === id ? 'page' : 'false'));
    $('appTabName').textContent = id === 'home' ? '' : TABS.find(t=>t.id===id).label;
    try{ localStorage.setItem('anges-golf-tab', id); }catch(e){}
    if(id === 'bga') renderBga();
    if(id === 'stats'){ try{ renderCharts(currentTheme); }catch(e){} }
    window.scrollTo(0, 0);
  }
  nav.addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if(b) show(b.dataset.tab); });

  // ---------- Buttons ----------
  const post = () => { const b = $('addRoundBtn'); if(b) b.click(); };
  $('appPost').onclick = post;
  $('appPlay').onclick = post;

  // ---------- Helpers ----------
  const fmtSigned = v => { const r = Math.round(v*10)/10; return r === 0 ? '0.0' : (r > 0 ? '+' : '−') + Math.abs(r).toFixed(1); };
  const gross = r => parseInt(String(r.score), 10);
  const courseName = c => c.replace(/\s\(([^)]*)\)\s*$/, '');
  const courseTag = c => { const m = c.match(/\s\(([^)]*)\)\s*$/); return m && m[1] !== '9' && m[1] !== '18' ? m[1] : ''; };

  function spark(points, w, h){
    if(points.length < 2) return '';
    const lo = Math.min(...points), hi = Math.max(...points), span = (hi - lo) || 1;
    const xy = points.map((v,i) => [ (i/(points.length-1))*(w-8)+4, 4 + (1-(v-lo)/span)*(h-8) ]);
    const last = xy[xy.length-1];
    return `<svg class="hc-spark" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-hidden="true">
      <polyline fill="none" points="${xy.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join(' ')}"/>
      <circle cx="${last[0].toFixed(1)}" cy="${last[1].toFixed(1)}" r="4"/></svg>`;
  }

  // ---------- Home: handicap card ----------
  function renderCard(){
    if(typeof trend === 'undefined' || !trend || !trend.length) return;
    const idx = trend[trend.length-1].index;
    // Low HI from calculated values only (a manual index isn't part of your history)
    const calcNow = window.whsCalc && whsCalc.index != null ? whsCalc.index : idx;
    const low = Math.min(...trend.slice(0,-1).map(p=>p.index), calcNow);
    const per30 = reg ? reg.slope*30 : 0;
    const dir = per30 < -0.05 ? 'down' : per30 > 0.05 ? 'up' : 'flat';
    let next = '', sinceJul = '';
    const before = trend.filter(p => p.date < '2026-07-01');
    const base = before.length ? before[before.length-1].index : trend[0].index;
    const chg = Math.round((idx - base)*10)/10;
    const sDir = chg < 0 ? 'down' : chg > 0 ? 'up' : 'flat';
    sinceJul = `<div><span class="app-cap">Since Jul '26</span><b class="hc-${sDir}">${sDir==='down'?'▼ ':sDir==='up'?'▲ ':''}${Math.abs(chg).toFixed(1)}</b></div>`;
    try{
      const f = [...futureRounds].sort((a,b)=>futureSortKey(a)-futureSortKey(b))[0];
      if(f){ const e = computeExpScoreFor(f.rating, f.slope, f.holes); if(e != null) next = `<div><span class="app-cap">Next exp.</span><b>${e}</b><small>${esc(courseName(f.course).replace(/\s+\b(golf|country)\b.*$/i,''))}</small></div>`; }
    }catch(e){}
    $('hcCard').innerHTML = `
      <div class="app-cap">Handicap Index${whsCalc && whsCalc.override != null ? ' · Manual' : ''}</div>
      <div class="hc-row"><div class="hc-big">${idx.toFixed(1)}</div>${spark(trend.slice(-30).map(p=>p.index), 140, 56)}</div>
      <div class="hc-sub">
        <div><span class="app-cap">Low HI</span><b>${low.toFixed(1)}</b></div>
        <div><span class="app-cap">30 days</span><b class="hc-${dir}">${dir==='down'?'▼ ':dir==='up'?'▲ ':''}${Math.abs(per30).toFixed(1)}</b></div>
        ${sinceJul}
        ${next}
      </div>`;
  }

  // ---------- Handicap screen: the rounds behind the index, and a manual index ----------
  function openHandicap(){
    const C = window.whsCalc; if(!C || !C.recent.length) return;
    const rows = C.recent.map(z => ({...z, v: Math.round((z.d + z.adj)*10)/10}));
    const used = new Set([...rows].sort((a,b)=>a.v-b.v).slice(0, C.k));
    const sumUsed = [...used].reduce((s,z)=>s+z.v, 0);
    const list = [...rows].reverse().map(z => {
      const r = z.r, d = new Date(r.date+'T00:00:00').toLocaleDateString('en-US',{month:'short',day:'numeric'});
      // Show the work: 9-hole conversion with the index at that time, and any exceptional-score cut
      const parts = [];
      if(z.raw9 != null && z.hi != null){
        const exp = Math.round((0.52*z.hi + 1.2)*10)/10;
        parts.push(`9-hole diff ${z.raw9.toFixed(1)} + expected ${exp.toFixed(1)}<br>(HI ${z.hi.toFixed(1)} × 0.52 + 1.2) = ${z.d.toFixed(1)}`);
      } else if(r.holes===9) parts.push('first rounds: own diff');
      if(z.cut) parts.push(`exceptional: ${(z.hi - z.d).toFixed(1)} below HI ${z.hi.toFixed(1)} → −${z.cut}.0 to last 20`);
      if(z.adj) parts.push(`${z.d.toFixed(1)} − ${Math.abs(z.adj).toFixed(1)} exceptional = ${z.v.toFixed(1)}`);
      const note = parts.join('<br>');
      return `<tr class="${used.has(z) ? 'tn-you' : ''}"><td class="tn-name tn-rcol">${esc(courseName(r.course).replace(/\s+[-–]\s+.*$/,'').replace(/\s+\b(golf|country)\b.*$/i,''))}<small>${d} · ${esc(String(r.score).replace(/\D+$/,''))}</small></td><td class="tn-n">${r.diff.toFixed(1)}</td><td class="tn-n"><b>${used.has(z) ? '✓ ' : ''}${z.v.toFixed(1)}</b>${note ? `<small style="display:block;font-weight:400;font-size:10px;line-height:1.3;color:var(--mute);white-space:nowrap">${note}</small>` : ''}</td></tr>`;
    }).join('');
    const ov = C.override;
    document.getElementById('detailMiiRow').innerHTML = ''; document.getElementById('detailMiiRow').style.display = 'none';
    document.getElementById('detailTitle').innerHTML = `<span id="courseTitleText">Handicap Index</span><span class="crr-rs title-subline">USGA World Handicap System</span>`;
    document.getElementById('detailTitle').style.marginTop = '0';
    document.getElementById('detailBody').innerHTML = `
      <div class="strip" style="margin:6px 0 12px;">
        <div class="cell flag"><div class="num">${(ov != null ? ov : C.index).toFixed(1)}</div><div class="lbl">${ov != null ? 'Manual index' : 'Your index'}</div></div>
        <div class="cell"><div class="num">${C.index.toFixed(1)}</div><div class="lbl">Calculated</div></div>
        <div class="cell"><div class="num">${C.k} of ${C.recent.length}</div><div class="lbl">Rounds counted</div></div>
      </div>
      <p class="note" style="margin:0 0 10px;">Average of your ${C.k} lowest of the last ${C.recent.length}: ${sumUsed.toFixed(1)} ÷ ${C.k} = ${(sumUsed/C.k).toFixed(2)}${C.plus ? ` ${C.plus>0?'+':'−'} ${Math.abs(C.plus).toFixed(1)} (USGA adjustment for under 20 rounds)` : ''} → <b>${C.index.toFixed(1)}</b></p>
      <div class="tn-boardwrap"><table class="tn-board">
        <thead><tr><th>Round</th><th class="tn-n">Diff</th><th class="tn-n">Counts as</th></tr></thead>
        <tbody>${list}</tbody></table></div>
`;
    detailOverlay.classList.add('open'); detailOverlay.scrollTop = 0;
    navStack = []; try{ updateBackButton(); }catch(e){}
  }
  $('hcCard').addEventListener('click', e => { if(!e.target.closest('a,button')) openHandicap(); });

  // ---------- Home: score record ----------
  let recView = 'recent', recOpen = false;
  try{ const v = localStorage.getItem('anges-golf-rec'); if(v) recView = v; }catch(e){}
  function renderRecord(){
    if(typeof rounds === 'undefined') return;
    const byDate = [...rounds].sort((a,b)=>new Date(b.date)-new Date(a.date));
    let list = recView === 'recent' ? byDate.slice(0, 20) : recView === 'best' ? [...rounds].sort((a,b)=>a.diff-b.diff) : byDate;
    $('recCount').textContent = `${rounds.length} rounds posted`;
    $('recSeg').querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.v === recView));
    const cap = 10, more = list.length > cap && !recOpen;
    const shown = more ? list.slice(0, cap) : list;
    const best = Math.min(...rounds.map(r=>r.diff));
    $('recList').innerHTML = shown.map(r => {
      const d = new Date(r.date+'T00:00:00');
      const par = (typeof PAR_BY_COURSE !== 'undefined') ? PAR_BY_COURSE[r.course] : null;
      const g = gross(r), toPar = par != null ? g - par : null;
      let ex = null; try{ ex = typeof expScoreAtTimeOf === 'function' ? expScoreAtTimeOf(r) : null; }catch(e){}
      const sgn = v => v===0 ? 'E' : (v>0?'+':'')+v;
      const vsTxt = [toPar != null ? sgn(toPar) : null, ex != null && !isNaN(g) ? sgn(g - ex) : null].filter(x=>x!=null).join('/');
      const tag = courseTag(r.course);
      return `<button type="button" class="rec-row" data-i="${rounds.indexOf(r)}">
        <span class="rec-d"><b>${d.getDate()}</b>${d.toLocaleDateString('en-US',{month:'short'}).toUpperCase()}${recView!=='recent' ? `<i>${String(d.getFullYear()).slice(2)}</i>` : ''}</span>
        <span class="rec-c">${esc(courseName(r.course))}<small><span class="rec-h h${r.holes}">${r.holes}</span>${tag ? esc(tag)+' · ' : ''}${Number(r.rating).toFixed(1)}/${r.slope}</small></span>
        <span class="rec-g">${isNaN(g) ? esc(r.score) : g}${vsTxt ? `<small>${vsTxt}</small>` : ''}</span>
        <span class="rec-df${r.diff===best?' best':''}">${r.diff.toFixed(1)}</span>
      </button>`;
    }).join('') || '<p class="note" style="padding:14px;margin:0;">No rounds yet.</p>';
    $('recMore').hidden = !(list.length > cap);
    $('recMore').textContent = recOpen ? 'Show less' : `Show ${list.length - cap} more`;
  }
  $('recSeg').addEventListener('click', e => { const b = e.target.closest('[data-v]'); if(!b) return; recView = b.dataset.v; recOpen = false; try{ localStorage.setItem('anges-golf-rec', recView); }catch(err){} renderRecord(); });
  $('recMore').onclick = () => { recOpen = !recOpen; renderRecord(); };
  $('recList').addEventListener('click', e => { const b = e.target.closest('[data-i]'); if(!b) return; navStack = []; openDetail(parseInt(b.dataset.i, 10)); });

  // ---------- Stats: season card ----------
  function renderSeason(){
    if(typeof rounds === 'undefined' || !rounds.length) return;
    const last20 = [...rounds].sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,20);
    const avg = last20.reduce((s,r)=>s+r.diff,0)/last20.length;
    const best9 = rounds.filter(r=>r.holes===9).map(gross).filter(n=>!isNaN(n));
    const best18 = rounds.filter(r=>r.holes===18).map(gross).filter(n=>!isNaN(n));
    const courses = new Set(rounds.map(r=>courseName(r.course).trim().toLowerCase())).size;
    const tile = (n, l) => `<div class="cell"><div class="num">${n}</div><div class="lbl">${l}</div></div>`;
    $('seasonCard').innerHTML = `<div class="app-sec-h"><h2>Scoring</h2></div>
      <div class="strip app-tiles">${tile(Math.min(...rounds.map(r=>r.diff)).toFixed(1), 'Best diff')}${tile(avg.toFixed(1), 'Avg diff, last 20')}${tile(rounds.length, 'Rounds')}</div>
      <div class="strip app-tiles">${tile(best9.length ? Math.min(...best9) : '—', 'Best 9')}${tile(best18.length ? Math.min(...best18) : '—', 'Best 18')}${tile(courses, 'Courses')}</div>`;
  }

  // ---------- BGA page ----------
  let rankOpen = false;
  function renderBga(){
    const B = window.BGA, page = $('bgaPage');
    if(!B || !page || typeof rounds === 'undefined') return;
    const evs = rounds.filter(r=>r.event && Array.isArray(r.event.board)).sort((a,b)=>new Date(b.date)-new Date(a.date) || (b.event.seed||0)-(a.event.seed||0));
    const pos = r => String((B.rankBoard(r.event).find(x=>x.you)||{}).pos);
    const won = t => evs.filter(r=>r.event.tier===t && pos(r)==='1').length;
    const E = B.eloRatings();

    // Latest event leaderboard (top 5, plus you if lower)
    let latest = '';
    if(evs.length){
      const r = evs[0], b = B.rankBoard(r.event), name = B.eventName(r);
      const top = b.slice(0, 5), me = b.find(x=>x.you);
      const rowsFor = list => list.map(x => `<button type="button" class="lb-row${x.you?' me':''}" data-bga="${x.you ? 'round' : 'player'}" data-name="${esc(x.you?'You':x.n)}" data-key="${esc(roundKey(r))}">
          <span class="lb-pos">${esc(x.pos)}</span>
          <span class="lb-nm">${x.you ? '<b>You</b>' : esc(x.n)}<small>${x.you ? 'Index '+Number(r.event.index).toFixed(1) : 'HC '+x.h}${E.R[x.you?'You':x.n]!=null ? ' · Elo '+Math.round(E.R[x.you?'You':x.n]) : ''}</small></span>
          <span class="lb-tp${x.vs<0?' u':''}">${x.vs===0?'E':(x.vs>0?'+':'')+x.vs}</span>
          <span class="lb-tot">${x.gross}</span></button>`).join('');
      const d = new Date(r.date+'T00:00:00').toLocaleDateString('en-US',{month:'short',day:'numeric'});
      latest = `<div class="app-sec-h"><h2>Latest Event</h2><span class="app-cap">${d}</span></div>
        <div class="lb">
          <button type="button" class="lb-head" data-bga="round" data-key="${esc(roundKey(r))}">${r.event.tier==='major' ? B.majorIcon(name, 40) : B.bgaImg(30)}<span><b>${esc(name)}</b><small>${esc(courseName(r.course))} · ${r.event.tier==='major'?'Major':r.event.tier==='club'?'Qualifier':'Tour'} · Target ${r.event.target}</small></span></button>
          <div class="lb-cols"><span>Pos</span><span>Player</span><span>To par</span><span>Tot</span></div>
          ${rowsFor(top)}
          ${me && !top.includes(me) ? `<div class="lb-cut">· · · ${b.indexOf(me) - 5 > 0 ? (b.indexOf(me) - 5)+' more · · ·' : ''}</div>${rowsFor([me])}` : ''}
          ${b.length > 5 && (!me || top.includes(me)) ? `<div class="lb-cut">· · · ${b.length-5} more · · ·</div>` : ''}
        </div>`;
    }

    // Majors shelf
    const majorEvs = evs.filter(r=>r.event.tier==='major');
    const majors = B.MAJORS.map(m => {
      const mine = majorEvs.filter(r=>B.eventName(r)===m);
      const w = mine.filter(r=>pos(r)==='1').length;
      return `<button type="button" class="tro${w?' won':''}" data-bga="major" data-name="${esc(m)}">${B.majorIcon(m, 38)}<b>${w}</b><span>${esc(B.MAJOR_SHORT[m].replace(/^The /,''))}</span><i>${mine.length} played</i></button>`;
    }).join('');

    // Rankings by Elo
    const ranked = Object.entries(E.R).sort((a,b)=>b[1]-a[1]);
    const myRank = ranked.findIndex(x=>x[0]==='You');
    const showRank = rankOpen ? ranked : ranked.slice(0, 10);
    const rankRows = list => list.map(([n, v]) => { const i = ranked.findIndex(x=>x[0]===n);
      const kid = B.KIDS.find(k=>k.name===n);
      return `<button type="button" class="rk-row${n==='You'?' me':''}" data-bga="player" data-name="${esc(n)}"><span class="lb-pos">${i+1}</span><span class="lb-nm">${n==='You' ? '<b>You</b>' : esc(n)}<small>${kid ? 'HC '+kid.hcp+' · '+B.styleOf(n) : 'Index '+trend[trend.length-1].index.toFixed(1)}</small></span><span class="rk-elo">${Math.round(v)}</span></button>`; }).join('');

    page.innerHTML = `
      <div class="bga-hero"><img src="bga.png" alt="Backyard Golf Association" onerror="this.remove()"></div>
      <div class="bga-tiles">
        <div><b>${won('tour') + won('major')}</b><span>Wins</span></div>
        <div><b>${won('major')}</b><span>Majors</span></div>
        <div><b>${won('tour')}</b><span>Tour</span></div>
        <div><b>${won('club')}</b><span>Qual.</span></div>
      </div>
      <div class="bga-menu">
        <button type="button" data-bga="allevents">All Events<span>›</span></button>
        <button type="button" data-bga="career">Career Results<span>›</span></button>
        <button type="button" data-bga="majors">All Majors<span>›</span></button>
        <button type="button" data-bga="cup">ShedEx Cup<span>›</span></button>
      </div>
      ${latest}
      <div class="app-sec-h"><h2>Majors</h2><span class="app-cap">your wins</span></div>
      <div class="shelf">${majors}</div>
      <div class="app-sec-h"><h2>BGA Rankings</h2><span class="app-cap">Elo</span></div>
      <div class="lb">${ranked.length ? rankRows(showRank) + (!rankOpen && myRank >= 10 ? `<div class="lb-cut">· · ·</div>` + rankRows([ranked[myRank]]) : '') : '<p class="note" style="padding:14px;margin:0;">Play an event to start the rankings.</p>'}</div>
      ${ranked.length > 10 ? `<button type="button" class="rec-more" data-bga="rankmore">${rankOpen ? 'Show less' : 'Show all '+ranked.length}</button>` : ''}`;
  }
  $('bgaPage').addEventListener('click', e => {
    const b = e.target.closest('[data-bga]'); if(!b || !window.BGA) return;
    const a = b.dataset.bga;
    if(a === 'play') post();
    else if(a === 'rankmore'){ rankOpen = !rankOpen; renderBga(); }
    else if(a === 'player') BGA.openPlayer(b.dataset.name);
    else if(a === 'round') BGA.openRound(b.dataset.key);
    else if(a === 'major') BGA.openMajors(b.dataset.name);
    else if(a === 'allevents') BGA.openAllEvents();
    else if(a === 'cup') BGA.openCup();
    else if(a === 'career') BGA.openCareer();
    else if(a === 'majors') BGA.openMajors();
    else if(a === 'series') BGA.openSeries();
  });

  // ---------- Keep in sync with data changes ----------
  function renderAll(){
    try{ renderCard(); }catch(e){ console.error(e); }
    try{ renderRecord(); }catch(e){ console.error(e); }
    try{ renderSeason(); }catch(e){ console.error(e); }
    if(current === 'bga'){ try{ renderBga(); }catch(e){ console.error(e); } }
  }
  const baseRecompute = window.recompute;
  if(typeof baseRecompute === 'function'){
    window.recompute = function(){ try{ return baseRecompute.apply(this, arguments); } finally { renderAll(); } };
  }
  const baseFuture = window.renderFutureRounds;
  if(typeof baseFuture === 'function'){
    window.renderFutureRounds = function(){ const out = baseFuture.apply(this, arguments); try{ renderCard(); }catch(e){} return out; };
  }

  show(current);
  renderAll();
  document.documentElement.classList.remove('app-loading');
})();
