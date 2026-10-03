// Ange's Golf Tracker: core tracker code (rounds, handicap, charts, modals).
// ================= DATA =================
const baseRounds = [
  {score:"52Ni", date:"2026-08-08", rating:32.9, slope:110, diff:36.9, course:"Patty Jewett Golf Course", holes:9,
    holeDetail:{
      pars:[5,4,4,4,4,3,5,3,4],
      strokeIndex:[1,13,9,7,11,15,3,17,5],
      scores:[7,7,5,6,6,4,6,5,6]
    }},
  {score:"49Ni", date:"2026-08-05", rating:31.0, slope:101, diff:37.3, course:"Sligo Creek Golf Course", holes:9,
    holeDetail:{
      yards:[254,135,285,160,252,260,278,252,394],
      pars:[4,3,4,3,4,4,4,4,4],
      strokeIndex:[16,18,8,6,14,10,4,12,2],
      scores:[5,5,6,4,5,5,6,6,7]
    }},
  {score:"103A", date:"2026-08-03", rating:69.8, slope:116, diff:32.3, course:"Enterprise Golf Course", holes:18,
    holeDetail:{
      pars:[4,5,4,3,4,4,4,3,5,5,4,4,3,5,3,4,4,4],
      yards:[332,501,365,150,394,364,383,196,531,502,377,348,142,473,134,425,378,340],
      strokeIndex:[16,6,14,18,4,12,10,8,2,3,5,9,15,7,17,1,11,13],
      scores:[4,5,6,5,5,6,6,4,8,7,6,6,4,8,5,7,6,5]
    }},
  {score:"47Ni", date:"2026-08-02", rating:32.5, slope:105, diff:35.2, course:"Northwest - Inside 9", holes:9,
    holeDetail:{
      pars:[4,4,4,4,3,4,4,3,4],
      yards:[362,385,301,312,97,389,306,175,310],
      strokeIndex:[2,3,4,6,9,1,8,7,5],
      scores:[6,5,5,6,3,6,5,5,6]
    }},
  {score:"45Ni", date:"2026-08-01", rating:31.0, slope:101, diff:35.5, course:"Sligo Creek Golf Course", holes:9,
    holeDetail:{
      pars:[4,3,4,3,4,4,4,4,4],
      scores:[5,3,5,5,6,5,5,5,6]
    }},
  {score:"100A", date:"2026-07-31", rating:66.2, slope:112, diff:34.1, course:"Laytonsville Golf Course", holes:18,
    holeDetail:{
      pars:[4,4,3,5,3,5,4,4,4,4,4,3,4,4,4,3,4,5],
      yards:[286,312,152,412,130,444,336,292,290,378,332,145,287,341,382,154,338,496],
      strokeIndex:[14,8,16,4,18,2,6,10,12,5,7,17,13,11,3,15,9,1],
      scores:[5,5,4,7,5,7,6,6,5,5,7,3,5,6,5,6,6,7]
    }},
  {score:"102A", date:"2026-07-29", rating:68.2, slope:107, diff:35.7, course:"East Potomac Golf Links (B)", holes:18,
    holeDetail:{
      pars:[4,4,5,3,4,5,4,3,4,4,3,5,4,4,3,4,5,4],
      yards:[343,377,564,154,286,507,297,196,336,302,167,456,354,389,162,419,546,371],
      strokeIndex:[7,3,1,13,17,5,15,9,11,16,14,10,8,4,18,2,6,12],
      scores:[5,5,7,5,5,8,6,5,6,5,5,5,6,7,5,6,7,4]
    }},
  {score:"47Ni", date:"2026-07-27", rating:31.0, slope:101, diff:37.1, course:"Sligo Creek Golf Course", holes:9,
    holeDetail:{pars:[4,3,4,3,4,4,4,4,4], scores:[5,4,4,3,6,7,5,8,5]}},
  {score:"50Ni", date:"2026-07-26", rating:31.0, slope:101, diff:41.6, course:"Sligo Creek Golf Course", holes:9,
    holeDetail:{pars:[4,3,4,3,4,4,4,4,4], scores:[6,6,6,4,5,6,5,6,6]}},
  {score:"53Ni", date:"2026-07-24", rating:32.8, slope:112, diff:40.3, course:"Bowie Golf Club", holes:9,
    holeDetail:{pars:[4,3,4,4,3,4,5,3,5], scores:[4,7,7,7,4,6,6,6,6]}},
  {score:"50Ni", date:"2026-07-22", rating:31.0, slope:101, diff:41.2, course:"Sligo Creek Golf Course", holes:9,
    holeDetail:{pars:[4,3,4,3,4,4,4,4,4], scores:[5,5,6,6,6,4,6,6,6]}},
  {score:"50Ni", date:"2026-07-20", rating:31.0, slope:101, diff:40.7, course:"Sligo Creek Golf Course", holes:9,
    holeDetail:{pars:[4,3,4,3,4,4,4,4,4], scores:[5,5,6,5,6,5,6,6,6]}},
  {score:"38Ni", date:"2026-07-17", rating:29.8, slope:93,  diff:30.6, course:"Needwood Executive", holes:9,
    holeDetail:{pars:[3,3,4,3,3,3,3,4,3], scores:[3,4,4,3,4,4,6,6,4]}},
  {score:"49Ni", date:"2026-07-17", rating:30.7, slope:99,  diff:41.5, course:"Rock Creek Golf Course", holes:9,
    holeDetail:{pars:[4,4,3,3,3,4,3,4,4], scores:[6,8,4,5,5,7,4,4,6]}},
  {score:"60Ni", date:"2026-07-04", rating:35.1, slope:130, diff:41.8, course:"Rehoboth Beach CC", holes:9,
    holeDetail:{
      pars:[4,4,3,5,3,4,4,4,5],
      yards:[386,375,169,504,129,349,313,374,452],
      strokeIndex:[7,9,5,11,17,3,13,1,15],
      scores:[7,8,5,8,3,8,8,6,7]
    }},
  {score:"51Ni", date:"2026-07-15", rating:29.4, slope:85,  diff:47.6, course:"Paint Branch Golf Course", holes:9,
    holeDetail:{pars:[4,3,3,3,4,4,3,3,4], scores:[6,7,5,6,4,8,5,3,7]}},
  {score:"50Ni", date:"2026-07-13", rating:31.0, slope:101, diff:41.8, course:"Sligo Creek Golf Course", holes:9,
    holeDetail:{pars:[4,3,4,3,4,4,4,4,4], scores:[5,4,6,3,7,7,6,6,6]}},
  {score:"51Ni", date:"2026-07-11", rating:31.0, slope:101, diff:41.3, course:"Sligo Creek Golf Course", holes:9,
    holeDetail:{pars:[4,3,4,3,4,4,4,4,4], scores:[6,4,5,4,7,7,6,5,7]}},
  {score:"57Ni", date:"2026-07-11", rating:32.5, slope:105, diff:45.3, course:"Northwest - Inside 9", holes:9,
    holeDetail:{pars:[4,4,4,4,3,4,4,3,4], scores:[7,8,8,7,4,8,5,5,5]}},
  {score:"43Ni", date:"2026-07-10", rating:29.8, slope:93,  diff:35.1, course:"Needwood Executive", holes:9,
    holeDetail:{pars:[3,3,4,3,3,3,3,4,3], scores:[5,6,5,3,5,5,5,6,3]}},
  {score:"57Ni", date:"2026-07-10", rating:31.0, slope:101, diff:48.1, course:"Sligo Creek Golf Course", holes:9,
    holeDetail:{pars:[4,3,4,3,4,4,4,4,4], scores:[5,5,8,6,7,6,6,6,8]}},
  {score:"43Ni", date:"2026-07-08", rating:29.8, slope:93,  diff:35.1, course:"Needwood Executive", holes:9,
    holeDetail:{pars:[3,3,4,3,3,3,3,4,3], scores:[5,4,6,5,4,3,4,7,5]}},
  {score:"49Ni", date:"2026-07-08", rating:31.0, slope:101, diff:39.2, course:"Sligo Creek Golf Course", holes:9,
    holeDetail:{pars:[4,3,4,3,4,4,4,4,4], scores:[5,6,5,5,5,4,5,6,8]}},
  {score:"48Ni", date:"2026-07-06", rating:30.0, slope:96,  diff:40.2, course:"Sligo Creek Golf Course", holes:9,
    holeDetail:{pars:[4,3,4,3,4,4,4,4,4], scores:[6,4,5,5,5,7,6,5,5]}},
];

// Future (planned) rounds baked directly into the file -- like baseRounds, these survive
// fresh downloads and different devices/browsers. Add an entry here whenever the user
// tells you about a round they're planning, the same way scorecards get added to
// baseRounds. Rounds added through the app's own UI only live in that browser's local
// storage until someone reports them here.
const baseFutureRounds = [
  // {id:"f...", date:"2026-08-13", course:"Bowie Golf Club (18)", holes:18, rating:70.4, slope:124, pars:null, hour:9, minute:0},
];

// rounds the user has added/deleted persist across sessions via the browser's localStorage
// (works when this file is hosted/opened normally — e.g. GitHub Pages — not inside Claude's artifact sandbox)
const hasStorage = typeof window !== 'undefined' && !!window.localStorage;
let addedRounds = [];   // user-added rounds, persisted
let deletedKeys = [];   // keys of baseRounds the user deleted, persisted
let courseRenames = {}; // old course name -> new course name, persisted
let ratingSlopeOverrides = {}; // lowercased course name -> {rating, slope}, persisted -- retroactive edits made via the Edit Course modal, applied to every round at that course on every load
let parOverrides = {}; // lowercased course name -> array of per-hole par values, persisted -- retroactive edits made via the Edit Course modal, applied to every round at that course on every load
let rounds = [...baseRounds];

// Must stay deterministic and reproducible across sessions -- deletedKeys persists this
// exact string to identify which baseRounds entries the user has removed, so the same
// logical round needs to produce the same key on every fresh load. Keeps the original
// date|course|score format unchanged for the vast majority of rounds (preserving
// compatibility with any already-persisted deletedKeys), only appending a stable
// disambiguator -- each round's position within its own source array -- when a genuine
// collision is actually detected (e.g. two 9-hole rounds at the same course on the same
// day that happened to score the same), which the plain format alone can't tell apart.
function roundKey(r){
  const baseKeyStr = `${r.date}|${r.course}|${r.score}`;
  const collidingCount = [...baseRounds, ...addedRounds].filter(x => `${x.date}|${x.course}|${x.score}` === baseKeyStr).length;
  if(collidingCount <= 1) return baseKeyStr;
  const inBase = baseRounds.indexOf(r);
  const sourceTag = inBase >= 0 ? `b${inBase}` : `a${addedRounds.indexOf(r)}`;
  return `${baseKeyStr}|${sourceTag}`;
}

// ===== REMOVABLE: Round badges =====
// Purely derived from existing data (trend, holeDetail, COURSE_LOCATIONS) -- nothing is
// stored separately, so badges apply retroactively to every existing round automatically,
// with no migration needed.

// Mirrors computeExpScoreFor's exact formula, but uses the PRIOR round's trend index
// (trend[roundNum-2]) instead of the latest one -- "expected at the time," not counting
// this round's own contribution to the trend. Returns null for the very first round ever
// (no prior trend exists) or a round with no rating/slope.
function expScoreAtTimeOf(r){
  // Prefer the permanently-stored snapshot if this round has one (saved after this
  // feature existed) -- only fall back to the dynamic calculation for older rounds that
  // predate it, which carries the theoretical (if unlikely) risk of shifting if an
  // earlier-dated round ever gets logged after the fact.
  // Recalculated from the USGA index as of the start of that round's day, so every past
  // round follows the current handicap rules (older stored snapshots are ignored).
  const idx = whsHiAt(r);
  if(idx == null || isNaN(r.rating) || isNaN(r.slope)) return null;
  return r.holes === 9
    ? Math.round((idx/2) * r.slope / 113 + r.rating)
    : Math.round(idx * r.slope / 113 + r.rating);
}

// Computes the CURRENT top-8-lowest-differential rounds -- dynamic, unlike every other
// badge in this app: this one can be taken away from an older round if a later round
// beats its way into the top 8, since it reflects live status as of right now, not a
// historical snapshot as of when each round was played. Simulates the top-8 list's
// evolution in chronological order so each currently-qualifying round's label can show
// what differential it displaced, if anything, at the moment it entered.
function computeHandicapSpotMap(){
  const chronoAll = [...rounds]
    .filter(r => r.diff != null && !isNaN(r.diff))
    .sort((a,b)=> new Date(a.date) - new Date(b.date));
  const cv = r => whsCountsAs(r);

  // Snapshot: given a chronological index, what's the top-8-by-differential among just
  // the 20 most recent outings as of that point (inclusive)?
  function top8AsOfIndex(i){
    const windowRounds = chronoAll.slice(Math.max(0, i - 19), i + 1);
    return [...windowRounds].sort((a,b)=> cv(a) - cv(b)).slice(0, 8).map(r => roundKey(r));
  }

  // Walk forward through history one outing at a time, comparing each snapshot to the
  // one before it. A round can enter the top 8 either by beating its way in on merit, OR
  // because an older top-8 round just aged past the 20-round window -- both cases show up
  // the same way here: something present in the previous snapshot is now missing. This
  // also correctly handles the case where the newly-vacated slot goes to a DIFFERENT,
  // already-existing round in the window rather than the brand-new outing itself.
  const replacedBy = {};
  let prevTop8Keys = [];
  chronoAll.forEach((r, i) => {
    const currentTop8Keys = top8AsOfIndex(i);
    const newEntrants = currentTop8Keys.filter(k => !prevTop8Keys.includes(k));
    const dropped = prevTop8Keys.filter(k => !currentTop8Keys.includes(k));
    newEntrants.forEach((enteredKey, idx) => {
      if(dropped[idx] != null){
        const droppedRound = chronoAll.find(x => roundKey(x) === dropped[idx]);
        if(droppedRound) replacedBy[enteredKey] = cv(droppedRound);
      }
    });
    prevTop8Keys = currentTop8Keys;
  });

  const finalTop8Keys = chronoAll.length > 0 ? top8AsOfIndex(chronoAll.length - 1) : [];
  return { currentTop8Keys: new Set(finalTop8Keys), replacedBy };
}

function computeRoundBadges(r){
  const badges = [];
  const roundNum = roundNumberOf[roundKey(r)]; // 1-indexed chronological position

  // Handicap Spot -- dynamic, see computeHandicapSpotMap's own comment. Recomputed fresh
  // each call rather than cached, since the app's data volume is small enough that this
  // is cheap regardless.
  if(r.diff != null && !isNaN(r.diff)){
    const handicapSpotData = computeHandicapSpotMap();
    const thisKey = roundKey(r);
    if(handicapSpotData.currentTop8Keys.has(thisKey)){
      const replaced = handicapSpotData.replacedBy[thisKey];
      const replacedText = replaced != null ? ` (${whsCountsAs(r).toFixed(1)} replacing ${replaced.toFixed(1)})` : '';
      badges.push({icon: '♿️', label: `Handicap Spot: Round with a top 8 differential${replacedText}`});
    }
  }

  // First round chronologically in this state
  const loc = COURSE_LOCATIONS[r.course];
  if(loc && loc.label){
    const state = loc.label.split(',').pop().trim();
    const chrono = [...rounds].sort((a,b)=> new Date(a.date) - new Date(b.date));
    const firstInState = chrono.find(x => {
      const xLoc = COURSE_LOCATIONS[x.course];
      return xLoc && xLoc.label && xLoc.label.split(',').pop().trim() === state;
    });
    if(firstInState && roundKey(firstInState) === roundKey(r)){
      badges.push({icon: '🗺️', label: `Location Unlocked: First round played in ${state}`});
    }
  }

  if(r.holeDetail){
    // Birdie and eagle are independent -- a round can earn both at once, unlike the
    // 8-count pair below which escalates instead of stacking.
    const birdieCount = r.holeDetail.scores.filter((s,i) => s - r.holeDetail.pars[i] === -1).length;
    if(birdieCount > 0){
      badges.push({icon: '🐦', label: `Put A Bird On It: Score a birdie`, count: birdieCount});
    }
    const eagleCount = r.holeDetail.scores.filter((s,i) => s - r.holeDetail.pars[i] <= -2).length;
    if(eagleCount > 0){
      badges.push({icon: '🦅', label: `On Eagle's Wings: Eagle!`, count: eagleCount});
    }
    const hasDoublePlus = r.holeDetail.scores.some((s,i) => s - r.holeDetail.pars[i] >= 2);
    if(!hasDoublePlus){
      badges.push({icon: '🧤', label: 'Clean Sheet: No holes worse than bogey'});
    }
    const parCount = r.holeDetail.scores.filter((s,i) => s - r.holeDetail.pars[i] === 0).length;
    const requiredPars = 2 * (r.holes / 9);
    const parUnits = Math.floor(parCount / requiredPars);
    if(parUnits >= 1){
      badges.push({icon: '🅿️', label: `Party Hard: ${requiredPars}+ pars`, count: parUnits});
    }
  }

  // Course record at the time -- was this the best score EVER at this course, as of when
  // it was played, comparing only against PRIOR rounds at this course. A debut round has
  // nothing to beat yet, so it never qualifies for this badge -- that's intentional, not
  // an oversight: you can't set a record on your first attempt.
  const thisRoundNum = roundNumberOf[roundKey(r)];
  if(thisRoundNum){
    const priorAtCourse = rounds.filter(x =>
      x.course.trim().toLowerCase() === r.course.trim().toLowerCase() &&
      roundNumberOf[roundKey(x)] != null &&
      roundNumberOf[roundKey(x)] < thisRoundNum
    );
    if(priorAtCourse.length > 0){
      const bestScoreBefore = Math.min(...priorAtCourse.map(scoreOf));
      if(scoreOf(r) <= bestScoreBefore){
        badges.push({icon: '🏆', label: 'Broke Course Record'});
      }
    }
  }

  // 3+/5+ strokes better/worse than expected AT THE TIME (9-hole / 18-hole respectively --
  // not a simple per-9 scalar since 5 isn't double 3)
  const expAtTime = expScoreAtTimeOf(r);
  if(expAtTime !== null){
    const threshold = r.holes === 9 ? 3 : 5;
    const actualScore = scoreOf(r);
    const strokeDiff = actualScore - expAtTime;
    if(strokeDiff >= threshold){
      badges.push({icon: '🫠', label: `Meltdown: +${threshold} or worse against expected score`});
    } else if(-strokeDiff >= threshold){
      badges.push({icon: '🔥', label: `On Fire!: -${threshold} or better against expected score`});
    }
  }

  // Balanced round -- front 9 and back 9 score-to-par within 1 stroke of each other.
  // 18-hole rounds only, since a 9-hole round has no front/back split to compare.
  if(r.holes === 18 && r.holeDetail){
    const frontToPar = r.holeDetail.scores.slice(0,9).reduce((s,v,i)=>s+v-r.holeDetail.pars[i], 0);
    const backToPar = r.holeDetail.scores.slice(9).reduce((s,v,i)=>s+v-r.holeDetail.pars[i+9], 0);
    if(Math.abs(frontToPar - backToPar) <= 1){
      badges.push({icon: '🪞', label: 'Mirror Image: Front and back within 1 stroke'});
    }

    // Finishing stretch (holes 16-18), also 18-hole only
    const finishToPar = r.holeDetail.scores.slice(15,18).reduce((s,v,i)=>s+v-r.holeDetail.pars[i+15], 0);
    if(finishToPar >= 7){
      badges.push({icon: '🥱', label: 'Siesta: Finish holes 16-18 at +7 or worse'});
    } else if(finishToPar <= 3){
      badges.push({icon: '🏃‍♂️', label: 'Trackstar: Finish holes 16-18 at +3 or better'});
    }

    // Amen Corner -- holes 10-12 (indices 9-11) EACH individually at bogey or better,
    // not a cumulative/combined total across the three.
    const amenCornerAllBogeyOrBetter = [9,10,11].every(i => r.holeDetail.scores[i] - r.holeDetail.pars[i] <= 1);
    if(amenCornerAllBogeyOrBetter){
      badges.push({icon: '🙏🏻', label: 'Amen Corner: Holes 10-12 each at bogey or better'});
    }
  }

  // 3 Goggles -- at least 3 individual par-3 holes each scored at par (3) or better.
  // Naturally requires the course to have 3+ par-3s in the first place.
  if(r.holeDetail){
    const par3Indices = r.holeDetail.pars.reduce((acc,p,i)=>{ if(p===3) acc.push(i); return acc; }, []);
    const qualifyingPar3Count = par3Indices.filter(i => r.holeDetail.scores[i] <= 3).length;
    if(qualifyingPar3Count >= 3){
      badges.push({icon: '👌', label: '3 Goggles: 3+ par-3s at 3 or better'});
    }
  }

  // 99 Club -- broke 100 over a genuinely full-length 18-hole course (par 65+), so this
  // doesn't trivially trigger on a short executive course.
  if(r.holes === 18){
    const courseParTotal = PAR_BY_COURSE[r.course];
    if(courseParTotal != null && courseParTotal >= 65 && scoreOf(r) < 100){
      badges.push({icon: '💯', label: 'Break 100 over 18 holes'});
    }
  }

  // Nemesis System -- beat your own best-ever score on a specific hole by 2+ strokes.
  // Only eligible from the 3rd round at this course onward, since with just one prior
  // round any hole could trivially look "2 better" by chance alone -- a real "best prior"
  // baseline needs at least two rounds behind it.
  if(r.holeDetail && thisRoundNum){
    const priorAtCourseWithHoles = rounds.filter(x =>
      x.course.trim().toLowerCase() === r.course.trim().toLowerCase() &&
      x.holeDetail &&
      roundNumberOf[roundKey(x)] != null &&
      roundNumberOf[roundKey(x)] < thisRoundNum
    );
    if(priorAtCourseWithHoles.length >= 2){
      const nemesisHoles = [];
      r.holeDetail.scores.forEach((s, i) => {
        const priorScoresAtHole = priorAtCourseWithHoles
          .filter(x => x.holeDetail.scores[i] != null)
          .map(x => x.holeDetail.scores[i]);
        if(priorScoresAtHole.length === 0) return;
        const bestPriorAtHole = Math.min(...priorScoresAtHole);
        if(s <= bestPriorAtHole - 2) nemesisHoles.push(i + 1);
      });
      if(nemesisHoles.length > 0){
        const holeWord = nemesisHoles.length === 1 ? 'Hole' : 'Holes';
        badges.push({icon: '😈', label: `Nemesis System: Beat your best-ever score on a hole by 2+ strokes (min. 3 plays) (${holeWord} ${nemesisHoles.join(', ')})`, count: nemesisHoles.length});
      }
    }
  }

  // Every par type -- made par or better on at least one par-3, one par-4, and one par-5,
  // only possible on courses that actually have all three par types.
  if(r.holeDetail){
    const hasAll3Types = [3,4,5].every(p => r.holeDetail.pars.includes(p));
    if(hasAll3Types){
      const madeParOrBetter = (parType) => r.holeDetail.scores.some((s,i) => r.holeDetail.pars[i] === parType && s <= parType);
      if([3,4,5].every(madeParOrBetter)){
        badges.push({icon: '🌈', label: 'Triple Rainbow: Par or better on all 3 types of pars'});
      }
    }
  }

  // Scored an 8 on a hole. 2+ eights escalates to the snowman instead -- never both at
  // once, since 2+ eights already implies at least one.
  if(r.holeDetail){
    const eightCount = r.holeDetail.scores.filter(s => s === 8).length;
    if(eightCount >= 2){
      badges.push({icon: '☃️', label: `Let It Snow!: Score 2+ 8s`});
    } else if(eightCount === 1){
      badges.push({icon: '⛄️', label: 'Snowman: Score an 8'});
    }

    // Jackpot! -- exactly three 7s, slot-machine style.
    const sevenCount = r.holeDetail.scores.filter(s => s === 7).length;
    if(sevenCount === 3){
      badges.push({icon: '🎰', label: 'Jackpot!: Score exactly 3 7s'});
    }

    // Eris -- same score on 5+ CONSECUTIVE holes. Only ever awarded once per round even
    // if a run is longer than 5, or there's more than one qualifying run.
    let erisRunLength = 1;
    let erisEarned = false;
    for(let i = 1; i < r.holeDetail.scores.length; i++){
      if(r.holeDetail.scores[i] === r.holeDetail.scores[i-1]){
        erisRunLength++;
        if(erisRunLength >= 5) erisEarned = true;
      } else {
        erisRunLength = 1;
      }
    }
    if(erisEarned){
      badges.push({icon: '🌖', label: 'Eris: Score the same number on 5 consecutive holes'});
    }

    // Straight Flush -- 5 consecutive holes score 5 DISTINCT numbers whose range is
    // exactly 4 -- the only way 5 distinct integers can span a range of 4 is if they ARE
    // the 5 consecutive integers from the minimum to minimum+4, in any order (not
    // necessarily ascending/descending on the card itself).
    let straightFlushEarned = false;
    for(let i = 0; i + 5 <= r.holeDetail.scores.length; i++){
      const window = r.holeDetail.scores.slice(i, i+5);
      const distinct = new Set(window);
      if(distinct.size === 5 && (Math.max(...window) - Math.min(...window)) === 4){
        straightFlushEarned = true;
        break;
      }
    }
    if(straightFlushEarned){
      badges.push({icon: '🃏', label: 'Straight Flush: 5 consecutive holes score 5 unique, consecutive numbers'});
    }
  }

  // Milestone rounds -- exact chronological round count, ever
  if(roundNum != null && [10,25,50,100].includes(roundNum)){
    badges.push({icon: '🔟', label: `Round #${roundNum} logged`});
  }

  // Debut win -- first-ever round at this course, and it beat the expected score
  if(roundNum != null){
    const roundsAtCourse = rounds.filter(x => x.course.trim().toLowerCase() === r.course.trim().toLowerCase());
    const firstAtCourse = roundsAtCourse.reduce((earliest, x) => {
      const xNum = roundNumberOf[roundKey(x)];
      if(xNum == null) return earliest;
      if(!earliest) return x;
      return xNum < roundNumberOf[roundKey(earliest)] ? x : earliest;
    }, null);
    if(firstAtCourse && roundKey(firstAtCourse) === roundKey(r) && expAtTime !== null && scoreOf(r) < expAtTime){
      badges.push({icon: '🐣', label: 'Hatched: Debut new course under expected score'});
    }
  }

  // Explorer -- this round is the first-ever at its PHYSICAL course (combining (9)/(18)
  // variants as one course, same principle as the per-hole best/median tracking
  // elsewhere), AND that makes it the 5th, 10th, 15th... distinct course played overall.
  // Explorer specifically groups by ANY trailing parenthetical, not just (9)/(18) -- e.g.
  // Blue/White tee variants count as one course here, unlike the (9)/(18)-only scope used
  // for Best/Median score and per-hole tracking elsewhere, which those don't affect.
  if(roundNum != null){
    const stripHoleSuffixForExplorer = (name) => {
      const m = name.trim().match(/^(.*)\s\([^)]*\)$/);
      return (m ? m[1] : name).trim().toLowerCase();
    };
    const thisBaseCourseForExplorer = stripHoleSuffixForExplorer(r.course);
    const roundsAtThisBaseCourse = rounds.filter(x =>
      stripHoleSuffixForExplorer(x.course) === thisBaseCourseForExplorer &&
      roundNumberOf[roundKey(x)] != null
    );
    const firstAtBaseCourse = roundsAtThisBaseCourse.reduce((earliest, x) => {
      const xNum = roundNumberOf[roundKey(x)];
      if(!earliest) return x;
      return xNum < roundNumberOf[roundKey(earliest)] ? x : earliest;
    }, null);
    if(firstAtBaseCourse && roundKey(firstAtBaseCourse) === roundKey(r)){
      const roundsUpToNow = rounds.filter(x => roundNumberOf[roundKey(x)] != null && roundNumberOf[roundKey(x)] <= roundNum);
      const distinctCourseCount = new Set(roundsUpToNow.map(x => stripHoleSuffixForExplorer(x.course))).size;
      if(distinctCourseCount % 5 === 0){
        badges.push({icon: '🧭', label: `Explorer: ${distinctCourseCount}th distinct course played`});
      }
    }
  }

  return badges;
}

function renderRoundBadgesHtml(r){
  const badges = computeRoundBadges(r);
  if(badges.length === 0) return '';
  const iconsHtml = badges.map(b =>
    `<button type="button" class="round-badge-btn" title="${b.label.replace(/"/g,'&quot;')}" data-label="${b.label.replace(/"/g,'&quot;')}" style="display:inline-flex;align-items:center;font-size:17px;line-height:1;background:none;border:none;padding:2px;cursor:pointer;">${b.count && b.count > 1 ? `${b.icon}×${b.count}` : b.icon}</button>`
  ).join('');
  return `<span style="display:inline-flex;align-items:center;">${iconsHtml}</span>`;
}

// Plain, non-interactive version for contexts already inside a clickable row (like a
// Bolds the part of a badge label before its first colon (the "title", e.g. "Meltdown"
// in "Meltdown: +2 or worse..."). If there's no colon, the whole label is bold instead.
function formatBadgeLabelHtml(label){
  const colonIdx = label.indexOf(':');
  if(colonIdx === -1) return `<strong>${label}</strong>`;
  return `<strong>${label.slice(0, colonIdx)}</strong>${label.slice(colonIdx)}`;
}

// course's round list) -- avoids the badge buttons' own clicks bubbling up and also
// triggering the row's navigation.
function renderRoundBadgesIconsOnly(r){
  const badges = computeRoundBadges(r);
  if(badges.length === 0) return '';
  return badges.map(b =>
    `<span title="${b.label.replace(/"/g,'&quot;')}">${b.count && b.count > 1 ? `${b.icon}×${b.count}` : b.icon}</span>`
  ).join(' ');
}

