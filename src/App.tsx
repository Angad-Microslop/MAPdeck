import { useEffect, useMemo, useState } from 'react';

type Profile = 'Focus' | 'Gaming' | 'Creative' | 'Live';
type TileKind = 'app' | 'widget' | 'macro' | 'system';

type Tile = {
  id: number;
  name: string;
  tag: string;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  accent: string;
  kind: TileKind;
  description: string;
  action: string;
};

const profiles: Profile[] = ['Focus', 'Gaming', 'Creative', 'Live'];

const deckTiles: Tile[] = [
  {
    id: 1,
    name: 'Launch',
    tag: 'System',
    x: 0,
    y: 0,
    w: 2,
    h: 2,
    color: '#60a5fa',
    accent: '#22d3ee',
    kind: 'system',
    description: 'Launch app directory / command queue',
    action: 'Open launcher'
  },
  {
    id: 2,
    name: 'Spotify',
    tag: 'Audio',
    x: 2,
    y: 0,
    w: 2,
    h: 2,
    color: '#34d399',
    accent: '#10b981',
    kind: 'widget',
    description: 'Spotify playback and device routing',
    action: 'Toggle audio'
  },
  {
    id: 3,
    name: 'Discord',
    tag: 'Chat',
    x: 4,
    y: 0,
    w: 2,
    h: 2,
    color: '#a78bfa',
    accent: '#8b5cf6',
    kind: 'app',
    description: 'Voice and team communication',
    action: 'Open chat'
  },
  {
    id: 4,
    name: 'Photoshop',
    tag: 'Creative',
    x: 6,
    y: 0,
    w: 2,
    h: 2,
    color: '#f97316',
    accent: '#fb7185',
    kind: 'app',
    description: 'Design intent profile',
    action: 'Launch app'
  },
  {
    id: 5,
    name: 'Valorant',
    tag: 'Gaming',
    x: 8,
    y: 0,
    w: 2,
    h: 2,
    color: '#f43f5e',
    accent: '#ef4444',
    kind: 'app',
    description: 'Competitive session launch',
    action: 'Launch game'
  },
  {
    id: 6,
    name: 'OBS',
    tag: 'Stream',
    x: 0,
    y: 2,
    w: 2,
    h: 2,
    color: '#22c55e',
    accent: '#4ade80',
    kind: 'macro',
    description: 'Stream / capture workflow',
    action: 'Start stream'
  },
  {
    id: 7,
    name: 'Folders',
    tag: 'Grid',
    x: 2,
    y: 2,
    w: 2,
    h: 2,
    color: '#06b6d4',
    accent: '#0ea5e9',
    kind: 'system',
    description: 'Nested deck folder browser',
    action: 'Open folder'
  },
  {
    id: 8,
    name: 'AI Desk',
    tag: 'Llama',
    x: 4,
    y: 2,
    w: 2,
    h: 2,
    color: '#8b5cf6',
    accent: '#c084fc',
    kind: 'widget',
    description: 'Local AI prompt and rewrite helper',
    action: 'Open AI'
  },
  {
    id: 9,
    name: 'Weather',
    tag: 'Data',
    x: 6,
    y: 2,
    w: 2,
    h: 2,
    color: '#38bdf8',
    accent: '#60a5fa',
    kind: 'widget',
    description: 'Forecast and current conditions',
    action: 'Show weather'
  },
  {
    id: 10,
    name: 'Macro 7',
    tag: 'Profile',
    x: 8,
    y: 2,
    w: 2,
    h: 2,
    color: '#f59e0b',
    accent: '#fbbf24',
    kind: 'macro',
    description: 'Gaming profile automation',
    action: 'Run macro'
  },
  {
    id: 11,
    name: 'Cowork',
    tag: 'Focus',
    x: 0,
    y: 4,
    w: 3,
    h: 2,
    color: '#14b8a6',
    accent: '#2dd4bf',
    kind: 'macro',
    description: 'Work timer and distraction lock',
    action: 'Start focus'
  },
  {
    id: 12,
    name: 'Stream Deck',
    tag: 'Remote',
    x: 3,
    y: 4,
    w: 3,
    h: 2,
    color: '#64748b',
    accent: '#94a3b8',
    kind: 'system',
    description: 'Mobile deck bridge',
    action: 'Sync remote'
  },
  {
    id: 13,
    name: 'Muse',
    tag: 'Audio',
    x: 6,
    y: 4,
    w: 2,
    h: 2,
    color: '#f472b6',
    accent: '#ec4899',
    kind: 'widget',
    description: 'Ambient audio scene control',
    action: 'Play mix'
  },
  {
    id: 14,
    name: 'Terminal',
    tag: 'Dev',
    x: 8,
    y: 4,
    w: 2,
    h: 2,
    color: '#60a5fa',
    accent: '#93c5fd',
    kind: 'app',
    description: 'Project command hub',
    action: 'Open terminal'
  },
  {
    id: 15,
    name: 'Focus',
    tag: 'Timer',
    x: 0,
    y: 6,
    w: 2,
    h: 2,
    color: '#a3e635',
    accent: '#84cc16',
    kind: 'widget',
    description: 'Pomodoro and productivity timer',
    action: 'Start timer'
  },
  {
    id: 16,
    name: 'Vault',
    tag: 'Secure',
    x: 2,
    y: 6,
    w: 2,
    h: 2,
    color: '#f87171',
    accent: '#ef4444',
    kind: 'system',
    description: 'Protected apps and credentials',
    action: 'Unlock vault'
  },
  {
    id: 17,
    name: 'Teams',
    tag: 'Work',
    x: 4,
    y: 6,
    w: 2,
    h: 2,
    color: '#3b82f6',
    accent: '#60a5fa',
    kind: 'app',
    description: 'Meetings and calls',
    action: 'Join call'
  },
  {
    id: 18,
    name: 'AutoSync',
    tag: 'Cloud',
    x: 6,
    y: 6,
    w: 2,
    h: 2,
    color: '#22d3ee',
    accent: '#67e8f9',
    kind: 'system',
    description: 'Theme and layout sync',
    action: 'Sync profiles'
  },
  {
    id: 19,
    name: 'Notion',
    tag: 'Notes',
    x: 8,
    y: 6,
    w: 2,
    h: 2,
    color: '#c084fc',
    accent: '#e9d5ff',
    kind: 'app',
    description: 'Personal notes and tasks',
    action: 'Open notes'
  }
];

