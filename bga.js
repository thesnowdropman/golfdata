// BGA (Backyard Golf Association): live events, leaderboards, history.
(function(){
  // Starts from the Add a Round form: whatever course, holes, rating and slope are picked
  // there (any course the site knows, including ones synced through Firebase) becomes the
  // event. Progress saves to this device after every hole and is deleted once the finished
  // round is saved to Round History.
  const TN_KEY = 'anges-golf-tournament';
  const KIDS = ["Marky Dubois","Gretchen Hasselhoff","Reese Worthington","Kimmy Eckman","Ricky Johnson","Maria Luna","Ronny Dobbs","Lisa Crocket","Jorge Garcia","Dmitri Petrovich","Amir Khan","Billy Jean Blackwood","Ernie Steele","Annie Frazier","Sydney Webber","Ashley Webber","Stephanie Morgan","Jocinda Smith","Vicki Kawaguchi","Dante Robinson","Mikey Thomas","Angela Delvecchio","Tony Delvecchio","Sally Dobbs","Pete Wheeler","Kenny Kawaguchi","Luanne Lui","Keisha Phillips","Achmed Khan","Pablo Sanchez"].map((n,i)=>({name:n,hcp:42-i}));
  const POOLS = [KIDS.filter(k=>k.hcp>=31), KIDS.filter(k=>k.hcp>=26&&k.hcp<=30), KIDS.filter(k=>k.hcp<=25)];
  // Event level is set by the round: first time on a 9-hole course = Club, any later
  // 9-hole round there = Tour, every 18-hole round = Major. HC = your index, rounded.
  const TIERS = {
    club: {label:'Qualifier',  why:'First round at this course', better:0, worse:0},
    tour: {label:'Tour',  why:'You have played this course before', better:2, worse:Infinity},
    major:{label:'Major', why:'18-hole round', better:2, worse:Infinity}
  };
  // Majors rotate through four names in order, by date across all Major events.
  const MAJORS = ['The Mudders','The PBJ Championship','The U.S. Open Gate','The Earl Grey Open'];
  const MAJOR_SHORT = {'The Mudders':'The Mudders','The PBJ Championship':'PBJ Championship','The U.S. Open Gate':'U.S. Open Gate','The Earl Grey Open':'Earl Grey Open'};
  const SHELF_LBL = {'The PBJ Championship':'PBJ Champ','The Earl Grey Open':'Earl Grey Open'};
  const CUP = 'ShedEx Cup';
  const MAJOR_ICONS = {'The U.S. Open Gate':'backyard-gate.png', 'The Earl Grey Open':'backyard-earlgrey.png', 'The PBJ Championship':'backyard-pbj.png', 'The Mudders':'backyard-mudders.png', 'ShedEx Cup':'shedex-cup.png'};
  // Logos: preloaded once into memory at startup (as data URLs) so screens that show them
  // draw instantly instead of blinking in; each <img> also reserves its exact size.
  const MAJOR_ICON_RATIO = {'The U.S. Open Gate':120/101, 'The Earl Grey Open':120/117, 'The PBJ Championship':120/114, 'The Mudders':120/114};
  const tnLogoKeep = [];
  Object.entries(MAJOR_ICONS).forEach(([name, url]) => {
    const im = new Image(); im.src = url; tnLogoKeep.push(im);
    if(im.decode) im.decode().catch(()=>{});
    try{
      fetch(url).then(r => r.ok ? r.blob() : null).then(b => { if(!b) return;
        const fr = new FileReader(); fr.onload = () => { MAJOR_ICONS[name] = fr.result; }; fr.readAsDataURL(b); }).catch(()=>{});
    }catch(e){}
  });
  // BGA logo (bga.png next to the page); falls back to a trophy if the file is missing
  let BGA_SRC = 'bga.png';
  try{ fetch(BGA_SRC).then(r => r.ok ? r.blob() : null).then(b => { if(!b) return; const fr = new FileReader(); fr.onload = () => { BGA_SRC = fr.result; }; fr.readAsDataURL(b); }).catch(()=>{}); }catch(e){}
  const bgaImg = px => `<img src="${BGA_SRC}" alt="" class="tn-bga" decoding="sync" style="height:${px}px;width:auto" onerror="this.replaceWith(document.createTextNode('🏆'))">`;
  const majorIcon = (name, px) => !MAJOR_ICONS[name] ? '' : !MAJOR_ICON_RATIO[name] ? `<img src="${MAJOR_ICONS[name]}" alt="" class="tn-micon" decoding="sync" height="${px}" style="height:${px}px;width:auto">` : `<img src="${MAJOR_ICONS[name]}" alt="" class="tn-micon" decoding="sync" width="${Math.round(px*(MAJOR_ICON_RATIO[name]||1))}" height="${px}" style="height:${px}px;width:${Math.round(px*(MAJOR_ICON_RATIO[name]||1))}px">`;
  // ---------- ShedEx Cup: monthly points race ----------
  // Tour and Major events earn points (Qualifiers don't). Ties share the place's points.
  const PTS = [15,12,10,9,8,7,6,5,4,3,2,1];
  const ymOf = d => String(d).slice(0,7);
  const nowYM = () => { const t = new Date(); return t.getFullYear()+'-'+String(t.getMonth()+1).padStart(2,'0'); };
  const cupDone = ym => ym < nowYM();
  const MON = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
  const ymLabel = (ym, short) => { const d = new Date(ym+'-01T00:00:00'); return short ? MON[d.getMonth()]+" ’"+String(d.getFullYear()).slice(2) : d.toLocaleDateString('en-US',{month:'long',year:'numeric'}); };
  const placePts = pos => PTS[parseInt(String(pos).replace('T',''),10)-1] || 0;
  const evOrder = (a,b) => new Date(a.date)-new Date(b.date) || (a.event.seed||0)-(b.event.seed||0);
  function pointEvents(){ return rounds.filter(r=>r.event && Array.isArray(r.event.board) && r.event.tier!=='club').sort(evOrder); }
  function eventPts(r){ const o = {}; if(!r.event || r.event.tier==='club') return o; rankBoard(r.event).forEach(x=>{ o[x.you?'You':x.n] = placePts(x.pos); }); return o; }
  function monthTotalThrough(name, r){ const ym = ymOf(r.date); let t = 0;
    for(const e of pointEvents()){ if(ymOf(e.date)!==ym) continue; t += eventPts(e)[name]||0; if(e===r) break; } return t; }
  function cupMonths(){ return [...new Set(pointEvents().map(r=>ymOf(r.date)))].sort().reverse(); }
  // Most points wins; on equal points the higher HC wins (your HC = current index); still level, you win
  function cupStandings(ym){
    const evs = pointEvents().filter(r=>ymOf(r.date)===ym), P = {};
    evs.forEach(r=>{ const pts = eventPts(r); rankBoard(r.event).forEach(x=>{ const n = x.you?'You':x.n;
      const p = P[n] || (P[n] = {name:n, you:!!x.you, h:x.you?null:x.h, pts:0, ev:0, wins:0});
      p.pts += pts[n]||0; p.ev++; if(String(x.pos)==='1') p.wins++; }); });
    const hcOf = p => p.you ? currentIndex() : Number(p.h);
    const rows = Object.values(P).sort((a,b)=>b.pts-a.pts || hcOf(b)-hcOf(a) || (b.you?1:0)-(a.you?1:0) || a.name.localeCompare(b.name));
    let pos = 0; rows.forEach((r,i)=>{ if(i===0 || r.pts!==rows[i-1].pts || hcOf(r)!==hcOf(rows[i-1]) || rows[i-1].you) pos = i+1; r.pos = pos; });
    const c = {}; rows.forEach(r=>c[r.pos]=(c[r.pos]||0)+1); rows.forEach(r=>r.label=(c[r.pos]>1?'T':'')+r.pos);
    return {rows, evs};
  }
  function cupWinsOf(name){ return cupMonths().filter(cupDone).filter(ym=>cupStandings(ym).rows.some(x=>x.name===name && x.pos===1)).length; }
  function majorRounds(){ return rounds.filter(r=>r.event && r.event.tier==='major').sort((a,b)=>new Date(a.date)-new Date(b.date) || (a.event.seed||0)-(b.event.seed||0)); }
  function majorNameFor(r){ const i = majorRounds().indexOf(r); return MAJORS[(i<0 ? 0 : i) % MAJORS.length]; }
  function nextMajorName(){ return MAJORS[majorRounds().length % MAJORS.length]; }
  // Club/Tour events are named after the course: "Country Club"/"CC" -> "Invitational",
  // "Golf ..." -> "Open" (otherwise "Open" is added), then a Roman numeral per playing.
  function roman(n){ const t=[[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']]; let o=''; t.forEach(([v,sy])=>{ while(n>=v){ o+=sy; n-=v; } }); return o; }
  // Short course label for event tables: no tee info, nothing after a dash, and "Golf ..." / "Country ..." dropped
  function courseShort(course){
    return course.replace(/\s\([^)]*\)\s*$/, '').replace(/\s+[-–]\s+.*$/, '').replace(/\s+\b(golf|country)\b.*$/i, '').trim();
  }
  function seriesName(course){
    let n = course.replace(/\s\([^)]*\)\s*$/, '').replace(/\s+[-–]\s+.*$/, '').trim();
    if(/\b(country club|cc)\b/i.test(n)) return n.replace(/\s*\b(country club|cc)\b.*$/i, '').trim() + ' Invitational';
    if(/\bgolf\b/i.test(n)) return n.replace(/\s*\bgolf\b.*$/i, '').trim() + ' Open';
    return n + ' Open';
  }
  function seriesRounds(name){ return rounds.filter(r=>r.event && r.event.tier!=='major' && Array.isArray(r.event.board) && seriesName(r.course)===name)
    .sort((a,b)=>new Date(a.date)-new Date(b.date) || (a.event.seed||0)-(b.event.seed||0)); }
  // Club events are the course's Qualifier (no numeral); Tour events are numbered among Tour events only
  function qualifierName(course){ return seriesName(course).replace(/\s+(Open|Invitational)$/, '') + ' Qualifier'; }
  function tourRounds(nm){ return seriesRounds(nm).filter(r=>r.event.tier==='tour'); }
  function eventName(r){ if(r.event.tier==='major') return majorNameFor(r); if(r.event.tier==='club') return qualifierName(r.course);
    const nm = seriesName(r.course); const i = tourRounds(nm).indexOf(r); return nm+' '+roman((i<0?0:i)+1); }
  function nextSeriesName(course, extra, tier){ if(tier==='club') return qualifierName(course); const nm = seriesName(course); return nm+' '+roman(tourRounds(nm).length + 1 + (extra||0)); }
  function eventTitle(tier, r){ return tier==='major' ? (r ? majorNameFor(r) : nextMajorName()) : (TIERS[tier] ? TIERS[tier].label+' event' : 'BGA'); }
  function tierFor(f){
    if(f.holes===18) return 'major';
    const key = f.name.trim().toLowerCase();
    return rounds.some(r=>r.holes===9 && r.course.trim().toLowerCase()===key) ? 'tour' : 'club';
  }
  // Club is a ladder: it starts with only the worst player (HC 42), and each Club win
  // adds the next-worst player to later Club fields. A loss keeps the field the same.
  function clubWins(beforeDate, exclude){
    return rounds.filter(r => r !== exclude && r.event && r.event.tier === 'club' && Array.isArray(r.event.board)
      && (!beforeDate || new Date(r.date) < new Date(beforeDate))
      && String((rankBoard(r.event).find(x=>x.you)||{}).pos) === '1').length;
  }
  function pickKids(tier, index, ctx){
    if(tier === 'club'){
      const n = Math.min(KIDS.length, 1 + clubWins(ctx && ctx.date, ctx && ctx.round));
      return KIDS.slice(0, n).map(k=>k.name); // KIDS runs worst (42) to best
    }
    const hc = Math.round(index), t = TIERS[tier];
    return KIDS.filter(k => k.hcp >= hc - t.better && k.hcp <= hc + t.worse).map(k=>k.name);
  }

  // Consistency styles, relative to your own spread (1.0 = you). Fixed per player.
  const STYLES = {Steady:{sd:.8,blow:.03,form:1.2}, Average:{sd:1,blow:.06,form:1.6}, Streaky:{sd:1.05,blow:.07,form:2.4}, Volatile:{sd:1.3,blow:.13,form:2}};

  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function rng(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
  function gauss(r){let u=0;while(!u)u=r();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*r())}
  function hash(s){let h=2166136261;for(const c of s)h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0}
  function styleOf(name){const r=rng(hash(name))();return r<.3?'Steady':r<.65?'Average':r<.85?'Streaky':'Volatile'}
  // "2" -> "2nd", "T3" -> "T3rd"
  function ordinal(p){ const m = String(p).match(/^(T?)(\d+)$/); if(!m) return String(p);
    const n = +m[2], sfx = (n%100>=11 && n%100<=13) ? 'th' : ({1:'st',2:'nd',3:'rd'}[n%10] || 'th'); return m[1]+n+sfx; }
  // Table names: first initial + last name ("M. Dubois"); use more letters when two players would match ("Am. Khan", "Ac. Khan")
  function shortName(full){
    if(!full || full === 'You') return full;
    const parts = full.trim().split(/\s+/), last = parts[parts.length-1], first = parts[0];
    const rivals = KIDS.map(k=>k.name).filter(n=>n!==full && n.trim().split(/\s+/).pop()===last).map(n=>n.split(/\s+/)[0]);
    let k = 1; while(k < first.length && rivals.some(r=>r.slice(0,k).toLowerCase()===first.slice(0,k).toLowerCase())) k++;
    return first.slice(0,k)+'. '+last;
  }
  const baseName = n => { const m = n.trim().match(/^(.*)\s\((9|18)\)$/); return (m ? m[1] : n).trim().toLowerCase(); };

  // ---------- Read the Add a Round form ----------
  function readForm(){
    const name = $('f-course').value.trim();
    const holes = parseInt($('f-holes').value, 10);
    let rating = parseFloat($('f-rating').value);
    const slope = parseFloat($('f-slope').value);
    if(holes === 9 && !isNaN(rating) && rating > 50) rating = rating / 2; // same rule as Save round
    if(!name || isNaN(rating) || isNaN(slope) || !(holes===9 || holes===18)) return null;
    const pars = (typeof currentHolePars!=='undefined' && currentHolePars.length===holes ? currentHolePars : Array(holes).fill(null))
      .map(p => (p==null || isNaN(p)) ? 4 : p);
    const parBoxes = Array.from(document.querySelectorAll('.hole-par-box'));
    const newPars = $('parInputsSection').style.display !== 'none' && parBoxes.length===holes ? parBoxes.map(b=>parseInt(b.value,10)||4) : null;
    return {name, holes, rating, slope, date: $('f-date').value || todayISO(), pars: newPars || pars, newPars};
  }

  // Stroke index (and yardage) from any logged round at this course, either 9/18 variant
  function holeInfo(name, holes){
    const b = baseName(name);
    const rs = [...rounds].filter(r=>baseName(r.course)===b && r.holeDetail && Array.isArray(r.holeDetail.strokeIndex))
      .sort((a,c)=>new Date(c.date)-new Date(a.date));
    const pick = len => rs.find(r=>r.holeDetail.strokeIndex.length===len);
    const yd = r => Array.isArray(r.holeDetail.yards) ? r.holeDetail.yards : null;
    let r = pick(holes);
    if(r) return holes && {si:[...r.holeDetail.strokeIndex], rank:[...r.holeDetail.strokeIndex], yards:yd(r)};
    if(holes===18 && (r = pick(9))){ const s=r.holeDetail.strokeIndex, y=yd(r); return {si:[...s,...s], rank:[...s, ...s.map(x=>x+.5)], yards:y?[...y,...y]:null}; }
    if(holes===9 && (r = pick(18))){ const s=r.holeDetail.strokeIndex.slice(0,9), y=yd(r); return {si:s, rank:s, yards:y?y.slice(0,9):null}; }
    return {si:null, rank:null, yards:null};
  }

  function buildPlay(f){
    const info = holeInfo(f.name, f.holes), n = f.holes;
    const holes = f.pars.map((p,i)=>({no:i+1, par:p, si:info.si?info.si[i]:null, y:info.yards?info.yards[i]:null, key:info.rank?info.rank[i]:null}));
    if(info.rank) [...holes].sort((a,b)=>a.key-b.key).forEach((h,r)=>h.rank=r+1);
    holes.forEach(h=>{ h.w = h.rank ? .55+.45*(0.2+1.6*(n-h.rank)/(n-1)) : 1; });
    return {holes, rating:f.rating, slope:f.slope, par:holes.reduce((s,h)=>s+h.par,0), hasSI:!!info.rank};
  }
  // Same formula as the site's "Curr. Exp." column
  function expected(index, play){ return (play.holes.length===9 ? index/2 : index) * play.slope / 113 + play.rating; }
  function targetFor(play, index){
    const total = Math.round(expected(index, play)), n = play.holes.length;
    const extra = total - play.par, base = Math.floor(extra/n), rem = extra - base*n;
    const order = play.hasSI ? [...play.holes].sort((a,b)=>a.rank-b.rank) : [...play.holes].sort((a,b)=>b.par-a.par || a.no-b.no);
    const bonus = new Set(order.slice(0,rem).map(h=>h.no));
    return play.holes.map(h=>h.par + base + (bonus.has(h.no)?1:0));
  }
  function simulate(kid, play, r){
    const st = STYLES[styleOf(kid.name)], n = play.holes.length;
    const over = expected(kid.hcp, play) - play.par + gauss(r)*st.form*Math.sqrt(n/9);
    return play.holes.map(h=>{
      let x = Math.round(over/n*h.w + gauss(r)*.85*st.sd);
      if(r() < st.blow) x += 2;
      x = Math.max(-1, Math.min(6, x));
      if(x===-1 && r()>.4) x = 0;
      return h.par + x;
    });
  }
  // Groups of up to 4, as even as possible; you are always in the last group.
  function groupSizes(total){ const G = Math.ceil(total/4), base = Math.floor(total/G), extra = total % G;
    return Array.from({length:G},(_,g)=> base + (g >= G-extra ? 1 : 0)); }
  function buildField(state){
    const r = rng(state.seed);
    const picks = (state.picks || []).map(n=>KIDS.find(k=>k.name===n)).filter(Boolean);
    for(let i=picks.length-1;i>0;i--){ const j=Math.floor(r()*(i+1)); [picks[i],picks[j]]=[picks[j],picks[i]]; }
    const sizes = groupSizes(picks.length+1); sizes[sizes.length-1] -= 1; // your spot
    state.groups = sizes.length;
    let g = 0, left = sizes[0];
    return picks.map(k=>{ while(left===0){ g++; left = sizes[g]; } left--;
      return {...k, style:styleOf(k.name), group:g+1, scores:simulate(k, state.play, r)}; });
  }

  // ---------- Saved progress (this device only) ----------
  let T = null, field = [];
  function load(){ try{ const s = JSON.parse(localStorage.getItem(TN_KEY)||'null'); if(s && s.play && s.seed && s.form) return s; }catch(e){} return null; }
  function save(){ try{ T ? localStorage.setItem(TN_KEY, JSON.stringify(T)) : localStorage.removeItem(TN_KEY); }catch(e){} }
  T = load(); if(T && !T.picks) T = null; if(T) field = buildField(T);
  function currentIndex(){ try{ return trend[trend.length-1].index; }catch(e){ return 30; } }

  const fmt = n => n===0 ? 'E' : (n>0 ? '+'+n : ''+n);
  const cls = n => n<0 ? 'tn-u' : n===0 ? 'tn-e' : '';
  const sum = (a,k) => a.slice(0,k).reduce((x,y)=>x+y,0);
  const thruFor = (S,g,mine,n) => Math.min(n, mine + (S.groups || 3) - g);

  // Lower score vs target ranks first; on the same score the higher HC wins the tiebreak.
  // Only identical score AND HC share a place.
  function rankRows(rows){
    rows.sort((a,b)=> a.vs-b.vs || b.hc-a.hc || (b.you?1:0)-(a.you?1:0));
    let pos=0, pv=null, ph=null;
    // You sort first within an exact tie and take that place alone (you win a full tie)
    rows.forEach((r,i)=>{ if(r.vs!==pv || r.hc!==ph || (i>0 && rows[i-1].you)){ pos=i+1; pv=r.vs; ph=r.hc; } r.pos=pos; });
    const ties={}; rows.forEach(r=>ties[r.pos]=(ties[r.pos]||0)+1);
    rows.forEach(r=>r.label=(ties[r.pos]>1?'T':'')+r.pos);
    return rows;
  }
  // Re-rank a saved board with the current tiebreak rule
  function rankBoard(e){
    const myHc = Number(e.index); // your exact index breaks ties, e.g. 38.6 loses to a 39
    const rows = e.board.map(x=>({...x, hc: x.you ? myHc : x.h}));
    rankRows(rows).forEach(r=>{ r.pos = r.label; delete r.label; delete r.hc; });
    return rows;
  }
  function standings(mine, S, F){
    S = S || T; F = F || field;
    const n = S.play.holes.length;
    const rows = F.map(p=>{ const t=thruFor(S,p.group,mine,n); return {name:p.name, hc:p.hcp, group:p.group, note:'HC '+p.hcp+' · '+p.style+(t>0 ? ' · Last: '+fmt(p.scores[t-1]-S.target[t-1]) : ''), thru:t, gross:sum(p.scores,t), vs:sum(p.scores,t)-sum(S.target,t)}; });
    rows.push({name:'You', you:true, hc:Number(S.index), group:S.groups||3, note:'Index '+S.index.toFixed(1)+' · target '+sum(S.target,n)+(mine>0 ? ' · Last: '+fmt(S.mine[mine-1]-S.target[mine-1]) : ''), thru:mine, gross:sum(S.mine,mine), vs:sum(S.mine,mine)-sum(S.target,mine)});
    const live = rankRows(rows.filter(r=>r.thru>0));
    return live.concat(rows.filter(r=>r.thru===0).sort((a,b)=>a.group-b.group).map(r=>({...r,label:'–'})));
  }

  // ---------- Pieces inside Add a Round ----------
  function refreshAddBlock(){
    const banner = $('tnResumeBanner'), start = $('tnStartBlock');
    if(T){
      const n = T.play.holes.length, mine = T.mine.length, me = standings(mine).find(r=>r.you);
      banner.innerHTML = `<div><b>${mine===n ? 'Event finished' : 'Event in progress'}</b><span>${esc(T.form.name)} · ${mine===n ? 'finished '+ordinal(me.label)+' · '+me.gross : mine ? 'thru '+mine+' · '+me.label+' ('+fmt(me.vs)+')' : 'on the first tee'}</span></div>
        <button class="btn" type="button" id="tnResumeBtn">${mine===n ? 'Post Round' : 'Resume'}</button>`;
      banner.style.display = 'flex';
      start.style.display = 'none';
      $('tnResumeBtn').onclick = () => mine===n ? postRound() : openLive();
    } else {
      banner.style.display = 'none';
      start.style.display = 'block';
      $('tnStartHint').textContent = '';
      $('tnStartHint').classList.remove('tn-err');
    }
  }

  // ---------- Event modal ----------
  const overlay = $('tnOverlay'), body = $('tnBody');
  let draft = null, confirmQuit = false;

  function openSetup(){
    const f = readForm();
    if(!f){
      $('tnStartHint').textContent = 'Pick a course first. It needs a rating and slope.';
      $('tnStartHint').classList.add('tn-err');
      return;
    }
    const play = buildPlay(f), idx = currentIndex(), tier = tierFor(f);
    draft = {form:f, play, index:idx, target:targetFor(play, idx), tier, picks:pickKids(tier, idx)};
    renderSetup();
    overlay.classList.add('open');
  }
  function renderSetup(){
    const {form:f, play, index, target, tier, picks} = draft;
    const hs = picks.map(n=>KIDS.find(k=>k.name===n).hcp);
    const sizes = groupSizes(picks.length+1);
    body.innerHTML = `
      <p class="idx-note" style="margin:0 0 12px;">${esc(f.name)} · ${f.holes} holes · par ${play.par}</p>
      <div class="tn-event"><b>${esc(tier==='major' ? eventTitle(tier) : nextSeriesName(f.name, 0, tier))}</b><span>${tier==='major' ? 'Major' : tier==='club' ? 'Qualifier' : TIERS[tier].label+' event'} · ${TIERS[tier].why}</span>
        ${tier==='club' ? `<span>Qualifier ladder: ${clubWins()} Qualifier win${clubWins()===1?'':'s'} so far. Win to add the next player.</span>` : ''}
        <span>${picks.length} opponent${picks.length===1?'':'s'}, HC ${Math.min(...hs)}${picks.length>1?' to '+Math.max(...hs):''} · your HC ${Math.round(index)} · ${sizes.length} group${sizes.length===1?'':'s'}${sizes.length>1?' ('+sizes.join('-')+')':''}, you're in the last</span></div>
      <div class="tn-readout">
        <div><span class="tn-big">${sum(target,target.length)}</span><span class="tn-cap">Your target</span></div>
        <p>Rating ${f.rating.toFixed(1)} / slope ${f.slope} · index ${index.toFixed(1)}</p>
        ${!play.hasSI ? '<p class="tn-warn">No stroke index on file for this course, so every hole plays as equally hard.</p>' : ''}
      </div>
      <div class="form-actions">
        <button class="btn secondary" id="tnBack" type="button">Back</button>
        <button class="btn" id="tnTeeOff" type="button">Tee Off</button>
      </div>`;
    $('tnBack').onclick = () => overlay.classList.remove('open');
    $('tnTeeOff').onclick = () => {
      T = {...draft, seed: Math.floor(Math.random()*1e9), mine: [], started: Date.now(), majorName: draft.tier==='major' ? nextMajorName() : nextSeriesName(draft.form.name, 0, draft.tier)};
      field = buildField(T); save();
      addOverlay.classList.remove('open');
      refreshAddBlock(); renderLive();
    };
  }
  function openLive(){ confirmQuit=false; addOverlay.classList.remove('open'); renderLive(); overlay.classList.add('open'); }

  function tnSlide(root, before){
    if(!Object.keys(before).length || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
    root.querySelectorAll('tbody tr[data-n]').forEach(tr=>{
      const old = before[tr.dataset.n]; if(old == null) return;
      const dy = old - tr.getBoundingClientRect().top; if(Math.abs(dy) < 1) return;
      tr.style.transition = 'none'; tr.style.transform = `translateY(${dy}px)`; tr.style.position = 'relative'; tr.style.zIndex = '1';
      requestAnimationFrame(()=>requestAnimationFrame(()=>{ tr.style.transition = 'transform 1.2s cubic-bezier(.2,.8,.2,1)'; tr.style.transform = ''; }));
      tr.addEventListener('transitionend', ()=>{ tr.style.transition=''; tr.style.zIndex=''; tr.style.position=''; }, {once:true});
    });
  }
  function renderLive(){
    const holes = T.play.holes, n = holes.length, mine = T.mine.length, done = mine===n;
    const rows = standings(mine), prevPos = {};
    if(mine>0) standings(mine-1).forEach(r=>{ if(r.pos) prevPos[r.name]=r.pos; });
    const me = rows.find(r=>r.you), leader = rows.find(r=>r.pos);
    const h = holes[mine];
    let head;
    if(done){
      const cnt = rows.filter(r=>r.pos).length;
      head = `<h4 class="tn-hole">${me.pos===1 ? (me.label.startsWith('T') ? 'Tied for the win!' : 'You win!') : 'Finished '+ordinal(me.label)+' of '+cnt}<small>gross ${me.gross} · target ${sum(T.target,n)}</small></h4>`;
    } else {
      head = `<h4 class="tn-hole">Hole ${h.no}<small>par ${h.par}${h.y?' · '+h.y+' yds':''}${h.si!=null?' · SI '+h.si:''} · target ${T.target[mine]}</small></h4>`;
    }
    const names = {'-2':'eagle','-1':'birdie','0':'par','1':'bogey','2':'double','3':'triple'};
    const pad = done ? '' : `<div class="tn-pad">${Array.from({length:10},(_,i)=>2+i).map(s=>`<button type="button" data-s="${s}">${s}<em>${names[s-h.par]||''}</em></button>`).join('')}</div>`;
    const card = `<div class="tn-card">${holes.map((hh,i)=>`<div class="${i===mine?'cur':''}"><i>${hh.no}</i>${T.mine[i]??'·'}<s>${T.target[i]}</s></div>`).join('')}</div>`;
    const board = rows.map(r=>{
      let mv=''; if(r.pos && prevPos[r.name]){ const d=prevPos[r.name]-r.pos; if(d>0) mv=` <span class="tn-mv">▲${d}</span>`; else if(d<0) mv=` <span class="tn-mv">▼${-d}</span>`; }
      return `<tr data-n="${esc(r.name)}" class="${r.you?'tn-you':''}${r.thru?'':' tn-wait'}"><td>${r.label}</td><td class="tn-name">${esc(r.name)}<span class="tn-grp">G${r.group}</span>${mv}<small>${esc(r.note)}</small></td><td class="tn-n">${r.thru===n?'F':(r.thru||'–')}</td><td class="tn-n ${r.thru?cls(r.vs):''}">${r.thru?fmt(r.vs):'–'}</td><td class="tn-n">${r.thru?r.gross:'–'}</td></tr>`;
    }).join('');
    // Remember where each row sat so the board can slide rows to their new places
    const tnBefore = {};
    body.querySelectorAll('tbody tr[data-n]').forEach(tr=>{ tnBefore[tr.dataset.n] = tr.getBoundingClientRect().top; });
    body.innerHTML = `
      <p class="idx-note" style="margin:0 0 10px;">${esc(T.form.name)} · ${esc(T.majorName || (T.tier==='major' ? nextMajorName() : nextSeriesName(T.form.name, 0, T.tier)))} · par ${T.play.par} · target ${sum(T.target,n)}</p>
      <div class="strip" style="margin:0 0 14px;">
        <div class="cell"><div class="num">${mine?me.label:'–'}</div><div class="lbl">Position</div></div>
        <div class="cell flag"><div class="num">${fmt(me.vs)}</div><div class="lbl">Vs. target</div></div>
        <div class="cell"><div class="num">${mine?(me.vs===leader.vs?'Lead':'+'+(me.vs-leader.vs)):'–'}</div><div class="lbl">Back of lead</div></div>
      </div>
      ${head}${pad}${card}
      <div class="tn-row">
        ${done ? '<button class="btn" id="tnPost" type="button">Post Round to History</button>' : ''}
      </div>
      <div class="tn-boardwrap"><table class="tn-board">
        <thead><tr><th>Pos</th><th>Player</th><th class="tn-n">Thru</th><th class="tn-n">Today</th><th class="tn-n">Gross</th></tr></thead>
        <tbody>${board}</tbody></table></div>
      <div class="tn-row">
        ${mine ? '<button class="btn secondary" id="tnUndo" type="button">Undo last hole</button>' : ''}
        ${done ? '' : `<button class="btn secondary" id="tnQuit" type="button">${confirmQuit ? 'Tap again to abandon' : 'Abandon event'}</button>`}
      </div>
`;
    tnSlide(body, tnBefore);
    body.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{ T.mine.push(+b.dataset.s); confirmQuit=false; save(); renderLive(); refreshAddBlock(); try{ triggerHaptic(); }catch(e){} });
    const u = $('tnUndo'); if(u) u.onclick = ()=>{ T.mine.pop(); save(); renderLive(); refreshAddBlock(); };
    const q = $('tnQuit'); if(q) q.onclick = ()=>{ if(!confirmQuit){ confirmQuit=true; renderLive(); return; } T=null; field=[]; confirmQuit=false; save(); refreshAddBlock(); overlay.classList.remove('open'); };
    const p = $('tnPost'); if(p) p.onclick = postRound;
  }

  // ---------- Hand the finished card to Add a Round ----------
  let posting = false;
  function postRound(){
    const f = T.form;
    overlay.classList.remove('open');
    openAddModal();
    // Show the course fields the same way the New Course tab does, then apply the event's course
    $('addRoundPastPanel').style.display = 'none';
    $('addRoundNewPanel').style.display = 'block';
    $('addRoundKnownFields').style.display = 'block';
    const df = $('addRoundDateField'); if(df) df.style.display = 'block';
    applyAddRoundCourseSelection({name:f.name, rating:f.rating, slope:f.slope, holes:f.holes});
    $('f-date').value = f.date;
    if(f.newPars){
      const boxes = Array.from(document.querySelectorAll('.hole-par-box'));
      boxes.forEach((b,i)=>{ b.value = f.newPars[i]; const d = document.querySelector(`.hole-par-display[data-hole="${i+1}"]`); if(d) d.textContent = f.newPars[i]; });
      try{ updateParTotalReadout('.hole-par-box','parTotalReadout'); }catch(e){}
      buildHoleInputs();
    }
    T.mine.forEach((s,i)=>{
      const hidden = document.querySelector(`.hole-score-box[data-hole="${i+1}"]`);
      const disp = document.querySelector(`.hole-score-display[data-hole="${i+1}"] .score-shape`);
      if(!hidden || !disp) return;
      hidden.value = s;
      const best = currentHoleBests ? currentHoleBests[i] : null;
      applyScoreStyling(disp, s, currentHolePars[i], best != null && s < best);
    });
    updateGrossScoreHint(); updateHoleBestHighlights(); updateExpectedScoreHint();
    posting = true;
    refreshAddBlock();
    $('tnResumeBanner').style.display = 'none';
  }
  // Save round runs its own handler first; if it closed the form, the round is saved and the
  // event's in-progress copy is no longer needed.
  $('addSave').addEventListener('click', ()=>{
    if(posting && T && T.mine.length===T.play.holes.length && !addOverlay.classList.contains('open')){
      // Attach the final leaderboard to the round that was just saved (synced with it)
      try{
        const r = addedRounds[0], n = T.play.holes.length;
        if(r && r.holeDetail && r.course.trim().toLowerCase() === T.form.name.trim().toLowerCase() && r.holeDetail.scores.length === n){
          // Use the scores actually saved, in case any were changed on the Add a Round form
          T.mine = r.holeDetail.scores.slice();
          const rows = standings(n);
          r.event = {tier:T.tier, target:sum(T.target,n), index:T.index, seed:T.seed,
            board: rows.map(x=>{ const p = field.find(f=>f.name===x.name);
              return {n:x.name, you:!!x.you, pos:x.label, h:p?p.hcp:null, st:p?p.style:null, g:x.group, gross:x.gross, vs:x.vs}; })};
          persistAdded();
        }
      }catch(e){}
      T = null; field = []; posting = false; save(); refreshAddBlock();
    }
  });
  ['addCancel','addClose'].forEach(id=>$(id).addEventListener('click', ()=>{ posting = false; }));

  // ---------- Past rounds: backfill / edit Backyard Open, edit round ----------
  // Rounds built into the file can't be changed in place, so an edited one is saved as a
  // synced copy and the original is retired the same way Delete retires it.
  function commitRound(r, mutate){
    const inAdded = addedRounds.indexOf(r) !== -1;
    if(inAdded){ mutate(r); persistAdded(); }
    else {
      const copy = JSON.parse(JSON.stringify(r));
      if(copy.expAtTime === undefined){ const e = expScoreAtTimeOf(r); if(e != null) copy.expAtTime = e; }
      const plain = `${r.date}|${r.course}|${r.score}`, tagged = `${plain}|b${baseRounds.indexOf(r)}`;
      [roundKey(r), plain, tagged].forEach(k=>{ if(!deletedKeys.includes(k)) deletedKeys.push(k); });
      persistDeleted();
      mutate(copy);
      addedRounds.push(copy); persistAdded();
      r = copy;
    }
    rebuildRoundsArray(); try{ recompute(); }catch(e){ console.warn(e); }
    const idx = rounds.indexOf(r);
    if(idx !== -1){ window.tnOpenEventTab = true; openDetail(idx); }
  }
  function indexBefore(r){
    try{ const k = roundNumberOf[roundKey(r)]; if(k > 1 && trend[k-2]) return trend[k-2].index; }catch(e){}
    return currentIndex();
  }
  function tierAt(r){
    if(r.holes === 18) return 'major';
    const key = r.course.trim().toLowerCase(), d = new Date(r.date);
    return rounds.some(x => x !== r && x.holes === 9 && x.course.trim().toLowerCase() === key && new Date(x.date) < d) ? 'tour' : 'club';
  }
  const hasCard = r => r.holeDetail && Array.isArray(r.holeDetail.scores) && r.holeDetail.scores.length === r.holes && Array.isArray(r.holeDetail.pars);
  function makeEvent(r, tier, seed, index){
    const f = {name:r.course, holes:r.holes, rating:r.rating, slope:r.slope, pars:r.holeDetail.pars.map(p=>p||4)};
    const S = {form:f, play:buildPlay(f), index, tier, picks:pickKids(tier, index, {date:r.date, round:r}), seed, mine:r.holeDetail.scores.slice()};
    S.target = targetFor(S.play, index);
    const F = buildField(S), n = r.holes;
    const rows = standings(n, S, F);
    return {tier, target:sum(S.target,n), index, seed,
      board: rows.map(x=>{ const p = F.find(q=>q.name===x.name); return {n:x.name, you:!!x.you, pos:x.label, h:p?p.hcp:null, st:p?p.style:null, g:x.group, gross:x.gross, vs:x.vs}; })};
  }
  const posNum = e => parseInt(String((rankBoard(e).find(x=>x.you)||{}).pos).replace('T',''), 10);

  window.tnEventHtml = function(r){
    const key = esc(roundKey(r)), e = r.event;
    const editBtn = `<button class="modal-edit" type="button" data-tn-act="editround" data-key="${key}">Edit round</button>`;
    if(!e || !Array.isArray(e.board)){
      return `<div class="tn-saved" data-key="${key}" style="margin-top:16px;display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
        ${hasCard(r) ? `<button class="modal-edit" type="button" data-tn-act="add" data-key="${key}">${bgaImg(18)}Add BGA Event</button>` : '<span class="idx-note">Add hole scores to backfill a BGA event.</span>'}
        ${editBtn}<div class="tn-editor" style="width:100%"></div></div>`;
    }
    const board = rankBoard(e);
    const me = board.find(x=>x.you) || {};
    const tl = TIERS[e.tier] ? TIERS[e.tier].label : 'Backyard';
    const pts = e.tier!=='club' ? eventPts(r) : null, myTot = pts ? monthTotalThrough('You', r) : 0;
    const rows = board.map(x=>`<tr class="${x.you?'tn-you':''}"><td>${esc(x.pos)}</td><td class="tn-name"><span class="tn-plink" data-tn-act="player" data-name="${esc(x.you ? 'You' : x.n)}" data-from="round" data-key="${key}">${esc(x.n)}</span><span class="tn-grp">G${x.g}</span><small>${x.you ? 'Index '+Number(e.index).toFixed(1)+(pts ? ' · +'+(pts.You||0)+' pts ('+myTot+' total)' : '') : 'HC '+x.h+' · '+esc(x.st)+(pts ? ' · +'+(pts[x.n]||0)+' pts ('+monthTotalThrough(x.n, r)+' total)' : '')}</small></td><td class="tn-n ${cls(x.vs)}">${fmt(x.vs)}</td><td class="tn-n">${x.gross}</td></tr>`).join('');
    return `<div class="tn-saved" data-key="${key}">
      <h4 class="tn-hole" style="margin:10px 0 2px;display:flex;align-items:center;gap:6px;">${e.tier==='major' ? '' : bgaImg(24)}<span class="tn-evlink" data-tn-act="eventhist" data-ev="${esc(e.tier==='major' ? majorNameFor(r) : 'series:'+seriesName(r.course))}" data-from="round" data-key="${key}">${e.tier==='major' ? majorIcon(majorNameFor(r), 30)+esc(majorNameFor(r)) : esc(eventName(r))}</span></h4>
      <p class="idx-note" style="margin:0 0 8px;">${e.tier==='major' ? 'Major' : e.tier==='club' ? 'Qualifier' : esc(tl)+' event'} · Finished ${esc(ordinal(me.pos))}/${e.board.length} · Par ${e.target}</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">${hasCard(r) ? `<button class="modal-edit" type="button" data-tn-act="editevent" data-key="${key}">Edit event</button>` : ''}${editBtn}</div>
      <div class="tn-editor"></div>
      <div class="tn-boardwrap" data-tn-board${tnCardOpen ? '' : ' hidden'}><table class="tn-board">
        <thead><tr><th>Pos</th><th>Player</th><th class="tn-n">Today</th><th class="tn-n">Gross</th></tr></thead>
        <tbody>${rows}</tbody></table></div></div>`;
  };

  // Backyard Open totals for All Stats. Each saved event keeps the index you played it at
  // (event.index), so wins can later be split into HC bands.
  // Elo: everyone starts at 1500; after each event (in date order) every pair in the field
  // is scored head to head (better finish = win, same place = draw), K = 32 split across the field.
  function eloRatings(){
    const R = {}, peak = {};
    const evs = rounds.filter(r=>r.event && Array.isArray(r.event.board))
      .sort((a,b)=>new Date(a.date)-new Date(b.date) || (a.event.seed||0)-(b.event.seed||0));
    evs.forEach(r=>{
      const b = rankBoard(r.event).map(x=>({n: x.you ? 'You' : x.n, p: parseInt(String(x.pos).replace('T',''),10)}));
      const N = b.length; if(N < 2) return;
      b.forEach(x=>{ if(R[x.n] == null) R[x.n] = 1500; });
      const d = {}; b.forEach(x=>d[x.n]=0);
      for(let i=0;i<N;i++) for(let j=i+1;j<N;j++){
        const A=b[i], B=b[j], ea = 1/(1+Math.pow(10,(R[B.n]-R[A.n])/400));
        const sa = A.p < B.p ? 1 : A.p > B.p ? 0 : 0.5, k = 32/(N-1);
        d[A.n] += k*(sa-ea); d[B.n] -= k*(sa-ea);
      }
      b.forEach(x=>{ R[x.n] += d[x.n]; peak[x.n] = Math.max(peak[x.n]||0, R[x.n]); });
    });
    return {R, peak};
  }
  let tnCareerSort = {col:'wins', dir:-1};
  window.tnStatsHtml = function(){
    const ELO = eloRatings().R;
    const evs = rounds.filter(r=>r.event && Array.isArray(r.event.board));
    const P = {};
    const get = (name, you, hc) => P[name] || (P[name] = {name, you, hc, app:{club:0,tour:0,major:0}, win:{club:0,tour:0,major:0}});
    evs.forEach(r=>{ const t = r.event.tier; rankBoard(r.event).forEach(x=>{
      const p = get(x.you ? 'You' : x.n, !!x.you, x.you ? null : x.h);
      if(p.app[t] == null) return; p.app[t]++; if(String(x.pos)==='1') p.win[t]++; }); });
    const tot = o => o.club + o.tour + o.major;
    const totW = o => o.tour + o.major; // Club wins don't count toward total wins
    // Sortable: tap a header. Default is total wins, most first.
    const KEY = {player:p=>p.you?'':p.name.split(/\s+/).pop()+' '+p.name, apps:p=>tot(p.app), club:p=>p.win.club, tour:p=>p.win.tour, major:p=>p.win.major, wins:p=>totW(p.win), elo:p=>ELO[p.name]!=null?ELO[p.name]:-1};
    const kf = KEY[tnCareerSort.col] || KEY.wins, dir = tnCareerSort.dir;
    const list = Object.values(P).sort((a,b)=>{ const x=kf(a), y=kf(b);
      const c = typeof x==='string' ? x.localeCompare(y) : x-y;
      return (c*dir) || totW(b.win)-totW(a.win) || b.win.major-a.win.major || (ELO[b.name]||0)-(ELO[a.name]||0) || a.name.localeCompare(b.name); });
    const th = (col, label, num) => `<th class="tn-sort${num?' tn-n':''}${tnCareerSort.col===col?' on':''}" data-tn-act="csort" data-col="${col}">${label}${tnCareerSort.col===col ? (tnCareerSort.dir>0?' ▲':' ▼') : ''}</th>`;
    const body = list.length ? list.map(p=>`<tr class="tn-click${p.you?' tn-you':''}" data-tn-act="player" data-name="${esc(p.name)}"><td class="tn-name">${esc(shortName(p.name))}${p.hc!=null?`<small>HC ${p.hc}</small>`:''}</td><td class="tn-n">${tot(p.app)}</td><td class="tn-n">${p.win.club}</td><td class="tn-n">${p.win.tour}</td><td class="tn-n">${p.win.major}</td><td class="tn-n"><b>${totW(p.win)}</b></td><td class="tn-n">${ELO[p.name]!=null ? Math.round(ELO[p.name]) : '—'}</td></tr>`).join('')
      : '<tr><td colspan="7">No BGA events yet.</td></tr>';
    return `      <div id="tnStatsBox">
      <div class="tn-boardwrap"><table class="tn-board tn-career">
        <thead><tr>${th('player','Player')}${th('apps','Apps',1)}${th('club','Qual.',1)}${th('tour','Tour',1)}${th('major','Major',1)}${th('wins','Wins',1)}${th('elo','Elo',1)}</tr></thead>
        <tbody>${body}</tbody></table></div>
      <p class="idx-note" style="margin:6px 0 12px;">Qual., Tour and Major columns are wins. Total wins count Tour and Major only. Elo starts at 1500 and moves with every head-to-head finish. Tap a player for their round-by-round finishes.</p></div>`;
  };

  let tnStatsOpen = false, tnCardOpen = true;
  const TIER_LBL = t => TIERS[t] ? TIERS[t].label : '—';
  // Average score to par (your target = par in every event) and its rank among everyone who has played
  function avgLine(name){
    const T = {};
    rounds.filter(r=>r.event && Array.isArray(r.event.board)).forEach(r=>rankBoard(r.event).forEach(x=>{ const n = x.you ? 'You' : x.n; (T[n] = T[n] || []).push(x.vs); }));
    const avg = a => a.reduce((p,c)=>p+c,0)/a.length;
    const list = Object.entries(T).map(([n,a])=>({n, a:avg(a)})).sort((p,q)=>p.a-q.a);
    const me = list.find(x=>x.n===name); if(!me) return '';
    const pos = list.findIndex(x=>x.n===name)+1;
    const v = Math.round(me.a*10)/10, txt = v===0 ? 'E' : (v>0 ? '+'+v.toFixed(1) : v.toFixed(1));
    const E = eloRatings(), elo = E.R[name];
    return `<div class="strip" style="margin:4px 0 12px;"><div class="cell"><div class="num">${txt}</div><div class="lbl">Avg to par</div></div><div class="cell"><div class="num">${ordinal(pos)}</div><div class="lbl">of ${list.length} players</div></div><div class="cell"><div class="num">${elo!=null ? Math.round(elo) : '—'}</div><div class="lbl">Elo${E.peak[name]!=null ? ' · peak '+Math.round(E.peak[name]) : ''}</div></div></div>`;
  }
  // Finish badge: 1 gold, 2 silver, 3 bronze, 4-5 light blue, 6-7 light green, 8-9 orange, 10-12 red, rest black
  function finBadge(pos){ const p = parseInt(String(pos).replace('T',''),10);
    const c = p===1 ? 'f1' : p===2 ? 'f2' : p===3 ? 'f3' : p<=5 ? 'f4' : p<=7 ? 'f6' : p<=9 ? 'f8' : p<=12 ? 'f10' : 'fx';
    return `<span class="tn-fin ${c}">${esc(ordinal(pos))}</span>`; }
  function openPlayerDetail(name){
    const rowsData = rounds.filter(r=>r.event && Array.isArray(r.event.board))
      .map(r=>{ const x = rankBoard(r.event).find(b => name==='You' ? b.you : (!b.you && b.n===name)); return x ? {r, x, size:r.event.board.length} : null; })
      .filter(Boolean).sort((a,b)=>new Date(b.r.date)-new Date(a.r.date));
    const hc = name==='You' ? null : (KIDS.find(k=>k.name===name)||{}).hcp;
    document.getElementById('detailMiiRow').innerHTML = '';
    document.getElementById('detailMiiRow').style.display = 'none';
    document.getElementById('detailTitle').innerHTML = `<span id="courseTitleText">${esc(name)}</span><span class="crr-rs title-subline">${hc!=null ? 'HC '+hc+' · '+styleOf(name)+' · ' : ''}BGA</span>`;
    document.getElementById('detailTitle').style.marginTop = navStack.length > 0 ? '28px' : '0';
    const wins = t => rowsData.filter(d=>String(d.x.pos)==='1' && (t ? d.r.event.tier===t : d.r.event.tier!=='club')).length;
    const cupRes = cupMonths().filter(cupDone).map(ym=>{ const x = cupStandings(ym).rows.find(q=>q.name===name); return x ? {ym, x} : null; }).filter(Boolean);
    const cupRows = cupRes.map(c=>({k:c.ym+'-99', html:`<tr class="tn-click${c.x.pos===1 ? ' tn-you' : ''}" data-tn-act="cup" data-ym="${c.ym}" data-from="player" data-name="${esc(name)}"><td class="tn-name tn-rcol">${ymLabel(c.ym, true)}</td><td class="tn-wrap"><span class="tn-evlink">${majorIcon(CUP, 18)}${CUP}</span></td><td class="tn-n">${finBadge(c.x.label)}</td></tr>`}));
    const evRows = rowsData.map(d=>({k:d.r.date, html:(()=>{
      const dt = new Date(d.r.date+'T00:00:00').toLocaleDateString('en-US',{month:'short',day:'numeric',year:'2-digit'});
      const pm = d.r.course.match(/^(.*)\s\(([^)]+)\)$/); // "(18)", "(Back 9)" etc. move next to the date
      const nm = (pm ? pm[1] : d.r.course).replace(/\s+\b(golf|country)\b.*$/i, '');
      return `<tr class="tn-click${String(d.x.pos)==='1' ? ' tn-you' : ''}" data-tn-act="openround" data-key="${esc(roundKey(d.r))}"><td class="tn-name tn-rcol">${esc(courseShort(nm))}<small>${dt}</small></td><td class="tn-wrap"><span class="tn-evlink" data-tn-act="eventhist" data-ev="${esc(d.r.event.tier==='major' ? majorNameFor(d.r) : 'series:'+seriesName(d.r.course))}" data-from="player" data-name="${esc(name)}">${d.r.event.tier==='major' ? majorIcon(majorNameFor(d.r), 18)+esc(MAJOR_SHORT[majorNameFor(d.r)]) : esc(eventName(d.r))}</span></td><td class="tn-n">${finBadge(d.x.pos)}</td></tr>`;
    })()}));
    const body = evRows.concat(cupRows).map((o,i)=>({...o,i})).sort((a,b)=>a.k<b.k?1:a.k>b.k?-1:a.i-b.i).map(o=>o.html).join('');
    const cupW = cupRes.filter(c=>c.x.pos===1).length;
    // Trophy shelf: one slot per Major (with how many times won), plus Tour wins
    const wonMajor = {}; rowsData.forEach(d=>{ if(d.r.event.tier==='major' && String(d.x.pos)==='1'){ const m = eventName(d.r); wonMajor[m] = (wonMajor[m]||0)+1; } });
    const shelf = `<div class="tn-shelf">${MAJORS.map(m=>`<div class="tn-tro${wonMajor[m]?' won':''}" data-tn-act="eventhist" data-ev="${esc(m)}" data-from="player" data-name="${esc(name)}">${majorIcon(m, 34)}<b>${wonMajor[m]||0}</b><span>${esc((SHELF_LBL[m]||MAJOR_SHORT[m]).replace(/^The /,''))}</span></div>`).join('')}
      <div class="tn-tro tn-tour${wins('tour')?' won':''}">${bgaImg(26)}<b>${wins('tour')}</b><span>Tour wins</span></div>
      <div class="tn-tro${cupW?' won':''}" data-tn-act="cup" data-from="player" data-name="${esc(name)}">${majorIcon(CUP, 34)}<b>${cupW}</b><span>ShedEx Cup</span></div></div>`;
    document.getElementById('detailBody').innerHTML = `
      ${avgLine(name)}
      <h4 class="tn-shelf-h">Trophy shelf</h4>${shelf}
      <p class="note" style="margin:2px 0 12px;">${rowsData.length} appearances · ${wins()} wins (Tour ${wins('tour')}, Major ${wins('major')}) · Qualifier wins ${wins('club')}${cupW ? ' · ShedEx Cups '+cupW : ''}</p>
      <div class="tn-boardwrap"><table class="tn-board">
        <thead><tr><th>Round</th><th>Event</th><th class="tn-n">Finish</th></tr></thead>
        <tbody>${body || '<tr><td colspan="3">No appearances yet.</td></tr>'}</tbody></table></div>
      <p class="idx-note" style="margin:6px 0 0;">Tap a round to open its card. Wins are highlighted.</p>`;
    detailOverlay.classList.add('open'); detailOverlay.scrollTop = 0;
    try{ fitCourseTitle(); }catch(e){}
    updateBackButton();
  }

  // Which Backyard Open event a planned round would be
  window.tnFutureEventHtml = function(f){
    const futures = [...futureRounds].sort((a,b)=>futureSortKey(a)-futureSortKey(b)), i = futures.indexOf(f);
    const key = f.course.trim().toLowerCase();
    let name, evKey;
    if(f.holes === 18){
      const prior = futures.slice(0, i).filter(x=>x.holes===18).length;
      name = MAJORS[(majorRounds().length + prior) % MAJORS.length]; evKey = name;
    } else {
      const played = rounds.some(r=>r.holes===9 && r.course.trim().toLowerCase()===key) || futures.slice(0,i).some(x=>x.holes===9 && x.course.trim().toLowerCase()===key);
      const earlier = futures.slice(0,i).filter(x=>x.holes===9 && seriesName(x.course)===seriesName(f.course)).length - (rounds.some(r=>r.holes===9 && r.course.trim().toLowerCase()===key) ? 0 : 1);
      name = played ? nextSeriesName(f.course, Math.max(0, earlier), 'tour') : qualifierName(f.course); evKey = 'series:'+seriesName(f.course);
    }
    return `<p class="note" style="margin:-8px 0 12px;display:flex;align-items:center;gap:6px;"><span class="tn-evlink" data-tn-act="eventhist" data-ev="${esc(evKey)}" data-from="future" data-fid="${esc(f.id)}">${majorIcon(name, 22)}<span>BGA: <strong>${esc(name)}</strong></span></span></p>`;
  };

  function detailTitle(t, sub){
    document.getElementById('detailMiiRow').innerHTML = '';
    document.getElementById('detailMiiRow').style.display = 'none';
    document.getElementById('detailTitle').innerHTML = `<span id="courseTitleText">${esc(t)}</span><span class="crr-rs title-subline">${sub}</span>`;
    document.getElementById('detailTitle').style.marginTop = navStack.length > 0 ? '28px' : '0';
  }
  function showDetail(html){ document.getElementById('detailBody').innerHTML = html; detailOverlay.classList.add('open'); detailOverlay.scrollTop = 0; try{ fitCourseTitle(); }catch(e){} updateBackButton(); }
  const hubLink = () => `<p class="note tn-hublink" data-tn-act="hub" style="margin:14px 0 0;font-weight:700;cursor:pointer;text-decoration:underline;text-underline-offset:3px;display:flex;align-items:center;gap:6px;">${bgaImg(18)}BGA Home</p>`;

  // Backyard Open home: summary plus links to every view
  function openBackyardHub(){
    const evs = rounds.filter(r=>r.event && Array.isArray(r.event.board));
    const myPos = r => String((rankBoard(r.event).find(x=>x.you)||{}).pos);
    const won = t => evs.filter(r=>r.event.tier===t && myPos(r)==='1').length;
    const played = t => evs.filter(r=>r.event.tier===t).length;
    const ladder = 1 + won('club');
    detailTitle('BGA', `${evs.length} event${evs.length===1?'':'s'} played`);
    document.getElementById('detailTitle').insertAdjacentHTML('afterbegin', `<span class="tn-titlelogo">${bgaImg(60)}</span>`);
    const stat = (n, l) => `<div class="cell"><div class="num">${n}</div><div class="lbl">${l}</div></div>`;
    showDetail(`
      <div class="strip" style="margin:6px 0 14px;">${stat(won('club'), 'Qualifier Wins')}${stat(won('tour'), 'Tour Wins')}${stat(won('major'), 'Majors')}</div>
      <p class="note" style="margin:0 0 14px;">Next Qualifier field: ${Math.min(30, ladder)} opponent${ladder===1?'':'s'}</p>
      <div class="tn-hubmenu">
        <button type="button" class="btn" data-tn-act="allevents">Show All Events</button>
        <button type="button" class="btn" data-tn-act="career">Career Results</button>
        <button type="button" class="btn" data-tn-act="majorshub">All Majors</button>
        <button type="button" class="btn" data-tn-act="serieslist">Course Events</button>
      </div>`);
  }
  function openCareerResults(){
    detailTitle('Career Results', 'BGA');
    showDetail(window.tnStatsHtml() + hubLink());
  }
  // Every course's Qualifier and Opens, grouped
  function openSeriesList(){
    const evs = rounds.filter(r=>r.event && r.event.tier!=='major' && Array.isArray(r.event.board));
    const S = {};
    evs.forEach(r=>{ const n = seriesName(r.course); (S[n] = S[n] || []).push(r); });
    const rows = Object.entries(S).sort((a,b)=>b[1].length-a[1].length || a[0].localeCompare(b[0])).map(([n,list])=>{
      const mine = list.filter(r=>String((rankBoard(r.event).find(x=>x.you)||{}).pos)==='1').length;
      return `<tr class="tn-click" data-tn-act="eventhist" data-ev="${esc('series:'+n)}" data-from="serieslist"><td class="tn-name tn-wrap">${esc(n)}</td><td class="tn-n">${list.length}</td><td class="tn-n">${mine}</td></tr>`;
    }).join('');
    detailTitle('Course Events', 'Qualifiers and Opens');
    showDetail(`<div class="tn-boardwrap"><table class="tn-board"><thead><tr><th>Event</th><th class="tn-n">Played</th><th class="tn-n">Your wins</th></tr></thead>
      <tbody>${rows || '<tr><td colspan="3">No course events yet.</td></tr>'}</tbody></table></div>` + hubLink());
  }

  // Every Backyard Open event, newest first
  function openAllEvents(){
    const list = rounds.filter(r=>r.event && Array.isArray(r.event.board)).sort((a,b)=>new Date(b.date)-new Date(a.date));
    document.getElementById('detailMiiRow').innerHTML = '';
    document.getElementById('detailMiiRow').style.display = 'none';
    document.getElementById('detailTitle').innerHTML = `<span id="courseTitleText">All Events</span><span class="crr-rs title-subline">BGA</span>`;
    document.getElementById('detailTitle').style.marginTop = navStack.length > 0 ? '28px' : '0';
    let prevYM = null;
    const cupRow = ym => { const s = cupStandings(ym); if(!s.rows.length) return ''; const w = s.rows[0], done = cupDone(ym);
      return `<tr class="tn-click tn-cuprow" data-tn-act="cup" data-ym="${ym}" data-from="allevents">
        <td class="tn-name tn-wrap"><span class="tn-evlink">${majorIcon(CUP, 18)}${CUP}</span><small>${ymLabel(ym, true)} Points Title${done ? '' : ' · In progress'}</small></td>
        <td class="tn-name tn-nowrap"><span class="tn-plink" data-tn-act="player" data-name="${esc(w.name)}" data-from="allevents">${w.you ? '<b>You</b>' : esc(shortName(w.name))}</span><small>(${w.pts} pts)</small></td></tr>`; };
    const rows = list.map(r=>{
      const ym = ymOf(r.date), cup = ym !== prevYM ? cupRow(ym) : ''; prevYM = ym;
      const b = rankBoard(r.event), w = b.find(x=>String(x.pos)==='1') || b[0];
      const isM = r.event.tier === 'major', mn = isM ? majorNameFor(r) : null;
      const pm = r.course.match(/^(.*)\s\(([^)]+)\)$/);
      const dt = new Date(r.date+'T00:00:00').toLocaleDateString('en-US',{month:'short',day:'numeric',year:'2-digit'});
      return cup + `<tr class="tn-click" data-tn-act="openround" data-from="allevents" data-key="${esc(roundKey(r))}">
        <td class="tn-name tn-wrap"><span class="tn-evlink" data-tn-act="eventhist" data-ev="${esc(isM ? mn : 'series:'+seriesName(r.course))}" data-from="allevents">${isM ? majorIcon(mn, 18) : ''}${esc(eventName(r))}</span><small>${dt}${isM ? ' · '+esc(courseShort(r.course)) : ''}</small></td>
        <td class="tn-name tn-nowrap"><span class="tn-plink" data-tn-act="player" data-name="${esc(w.you ? 'You' : w.n)}" data-from="allevents">${w.you ? '<b>You</b>' : esc(shortName(w.n))}</span><small>HC ${w.you ? Number(r.event.index).toFixed(1) : w.h} (${fmt(w.vs)})</small></td></tr>`;
    }).join('');
    document.getElementById('detailBody').innerHTML = `
      <p class="note" style="margin:2px 0 8px;">${list.length} event${list.length===1?'':'s'}</p>
      <div class="tn-boardwrap"><table class="tn-board">
        <thead><tr><th>Event</th><th>Winner</th></tr></thead>
        <tbody>${rows || '<tr><td colspan="2">No events yet.</td></tr>'}</tbody></table></div>
      <p class="idx-note" style="margin:6px 0 0;">Tap an event name for its history, a winner for their results, or a row to open the round.</p>${hubLink()}`;
    detailOverlay.classList.add('open'); detailOverlay.scrollTop = 0;
    try{ fitCourseTitle(); }catch(e){}
    updateBackButton();
  }

  // History of one event: a Major by name, or all Club / all Tour events
  function openEventHistory(ev, view){
    const isMajor = MAJORS.includes(ev), all = isMajor && view === 'all', series = ev.startsWith('series:') ? ev.slice(7) : null;
    const list = (all ? majorRounds() : isMajor ? majorRounds().filter(r=>majorNameFor(r)===ev) : series ? seriesRounds(series) : rounds.filter(r=>r.event && r.event.tier===ev && Array.isArray(r.event.board)))
      .slice().sort((a,b)=>new Date(b.date)-new Date(a.date));
    const title = all ? 'All Majors' : isMajor ? ev : series ? series : ev==='club' ? 'Qualifiers' : (TIERS[ev] ? TIERS[ev].label+' events' : 'BGA');
    document.getElementById('detailMiiRow').innerHTML = '';
    document.getElementById('detailMiiRow').style.display = 'none';
    const logo = isMajor && !all && MAJOR_ICONS[ev] ? `<span class="tn-titlelogo">${majorIcon(ev, 60)}</span>` : '';
    document.getElementById('detailTitle').innerHTML = `${logo}<span id="courseTitleText">${esc(title)}</span><span class="crr-rs title-subline">${isMajor ? 'Major · ' : ''}BGA</span>`;
    document.getElementById('detailTitle').style.marginTop = navStack.length > 0 ? '28px' : '0';
    const winsBy = {};
    const rows = list.map(r=>{
      const b = rankBoard(r.event), w = b.find(x=>String(x.pos)==='1') || b[0], me = b.find(x=>x.you) || {};
      const wn = w.you ? 'You' : w.n; winsBy[wn] = (winsBy[wn]||0) + 1;
      const pm = r.course.match(/^(.*)\s\(([^)]+)\)$/);
      const dt = new Date(r.date+'T00:00:00').toLocaleDateString('en-US',{month:'short',day:'numeric',year:'2-digit'});
      const mn = all ? majorNameFor(r) : null;
      return `<tr class="tn-click${w.you ? ' tn-you' : ''}" data-tn-act="openround" data-from="event" data-ev="${esc(ev)}" data-view="${all ? 'all' : 'one'}" data-key="${esc(roundKey(r))}"><td class="tn-name tn-wrap">${r.event.tier==='major' ? majorIcon(majorNameFor(r), 18)+esc(MAJOR_SHORT[majorNameFor(r)]) : esc(eventName(r))}<small>${dt} · ${esc(courseShort(r.course))}</small></td><td class="tn-name tn-wrap"><span class="tn-plink" data-tn-act="player" data-name="${esc(wn)}" data-from="event" data-ev="${esc(ev)}" data-view="${all ? 'all' : 'one'}">${esc(shortName(wn))}</span><small style="white-space:nowrap">HC ${w.you ? Number(r.event.index).toFixed(1) : w.h} (${fmt(w.vs)})</small></td><td class="tn-n">${me.pos ? finBadge(me.pos) : '—'}</td></tr>`;
    }).join('');
    const champs = Object.entries(winsBy).sort((a,b)=>b[1]-a[1]).map(([n,c])=>`${esc(shortName(n))} ${c}`).join(' · ');
    document.getElementById('detailBody').innerHTML = `
      ${isMajor ? `<div class="view-toggle tn-tabs" style="display:flex;margin:4px 0 10px;"><button type="button" class="view-toggle-btn${all?'':' active'}" data-tn-act="majortab" data-ev="${esc(ev)}" data-view="one">${esc(MAJOR_SHORT[ev])}</button><button type="button" class="view-toggle-btn${all?' active':''}" data-tn-act="majortab" data-ev="${esc(ev)}" data-view="all">All Majors</button></div>` : ''}
      <p class="note" style="margin:2px 0 4px;">Played ${list.length} time${list.length===1?'':'s'}${champs ? ' · Winners: '+champs : ''}</p>
      <div class="tn-boardwrap"><table class="tn-board">
        <thead><tr><th>Event</th><th>Winner</th><th class="tn-n">You</th></tr></thead>
        <tbody>${rows || `<tr><td colspan="3">Not played yet.</td></tr>`}</tbody></table></div>
      <p class="idx-note" style="margin:6px 0 0;">Tap a round to open its card. Your wins are highlighted.</p>${hubLink()}`;
    detailOverlay.classList.add('open'); detailOverlay.scrollTop = 0;
    try{ fitCourseTitle(); }catch(e){}
    updateBackButton();
  }

  // ShedEx Cup page: one month's standings (current month while it's in progress), its events, every Cup
  function openCup(ym){
    const months = cupMonths(); ym = ym || months[0] || nowYM();
    const {rows, evs} = cupStandings(ym), done = cupDone(ym);
    document.getElementById('detailMiiRow').innerHTML = '';
    document.getElementById('detailMiiRow').style.display = 'none';
    document.getElementById('detailTitle').innerHTML = `<span class="tn-titlelogo">${majorIcon(CUP, 60)}</span><span id="courseTitleText">${CUP}</span><span class="crr-rs title-subline">${ymLabel(ym)} · ${done ? 'Final' : 'In progress'}</span>`;
    document.getElementById('detailTitle').style.marginTop = navStack.length > 0 ? '28px' : '0';
    const stand = rows.map(x=>`<tr class="tn-click${x.you?' tn-you':''}" data-tn-act="player" data-name="${esc(x.name)}" data-from="cup" data-ym="${ym}"><td>${esc(x.label)}</td><td class="tn-name">${x.you ? '<b>You</b>' : esc(x.name)}<small>${x.you ? '' : 'HC '+x.h+' · '}${x.ev} event${x.ev===1?'':'s'}${x.wins ? ' · '+x.wins+' win'+(x.wins===1?'':'s') : ''}</small></td><td class="tn-n"><b>${x.pts}</b></td></tr>`).join('');
    const evList = evs.slice().reverse().map(r=>{ const me = rankBoard(r.event).find(x=>x.you) || {}, isM = r.event.tier==='major';
      const dt = new Date(r.date+'T00:00:00').toLocaleDateString('en-US',{month:'short',day:'numeric'});
      return `<tr class="tn-click" data-tn-act="openround" data-from="cup" data-ym="${ym}" data-key="${esc(roundKey(r))}"><td class="tn-name tn-wrap">${isM ? majorIcon(majorNameFor(r), 18) : ''}${esc(eventName(r))}<small>${dt} · ${esc(courseShort(r.course))}</small></td><td class="tn-n">${esc(ordinal(me.pos))}</td><td class="tn-n">${placePts(me.pos)}</td></tr>`; }).join('');
    const all = months.map(m=>{ const s = cupStandings(m), w = s.rows[0], me = s.rows.find(x=>x.you);
      return `<tr class="tn-click${m===ym?' tn-you':''}" data-tn-act="cup" data-ym="${m}" data-from="cuppage"><td class="tn-name">${ymLabel(m)}<small>${cupDone(m) ? 'Final' : 'In progress'}</small></td><td class="tn-name tn-nowrap">${w ? (w.you ? '<b>You</b>' : esc(shortName(w.name))) : '—'}<small>${w ? '('+w.pts+' pts)' : ''}</small></td><td class="tn-n">${me ? esc(ordinal(me.label)) : '—'}</td></tr>`; }).join('');
    document.getElementById('detailBody').innerHTML = `
      <p class="note" style="margin:2px 0 8px;">${evs.length} points event${evs.length===1?'':'s'} in ${ymLabel(ym)}${done ? '' : ' so far. The Cup is decided when the month ends.'}</p>
      <div class="tn-boardwrap"><table class="tn-board">
        <thead><tr><th>Pos</th><th>Player</th><th class="tn-n">Pts</th></tr></thead>
        <tbody>${stand || '<tr><td colspan="3">No Tour or Major events this month yet.</td></tr>'}</tbody></table></div>
      ${evList ? `<h4 class="tn-shelf-h" style="margin-top:16px;">Events</h4><div class="tn-boardwrap"><table class="tn-board"><thead><tr><th>Event</th><th class="tn-n">You</th><th class="tn-n">Pts</th></tr></thead><tbody>${evList}</tbody></table></div>` : ''}
      <h4 class="tn-shelf-h" style="margin-top:16px;">Every ShedEx Cup</h4>
      <div class="tn-boardwrap"><table class="tn-board"><thead><tr><th>Month</th><th>Winner</th><th class="tn-n">You</th></tr></thead><tbody>${all || '<tr><td colspan="3">None yet.</td></tr>'}</tbody></table></div>
      <p class="idx-note" style="margin:6px 0 0;">Tour and Major events earn points (Qualifiers don't): 1st 15, 2nd 12, 3rd 10, then 9 down to 1 for 12th. Ties share the place's points. Level on points goes to the higher HC, and if that's level too, to you.</p>${hubLink()}`;
    detailOverlay.classList.add('open'); detailOverlay.scrollTop = 0;
    try{ fitCourseTitle(); }catch(e){}
    updateBackButton();
  }

  // Rebuild saved BGA events with the USGA index each round was played at: same seed and
  // level, so the field and targets follow the index. Oldest first, so the Qualifier ladder
  // sees the updated results of earlier events. Rounds built into the file are saved as
  // synced copies, the same way editing one works.
  function recalcEvents(){
    const list = rounds.filter(r=>r.event && Array.isArray(r.event.board)).sort(evOrder);
    const changed = []; let skipped = 0;
    list.forEach(r=>{
      const hi = typeof whsHiAt === 'function' ? whsHiAt(r) : null;
      if(hi == null || !hasCard(r)){ skipped++; return; }
      const ev = makeEvent(r, r.event.tier, r.event.seed != null ? r.event.seed : Math.floor(Math.random()*1e9), hi);
      if(JSON.stringify(ev) !== JSON.stringify(r.event)){ r.event = ev; changed.push(r); }
    });
    if(!changed.length) return {changed:0, skipped, total:list.length};
    const fromBase = changed.filter(r => addedRounds.indexOf(r) === -1);
    const keys = fromBase.map(r => [roundKey(r), `${r.date}|${r.course}|${r.score}`, `${r.date}|${r.course}|${r.score}|b${baseRounds.indexOf(r)}`]);
    fromBase.forEach((r,i)=>{
      const copy = JSON.parse(JSON.stringify(r));
      keys[i].forEach(k=>{ if(!deletedKeys.includes(k)) deletedKeys.push(k); });
      addedRounds.push(copy);
    });
    persistAdded(); if(fromBase.length) persistDeleted();
    rebuildRoundsArray(); try{ recompute(); }catch(e){ console.warn(e); }
    return {changed:changed.length, skipped, total:list.length};
  }

  function findRound(key){ return rounds.find(x => roundKey(x) === key); }

  function eventEditor(box, r){
    const e = r.event, index = e.index != null ? e.index : indexBefore(r);
    let tier = e.tier && TIERS[e.tier] ? e.tier : tierAt(r);
    const draw = () => {
      const size = pickKids(tier, index, {date:r.date, round:r}).length + 1;
      box.innerHTML = `<div class="tn-edit">
        <label class="tn-lbl">Event level</label>
        <div class="tn-opts">${Object.entries(TIERS).map(([k,v])=>`<button type="button" data-tier="${k}" aria-pressed="${k===tier}">${v.label}</button>`).join('')}</div>
        <label class="tn-lbl" for="tnStanding">Final standing</label>
        <select id="tnStanding"><option value="">Keep as is</option>${Array.from({length:size},(_,i)=>`<option value="${i+1}">${i+1} of ${size}</option>`).join('')}</select>
        <p class="idx-note" id="tnEditMsg" style="margin:0;"></p>
        <div class="tn-row" style="margin:0;">
          <button class="btn" type="button" id="tnEditSave">Save</button>
          <button class="btn secondary" type="button" id="tnEditRedraw">Re-draw field</button>
          <button class="btn secondary" type="button" id="tnEditRemove">Remove event</button>
        </div></div>`;
      box.querySelectorAll('[data-tier]').forEach(b=>b.onclick=()=>{ tier=b.dataset.tier; draw(); });
      $('tnEditSave').onclick = () => {
        const want = parseInt($('tnStanding').value, 10);
        let ev = null;
        if(isNaN(want)){
          ev = (tier === e.tier && e.seed != null) ? makeEvent(r, tier, e.seed, index) : (tier === e.tier ? e : makeEvent(r, tier, Math.floor(Math.random()*1e9), index));
        } else {
          let best = null, tie = null;
          for(let i=0;i<6000;i++){
            const cand = makeEvent(r, tier, Math.floor(Math.random()*1e9), index), p = posNum(cand);
            const label = String((rankBoard(cand).find(x=>x.you)||{}).pos);
            if(label === String(want)){ ev = cand; break; }
            if(p === want && !tie) tie = cand;
            if(!best || Math.abs(p-want) < Math.abs(posNum(best)-want)) best = cand;
          }
          if(!ev) ev = tie;
          if(!ev){ $('tnEditMsg').textContent = `Couldn't land exactly ${want} with a ${sum(r.holeDetail.scores, r.holes)} in a ${TIERS[tier].label} field. Closest was ${posNum(best)}.`; $('tnEditMsg').classList.add('tn-err'); return; }
        }
        commitRound(r, x => { x.event = ev; });
      };
      $('tnEditRedraw').onclick = () => commitRound(r, x => { x.event = makeEvent(r, tier, Math.floor(Math.random()*1e9), index); });
      const rm = $('tnEditRemove');
      rm.onclick = () => { if(rm.dataset.armed){ commitRound(r, x => { delete x.event; }); } else { rm.dataset.armed = '1'; rm.textContent = 'Tap again to remove'; } };
    };
    draw();
  }

  function roundEditor(box, r){
    const card = hasCard(r);
    box.innerHTML = `<div class="tn-edit">
      <label class="tn-lbl" for="tnEditDate">Date</label>
      <input id="tnEditDate" type="date" value="${esc(r.date)}">
      ${card ? `<label class="tn-lbl">Hole scores</label>
      <div class="tn-edit-holes">${r.holeDetail.scores.map((s,i)=>`<label><i>${i+1}</i><small>par ${r.holeDetail.pars[i]}</small><input type="number" inputmode="numeric" min="1" max="15" data-h="${i}" value="${s}"></label>`).join('')}</div>` : '<p class="idx-note" style="margin:0;">No hole-by-hole scores on this round, so only the date can change.</p>'}
      ${r.event ? '<p class="idx-note" style="margin:0;">Changing scores updates your line on the BGA leaderboard. The field stays the same.</p>' : ''}
      <p class="idx-note" id="tnRoundMsg" style="margin:0;"></p>
      <div class="tn-row" style="margin:0;"><button class="btn" type="button" id="tnRoundSave">Save changes</button><button class="btn secondary" type="button" id="tnRoundCancel">Cancel</button></div></div>`;
    $('tnRoundCancel').onclick = () => { box.innerHTML = ''; };
    $('tnRoundSave').onclick = () => {
      const date = $('tnEditDate').value;
      const scores = card ? Array.from(box.querySelectorAll('[data-h]')).map(i=>parseInt(i.value,10)) : null;
      if(!date || (scores && scores.some(v=>isNaN(v) || v<1))){ $('tnRoundMsg').textContent = 'Enter a date and a score for every hole.'; $('tnRoundMsg').classList.add('tn-err'); return; }
      const idxAt = indexBefore(r);
      commitRound(r, x => {
        x.date = date;
        if(scores && scores.join() !== x.holeDetail.scores.join()){
          x.holeDetail.scores = scores;
          const gross = scores.reduce((a,b)=>a+b,0);
          x.score = gross + (x.holes===9 ? 'Ni' : 'A');
          const raw = (gross - x.rating) * 113 / x.slope;
          x.diff = Math.round((x.holes===9 ? raw + idxAt/2 : raw) * 10) / 10;
          if(x.event && x.event.seed != null) x.event = makeEvent(x, x.event.tier, x.event.seed, x.event.index);
          else if(x.event){ const me = x.event.board.find(b=>b.you); if(me){ me.gross = gross; me.vs = gross - x.event.target; }
            x.event.board = rankBoard(x.event); }
        }
      });
    };
  }

  document.getElementById('detailBody').addEventListener('click', ev=>{
    const btn = ev.target.closest('[data-tn-act]'); if(!btn) return;
    const act0 = btn.dataset.tnAct;
    if(act0 === 'togglestats'){ tnStatsOpen = !tnStatsOpen; $('tnStatsBox').hidden = !tnStatsOpen; btn.innerHTML = btn.innerHTML.replace(tnStatsOpen ? 'Show' : 'Hide', tnStatsOpen ? 'Hide' : 'Show'); return; }
    if(act0 === 'tab'){ const box = document.getElementById('detailBody');
      box.querySelectorAll('[data-tn-act="tab"]').forEach(b=>b.classList.toggle('active', b===btn));
      box.querySelectorAll('[data-tn-pane]').forEach(p=>p.hidden = p.dataset.tnPane !== btn.dataset.tab); return; }
    if(act0 === 'toggleboard'){ tnCardOpen = !tnCardOpen; const bw = btn.closest('.tn-saved').querySelector('[data-tn-board]'); if(bw) bw.hidden = !tnCardOpen; btn.textContent = (tnCardOpen ? 'Hide' : 'Show') + ' leaderboard'; return; }
    if(act0 === 'cup'){ ev.stopPropagation(); const ym = btn.dataset.ym, from = btn.dataset.from;
      if(from === 'allevents') navStack.push(()=>openAllEvents());
      else if(from === 'player'){ const nm = btn.dataset.name; navStack.push(()=>openPlayerDetail(nm)); }
      openCup(ym); return; }
    if(act0 === 'player'){ ev.stopPropagation(); const name = btn.dataset.name, from = btn.dataset.from;
      if(from === 'cup'){ const ym = btn.dataset.ym; navStack.push(()=>openCup(ym)); }
      else if(from === 'round'){ const rr = findRound(btn.dataset.key); navStack.push(()=>{ window.tnOpenEventTab = true; openDetail(rounds.indexOf(rr)); }); }
      else if(from === 'allevents') navStack.push(()=>openAllEvents());
      else if(from === 'event'){ const e2 = btn.dataset.ev, v2 = btn.dataset.view; navStack.push(()=>openEventHistory(e2, v2)); }
      else navStack.push(()=>openCareerResults());
      openPlayerDetail(name); return; }
    if(act0 === 'csort'){ const c = btn.dataset.col;
      tnCareerSort = tnCareerSort.col===c ? {col:c, dir:-tnCareerSort.dir} : {col:c, dir: c==='player' ? 1 : -1};
      const y = detailOverlay.scrollTop; openCareerResults(); detailOverlay.scrollTop = y; return; }
    if(act0 === 'hub'){ navStack = []; openBackyardHub(); return; }
    if(act0 === 'career'){ navStack.push(()=>openBackyardHub()); openCareerResults(); return; }
    if(act0 === 'serieslist'){ navStack.push(()=>openBackyardHub()); openSeriesList(); return; }
    if(act0 === 'majorshub'){ navStack.push(()=>openBackyardHub()); openEventHistory(MAJORS[0], 'all'); return; }
    if(act0 === 'majortab'){ openEventHistory(btn.dataset.ev, btn.dataset.view); return; }
    if(act0 === 'allevents'){ navStack.push(()=>openBackyardHub()); openAllEvents(); return; }
    if(act0 === 'eventhist'){ ev.stopPropagation();
      if(btn.dataset.from === 'allevents'){ navStack.push(()=>openAllEvents()); }
      else if(btn.dataset.from === 'serieslist'){ navStack.push(()=>openSeriesList()); }
      else if(btn.dataset.from === 'future'){ const fid = btn.dataset.fid; navStack.push(()=>openFutureRoundDetail(fid)); }
      else if(btn.dataset.from === 'player'){ const nm = btn.dataset.name; navStack.push(()=>openPlayerDetail(nm)); }
      else { const rr = findRound(btn.dataset.key); navStack.push(()=>{ window.tnOpenEventTab = true; openDetail(rounds.indexOf(rr)); }); }
      openEventHistory(btn.dataset.ev); return; }
    if(act0 === 'openround'){ const rr = findRound(btn.dataset.key); if(!rr) return;
      if(btn.dataset.from === 'allevents'){ navStack.push(()=>openAllEvents()); window.tnOpenEventTab = true; openDetail(rounds.indexOf(rr)); return; }
      if(btn.dataset.from === 'cup'){ const ym = btn.dataset.ym; navStack.push(()=>openCup(ym)); window.tnOpenEventTab = true; openDetail(rounds.indexOf(rr)); return; }
      if(btn.dataset.from === 'event'){ const evn = btn.dataset.ev, vw = btn.dataset.view; navStack.push(()=>openEventHistory(evn, vw)); window.tnOpenEventTab = true; openDetail(rounds.indexOf(rr)); return; }
      const name = document.getElementById('courseTitleText').textContent; navStack.push(()=>openPlayerDetail(name)); window.tnOpenEventTab = true; openDetail(rounds.indexOf(rr)); return; }
    const r = findRound(btn.dataset.key); if(!r) return;
    const box = btn.closest('.tn-saved').querySelector('.tn-editor');
    const act = btn.dataset.tnAct;
    if(act === 'add'){
      const idx = indexBefore(r);
      commitRound(r, x => { x.event = makeEvent(x, tierAt(r), Math.floor(Math.random()*1e9), idx); });
    } else if(act === 'editevent'){
      box.innerHTML ? (box.innerHTML = '') : eventEditor(box, r);
    } else if(act === 'editround'){
      box.innerHTML ? (box.innerHTML = '') : roundEditor(box, r);
    }
  });

  $('tnStartBtn').addEventListener('click', openSetup);
  $('backyardOpenLink').addEventListener('click', ()=>{ navStack = []; openBackyardHub(); detailOverlay.scrollTop = 0; });
  $('addRoundBtn').addEventListener('click', ()=>{ posting = false; refreshAddBlock(); });
  $('tnClose').addEventListener('click', ()=>overlay.classList.remove('open'));
  refreshAddBlock();
  // Read-only helpers for the app shell (app.js) so the BGA tab can draw itself inline
  window.BGA = { KIDS, MAJORS, MAJOR_SHORT, TIERS, rankBoard, eventName, eloRatings, bgaImg, majorIcon,
    shortName, ordinal, styleOf, nextMajorName, inProgress: () => !!T,
    openHub: () => { navStack = []; openBackyardHub(); detailOverlay.scrollTop = 0; },
    openAllEvents: () => { navStack = []; openAllEvents(); detailOverlay.scrollTop = 0; },
    openCareer: () => { navStack = []; openCareerResults(); detailOverlay.scrollTop = 0; },
    openSeries: () => { navStack = []; openSeriesList(); detailOverlay.scrollTop = 0; },
    recalcEvents,
    openCup: (ym) => { navStack = []; openCup(ym); detailOverlay.scrollTop = 0; },
    openMajors: (name) => { navStack = []; openEventHistory(name || MAJORS[0], name ? undefined : 'all'); detailOverlay.scrollTop = 0; },
    openPlayer: (name) => { navStack = []; openPlayerDetail(name); },
    openRound: (key) => { const r = findRound(key); if(r){ navStack = []; window.tnOpenEventTab = true; openDetail(rounds.indexOf(r)); } } };
})();