// Counts how many times this same badge icon has been earned chronologically, up to and
// including this round -- i.e. this occurrence's all-time sequence number for that badge.
function computeBadgeAllTimeRank(r, icon){
  const thisRoundNum = roundNumberOf[roundKey(r)];
  if(thisRoundNum == null) return null;
  const priorAndSelf = rounds
    .filter(x => roundNumberOf[roundKey(x)] != null && roundNumberOf[roundKey(x)] <= thisRoundNum)
    .sort((a,b) => roundNumberOf[roundKey(a)] - roundNumberOf[roundKey(b)]);
  let rank = 0;
  priorAndSelf.forEach(x => {
    if(computeRoundBadges(x).some(b => b.icon === icon)) rank++;
  });
  return rank;
}

// Same header form/format as the Round History detail card, followed by one line per
// badge earned this round, each showing its all-time sequence number for that badge type.
function openRoundBadgesDetail(idx){
  const r = rounds[idx];
  const dateFmt = new Date(r.date+'T00:00:00').toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'});
  const loc = COURSE_LOCATIONS[r.course];
  const parenMatch = r.course.match(/^(.*)\s\(([^)]+)\)$/);
  const displayTitle = parenMatch ? parenMatch[1].trim() : r.course;
  const parenContent = parenMatch ? parenMatch[2].trim() : null;
  const isHoleCountSuffix = parenContent === '9' || parenContent === '18';
  const parenSuffix = (parenContent && !isHoleCountSuffix) ? ` · ${parenContent}` : '';
  const rsLocLine = `${r.rating.toFixed(1)}/${r.slope}${loc && loc.label ? ` · ${loc.label}` : ''}${parenSuffix}`;
  document.getElementById('detailTitle').innerHTML = `<span id="courseTitleText">${displayTitle}</span><span class="crr-rs title-subline">${rsLocLine}</span>`;
  document.getElementById('detailTitle').style.marginTop = navStack.length > 0 ? '28px' : '0';

  const expAtTime = expScoreAtTimeOf(r);
  const actualScoreForBadges = scoreOf(r);
  const scoreVsExpDiffForBadges = expAtTime !== null ? actualScoreForBadges - expAtTime : null;
  const scoreVsExpTextForBadges = scoreVsExpDiffForBadges === null ? '' : (scoreVsExpDiffForBadges === 0 ? ' (E)' : ` (${scoreVsExpDiffForBadges > 0 ? '+' : ''}${scoreVsExpDiffForBadges})`);
  let body = `<p class="note" style="margin:2px 0 0;">${dateFmt} · ${r.holes}-hole round · Differential ${r.diff.toFixed(1)}${expAtTime !== null ? ` · Expected Score ${expAtTime} · Actual Score ${actualScoreForBadges}${scoreVsExpTextForBadges}` : ''}</p>`;

  const badges = computeRoundBadges(r);
  if(badges.length === 0){
    body += `<p class="note" style="margin:16px 0 0;">No badges earned this round.</p>`;
  } else {
    body += badges.map(b => {
      const rank = computeBadgeAllTimeRank(r, b.icon);
      const rankText = rank != null ? ` (<span class="badge-rank-link" data-icon="${b.icon}" style="cursor:pointer;text-decoration:underline;">#${rank} all-time</span>)` : '';
      return `<p class="note" style="margin:16px 0 0;">${b.icon} - ${formatBadgeLabelHtml(b.label)}${rankText}</p>`;
    }).join('');
  }

  document.getElementById('detailMiiRow').innerHTML = '';
  document.getElementById('detailMiiRow').style.display = 'none';
  body += `<div style="text-align:center;margin-top:16px;"><button class="btn" id="viewAllBadgesBtn" type="button">View All Badges</button></div>`;
  document.getElementById('detailBody').innerHTML = body;
  detailOverlay.classList.add('open');
  fitCourseTitle();
  updateBackButton();
  document.getElementById('viewAllBadgesBtn').addEventListener('click', ()=>{
    navStack.push(()=>openRoundBadgesDetail(idx));
    openAllBadgesDetail();
  });
  document.querySelectorAll('.badge-rank-link').forEach(el=>{
    el.addEventListener('click', ()=>{
      const icon = el.dataset.icon;
      navStack.push(()=>openRoundBadgesDetail(idx));
      openBadgeRoundsList(icon);
    });
  });
}

// Static catalog of every badge type with a generic (hole-count-independent) description,
// used for the all-time summary page -- this is where "On Fire!"'s two label variants
// (-2 for 9 holes, -4 for 18) get combined into a single entry, since they're the same
// badge type earned under different scaling, not two different badges.
const BADGE_CATALOG = [
  {icon: '♿️', name: 'Handicap Spot', desc: 'One of your current top 8 lowest differentials among the last 20 outings (dynamic -- can be lost to a later or newly-eligible round)'},
  {icon: '🗺️', name: 'Location Unlocked', desc: 'First round played in a new state'},
  {icon: '🐦', name: 'Put A Bird On It', desc: 'Score a birdie'},
  {icon: '🦅', name: "On Eagle's Wings", desc: 'Eagle!'},
  {icon: '🧤', name: 'Clean Sheet', desc: 'No holes worse than bogey'},
  {icon: '🅿️', name: 'Party Hard', desc: '2+ pars per 9 holes played'},
  {icon: '🏆', name: 'Broke Course Record', desc: 'Best score ever at that course, as of when it was played'},
  {icon: '🫠', name: 'Meltdown', desc: '3+ (9-hole) or 5+ (18-hole) strokes worse than expected'},
  {icon: '🔥', name: 'On Fire!', desc: '3+ (9-hole) or 5+ (18-hole) strokes better than expected'},
  {icon: '🪞', name: 'Mirror Image', desc: 'Front and back 9 within 1 stroke of each other'},
  {icon: '🙏🏻', name: 'Amen Corner', desc: 'Holes 10-12 each at bogey or better'},
  {icon: '👌', name: '3 Goggles', desc: '3+ par-3s at 3 or better'},
  {icon: '💯', name: '99 Club', desc: 'Break 100 over 18 holes'},
  {icon: '😈', name: 'Nemesis System', desc: 'Beat your best-ever score on a hole by 2+ strokes (min. 3 plays)'},
  {icon: '🌈', name: 'Triple Rainbow', desc: 'Par or better on a par-3, par-4, and par-5 in the same round'},
  {icon: '☃️', name: 'Let It Snow!', desc: 'Score 2+ 8s in a round'},
  {icon: '⛄️', name: 'Snowman', desc: 'Score exactly one 8 in a round'},
  {icon: '🎰', name: 'Jackpot!', desc: 'Score exactly 3 7s in a round'},
  {icon: '🌖', name: 'Eris', desc: 'Score the same number on 5 consecutive holes'},
  {icon: '🃏', name: 'Straight Flush', desc: '5 consecutive holes score 5 unique, consecutive numbers'},
  {icon: '🔟', name: 'Milestone', desc: 'Round #10, #25, #50, or #100 logged, ever'},
  {icon: '🐣', name: 'Hatched', desc: 'Debut round at a new course that beat the expected score'},
  {icon: '🧭', name: 'Explorer', desc: 'Your 5th, 10th, 15th... distinct course played'},
  {icon: '🥱', name: 'Siesta', desc: 'Finish holes 16-18 at +7 or worse'},
  {icon: '🏃‍♂️', name: 'Trackstar', desc: 'Finish holes 16-18 at +3 or better'},
];

function computeAllBadgeCounts(){
  const counts = {};
  rounds.forEach(r => {
    const seenIcons = new Set(computeRoundBadges(r).map(b => b.icon));
    seenIcons.forEach(icon => { counts[icon] = (counts[icon] || 0) + 1; });
  });
  return counts;
}

// Lists every round where a specific badge icon was earned, each clickable through to
// that round's own detail page. Reached from either "earned N times" on the All Badges
// page or "#N all-time" on a single round's Round Badges page.
function openBadgeRoundsList(icon){
  const catalogEntry = BADGE_CATALOG.find(b => b.icon === icon);
  const chrono = [...rounds].sort((a,b)=> new Date(a.date) - new Date(b.date));
  const matchingRounds = chrono.filter(r => computeRoundBadges(r).some(b => b.icon === icon));

  document.getElementById('detailTitle').innerHTML = `${icon} ${catalogEntry ? catalogEntry.name : ''}`;
  document.getElementById('detailTitle').style.marginTop = navStack.length > 0 ? '28px' : '0';

  let body;
  if(matchingRounds.length === 0){
    body = `<p class="note" style="margin:16px 0 0;">No rounds yet.</p>`;
  } else {
    body = matchingRounds.map(r => {
      const dateFmt = new Date(r.date+'T00:00:00').toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
      const parenMatch = r.course.match(/^(.*)\s\(([^)]+)\)$/);
      const displayCourse = parenMatch ? parenMatch[1].trim() : r.course;
      return `<p class="note badge-round-link" data-key="${roundKey(r)}" style="margin:12px 0 0;cursor:pointer;">${dateFmt} — ${displayCourse} — ${scoreOf(r)}</p>`;
    }).join('');
  }

  document.getElementById('detailMiiRow').innerHTML = '';
  document.getElementById('detailMiiRow').style.display = 'none';
  document.getElementById('detailBody').innerHTML = body;
  detailOverlay.classList.add('open');
  updateBackButton();

  document.querySelectorAll('.badge-round-link').forEach(el=>{
    el.addEventListener('click', ()=>{
      const key = el.dataset.key;
      const idx = rounds.findIndex(r => roundKey(r) === key);
      if(idx >= 0){
        navStack.push(()=>openBadgeRoundsList(icon));
        openDetail(idx);
      }
    });
  });
}

function openAllBadgesDetail(){
  document.getElementById('detailTitle').innerHTML = 'All Badges';
  document.getElementById('detailTitle').style.marginTop = navStack.length > 0 ? '28px' : '0';

  const counts = computeAllBadgeCounts();
  const sortedCatalog = [...BADGE_CATALOG].sort((a,b) => (counts[b.icon] || 0) - (counts[a.icon] || 0));
  const body = sortedCatalog.map(b => {
    const count = counts[b.icon] || 0;
    const countText = count > 0
      ? `<span class="badge-count-link" data-icon="${b.icon}" style="cursor:pointer;text-decoration:underline;">earned ${count} time${count === 1 ? '' : 's'}</span>`
      : `earned ${count} times`;
    return `<p class="note" style="margin:16px 0 0;">${b.icon} - <strong>${b.name}</strong>: ${b.desc} — ${countText}</p>`;
  }).join('');

  document.getElementById('detailMiiRow').innerHTML = '';
  document.getElementById('detailMiiRow').style.display = 'none';
  document.getElementById('detailBody').innerHTML = body;
  detailOverlay.classList.add('open');
  updateBackButton();

  document.querySelectorAll('.badge-count-link').forEach(el=>{
    el.addEventListener('click', ()=>{
      const icon = el.dataset.icon;
      navStack.push(()=>openAllBadgesDetail());
      openBadgeRoundsList(icon);
    });
  });
}
// ===== END REMOVABLE =====


function rebuildRoundsArray(){
  const activeBase = baseRounds.filter(r => !deletedKeys.includes(roundKey(r)));
  rounds = [...activeBase, ...addedRounds];
}

// If a course "X (18)" is added and a plain "X" already exists, relabel every existing
// "X" round to "X (9)" so the two variants stay distinct going forward. Mutates the
// round objects in place so the rename sticks for the rest of the session and applies
// to any future round added under the old plain name too.
function applyCourseRenames(){
  if(Object.keys(courseRenames).length === 0) return;
  // Only relabels the round's course text. Deliberately does NOT touch PAR_BY_COURSE or
  // courseRegistry (rating/slope) -- both are genuinely tied to a specific tee
  // configuration (a course's 9-hole and 18-hole versions can have real, different par
  // and rating/slope), so the two names stay fully independent aside from the rename
  // itself. If the renamed round's own par/rating/slope isn't registered under its new
  // name yet, each is backfilled from that SAME round's own stored data -- self-contained,
  // never borrowed from the other course.
  [...baseRounds, ...addedRounds].forEach(r=>{
    if(courseRenames[r.course]){
      const oldName = r.course;
      // Chain through every applicable rename, not just one step -- a course renamed
      // more than once over time (A -> B, later B -> C) must resolve all the way to its
      // final name on every fresh load, not get stuck at an intermediate name. Capped to
      // guard against an accidental circular mapping (A -> B, B -> A).
      let steps = 0;
      while(courseRenames[r.course] && courseRenames[r.course] !== r.course && steps < 20){
        r.course = courseRenames[r.course];
        steps++;
      }
      if(PAR_BY_COURSE[r.course] == null && r.holeDetail){
        PAR_BY_COURSE[r.course] = r.holeDetail.pars.reduce((s,x)=>s+x,0);
      }
      const newKey = r.course.trim().toLowerCase();
      if(courseRegistry[newKey] == null && !isNaN(r.rating) && !isNaN(r.slope)){
        courseRegistry[newKey] = {rating: r.rating, slope: r.slope, holes: r.holes};
        persistCourseRegistry();
      }
      // Location is the one exception to "never shared between old and new names" --
      // a course's (9) and (18) variants are the same physical place, so the new name
      // inherits whatever location the old name already had, if it doesn't have its own.
      if(COURSE_LOCATIONS[r.course] == null && COURSE_LOCATIONS[oldName] != null){
        COURSE_LOCATIONS[r.course] = COURSE_LOCATIONS[oldName];
        persistLocations();
      }
    }
  });
}

// Applies persisted rating/slope corrections to every round at a course, regardless of
// whether it came from baseRounds (hardcoded in the source, can't self-persist an edit)
// or addedRounds -- this is the actual persistence mechanism editing a course's
// rating/slope relies on, run fresh on every load the same way renames are.
// Retroactively applies a corrected rating/slope to every round at a course. For 18-hole
// rounds this is a pure function of (score, rating, slope) -- safe to just recompute
// directly. For 9-hole rounds, the differential includes a "synthetic other 9"
// contribution based on the player's handicap AT THE TIME that round was played -- a
// historical fact that a course data correction has no business changing. Rather than
// look that up from trend[] (which is either stale, at this point in the load order, or
// circular, since this course's own old differentials had already fed into it), this
// backs the contribution out directly from the round's own existing old rating/slope/diff
// and reapplies it on top of the new raw calculation -- never touching trend[] at all.
function applyRatingSlopeOverrides(){
  if(Object.keys(ratingSlopeOverrides).length === 0) return;
  [...baseRounds, ...addedRounds].forEach(r=>{
    const override = ratingSlopeOverrides[r.course.trim().toLowerCase()];
    if(override && !isNaN(override.rating) && !isNaN(override.slope)){
      const score = scoreOf(r);
      if(r.holes === 9){
        const oldRaw = (score - r.rating) * 113 / r.slope;
        const trendContribution = r.diff - oldRaw;
        const newRaw = (score - override.rating) * 113 / override.slope;
        r.diff = Math.round((newRaw + trendContribution) * 10) / 10;
      } else {
        r.diff = computeDiff(score, override.rating, override.slope, r.holes);
      }
      r.rating = override.rating;
      r.slope = override.slope;
    }
  });
}

function persistRatingSlopeOverrides(){
  if(!hasStorage) return;
  try{ window.localStorage.setItem('anges-golf-rating-slope-overrides', JSON.stringify(ratingSlopeOverrides)); }catch(e){}
  scheduleFirebaseSync();
}
function loadPersistedRatingSlopeOverrides(){
  if(!hasStorage) return;
  try{
    const raw = window.localStorage.getItem('anges-golf-rating-slope-overrides');
    if(raw) ratingSlopeOverrides = JSON.parse(raw);
  }catch(e){}
}

// Retroactively applies a corrected per-hole par array to every round at a course.
// Unlike rating/slope, par has no bearing on differential at all (that's purely a
// function of score, rating, and slope) -- so this deliberately does NOT touch r.diff.
// What it DOES affect: each round's own holeDetail.pars (used by the scorecard display
// and by every badge that depends on score-to-par -- birdie/bogey counts, Mirror Image, 3
// Goggles, Amen Corner, and so on), plus PAR_BY_COURSE's simple total-par lookup used by
// toParStr/toParAndExpStr. Badges and stats are computed fresh from holeDetail.pars every
// time they're viewed, never cached, so updating the stored pars here is genuinely
// sufficient -- nothing else needs to be explicitly "recalculated."
function applyParOverrides(){
  if(Object.keys(parOverrides).length === 0) return;
  [...baseRounds, ...addedRounds].forEach(r=>{
    const override = parOverrides[r.course.trim().toLowerCase()];
    if(override && r.holeDetail && override.length === r.holeDetail.pars.length){
      r.holeDetail.pars = [...override];
      PAR_BY_COURSE[r.course] = override.reduce((s,p)=>s+p, 0);
    }
  });
}
function persistParOverrides(){
  if(!hasStorage) return;
  try{ window.localStorage.setItem('anges-golf-par-overrides', JSON.stringify(parOverrides)); }catch(e){}
  scheduleFirebaseSync();
}
function loadPersistedParOverrides(){
  if(!hasStorage) return;
  try{
    const raw = window.localStorage.getItem('anges-golf-par-overrides');
    if(raw) parOverrides = JSON.parse(raw);
  }catch(e){}
}

// ================= FIREBASE SYNC =================
// Debounced so rapid edits (e.g. filling out a whole scorecard) collapse into one write
// instead of firing on every keystroke. `applyingRemoteState` guards against a write we
// just made immediately bouncing back through our own subscription and re-triggering itself.
let firebaseSyncTimer = null;
let applyingRemoteState = false;

function gatherSyncableState(){
  return {
    addedRounds, deletedKeys, courseRenames, ratingSlopeOverrides, parOverrides,
    addedFutureRounds, deletedFutureRoundIds,
    courseRegistry, customPars: PAR_BY_COURSE, customLocations: COURSE_LOCATIONS, savedNewCourses, deletedSavedCourseKeys,
    updatedAt: Date.now()
  };
}

function scheduleFirebaseSync(){
  if(applyingRemoteState) return;
  if(typeof window.__fbSaveState !== 'function') return;
  if(firebaseSyncTimer) clearTimeout(firebaseSyncTimer);
  firebaseSyncTimer = setTimeout(()=>{
    window.__fbSaveState(gatherSyncableState());
  }, 800);
}

function applyRemoteState(data){
  applyingRemoteState = true;
  if(data.addedRounds) addedRounds = data.addedRounds;
  if(data.deletedKeys) deletedKeys = data.deletedKeys;
  // Merge, not overwrite -- a rename just made locally must never be silently erased by
  // a slightly-stale snapshot arriving right after it (the sync is debounced, so this is
  // a real timing window). Renames are additive by nature: once made, a name mapping
  // should never disappear just because an older snapshot catches up.
  if(data.courseRenames) courseRenames = Object.assign({}, courseRenames, data.courseRenames);
  if(data.ratingSlopeOverrides) ratingSlopeOverrides = Object.assign({}, ratingSlopeOverrides, data.ratingSlopeOverrides);
  if(data.parOverrides) parOverrides = Object.assign({}, parOverrides, data.parOverrides);
  if(data.addedFutureRounds) addedFutureRounds = data.addedFutureRounds;
  if(data.deletedFutureRoundIds) deletedFutureRoundIds = data.deletedFutureRoundIds;
  if(data.courseRegistry) courseRegistry = Object.assign({}, COURSE_REGISTRY_DEFAULTS, data.courseRegistry);
  if(data.customPars) PAR_BY_COURSE = Object.assign({}, PAR_BY_COURSE_DEFAULTS, data.customPars);
  if(data.customLocations) COURSE_LOCATIONS = Object.assign({}, COURSE_LOCATIONS_DEFAULTS, data.customLocations);
  if(data.savedNewCourses) savedNewCourses = Object.assign({}, savedNewCourses, data.savedNewCourses);
  // Union, not overwrite -- a tombstone list can only ever grow safely. A stale/incomplete
  // remote snapshot must never be able to un-delete something that was already removed
  // locally, which a plain overwrite would do.
  if(data.deletedSavedCourseKeys) deletedSavedCourseKeys = [...new Set([...deletedSavedCourseKeys, ...data.deletedSavedCourseKeys])];

  // keep the localStorage mirror current too, so the offline fallback matches the cloud
  if(hasStorage){
    try{
      window.localStorage.setItem('anges-golf-rounds-added', JSON.stringify(addedRounds));
      window.localStorage.setItem('anges-golf-rounds-deleted', JSON.stringify(deletedKeys));
      window.localStorage.setItem('anges-golf-course-renames', JSON.stringify(courseRenames));
      window.localStorage.setItem('anges-golf-rating-slope-overrides', JSON.stringify(ratingSlopeOverrides));
      window.localStorage.setItem('anges-golf-par-overrides', JSON.stringify(parOverrides));
      window.localStorage.setItem('anges-golf-future-rounds', JSON.stringify(addedFutureRounds));
      window.localStorage.setItem('anges-golf-future-rounds-deleted', JSON.stringify(deletedFutureRoundIds));
      window.localStorage.setItem('anges-golf-course-registry', JSON.stringify(courseRegistry));
      window.localStorage.setItem('anges-golf-custom-pars', JSON.stringify(PAR_BY_COURSE));
      window.localStorage.setItem('anges-golf-course-locations', JSON.stringify(COURSE_LOCATIONS));
      window.localStorage.setItem('anges-golf-saved-new-courses', JSON.stringify(savedNewCourses));
      window.localStorage.setItem('anges-golf-deleted-saved-courses', JSON.stringify(deletedSavedCourseKeys));
    }catch(e){}
  }

  applyCourseRenames();
  applyRatingSlopeOverrides();
  applyParOverrides();
  rebuildRoundsArray();
  rebuildFutureRoundsArray();
  recompute();
  applyingRemoteState = false;
}

function persistAdded(){
  if(!hasStorage) return;
  try{ window.localStorage.setItem('anges-golf-rounds-added', JSON.stringify(addedRounds)); }catch(e){}
  scheduleFirebaseSync();
}
function persistDeleted(){
  if(!hasStorage) return;
  try{ window.localStorage.setItem('anges-golf-rounds-deleted', JSON.stringify(deletedKeys)); }catch(e){}
  scheduleFirebaseSync();
}
function persistRenames(){
  if(!hasStorage) return;
  try{ window.localStorage.setItem('anges-golf-course-renames', JSON.stringify(courseRenames)); }catch(e){}
  scheduleFirebaseSync();
}
let futureRounds = [];        // computed: baseFutureRounds (minus cancelled) + addedFutureRounds
let addedFutureRounds = [];   // future rounds added through the app UI, persisted
let deletedFutureRoundIds = []; // ids of baseFutureRounds entries the user cancelled or edited away, persisted

function rebuildFutureRoundsArray(){
  const activeBase = baseFutureRounds.filter(f => !deletedFutureRoundIds.includes(f.id));
  futureRounds = [...activeBase, ...addedFutureRounds];
}
function removeFutureRound(id){
  const addedIdx = addedFutureRounds.findIndex(f => f.id === id);
  if(addedIdx !== -1){
    addedFutureRounds.splice(addedIdx, 1);
    persistAddedFutureRounds();
  } else if(!deletedFutureRoundIds.includes(id)){
    deletedFutureRoundIds.push(id);
    persistDeletedFutureRoundIds();
  }
  rebuildFutureRoundsArray();
}
function persistAddedFutureRounds(){
  if(!hasStorage) return;
  try{ window.localStorage.setItem('anges-golf-future-rounds', JSON.stringify(addedFutureRounds)); }catch(e){}
  scheduleFirebaseSync();
}
function persistDeletedFutureRoundIds(){
  if(!hasStorage) return;
  try{ window.localStorage.setItem('anges-golf-future-rounds-deleted', JSON.stringify(deletedFutureRoundIds)); }catch(e){}
  scheduleFirebaseSync();
}

// Rating/slope for courses that have never actually been played (and may not even have a
// Future Round planned) -- pre-registered so autofill works the moment the name is typed
// anywhere. Baked-in defaults below are merged with anything the user has entered since.
const COURSE_REGISTRY_DEFAULTS = {
  "bowie golf club (18)": {rating:70.4, slope:124, holes:18},
};
let courseRegistry = { ...COURSE_REGISTRY_DEFAULTS };
function persistCourseRegistry(){
  if(!hasStorage) return;
  try{ window.localStorage.setItem('anges-golf-course-registry', JSON.stringify(courseRegistry)); }catch(e){}
  scheduleFirebaseSync();
}
function lookupCourseInfo(name){
  const key = name.trim().toLowerCase();
  return courseLookup[key] || courseRegistry[key] || null;
}
function saveCourseInfoToRegistry(name, rating, slope, holes){
  const key = name.trim().toLowerCase();
  if(!key || isNaN(rating) || isNaN(slope)) return;
  courseRegistry[key] = {rating, slope, holes};
  persistCourseRegistry();
}
function loadPersisted(){
  if(hasStorage){
    try{
      const raw = window.localStorage.getItem('anges-golf-rounds-added');
      if(raw) addedRounds = JSON.parse(raw);
    }catch(e){ addedRounds = []; }
    try{
      const raw = window.localStorage.getItem('anges-golf-rounds-deleted');
      if(raw) deletedKeys = JSON.parse(raw);
    }catch(e){ deletedKeys = []; }
    try{
      const raw = window.localStorage.getItem('anges-golf-course-renames');
      if(raw) courseRenames = JSON.parse(raw);
    }catch(e){ courseRenames = {}; }
    try{
      const raw = window.localStorage.getItem('anges-golf-future-rounds');
      if(raw) addedFutureRounds = JSON.parse(raw);
    }catch(e){ addedFutureRounds = []; }
    try{
      const raw = window.localStorage.getItem('anges-golf-future-rounds-deleted');
      if(raw) deletedFutureRoundIds = JSON.parse(raw);
    }catch(e){ deletedFutureRoundIds = []; }
    try{
      const raw = window.localStorage.getItem('anges-golf-course-registry');
      if(raw) courseRegistry = Object.assign({}, COURSE_REGISTRY_DEFAULTS, JSON.parse(raw));
    }catch(e){ /* keep defaults */ }
  }
  rebuildFutureRoundsArray();
  loadPersistedPars();
  loadPersistedLocations();
  loadPersistedSavedNewCourses();
  loadPersistedRatingSlopeOverrides();
  loadPersistedParOverrides();
  applyCourseRenames();
  applyRatingSlopeOverrides();
  applyParOverrides();
  rebuildRoundsArray();
  recompute();

}

// Subscribe to cross-device sync once the Firebase bridge module has actually finished
// loading (it's an ES module, so it always runs after this classic script, regardless of
// source order -- this listener just waits for it rather than racing it). First snapshot:
// if the cloud doc doesn't exist yet (brand new setup), seed it with whatever's already in
// local storage. Every snapshot after that -- including ones triggered by another device's
// edits -- overwrites local state with the cloud's version and re-renders.
function setupFirebaseSubscription(){
  if(typeof window.__fbSubscribe === 'function'){
    window.__fbSubscribe(
      (remoteData) => { applyRemoteState(remoteData); },
      (docMissing) => { if(docMissing) scheduleFirebaseSync(); }
    );
  }
}
if(window.__fbReady !== undefined){
  // module already finished (unlikely this early, but handle it just in case)
  setupFirebaseSubscription();
} else {
  window.addEventListener('firebaseBridgeReady', setupFirebaseSubscription);
}

const dayNum = d => Math.round(new Date(d).getTime()/86400000);
const lowDiffFaceB64 = "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";
let currentTheme = 'default';
let diffChart;
let t0, trend, reg, diffResidualSD, chartSegPoints;
let roundNumberOf = {};
let currentBestCount = 1;
let courseLookup = {}; // normalized course name -> {name, rating, slope, holes}

function refreshCourseLookup(){
  courseLookup = {};
  // sort oldest -> newest so the most recent round at each course wins
  const chrono = [...rounds].sort((a,b)=> new Date(a.date) - new Date(b.date));
  chrono.forEach(r=>{
    const key = r.course.trim().toLowerCase();
    courseLookup[key] = {name:r.course, rating:r.rating, slope:r.slope, holes:r.holes};
  });
  const datalist = document.getElementById('courseList');
  datalist.innerHTML = Object.values(courseLookup)
    .sort((a,b) => a.name.localeCompare(b.name))
    .map(c => `<option value="${c.name.replace(/"/g,'&quot;')}"></option>`)
    .join('');
}

// ================= MII AVATAR =================
// ================= DIFFERENTIAL =================
function computeDiff(grossScore, rating, slope, holes){
  const raw = (grossScore - rating) * 113 / slope;
  if(holes === 9){
    // WHS treats a lone 9-hole score as combined with a synthetic "expected" other 9
    // (roughly half the player's current index) before it becomes an 18-hole-scale
    // differential — matches how the historical "Ni" data in this set is scaled.
    const currentIdx = (trend && trend.length) ? trend[trend.length-1].index : 0;
    return Math.round((raw + currentIdx/2) * 10) / 10;
  }
  return Math.round(raw * 10) / 10;
}

function scoreOf(r){
  return parseInt(r.score.replace(/(A|Ni)$/,''), 10);
}

function median(arr){
  const sorted = [...arr].sort((a,b)=>a-b);
  const mid = Math.floor(sorted.length/2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid-1] + sorted[mid]) / 2;
}

function shortMonthYear(dateStr){
  const d = new Date(dateStr+'T00:00:00');
  const month = d.toLocaleDateString('en-US',{month:'short'});
  const year2 = String(d.getFullYear()).slice(-2);
  return `${month} \u2019${year2}`;
}