const statCards = [
  { label: 'FPS', value: '120', tone: '#67e8f9' },
  { label: 'Latency', value: '8.2ms', tone: '#34d399' },
  { label: 'Deck', value: '10x8', tone: '#fbbf24' },
  { label: 'Profile', value: 'Gaming', tone: '#f472b6' }
];

const appCatalog = [
  'Discord',
  'Spotify',
  'Valorant',
  'Photoshop',
  'Notion',
  'Teams',
  'OBS',
  'Steam',
  'Terminal',
  'AI Desk',
  'Vault',
  'Weather',
  'Muse',
  'Cowork'
];

const macroSteps = [
  'Load profile',
  'Mute ambient audio',
  'Trigger stream overlays',
  'Open Discord',
  'Focus on overlay'
];

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<number>(1);
  const [activeProfile, setActiveProfile] = useState<Profile>('Focus');
  const [statusText, setStatusText] = useState('Deck ready');
  const [isMacroRunning, setIsMacroRunning] = useState(false);

  const selectedTile = useMemo(
    () => deckTiles.find((tile) => tile.id === selectedId) ?? deckTiles[0],
    [selectedId]
  );

  const filteredTiles = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return deckTiles;

    return deckTiles.filter(
      (tile) =>
        tile.name.toLowerCase().includes(normalized) ||
        tile.tag.toLowerCase().includes(normalized) ||
        tile.description.toLowerCase().includes(normalized)
    );
  }, [query]);

  useEffect(() => {
    if (!filteredTiles.some((tile) => tile.id === selectedId) && filteredTiles.length > 0) {
      setSelectedId(filteredTiles[0].id);
    }
  }, [filteredTiles, selectedId]);

  const filteredAppMatches = appCatalog.filter((app) =>
    app.toLowerCase().includes(query.trim().toLowerCase())
  );

  const handleLaunch = (tile: Tile) => {
    setStatusText(`${tile.action} • ${tile.name}`);
    setIsMacroRunning(true);
    window.setTimeout(() => setIsMacroRunning(false), 900);
  };

  const handleProfileChange = (profile: Profile) => {
    setActiveProfile(profile);
    setStatusText(`Profile switched to ${profile}`);
  };

  return (
    <div className="app-shell">
      <header className="hud-panel topbar">
        <div className="brand-wrap">
          <div className="brand-mark">M</div>
          <div>
            <div className="brand-title">MAPdeck</div>
            <div className="brand-subtitle">launcher control deck</div>
          </div>
        </div>

        <div className="header-actions">
          <div className="profile-switcher" aria-label="Profile selector">
            {profiles.map((profile) => (
              <button
                key={profile}
                type="button"
                className={profile === activeProfile ? 'profile-chip active' : 'profile-chip'}
                onClick={() => handleProfileChange(profile)}
              >
                {profile}
              </button>
            ))}
          </div>

          <span className="status-pill online">LIVE</span>
        </div>
      </header>

      <aside className="hud-panel left-panel">
        <div className="panel-title">Command palette</div>
        <input
          className="search-input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search apps / widgets / macros"
          aria-label="Search MAPdeck apps"
        />

        <div className="search-results">
          {filteredAppMatches.length > 0 ? (
            filteredAppMatches.slice(0, 8).map((app) => (
              <button key={app} className="search-result" type="button" onClick={() => setStatusText(`Launching ${app}`)}>
                {app}
              </button>
            ))
          ) : (
            <div className="empty-search">No exact app matches. Try a broader search.</div>
          )}
        </div>

        <div className="stats-list">
          {statCards.map((stat) => (
            <div key={stat.label} className="stat-card">
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value" style={{ color: stat.tone }}>{stat.value}</div>
            </div>
          ))}
        </div>
      </aside>

      <main className="deck-area">
        <div className="deck-grid" aria-label="MAPdeck grid">
          {filteredTiles.map((tile) => (
            <button
              key={tile.id}
              type="button"
              className={selectedId === tile.id ? 'deck-tile selected' : 'deck-tile'}
              style={{
                gridColumn: `span ${tile.w}`,
                gridRow: `span ${tile.h}`,
                background: `radial-gradient(circle at 30% 30%, ${tile.accent} 0%, ${tile.color} 28%, rgba(10, 15, 30, 0.96) 84%)`
              }}
              onClick={() => {
                setSelectedId(tile.id);
                handleLaunch(tile);
              }}
            >
              <span className="tile-ring" style={{ boxShadow: `0 0 20px ${tile.accent}` }} />
              <span className="tile-glow" style={{ background: tile.accent }} />
              <span className="tile-content">
                <span className="tile-title">{tile.name}</span>
                <span className="tile-tag">[{tile.tag}]</span>
              </span>
            </button>
          ))}
        </div>
      </main>

      <aside className="hud-panel right-panel">
        <div className="panel-title">Inspector</div>

        <div className="inspector-header">
          <div className="inspector-icon" style={{ background: selectedTile.accent }} />
          <div>
            <div className="inspector-name">{selectedTile.name}</div>
            <div className="inspector-tag">{selectedTile.tag}</div>
          </div>
        </div>

        <div className="tile-description">{selectedTile.description}</div>

        <div className="control-group">
          <label>Ring width</label>
          <input type="range" min="2" max="16" defaultValue="7" />
        </div>

        <div className="control-group">
          <label>Glow radius</label>
          <input type="range" min="0" max="30" defaultValue="16" />
        </div>

        <div className="control-group">
          <label>Animation speed</label>
          <input type="range" min="1" max="100" defaultValue="52" />
        </div>

        <div className="action-buttons">
          <button type="button" onClick={() => handleLaunch(selectedTile)}>
            {selectedTile.action}
          </button>
          <button type="button" className="secondary" onClick={() => setStatusText('Tile duplicated')}>
            Duplicate
          </button>
        </div>

        <div className="macro-panel">
          <div className="macro-header">Macro runner</div>
          <div className="macro-list">
            {macroSteps.map((step, index) => (
              <div key={step} className={index === 0 && isMacroRunning ? 'macro-step active' : 'macro-step'}>
                <span className="step-index">{index + 1}</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="status-box">
          <div className="status-label">Deck status</div>
          <div className="status-value">{statusText}</div>
        </div>
      </aside>
    </div>
  );
}
