import { useEffect, useMemo, useRef, useState } from "react";
import { CATEGORY_ART } from "./art.js";

const CATEGORY_THEMES = {
  animals: {
    label: "Happy Animals",
    accent: "#ff8a65",
    background: "linear-gradient(135deg, #fff2d6 0%, #ffd7b5 100%)",
  },
  ocean: {
    label: "Ocean Friends",
    accent: "#3ea7ff",
    background: "linear-gradient(135deg, #d9f7ff 0%, #b5e3ff 100%)",
  },
  space: {
    label: "Space Adventure",
    accent: "#7c5cff",
    background: "linear-gradient(135deg, #efe5ff 0%, #d7d2ff 100%)",
  },
  treats: {
    label: "Yummy Treats",
    accent: "#ff4f93",
    background: "linear-gradient(135deg, #ffe0ef 0%, #ffd2c0 100%)",
  },
};

const GRID_OPTIONS = [
  { label: "4×3", cols: 4, rows: 3 },
  { label: "4×4", cols: 4, rows: 4 },
  { label: "5×4", cols: 5, rows: 4 },
  { label: "6×4", cols: 6, rows: 4 },
];

function shuffle(items) {
  const next = [...items];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[randomIndex]] = [next[randomIndex], next[index]];
  }
  return next;
}

function buildDeck(categoryKey, gridIndex) {
  const grid = GRID_OPTIONS[gridIndex];
  const iconCount = (grid.cols * grid.rows) / 2;
  const icons = CATEGORY_ART[categoryKey].cards.slice(0, iconCount);

  return shuffle(
    icons.flatMap((item, pairIndex) => [
      { id: `${categoryKey}-${pairIndex}-a`, ...item, pairId: `${categoryKey}-${pairIndex}` },
      { id: `${categoryKey}-${pairIndex}-b`, ...item, pairId: `${categoryKey}-${pairIndex}` },
    ]),
  );
}

function playMatchSound(audioContextRef) {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  const context = audioContextRef.current ?? new AudioContextClass();
  audioContextRef.current = context;

  if (context.state === "suspended") {
    context.resume();
  }

  const now = context.currentTime;
  const frequencies = [523.25, 659.25, 783.99];

  frequencies.forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = "triangle";
    oscillator.frequency.value = frequency;

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.18, now + 0.02 + index * 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2 + index * 0.04);

    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.start(now + index * 0.03);
    oscillator.stop(now + 0.24 + index * 0.04);
  });
}

function getStatusText(turns, matches, totalPairs) {
  if (matches === totalPairs) {
    return `You found every pair in ${turns} turns.`;
  }

  if (matches === 0) {
    return "Tap two cards to start matching.";
  }

  return `${matches} of ${totalPairs} pairs found. Keep going.`;
}

function GridPreview({ label }) {
  return (
    <span className="grid-preview" aria-hidden="true">
      {label}
    </span>
  );
}

function SelectionScreen({ title, subtitle, theme, children }) {
  return (
    <section className="selection-screen">
      <div className="hero" style={{ background: theme.background }}>
        <div className="hero-copy">
          <p className="eyebrow">Kid Memory Match</p>
          <h1>{title}</h1>
          <p className="hero-text">{subtitle}</p>
        </div>
        <div className="hero-badge">
          <img className="hero-badge-art" src={theme.badgeImage} alt="" />
        </div>
      </div>
      <div className="chooser-panel">{children}</div>
    </section>
  );
}