let PAR_BY_COURSE = {
  "Patty Jewett Golf Course": 36,
  "Sligo Creek Golf Course": 34,
  "Needwood Executive": 29,
  "Northwest - Inside 9": 34,
  "Enterprise Golf Course": 72,
  "Laytonsville Golf Course": 71,
  "East Potomac Golf Links (B)": 72,
  "Bowie Golf Club": 35,
  "Rehoboth Beach CC": 36,
  "Rock Creek Golf Course": 32,
  "Paint Branch Golf Course": 31,
};
// Coordinates supplied directly rather than auto-geocoded, so weather forecasts are only
// ever shown for courses with a known-good location. A course missing from here just
// silently gets no weather shown -- never a wrong-location guess.
let COURSE_LOCATIONS = {
  "Sligo Creek Golf Course": {lat: 39.0126, lon: -77.0186, label: "Silver Spring, Maryland"},
  "Needwood Executive": {lat: 39.1348, lon: -77.1497, label: "Derwood, Maryland"},
  "Paint Branch Golf Course": {lat: 38.9807, lon: -76.9369, label: "College Park, Maryland"},
  "Northwest - Inside 9": {lat: 39.0762, lon: -77.0555, label: "Silver Spring, Maryland"},
  "East Potomac Golf Links (B)": {lat: 38.8786, lon: -77.0157, label: "Washington, D.C."},
  "Oak Creek Golf Club": {lat: 38.8513, lon: -76.8331, label: "Brock Hall, Maryland"},
  "Bowie Golf Club": {lat: 39.0068, lon: -76.7791, label: "Bowie, Maryland"},
  "Patty Jewett Golf Course": {lat: 38.8600, lon: -104.8214, label: "Colorado Springs, Colorado"},
  "Enterprise Golf Course": {lat: 38.8892, lon: -76.7458, label: "Mitchellville, Maryland"},
  "Laytonsville Golf Course": {lat: 39.2298, lon: -77.1341, label: "Laytonsville, Maryland"},
  "Rock Creek Golf Course": {lat: 38.9528, lon: -77.0225, label: "Washington, D.C."},
  "Rehoboth Beach CC": {lat: 38.7204, lon: -75.0760, label: "Rehoboth Beach, Delaware"},
};
const COURSE_LOCATIONS_DEFAULTS = { ...COURSE_LOCATIONS };
function persistLocations(){
  if(!hasStorage) return;
  try{ window.localStorage.setItem('anges-golf-course-locations', JSON.stringify(COURSE_LOCATIONS)); }catch(e){}
  scheduleFirebaseSync();
}
// Courses ever entered via a Future Round's New Course form, keyed by lowercase name --
// persists even if that future round is later deleted, so a course you've set up once
// (rating/slope/holes) doesn't need to be re-typed from scratch if you plan another
// round there before ever actually playing it.
let savedNewCourses = {};
// Tombstone list for savedNewCourses -- mirrors deletedKeys' role for rounds. A plain
// merge on savedNewCourses itself can only ever ADD entries back from a stale snapshot,
// never represent "this was deleted" -- so deletion is tracked separately here instead,
// the same way round deletion is tracked separately from baseRounds.
let deletedSavedCourseKeys = [];
function persistSavedNewCourses(){
  if(!hasStorage) return;
  try{ window.localStorage.setItem('anges-golf-saved-new-courses', JSON.stringify(savedNewCourses)); }catch(e){}
  scheduleFirebaseSync();
}
function persistDeletedSavedCourseKeys(){
  if(!hasStorage) return;
  try{ window.localStorage.setItem('anges-golf-deleted-saved-courses', JSON.stringify(deletedSavedCourseKeys)); }catch(e){}
  scheduleFirebaseSync();
}
function loadPersistedSavedNewCourses(){
  if(!hasStorage) return;
  try{
    const raw = window.localStorage.getItem('anges-golf-saved-new-courses');
    if(raw) savedNewCourses = JSON.parse(raw);
    const rawDeleted = window.localStorage.getItem('anges-golf-deleted-saved-courses');
    if(rawDeleted) deletedSavedCourseKeys = JSON.parse(rawDeleted);
  }catch(e){}
}
function loadPersistedLocations(){
  if(!hasStorage) return;
  try{
    const raw = window.localStorage.getItem('anges-golf-course-locations');
    if(raw) COURSE_LOCATIONS = Object.assign({}, COURSE_LOCATIONS_DEFAULTS, JSON.parse(raw));
  }catch(e){}
}
// Snapshot of the hardcoded defaults, taken before anything can mutate PAR_BY_COURSE.
// Cloud/local sync always merges onto THIS, never onto whatever PAR_BY_COURSE currently
// holds -- so a course renamed or added in the file always wins over stale synced data
// from a browser that saw an older version of the file.
const PAR_BY_COURSE_DEFAULTS = { ...PAR_BY_COURSE };

function persistPars(){
  if(!hasStorage) return;
  try{ window.localStorage.setItem('anges-golf-custom-pars', JSON.stringify(PAR_BY_COURSE)); }catch(e){}
  scheduleFirebaseSync();
}
function loadPersistedPars(){
  if(!hasStorage) return;
  try{
    const raw = window.localStorage.getItem('anges-golf-custom-pars');
    if(raw) PAR_BY_COURSE = Object.assign({}, PAR_BY_COURSE_DEFAULTS, JSON.parse(raw));
  }catch(e){}
}

function toParStr(score, course){
  const par = PAR_BY_COURSE[course];
  if(par == null) return '';
  const diff = Math.round((score - par) * 10) / 10;
  if(diff === 0) return ' (E)';
  return ` (${diff > 0 ? '+' : ''}${diff})`;
}

// Combined "score to par / score vs expected" text for Round History, e.g. " (+11 / E)".
// Omits the whole parenthetical (rather than showing a partial/broken one) if either
// value isn't available -- par unknown, or this is the very first round ever (no prior
// trend to compute an expected score against).
function toParAndExpStr(r){
  const score = scoreOf(r);
  const par = PAR_BY_COURSE[r.course];
  if(par == null) return '';

  const parDiff = Math.round((score - par) * 10) / 10;
  const parText = parDiff === 0 ? 'E' : (parDiff > 0 ? `+${parDiff}` : `${parDiff}`);

  // Falls back to "E" for this slot specifically when there's no prior trend to compare
  // against (e.g. the very first round ever) -- still shows the against-par half, which
  // is always computable, rather than omitting the whole thing.
  const expAtTime = expScoreAtTimeOf(r);
  let expText = 'E';
  if(expAtTime != null){
    const expDiff = score - expAtTime;
    expText = expDiff === 0 ? 'E' : (expDiff > 0 ? `+${expDiff}` : `${expDiff}`);
  }

  return ` (${parText}/${expText})`;
}

// ================= CORE RECOMPUTE =================
// The last index calculation (for the Handicap screen) and the manual-index key
var whsCalc = {recent:[], k:0, plus:0, index:null, override:null};
// Per round (by roundKey): USGA index at the start of its day, and the differential USGA counts
var whsHiByKey = {}, whsDByKey = {};
function whsHiAt(r){ const v = whsHiByKey[roundKey(r)]; return v == null ? null : v; }
function whsCountsAs(r){ const v = whsDByKey[roundKey(r)]; return v == null ? r.diff : v; }
const HI_OVERRIDE_KEY = 'anges-golf-hi-override';
function recompute(){
  const chrono = [...rounds].sort((a,b)=> new Date(a.date) - new Date(b.date));
  t0 = dayNum(chrono[0].date);

  roundNumberOf = {};
  chrono.forEach((r, i)=>{ roundNumberOf[roundKey(r)] = i + 1; });

  // "Handicap" is the average of the lowest 8 differentials BY OUTING -- each played
  // round counts once, regardless of whether it was 9 or 18 holes. Previously an
  // 18-hole round was double-counted as two 9-hole "segments," which skewed the
  // average toward 18-hole rounds; that's intentionally gone now.
  // Handicap Index by USGA World Handicap System rules. Only the index uses these numbers;
  // each round's own differential (r.diff, the chart) is left as it is.
  //  - 9-hole rounds: 9-hole differential + expected 9-hole differential (0.52 x index at
  //    the time + 1.2) makes the 18-hole differential that counts.
  //  - Fewer than 20 scores: USGA table (how many lowest count, plus any adjustment).
  //  - Exceptional score: 7.0-9.9 below the index at the time takes 1.0 off the most recent
  //    20 differentials, 10.0+ takes 2.0 off.
  const WHS_TABLE = {3:[1,-2],4:[1,-1],5:[1,0],6:[2,-1],7:[2,0],8:[2,0],9:[3,0],10:[3,0],11:[3,0],12:[4,0],13:[4,0],14:[4,0],15:[5,0],16:[5,0],17:[6,0],18:[6,0],19:[7,0]};
  const outingDiffs = [];
  let whsIdx = null, dayIdx = null, curDay = null;
  whsHiByKey = {}; whsDByKey = {};
  trend = [];
  chartSegPoints = [];
  for(const r of chrono){
    // GHIN uses the index as of the start of the day: two rounds on one day share it
    if(r.date !== curDay){ curDay = r.date; dayIdx = whsIdx; }
    let d = r.diff, raw9 = null;
    const gross = parseInt(String(r.score), 10);
    if(r.holes === 9 && dayIdx != null && !isNaN(gross) && r.rating && r.slope){
      raw9 = Math.round((gross - r.rating) * 113 / r.slope * 10) / 10;
      d = Math.round((raw9 + 0.52*dayIdx + 1.2) * 10) / 10;
    }
    // hi = index going into this round (used for the 9-hole conversion and the exceptional-score check)
    const e = {d, adj:0, r, raw9, hi:dayIdx, cut:0};
    { const k = roundKey(r); whsHiByKey[k] = dayIdx; whsDByKey[k] = d; }
    outingDiffs.push(e);
    if(dayIdx != null){ const gap = dayIdx - d; const cut = gap >= 10 ? 2 : gap >= 7 ? 1 : 0; if(cut){ e.cut = cut; outingDiffs.slice(-20).forEach(z => z.adj -= cut); } }
    const recent = outingDiffs.slice(-20), n = recent.length;
    let roundedAvg;
    if(n < 3){
      // USGA needs 3 scores; until then show the plain average so the chart has a line
      roundedAvg = Math.round(recent.reduce((s,z)=>s+z.d,0)/n*10)/10;
      whsCalc = {recent, k:n, plus:0, index:roundedAvg};
    } else {
      const [k, plus] = n >= 20 ? [8, 0] : WHS_TABLE[n];
      const best = recent.map(z => z.d + z.adj).sort((a,b)=>a-b).slice(0,k);
      roundedAvg = Math.round((best.reduce((s,x)=>s+x,0)/k + plus)*10)/10;
      whsIdx = roundedAvg;
      whsCalc = {recent, k, plus, index:roundedAvg};
    }
    if(n >= 3) whsIdx = roundedAvg;
    chartSegPoints.push({segNum: chartSegPoints.length+1, index: roundedAvg});
    trend.push({date:r.date, day:dayNum(r.date)-t0, index:roundedAvg, diff:r.diff});
  }
  // Manual index (e.g. from GHIN): replaces the current index until the next round is posted
  whsCalc.override = null;
  try{
    const ov = JSON.parse(localStorage.getItem(HI_OVERRIDE_KEY) || 'null');
    if(ov && ov.n === chrono.length && !isNaN(ov.value)){ whsCalc.override = ov.value; trend[trend.length-1].index = ov.value; }
    else if(ov) localStorage.removeItem(HI_OVERRIDE_KEY);
  }catch(e){}

  function linreg(points){
    const n = points.length;
    const sx = points.reduce((s,p)=>s+p.day,0);
    const sy = points.reduce((s,p)=>s+p.index,0);
    const sxy = points.reduce((s,p)=>s+p.day*p.index,0);
    const sxx = points.reduce((s,p)=>s+p.day*p.day,0);
    const denom = (n*sxx - sx*sx);
    const slope = denom !== 0 ? (n*sxy - sx*sy) / denom : 0;
    const intercept = (sy - slope*sx)/n;
    return {slope, intercept};
  }
  reg = linreg(trend);

  // How much any single round's differential actually varies from that round's own
  // trend value at the time -- an empirical, personalized estimate of "how consistent
  // is this player" used for the break-100 probability on future rounds. Sample SD
  // (n-1) since n is small; floored so a small sample never collapses to an
  // artificially confident 0.
  {
    const residuals = trend.map(p => p.diff - p.index);
    const meanResidual = residuals.reduce((s,x)=>s+x,0) / residuals.length;
    const variance = residuals.length > 1
      ? residuals.reduce((s,x)=>s+Math.pow(x-meanResidual,2),0) / (residuals.length - 1)
      : 0;
    diffResidualSD = Math.max(2.0, Math.sqrt(variance));
  }

  const currentIndex = trend[trend.length-1].index;
  document.getElementById('stat-index').textContent = currentIndex.toFixed(1);
  const per30 = reg.slope*30;
  const arrow = per30 < -0.05 ? '▼' : (per30 > 0.05 ? '▲' : '—');
  document.getElementById('stat-trend').innerHTML = (per30>=0?'+':'')+per30.toFixed(1)+' <span class="trend-arrow">'+arrow+'</span>';
  const sinceStart = currentIndex - trend[0].index;
  const sinceArrow = sinceStart < -0.05 ? '▼' : (sinceStart > 0.05 ? '▲' : '—');
  document.getElementById('stat-since-start').innerHTML = (sinceStart>=0?'+':'')+sinceStart.toFixed(1)+' <span class="trend-arrow">'+sinceArrow+'</span>';
  const totalSegmentsForFootnote = rounds.reduce((s,r)=> s + (r.holes===18?2:1), 0);
  document.getElementById('rounds-footnote').textContent = `Based on ${rounds.length} rounds posted (${totalSegmentsForFootnote} segments)`;

  // best-8 count (or fewer, early in the season) -- kept for any code relying on currentBestCount
  const totalSegments = rounds.reduce((s,r)=> s + (r.holes===18?2:1), 0);
  const bestCount = Math.min(8, totalSegments);
  currentBestCount = bestCount;

  

  // table — always most recent to oldest, regardless of insertion order
  const tbody = document.getElementById('score-table');
  tbody.innerHTML = '';
  const sortedForTable = [...rounds].sort((a,b)=> new Date(b.date) - new Date(a.date));
  const lowestDiff = Math.min(...rounds.map(r=>r.diff));

  const buildRoundRow = (r) => {
    const idx = rounds.indexOf(r);
    const tr = document.createElement('tr');
    const dateFmt = new Date(r.date+'T00:00:00').toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
    const isLowest = r.diff === lowestDiff;
    // If the course name ends in a parenthetical (e.g. "(B)", "(9)"), show just the base
    // name and move the parenthetical content onto the date line instead -- except when
    // it's exactly "9" or "18", which gets hidden entirely rather than moved, since the
    // hole-count badge to the left already shows that same information. Data lookups
    // (par, differential) still use the full original r.course, only the visible text
    // changes.
    const parenMatch = r.course.match(/^(.*)\s\(([^)]+)\)$/);
    const displayCourse = parenMatch ? parenMatch[1].trim() : r.course;
    const parenContent = parenMatch ? parenMatch[2].trim() : null;
    const isHoleCountSuffix = parenContent === '9' || parenContent === '18';
    const dateLine = (parenContent && !isHoleCountSuffix) ? `${dateFmt} · ${parenContent}` : dateFmt;
    tr.innerHTML = `
      <td class="course-name"><span class="badge ${r.holes===18?'b18':'b9'}">${r.holes===18?'18':'9'}</span>${displayCourse}${isLowest ? `<img class="lowdiff-face wii-only" src="data:image/png;base64,${lowDiffFaceB64}" alt="Best round">` : ''}<br><span class="date-cell">${dateLine}</span></td>
      <td style="text-align:right"><span class="score-tag">${r.score.replace(/(A|Ni)$/,'')}<span class="topar">${toParAndExpStr(r)}</span><br><span class="topar">[Diff: ${r.diff.toFixed(1)}]</span></span></td>
    `;
    tr.addEventListener('click', ()=>{ navStack = []; openDetail(idx); });
    return tr;
  };

  const visibleLimit = 5;
  const shownRounds = sortedForTable.slice(0, visibleLimit);
  const restRounds = sortedForTable.slice(visibleLimit);
  shownRounds.forEach(r => tbody.appendChild(buildRoundRow(r)));

  const seeMoreEl = document.getElementById('roundHistorySeeMore');
  if(restRounds.length > 0){
    const restRowEls = restRounds.map(buildRoundRow);
    restRowEls.forEach(tr => { tr.style.display = 'none'; tbody.appendChild(tr); });

    const moreLabel = `Show more… (${restRounds.length} earlier round${restRounds.length===1?'':'s'})`;
    let expanded = false;
    seeMoreEl.textContent = moreLabel;
    seeMoreEl.style.display = 'block';
    seeMoreEl.onclick = () => {
      expanded = !expanded;
      if(expanded){
        restRowEls.forEach(tr => {
          tr.style.display = '';
          tr.classList.add('reveal-row');
          requestAnimationFrame(() => requestAnimationFrame(() => tr.classList.add('shown')));
        });
      } else {
        restRowEls.forEach(tr => { tr.style.display = 'none'; tr.classList.remove('shown'); });
      }
      seeMoreEl.textContent = expanded ? 'Show less' : moreLabel;
    };
  } else {
    seeMoreEl.style.display = 'none';
  }

  renderCourseRecords();
  refreshCourseLookup();
  renderCharts(currentTheme);
  updateProjection();
  renderFutureRounds();
}

function computeExpScoreFor(rating, slope, holes){
  if(!trend || !trend.length || isNaN(rating) || isNaN(slope)) return null;
  const currentIndex = trend[trend.length-1].index;
  return holes === 9
    ? Math.round((currentIndex/2) * slope / 113 + rating)
    : Math.round(currentIndex * slope / 113 + rating);
}

function erf(x){
  // Abramowitz & Stegun 7.1.26 approximation (max error ~1.5e-7) -- no external library needed
  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);
  const a1=0.254829592, a2=-0.284496736, a3=1.421413741, a4=-1.453152027, a5=1.061405429, p=0.3275911;
  const t = 1/(1+p*x);
  const y = 1 - (((((a5*t+a4)*t)+a3)*t+a2)*t+a1)*t*Math.exp(-x*x);
  return sign*y;
}
function normalCDF(x, mean, sd){
  if(sd <= 0) return x >= mean ? 1 : 0;
  return 0.5 * (1 + erf((x - mean) / (sd * Math.SQRT2)));
}

// Probability of breaking 100 (shooting 99 or better) on an 18-hole future round, modeling
// the player's round-to-round differential as normally distributed around the REGRESSION'S
// PROJECTED differential at that future date (not today's static handicap) -- so a round
// planned further out gets the benefit of your improvement trend, if you have one. Spread
// comes from your own actual round-to-round variability (diffResidualSD), not a guessed
// constant. This is a model, not a guarantee -- real scores aren't perfectly normal, and a
// small round count makes the variability estimate noisy.
function breakScoreProbability(f, targetScore){
  // Uses the SAME current-index basis as computeExpScoreFor (trend[last].index), not a
  // date-projected regression value -- so "Expected Score" and "chance to beat X" can
  // never contradict each other by assuming different underlying skill levels, no matter
  // how far in the future the round is.
  if(!trend || !trend.length || diffResidualSD == null) return null;
  if(isNaN(f.rating) || isNaN(f.slope)) return null;
  const currentIndex = trend[trend.length-1].index;
  const rawDiff = (targetScore - f.rating) * 113 / f.slope;
  // Must mirror computeDiff() exactly, which is the app's real, established formula for
  // what a 9-hole round's differential actually becomes: raw + (currentTrend / 2), not
  // raw doubled. Using anything else produces numbers that don't line up with real stored
  // differentials for the exact same course and score.
  const neededDiff = f.holes === 9 ? (rawDiff + currentIndex/2) : rawDiff;
  const prob = normalCDF(neededDiff, currentIndex, diffResidualSD);
  // Never display literal 0% or 100% -- a normal-distribution model shouldn't claim
  // mathematical certainty either direction, even when the true value rounds to it.
  return Math.min(99, Math.max(1, Math.round(prob * 100)));
}

function pad2(n){ return String(n).padStart(2,'0'); }

function formatHourLabel(hour24){
  const period = hour24 >= 12 ? 'PM' : 'AM';
  let h12 = hour24 % 12;
  if(h12 === 0) h12 = 12;
  return `${h12} ${period}`;
}

function formatTimeLabel(hour24, minute){
  const period = hour24 >= 12 ? 'p.m.' : 'a.m.';
  let h12 = hour24 % 12;
  if(h12 === 0) h12 = 12;
  return `${h12}:${pad2(minute)} ${period}`;
}

function futureSortKey(f){
  const hh = (f.hour != null && !isNaN(f.hour)) ? f.hour : 12;
  const mm = (f.minute != null && !isNaN(f.minute)) ? f.minute : 0;
  return new Date(`${f.date}T${pad2(hh)}:${pad2(Math.min(mm,59))}:00`).getTime();
}

function formatFutureDateTime(f){
  const dateFmt = new Date(f.date+'T00:00:00').toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'}).replace(',', '');
  if(f.hour == null) return dateFmt;
  return `${dateFmt}, ${formatTimeLabel(f.hour, f.minute || 0)}`;
}

// Small icon set for the WMO weather codes Open-Meteo returns. Covers the common daily
// summary codes; anything unmapped falls back to a generic cloud rather than nothing.
// Drops the leading zero on a sub-inch amount (0.2 -> .2), keeps it for anything 1.0 or
// over -- checks the threshold against the ROUNDED value, not the raw one, so a value
// like 0.95 (which rounds to 1.0) doesn't end up displayed as ".9" by mistake.
function formatInches(val){
  const fixed = val.toFixed(2);
  return parseFloat(fixed) < 1 ? fixed.replace(/^0/, '') : fixed;
}

function weatherIconFor(code){
  if(code === 0) return '☀️';
  if(code === 1 || code === 2) return '⛅';
  if(code === 3) return '☁️';
  if(code === 45 || code === 48) return '🌫️';
  if(code >= 51 && code <= 67) return '🌧️';
  if(code >= 71 && code <= 77) return '🌨️';
  if(code >= 80 && code <= 82) return '🌧️';
  if(code >= 85 && code <= 86) return '🌨️';
  if(code >= 95) return '⛈️';
  return '☁️';
}

// Live geocoding for a user-typed "city, state" string when adding a new course. Shows
// the resolved match back to the user BEFORE it's saved, so a bad match can be caught
// immediately rather than discovered later from a wrong forecast.
async function geocodeLocation(query){
  if(!query || !query.trim()) return null;
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query.trim())}&count=1&language=en&format=json`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if(data.results && data.results.length > 0){
      const r = data.results[0];
      return {
        lat: r.latitude, lon: r.longitude,
        label: [r.name, r.admin1].filter(Boolean).join(', ')
      };
    }
    return null;
  } catch(e){
    return null;
  }
}

// Wires a "city, state" text input to live-geocode on blur, showing the match in the
// given preview element. Returns a getter for whatever was last successfully resolved,
// so the calling form can commit it to COURSE_LOCATIONS on save (or skip it if the
// field was left blank / never resolved).
function wireLocationInput(inputId, previewId){
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);
  let resolved = null;
  input.addEventListener('blur', async ()=>{
    const query = input.value.trim();
    if(!query){ resolved = null; preview.textContent = ''; return; }
    preview.textContent = 'Looking up…';
    const match = await geocodeLocation(query);
    if(match){
      resolved = match;
      preview.innerHTML = `Matched: <strong>${match.label}</strong>`;
    } else {
      resolved = null;
      preview.textContent = 'No match found — location will be skipped (weather just won\u2019t show for this course).';
    }
  });
  return {
    reset(){ input.value = ''; preview.textContent = ''; resolved = null; },
    getResolved(){ return resolved; }
  };
}

const weatherCache = {}; // keyed by "lat,lon" -- one fetch per course location per page load, not per round
async function fetchWeatherFor(lat, lon){
  const key = `${lat},${lon}`;
  if(weatherCache[key]) return weatherCache[key];
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation_probability,precipitation,weathercode&temperature_unit=fahrenheit&precipitation_unit=inch&forecast_days=16&timezone=auto`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    weatherCache[key] = data.hourly || null;
    return weatherCache[key];
  } catch(e){
    weatherCache[key] = null;
    return null;
  }
}

// Pulls out just the hours belonging to one specific date from the full 16-day hourly
// series -- Open-Meteo returns one continuous run of hourly timestamps, not split by day.
function hoursForDate(hourly, dateStr){
  if(!hourly || !hourly.time) return [];
  const out = [];
  hourly.time.forEach((t, i) => {
    if(t.slice(0,10) === dateStr){
      out.push({
        hour: parseInt(t.slice(11,13), 10),
        temp: hourly.temperature_2m[i],
        rain: hourly.precipitation_probability[i],
        precipIn: hourly.precipitation[i],
        code: hourly.weathercode[i]
      });
    }
  });
  return out;
}

// Attaches a compact weather summary to each future-round row that has a known course
// location and falls within Open-Meteo's forecast window (~16 days out): the icon and
// temp AT tee time, plus the WORST-CASE (max) rain chance across tee time and the three
// hours after -- the window that actually matters for whether you'll get rained on.
// Runs AFTER the rows are already rendered, so a slow/failed fetch never blocks the
// table itself from showing.
async function attachFutureRoundsWeather(){
  const rowsNeedingWeather = document.querySelectorAll('[data-weather-lat]');
  for(const el of rowsNeedingWeather){
    const lat = el.dataset.weatherLat;
    const lon = el.dataset.weatherLon;
    const dateStr = el.dataset.weatherDate;
    const teeHour = parseInt(el.dataset.weatherHour, 10);
    const hourly = await fetchWeatherFor(lat, lon);
    const dayHours = hoursForDate(hourly, dateStr);
    if(dayHours.length === 0) continue; // date outside the forecast window
    const teeHourData = dayHours.find(h => h.hour === teeHour) || dayHours[0];
    // Matches exactly the hour range shown in the hourly detail card (tee-1 through
    // tee+5), so the row summary always reflects precisely what you'd see if you tapped in.
    const window = dayHours.filter(h => h.hour >= teeHour - 1 && h.hour <= teeHour + 5);
    const worstHour = window.length ? window.reduce((a,b)=> b.rain > a.rain ? b : a) : teeHourData;
    // Rain % is the largest single-hour chance across that window; inches is the total
    // summed across the same window -- two different questions ("how likely" vs "how much").
    const totalInches = window.length ? window.reduce((s,h)=> s + h.precipIn, 0) : teeHourData.precipIn;
    const icon = weatherIconFor(teeHourData.code);
    const temp = Math.round(teeHourData.temp);
    el.innerHTML = ` · ${icon} ${temp}° ☔️ ${Math.round(worstHour.rain)}% ${formatInches(totalInches)}”`;
    el.style.display = '';
  }
}

// Renders the full day's hour-by-hour temp + rain chance for a future round's detail
// view -- reuses whatever's already cached from the row-level fetch, so this is usually
// instant; only fetches fresh if this course's location hasn't been pulled yet this
// page load.
async function attachHourlyWeatherDetail(f){
  const container = document.getElementById('futureHourlyWeather');
  if(!container) return;
  const loc = COURSE_LOCATIONS[f.course];
  if(!loc) return;
  const hourly = await fetchWeatherFor(loc.lat, loc.lon);
  const teeHour = f.hour != null ? f.hour : 9;
  const dayHours = hoursForDate(hourly, f.date).filter(h => h.hour >= teeHour - 1 && h.hour <= teeHour + 5);
  if(dayHours.length === 0) return; // date outside the forecast window
  const rows = dayHours.map(h => {
    const isTeeHour = h.hour === teeHour;
    return `<div style="display:flex;justify-content:space-between;padding:3px 0;">
      <span>${formatHourLabel(h.hour)}${isTeeHour ? ' ⛳' : ''}</span>
      <span>${weatherIconFor(h.code)} ${Math.round(h.temp)}° · ${Math.round(h.rain)}% rain (${h.precipIn.toFixed(2)}in)</span>
    </div>`;
  }).join('');
  container.innerHTML = `<p class="note" style="margin:14px 0 4px;">Hour-by-hour forecast</p>${rows}`;
}

function parForFutureRound(f){
  if(f.pars) return f.pars.reduce((s,x)=>s+x,0);
  return PAR_BY_COURSE[f.course] != null ? PAR_BY_COURSE[f.course] : null;
}

function toParTextFor(score, par){
  if(par == null) return '';
  const diff = Math.round((score - par) * 10) / 10;
  if(diff === 0) return ' <span class="topar">(E)</span>';
  return ` <span class="topar">(${diff > 0 ? '+' : ''}${diff})</span>`;
}

function renderFutureRounds(){
  const listEl = document.getElementById('futureRoundsList');
  const noneEl = document.getElementById('noFutureRoundsNote');
  if(!listEl) return;
  const sorted = [...futureRounds].sort((a,b)=> futureSortKey(a) - futureSortKey(b));
  if(sorted.length === 0){
    listEl.innerHTML = '';
    noneEl.style.display = 'block';
    return;
  }
  noneEl.style.display = 'none';
  listEl.innerHTML = sorted.map(f => {
    const exp = computeExpScoreFor(f.rating, f.slope, f.holes);
    const par = parForFutureRound(f);

    let probLineHtml = '';
    if(f.holes === 18){
      const break100 = breakScoreProbability(f, 99);
      if(break100 !== null) probLineHtml = `<div class="idx-note" style="margin:2px 0 0;">${break100}% &lt;100</div>`;
    } else {
      const priorRoundsAtCourse = rounds.filter(r => r.course.trim().toLowerCase() === f.course.trim().toLowerCase());
      if(priorRoundsAtCourse.length > 0){
        const courseRecord = Math.min(...priorRoundsAtCourse.map(scoreOf));
        const beatRecordProb = breakScoreProbability(f, courseRecord - 1);
        if(beatRecordProb !== null) probLineHtml = `<div class="idx-note" style="margin:2px 0 0;">${beatRecordProb}% &lt;${courseRecord}</div>`;
      } else {
        probLineHtml = `<div class="idx-note" style="margin:2px 0 0;">New!</div>`;
      }
    }

    const loc = COURSE_LOCATIONS[f.course];
    const teeHour = f.hour != null ? f.hour : 9;
    const weatherPlaceholder = loc
      ? `<span class="idx-note" style="display:none;" data-weather-lat="${loc.lat}" data-weather-lon="${loc.lon}" data-weather-date="${f.date}" data-weather-hour="${teeHour}"></span>`
      : '';
    const fParenMatch = f.course.match(/^(.*)\s\(([^)]+)\)$/);
    const fDisplayCourse = fParenMatch ? fParenMatch[1].trim() : f.course;

    return `
      <tr class="future-round-row" data-id="${f.id}" style="cursor:pointer;">
        <td class="course-name"><span class="badge ${f.holes===18?'b18':'b9'}">${f.holes===18?'18':'9'}</span>${fDisplayCourse}<br><span class="date-cell">${formatFutureDateTime(f)}</span>${weatherPlaceholder}</td>
        <td class="diff-cell">${exp !== null ? exp + toParTextFor(exp, par) : '—'}${probLineHtml}</td>
      </tr>`;
  }).join('');
  document.querySelectorAll('.future-round-row').forEach(el=>{
    el.addEventListener('click', ()=>{
      navStack = [];
      openFutureRoundDetail(el.dataset.id);
    });
  });
  attachFutureRoundsWeather();
}

