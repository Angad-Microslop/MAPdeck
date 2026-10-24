import { useMemo, useState } from 'react';

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
  type: 'app' | 'widget' | 'macro' | 'system';
};

const deckTiles: Tile[] = [
  { id: 1, name: 'Launch', tag: 'System', x: 0, y: 0, w: 2, h: 2, color: '#60a5fa', accent: '#22d3ee', type: 'system' },
  { id: 2, name: 'Spotify', tag: 'Audio', x: 2, y: 0, w: 2, h: 2, color: '#34d399', accent: '#10b981', type: 'widget' },
  { id: 3, name: 'Discord', tag: 'Chat', x: 4, y: 0, w: 2, h: 2, color: '#a78bfa', accent: '#8b5cf6', type: 'app' },
  { id: 4, name: 'Photoshop', tag: 'Creative', x: 6, y: 0, w: 2, h: 2, color: '#f97316', accent: '#fb7185', type: 'app' },
  { id: 5, name: 'Valorant', tag: 'Gaming', x: 8, y: 0, w: 2, h: 2, color: '#f43f5e', accent: '#ef4444', type: 'app' },
  { id: 6, name: 'OBS', tag: 'Stream', x: 0, y: 2, w: 2, h: 2, color: '#22c55e', accent: '#4ade80', type: 'macro' },
  { id: 7, name: 'Folders', tag: 'Grid', x: 2, y: 2, w: 2, h: 2, color: '#06b6d4', accent: '#0ea5e9', type: 'system' },
  { id: 8, name: 'AI Desk', tag: 'Llama', x: 4, y: 2, w: 2, h: 2, color: '#8b5cf6', accent: '#c084fc', type: 'widget' },
  { id: 9, name: 'Weather', tag: 'Data', x: 6, y: 2, w: 2, h: 2, color: '#38bdf8', accent: '#60a5fa', type: 'widget' },
  { id: 10, name: 'Macro 7', tag: 'Profile', x: 8, y: 2, w: 2, h: 2, color: '#f59e0b', accent: '#fbbf24', type: 'macro' },
  { id: 11, name: 'Cowork', tag: 'Focus', x: 0, y: 4, w: 3, h: 2, color: '#14b8a6', accent: '#2dd4bf', type: 'macro' },
  { id: 12, name: 'Stream Deck', tag: 'Remote', x: 3, y: 4, w: 3, h: 2, color: '#64748b', accent: '#94a3b8', type: 'system' },
  { id: 13, name: 'Muse', tag: 'Audio', x: 6, y: 4, w: 2, h: 2, color: '#f472b6', accent: '#ec4899', type: 'widget' },
  { id: 14, name: 'Terminal', tag: 'Dev', x: 8, y: 4, w: 2, h: 2, color: '#60a5fa', accent: '#93c5fd', type: 'app' },
  { id: 15, name: 'Focus', tag: 'Timer', x: 0, y: 6, w: 2, h: 2, color: '#a3e635', accent: '#84cc16', type: 'widget' },
  { id: 16, name: 'Vault', tag: 'Secure', x: 2, y: 6, w: 2, h: 2, color: '#f87171', accent: '#ef4444', type: 'system' },
  { id: 17, name: 'Teams', tag: 'Work', x: 4, y: 6, w: 2, h: 2, color: '#3b82f6', accent: '#60a5fa', type: 'app' },
  { id: 18, name: 'AutoSync', tag: 'Cloud', x: 6, y: 6, w: 2, h: 2, color: '#22d3ee', accent: '#67e8f9', type: 'system' },
  { id: 19, name: 'Notion', tag: 'Notes', x: 8, y: 6, w: 2, h: 2, color: '#c084fc', accent: '#e9d5ff', type: 'app' }
];

const stats = [
  { label: 'FPS', value: '120', tone: '#67e8f9' },
  { label: 'Latency', value: '8.2ms', tone: '#34d399' },
  { label: 'Deck', value: '10x8', tone: '#fbbf24' },
  { label: 'Profile', value: 'Gaming', tone: '#f472b6' }
];

const apps = [
  'Discord', 'Spotify', 'Valorant', 'Photoshop', 'Notion', 'Teams', 'OBS',
  'Steam', 'Terminal', 'AI Desk', 'Vault', 'Weather', 'Muse', 'Cowork'
];

export default function App() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Tile | null>(deckTiles[0]);

  const visibleTiles = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return deckTiles;
    return deckTiles.filter((tile) =>
      tile.name.toLowerCase().includes(normalized) || tile.tag.toLowerCase().includes(normalized)
    );
  }, [query]);

  return (
    <div className="app-shell">
      <div className="hud-panel topbar">
        <div className="brand-wrap">
          <div className="brand-mark">M</div>
          <div>
            <div className="brand-title">MAPdeck</div>
            <div className="brand-subtitle">launcher control deck</div>
          </div>
        </div>

        <div className="header-status">
          <span className="status-pill online">LIVE</span>
          <span className="status-pill">Focus profile</span>
        </div>
      </div>

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
          {apps
            .filter((app) => app.toLowerCase().includes(query.trim().toLowerCase()))
            .slice(0, 8)
            .map((app) => (
              <button key={app} className="search-result" type="button">
                {app}
              </button>
            ))}
        </div>

        <div className="stats-list">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value" style={{ color: stat.tone }}>{stat.value}</div>
            </div>
          ))}
        </div>
      </aside>

      <main className="deck-area">
        <div className="deck-grid" aria-label="MAPdeck grid">
          {visibleTiles.map((tile) => (
            <button
              key={tile.id}
              type="button"
              className={`deck-tile ${selected?.id === tile.id ? 'selected' : ''}`}
              style={{
                gridColumn: `span ${tile.w}`,
                gridRow: `span ${tile.h}`,
                background: `radial-gradient(circle at 30% 30%, ${tile.accent} 0%, ${tile.color} 28%, rgba(10, 15, 30, 0.96) 84%)`
              }}
              onClick={() => setSelected(tile)}
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

        {selected ? (
          <>
            <div className="inspector-header">
              <div className="inspector-icon" style={{ background: selected.accent }} />
              <div>
                <div className="inspector-name">{selected.name}</div>
                <div className="inspector-tag">{selected.tag}</div>
              </div>
            </div>

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
              <button type="button">Launch</button>
              <button type="button" className="secondary">Duplicate</button>
            </div>
          </>
        ) : (
          <div className="empty-state">Select a tile to inspect</div>
        )}
      </aside>
    </div>
  );
}