export default function App() {
  const [screen, setScreen] = useState("category");
  const [category, setCategory] = useState("animals");
  const [gridIndex, setGridIndex] = useState(1);
  const [cards, setCards] = useState(() => buildDeck("animals", 1));
  const [flippedIds, setFlippedIds] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [turns, setTurns] = useState(0);
  const [locked, setLocked] = useState(false);
  const audioContextRef = useRef(null);

  const theme = {
    ...CATEGORY_THEMES[category],
    badgeImage: CATEGORY_ART[category].badgeImage,
  };
  const grid = GRID_OPTIONS[gridIndex];
  const totalPairs = cards.length / 2;
  const matches = matchedIds.length / 2;
  const completed = matches === totalPairs && totalPairs > 0;

  const boardStyle = useMemo(
    () => ({
      gridTemplateColumns: `repeat(${grid.cols}, minmax(0, 1fr))`,
    }),
    [grid.cols],
  );

  useEffect(() => {
    return () => {
      audioContextRef.current?.close();
    };
  }, []);

  useEffect(() => {
    if (flippedIds.length !== 2) {
      return undefined;
    }

    setLocked(true);
    const [firstId, secondId] = flippedIds;
    const firstCard = cards.find((card) => card.id === firstId);
    const secondCard = cards.find((card) => card.id === secondId);

    if (firstCard?.pairId === secondCard?.pairId) {
      const timeoutId = window.setTimeout(() => {
        setMatchedIds((current) => [...current, firstId, secondId]);
        setFlippedIds([]);
        setTurns((current) => current + 1);
        setLocked(false);
        playMatchSound(audioContextRef);
      }, 500);

      return () => window.clearTimeout(timeoutId);
    }

    const timeoutId = window.setTimeout(() => {
      setFlippedIds([]);
      setTurns((current) => current + 1);
      setLocked(false);
    }, 900);

    return () => window.clearTimeout(timeoutId);
  }, [cards, flippedIds]);

  function startGame(nextCategory = category, nextGridIndex = gridIndex) {
    setCards(buildDeck(nextCategory, nextGridIndex));
    setFlippedIds([]);
    setMatchedIds([]);
    setTurns(0);
    setLocked(false);
    setScreen("game");
  }

  function handleCategorySelect(nextCategory) {
    setCategory(nextCategory);
    setScreen("grid");
  }

  function handleGridSelect(nextGridIndex) {
    setGridIndex(nextGridIndex);
    startGame(category, nextGridIndex);
  }

  function handleCardClick(cardId) {
    if (locked || flippedIds.includes(cardId) || matchedIds.includes(cardId)) {
      return;
    }

    if (flippedIds.length === 2) {
      return;
    }

    setFlippedIds((current) => [...current, cardId]);
  }

  if (screen === "category") {
    return (
      <main className="app-shell" style={{ "--theme-accent": theme.accent }}>
        <SelectionScreen
          title="Pick a picture world"
          subtitle="Touch one big picture button to choose what you want to match."
          theme={theme}
        >
          <div className="icon-button-grid">
            {Object.entries(CATEGORY_THEMES).map(([key, value]) => (
              <button
                key={key}
                type="button"
                className="icon-choice"
                onClick={() => handleCategorySelect(key)}
                aria-label={value.label}
                title={value.label}
              >
                <img className="icon-choice-main-art" src={CATEGORY_ART[key].buttonImage} alt="" />
                <span className="icon-choice-pair">
                  <img src={CATEGORY_ART[key].cards[0].image} alt="" />
                  <img src={CATEGORY_ART[key].cards[1].image} alt="" />
                </span>
              </button>
            ))}
          </div>
        </SelectionScreen>
      </main>
    );
  }

  if (screen === "grid") {
    return (
      <main className="app-shell" style={{ "--theme-accent": theme.accent }}>
        <SelectionScreen
          title="Choose the board size"
          subtitle="Tap one big button to choose how many cards to play with."
          theme={theme}
        >
          <div className="top-actions">
            <button type="button" className="nav-chip" onClick={() => setScreen("category")}>
              ⬅️
            </button>
          </div>
          <div className="icon-button-grid grid-choice-grid">
            {GRID_OPTIONS.map((option, index) => (
              <button
                key={option.label}
                type="button"
                className="icon-choice grid-choice"
                onClick={() => handleGridSelect(index)}
                aria-label={option.label}
                title={option.label}
              >
                <GridPreview label={option.label} />
              </button>
            ))}
          </div>
        </SelectionScreen>
      </main>
    );
  }

  return (
    <main className="app-shell" style={{ "--theme-accent": theme.accent }}>
      <section className="control-panel game-toolbar">
        <div className="top-actions">
          <button type="button" className="nav-chip" onClick={() => setScreen("grid")}>
            ⬅️
          </button>
          <button type="button" className="nav-chip" onClick={() => setScreen("category")}>
            🏠
          </button>
          <button type="button" className="nav-chip" onClick={() => startGame()}>
            🔄
          </button>
        </div>

        <div className="score-panel">
          <div className="score-card">
            <span className="score-label">Turns</span>
            <strong>{turns}</strong>
          </div>
          <div className="score-card">
            <span className="score-label">Pairs</span>
            <strong>
              {matches}/{totalPairs}
            </strong>
          </div>
        </div>
      </section>

      <section className="board-panel">
        {completed ? <div className="celebration inline-celebration">Amazing memory!</div> : null}
        <div className="board" style={boardStyle}>
          {cards.map((card) => {
            const isFlipped = flippedIds.includes(card.id) || matchedIds.includes(card.id);
            const isMatched = matchedIds.includes(card.id);

            return (
              <button
                key={card.id}
                type="button"
                className={`memory-card ${isFlipped ? "flipped" : ""} ${isMatched ? "matched" : ""}`}
                onClick={() => handleCardClick(card.id)}
                aria-label={isFlipped ? `Card ${card.label}` : "Hidden card"}
              >
                <span className="card-face card-front">?</span>
                <span className="card-face card-back">
                  <img className="card-illustration" src={card.image} alt="" />
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </main>
  );
}