function renderCourseRecords(){
  const currentIndex = (trend && trend.length) ? trend[trend.length-1].index : null;
  const byCourse = {};
  rounds.forEach(r=>{
    const key = r.course.trim();
    if(!byCourse[key]) byCourse[key] = [];
    byCourse[key].push(r);
  });
  const rows = Object.entries(byCourse).map(([course, list])=>{
    const bestScore = Math.min(...list.map(scoreOf));
    const bestDiff = Math.min(...list.map(r=>r.diff));
    const medianScore = median(list.map(scoreOf));
    const latest = [...list].sort((a,b)=> new Date(b.date) - new Date(a.date))[0];
    const expScore = currentIndex !== null
      ? (latest.holes === 9
          ? Math.round((currentIndex/2) * latest.slope / 113 + latest.rating)
          : Math.round(currentIndex * latest.slope / 113 + latest.rating))
      : null;
    return {course, count:list.length, bestScore, bestDiff, medianScore, expScore, latestDate:latest.date, holes:latest.holes};
  }).sort((a,b)=> b.count - a.count || new Date(b.latestDate) - new Date(a.latestDate));

  const tbody = document.getElementById('course-record-table');
  tbody.innerHTML = '';

  const buildCourseRow = (row) => {
    const tr = document.createElement('tr');
    let expCellContent = '—';
    if(row.expScore !== null){
      const diff = row.expScore - row.bestScore;
      const arrowText = diff === 0 ? 'Ev' : (diff > 0 ? `↑${diff}` : `↓${Math.abs(diff)}`);
      expCellContent = `${row.expScore}${arrowText}`;
    }
    // Same rule as Round History and Course Records' own detail card: a trailing
    // parenthetical moves off the name, except "9"/"18" which is hidden entirely since
    // the hole-count badge already shows that. All functional lookups (click-through,
    // par) still use the full original row.course, only the visible text changes.
    const parenMatch = row.course.match(/^(.*)\s\(([^)]+)\)$/);
    const displayCourseName = parenMatch ? parenMatch[1].trim() : row.course;
    const parenContent = parenMatch ? parenMatch[2].trim() : null;
    const isHoleCountSuffix = parenContent === '9' || parenContent === '18';
    const secondLineSuffix = (parenContent && !isHoleCountSuffix) ? ` · ${parenContent}` : '';
    tr.innerHTML = `
      <td class="course-name"><span class="badge ${row.holes===18?'b18':'b9'}">${row.holes===18?'18':'9'}</span>${displayCourseName}<br><span class="topar">(${row.count}, ${shortMonthYear(row.latestDate)})${secondLineSuffix}</span></td>
      <td class="diff-cell"><span class="score-topar-wrap"><span class="score-num">${row.bestScore}</span><span class="topar">${toParStr(row.bestScore, row.course)}</span></span></td>
      <td class="diff-cell">${expCellContent}</td>
    `;
    tr.addEventListener('click', ()=>{ navStack = []; openCourseDetail(row.course); });
    return tr;
  };

  const visibleLimit = 5;
  const shownRows = rows.slice(0, visibleLimit);
  const restRows = rows.slice(visibleLimit);
  shownRows.forEach(row => tbody.appendChild(buildCourseRow(row)));

  const seeMoreEl = document.getElementById('courseRecordsSeeMore');
  const showAllStatsLink = document.getElementById('showAllStatsLink');
  const showAllCoursesLink = document.getElementById('showAllCoursesLink');
  showAllStatsLink.onclick = () => { navStack.push(()=>{ renderCourseRecords(); }); openAllStatsDetail(); };
  showAllCoursesLink.onclick = () => { navStack.push(()=>{ renderCourseRecords(); }); openAllCoursesDetail(); };
  if(restRows.length > 0){
    const restRowEls = restRows.map(buildCourseRow);
    restRowEls.forEach(tr => { tr.style.display = 'none'; tbody.appendChild(tr); });

    const moreLabel = `Show more… (${restRows.length} more course${restRows.length===1?'':'s'})`;
    let expanded = false;
    seeMoreEl.textContent = moreLabel;
    seeMoreEl.style.display = 'block';
    showAllStatsLink.style.display = 'block';
    showAllCoursesLink.style.display = 'block';
    seeMoreEl.onclick = () => {
      expanded = !expanded;
      if(expanded){
        restRowEls.forEach(tr => {
          tr.style.display = '';
          tr.classList.add('reveal-row');
          requestAnimationFrame(() => requestAnimationFrame(() => tr.classList.add('shown')));
        });
      } else {
        restRowEls.forEach(tr => { tr.style.display = 'none'; tr.classList.remove('shown'); });
      }
      seeMoreEl.textContent = expanded ? 'Show less' : moreLabel;
    };
  } else {
    seeMoreEl.style.display = 'none';
    showAllStatsLink.style.display = 'block';
    showAllCoursesLink.style.display = 'block';
  }
}

// ================= CHARTS =================
function colorsFor(theme){
  if(theme === 'wii'){
    return {ink:'#3C4A52', grid:'#8B8C91', trendLine:'#26B0D3', regLine:'#8D9095', c18:'#8D9095', c9:'#21ABDE', font:'ui-rounded, -apple-system, sans-serif'};
  }
  return {ink:'#28321F', grid:'#d8cfae', trendLine:'#33553B', regLine:'#A8402F', c18:'#CBAE78', c9:'#33553B', font:'ui-monospace, SF Mono, Menlo, monospace'};
}

function renderCharts(theme){
  const c = colorsFor(theme);

  if(diffChart){ diffChart.destroy(); diffChart = null; }
  // Explicitly wipe the canvas pixel buffer too, not just the Chart.js instance --
  // belt-and-suspenders against any possibility of a prior render's pixels lingering
  // visually if destroy() doesn't fully clear the canvas on some browser/environment.
  {
    const canvasEl = document.getElementById('diffChart');
    const ctx2d = canvasEl && canvasEl.getContext && canvasEl.getContext('2d');
    if(ctx2d) ctx2d.clearRect(0, 0, canvasEl.width, canvasEl.height);
  }

  // Single source of truth for every dot AND the regression line -- round number, raw
  // differential, and holes, for every round that has a valid round-number assignment.
  // Everything below derives from this one array, so the dots and the line can never
  // reference different data.
  const chartPoints = rounds
    .map((r, idx) => ({ x: roundNumberOf[roundKey(r)], y: r.diff, idx, holes: r.holes }))
    .filter(p => p.x != null)
    .sort((a,b) => a.x - b.x);

  // Ordinary least-squares fit directly on chartPoints -- same data as the dots, no
  // smoothing or substitution.
  let regSlope = 0, regIntercept = 0;
  if(chartPoints.length > 1){
    const n = chartPoints.length;
    const sumX = chartPoints.reduce((s,p)=>s+p.x,0);
    const sumY = chartPoints.reduce((s,p)=>s+p.y,0);
    const sumXY = chartPoints.reduce((s,p)=>s+p.x*p.y,0);
    const sumXX = chartPoints.reduce((s,p)=>s+p.x*p.x,0);
    const denom = n*sumXX - sumX*sumX;
    if(denom !== 0){
      regSlope = (n*sumXY - sumX*sumY) / denom;
      regIntercept = (sumY - regSlope*sumX) / n;
    }
  }
  // A straight line is fully defined by two endpoints -- plotting just the first and
  // last x-values (rather than one point per round) means there's no possibility of
  // Chart.js decimating, skipping, or otherwise partially rendering a long multi-point
  // line dataset. The line will always span exactly the same range as the dots.
  const firstX = chartPoints.length ? chartPoints[0].x : 0;
  const lastX = chartPoints.length ? chartPoints[chartPoints.length-1].x : 0;
  const regressionLineData = chartPoints.length > 1
    ? [{x: firstX, y: regSlope*firstX + regIntercept}, {x: lastX, y: regSlope*lastX + regIntercept}]
    : [];

  diffChart = new Chart(document.getElementById('diffChart'), {
    type:'scatter',
    data:{datasets:[
      {label:'9-hole', data: chartPoints.filter(p=>p.holes===9).map(p=>({x:p.x, y:p.y, idx:p.idx})), backgroundColor:c.c9, pointRadius:5},
      {label:'18-hole', data: chartPoints.filter(p=>p.holes===18).map(p=>({x:p.x, y:p.y, idx:p.idx})), backgroundColor:c.c18, pointRadius:5}
    ]},
    options:{responsive:true, maintainAspectRatio:false,
      plugins:{legend:{labels:{color:c.ink,font:{family:c.font,size:13}}}},
      scales:{
        y:{title:{display:true,text:'Differential',color:c.ink,font:{family:c.font,size:14}},ticks:{color:c.ink,font:{family:c.font,size:13}},grid:{color:c.grid}},
        x:{type:'linear',min:0,max:Math.max(1,lastX)+1,title:{display:true,text:'Round Number',color:c.ink,font:{family:c.font,size:13}},ticks:{display:false},grid:{display:false}}
      },
      onClick: (evt, elements) => {
        if(elements.length > 0){
          const el = elements[0];
          const point = diffChart.data.datasets[el.datasetIndex].data[el.index];
          if(point && point.idx !== undefined){ navStack = []; openDetail(point.idx); }
        }
      },
      onHover: (evt, elements) => {
        evt.native.target.style.cursor = elements.length > 0 ? 'pointer' : 'default';
      }
    },
    plugins: [{
      // Draws the regression line directly on the canvas using the chart's own scale
      // conversion (getPixelForValue), completely bypassing Chart.js's dataset-based
      // line rendering -- sidesteps a known Chart.js quirk where a 'line'-type dataset
      // mixed into a 'scatter'-type chart can be positioned using a different implicit
      // scale than the scatter data, even when both reference the same declared axis.
      id: 'manualRegressionLine',
      afterDraw: (chartInstance) => {
        if(regressionLineData.length < 2) return;
        const {ctx, scales} = chartInstance;
        const x1 = scales.x.getPixelForValue(regressionLineData[0].x);
        const y1 = scales.y.getPixelForValue(regressionLineData[0].y);
        const x2 = scales.x.getPixelForValue(regressionLineData[1].x);
        const y2 = scales.y.getPixelForValue(regressionLineData[1].y);
        ctx.save();
        ctx.beginPath();
        ctx.setLineDash([5,4]);
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = c.regLine;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.restore();
      }
    }]
  });
}

// ================= PROJECTION =================
function regressionCrossDate(){
  // Fit a regression against ROUND NUMBER using the exact same raw per-round differentials
  // as the Differential chart's dashed line (not the best-half-of-segments trend) -- so
  // this projection can never contradict what the chart is visually showing. Find how many
  // more rounds are needed to cross below 30.0, then convert that into a real date using
  // the player's actual pace (rounds per day) -- measured against TODAY's real date, not
  // the last round's date. That means every day that passes without a new round pushes the
  // projected date further out, since the pace keeps dropping while the calendar keeps moving.
  if(!rounds || rounds.length === 0) return null;

  const chrono = [...rounds].sort((a,b)=> new Date(a.date) - new Date(b.date));
  const totalOutings = chrono.length;
  const outingPoints = chrono.map((r, i) => ({ x: i + 1, y: r.diff }));
  const n = outingPoints.length;
  const sx = outingPoints.reduce((s,p)=>s+p.x, 0);
  const sy = outingPoints.reduce((s,p)=>s+p.y, 0);
  const sxy = outingPoints.reduce((s,p)=>s+p.x*p.y, 0);
  const sxx = outingPoints.reduce((s,p)=>s+p.x*p.x, 0);
  const denom = (n*sxx - sx*sx);
  if(denom === 0) return null;
  const outingSlope = (n*sxy - sx*sy) / denom;
  const outingIntercept = (sy - outingSlope*sx) / n;

  if(outingSlope >= 0) return null; // not trending down per outing played

  const targetOutingNum = (30.0 - outingIntercept) / outingSlope;
  const outingsNeeded = Math.max(0, Math.ceil(targetOutingNum) - totalOutings);

  const today = new Date();
  if(outingsNeeded === 0){
    return today.toISOString().slice(0,10);
  }

  const firstRoundDate = new Date(chrono[0].date+'T00:00:00');
  const daysSinceFirstRound = Math.max(1, Math.round((today - firstRoundDate) / 86400000));
  const avgOutingsPerDay = totalOutings / daysSinceFirstRound;
  if(avgOutingsPerDay <= 0) return null;

  const daysNeeded = Math.ceil(outingsNeeded / avgOutingsPerDay);
  const projectedMs = today.getTime() + daysNeeded * 86400000;
  return new Date(projectedMs).toISOString().slice(0,10);
}

// When the player will have had their 5th outing with a differential under 30 -- a
// Projects the date on which the player will have played their 50th round overall --
// pure round-count volume, unrelated to differential value at all. Uses the actual date
// if 50+ rounds already exist; otherwise projects forward using the same "actual pace
// measured against today" methodology as regressionCrossDate above. The displayed label
// stays as "Handicap projected to drop below 30.0" by explicit request -- not renamed to
// match what this specific date now represents.
function fiftiethRoundDate(){
  if(!rounds || rounds.length === 0) return null;
  const chrono = [...rounds].sort((a,b)=> new Date(a.date) - new Date(b.date));
  const totalOutings = chrono.length;

  if(totalOutings >= 50){
    return chrono[49].date;
  }

  const today = new Date();
  const firstRoundDate = new Date(chrono[0].date+'T00:00:00');
  const daysSinceFirstRound = Math.max(1, Math.round((today - firstRoundDate) / 86400000));
  const avgOutingsPerDay = totalOutings / daysSinceFirstRound;
  if(avgOutingsPerDay <= 0) return null;

  const outingsNeeded = 50 - totalOutings;
  const daysNeeded = Math.ceil(outingsNeeded / avgOutingsPerDay);
  const projectedMs = today.getTime() + daysNeeded * 86400000;
  return new Date(projectedMs).toISOString().slice(0,10);
}

function updateProjection(){
  const noteEl = document.getElementById('regressionCrossNote');
  if(!noteEl) return;
  // Projection lines removed by request; keep the element empty and hidden.
  noteEl.innerHTML = ''; noteEl.style.display = 'none'; return;
  const crossDate = regressionCrossDate();
  let html;
  if(!crossDate){
    html = 'Regression is flat or trending up — not projected to drop below 30.0 at this rate.';
  } else {
    const readable = new Date(crossDate+'T00:00:00').toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'});
    html = `Projected to drop below 30.0 on <strong>${readable}</strong>.`;
  }
  const fiftiethDate = fiftiethRoundDate();
  if(fiftiethDate){
    const fiftiethReadable = new Date(fiftiethDate+'T00:00:00').toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'});
    html += `<br>Handicap projected to drop below 30.0 on <strong>${fiftiethReadable}</strong>.`;
  }
  noteEl.innerHTML = html;
}

// ================= ROUND DETAIL MODAL =================
const detailOverlay = document.getElementById('detailOverlay');
const detailModal = document.getElementById('detailModal');
let navStack = [];
function updateBackButton(){
  document.getElementById('detailBack').style.display = navStack.length > 0 ? 'block' : 'none';
}
document.getElementById('detailClose').addEventListener('click', ()=>detailOverlay.classList.remove('open'));
document.getElementById('detailBack').addEventListener('click', ()=>{
  const prevRender = navStack.pop();
  if(prevRender) prevRender();
});
detailOverlay.addEventListener('click', e=>{ if(e.target===detailOverlay) detailOverlay.classList.remove('open'); });

// Shrinks a course-name title's font size, in 1px steps down from the CSS max (28px),
// until it fits on a single line -- rather than letting a long name wrap awkwardly on a
// narrow mobile screen. Floors at 16px so a genuinely very long name still stays legible
// rather than shrinking indefinitely. Re-measures at each step since a smaller font can
// fit differently per line, not just proportionally less.
function fitCourseTitle(){
  const el = document.getElementById('courseTitleText');
  if(!el) return;
  const maxSize = 28;
  const minSize = 16;
  let size = maxSize;
  while(size >= minSize){
    el.style.fontSize = size + 'px';
    // Measure the TRUE single-line height by temporarily forcing no-wrap, rather than
    // estimating it from a fixed multiplier -- a fixed estimate is fragile and this
    // particular script font's tall ascenders/descenders don't match a generic ratio,
    // which was causing this to over-shrink even after the text already fit on one line.
    el.style.whiteSpace = 'nowrap';
    const singleLineHeight = el.offsetHeight;
    el.style.whiteSpace = '';
    const actualHeight = el.offsetHeight;
    if(actualHeight <= singleLineHeight + 2) break;
    size -= 1;
  }
}

function openDetail(idx){
  const r = rounds[idx];
  const isFirstRoundAtCourse = rounds.filter(x => x.course === r.course).length === 1;
  const loc = COURSE_LOCATIONS[r.course];
  // Same rule as everywhere else this pattern now applies: a trailing parenthetical moves
  // off the title onto the rating/slope/location subline, except "9"/"18" which is hidden
  // entirely since the round's own holes count is already shown elsewhere on this card.
  const parenMatch = r.course.match(/^(.*)\s\(([^)]+)\)$/);
  const displayTitle = parenMatch ? parenMatch[1].trim() : r.course;
  const parenContent = parenMatch ? parenMatch[2].trim() : null;
  const isHoleCountSuffix = parenContent === '9' || parenContent === '18';
  const parenSuffix = (parenContent && !isHoleCountSuffix) ? ` · ${parenContent}` : '';
  const rsLocLine = `${r.rating.toFixed(1)}/${r.slope}${loc && loc.label ? ` · ${loc.label}` : ''}${parenSuffix}`;
  const newCourseLine = isFirstRoundAtCourse ? `<span class="new-best-num title-subline" style="font-family:'ITC Bookman','Bookman Old Style',Bookman,serif;font-style:italic;font-size:14px;font-weight:700;margin-top:4px;">New Course!</span>` : '';
  document.getElementById('detailTitle').innerHTML = `<span id="courseTitleText">${displayTitle}</span><span class="crr-rs title-subline">${rsLocLine}</span>${newCourseLine}`;
  const dateFmt = new Date(r.date+'T00:00:00').toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'});

  document.getElementById('detailMiiRow').innerHTML = '';
  document.getElementById('detailMiiRow').style.display = 'none';
  // If a Back button will be showing, its absolute top-left position would otherwise
  // clip through the title text, since detailMiiRow (which normally provides clearance)
  // is hidden entirely in this view.
  document.getElementById('detailTitle').style.marginTop = navStack.length > 0 ? '28px' : '0';

  const expAtTimeForCard = expScoreAtTimeOf(r);
  const actualScoreForCard = scoreOf(r);
  const scoreVsExpDiffForCard = expAtTimeForCard !== null ? actualScoreForCard - expAtTimeForCard : null;
  const scoreVsExpTextForCard = scoreVsExpDiffForCard === null ? '' : (scoreVsExpDiffForCard === 0 ? ' (E)' : ` (${scoreVsExpDiffForCard > 0 ? '+' : ''}${scoreVsExpDiffForCard})`);
  let body = `<p class="note" style="margin:2px 0 0;">${dateFmt} · ${r.holes}-hole round</p>`;
  // Scorecard and Backyard Open tabs sit above everything; Backyard Open shows only the standings
  const tnEvTab = !!window.tnOpenEventTab; window.tnOpenEventTab = false;
  body += `<div class="view-toggle tn-tabs" style="display:flex;margin:12px 0 4px;"><button type="button" class="view-toggle-btn${tnEvTab?'':' active'}" data-tn-act="tab" data-tab="card">Scorecard</button><button type="button" class="view-toggle-btn${tnEvTab?' active':''}" data-tn-act="tab" data-tab="event">${r.event && Array.isArray(r.event.board) && r.event.tier!=='club' ? 'BGA Tour' : 'BGA'}</button></div>`;
  body += `<div data-tn-pane="card"${tnEvTab?' hidden':''}>`;
  if(expAtTimeForCard !== null){
    body += `<div class="strip round-detail-strip" style="margin:10px 0 0;">
      <div class="cell"><div class="icon-row">🎯</div><div class="num">${expAtTimeForCard}</div><div class="lbl">Exp. Score</div></div>
      <div class="cell flag"><div class="icon-row">🏌️</div><div class="num">${actualScoreForCard}${scoreVsExpTextForCard}</div><div class="lbl">Actual Score</div></div>
      <div class="cell flag"><div class="icon-row">⛳</div><div class="num">${r.diff.toFixed(1)}</div><div class="lbl">Differential</div></div>
    </div>`;
  } else {
    body += `<p class="note" style="margin:10px 0 0;">Differential ${r.diff.toFixed(1)}</p>`;
  }

  const badgesForCard = computeRoundBadges(r);
  const ovalLabel = badgesForCard.length === 0 ? 'Round Badges: No badges earned this round.' : 'Round Badges:';
  body += `<div style="margin:10px 0 0;display:flex;align-items:center;flex-wrap:wrap;gap:8px;">
    <button type="button" id="roundBadgesOvalBtn" style="display:inline-flex;align-items:center;font-size:12px;font-weight:700;color:var(--fairway);background:none;border:1.5px solid var(--fairway);border-radius:20px;padding:4px 10px;cursor:pointer;">${ovalLabel}</button>
    ${renderRoundBadgesHtml(r)}
  </div>`;
  body += `<p class="idx-note" id="roundBadgeExplain" style="display:none;margin:8px 0 0;font-size:12px;"></p>`;

  body += buildSingleRoundScorecardHtml(r) + `</div>`;
  body += `<div data-tn-pane="event"${tnEvTab?'':' hidden'}>` + (typeof window.tnEventHtml === 'function' ? window.tnEventHtml(r) : '') + `</div>`;

  body += `<div style="text-align:center;margin-top:14px;display:flex;gap:10px;justify-content:center;">
    <button class="btn" id="roundCourseRecordBtn" type="button">Course Record</button>
    <button class="btn danger" id="deleteRoundBtn" type="button">Delete this round</button>
  </div>`;

  document.getElementById('detailBody').innerHTML = body;
  detailOverlay.classList.add('open');
  fitCourseTitle();
  updateBackButton();

  document.querySelectorAll('.round-badge-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const explainEl = document.getElementById('roundBadgeExplain');
      const label = btn.dataset.label;
      if(explainEl.textContent === label && explainEl.style.display !== 'none'){
        explainEl.style.display = 'none';
      } else {
        explainEl.innerHTML = formatBadgeLabelHtml(label);
        explainEl.style.display = 'block';
      }
    });
  });

  document.getElementById('roundCourseRecordBtn').addEventListener('click', ()=>{
    navStack.push(()=>openDetail(idx));
    openCourseDetail(r.course);
  });
  document.getElementById('roundBadgesOvalBtn').addEventListener('click', ()=>{
    navStack.push(()=>openDetail(idx));
    openRoundBadgesDetail(idx);
  });
  document.querySelectorAll('.hole-num-clickable, .hole-stat-clickable').forEach(el=>{
    el.addEventListener('click', (e)=>{
      e.stopPropagation();
      const h = parseInt(el.dataset.hole, 10) - 1;
      navStack.push(()=>openDetail(idx));
      openHoleDetail(r.course, h);
    });
  });

  const delBtn = document.getElementById('deleteRoundBtn');
  delBtn.addEventListener('click', function onDeleteClick(){
    if(delBtn.dataset.armed === '1'){
      const key = roundKey(r);
      const addedIdx = addedRounds.findIndex(x => roundKey(x) === key);
      if(addedIdx !== -1){
        addedRounds.splice(addedIdx, 1);
        persistAdded();
      } else {
        deletedKeys.push(key);
        persistDeleted();
      }
      rebuildRoundsArray();
      detailOverlay.classList.remove('open');
      recompute();
    } else {
      delBtn.dataset.armed = '1';
      delBtn.textContent = 'Tap again to confirm delete';
    }
  });
}

function toParFrag(val, par){
  const diff = Math.round((val - par) * 10) / 10;
  if(diff === 0) return ' <span class="topar">(E)</span>';
  return ` <span class="topar">(${diff > 0 ? '+' : ''}${diff})</span>`;
}

// rows: array of {label, cellFn(holeIndex)->string, totalFn()->string (only used on last chunk)}
function getChunkPlan(numHoles){
  if(numHoles === 9){
    return [
      {range:[0,9], totalUpTo:9, totalLabel:'Out'},
    ];
  }
  if(numHoles === 18){
    return [
      {range:[0,9], totalUpTo:9, totalLabel:'Out'},
      {range:[9,18], totalUpTo:18, totalLabel:'Total'},
    ];
  }
  // fallback for unusual hole counts: one line per 9 (or fewer, for the last partial
  // group), grand total only at the very end
  const sizes = [];
  let remaining = numHoles;
  while(remaining > 0){
    const size = Math.min(9, remaining);
    sizes.push(size);
    remaining -= size;
  }
  let start = 0;
  return sizes.map((size, i) => {
    const end = start + size;
    const isLast = i === sizes.length - 1;
    const chunk = {range:[start,end], totalUpTo: isLast ? numHoles : null, totalLabel:'Total'};
    start = end;
    return chunk;
  });
}

// rows: array of {label, rawFn(holeIndex)->number, isPar:boolean}
function scoreNotationClass(val, par){
  const diff = val - par;
  if(diff === -1) return 'birdie';
  if(diff === 1) return 'bogey';
  if(diff >= 2) return 'double';
  return '';
}

function renderScorecardChunks(numHoles, pars, rows){
  const plan = getChunkPlan(numHoles);
  let html = '';
  plan.forEach(chunk => {
    const [start, end] = chunk.range;
    let headerCells = '';
    for(let h=start; h<end; h++) headerCells += `<th class="hole-num-clickable" data-hole="${h+1}">${h+1}</th>`;
    if(chunk.totalUpTo) headerCells += `<th class="out-col">${chunk.totalLabel}</th>`;

    const bodyRows = rows.map(row => {
      let cells = '';
      for(let h=start; h<end; h++){
        const val = row.rawFn(h);
        if(row.isPar){
          cells += `<td>${val}</td>`;
        } else {
          const cls = scoreNotationClass(val, pars[h]);
          const isNewBest = row.markFn && row.markFn(h);
          const clickAttrs = row.clickable ? ` class="hole-stat-clickable" data-hole="${h+1}"` : '';
          cells += `<td${clickAttrs}><span class="score-mark ${cls} ${isNewBest ? 'new-best-num' : ''}">${Math.round(val)}</span></td>`;
        }
      }
      if(chunk.totalUpTo){
        let sum = 0, parSum = 0;
        for(let h=0; h<chunk.totalUpTo; h++){ sum += row.rawFn(h); parSum += pars[h]; }
        if(row.isPar){
          cells += `<td class="out-col">${sum}</td>`;
        } else {
          const totalIsNewBest = row.totalMarkFn && row.totalMarkFn();
          cells += `<td class="out-col ${totalIsNewBest ? 'new-best-num' : ''}">${Math.round(sum)}<br>${toParFrag(sum, parSum).trim()}</td>`;
        }
      }
      return `<tr><td>${row.label}</td>${cells}</tr>`;
    }).join('');

    html += `<div class="pocket-scorecard-wrap"><table class="hole-scorecard" style="margin-bottom:0;">
      <thead><tr><th>Hole</th>${headerCells}</tr></thead>
      <tbody>${bodyRows}</tbody>
    </table></div>`;
  });
  return html;
}

// Computes the cross-course "all stats" summary: a hypothetical composite 18-hole round
// made of your best-ever score at each hole INDEX regardless of which course it came
// from, plus lifetime totals and a score-to-par distribution across every hole with
// recorded detail.
function computeAllStatsSummary(){
  const allWithHoles = rounds.filter(r => r.holeDetail);

  const bestPars = [];
  const bestScores = [];
  for(let h = 0; h < 18; h++){
    const candidates = allWithHoles.filter(r => r.holeDetail.scores.length > h);
    if(candidates.length === 0){
      bestPars.push(null);
      bestScores.push(null);
      continue;
    }
    let best = candidates[0];
    candidates.forEach(r => { if(r.holeDetail.scores[h] < best.holeDetail.scores[h]) best = r; });
    bestScores.push(best.holeDetail.scores[h]);
    bestPars.push(best.holeDetail.pars[h]);
  }

  const totalHolesPlayed = rounds.reduce((s,r) => s + r.holes, 0);
  const totalStrokes = rounds.reduce((s,r) => s + scoreOf(r), 0);

  const dist = {birdie:0, par:0, bogey:0, double:0, triple:0, quad:0, quint:0, other:0};
  let totalHolesWithDetail = 0;
  allWithHoles.forEach(r => {
    r.holeDetail.scores.forEach((s,i) => {
      const diff = s - r.holeDetail.pars[i];
      totalHolesWithDetail++;
      if(diff === -1) dist.birdie++;
      else if(diff === 0) dist.par++;
      else if(diff === 1) dist.bogey++;
      else if(diff === 2) dist.double++;
      else if(diff === 3) dist.triple++;
      else if(diff === 4) dist.quad++;
      else if(diff === 5) dist.quint++;
      else dist.other++;
    });
  });

  // Rather than the raw empirical birdie rate (which is trivially 0% with zero birdies
  // observed, and tells you nothing useful in that case), fit a normal curve to the
  // actual distribution of score-to-par values across every recorded hole, then use that
  // curve's own shape and spread to PROJECT a birdie probability -- given n pars, y
  // bogeys, x double bogeys and so on, what does the overall curve suggest about the
  // birdie tail, even where none have actually landed yet.
  const allDiffs = [];
  allWithHoles.forEach(r => {
    r.holeDetail.scores.forEach((sc,i) => { allDiffs.push(sc - r.holeDetail.pars[i]); });
  });
  const diffMean = allDiffs.length > 0 ? allDiffs.reduce((s,v)=>s+v,0) / allDiffs.length : 0;
  const diffVariance = allDiffs.length > 0 ? allDiffs.reduce((s,v)=>s+(v-diffMean)*(v-diffMean),0) / allDiffs.length : 0;
  const diffSD = Math.sqrt(diffVariance);
  // Continuity-corrected: probability mass at score-to-par <= -1 (birdie or better) under
  // the fitted curve, same correction used elsewhere in the app for discretizing a
  // continuous model against integer strokes.
  const projectedBirdieRate = totalHolesWithDetail > 0 ? normalCDF(-0.5, diffMean, diffSD) : 0;
  const expectedBirdiesCareer = projectedBirdieRate * totalHolesWithDetail;
  const oddsZeroBirdiesCareer = Math.pow(1 - projectedBirdieRate, totalHolesWithDetail);

  return {
    bestPars, bestScores, totalHolesPlayed, totalStrokes, dist, totalHolesWithDetail,
    projectedBirdieRate, diffMean, diffSD, expectedBirdiesCareer, oddsZeroBirdiesCareer
  };
}

