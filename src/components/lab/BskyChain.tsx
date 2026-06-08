import { useState, useRef, useEffect } from "react";

const API = "https://public.api.bsky.app/xrpc";
const JETSTREAM = "wss://jetstream2.us-east.bsky.network/subscribe";
const MAX_FOLLOWS = 10_000;
const MIN_FOLLOWS = 40;
const MAX_SHADOWS = 8;
const STUCK_MS = 90_000;

// --- types ---

interface Branch { verb: string; actorHandle: string; url: string }

interface NodeData {
  id: number;
  actor: string;
  viaText: string | null;
  likedUri: string | null;
  inSeedGraph: boolean;
  timestamp: string;
  branches: Branch[];
  stuck: boolean;
}

interface Stats {
  hops: number;
  processed: { like: number; repost: number; post: number; follow: number };
  triggered: number;
  branches: number;
  skipped: number;
  seen: number;
}

type StatusAction = null | "reconnect" | "hop-random";

const EMPTY_STATS: Stats = {
  hops: 0, processed: { like: 0, repost: 0, post: 0, follow: 0 },
  triggered: 0, branches: 0, skipped: 0, seen: 0,
};

// --- pure helpers ---

async function xrpc(method: string, params: Record<string, unknown> = {}) {
  const url = new URL(`${API}/${method}`);
  for (const [k, v] of Object.entries(params)) if (v != null) url.searchParams.set(k, String(v));
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${r.status}`);
  return r.json();
}

function didFromUri(uri: string) {
  return uri?.match(/^at:\/\/(did:[^/]+)\//)?.[1] ?? null;
}

function postUrl(uri: string) {
  return uri?.replace(
    /^at:\/\/(did:[^/]+)\/app\.bsky\.feed\.post\/(.+)$/,
    "https://bsky.app/profile/$1/post/$2"
  ) ?? "#";
}

async function fetchFollows(actor: string): Promise<Record<string, string>> {
  const out: Record<string, string> = {};
  let cursor: string | undefined;
  do {
    const r = await xrpc("app.bsky.graph.getFollows", { actor, limit: 100, cursor });
    for (const f of r.follows) out[f.did] = f.handle;
    cursor = r.cursor;
  } while (cursor && Object.keys(out).length < MAX_FOLLOWS);
  return out;
}

function fmtElapsed(ms: number) {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

// --- sub-components ---

function Quote({ record }: { record: Record<string, unknown> }) {
  const inner = (record.value ?? record.record) as Record<string, unknown> | undefined;
  const author = record.author as { handle: string } | undefined;
  if (!inner?.text && !author) return null;
  return (
    <div className="post-quote">
      {author && <div className="post-quote-handle">@{author.handle}</div>}
      {typeof inner?.text === "string" && <div className="post-quote-text">{inner.text}</div>}
    </div>
  );
}

function Embed({ embed }: { embed: Record<string, unknown> }) {
  const t = embed.$type as string;
  if (t === "app.bsky.embed.images#view") {
    const imgs = embed.images as Array<{ thumb: string; alt?: string }> | undefined;
    if (!imgs?.length) return null;
    return (
      <div className="post-images">
        {imgs.map((img, i) => <img key={i} src={img.thumb} alt={img.alt ?? ""} />)}
      </div>
    );
  }
  if (t === "app.bsky.embed.external#view") {
    const ext = embed.external as Record<string, string> | undefined;
    if (!ext) return null;
    return (
      <div className="post-external">
        {ext.thumb && <img className="post-external-thumb" src={ext.thumb} alt="" />}
        {ext.title && <div className="post-external-title">{ext.title}</div>}
        <div className="post-external-url">{ext.uri}</div>
      </div>
    );
  }
  if (t === "app.bsky.embed.record#view") {
    const r = embed.record as Record<string, unknown> | undefined;
    return r ? <Quote record={r} /> : null;
  }
  if (t === "app.bsky.embed.recordWithMedia#view") {
    const media = embed.media as Record<string, unknown> | undefined;
    const rec = (embed.record as Record<string, unknown> | undefined)?.record as Record<string, unknown> | undefined;
    return <>{media && <Embed embed={media} />}{rec && <Quote record={rec} />}</>;
  }
  return null;
}

function PostPanel({ post, uri }: { post: Record<string, unknown> | null; uri: string | null }) {
  if (!post) return <p className="post-empty">—</p>;
  const author = post.author as Record<string, string> | undefined;
  const text = (post.record as Record<string, string> | undefined)?.text?.trim();
  const embed = post.embed as Record<string, unknown> | undefined;
  return (
    <>
      <div className="post-author">
        {author?.avatar
          ? <img className="post-avatar" src={author.avatar} alt="" />
          : <div className="post-avatar-placeholder" />}
        <div className="post-author-meta">
          <span className="post-display-name">{author?.displayName || author?.handle || ""}</span>
          <span className="post-handle">@{author?.handle || ""}</span>
        </div>
      </div>
      {text && <div className="post-text">{text}</div>}
      {embed && <Embed embed={embed} />}
      {uri && (
        <a className="post-link" href={postUrl(uri)} target="_blank" rel="noopener">
          view on bsky.app ↗
        </a>
      )}
    </>
  );
}

function ChainNodeEl({ node, isCurrent }: { node: NodeData; isCurrent: boolean }) {
  const cls = [
    "node",
    isCurrent && "current",
    node.inSeedGraph && "in-seed-graph",
    node.stuck && "stuck",
  ].filter(Boolean).join(" ");
  return (
    <div className={cls}>
      <div className="node-info">
        <div className="node-handle">
          <a href={`https://bsky.app/profile/${encodeURIComponent(node.actor)}`} target="_blank" rel="noopener">
            @{node.actor}
          </a>
        </div>
        {node.viaText && (
          <div className="node-via">
            {node.viaText}
            {node.likedUri && (
              <> · <a href={postUrl(node.likedUri)} target="_blank" rel="noopener">↗</a></>
            )}
          </div>
        )}
        <div className="node-meta">{node.timestamp}</div>
        {node.branches.length > 0 && (
          <div className="node-branches">
            {node.branches.map((b, i) => (
              <div key={i} className="branch-item">
                {b.verb} @{b.actorHandle} · <a href={b.url} target="_blank" rel="noopener">↗</a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// --- main component ---

export default function BskyChain() {
  const [inputVal, setInputVal] = useState("");
  const [placeholder, setPlaceholder] = useState("seed handle");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [running, setRunning] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [statusAction, setStatusAction] = useState<StatusAction>(null);
  const [depth, setDepth] = useState(0);
  const [elapsed, setElapsed] = useState<number | null>(null);
  const [chain, setChain] = useState<NodeData[]>([]);
  const [currentPost, setCurrentPost] = useState<{ post: Record<string, unknown>; uri: string | null } | null>(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);
  const [statsSnap, setStatsSnap] = useState<Stats>(EMPTY_STATS);

  // mutable game state — safe to read inside WS callbacks
  const ws = useRef<WebSocket | null>(null);
  const profiles = useRef<Record<string, string>>({});
  const seedFollowDids = useRef(new Set<string>());
  const runningRef = useRef(false);
  const hopping = useRef(false);
  const shadowCount = useRef(0);
  const currentActor = useRef<string | null>(null);
  const nodeTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const nodeStart = useRef<number | null>(null);
  const depthRef = useRef(0);
  const nodeIdRef = useRef(0);
  const statsRef = useRef<Stats>({ ...EMPTY_STATS, processed: { ...EMPTY_STATS.processed } });
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  // hop is async and called from WS callbacks — keep a ref so callbacks always
  // invoke the latest version even after re-renders
  const hopRef = useRef<(
    actor: string, viaText: string | null, likedUri: string | null,
    post: Record<string, unknown> | null, inSeedGraph?: boolean
  ) => Promise<void>>(null!);

  useEffect(() => {
    const close = () => { setInfoOpen(false); setStatsOpen(false); };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  // --- helpers ---

  function setStatus(msg: string, action: StatusAction = null) {
    setStatusMsg(msg);
    setStatusAction(action);
  }

  // --- typeahead ---

  async function fetchSuggestions(q: string) {
    try {
      const { actors } = await xrpc("app.bsky.actor.searchActorsTypeahead", { q, limit: 6 });
      setSuggestions(actors.length ? actors.map((a: { handle: string }) => a.handle) : []);
      setActiveIdx(-1);
    } catch { setSuggestions([]); }
  }

  function hideSuggestions() { setSuggestions([]); setActiveIdx(-1); }

  function onInput(val: string) {
    setInputVal(val);
    if (debounce.current) clearTimeout(debounce.current);
    const q = val.trim().replace(/^@/, "");
    if (q.length < 2) { hideSuggestions(); return; }
    debounce.current = setTimeout(() => fetchSuggestions(q), 200);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, suggestions.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, -1)); }
    else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIdx >= 0 && suggestions[activeIdx]) { start(suggestions[activeIdx]); hideSuggestions(); }
      else start(inputVal.trim().replace(/^@/, ""));
    } else if (e.key === "Escape") hideSuggestions();
  }

  // --- stop / start ---

  function stop() {
    runningRef.current = false;
    hopping.current = false;
    if (ws.current) { ws.current.close(); ws.current = null; }
    profiles.current = {};
    seedFollowDids.current = new Set();
    shadowCount.current = 0;
    currentActor.current = null;
    if (nodeTimer.current) { clearInterval(nodeTimer.current); nodeTimer.current = null; }
    depthRef.current = 0;
    setRunning(false);
    setPlaceholder("seed handle");
    setElapsed(null);
    setStatus("");
  }

  async function start(actor: string) {
    hideSuggestions();
    stop();
    currentActor.current = actor;
    setInputVal("");
    setPlaceholder(actor);
    setChain([]);
    setCurrentPost(null);
    setDepth(0);
    setElapsed(null);
    statsRef.current = { ...EMPTY_STATS, processed: { ...EMPTY_STATS.processed } };
    runningRef.current = true;
    setRunning(true);

    let seedPost: Record<string, unknown> | null = null;
    try {
      const feed = await xrpc("app.bsky.feed.getAuthorFeed", { actor, filter: "posts_no_replies", limit: 1 });
      seedPost = feed.feed?.[0]?.post ?? null;
    } catch {}

    await hopRef.current(actor, null, null, seedPost);
  }

  function clearAll() {
    stop();
    setChain([]);
    setCurrentPost(null);
    setDepth(0);
    setStatus("");
  }

  // --- hop ---

  async function hop(
    actor: string,
    viaText: string | null,
    likedUri: string | null,
    post: Record<string, unknown> | null,
    inSeedGraph = false
  ) {
    if (!runningRef.current) return;
    hopping.current = true;
    shadowCount.current = 0;

    if (viaText) statsRef.current.hops++;

    depthRef.current++;
    setDepth(depthRef.current);

    const id = ++nodeIdRef.current;
    const timestamp = new Date().toISOString().slice(11, 19) + " UTC";
    const newNode: NodeData = { id, actor, viaText, likedUri, inSeedGraph, timestamp, branches: [], stuck: false };

    setChain(prev => [newNode, ...prev]);
    if (post) setCurrentPost({ post, uri: likedUri });

    if (nodeTimer.current) clearInterval(nodeTimer.current);
    nodeStart.current = Date.now();
    const thisId = id;
    nodeTimer.current = setInterval(() => {
      const el = Date.now() - (nodeStart.current ?? Date.now());
      setElapsed(el);
      if (el >= STUCK_MS) {
        setChain(prev => {
          if (!prev.length || prev[0].id !== thisId || prev[0].stuck) return prev;
          return [{ ...prev[0], stuck: true }, ...prev.slice(1)];
        });
        setStatus("quiet here", "hop-random");
      }
    }, 1000);

    setStatus(`fetching follows for @${actor}…`);
    try {
      profiles.current = await fetchFollows(actor);
      if (seedFollowDids.current.size === 0) {
        seedFollowDids.current = new Set(Object.keys(profiles.current));
      }
    } catch {
      setStatus(`could not fetch follows for @${actor}`);
      runningRef.current = false;
      setRunning(false);
      return;
    }

    const count = Object.keys(profiles.current).length;
    if (count === 0) {
      setStatus(`@${actor} has no follows — chain ends`);
      runningRef.current = false;
      setRunning(false);
      return;
    }

    if (!runningRef.current) return;
    connectJetstream(actor, count);
  }
  hopRef.current = hop;

  // --- jetstream ---

  function connectJetstream(actor: string, count: number) {
    if (ws.current) { ws.current.close(); ws.current = null; }
    const url = new URL(JETSTREAM);
    for (const col of ["app.bsky.feed.like", "app.bsky.feed.repost", "app.bsky.feed.post", "app.bsky.graph.follow"]) {
      url.searchParams.append("wantedCollections", col);
    }
    const socket = new WebSocket(url);
    ws.current = socket;

    socket.addEventListener("open", () => {
      if (!runningRef.current) { socket.close(); return; }
      hopping.current = false;
      setStatus(`watching @${actor}'s ${count} follows`);
    });

    socket.addEventListener("close", e => {
      if (!runningRef.current) return;
      setStatus(`disconnected (${e.code})`, "reconnect");
    });

    socket.addEventListener("message", async e => {
      if (!runningRef.current) return;
      try {
        const evt = JSON.parse(e.data);
        if (evt.kind !== "commit" || evt.commit?.operation !== "create") return;
        statsRef.current.seen++;
        if (!profiles.current[evt.did]) return;

        const col: string = evt.commit.collection;
        if (col === "app.bsky.feed.like") statsRef.current.processed.like++;
        else if (col === "app.bsky.feed.repost") statsRef.current.processed.repost++;
        else if (col === "app.bsky.feed.post") statsRef.current.processed.post++;
        else if (col === "app.bsky.graph.follow") statsRef.current.processed.follow++;

        const actorHandle = profiles.current[evt.did];

        if (hopping.current) {
          if (shadowCount.current < MAX_SHADOWS) {
            let verb: string | undefined, shadowUrl: string | undefined;
            if (col === "app.bsky.feed.like") {
              const uri = evt.commit.record?.subject?.uri;
              if (uri) { verb = "liked"; shadowUrl = postUrl(uri); }
            } else if (col === "app.bsky.feed.repost") {
              const uri = evt.commit.record?.subject?.uri;
              if (uri) { verb = "reposted"; shadowUrl = postUrl(uri); }
            } else if (col === "app.bsky.feed.post") {
              verb = "posted";
              shadowUrl = postUrl(`at://${evt.did}/app.bsky.feed.post/${evt.commit.rkey}`);
            } else if (col === "app.bsky.graph.follow") {
              const did = evt.commit.record?.subject;
              if (did) { verb = "followed"; shadowUrl = `https://bsky.app/profile/${did}`; }
            }
            if (verb && shadowUrl) {
              setChain(prev => {
                if (!prev.length) return prev;
                const [first, ...rest] = prev;
                if (first.branches.length >= MAX_SHADOWS) return prev;
                return [{ ...first, branches: [...first.branches, { verb: verb!, actorHandle, url: shadowUrl! }] }, ...rest];
              });
              statsRef.current.branches++;
              shadowCount.current++;
            }
          }
          return;
        }

        let targetDid: string | null = null;
        let targetUri: string | null = null;
        let verb: string;

        if (col === "app.bsky.feed.like" || col === "app.bsky.feed.repost") {
          targetUri = evt.commit.record?.subject?.uri;
          if (!targetUri) return;
          targetDid = didFromUri(targetUri);
          if (!targetDid) return;
          verb = col === "app.bsky.feed.like" ? "liked" : "reposted";
        } else if (col === "app.bsky.feed.post") {
          targetDid = evt.did;
          targetUri = `at://${evt.did}/app.bsky.feed.post/${evt.commit.rkey}`;
          verb = "posted";
        } else if (col === "app.bsky.graph.follow") {
          targetDid = evt.commit.record?.subject;
          if (!targetDid) return;
          verb = "followed";
        } else return;

        hopping.current = true;
        statsRef.current.triggered++;
        setStatus(`@${actorHandle} ${verb} — resolving…`);

        const [profileRes, postsRes] = await Promise.allSettled([
          xrpc("app.bsky.actor.getProfile", { actor: targetDid }),
          targetUri ? xrpc("app.bsky.feed.getPosts", { uris: targetUri }) : Promise.resolve(null),
        ]);

        if (profileRes.status !== "fulfilled") { hopping.current = false; return; }
        const profile = profileRes.value;
        const followsCount = profile.followsCount ?? 0;

        if (followsCount < MIN_FOLLOWS) {
          statsRef.current.skipped++;
          setStatus(`skipping @${profile.handle} (${followsCount} follows) — waiting…`);
          hopping.current = false;
          return;
        }

        const nextPost = (targetUri && postsRes.status === "fulfilled") ? postsRes.value?.posts?.[0] ?? null : null;
        const viaText = col === "app.bsky.feed.post" ? "posted" : `${verb} by @${actorHandle}`;
        const inSeedGraph = seedFollowDids.current.has(targetDid!);
        await hopRef.current(profile.handle, viaText, targetUri, nextPost, inSeedGraph);
      } catch {}
    });
  }

  // --- reconnect / hop random ---

  async function reconnect() {
    if (!currentActor.current || !runningRef.current) return;
    setStatus("reconnecting…");
    try {
      profiles.current = await fetchFollows(currentActor.current);
    } catch {
      setStatus("could not reconnect");
      return;
    }
    connectJetstream(currentActor.current, Object.keys(profiles.current).length);
  }

  async function hopRandom() {
    const dids = Object.keys(profiles.current);
    if (!dids.length || hopping.current) return;
    hopping.current = true;
    setStatus("picking random follow…");
    try {
      const did = dids[Math.floor(Math.random() * dids.length)];
      const profile = await xrpc("app.bsky.actor.getProfile", { actor: did });
      const inSeedGraph = seedFollowDids.current.has(did);
      await hopRef.current(profile.handle, "random hop", null, null, inSeedGraph);
    } catch {
      hopping.current = false;
      setStatus("random hop failed");
    }
  }

  // --- stats ---

  const f = (n: number) => n === 0 ? "—" : n.toLocaleString();
  const matched = statsSnap.processed.like + statsSnap.processed.repost + statsSnap.processed.post + statsSnap.processed.follow;

  // --- render ---

  const showClear = running || chain.length > 0;

  return (
    <>
      <h1><a href="/lab">lab</a> &gt; chain surfer</h1>
      <div className="layout">
        <div className="chain-col">
          <div className="input-wrap" onClick={e => e.stopPropagation()}>
            <input
              id="handle"
              type="text"
              value={inputVal}
              placeholder={placeholder}
              disabled={running}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              onChange={e => onInput(e.target.value)}
              onKeyDown={onKeyDown}
            />
            {suggestions.length > 0 && (
              <div className="suggestions">
                {suggestions.map((s, i) => (
                  <button
                    key={s}
                    className={i === activeIdx ? "active" : ""}
                    onClick={() => { start(s); hideSuggestions(); }}
                  >{s}</button>
                ))}
              </div>
            )}
            {showClear && (
              <button id="clear-btn" onClick={clearAll}>×</button>
            )}
            <span className="info-wrap">
              <button className="info-btn" id="info-btn" onClick={e => {
                e.stopPropagation();
                setStatsOpen(false);
                setInfoOpen(o => !o);
              }}>?</button>
              <button className="info-btn" id="stats-btn" onClick={e => {
                e.stopPropagation();
                setInfoOpen(false);
                if (!statsOpen) setStatsSnap({ ...statsRef.current, processed: { ...statsRef.current.processed } });
                setStatsOpen(o => !o);
              }}>i</button>
              {infoOpen && (
                <div className="info-popover open">
                  watch for likes, reposts, and posts from the current seed's follows → first event extracts the target post's author → resolves to a handle → that author becomes the new seed
                </div>
              )}
              {statsOpen && (
                <div className="info-popover stats-popover open">
                  <div className="stats-section">
                    <div className="stats-section-label">session</div>
                    <div className="stats-row"><span className="sk">hops</span><span className="sv">{f(statsSnap.hops)}</span></div>
                    <div className="stats-row"><span className="sk">skips</span><span className="sv">{f(statsSnap.skipped)}</span></div>
                  </div>
                  <div className="stats-divider" />
                  <div className="stats-section">
                    <div className="stats-section-label">from follows</div>
                    <div className="stats-row"><span className="sk">likes</span><span className="sv">{f(statsSnap.processed.like)}</span></div>
                    <div className="stats-row"><span className="sk">reposts</span><span className="sv">{f(statsSnap.processed.repost)}</span></div>
                    <div className="stats-row"><span className="sk">posts</span><span className="sv">{f(statsSnap.processed.post)}</span></div>
                    <div className="stats-row"><span className="sk">follows</span><span className="sv">{f(statsSnap.processed.follow)}</span></div>
                  </div>
                  <div className="stats-divider" />
                  <div className="stats-section">
                    <div className="stats-section-label">chain</div>
                    <div className="stats-row"><span className="sk">triggered</span><span className="sv">{f(statsSnap.triggered)}</span></div>
                    <div className="stats-row"><span className="sk">branches</span><span className="sv">{f(statsSnap.branches)}</span></div>
                  </div>
                  <div className="stats-divider" />
                  <div className="stats-section">
                    <div className="stats-section-label">firehose</div>
                    <div className="stats-row"><span className="sk">seen</span><span className="sv">{f(statsSnap.seen)}</span></div>
                    <div className="stats-row"><span className="sk">matched</span><span className="sv">{f(matched)}</span></div>
                  </div>
                </div>
              )}
            </span>
          </div>

          <div className="status-row">
            <div id="status">
              {statusMsg}
              {statusAction === "reconnect" && (
                <> — <button onClick={reconnect}>reconnect</button></>
              )}
              {statusAction === "hop-random" && (
                <> — <button onClick={hopRandom}>hop random</button></>
              )}
            </div>
            {elapsed !== null && (
              <div id="timer" className={elapsed >= STUCK_MS ? "stuck" : ""}>{fmtElapsed(elapsed)}</div>
            )}
            <div id="depth" className={depth > 0 ? "nonzero" : ""}>
              {depth > 1 ? `${depth} hops` : ""}
            </div>
          </div>

          <div id="chain">
            {chain.map((node, i) => (
              <ChainNodeEl key={node.id} node={node} isCurrent={i === 0} />
            ))}
          </div>
        </div>

        <div className="post-col">
          <div id="post-panel">
            <PostPanel post={currentPost?.post ?? null} uri={currentPost?.uri ?? null} />
          </div>
        </div>
      </div>
    </>
  );
}