// Formats a probability (0-1) as a percentage, switching to scientific notation when the
// value is small enough that a fixed-decimal display would misleadingly round to "0.0%"
// -- with a career-length sample size, this genuinely can happen even with a real,
// nonzero underlying rate.
function formatTinyPercent(p){
  const pct = p * 100;
  if(pct === 0) return '0%';
  if(pct >= 0.01) return `${pct.toFixed(2)}%`;
  return `${pct.toExponential(2)}%`;
}

function openAllStatsDetail(){
  const s = computeAllStatsSummary();

  document.getElementById('detailMiiRow').innerHTML = '';
  document.getElementById('detailMiiRow').style.display = 'none';
  document.getElementById('detailTitle').innerHTML = `<span id="courseTitleText">All Stats</span>`;
  document.getElementById('detailTitle').style.marginTop = navStack.length > 0 ? '28px' : '0';

  const rows = [
    {label:'Par', rawFn:(h)=> s.bestPars[h] != null ? s.bestPars[h] : '—', isPar:true},
    {label:'Score', rawFn:(h)=> s.bestScores[h] != null ? s.bestScores[h] : '—', isPar:false, clickable:false},
  ];
  const scorecardHtml = renderScorecardChunks(18, s.bestPars.map(p => p != null ? p : 0), rows);

  const distList = [
    ['Birdies', s.dist.birdie], ['Pars', s.dist.par], ['Bogeys', s.dist.bogey],
    ['Double bogeys', s.dist.double], ['Triple bogeys', s.dist.triple],
    ['Quadruple bogeys', s.dist.quad], ['Quintuple bogeys', s.dist.quint],
  ];
  const distHtml = distList.map(([label,count]) => `<p class="note" style="margin:2px 0;">${label}: <strong>${count}</strong></p>`).join('');
  const otherLine = s.dist.other > 0 ? `<p class="note" style="margin:2px 0;">Other (eagle or better / worse than quintuple): <strong>${s.dist.other}</strong></p>` : '';

  const body = `
    <p class="note" style="margin:2px 0 12px;">A hypothetical composite round: your best-ever score at each hole position, regardless of which course it came from.</p>
    ${scorecardHtml}
    <p class="note" style="margin:16px 0 2px;"><strong>Total holes played:</strong> ${s.totalHolesPlayed}</p>
    <p class="note" style="margin:0 0 12px;"><strong>Total strokes taken:</strong> ${s.totalStrokes}</p>
    <p class="note" style="margin:16px 0 2px;color:var(--fairway);font-weight:700;">Score distribution (${s.totalHolesWithDetail} holes with detail on file)</p>
    ${distHtml}
    ${otherLine}
    <p class="note" style="margin:16px 0 2px;font-style:italic;color:#8a8368;">Projected from a curve fit to your actual score-to-par spread (avg ${s.diffMean.toFixed(2)}, spread ${s.diffSD.toFixed(2)}) -- not just your raw birdie count, which is ${s.dist.birdie}.</p>
    <p class="note" style="margin:0 0 2px;"><strong>Expected birdies (career, ${s.totalHolesWithDetail} holes):</strong> ${s.expectedBirdiesCareer.toFixed(2)}</p>
    <p class="note" style="margin:0 0 2px;"><strong>Odds of zero birdies (career, ${s.totalHolesWithDetail} holes):</strong> ${formatTinyPercent(s.oddsZeroBirdiesCareer)}</p>
  `;

  document.getElementById('detailBody').innerHTML = body;
  detailOverlay.classList.add('open');
  updateBackButton();
}

// For a given hole count, finds every distinct course that has at least one round at that
// hole count, using the MOST RECENT such round's rating/slope (in case it's been corrected
// since via Edit Course). When includeSaved is true, also merges in any savedNewCourses
// entries at that same hole count that haven't actually been played yet -- played courses
// always take precedence, so a course that's both saved and played only appears once, as
// played. Saved-but-unplayed entries are flagged so the table can visually distinguish them.
function computeAllCoursesList(holes, includeSaved){
  const matching = rounds.filter(r => r.holes === holes);
  const byCourse = {};
  matching.forEach(r => {
    const key = r.course.trim().toLowerCase();
    const existing = byCourse[key];
    if(!existing || new Date(r.date) > new Date(existing.date)){
      byCourse[key] = r;
    }
  });
  const list = Object.values(byCourse).map(r => ({
    course: r.course,
    rating: r.rating,
    slope: r.slope,
    exp: computeExpScoreFor(r.rating, r.slope, r.holes),
    unplayed: false
  }));

  if(includeSaved){
    Object.entries(savedNewCourses).forEach(([key, saved]) => {
      if(saved.holes !== holes) return;
      if(byCourse[key]) return; // already played at this hole count, don't duplicate
      list.push({
        course: saved.name,
        rating: saved.rating,
        slope: saved.slope,
        exp: computeExpScoreFor(saved.rating, saved.slope, saved.holes),
        unplayed: true
      });
    });
  }

  return list;
}

let allCoursesSortState = {col: 'course', dir: 'asc'};
let allCoursesHoles = 18;
let allCoursesShowSaved = false;

function renderAllCoursesTable(){
  const list = computeAllCoursesList(allCoursesHoles, allCoursesShowSaved);
  const col = allCoursesSortState.col;
  const dir = allCoursesSortState.dir;
  list.sort((a,b) => {
    let av = a[col], bv = b[col];
    if(av == null) av = dir === 'asc' ? Infinity : -Infinity;
    if(bv == null) bv = dir === 'asc' ? Infinity : -Infinity;
    if(typeof av === 'string') av = av.toLowerCase();
    if(typeof bv === 'string') bv = bv.toLowerCase();
    if(av < bv) return dir === 'asc' ? -1 : 1;
    if(av > bv) return dir === 'asc' ? 1 : -1;
    return 0;
  });

  const arrow = (c) => allCoursesSortState.col === c ? (allCoursesSortState.dir === 'asc' ? ' ▲' : ' ▼') : '';
  const rowsHtml = list.map(item => `
    <tr>
      <td style="text-align:left;padding:7px 4px;border-bottom:1px solid var(--line);${item.unplayed ? 'font-style:italic;color:#8a8368;' : ''}">${item.course}${item.unplayed ? ' <span style="font-size:10px;">(unplayed)</span>' : ''}</td>
      <td style="text-align:center;padding:7px 4px;border-bottom:1px solid var(--line);${item.unplayed ? 'font-style:italic;color:#8a8368;' : ''}">${item.rating.toFixed(1)}</td>
      <td style="text-align:center;padding:7px 4px;border-bottom:1px solid var(--line);${item.unplayed ? 'font-style:italic;color:#8a8368;' : ''}">${item.slope}</td>
      <td style="text-align:center;padding:7px 4px;border-bottom:1px solid var(--line);${item.unplayed ? 'font-style:italic;color:#8a8368;' : ''}">${item.exp != null ? item.exp : '—'}</td>
    </tr>`).join('');

  document.getElementById('allCoursesTableBody').innerHTML = rowsHtml || `<tr><td colspan="4" style="text-align:center;padding:16px;color:#8a8368;">No ${allCoursesHoles}-hole rounds on file yet.</td></tr>`;
  document.getElementById('allCoursesTableHead').innerHTML = `
    <tr>
      <th class="all-courses-sort-th" data-col="course" style="text-align:left;padding:7px 4px;cursor:pointer;border-bottom:2px solid var(--fairway);">Course${arrow('course')}</th>
      <th class="all-courses-sort-th" data-col="rating" style="text-align:center;padding:7px 4px;cursor:pointer;border-bottom:2px solid var(--fairway);">Rating${arrow('rating')}</th>
      <th class="all-courses-sort-th" data-col="slope" style="text-align:center;padding:7px 4px;cursor:pointer;border-bottom:2px solid var(--fairway);">Slope${arrow('slope')}</th>
      <th class="all-courses-sort-th" data-col="exp" style="text-align:center;padding:7px 4px;cursor:pointer;border-bottom:2px solid var(--fairway);">Exp. Score${arrow('exp')}</th>
    </tr>`;
  document.querySelectorAll('.all-courses-sort-th').forEach(th => {
    th.addEventListener('click', () => {
      const c = th.dataset.col;
      if(allCoursesSortState.col === c){
        allCoursesSortState.dir = allCoursesSortState.dir === 'asc' ? 'desc' : 'asc';
      } else {
        allCoursesSortState.col = c;
        allCoursesSortState.dir = 'asc';
      }
      renderAllCoursesTable();
    });
  });
}

function openAllCoursesDetail(){
  document.getElementById('detailMiiRow').innerHTML = '';
  document.getElementById('detailMiiRow').style.display = 'none';
  document.getElementById('detailTitle').innerHTML = `<span id="courseTitleText">All Courses</span>`;
  document.getElementById('detailTitle').style.marginTop = navStack.length > 0 ? '28px' : '0';

  allCoursesHoles = 18;
  allCoursesSortState = {col: 'course', dir: 'asc'};
  allCoursesShowSaved = false;

  document.getElementById('detailBody').innerHTML = `
    <div class="view-toggle" style="display:flex;max-width:160px;margin:2px 0 12px;">
      <button type="button" class="view-toggle-btn active" id="allCoursesHoles18Btn">18</button>
      <button type="button" class="view-toggle-btn" id="allCoursesHoles9Btn">9</button>
    </div>
    <label style="display:flex;align-items:center;gap:7px;font-size:13px;margin:0 0 14px;cursor:pointer;">
      <input type="checkbox" id="allCoursesShowSavedToggle">
      Show saved, unplayed courses
    </label>
    <div style="overflow-x:auto;">
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <thead id="allCoursesTableHead"></thead>
        <tbody id="allCoursesTableBody"></tbody>
      </table>
    </div>
  `;
  detailOverlay.classList.add('open');
  fitCourseTitle();
  updateBackButton();

  document.getElementById('allCoursesHoles9Btn').addEventListener('click', ()=>{
    allCoursesHoles = 9;
    document.getElementById('allCoursesHoles9Btn').classList.add('active');
    document.getElementById('allCoursesHoles18Btn').classList.remove('active');
    renderAllCoursesTable();
  });
  document.getElementById('allCoursesHoles18Btn').addEventListener('click', ()=>{
    allCoursesHoles = 18;
    document.getElementById('allCoursesHoles18Btn').classList.add('active');
    document.getElementById('allCoursesHoles9Btn').classList.remove('active');
    renderAllCoursesTable();
  });
  document.getElementById('allCoursesShowSavedToggle').addEventListener('change', (e)=>{
    allCoursesShowSaved = e.target.checked;
    renderAllCoursesTable();
  });

  renderAllCoursesTable();
}

function buildHoleStatsHtml(atCourse){
  const withHoles = atCourse.filter(r => r.holeDetail);
  if(withHoles.length === 0) return '';

  const numHoles = withHoles[0].holeDetail.scores.length;
  const pars = withHoles[0].holeDetail.pars;

  // Also pull in the matching (9)/(18) variant's rounds for the per-hole median/best
  // figures specifically -- same principle as getHistoricalHoleStats and the single-round
  // scorecard's own best-highlighting: a hole played during a 9-hole round is the same
  // physical hole as during an 18-hole round there. numHoles/pars still come from THIS
  // exact course/page, since those are tied to its own specific layout.
  const stripHoleSuffixForStats = (name) => {
    const m = name.trim().match(/^(.*)\s\((9|18)\)$/);
    return (m ? m[1] : name).trim().toLowerCase();
  };
  const baseCourseName = stripHoleSuffixForStats(withHoles[0].course);
  const expandedMatches = rounds.filter(r =>
    stripHoleSuffixForStats(r.course) === baseCourseName && r.holeDetail
  );

  if(expandedMatches.length === 1){
    const scores = withHoles[0].holeDetail.scores;
    const rows = [
      {label:'Par', rawFn:(h)=>pars[h], isPar:true},
      {label:'Score', rawFn:(h)=>scores[h], isPar:false, clickable:true},
    ];
    return `
    <p class="note" style="margin:16px 0 6px;">Hole-by-hole (from 1 scorecard on file)</p>
    ${renderScorecardChunks(numHoles, pars, rows)}`;
  }

  const perHole = [];
  for(let h=0; h<numHoles; h++){
    const scoresAtHole = expandedMatches
      .filter(r => r.holeDetail.scores.length > h)
      .map(r => r.holeDetail.scores[h]);
    const med = median(scoresAtHole);
    const best = Math.min(...scoresAtHole);
    perHole.push({hole:h+1, par:pars[h], median:med, best});
  }

  const rows = [
    {label:'Par', rawFn:(h)=>pars[h], isPar:true},
    {label:'Median', rawFn:(h)=>perHole[h].median, isPar:false, clickable:true},
    {label:'Best', rawFn:(h)=>perHole[h].best, isPar:false, clickable:true},
  ];

  return `
    <p class="note" style="margin:16px 0 6px;">Hole-by-hole (from ${expandedMatches.length} scorecards on file)</p>
    ${renderScorecardChunks(numHoles, pars, rows)}`;
}

function buildSingleRoundScorecardHtml(r){
  if(!r.holeDetail) return '';
  const { pars, scores } = r.holeDetail;
  const numHoles = scores.length;

  // Mark a hole with an asterisk if this round set a NEW personal-best-to-date at that
  // specific hole -- i.e. it beat every prior round's score there (strictly, no ties),
  // as of when it was played. This is a running record, not a comparison against the
  // whole dataset: a later round with an even better score doesn't retroactively remove
  // an earlier round's star, since it really was the best at the time. Draws from every
  // round at this base course regardless of (9)/(18) suffix -- hole 1 played during a
  // 9-hole round is the same physical hole as hole 1 during an 18-hole round there.
  const stripHoleSuffixForBest = (name) => {
    const m = name.trim().match(/^(.*)\s\((9|18)\)$/);
    return (m ? m[1] : name).trim().toLowerCase();
  };
  const thisBaseCourse = stripHoleSuffixForBest(r.course);
  const atCourse = rounds.filter(x => stripHoleSuffixForBest(x.course) === thisBaseCourse && x.holeDetail);

  const bestMarks = new Array(numHoles).fill(false);
  for(let h=0; h<numHoles; h++){
    const priorScoresAtHole = atCourse
      .filter(x => x.holeDetail.scores.length > h && new Date(x.date) < new Date(r.date))
      .map(x => x.holeDetail.scores[h]);
    if(priorScoresAtHole.length === 0) continue; // no prior data at this hole -- nothing to beat
    const priorBest = Math.min(...priorScoresAtHole);
    if(scores[h] < priorBest){
      bestMarks[h] = true;
    }
  }

  // Also mark the round's own total if it's the best (lowest) score ever recorded at this
  // course -- only meaningful once the course has been played at least twice.
  const allRoundsAtCourse = rounds.filter(x => x.course === r.course);
  let isBestRoundAtCourse = false;
  if(allRoundsAtCourse.length >= 2){
    const thisGross = scoreOf(r);
    const bestGross = Math.min(...allRoundsAtCourse.map(scoreOf));
    isBestRoundAtCourse = thisGross === bestGross;
  }

  const rows = [
    {label:'Par', rawFn:(h)=>pars[h], isPar:true},
    {label:'Score', rawFn:(h)=>scores[h], isPar:false, markFn:(h)=>bestMarks[h], totalMarkFn:()=>isBestRoundAtCourse, clickable:true},
  ];

  const legendParts = [];
  if(bestMarks.some(Boolean) || isBestRoundAtCourse) legendParts.push('<span class="new-best-num">Red</span>: New best score at time of the round');

  return `
    <p class="note" style="margin:10px 0 2px;"><span class="pocket-scorecard-title" style="display:inline;font-size:20px;">Scorecard</span>${legendParts.length ? `<br><span style="font-style:italic;font-size:12px;color:#8a8368;">${legendParts.join(' · ')}</span>` : ''}</p>
    ${renderScorecardChunks(numHoles, pars, rows)}`;
}

let holeDistChart = null;

function openHoleDetail(courseName, holeIndex){
  // Also pulls in the matching (9)/(18) variant's rounds for this same physical hole --
  // same principle applied everywhere else this pattern now lives.
  const stripHoleSuffixForHoleDetail = (name) => {
    const m = name.trim().match(/^(.*)\s\((9|18)\)$/);
    return (m ? m[1] : name).trim().toLowerCase();
  };
  const baseCourseNameForHoleDetail = stripHoleSuffixForHoleDetail(courseName);
  const atCourse = rounds.filter(r => stripHoleSuffixForHoleDetail(r.course) === baseCourseNameForHoleDetail && r.holeDetail && r.holeDetail.scores.length > holeIndex);
  const chronoAtCourse = [...atCourse].sort((a,b)=> new Date(a.date) - new Date(b.date));
  if(chronoAtCourse.length === 0) return;

  const par = chronoAtCourse[chronoAtCourse.length-1].holeDetail.pars[holeIndex];
  const scores = chronoAtCourse.map(r => r.holeDetail.scores[holeIndex]);
  const best = Math.min(...scores);
  const med = median(scores);

  document.getElementById('detailMiiRow').innerHTML = '';
  document.getElementById('detailTitle').innerHTML = `<span id="courseTitleText">${courseName}</span> <span class="crr-rs">Hole ${holeIndex+1} · Par ${par}</span>`;
  document.getElementById('detailTitle').style.marginTop = navStack.length > 0 ? '20px' : '0';

  const listHtml = [...chronoAtCourse].reverse().map(r => {
    const s = r.holeDetail.scores[holeIndex];
    const cls = scoreNotationClass(s, par);
    const dateFmt = new Date(r.date+'T00:00:00').toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
    return `<div class="hole-history-row"><span class="hole-history-date">${dateFmt}</span><span class="hole-history-score"><span class="score-mark ${cls}">${s}</span></span></div>`;
  }).join('');

  const freq = {};
  scores.forEach(s => freq[s] = (freq[s]||0) + 1);
  const sortedScores = Object.keys(freq).map(Number).sort((a,b)=>a-b);
  const scoreLabel = (s) => {
    const d = Math.round((s - par) * 10) / 10;
    const parText = d === 0 ? 'E' : (d > 0 ? `+${d}` : `${d}`);
    return `${s} (${parText})`;
  };

  document.getElementById('detailBody').innerHTML = `
    <p class="note" style="margin:2px 0 12px;">Played ${scores.length} time${scores.length===1?'':'s'} · Median ${med.toFixed(1)} · Best ${best}</p>
    <div class="chart-box" style="height:160px;"><canvas id="holeDistChart"></canvas></div>
    <p class="idx-note" style="margin:16px 0 6px;">All scores (most recent first)</p>
    <div class="hole-history-list">${listHtml}</div>
  `;
  detailOverlay.classList.add('open');
  fitCourseTitle();
  updateBackButton();

  if(holeDistChart) holeDistChart.destroy();
  const c = colorsFor(currentTheme);
  holeDistChart = new Chart(document.getElementById('holeDistChart'), {
    type:'bar',
    data:{
      labels: sortedScores.map(scoreLabel),
      datasets:[{ label:'Times scored', data: sortedScores.map(s=>freq[s]), backgroundColor: c.c9 }]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{display:false} },
      scales:{
        x:{ title:{display:true,text:'Score',color:c.ink,font:{family:c.font,size:12}}, ticks:{color:c.ink,font:{family:c.font,size:12}}, grid:{display:false} },
        y:{ title:{display:true,text:'#',color:c.ink,font:{family:c.font,size:12}}, beginAtZero:true, ticks:{color:c.ink,font:{family:c.font,size:12},stepSize:1}, grid:{color:c.grid} }
      }
    }
  });
}

// "Curve of scoring" for a future/planned round -- reuses the same score-frequency
// histogram pattern as openHoleDetail's per-hole chart, but for whole-round gross scores
// across every past round at this course instead of one specific hole.
let futureScoringCurveChart = null;
// Computes a discrete probability for each nearby possible score, using the exact same
// normal-distribution model as breakScoreProbability (differential ~ Normal(currentIndex,
// diffResidualSD)) -- not a histogram of past results, a genuine likelihood curve for
// THIS specific upcoming round, centered on its Expected Score. Each score's probability
// is the model's mass between that score's own -0.5/+0.5 differential boundaries, since
// scores are discrete but the underlying differential model is continuous.
function computeScoreLikelihoods(f){
  if(!trend || !trend.length || diffResidualSD == null) return null;
  if(isNaN(f.rating) || isNaN(f.slope)) return null;
  const currentIndex = trend[trend.length-1].index;
  const exp = computeExpScoreFor(f.rating, f.slope, f.holes);
  if(exp == null) return null;

  const diffAt = (score) => {
    const raw = (score - f.rating) * 113 / f.slope;
    return f.holes === 9 ? (raw + currentIndex/2) : raw;
  };

  const results = [];
  for(let s = exp - 12; s <= exp + 12; s++){
    const lower = normalCDF(diffAt(s - 0.5), currentIndex, diffResidualSD);
    const upper = normalCDF(diffAt(s + 0.5), currentIndex, diffResidualSD);
    results.push({ score: s, probability: Math.max(0, upper - lower) });
  }
  return results;
}

function openFutureScoringCurve(futureId){
  const f = futureRounds.find(x => x.id === futureId);
  if(!f) return;
  const exp = computeExpScoreFor(f.rating, f.slope, f.holes);
  const likelihoods = computeScoreLikelihoods(f);
  if(!likelihoods) return;

  const parenMatch = f.course.match(/^(.*)\s\(([^)]+)\)$/);
  const displayTitle = parenMatch ? parenMatch[1].trim() : f.course;

  document.getElementById('detailMiiRow').innerHTML = '';
  document.getElementById('detailTitle').innerHTML = `<span id="courseTitleText">${displayTitle}</span> <span class="crr-rs">Scoring Curve</span>`;
  document.getElementById('detailTitle').style.marginTop = navStack.length > 0 ? '20px' : '0';

  // Dropdown listing every score in range with its own likelihood and cumulative
  // likelihood, so the full curve is readable as a table, not just one bar at a time.
  // Rounding only ever happens here, at display time -- the underlying probability data
  // itself stays full-precision throughout (used for the chart bars below).
  const optionsHtml = likelihoods.map((l, i) => {
    const likelihoodPct = Math.round(l.probability * 100);
    const cumulativePct = breakScoreProbability(f, l.score);
    return `<option value="${i}"${l.score === exp ? ' selected' : ''}>${l.score} (${likelihoodPct}%, ${cumulativePct}% total)</option>`;
  }).join('');

  document.getElementById('detailBody').innerHTML = `
    <p class="note" style="margin:2px 0 12px;">Likelihood of each score, centered on your Expected Score of ${exp}</p>
    <div class="chart-box" style="height:220px;"><canvas id="futureScoringCurveChart"></canvas></div>
    <p class="note" id="scoreLikelihoodDetail" style="margin:12px 0 0;text-align:center;"></p>
    <label style="display:block;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;color:#8a8368;margin:16px 0 4px;">Score (Likelihood, Cumulative)</label>
    <select id="scoringCurveTable">${optionsHtml}</select>
  `;
  detailOverlay.classList.add('open');
  fitCourseTitle();
  updateBackButton();

  // Tapping/clicking a bar (or picking from the dropdown) shows that score's own
  // likelihood plus the CUMULATIVE likelihood of shooting that score or better -- i.e.
  // summing every probability from the lowest score in range up through the selected
  // one, since a lower golf score is always the better outcome. Rounds only for display.
  const showScoreDetail = (idx) => {
    const selected = likelihoods[idx];
    const likelihoodPct = Math.round(selected.probability * 100);
    // Reuses breakScoreProbability directly, rather than summing this chart's own
    // discrete bins, so this can never drift from the "chance to break X" figure shown
    // elsewhere in the app for the same round -- they're answering the exact same
    // question and need to always agree. (Summing bins up through a score's own upper
    // half-boundary was effectively answering "score+0.5 or better," a systematically
    // more generous number than what breakScoreProbability reports for that same score.)
    const cumulativePct = breakScoreProbability(f, selected.score);
    document.getElementById('scoreLikelihoodDetail').innerHTML =
      `Score ${selected.score}: <strong>${likelihoodPct}%</strong> likelihood · <strong>${cumulativePct}%</strong> cumulative (this or better)`;
    const dropdown = document.getElementById('scoringCurveTable');
    if(dropdown) dropdown.value = String(idx);
  };

  if(futureScoringCurveChart) futureScoringCurveChart.destroy();
  const c = colorsFor(currentTheme);
  futureScoringCurveChart = new Chart(document.getElementById('futureScoringCurveChart'), {
    type:'bar',
    data:{
      labels: likelihoods.map(l => String(l.score)),
      datasets:[{
        label: 'Likelihood',
        // Full-precision bar heights, NOT rounded -- rounding these would snap most bars
        // exactly onto whole-percent gridlines, making the curve look artificially
        // stepped/blocky instead of a smooth, natural bell shape.
        data: likelihoods.map(l => l.probability * 100),
        backgroundColor: likelihoods.map(l => l.score === exp ? c.regLine : c.c9)
      }]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{display:false} },
      scales:{
        x:{ title:{display:true,text:'Score',color:c.ink,font:{family:c.font,size:12}}, ticks:{color:c.ink,font:{family:c.font,size:12}}, grid:{display:false} },
        y:{ title:{display:true,text:'Likelihood (%)',color:c.ink,font:{family:c.font,size:12}}, beginAtZero:true, ticks:{color:c.ink,font:{family:c.font,size:12}}, grid:{color:c.grid} }
      },
      onClick: (evt, elements) => {
        if(!elements.length) return;
        showScoreDetail(elements[0].index);
      }
    }
  });

  document.getElementById('scoringCurveTable').addEventListener('change', (e)=>{
    showScoreDetail(parseInt(e.target.value, 10));
  });

  const expIdx = likelihoods.findIndex(l => l.score === exp);
  showScoreDetail(expIdx >= 0 ? expIdx : Math.floor(likelihoods.length / 2));
}

function openCourseDetail(courseName){
  const atCourse = rounds
    .map((r, idx) => ({...r, idx}))
    .filter(r => r.course === courseName)
    .sort((a,b) => new Date(b.date) - new Date(a.date));

  const loc = COURSE_LOCATIONS[courseName];
  const rsLine = `${atCourse[0].rating.toFixed(1)}/${atCourse[0].slope}`;
  const locSuffix = loc && loc.label ? ` · ${loc.label}` : '';
  // Same idea as Round History: a trailing parenthetical moves off the title and onto the
  // subline instead. But "9" or "18" specifically is hidden entirely rather than moved --
  // that's just hole-count disambiguation, already redundant with context elsewhere, not
  // meaningful info worth displaying. Editing still shows the full original name with
  // parens intact, since openEditCourseModal is called with the untouched courseName.
  const parenMatch = courseName.match(/^(.*)\s\(([^)]+)\)$/);
  const displayTitle = parenMatch ? parenMatch[1].trim() : courseName;
  const parenContent = parenMatch ? parenMatch[2].trim() : null;
  const isHoleCountSuffix = parenContent === '9' || parenContent === '18';
  const parenSuffix = (parenContent && !isHoleCountSuffix) ? ` · ${parenContent}` : '';
  document.getElementById('detailTitle').innerHTML = `<span id="courseTitleText">${displayTitle}</span><span class="crr-rs title-subline">${rsLine}${locSuffix}${parenSuffix}</span>`;
  // If a Back button will be showing (navStack has something to return to), the Back
  // button's absolute top-left position would otherwise overlap/clip through the Edit
  // button, which normally sits right at the top of this same area.
  const editTopMargin = navStack.length > 0 ? '28px' : '0';
  document.getElementById('detailMiiRow').innerHTML = `<button class="modal-edit" id="courseEditBtn" type="button" style="margin-top:${editTopMargin};">Edit</button>`;
  document.getElementById('detailMiiRow').style.display = '';
  document.getElementById('detailMiiRow').style.marginTop = '8px';
  document.getElementById('detailMiiRow').style.marginBottom = '4px';
  let courseDetailBody = '';

  const buildRow = (r) => {
    const dateFmt = new Date(r.date+'T00:00:00').toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
    const gross = scoreOf(r);
    const badgesHtml = renderRoundBadgesIconsOnly(r);
    return `
      <div class="course-round-row" data-idx="${r.idx}">
        <span class="crr-date">${dateFmt}${badgesHtml ? ` <span style="font-size:13px;">${badgesHtml}</span>` : ''}</span>
        <span class="crr-score">${gross}<span class="topar">${toParAndExpStr(r)}</span></span>
        <span class="crr-diff">${r.diff.toFixed(1)}</span>
      </div>`;
  };

  const visibleLimit = 3;
  const shown = atCourse.slice(0, visibleLimit);
  const rest = atCourse.slice(visibleLimit);
  const shownHtml = shown.map(buildRow).join('');
  const restHtml = rest.map(buildRow).join('');

  const seeMoreHtml = rest.length > 0
    ? `<div id="courseRoundsMoreWrap" class="reveal-block">${restHtml}</div>
       <p class="note" id="courseRoundsSeeMore" style="font-style:italic;cursor:pointer;margin:6px 0 0;">See more (${rest.length} earlier round${rest.length===1?'':'s'})</p>`
    : '';

  // Best/Median SCORE stay scoped strictly to THIS exact course (no (9)/(18) combining
  // here) -- a 9-hole total isn't a meaningful comparison against an 18-hole "best round"
  // figure the way a single shared hole's score is. (Per-hole best/median tracking
  // elsewhere -- getHistoricalHoleStats, buildHoleStatsHtml, openHoleDetail, the
  // single-round scorecard's own best-highlighting -- correctly DOES still combine
  // variants, since a specific hole is the same physical hole regardless of round length.)
  const grossScores = atCourse.map(scoreOf);
  const bestScore = Math.min(...grossScores);
  const medianScore = median(grossScores);
  const bestDiff = Math.min(...atCourse.map(r=>r.diff));
  const summaryHtml = `
    <p class="note" style="margin:2px 0 2px;">Best Score: ${bestScore}<span class="topar">${toParStr(bestScore, courseName)}</span></p>
    <p class="note" style="margin:0 0 2px;">Median Score: ${Math.round(medianScore)}<span class="topar">${toParStr(medianScore, courseName)}</span></p>
    <p class="note" style="margin:0 0 10px;">Best Diff.: ${bestDiff.toFixed(1)}</p>
  `;

  document.getElementById('detailBody').innerHTML = `
    ${courseDetailBody}
    ${summaryHtml}
    <p class="note" style="margin:2px 0 10px;">${atCourse.length} round${atCourse.length===1?'':'s'} at this course · tap one for details</p>
    <div class="course-round-list">${shownHtml}</div>
    ${seeMoreHtml}
    ${buildHoleStatsHtml(atCourse)}
  `;
  detailOverlay.classList.add('open');
  fitCourseTitle();
  updateBackButton();
  document.getElementById('courseEditBtn').addEventListener('click', ()=> openEditCourseModal(courseName));

  document.querySelectorAll('.course-round-row').forEach(el=>{
    el.addEventListener('click', ()=>{
      const idx = parseInt(el.dataset.idx, 10);
      navStack.push(()=>openCourseDetail(courseName));
      openDetail(idx);
    });
  });

  document.querySelectorAll('.hole-num-clickable, .hole-stat-clickable').forEach(el=>{
    el.addEventListener('click', (e)=>{
      e.stopPropagation();
      const h = parseInt(el.dataset.hole, 10) - 1;
      navStack.push(()=>openCourseDetail(courseName));
      openHoleDetail(courseName, h);
    });
  });

  const seeMoreEl = document.getElementById('courseRoundsSeeMore');
  if(seeMoreEl){
    seeMoreEl.addEventListener('click', ()=>{
      const wrap = document.getElementById('courseRoundsMoreWrap');
      wrap.classList.add('shown');
      wrap.querySelectorAll('.course-round-row').forEach(el=>{
        el.addEventListener('click', ()=>{
          const idx = parseInt(el.dataset.idx, 10);
          navStack.push(()=>openCourseDetail(courseName));
          openDetail(idx);
        });
      });
      seeMoreEl.style.display = 'none';
    });
  }
}

// ================= ADD ROUND MODAL =================
const addOverlay = document.getElementById('addOverlay');
document.getElementById('addClose').addEventListener('click', ()=>addOverlay.classList.remove('open'));
document.getElementById('addCancel').addEventListener('click', ()=>addOverlay.classList.remove('open'));
addOverlay.addEventListener('click', e=>{ if(e.target===addOverlay) addOverlay.classList.remove('open'); });

function getHistoricalHoleStats(courseName, holes){
  if(!courseName) return null;
  // Strips any trailing "(9)"/"(18)" suffix so hole-level best/median tracking treats
  // both variants of the same physical course as one course -- hole 1 played during a
  // 9-hole round is the same physical hole as hole 1 during an 18-hole round there.
  const stripHoleSuffix = (name) => {
    const m = name.trim().match(/^(.*)\s\((9|18)\)$/);
    return (m ? m[1] : name).trim().toLowerCase();
  };
  const baseCourseName = stripHoleSuffix(courseName);

  // Par is tied to a specific hole layout, so it still needs an exact hole-count match --
  // this also gates whether hist applies at all, same as before.
  const sameCountMatches = rounds.filter(r =>
    stripHoleSuffix(r.course) === baseCourseName &&
    r.holeDetail &&
    r.holeDetail.scores.length === holes
  );
  if(sameCountMatches.length === 0) return null;
  const pars = sameCountMatches[0].holeDetail.pars;

  // Bests/medians per hole pull from EVERY round at this base course, any hole count,
  // as long as that specific round actually played this hole index.
  const allMatches = rounds.filter(r =>
    stripHoleSuffix(r.course) === baseCourseName &&
    r.holeDetail
  );
  const bests = [];
  const medians = [];
  for(let h=0; h<holes; h++){
    const scoresAtHole = allMatches
      .filter(r => r.holeDetail.scores.length > h)
      .map(r => r.holeDetail.scores[h]);
    bests.push(Math.min(...scoresAtHole));
    medians.push(median(scoresAtHole));
  }
  return { pars, bests, medians };
}

function plannedParsFor(courseName, holes){
  const entry = futureRounds.find(f =>
    f.course.trim().toLowerCase() === courseName.trim().toLowerCase() &&
    f.holes === holes && f.pars
  );
  return entry ? entry.pars : null;
}

function isKnownCourse(name){
  const key = name.trim().toLowerCase();
  if(courseLookup[key]) return true;
  return futureRounds.some(f => f.course.trim().toLowerCase() === key && f.pars);
}

function updateNewCourseUI(){
  const typed = document.getElementById('f-course').value.trim();
  const isNew = typed.length > 0 && !isKnownCourse(typed);
  const wasVisible = document.getElementById('parInputsSection').style.display !== 'none';
  document.getElementById('newCourseBadge').style.display = isNew ? 'block' : 'none';
  document.getElementById('parInputsSection').style.display = isNew ? 'block' : 'none';
  // Only build fresh par inputs when newly becoming visible or genuinely empty --
  // rebuilding on every keystroke would silently reset any pars already entered
  // (manually or via a Delim paste) just because the course name gets edited afterward.
  if(isNew && (!wasVisible || document.getElementById('parInputsRow').innerHTML === '')){
    buildParInputs();
  }
}

function updateParTotalReadout(boxSelector, readoutId){
  const boxes = Array.from(document.querySelectorAll(boxSelector));
  const total = boxes.reduce((s,b) => s + (parseInt(b.value,10) || 0), 0);
  document.getElementById(readoutId).textContent = `Total par: ${total}`;
}

function buildParInputs(){
  const holes = parseInt(document.getElementById('f-holes').value, 10);
  const parRow = document.getElementById('parInputsRow');
  parRow.innerHTML = '';
  for(let h=1; h<=holes; h++){
    parRow.innerHTML += `<div class="hole-box"><div class="hnum">${h}</div><button type="button" class="hole-par-display" data-hole="${h}">4</button><input type="hidden" class="hole-par-box" data-hole="${h}" value="4"></div>`;
  }
  document.querySelectorAll('.hole-par-display').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      openParKeypad(parseInt(btn.dataset.hole, 10), holes);
    });
  });
  updateParTotalReadout('.hole-par-box', 'parTotalReadout');
}

let currentHolePars = [];
let currentHoleBests = null;

function buildHoleInputs(){
  const holes = parseInt(document.getElementById('f-holes').value, 10);
  const courseTyped = document.getElementById('f-course').value.trim();
  const hist = getHistoricalHoleStats(courseTyped, holes);
  const scoreRow = document.getElementById('scoreInputsRow');
  scoreRow.innerHTML = '';

  const parBoxes = Array.from(document.querySelectorAll('.hole-par-box'));
  const planned = plannedParsFor(courseTyped, holes);
  const parForHole = (h) => {
    if(hist) return hist.pars[h];
    if(parBoxes[h]) return parseInt(parBoxes[h].value, 10);
    if(planned) return planned[h];
    return null;
  };
  const prefillForHole = (h) => {
    if(hist) return Math.round(hist.medians[h]);
    const par = parForHole(h);
    return par != null && !isNaN(par) ? par + 2 : 6;
  };

  currentHolePars = [];
  currentHoleBests = hist ? hist.bests : null;
  for(let h=1; h<=holes; h++){
    currentHolePars.push(parForHole(h-1));
  }

  for(let h=1; h<=holes; h++){
    const prefill = Math.max(1, Math.min(9, prefillForHole(h-1)));
    const hintHtml = hist ? `<div class="hole-hint">Par ${hist.pars[h-1]}<br>Best ${hist.bests[h-1]}</div>` : '';
    scoreRow.innerHTML += `<div class="hole-box"><div class="hnum">${h}</div><button type="button" class="hole-score-display" data-hole="${h}"><span class="score-shape">${prefill}</span></button><input type="hidden" class="hole-score-box" data-hole="${h}" value="${prefill}">${hintHtml}</div>`;
  }
  document.querySelectorAll('.hole-score-display').forEach(btn=>{
    const h = parseInt(btn.dataset.hole, 10);
    const shape = btn.querySelector('.score-shape');
    const score = parseInt(shape.textContent, 10);
    const best = currentHoleBests ? currentHoleBests[h-1] : null;
    const isBest = best != null && !isNaN(score) && score < best;
    applyScoreStyling(shape, score, currentHolePars[h-1], isBest);
    btn.addEventListener('click', ()=>{
      openScoreKeypad(h, holes);
    });
  });
  updateGrossScoreHint();
  updateHoleBestHighlights();
}

// ===== REMOVABLE: Score entry keypad =====
// Reuses the SAME .hole-score-box hidden inputs every other function already reads --
// this only adds a visible button + keypad layer that drives those inputs' values, so
// updateGrossScoreHint(), updateHoleBestHighlights(), and the save handler all keep
// working completely unchanged.
function openScoreKeypad(holeNum, totalHoles){
  const par = currentHolePars[holeNum-1];
  document.getElementById('scoreKeypadLabel').textContent = par != null ? `Hole ${holeNum} — Par ${par}` : `Hole ${holeNum}`;
  const hintEl = document.getElementById('scoreKeypadHint');
  hintEl.textContent = (currentHoleBests && currentHoleBests[holeNum-1] != null) ? `Best: ${currentHoleBests[holeNum-1]}` : '';

  const grid = document.getElementById('scoreKeypadGrid');
  grid.innerHTML = '';
  const best = currentHoleBests ? currentHoleBests[holeNum-1] : null;
  for(let n=1; n<=9; n++){
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'keypad-btn';
    const shape = document.createElement('span');
    shape.className = 'score-shape';
    const isBest = best != null && n < best;
    applyScoreStyling(shape, n, par, isBest);
    btn.appendChild(shape);
    btn.addEventListener('click', ()=> selectKeypadScore(holeNum, n, totalHoles));
    grid.appendChild(btn);
  }

  document.getElementById('scoreKeypadOverlay').classList.add('open');
}

// Applies the classic scorecard convention: a circle for under par (double circle for
// eagle or better), a square for over par (double square for double bogey or worse),
// nothing for an exact par. Only styles when par is actually known for this hole.
// Applies the classic scorecard convention on a small inner shape (never the outer
// button, which always stays a plain square): a circle for under par (double circle for
// eagle or better), a square for over par (double square for double bogey or worse),
// nothing for an exact par. Red is reserved for tying or beating the historical best on
// this specific hole at this course -- NOT for score severity; a red-bordered bogey means
// "you've never done better here," not "this was bad."
function applyScoreStyling(shapeEl, score, par, isBest){
  shapeEl.classList.remove('score-eagle','score-birdie','score-par','score-bogey','score-double-plus','is-best');
  shapeEl.textContent = isNaN(score) ? '' : score;
  if(par != null && !isNaN(score)){
    const diff = score - par;
    if(diff <= -2) shapeEl.classList.add('score-eagle');
    else if(diff === -1) shapeEl.classList.add('score-birdie');
    else if(diff === 0) shapeEl.classList.add('score-par');
    else if(diff === 1) shapeEl.classList.add('score-bogey');
    else shapeEl.classList.add('score-double-plus');
  }
  if(isBest) shapeEl.classList.add('is-best');
}

// Best-effort haptic feedback -- tries the standard Vibration API (works on Android/other
// browsers) and the iOS checkbox-switch trick (undocumented side effect, iOS 17.4+ only,
// may not work on all iOS versions). Silently does nothing if neither is available.
function triggerHaptic(){
  if(navigator.vibrate) navigator.vibrate(15);
  const el = document.getElementById('hapticTrigger');
  if(el) el.checked = !el.checked;
}

function selectKeypadScore(holeNum, score, totalHoles){
  const hidden = document.querySelector(`.hole-score-box[data-hole="${holeNum}"]`);
  const display = document.querySelector(`.hole-score-display[data-hole="${holeNum}"]`);
  const shape = display.querySelector('.score-shape');
  hidden.value = score;
  const best = currentHoleBests ? currentHoleBests[holeNum-1] : null;
  const isBest = best != null && score < best;
  if(isBest) triggerHaptic();
  applyScoreStyling(shape, score, currentHolePars[holeNum-1], isBest);
  updateGrossScoreHint();
  updateHoleBestHighlights();

  document.getElementById('scoreKeypadOverlay').classList.remove('open');
  if(holeNum < totalHoles){
    openScoreKeypad(holeNum + 1, totalHoles);
  }
}

document.getElementById('scoreKeypadClose').addEventListener('click', ()=>{
  document.getElementById('scoreKeypadOverlay').classList.remove('open');
});
document.getElementById('scoreKeypadOverlay').addEventListener('click', e=>{
  if(e.target.id === 'scoreKeypadOverlay') document.getElementById('scoreKeypadOverlay').classList.remove('open');
});
// ===== END REMOVABLE =====

// ===== REMOVABLE: Par entry keypad =====
function openParKeypad(holeNum, totalHoles){
  document.getElementById('parKeypadLabel').textContent = `Hole ${holeNum} Par`;
  const grid = document.getElementById('parKeypadGrid');
  grid.innerHTML = '';
  for(let n=1; n<=9; n++){
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'keypad-btn';
    btn.textContent = n;
    btn.addEventListener('click', ()=> selectParKeypadValue(holeNum, n, totalHoles));
    grid.appendChild(btn);
  }
  document.getElementById('parKeypadOverlay').classList.add('open');
}

function selectParKeypadValue(holeNum, value, totalHoles){
  const hidden = document.querySelector(`.hole-par-box[data-hole="${holeNum}"]`);
  const display = document.querySelector(`.hole-par-display[data-hole="${holeNum}"]`);
  hidden.value = value;
  display.textContent = value;
  updateParTotalReadout('.hole-par-box', 'parTotalReadout');
  updateExpectedScoreHint();
  updateGrossScoreHint();

  document.getElementById('parKeypadOverlay').classList.remove('open');
  if(holeNum < totalHoles){
    openParKeypad(holeNum + 1, totalHoles);
  }
}

document.getElementById('parKeypadClose').addEventListener('click', ()=>{
  document.getElementById('parKeypadOverlay').classList.remove('open');
});
document.getElementById('parKeypadOverlay').addEventListener('click', e=>{
  if(e.target.id === 'parKeypadOverlay') document.getElementById('parKeypadOverlay').classList.remove('open');
});
// ===== END REMOVABLE =====


// Parses a pasted "code string" of the form:
//   Course Name|par1,par2,...|rating|slope|City, State
// into structured course data, so a single paste into the course-name field can
// auto-fill rating, slope, every par box, and location instead of typing each in.
function tryParseCourseCodeString(rawValue){
  if(!rawValue || rawValue.indexOf('|') === -1) return null;
  const parts = rawValue.split('|');
  if(parts.length !== 5) return null;
  const name = parts[0].trim();
  const pars = parts[1].split(',').map(s => parseInt(s.trim(), 10));
  const rating = parseFloat(parts[2].trim());
  const slope = parseInt(parts[3].trim(), 10);
  const location = parts[4].trim();
  if(!name || pars.length === 0 || pars.some(isNaN)) return null;
  if(pars.length !== 9 && pars.length !== 18) return null;
  if(isNaN(rating) || isNaN(slope) || !location) return null;
  return {name, pars, rating, slope, location};
}

function getCurrentFormPar(){
  const courseTyped = document.getElementById('f-course').value.trim();
  const holes = parseInt(document.getElementById('f-holes').value, 10);
  const parBoxes = Array.from(document.querySelectorAll('.hole-par-box'));
  if(parBoxes.length === holes){
    return parBoxes.reduce((s,b)=> s + (parseInt(b.value,10)||0), 0);
  }
  if(PAR_BY_COURSE[courseTyped] != null) return PAR_BY_COURSE[courseTyped];
  const planned = plannedParsFor(courseTyped, holes);
  if(planned) return planned.reduce((s,x)=>s+x,0);
  return null;
}

function updateGrossScoreHint(){
  const boxes = Array.from(document.querySelectorAll('.hole-score-box'));
  const values = boxes.map(b => parseInt(b.value, 10));
  const grossSlot = document.getElementById('grossScoreSlot');
  const diffSlot = document.getElementById('diffScoreSlot');
  const valueEl = document.getElementById('grossScoreValue');
  const diffEl = document.getElementById('grossScoreDiffValue');
  if(values.length === 0 || values.some(v => isNaN(v))){
    grossSlot.style.display = 'none';
    diffSlot.style.display = 'none';
    document.getElementById('newCourseBestMsg').style.display = 'none';
    syncScoreStatsRowVisibility();
    return;
  }
  const gross = values.reduce((s,x)=>s+x,0);
  valueEl.innerHTML = gross + toParTextFor(gross, getCurrentFormPar());
  grossSlot.style.display = 'block';
  updateNewCourseBestMsg(gross);

  const rating = parseFloat(document.getElementById('f-rating').value);
  const slope = parseFloat(document.getElementById('f-slope').value);
  const holes = parseInt(document.getElementById('f-holes').value, 10);
  if(!isNaN(rating) && !isNaN(slope)){
    const diff = computeDiff(gross, rating, slope, holes);
    diffEl.textContent = diff.toFixed(1);
    diffSlot.style.display = 'block';
  } else {
    diffSlot.style.display = 'none';
  }
  syncScoreStatsRowVisibility();
}

function updateHoleBestHighlights(){
  const courseTyped = document.getElementById('f-course').value.trim();
  const holes = parseInt(document.getElementById('f-holes').value, 10);
  const hist = getHistoricalHoleStats(courseTyped, holes);
  document.querySelectorAll('.hole-score-box').forEach(box=>{
    const h = parseInt(box.dataset.hole, 10) - 1;
    const val = parseInt(box.value, 10);
    const wrapper = box.closest('.hole-box');
    const beats = hist && !isNaN(val) && val < hist.bests[h];
    wrapper.classList.toggle('beats-hole-best', !!beats);
  });
}

function updateNewCourseBestMsg(gross){
  const courseTyped = document.getElementById('f-course').value.trim();
  const msgEl = document.getElementById('newCourseBestMsg');
  if(!courseTyped){
    msgEl.style.display = 'none';
    return;
  }
  const priorRounds = rounds.filter(r => r.course.trim().toLowerCase() === courseTyped.toLowerCase());
  if(priorRounds.length === 0){
    msgEl.style.display = 'none';
    return;
  }
  const priorBest = Math.min(...priorRounds.map(scoreOf));
  msgEl.style.display = (gross < priorBest) ? 'block' : 'none';
}

document.getElementById('f-course').addEventListener('input', (e)=>{
  const typed = e.target.value.trim();

  const parsed = tryParseCourseCodeString(typed);
  if(parsed){
    document.getElementById('f-course').value = parsed.name;
    setHolesValue('f-holes', parsed.pars.length);
    document.getElementById('f-rating').value = parsed.rating;
    document.getElementById('f-slope').value = parsed.slope;
    document.getElementById('newCourseBadge').style.display = 'block';
    document.getElementById('parInputsSection').style.display = 'block';
    // Always rebuild here, unconditionally -- a Delim paste is an explicit "replace
    // everything" action (possibly a different course, possibly a different hole count
    // than whatever was there before), unlike an incidental name edit afterward.
    buildParInputs();
    const parBoxes = Array.from(document.querySelectorAll('.hole-par-box'));
    const parDisplays = Array.from(document.querySelectorAll('.hole-par-display'));
    parBoxes.forEach((box, i) => {
      if(parsed.pars[i] != null){
        box.value = parsed.pars[i];
        if(parDisplays[i]) parDisplays[i].textContent = parsed.pars[i];
      }
    });
    updateParTotalReadout('.hole-par-box', 'parTotalReadout');
    buildHoleInputs();
    updateExpectedScoreHint();
    document.getElementById('f-location').value = parsed.location;
    document.getElementById('f-location').dispatchEvent(new Event('blur'));
    return;
  }

  const match = lookupCourseInfo(typed);
  if(match){
    document.getElementById('f-rating').value = match.rating;
    document.getElementById('f-slope').value = match.slope;
    setHolesValue('f-holes', match.holes);
  }
  updateNewCourseUI();
  buildHoleInputs();
  updateExpectedScoreHint();
});

function autoHalveNineHoleRating(){
  const holes = parseInt(document.getElementById('f-holes').value, 10);
  const ratingInput = document.getElementById('f-rating');
  const rating = parseFloat(ratingInput.value);
  if(holes === 9 && !isNaN(rating) && rating > 50){
    ratingInput.value = Math.round((rating / 2) * 10) / 10;
  }
}

function syncScoreStatsRowVisibility(){
  const anyVisible = ['expScoreHint','grossScoreSlot','diffScoreSlot']
    .some(id => document.getElementById(id).style.display !== 'none');
  document.getElementById('scoreStatsRow').style.display = anyVisible ? 'block' : 'none';
}

function updateExpectedScoreHint(){
  let rating = parseFloat(document.getElementById('f-rating').value);
  const slope = parseFloat(document.getElementById('f-slope').value);
  const holes = parseInt(document.getElementById('f-holes').value, 10);
  const hint = document.getElementById('expScoreHint');
  const valueEl = document.getElementById('expScoreValue');

  if(isNaN(rating) || isNaN(slope) || !trend || !trend.length){
    hint.style.display = 'none';
    syncScoreStatsRowVisibility();
    return;
  }
  if(holes === 9 && rating > 50){
    rating = rating / 2;
  }
  const currentIndex = trend[trend.length-1].index;
  const expScore = holes === 9
    ? Math.round((currentIndex/2) * slope / 113 + rating)
    : Math.round(currentIndex * slope / 113 + rating);
  valueEl.innerHTML = expScore + toParTextFor(expScore, getCurrentFormPar());
  hint.style.display = 'block';
  syncScoreStatsRowVisibility();
}
document.getElementById('f-rating').addEventListener('input', ()=>{ updateExpectedScoreHint(); updateGrossScoreHint(); });
document.getElementById('f-slope').addEventListener('input', ()=>{ updateExpectedScoreHint(); updateGrossScoreHint(); });
// Sets a holes hidden-input's value AND keeps its visible 9|18 toggle in sync -- used
// anywhere the value is set programmatically (course selection, Delim paste, known-course
// match), not just from the toggle's own click.
function setHolesValue(targetId, value){
  document.getElementById(targetId).value = value;
  document.querySelectorAll(`.holes-toggle-btn[data-target="${targetId}"]`).forEach(b=>{
    b.classList.toggle('active', b.dataset.holes === String(value));
  });
}

document.querySelectorAll('.holes-toggle-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const targetId = btn.dataset.target;
    document.querySelectorAll(`.holes-toggle-btn[data-target="${targetId}"]`).forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(targetId).value = btn.dataset.holes;

    if(targetId === 'f-holes'){
      if(document.getElementById('parInputsSection').style.display !== 'none'){
        buildParInputs();
      }
      buildHoleInputs();
      updateExpectedScoreHint();
    } else if(targetId === 'beta-ff-holes'){
      if(document.getElementById('betaFutureParInputsSection').style.display !== 'none'){
        buildBetaFutureParInputs();
      }
    }
  });
});

function todayISO(){
  const d = new Date();
  const tz = d.getTimezoneOffset();
  return new Date(d.getTime() - tz*60000).toISOString().slice(0,10);
}

function openAddModal(){
  document.getElementById('formError').style.display = 'none';
  document.getElementById('f-course').value = '';
  document.getElementById('f-date').value = todayISO();
  setHolesValue('f-holes', 18);
  document.getElementById('f-rating').value = '';
  document.getElementById('f-slope').value = '';
  document.getElementById('expScoreHint').style.display = 'none';
  document.getElementById('newCourseBadge').style.display = 'none';
  document.getElementById('parInputsSection').style.display = 'none';
  document.getElementById('newCourseBestMsg').style.display = 'none';
  document.getElementById('scorePerHoleLabel').textContent = 'Score per hole (Median score shown by default)';
  mainLocationInput.reset();
  buildHoleInputs();
  buildAddRoundCourseGrid();
  document.getElementById('addRoundTabPast').classList.add('active');
  document.getElementById('addRoundTabNew').classList.remove('active');
  document.getElementById('addRoundPastPanel').style.display = 'block';
  document.getElementById('addRoundNewPanel').style.display = 'none';
  document.getElementById('addRoundSavedCoursesView').style.display = 'none';
  document.getElementById('addRoundKnownFields').style.display = 'none';
  document.getElementById('addRoundPastGridView').style.display = 'block';
  document.getElementById('addRoundHolePickView').style.display = 'none';
  addOverlay.classList.add('open');
}
document.getElementById('addRoundBtn').addEventListener('click', openAddModal);

// ===== REMOVABLE: Add Round Past Course / New Course tabs =====
document.getElementById('addRoundTabPast').addEventListener('click', ()=>{
  document.getElementById('addRoundTabPast').classList.add('active');
  document.getElementById('addRoundTabNew').classList.remove('active');
  document.getElementById('addRoundPastPanel').style.display = 'block';
  document.getElementById('addRoundNewPanel').style.display = 'none';
  document.getElementById('addRoundSavedCoursesView').style.display = 'none';
  document.getElementById('addRoundKnownFields').style.display = 'none';
  document.getElementById('scorePerHoleLabel').textContent = 'Score per hole (Median score shown by default)';
});
document.getElementById('addRoundTabNew').addEventListener('click', ()=>{
  document.getElementById('addRoundTabNew').classList.add('active');
  document.getElementById('addRoundTabPast').classList.remove('active');
  document.getElementById('addRoundNewPanel').style.display = 'block';
  document.getElementById('addRoundPastPanel').style.display = 'none';
  document.getElementById('addRoundSavedCoursesView').style.display = 'none';
  document.getElementById('addRoundKnownFields').style.display = 'block';
  document.getElementById('scorePerHoleLabel').textContent = 'Score per hole';
});

function applyAddRoundCourseSelection(info){
  document.getElementById('f-course').value = info.name;
  document.getElementById('f-rating').value = info.rating;
  document.getElementById('f-slope').value = info.slope;
  setHolesValue('f-holes', info.holes);
  updateNewCourseUI();
  buildHoleInputs();
  updateExpectedScoreHint();
}

// ===== REMOVABLE: Saved New Courses in Add Round's New Course tab =====
// Simpler than the Beta version -- tapping a course here directly applies it (logging an
// actual round), there's no "schedule" concept and no delete screen (deletion is already
// available via the Beta flow elsewhere), so this is just a picker.
function renderAddRoundSavedCourses(){
  const grid = document.getElementById('addRoundSavedCourseGrid');
  const entries = Object.values(savedNewCourses)
    .filter(c => courseLookup[c.name.trim().toLowerCase()] == null)
    .filter(c => !deletedSavedCourseKeys.includes(c.name.trim().toLowerCase()));
  const grouped = groupCoursesForPicker(entries);
  document.getElementById('addRoundSavedEmptyNote').style.display = grouped.length === 0 ? 'block' : 'none';
  grid.innerHTML = grouped.map(g => {
    const rep = g.variants.solo || Object.values(g.variants)[0];
    const loc = COURSE_LOCATIONS[rep.name];
    const locLine = loc && loc.label ? abbreviateLocation(loc.label) : '';
    const rsLine = `${rep.rating.toFixed(1)}/${rep.slope}`;
    const subLine = [locLine, rsLine].filter(Boolean).join('<br>');
    return `<button type="button" class="beta-saved-course-btn" data-key="${g.key.replace(/"/g,'&quot;')}"
      style="flex:1 1 auto;min-width:0;max-width:calc(33.333% - 6px);background:var(--paper-tan);color:var(--ink);border:1px solid var(--line);border-radius:8px;padding:10px 6px;cursor:pointer;text-align:center;">
      <span class="beta-course-name" style="display:block;font-family:var(--font-mono);line-height:1.3;">${g.display}</span>
      <span style="display:block;font-size:10px;color:#8a8368;margin-top:3px;line-height:1.4;">${subLine}</span>
    </button>`;
  }).join('');
  grid.querySelectorAll('.beta-saved-course-btn').forEach(btn=>{
    const g = grouped.find(x => x.key === btn.dataset.key);
    btn.addEventListener('click', ()=>{
      const info = g.variants.solo || Object.values(g.variants)[0];
      applyAddRoundCourseSelection(info);
      document.getElementById('addRoundSavedCoursesView').style.display = 'none';
      document.getElementById('addRoundNewPanel').style.display = 'block';
    });
  });
  fitCourseButtonText(grid);
}
document.getElementById('addRoundShowSavedBtn').addEventListener('click', ()=>{
  renderAddRoundSavedCourses();
  document.getElementById('addRoundNewPanel').style.display = 'none';
  document.getElementById('addRoundSavedCoursesView').style.display = 'block';
});
document.getElementById('addRoundBackFromSaved').addEventListener('click', ()=>{
  document.getElementById('addRoundSavedCoursesView').style.display = 'none';
  document.getElementById('addRoundNewPanel').style.display = 'block';
});
// ===== END REMOVABLE =====

let addRoundHolePickGroup = null;
function showAddRoundHolePick(g){
  addRoundHolePickGroup = g;
  document.getElementById('addRoundHolePickLabel').textContent = g.display;
  const toggle = document.getElementById('addRoundHolePickToggle');
  const suffixes = Object.keys(g.variants);
  toggle.innerHTML = suffixes.map((s) =>
    `<button type="button" class="view-toggle-btn" data-suffix="${s.replace(/"/g,'&quot;')}">${s}</button>`
  ).join('');
  toggle.querySelectorAll('button').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      applyAddRoundCourseSelection(g.variants[btn.dataset.suffix]);
      document.getElementById('addRoundHolePickView').style.display = 'none';
      document.getElementById('addRoundPastGridView').style.display = 'block';
    });
  });
  document.getElementById('addRoundPastGridView').style.display = 'none';
  document.getElementById('addRoundHolePickView').style.display = 'block';
}
document.getElementById('addRoundBackFromHolePick').addEventListener('click', ()=>{
  document.getElementById('addRoundHolePickView').style.display = 'none';
  document.getElementById('addRoundPastGridView').style.display = 'block';
});

function buildAddRoundCourseGrid(){
  const grid = document.getElementById('addRoundCourseGrid');
  const known = Object.values(courseLookup);
  const grouped = groupCoursesForPicker(known);
  grid.innerHTML = grouped.map(g =>
    `<button type="button" class="beta-course-btn" data-key="${g.key.replace(/"/g,'&quot;')}"
      style="flex:1 1 auto;min-width:0;max-width:calc(33.333% - 6px);background:var(--paper-tan);color:var(--ink);border:1px solid var(--line);border-radius:8px;padding:10px 6px;cursor:pointer;text-align:center;">
      <span class="beta-course-name" style="display:block;font-family:var(--font-mono);line-height:1.3;">${g.display}</span>
    </button>`
  ).join('');
  grid.querySelectorAll('.beta-course-btn').forEach(btn=>{
    const g = grouped.find(x => x.key === btn.dataset.key);
    btn.addEventListener('click', ()=>{
      if(g.variants.solo){
        applyAddRoundCourseSelection(g.variants.solo);
      } else {
        showAddRoundHolePick(g);
      }
    });
  });
  fitCourseButtonText(grid);
}
// ===== END REMOVABLE =====

document.getElementById('addSave').addEventListener('click', ()=>{
  const course = document.getElementById('f-course').value.trim();
  const date = document.getElementById('f-date').value;
  const holes = parseInt(document.getElementById('f-holes').value, 10);
  let rating = parseFloat(document.getElementById('f-rating').value);
  const slope = parseFloat(document.getElementById('f-slope').value);

  if(holes === 9 && !isNaN(rating) && rating > 50){
    rating = rating / 2;
  }

  const scoreBoxes = Array.from(document.querySelectorAll('.hole-score-box'));
  const scores = scoreBoxes.map(b => parseInt(b.value, 10));

  const isNewCourse = course.length > 0 && !isKnownCourse(course);
  let pars;
  if(isNewCourse){
    const parBoxes = Array.from(document.querySelectorAll('.hole-par-box'));
    pars = parBoxes.map(b => parseInt(b.value, 10));
  } else {
    const hist = getHistoricalHoleStats(course, holes);
    pars = hist ? hist.pars : (plannedParsFor(course, holes) || Array(holes).fill(4));
  }

  const parsValid = pars.length === holes && pars.every(p => !isNaN(p) && p > 0);
  const scoresValid = scores.length === holes && scores.every(s => !isNaN(s) && s > 0);
  const valid = course && date && !isNaN(rating) && !isNaN(slope) && scoresValid && parsValid;
  if(!valid){
    document.getElementById('formError').style.display = 'block';
    return;
  }

  const gross = scores.reduce((s,x)=>s+x,0);
  const parTotal = pars.reduce((s,x)=>s+x,0);
  const diff = computeDiff(gross, rating, slope, holes);

  // If this course name ends in "(18)" and a plain version of the same name already
  // has rounds on file, relabel every existing round there to "(9)" so the two stay
  // distinct. Applies retroactively to past rounds and to any future round saved
  // under the old plain name too.
  const m18 = course.match(/^(.*)\s\(18\)$/i);
  if(m18){
    const baseName = m18[1].trim();
    const hasPlainVersion = rounds.some(r => r.course.trim().toLowerCase() === baseName.toLowerCase());
    if(hasPlainVersion && !courseRenames[baseName]){
      const newName9 = `${baseName} (9)`;
      courseRenames[baseName] = newName9;
      persistRenames();
      applyCourseRenames();
      applyRatingSlopeOverrides();
      applyParOverrides();
      rebuildRoundsArray();
    }
    // The (18) course itself is the same physical place as its plain-name version --
    // inherit that known location automatically rather than require re-entering it.
    if(COURSE_LOCATIONS[course] == null && COURSE_LOCATIONS[baseName] != null){
      COURSE_LOCATIONS[course] = COURSE_LOCATIONS[baseName];
      persistLocations();
    }
  }

  // Computed and stored ONCE, right now, using trend as it exists at this exact moment
  // (only prior rounds, since this one hasn't been added yet) -- this becomes a permanent
  // snapshot on the round itself, so it can never drift later even if an earlier-dated
  // round gets logged afterward and shifts everyone else's chronological position.
  const priorTrendIndex = (trend && trend.length) ? trend[trend.length-1].index : null;
  const expAtTime = priorTrendIndex != null
    ? (holes === 9 ? Math.round((priorTrendIndex/2) * slope / 113 + rating) : Math.round(priorTrendIndex * slope / 113 + rating))
    : null;

  const newRound = {
    score: gross + (holes===9?'Ni':'A'),
    date, rating, slope, diff, course, holes,
    holeDetail: { pars, scores },
    expAtTime
  };

  PAR_BY_COURSE[course] = parTotal;
  persistPars();
  saveCourseInfoToRegistry(course, rating, slope, holes);
  const resolvedLoc = mainLocationInput.getResolved();
  if(resolvedLoc){
    COURSE_LOCATIONS[course] = {lat: resolvedLoc.lat, lon: resolvedLoc.lon, label: resolvedLoc.label};
    persistLocations();
  }

  addedRounds.unshift(newRound);
  persistAdded();

  // If a Future Round was planned for this same course + date, it's been played now -- remove it.
  const matchedFuture = futureRounds.find(f =>
    f.course.trim().toLowerCase() === course.toLowerCase() && f.date === date
  );
  if(matchedFuture){
    removeFutureRound(matchedFuture.id);
  }

  rebuildRoundsArray();
  addOverlay.classList.remove('open');
  recompute();
});

// ================= ADD FUTURE ROUND MODAL =================
const addFutureOverlay = document.getElementById('addFutureOverlay');
document.getElementById('addFutureClose').addEventListener('click', ()=>addFutureOverlay.classList.remove('open'));
document.getElementById('addFutureCancel').addEventListener('click', ()=>addFutureOverlay.classList.remove('open'));
addFutureOverlay.addEventListener('click', e=>{ if(e.target===addFutureOverlay) addFutureOverlay.classList.remove('open'); });
document.getElementById('betaFutureOverlay').addEventListener('click', e=>{ if(e.target.id==='betaFutureOverlay') document.getElementById('betaFutureOverlay').classList.remove('open'); });

function buildFutureParInputs(){
  const holes = parseInt(document.getElementById('ff-holes').value, 10);
  const parRow = document.getElementById('futureParInputsRow');
  parRow.innerHTML = '';
  for(let h=1; h<=holes; h++){
    const opts = [3,4,5,6].map(n => `<option value="${n}" ${n===4?'selected':''}>${n}</option>`).join('');
    parRow.innerHTML += `<div class="hole-box"><div class="hnum">${h}</div><select class="future-hole-par-box" data-hole="${h}">${opts}</select></div>`;
  }
  document.querySelectorAll('.future-hole-par-box').forEach(el=>{
    el.addEventListener('input', ()=>updateParTotalReadout('.future-hole-par-box', 'futureParTotalReadout'));
  });
  updateParTotalReadout('.future-hole-par-box', 'futureParTotalReadout');
}

function updateFutureNewCourseUI(){
  const typed = document.getElementById('ff-course').value.trim();
  const isNew = typed.length > 0 && !isKnownCourse(typed);
  const wasVisible = document.getElementById('futureParInputsSection').style.display !== 'none';
  document.getElementById('futureNewCourseBadge').style.display = isNew ? 'block' : 'none';
  document.getElementById('futureParInputsSection').style.display = isNew ? 'block' : 'none';
  if(isNew && (!wasVisible || document.getElementById('futureParInputsRow').innerHTML === '')){
    buildFutureParInputs();
  }
}

function updateFutureExpScoreHint(){
  const rating = parseFloat(document.getElementById('ff-rating').value);
  const slope = parseFloat(document.getElementById('ff-slope').value);
  const holes = parseInt(document.getElementById('ff-holes').value, 10);
  const hint = document.getElementById('ffExpScoreHint');
  const valueEl = document.getElementById('ffExpScoreValue');
  const exp = computeExpScoreFor(rating, slope, holes);
  if(exp === null){
    hint.style.display = 'none';
    return;
  }
  const courseTyped = document.getElementById('ff-course').value.trim();
  const par = parForFutureRound({course: courseTyped, holes});
  valueEl.innerHTML = exp + toParTextFor(exp, par);
  hint.style.display = 'block';
}

const mainLocationInput = wireLocationInput('f-location', 'f-location-preview');
const futureLocationInput = wireLocationInput('ff-location', 'ff-location-preview');
const editCourseLocationInput = wireLocationInput('ec-location', 'ec-location-preview');

let editingCourseName = null;
function openEditCourseModal(courseName){
  editingCourseName = courseName;
  document.getElementById('editCourseTitle').textContent = `Edit ${courseName}`;
  document.getElementById('ec-name').value = courseName;
  const key = courseName.trim().toLowerCase();
  // Fall back to an actual round at this course if the registry cache doesn't have an
  // entry -- ensures the field always shows a known value, not just whatever happened
  // to get cached.
  const reg = courseRegistry[key];
  const roundAtCourse = rounds.find(r => r.course === courseName);
  const knownRating = reg ? reg.rating : (roundAtCourse ? roundAtCourse.rating : null);
  const knownSlope = reg ? reg.slope : (roundAtCourse ? roundAtCourse.slope : null);
  document.getElementById('ec-rating').value = knownRating != null ? knownRating : '';
  document.getElementById('ec-slope').value = knownSlope != null ? knownSlope : '';

  // Par editor -- only meaningful if at least one round here has hole-by-hole detail to
  // show/correct. Populated from the MOST RECENT such round's pars.
  const roundsWithHoleDetailAtCourse = rounds.filter(r => r.course === courseName && r.holeDetail);
  const parSection = document.getElementById('ecParSection');
  const parRow = document.getElementById('ecParInputsRow');
  if(roundsWithHoleDetailAtCourse.length > 0){
    const mostRecent = [...roundsWithHoleDetailAtCourse].sort((a,b)=> new Date(b.date) - new Date(a.date))[0];
    const pars = mostRecent.holeDetail.pars;
    parRow.innerHTML = pars.map((p,i) => `<div class="hole-box"><div class="hnum">${i+1}</div><input type="number" class="ec-par-box" data-hole="${i+1}" value="${p}"></div>`).join('');
    parSection.style.display = 'block';
  } else {
    parRow.innerHTML = '';
    parSection.style.display = 'none';
  }

  editCourseLocationInput.reset();
  const loc = COURSE_LOCATIONS[courseName];
  const locationField = document.getElementById('ec-location');
  const locationPreview = document.getElementById('ec-location-preview');
  if(loc){
    locationField.value = loc.label || `${loc.lat.toFixed(4)}, ${loc.lon.toFixed(4)}`;
    locationPreview.textContent = 'Current location shown above -- edit and click away to replace it.';
  } else {
    locationField.value = '';
    locationPreview.textContent = '';
  }
  detailOverlay.classList.remove('open');
  document.getElementById('editCourseOverlay').classList.add('open');
}
document.getElementById('editCourseClose').addEventListener('click', ()=>{
  document.getElementById('editCourseOverlay').classList.remove('open');
  detailOverlay.classList.add('open');
});
document.getElementById('editCourseCancel').addEventListener('click', ()=>{
  document.getElementById('editCourseOverlay').classList.remove('open');
  detailOverlay.classList.add('open');
});
document.getElementById('editCourseSave').addEventListener('click', ()=>{
  if(!editingCourseName) return;

  // Renaming first, if the name changed -- reuses the app's existing rename mechanism,
  // which now correctly carries par, rating/slope, and location over to the new name
  // before any explicit edits below get applied on top of it.
  const newName = document.getElementById('ec-name').value.trim();
  let activeCourseName = editingCourseName;
  if(newName && newName !== editingCourseName){
    courseRenames[editingCourseName] = newName;
    persistRenames();
    applyCourseRenames();
    rebuildRoundsArray();
    activeCourseName = newName;
  }

  const rating = parseFloat(document.getElementById('ec-rating').value);
  const slope = parseFloat(document.getElementById('ec-slope').value);
  if(!isNaN(rating) && !isNaN(slope)){
    const holesAtCourse = rounds.find(r => r.course === activeCourseName);
    saveCourseInfoToRegistry(activeCourseName, rating, slope, holesAtCourse ? holesAtCourse.holes : 18);

    // The registry alone only pre-fills FUTURE entry -- it never touches already-logged
    // rounds' own stored rating/slope/differential, which is why editing here previously
    // appeared to do nothing. Storing this as a persisted override (same pattern as
    // renames/pars/locations) rather than mutating rounds directly is what actually makes
    // it survive a reload -- most rounds live in baseRounds, hardcoded in the page source,
    // which no in-memory mutation can rewrite; the override gets re-applied fresh on
    // every load instead, regardless of where the round originally came from.
    ratingSlopeOverrides[activeCourseName.trim().toLowerCase()] = {rating, slope};
    persistRatingSlopeOverrides();
    applyRatingSlopeOverrides();
    recompute();
  }

  // Par -- only present/read if the editor was actually shown (at least one round here
  // has hole-by-hole detail). Deliberately does NOT touch differential, which has no
  // dependency on par at all; it DOES cascade to the scorecard display and every badge
  // that reads score-to-par, since those are computed fresh from each round's own stored
  // pars every time they're viewed, never cached.
  const parBoxes = Array.from(document.querySelectorAll('.ec-par-box'));
  if(parBoxes.length > 0){
    const newPars = parBoxes.map(b => parseInt(b.value, 10));
    if(newPars.every(p => !isNaN(p) && p > 0)){
      parOverrides[activeCourseName.trim().toLowerCase()] = newPars;
      persistParOverrides();
      applyParOverrides();
    }
  }
  const resolvedLoc = editCourseLocationInput.getResolved();
  if(resolvedLoc){
    COURSE_LOCATIONS[activeCourseName] = {lat: resolvedLoc.lat, lon: resolvedLoc.lon, label: resolvedLoc.label};
    persistLocations();
  }
  document.getElementById('editCourseOverlay').classList.remove('open');
  navStack = [];
  recompute();
  openCourseDetail(activeCourseName);
});

document.getElementById('ff-course').addEventListener('input', (e)=>{
  const typed = e.target.value.trim();

  const parsed = tryParseCourseCodeString(typed);
  if(parsed){
    document.getElementById('ff-course').value = parsed.name;
    document.getElementById('ff-holes').value = parsed.pars.length;
    document.getElementById('ff-rating').value = parsed.rating;
    document.getElementById('ff-slope').value = parsed.slope;
    document.getElementById('futureNewCourseBadge').style.display = 'block';
    document.getElementById('futureParInputsSection').style.display = 'block';
    buildFutureParInputs();
    const parBoxes = Array.from(document.querySelectorAll('.future-hole-par-box'));
    parBoxes.forEach((box, i) => { if(parsed.pars[i] != null) box.value = parsed.pars[i]; });
    updateParTotalReadout('.future-hole-par-box', 'futureParTotalReadout');
    updateFutureExpScoreHint();
    document.getElementById('ff-location').value = parsed.location;
    document.getElementById('ff-location').dispatchEvent(new Event('blur'));
    return;
  }

  const match = lookupCourseInfo(typed);
  if(match){
    document.getElementById('ff-rating').value = match.rating;
    document.getElementById('ff-slope').value = match.slope;
    document.getElementById('ff-holes').value = match.holes;
  }
  updateFutureNewCourseUI();
  updateFutureExpScoreHint();
});
document.getElementById('ff-holes').addEventListener('change', ()=>{
  if(document.getElementById('futureParInputsSection').style.display !== 'none'){
    buildFutureParInputs();
  }
  updateFutureExpScoreHint();
});
document.getElementById('ff-rating').addEventListener('input', updateFutureExpScoreHint);
document.getElementById('ff-slope').addEventListener('input', updateFutureExpScoreHint);

function populateFutureTimeDropdowns(){
  const hourSel = document.getElementById('ff-hour');
  if(hourSel.options.length === 0){
    for(let h=7; h<=19; h++){
      hourSel.innerHTML += `<option value="${h}" ${h===9?'selected':''}>${formatHourLabel(h)}</option>`;
    }
  }
  const minSel = document.getElementById('ff-minute');
  if(minSel.options.length === 0){
    for(let m=0; m<=60; m++){
      minSel.innerHTML += `<option value="${m}" ${m===0?'selected':''}>${pad2(m)}</option>`;
    }
  }
}

let editingFutureId = null;

function openAddFutureModal(){
  editingFutureId = null;
  document.getElementById('addFutureModalTitle').textContent = 'Plan a future round';
  document.getElementById('addFutureSave').textContent = 'Save planned round';
  document.getElementById('futureFormError').style.display = 'none';
  document.getElementById('ff-course').value = '';
  document.getElementById('ff-date').value = todayISO();
  document.getElementById('ff-holes').value = 18;
  document.getElementById('ff-rating').value = '';
  document.getElementById('ff-slope').value = '';
  document.getElementById('ffExpScoreHint').style.display = 'none';
  document.getElementById('futureNewCourseBadge').style.display = 'none';
  document.getElementById('futureParInputsSection').style.display = 'none';
  futureLocationInput.reset();
  populateFutureTimeDropdowns();
  document.getElementById('ff-hour').value = 9;
  document.getElementById('ff-minute').value = 0;
  addFutureOverlay.classList.add('open');
}
document.getElementById('addFutureBtn').addEventListener('click', openAddFutureModal);

function openEditFutureModal(f){
  editingFutureId = f.id;
  document.getElementById('addFutureModalTitle').textContent = 'Edit planned round';
  document.getElementById('addFutureSave').textContent = 'Save changes';
  document.getElementById('futureFormError').style.display = 'none';
  futureLocationInput.reset();
  document.getElementById('ff-course').value = f.course;
  document.getElementById('ff-date').value = f.date;
  document.getElementById('ff-holes').value = f.holes;
  document.getElementById('ff-rating').value = f.rating;
  document.getElementById('ff-slope').value = f.slope;
  populateFutureTimeDropdowns();
  document.getElementById('ff-hour').value = (f.hour != null) ? f.hour : 9;
  document.getElementById('ff-minute').value = (f.minute != null) ? f.minute : 0;

  if(f.pars){
    document.getElementById('futureNewCourseBadge').style.display = 'none';
    document.getElementById('futureParInputsSection').style.display = 'block';
    buildFutureParInputs();
    document.querySelectorAll('.future-hole-par-box').forEach((box, i)=>{
      if(f.pars[i] != null) box.value = f.pars[i];
    });
    updateParTotalReadout('.future-hole-par-box', 'futureParTotalReadout');
  } else {
    updateFutureNewCourseUI();
  }
  updateFutureExpScoreHint();

  detailOverlay.classList.remove('open');
  addFutureOverlay.classList.add('open');
}

document.getElementById('addFutureSave').addEventListener('click', ()=>{
  const course = document.getElementById('ff-course').value.trim();
  const date = document.getElementById('ff-date').value;
  const holes = parseInt(document.getElementById('ff-holes').value, 10);
  const rating = parseFloat(document.getElementById('ff-rating').value);
  const slope = parseFloat(document.getElementById('ff-slope').value);
  const hour = parseInt(document.getElementById('ff-hour').value, 10);
  const minute = parseInt(document.getElementById('ff-minute').value, 10);

  const valid = course && date && !isNaN(rating) && !isNaN(slope);
  if(!valid){
    document.getElementById('futureFormError').style.display = 'block';
    return;
  }

  let pars = null;
  if(document.getElementById('futureParInputsSection').style.display !== 'none'){
    const parBoxes = Array.from(document.querySelectorAll('.future-hole-par-box'));
    const enteredPars = parBoxes.map(b => parseInt(b.value, 10));
    const allValid = enteredPars.length === holes && enteredPars.every(p => !isNaN(p) && p > 0);
    const allLeftAtDefault = enteredPars.every(p => p === 4);
    // If every hole is still sitting at the unchanged default of 4, treat it as if par
    // was never actually gathered -- keeps the course "new" until real par is entered,
    // either here later or when the round is actually logged.
    if(allValid && !allLeftAtDefault){
      pars = enteredPars;
    }
  }

  if(editingFutureId){
    const addedIdx = addedFutureRounds.findIndex(f => f.id === editingFutureId);
    if(addedIdx !== -1){
      addedFutureRounds[addedIdx] = { ...addedFutureRounds[addedIdx], date, course, holes, rating, slope, pars, hour, minute };
    } else {
      // It was a baked-in baseFutureRounds entry -- can't mutate the file itself from here,
      // so retire the original (marked cancelled) and save the edited version as a new
      // added entry, reusing the same id.
      if(!deletedFutureRoundIds.includes(editingFutureId)){
        deletedFutureRoundIds.push(editingFutureId);
        persistDeletedFutureRoundIds();
      }
      addedFutureRounds.push({ id: editingFutureId, date, course, holes, rating, slope, pars, hour, minute });
    }
    persistAddedFutureRounds();
    editingFutureId = null;
  } else {
    addedFutureRounds.push({
      id: 'f' + Date.now() + Math.random().toString(36).slice(2,7),
      date, course, holes, rating, slope, pars, hour, minute
    });
    persistAddedFutureRounds();
  }
  rebuildFutureRoundsArray();
  saveCourseInfoToRegistry(course, rating, slope, holes);
  const resolvedLoc = futureLocationInput.getResolved();
  if(resolvedLoc){
    COURSE_LOCATIONS[course] = {lat: resolvedLoc.lat, lon: resolvedLoc.lon, label: resolvedLoc.label};
    persistLocations();
  }
  addFutureOverlay.classList.remove('open');
  renderFutureRounds();
});

function enterScoreForFuture(f){
  detailOverlay.classList.remove('open');
  openAddModal();
  document.getElementById('addRoundTabNew').classList.add('active');
  document.getElementById('addRoundTabPast').classList.remove('active');
  document.getElementById('addRoundNewPanel').style.display = 'block';
  document.getElementById('addRoundPastPanel').style.display = 'none';
  document.getElementById('addRoundKnownFields').style.display = 'block';
  document.getElementById('scorePerHoleLabel').textContent = 'Score per hole';
  document.getElementById('f-course').value = f.course;
  document.getElementById('f-date').value = f.date;
  setHolesValue('f-holes', f.holes);
  document.getElementById('f-rating').value = f.rating;
  document.getElementById('f-slope').value = f.slope;
  updateNewCourseUI();
  buildHoleInputs();
  updateExpectedScoreHint();
}

function openFutureRoundDetail(id){
  const f = futureRounds.find(x => x.id === id);
  if(!f) return;
  const dateFmt = new Date(f.date+'T00:00:00').toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'});
  const exp = computeExpScoreFor(f.rating, f.slope, f.holes);

  document.getElementById('detailMiiRow').innerHTML = '';
  const futureLoc = COURSE_LOCATIONS[f.course];
  const fParenMatch2 = f.course.match(/^(.*)\s\(([^)]+)\)$/);
  const fDisplayTitle = fParenMatch2 ? fParenMatch2[1].trim() : f.course;
  const fParenContent2 = fParenMatch2 ? fParenMatch2[2].trim() : null;
  const fIsHoleCountSuffix2 = fParenContent2 === '9' || fParenContent2 === '18';
  const fParenSuffix2 = (fParenContent2 && !fIsHoleCountSuffix2) ? ` · ${fParenContent2}` : '';
  const futureRsLocLine = `${f.rating.toFixed(1)}/${f.slope}${futureLoc && futureLoc.label ? ` · ${futureLoc.label}` : ''}${fParenSuffix2}`;
  document.getElementById('detailTitle').innerHTML = `<span id="courseTitleText">${fDisplayTitle}</span><span class="crr-rs title-subline">${futureRsLocLine}</span>`;
  document.getElementById('detailTitle').style.marginTop = navStack.length > 0 ? '20px' : '0';

  let body = `<p class="note" style="margin:2px 0 2px;">${dateFmt}${f.hour != null ? ' · ' + formatTimeLabel(f.hour, f.minute || 0) : ''}</p>`;
  body += `<p class="note" style="margin:0 0 12px;">${f.holes} holes · Exp. Score ${exp !== null ? exp : '—'}${exp !== null ? toParTextFor(exp, parForFutureRound(f)) : ''}</p>`;
  if(typeof window.tnFutureEventHtml === 'function') body += window.tnFutureEventHtml(f);

  const atCourse = rounds.filter(r => r.course.trim().toLowerCase() === f.course.trim().toLowerCase());
  let scorecardHtml = '';
  if(atCourse.some(r => r.holeDetail)){
    scorecardHtml = buildHoleStatsHtml(atCourse);
  } else if(f.pars){
    const rows = [{label:'Par', rawFn:(h)=>f.pars[h], isPar:true}];
    scorecardHtml = `<p class="note" style="margin:16px 0 6px;">Planned par (no rounds played here yet)</p>${renderScorecardChunks(f.holes, f.pars, rows)}`;
  } else {
    scorecardHtml = `<p class="note" style="margin:16px 0 6px;">No par entered yet — you can add it when you log this round.</p>`;
  }

  // Score-outcome picker: lets you try scores from 7 under to 4 over your expected
  // score and see what differential each would produce, defaulting to the expected
  // score itself.
  let scoreSelectorHtml = '';
  if(exp !== null){
    const parForPicker = parForFutureRound(f);
    const minScore = exp - 7;
    const maxScore = exp + 4;
    const options = [];
    const currentHC = (trend && trend.length) ? trend[trend.length-1].index : null;
    for(let s = minScore; s <= maxScore; s++){
      const toParDelta = parForPicker != null ? (s - parForPicker) : null;
      const toParLabel = toParDelta == null ? '—' : (toParDelta === 0 ? 'E' : (toParDelta > 0 ? `+${toParDelta}` : `${toParDelta}`));
      const diffForScore = computeDiff(s, f.rating, f.slope, f.holes);
      const hcDelta = currentHC != null ? Math.round(diffForScore - currentHC) : null;
      const hcLabel = hcDelta == null ? '—' : (hcDelta === 0 ? 'E' : (hcDelta > 0 ? `+${hcDelta}` : `${hcDelta}`));
      options.push(`<option value="${s}"${s === exp ? ' selected' : ''}>${s} (${toParLabel}, ${hcLabel}) \u2192 ${diffForScore.toFixed(1)}</option>`);
    }
    scoreSelectorHtml = `
      <div style="margin:12px 0 16px;">
        <label style="display:block;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;color:#8a8368;margin-bottom:4px;">If I shoot...</label>
        <select id="futureScoreSelector">${options.join('')}</select>
        <p class="note" id="futureScoreDiffNote" style="margin-top:6px;"></p>
      </div>
    `;
  }
  scorecardHtml = scoreSelectorHtml + scorecardHtml;
  const canShowScoringCurve = trend && trend.length > 0 && diffResidualSD != null && !isNaN(f.rating) && !isNaN(f.slope);
  scorecardHtml = `<div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin:16px 0 10px;">
    <button class="modal-edit" id="futureCourseRecordBtn" type="button" style="margin:0;">Course Record</button>
    ${canShowScoringCurve ? `<button class="modal-edit" id="futureScoringCurveBtn" type="button" style="margin:0;">Scoring Curve</button>` : ''}
  </div>` + scorecardHtml;

  body += `<div class="view-toggle" style="display:flex;margin-top:12px;">
    <button class="view-toggle-btn active" id="futureViewWeatherBtn" type="button">Weather</button>
    <button class="view-toggle-btn" id="futureViewScorecardBtn" type="button">Scorecard</button>
  </div>`;
  body += `<div id="futureHourlyWeather"></div>`;
  body += `<div id="futureScorecardView" style="display:none;">${scorecardHtml}</div>`;

  body += `<div style="text-align:center;margin-top:14px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
    <button class="btn" id="enterScoreBtn" type="button">Enter Score</button>
    <button class="btn secondary" id="editFutureBtn" type="button">Edit</button>
    <button class="btn danger" id="cancelFutureBtn" type="button">Cancel this planned round</button>
  </div>`;

  document.getElementById('detailBody').innerHTML = body;
  detailOverlay.classList.add('open');
  fitCourseTitle();
  updateBackButton();
  attachHourlyWeatherDetail(f);

  const scoreSelectorEl = document.getElementById('futureScoreSelector');
  if(scoreSelectorEl){
    const updateDiffNote = () => {
      const selectedScore = parseInt(scoreSelectorEl.value, 10);
      const projectedDiff = computeDiff(selectedScore, f.rating, f.slope, f.holes);
      document.getElementById('futureScoreDiffNote').innerHTML = `Differential: <strong>${projectedDiff.toFixed(1)}</strong>`;
    };
    scoreSelectorEl.addEventListener('change', updateDiffNote);
    updateDiffNote();
  }

  document.getElementById('futureCourseRecordBtn').addEventListener('click', ()=>{
    navStack.push(()=>{
      openFutureRoundDetail(id);
      document.getElementById('futureViewScorecardBtn').click();
    });
    openCourseDetail(f.course);
  });
  const scoringCurveBtn = document.getElementById('futureScoringCurveBtn');
  if(scoringCurveBtn){
    scoringCurveBtn.addEventListener('click', ()=>{
      navStack.push(()=>{
        openFutureRoundDetail(id);
        document.getElementById('futureViewScorecardBtn').click();
      });
      openFutureScoringCurve(id);
    });
  }

  document.getElementById('futureViewWeatherBtn').addEventListener('click', ()=>{
    document.getElementById('futureViewWeatherBtn').classList.add('active');
    document.getElementById('futureViewScorecardBtn').classList.remove('active');
    document.getElementById('futureScorecardView').classList.remove('shown');
    document.getElementById('futureScorecardView').style.display = 'none';
    const weatherEl = document.getElementById('futureHourlyWeather');
    weatherEl.style.display = '';
    weatherEl.classList.remove('shown');
    weatherEl.classList.add('reveal-row');
    requestAnimationFrame(() => requestAnimationFrame(() => weatherEl.classList.add('shown')));
  });
  document.getElementById('futureViewScorecardBtn').addEventListener('click', ()=>{
    document.getElementById('futureViewScorecardBtn').classList.add('active');
    document.getElementById('futureViewWeatherBtn').classList.remove('active');
    document.getElementById('futureHourlyWeather').classList.remove('shown');
    document.getElementById('futureHourlyWeather').style.display = 'none';
    const scorecardEl = document.getElementById('futureScorecardView');
    scorecardEl.style.display = '';
    scorecardEl.classList.remove('shown');
    scorecardEl.classList.add('reveal-row');
    requestAnimationFrame(() => requestAnimationFrame(() => scorecardEl.classList.add('shown')));
  });

  document.getElementById('enterScoreBtn').addEventListener('click', ()=>{
    enterScoreForFuture(f);
  });

  document.getElementById('editFutureBtn').addEventListener('click', ()=>{
    openEditFutureModal(f);
  });

  const cancelBtn = document.getElementById('cancelFutureBtn');
  cancelBtn.addEventListener('click', function onCancelClick(){
    if(cancelBtn.dataset.armed === '1'){
      removeFutureRound(id);
      detailOverlay.classList.remove('open');
      renderFutureRounds();
    } else {
      cancelBtn.dataset.armed = '1';
      cancelBtn.textContent = 'Tap again to confirm cancel';
    }
  });
}

// ================= INIT =================

// ================= BETA: New Future Round (Past Course / New Course) =================
// Self-contained addition alongside the existing Add Future Round modal. Reuses shared
// utilities (persistAddedFutureRounds, rebuildFutureRoundsArray, saveCourseInfoToRegistry,
// persistLocations, renderFutureRounds, tryParseCourseCodeString, wireLocationInput,
// isKnownCourse, updateParTotalReadout) rather than duplicating their logic. Does not
// modify the existing form's behavior at all. To revert: delete this block, the
// "BETA:" HTML block, and the betaFutureBtn button next to Add Future Round.

function createBetaFutureRound({course, date, hour, minute, holes, rating, slope, pars, resolvedLoc}){
  addedFutureRounds.push({
    id: 'f' + Date.now() + Math.random().toString(36).slice(2,7),
    date, course, holes, rating, slope, pars: pars || null, hour, minute
  });
  persistAddedFutureRounds();
  rebuildFutureRoundsArray();
  saveCourseInfoToRegistry(course, rating, slope, holes);
  if(resolvedLoc){
    COURSE_LOCATIONS[course] = {lat: resolvedLoc.lat, lon: resolvedLoc.lon, label: resolvedLoc.label};
    persistLocations();
  }
  renderFutureRounds();
}

function populateHourMinuteSelects(hourId, minuteId){
  const hourSel = document.getElementById(hourId);
  if(hourSel.options.length === 0){
    for(let h=7; h<=19; h++){
      hourSel.innerHTML += `<option value="${h}" ${h===9?'selected':''}>${formatHourLabel(h)}</option>`;
    }
  }
  setupMinuteInput(minuteId);
}

// Minute is a numeric text field, not a <select> -- iOS's inputmode="numeric" brings up
// the number pad instead of the full keyboard. Strips anything non-numeric as the user
// types, auto-dismisses the keyboard once 2 digits are in (no need to keep it open for a
// 2-digit field), and clamps/pads to a valid 00-59 value on blur.
function setupMinuteInput(minuteId){
  const el = document.getElementById(minuteId);
  if(el.dataset.wired) return;
  el.dataset.wired = '1';
  el.addEventListener('input', ()=>{
    let digits = el.value.replace(/\D/g,'').slice(0,2);
    el.value = digits;
    if(digits.length === 2) el.blur();
  });
  el.addEventListener('blur', ()=>{
    let n = parseInt(el.value, 10);
    if(isNaN(n)) n = 0;
    n = Math.max(0, Math.min(59, n));
    el.value = pad2(n);
  });
}

function openBetaFutureModal(){
  populateHourMinuteSelects('beta-quick-hour', 'beta-quick-minute');
  populateHourMinuteSelects('beta-ff-hour', 'beta-ff-minute');
  document.getElementById('beta-quick-minute').value = '';
  document.getElementById('beta-ff-minute').value = '';
  document.getElementById('beta-quick-date').value = todayISO();
  document.getElementById('beta-ff-date').value = todayISO();
  document.getElementById('beta-ff-course').value = '';
  document.getElementById('beta-ff-rating').value = '';
  document.getElementById('beta-ff-slope').value = '';
  setHolesValue('beta-ff-holes', 18);
  document.getElementById('betaNewCourseBadge').style.display = 'none';
  document.getElementById('betaFutureParInputsSection').style.display = 'none';
  document.getElementById('betaFutureFormError').style.display = 'none';
  betaLocationInput.reset();

  const grid = document.getElementById('betaCourseGrid');
  const knownCourses = Object.values(courseLookup);
  const groupedCourses = groupCoursesForPicker(knownCourses);
  grid.innerHTML = groupedCourses.map(g =>
    `<button type="button" class="beta-course-btn" data-key="${g.key.replace(/"/g,'&quot;')}"
      style="flex:1 1 auto;min-width:0;max-width:calc(33.333% - 6px);background:var(--paper-tan);color:var(--ink);border:1px solid var(--line);border-radius:8px;padding:10px 6px;cursor:pointer;text-align:center;">
      <span class="beta-course-name" style="display:block;font-family:var(--font-mono);line-height:1.3;">${g.display}</span>
    </button>`
  ).join('');
  grid.querySelectorAll('.beta-course-btn').forEach(btn=>{
    const g = groupedCourses.find(x => x.key === btn.dataset.key);
    btn.addEventListener('click', ()=>{
      betaCameFromSaved = false;
      if(g.variants.solo){
        betaCameFromHolePick = false;
        showBetaDatePrompt(g.variants.solo.name, g.variants.solo);
      } else {
        showBetaHolePick(g);
      }
    });
  });
  fitCourseButtonText(grid);

  renderBetaSavedNewCourses();
  document.getElementById('betaSavedCoursesView').style.display = 'none';
  document.getElementById('betaPickGridView').style.display = 'block';
  document.getElementById('betaPickDateView').style.display = 'none';
  document.getElementById('betaPanelPick').style.display = 'block';
  document.getElementById('betaPanelNew').style.display = 'none';
  document.getElementById('betaTabPick').classList.add('active');
  document.getElementById('betaTabNew').classList.remove('active');

  document.getElementById('betaFutureOverlay').classList.add('open');
}

let betaSelectedCourse = null;
let betaSelectedCourseInfo = null;
// Detects "Base Name (9)" + "Base Name (18)" pairs -- when BOTH exist, consolidates them
// into one picker entry so the same physical course doesn't show as two near-duplicate
// buttons. A course with only ONE of the two suffixes (no real pair) is left as-is,
// showing its full name including the suffix.
// Detects "Base Name (X)" + "Base Name (Y)" + ... -- ANY set of courses sharing an
// identical base name before a parenthetical, regardless of what's inside it. When 2 or
// more variants share a base, consolidates them into one picker entry; the exact
// parenthetical text becomes the option label on the follow-up screen. A course with
// only ONE variant (no sibling to pair with) is left standalone, full name intact.
// Abbreviates a stored "City, Full State Name" location down to "City, ST" for compact
// button subtext -- the app stores full state names everywhere else deliberately, this
// is purely a display-width concession for a small card.
const US_STATE_ABBR = {'Alabama':'AL','Alaska':'AK','Arizona':'AZ','Arkansas':'AR','California':'CA','Colorado':'CO','Connecticut':'CT','Delaware':'DE','Florida':'FL','Georgia':'GA','Hawaii':'HI','Idaho':'ID','Illinois':'IL','Indiana':'IN','Iowa':'IA','Kansas':'KS','Kentucky':'KY','Louisiana':'LA','Maine':'ME','Maryland':'MD','Massachusetts':'MA','Michigan':'MI','Minnesota':'MN','Mississippi':'MS','Missouri':'MO','Montana':'MT','Nebraska':'NE','Nevada':'NV','New Hampshire':'NH','New Jersey':'NJ','New Mexico':'NM','New York':'NY','North Carolina':'NC','North Dakota':'ND','Ohio':'OH','Oklahoma':'OK','Oregon':'OR','Pennsylvania':'PA','Rhode Island':'RI','South Carolina':'SC','South Dakota':'SD','Tennessee':'TN','Texas':'TX','Utah':'UT','Vermont':'VT','Virginia':'VA','Washington':'WA','West Virginia':'WV','Wisconsin':'WI','Wyoming':'WY','District of Columbia':'DC'};
function abbreviateLocation(label){
  if(!label) return '';
  const parts = label.split(',').map(s=>s.trim());
  if(parts.length < 2) return label;
  const city = parts[0];
  const state = parts[parts.length-1];
  const abbr = US_STATE_ABBR[state];
  return abbr ? `${city}, ${abbr}` : label;
}

function groupCoursesForPicker(entries){
  const byBase = {};
  entries.forEach(e => {
    const m = e.name.match(/^(.*)\s\(([^)]+)\)$/);
    if(m){
      const base = m[1].trim();
      const suffix = m[2].trim();
      if(!byBase[base]) byBase[base] = {};
      byBase[base][suffix] = e;
    }
  });
  const consolidatedNames = new Set();
  const grouped = [];
  Object.entries(byBase).forEach(([base, variants]) => {
    const suffixKeys = Object.keys(variants);
    if(suffixKeys.length > 1){
      grouped.push({display: base, variants, key: base});
      suffixKeys.forEach(s => consolidatedNames.add(variants[s].name));
    }
  });
  // Second pass: a 9-hole and an 18-hole course that start with the same name, even without
  // matching "(9)"/"(18)" suffixes (e.g. "Needwood Executive" and "Needwood Golf Course (18)"),
  // become one button with tabs labeled by what differs: "Executive 9" and "18".
  {
    const strip = n => { const m = n.match(/^(.*)\s\(([^)]+)\)$/); return (m ? m[1] : n).trim(); };
    const GENERIC = ['golf','course','club','links','gc','the','cc','country'];
    const byFirst = {};
    entries.forEach(e => {
      if(consolidatedNames.has(e.name) || (e.holes !== 9 && e.holes !== 18)) return;
      const first = strip(e.name).split(/\s+/)[0].toLowerCase();
      (byFirst[first] = byFirst[first] || []).push(e);
    });
    Object.values(byFirst).forEach(list => {
      if(list.length < 2 || !list.some(e=>e.holes===9) || !list.some(e=>e.holes===18)) return;
      const words = list.map(e => strip(e.name).split(/\s+/));
      let k = 0; while(words.every(w => w[k] && w[k].toLowerCase() === words[0][k].toLowerCase())) k++;
      const display = words[0].slice(0, k).join(' ');
      const variants = {};
      list.forEach((e, i) => {
        const extra = words[i].slice(k).filter(w => !GENERIC.includes(w.toLowerCase())).join(' ');
        // \u2060 (invisible) keeps a bare "18" from being treated as a numeric key, which would jump it to the front
        let label = (extra ? extra + ' ' : '') + e.holes + (extra ? '' : '\u2060');
        while(variants[label]) label += '′';
        variants[label] = e;
        consolidatedNames.add(e.name);
      });
      const ordered = {}; Object.keys(variants).sort((a,b)=>variants[a].holes - variants[b].holes).forEach(l => ordered[l] = variants[l]);
      grouped.push({display, variants: ordered, key: 'grp:' + display});
    });
  }
  entries.forEach(e => {
    if(!consolidatedNames.has(e.name)){
      // Solo (non-grouped) courses still had their raw name, parens and all -- strip any
      // trailing parenthetical from the display text here too, same as everywhere else
      // this pattern applies. The underlying e.name (used for actual selection) stays
      // untouched.
      const soloMatch = e.name.match(/^(.*)\s\(([^)]+)\)$/);
      const soloDisplay = soloMatch ? soloMatch[1].trim() : e.name;
      grouped.push({display: soloDisplay, variants: {solo: e}, key: e.name});
    }
  });
  return grouped.sort((a,b)=>a.display.localeCompare(b.display));
}

// Shrinks font-size on any course button whose name genuinely wraps past 2 lines --
// measures actual rendered height rather than guessing from character count, since real
// text wrapping depends on glyph widths, not just string length.
function fitCourseButtonText(containerEl){
  containerEl.querySelectorAll('.beta-course-btn, .beta-saved-course-btn').forEach(btn=>{
    const nameSpan = btn.querySelector('.beta-course-name') || btn;
    let size = 12;
    nameSpan.style.fontSize = size + 'px';
    const lineHeight = size * 1.3;
    const maxTwoLineHeight = lineHeight * 2 + 2;
    let guard = 0;
    while(nameSpan.scrollHeight > maxTwoLineHeight && size > 9 && guard < 6){
      size -= 0.5;
      nameSpan.style.fontSize = size + 'px';
      guard++;
    }
  });
}

function renderBetaSavedNewCourses(){
  const grid = document.getElementById('betaSavedCourseGrid');
  const entries = Object.values(savedNewCourses)
    .filter(c => courseLookup[c.name.trim().toLowerCase()] == null)
    .filter(c => !deletedSavedCourseKeys.includes(c.name.trim().toLowerCase()));
  const grouped = groupCoursesForPicker(entries);
  document.getElementById('betaSavedEmptyNote').style.display = grouped.length === 0 ? 'block' : 'none';
  grid.innerHTML = grouped.map(g => {
    const rep = g.variants.solo || Object.values(g.variants)[0];
    const loc = COURSE_LOCATIONS[rep.name];
    const locLine = loc && loc.label ? abbreviateLocation(loc.label) : '';
    const rsLine = `${rep.rating.toFixed(1)}/${rep.slope}`;
    const subLine = [locLine, rsLine].filter(Boolean).join('<br>');
    return `<button type="button" class="beta-saved-course-btn" data-key="${g.key.replace(/"/g,'&quot;')}"
      style="flex:1 1 auto;min-width:0;max-width:calc(33.333% - 6px);background:var(--paper-tan);color:var(--ink);border:1px solid var(--line);border-radius:8px;padding:10px 6px;cursor:pointer;text-align:center;">
      <span class="beta-course-name" style="display:block;font-family:var(--font-mono);line-height:1.3;">${g.display}</span>
      <span style="display:block;font-size:10px;color:#8a8368;margin-top:3px;line-height:1.4;">${subLine}</span>
    </button>`;
  }).join('');
  grid.querySelectorAll('.beta-saved-course-btn').forEach(btn=>{
    const g = grouped.find(x => x.key === btn.dataset.key);
    btn.addEventListener('click', ()=> showBetaSavedConfirm(g));
  });
  fitCourseButtonText(grid);
}

let betaSavedConfirmGroup = null;
function showBetaSavedConfirm(g){
  betaSavedConfirmGroup = g;
  const rep = g.variants.solo || Object.values(g.variants)[0];
  const loc = COURSE_LOCATIONS[rep.name];
  const rsLocLine = `${rep.rating.toFixed(1)}/${rep.slope}${loc && loc.label ? ` · ${loc.label}` : ''}`;
  const exp = computeExpScoreFor(rep.rating, rep.slope, rep.holes);
  const expStrip = `<div style="display:flex;border:1px solid var(--line);border-radius:10px;overflow:hidden;margin:14px 0;">
    <div style="flex:1;text-align:center;padding:12px 6px;"><div style="font-size:20px;font-weight:700;color:var(--fairway);">${rep.holes}</div><div style="font-size:10px;color:#8a8368;margin-top:2px;">Holes</div></div>
    <div style="flex:1;text-align:center;padding:12px 6px;border-left:1px solid var(--line);"><div style="font-size:20px;font-weight:700;color:var(--fairway);">${rep.slope}</div><div style="font-size:10px;color:#8a8368;margin-top:2px;">Slope</div></div>
    <div style="flex:1;text-align:center;padding:12px 6px;border-left:1px solid var(--line);"><div style="font-size:20px;font-weight:700;color:var(--fairway);">${exp !== null ? exp : '—'}</div><div style="font-size:10px;color:#8a8368;margin-top:2px;">Exp. Score</div></div>
  </div>`;
  document.getElementById('betaSavedConfirmLabel').innerHTML =
    `${g.display}<span class="crr-rs title-subline">${rsLocLine}</span>`;
  document.getElementById('betaSavedConfirmExpLine').innerHTML = expStrip;
  // Only the solo (single, unambiguous variant) case can collect date/hour/minute here
  // and schedule directly -- a multi-variant group still needs its own step first to
  // determine which (9)/(18) variant applies, since that decides holes/rating/slope.
  const showInlineSchedule = !!g.variants.solo;
  document.getElementById('betaSavedConfirmFormGrid').style.display = showInlineSchedule ? 'grid' : 'none';
  if(showInlineSchedule){
    populateHourMinuteSelects('beta-saved-confirm-hour', 'beta-saved-confirm-minute');
    document.getElementById('beta-saved-confirm-date').value = todayISO();
    document.getElementById('beta-saved-confirm-minute').value = '';
  }
  document.getElementById('betaSavedCoursesView').style.display = 'none';
  document.getElementById('betaSavedConfirmView').style.display = 'block';
}
document.getElementById('betaBackFromSavedConfirm').addEventListener('click', ()=>{
  document.getElementById('betaSavedConfirmView').style.display = 'none';
  document.getElementById('betaSavedCoursesView').style.display = 'block';
});
document.getElementById('betaSavedConfirmSchedule').addEventListener('click', ()=>{
  const g = betaSavedConfirmGroup;
  if(g.variants.solo){
    // Solo variant: we already know holes/rating/slope, and date/hour/minute are right
    // here on this same screen now -- schedule directly rather than navigating to a
    // separate date-picking screen for what's already fully specified.
    const info = g.variants.solo;
    const date = document.getElementById('beta-saved-confirm-date').value;
    const hour = parseInt(document.getElementById('beta-saved-confirm-hour').value, 10);
    let minute = parseInt(document.getElementById('beta-saved-confirm-minute').value, 10);
    if(isNaN(minute)) minute = 0;
    if(!date) return;
    createBetaFutureRound({
      course: info.name, date, hour, minute,
      holes: info.holes, rating: info.rating, slope: info.slope,
      pars: null, resolvedLoc: null
    });
    document.getElementById('betaSavedConfirmView').style.display = 'none';
    document.getElementById('betaFutureOverlay').classList.remove('open');
  } else {
    document.getElementById('betaSavedConfirmView').style.display = 'none';
    betaCameFromSaved = true;
    showBetaHolePick(g);
  }
});
document.getElementById('betaSavedConfirmDelete').addEventListener('click', ()=>{
  const g = betaSavedConfirmGroup;
  const namesToDelete = g.variants.solo ? [g.variants.solo.name] : Object.values(g.variants).map(v=>v.name);
  namesToDelete.forEach(name => {
    const key = name.trim().toLowerCase();
    if(!deletedSavedCourseKeys.includes(key)) deletedSavedCourseKeys.push(key);
  });
  persistDeletedSavedCourseKeys();
  document.getElementById('betaSavedConfirmView').style.display = 'none';
  document.getElementById('betaSavedCoursesView').style.display = 'block';
  renderBetaSavedNewCourses();
});
document.getElementById('betaShowSavedBtn').addEventListener('click', ()=>{
  renderBetaSavedNewCourses();
  document.getElementById('betaPanelNew').style.display = 'none';
  document.getElementById('betaPanelPick').style.display = 'block';
  document.getElementById('betaPickGridView').style.display = 'none';
  document.getElementById('betaSavedCoursesView').style.display = 'block';
});
document.getElementById('betaBackFromSaved').addEventListener('click', ()=>{
  document.getElementById('betaSavedCoursesView').style.display = 'none';
  document.getElementById('betaPanelPick').style.display = 'none';
  document.getElementById('betaPanelNew').style.display = 'block';
});

let betaHolePickGroup = null;
function showBetaHolePick(g){
  betaHolePickGroup = g;
  document.getElementById('betaHolePickLabel').textContent = g.display;
  const toggle = document.getElementById('betaHolePickToggle');
  const suffixes = Object.keys(g.variants);
  toggle.innerHTML = suffixes.map((s) =>
    `<button type="button" class="view-toggle-btn" data-suffix="${s.replace(/"/g,'&quot;')}">${s}</button>`
  ).join('');
  toggle.querySelectorAll('button').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const v = g.variants[btn.dataset.suffix];
      document.getElementById('betaHolePickView').style.display = 'none';
      betaCameFromHolePick = true;
      showBetaDatePrompt(v.name, v);
    });
  });
  document.getElementById('betaPickGridView').style.display = 'none';
  document.getElementById('betaSavedCoursesView').style.display = 'none';
  document.getElementById('betaHolePickView').style.display = 'block';
}
document.getElementById('betaBackFromHolePick').addEventListener('click', ()=>{
  document.getElementById('betaHolePickView').style.display = 'none';
  if(betaCameFromSaved){
    document.getElementById('betaSavedCoursesView').style.display = 'block';
  } else {
    document.getElementById('betaPickGridView').style.display = 'block';
  }
});

function showBetaDatePrompt(courseName, info){
  betaSelectedCourse = courseName;
  betaSelectedCourseInfo = info;
  const loc = COURSE_LOCATIONS[courseName];
  const rsLocLine = `${info.rating.toFixed(1)}/${info.slope}${loc && loc.label ? ` · ${loc.label}` : ''}`;
  const exp = computeExpScoreFor(info.rating, info.slope, info.holes);
  const par = parForFutureRound({course: courseName, holes: info.holes});
  const expLine = exp !== null
    ? `<span class="crr-rs title-subline">Expected Score: ${exp}${toParTextFor(exp, par)}</span>`
    : '';
  const atCourse = rounds.filter(r => r.course.trim().toLowerCase() === courseName.trim().toLowerCase());
  const bestScoreLine = atCourse.length > 0
    ? `<span class="crr-rs title-subline">Best Score: ${Math.min(...atCourse.map(scoreOf))}${toParTextFor(Math.min(...atCourse.map(scoreOf)), par)}</span>`
    : '';
  document.getElementById('betaSelectedCourseLabel').innerHTML =
    `${courseName}<span class="crr-rs title-subline">${rsLocLine}</span>${expLine}${bestScoreLine}`;
  document.getElementById('betaPickGridView').style.display = 'none';
  document.getElementById('betaPickDateView').style.display = 'block';
}
let betaCameFromSaved = false;
let betaCameFromHolePick = false;
document.getElementById('betaBackToGrid').addEventListener('click', ()=>{
  document.getElementById('betaPickDateView').style.display = 'none';
  if(betaCameFromHolePick){
    document.getElementById('betaHolePickView').style.display = 'block';
  } else if(betaCameFromSaved){
    document.getElementById('betaSavedCoursesView').style.display = 'block';
  } else {
    document.getElementById('betaPickGridView').style.display = 'block';
  }
});

document.getElementById('betaFutureBtn').addEventListener('click', openBetaFutureModal);
document.getElementById('betaFutureClose').addEventListener('click', ()=> document.getElementById('betaFutureOverlay').classList.remove('open'));
document.getElementById('betaQuickCancel').addEventListener('click', ()=> document.getElementById('betaFutureOverlay').classList.remove('open'));
document.getElementById('betaNewCancel').addEventListener('click', ()=> document.getElementById('betaFutureOverlay').classList.remove('open'));

document.getElementById('betaTabPick').addEventListener('click', ()=>{
  document.getElementById('betaTabPick').classList.add('active');
  document.getElementById('betaTabNew').classList.remove('active');
  document.getElementById('betaPanelPick').style.display = 'block';
  document.getElementById('betaPanelNew').style.display = 'none';
});
document.getElementById('betaTabNew').addEventListener('click', ()=>{
  document.getElementById('betaTabNew').classList.add('active');
  document.getElementById('betaTabPick').classList.remove('active');
  document.getElementById('betaPanelNew').style.display = 'block';
  document.getElementById('betaPanelPick').style.display = 'none';
});

document.getElementById('betaQuickSave').addEventListener('click', ()=>{
  const info = betaSelectedCourseInfo;
  if(!info) return;
  const date = document.getElementById('beta-quick-date').value;
  const hour = parseInt(document.getElementById('beta-quick-hour').value, 10);
  let minute = parseInt(document.getElementById('beta-quick-minute').value, 10);
  if(isNaN(minute)) minute = 0;
  if(!date) return;
  createBetaFutureRound({
    course: betaSelectedCourse, date, hour, minute,
    holes: info.holes, rating: info.rating, slope: info.slope,
    pars: null, resolvedLoc: null
  });
  document.getElementById('betaFutureOverlay').classList.remove('open');
});

function buildBetaFutureParInputs(){
  const holes = parseInt(document.getElementById('beta-ff-holes').value, 10);
  const parRow = document.getElementById('betaFutureParInputsRow');
  parRow.innerHTML = '';
  for(let h=1; h<=holes; h++){
    const opts = [3,4,5,6].map(n => `<option value="${n}" ${n===4?'selected':''}>${n}</option>`).join('');
    parRow.innerHTML += `<div class="hole-box"><div class="hnum">${h}</div><select class="beta-future-hole-par-box" data-hole="${h}">${opts}</select></div>`;
  }
  document.querySelectorAll('.beta-future-hole-par-box').forEach(el=>{
    el.addEventListener('input', ()=>updateParTotalReadout('.beta-future-hole-par-box', 'betaFutureParTotalReadout'));
  });
  updateParTotalReadout('.beta-future-hole-par-box', 'betaFutureParTotalReadout');
}
function updateBetaNewCourseUI(){
  const typed = document.getElementById('beta-ff-course').value.trim();
  const isNew = typed.length > 0 && !isKnownCourse(typed);
  const wasVisible = document.getElementById('betaFutureParInputsSection').style.display !== 'none';
  document.getElementById('betaNewCourseBadge').style.display = isNew ? 'block' : 'none';
  document.getElementById('betaFutureParInputsSection').style.display = isNew ? 'block' : 'none';
  if(isNew && (!wasVisible || document.getElementById('betaFutureParInputsRow').innerHTML === '')){
    buildBetaFutureParInputs();
  }
}

const betaLocationInput = wireLocationInput('beta-ff-location', 'beta-ff-location-preview');

document.getElementById('beta-ff-course').addEventListener('input', (e)=>{
  const typed = e.target.value.trim();

  const parsed = tryParseCourseCodeString(typed);
  if(parsed){
    document.getElementById('beta-ff-course').value = parsed.name;
    setHolesValue('beta-ff-holes', parsed.pars.length);
    document.getElementById('beta-ff-rating').value = parsed.rating;
    document.getElementById('beta-ff-slope').value = parsed.slope;
    document.getElementById('betaNewCourseBadge').style.display = 'block';
    document.getElementById('betaFutureParInputsSection').style.display = 'block';
    buildBetaFutureParInputs();
    const parBoxes = Array.from(document.querySelectorAll('.beta-future-hole-par-box'));
    parBoxes.forEach((box, i) => { if(parsed.pars[i] != null) box.value = parsed.pars[i]; });
    updateParTotalReadout('.beta-future-hole-par-box', 'betaFutureParTotalReadout');
    document.getElementById('beta-ff-location').value = parsed.location;
    document.getElementById('beta-ff-location').dispatchEvent(new Event('blur'));
    return;
  }

  const match = lookupCourseInfo(typed);
  if(match){
    document.getElementById('beta-ff-rating').value = match.rating;
    document.getElementById('beta-ff-slope').value = match.slope;
    setHolesValue('beta-ff-holes', match.holes);
  }
  updateBetaNewCourseUI();
});
document.getElementById('betaNewSave').addEventListener('click', ()=>{
  const course = document.getElementById('beta-ff-course').value.trim();
  const date = document.getElementById('beta-ff-date').value;
  const holes = parseInt(document.getElementById('beta-ff-holes').value, 10);
  const rating = parseFloat(document.getElementById('beta-ff-rating').value);
  const slope = parseFloat(document.getElementById('beta-ff-slope').value);
  const hour = parseInt(document.getElementById('beta-ff-hour').value, 10);
  let minute = parseInt(document.getElementById('beta-ff-minute').value, 10);
  if(isNaN(minute)) minute = 0;

  const valid = course && date && !isNaN(rating) && !isNaN(slope);
  if(!valid){
    document.getElementById('betaFutureFormError').style.display = 'block';
    return;
  }

  let pars = null;
  if(document.getElementById('betaFutureParInputsSection').style.display !== 'none'){
    const parBoxes = Array.from(document.querySelectorAll('.beta-future-hole-par-box'));
    const enteredPars = parBoxes.map(b => parseInt(b.value, 10));
    const allValid = enteredPars.length === holes && enteredPars.every(p => !isNaN(p) && p > 0);
    const allLeftAtDefault = enteredPars.every(p => p === 4);
    if(allValid && !allLeftAtDefault){
      pars = enteredPars;
    }
  }

  createBetaFutureRound({
    course, date, hour, minute, holes, rating, slope, pars,
    resolvedLoc: betaLocationInput.getResolved()
  });
  // Remember this course was ever set up, independent of whether this specific future
  // round survives -- so it stays available to pick from again even after the round
  // itself gets deleted.
  savedNewCourses[course.trim().toLowerCase()] = {name: course, rating, slope, holes};
  persistSavedNewCourses();
  document.getElementById('betaFutureOverlay').classList.remove('open');
});
// ================= END BETA =================

loadPersisted();
