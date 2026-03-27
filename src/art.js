function svgToDataUri(svg) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function frameSvg(content, start, end) {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${start}" />
          <stop offset="100%" stop-color="${end}" />
        </linearGradient>
      </defs>
      <rect width="160" height="160" rx="34" fill="url(#g)" />
      <circle cx="36" cy="34" r="16" fill="rgba(255,255,255,0.28)" />
      <circle cx="126" cy="120" r="20" fill="rgba(255,255,255,0.18)" />
      ${content}
    </svg>
  `;
}

function image(content, start, end) {
  return svgToDataUri(frameSvg(content, start, end));
}

function animal(kind, colors) {
  const [start, end, body, accent] = colors;
  const shapes = {
    lion: `<circle cx="80" cy="86" r="42" fill="#ffbf47"/><circle cx="80" cy="88" r="28" fill="${body}"/><circle cx="68" cy="82" r="4" fill="#23304a"/><circle cx="92" cy="82" r="4" fill="#23304a"/><ellipse cx="80" cy="94" rx="8" ry="6" fill="#fff"/><path d="M75 98 Q80 102 85 98" stroke="#23304a" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    panda: `<circle cx="80" cy="86" r="34" fill="#fff"/><circle cx="55" cy="58" r="14" fill="#23304a"/><circle cx="105" cy="58" r="14" fill="#23304a"/><ellipse cx="66" cy="84" rx="9" ry="12" fill="#23304a"/><ellipse cx="94" cy="84" rx="9" ry="12" fill="#23304a"/><circle cx="80" cy="95" r="7" fill="#23304a"/><path d="M72 104 Q80 110 88 104" stroke="#23304a" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    fox: `<path d="M44 92 Q80 34 116 92 L104 118 Q80 132 56 118 Z" fill="${body}"/><path d="M55 66 L66 44 L78 68 Z" fill="${accent}"/><path d="M105 66 L94 44 L82 68 Z" fill="${accent}"/><ellipse cx="80" cy="95" rx="25" ry="20" fill="#fff2df"/><circle cx="69" cy="88" r="4" fill="#23304a"/><circle cx="91" cy="88" r="4" fill="#23304a"/><path d="M74 102 Q80 107 86 102" stroke="#23304a" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    frog: `<circle cx="64" cy="64" r="14" fill="#d9ff9f"/><circle cx="96" cy="64" r="14" fill="#d9ff9f"/><circle cx="64" cy="64" r="6" fill="#23304a"/><circle cx="96" cy="64" r="6" fill="#23304a"/><rect x="42" y="70" width="76" height="48" rx="24" fill="${body}"/><path d="M62 101 Q80 116 98 101" stroke="#23304a" stroke-width="4" fill="none" stroke-linecap="round"/>`,
    monkey: `<circle cx="55" cy="86" r="18" fill="${accent}"/><circle cx="105" cy="86" r="18" fill="${accent}"/><circle cx="80" cy="88" r="34" fill="${body}"/><ellipse cx="80" cy="94" rx="24" ry="22" fill="#ffe1c0"/><circle cx="68" cy="84" r="4" fill="#23304a"/><circle cx="92" cy="84" r="4" fill="#23304a"/><path d="M72 102 Q80 108 88 102" stroke="#23304a" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    unicorn: `<ellipse cx="80" cy="92" rx="36" ry="28" fill="#fff"/><path d="M64 62 Q82 42 106 66" fill="${accent}"/><path d="M80 40 L88 64 L72 64 Z" fill="#ffd25f"/><circle cx="68" cy="90" r="4" fill="#23304a"/><path d="M72 101 Q82 106 90 96" stroke="#23304a" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="110" cy="82" r="10" fill="#fff"/>`,
    koala: `<circle cx="54" cy="78" r="18" fill="#ced6e6"/><circle cx="106" cy="78" r="18" fill="#ced6e6"/><circle cx="80" cy="86" r="34" fill="${body}"/><ellipse cx="80" cy="96" rx="12" ry="16" fill="#48536b"/><circle cx="67" cy="86" r="4" fill="#23304a"/><circle cx="93" cy="86" r="4" fill="#23304a"/>`,
    bunny: `<circle cx="66" cy="52" r="12" fill="#fff"/><circle cx="94" cy="52" r="12" fill="#fff"/><rect x="56" y="26" width="20" height="40" rx="10" fill="#fff"/><rect x="84" y="26" width="20" height="40" rx="10" fill="#fff"/><circle cx="80" cy="92" r="34" fill="#fff"/><circle cx="68" cy="88" r="4" fill="#23304a"/><circle cx="92" cy="88" r="4" fill="#23304a"/><path d="M75 100 Q80 104 85 100" stroke="#ff7aa7" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    tiger: `<circle cx="80" cy="86" r="34" fill="${body}"/><path d="M58 62 L68 48 L74 66 Z" fill="#23304a"/><path d="M102 62 L92 48 L86 66 Z" fill="#23304a"/><path d="M64 74 L72 80 M96 74 L88 80 M80 70 L80 78" stroke="#23304a" stroke-width="4" stroke-linecap="round"/><circle cx="68" cy="88" r="4" fill="#23304a"/><circle cx="92" cy="88" r="4" fill="#23304a"/><path d="M74 101 Q80 107 86 101" stroke="#23304a" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    bear: `<circle cx="58" cy="60" r="12" fill="${accent}"/><circle cx="102" cy="60" r="12" fill="${accent}"/><circle cx="80" cy="88" r="34" fill="${body}"/><ellipse cx="80" cy="97" rx="16" ry="12" fill="#ffe4c2"/><circle cx="68" cy="86" r="4" fill="#23304a"/><circle cx="92" cy="86" r="4" fill="#23304a"/><circle cx="80" cy="96" r="5" fill="#23304a"/>`,
    cat: `<path d="M54 68 L66 48 L76 70 Z" fill="${accent}"/><path d="M106 68 L94 48 L84 70 Z" fill="${accent}"/><circle cx="80" cy="88" r="34" fill="${body}"/><circle cx="68" cy="88" r="4" fill="#23304a"/><circle cx="92" cy="88" r="4" fill="#23304a"/><path d="M75 100 Q80 104 85 100" stroke="#23304a" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M56 98 H70 M90 98 H104" stroke="#23304a" stroke-width="2.5" stroke-linecap="round"/>`,
    dog: `<circle cx="60" cy="74" r="16" fill="${accent}"/><circle cx="100" cy="74" r="16" fill="${accent}"/><circle cx="80" cy="88" r="34" fill="${body}"/><ellipse cx="80" cy="98" rx="16" ry="12" fill="#ffe4c2"/><circle cx="68" cy="88" r="4" fill="#23304a"/><circle cx="92" cy="88" r="4" fill="#23304a"/><circle cx="80" cy="96" r="5" fill="#23304a"/>`,
  };
  return image(shapes[kind], start, end);
}

function ocean(kind, colors) {
  const [start, end, body, accent] = colors;
  const shapes = {
    whale: `<ellipse cx="78" cy="92" rx="40" ry="24" fill="${body}"/><path d="M111 92 L129 76 L125 98 Z" fill="${body}"/><circle cx="65" cy="88" r="4" fill="#23304a"/><path d="M58 66 Q67 48 76 66" stroke="${accent}" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="102" cy="66" r="6" fill="#fff"/>`,
    fish: `<ellipse cx="76" cy="88" rx="34" ry="22" fill="${body}"/><path d="M104 88 L126 68 L126 108 Z" fill="${accent}"/><circle cx="62" cy="84" r="4" fill="#23304a"/><path d="M48 74 Q74 92 48 108" fill="rgba(255,255,255,0.28)"/>`,
    crab: `<circle cx="80" cy="94" r="24" fill="${body}"/><circle cx="66" cy="70" r="6" fill="#fff"/><circle cx="94" cy="70" r="6" fill="#fff"/><circle cx="66" cy="70" r="2.5" fill="#23304a"/><circle cx="94" cy="70" r="2.5" fill="#23304a"/><path d="M54 92 L36 78 M106 92 L124 78 M54 98 L36 108 M106 98 L124 108" stroke="${accent}" stroke-width="6" stroke-linecap="round"/><path d="M62 116 L50 126 M74 118 L66 132 M86 118 L94 132 M98 116 L110 126" stroke="${accent}" stroke-width="5" stroke-linecap="round"/>`,
    turtle: `<ellipse cx="82" cy="90" rx="30" ry="24" fill="${body}"/><circle cx="116" cy="88" r="10" fill="${accent}"/><circle cx="50" cy="84" r="8" fill="${accent}"/><circle cx="60" cy="112" r="8" fill="${accent}"/><circle cx="98" cy="114" r="8" fill="${accent}"/><path d="M68 76 L82 66 L96 76 L94 92 L82 102 L70 92 Z" fill="rgba(255,255,255,0.22)"/>`,
    octopus: `<circle cx="80" cy="78" r="24" fill="${body}"/><path d="M56 96 Q48 120 38 120 M66 98 Q62 124 54 126 M78 100 Q80 126 74 130 M90 98 Q98 124 106 126 M102 96 Q112 118 122 120" stroke="${body}" stroke-width="10" fill="none" stroke-linecap="round"/><circle cx="72" cy="76" r="4" fill="#23304a"/><circle cx="88" cy="76" r="4" fill="#23304a"/>`,
    starfish: `<path d="M80 42 L92 72 L124 72 L98 92 L108 122 L80 104 L52 122 L62 92 L36 72 L68 72 Z" fill="${body}"/><circle cx="80" cy="84" r="5" fill="#fff"/>`,
    jelly: `<path d="M48 86 Q80 40 112 86 Q80 106 48 86 Z" fill="${body}"/><path d="M58 94 Q56 120 52 128 M72 96 Q72 124 70 132 M88 96 Q88 124 90 132 M102 94 Q106 120 108 128" stroke="${accent}" stroke-width="5" stroke-linecap="round"/><circle cx="70" cy="82" r="4" fill="#23304a"/><circle cx="90" cy="82" r="4" fill="#23304a"/>`,
    shell: `<path d="M44 108 Q80 48 116 108 Z" fill="${body}"/><path d="M56 104 Q80 64 104 104" stroke="${accent}" stroke-width="6" fill="none"/><path d="M68 102 Q80 78 92 102" stroke="${accent}" stroke-width="5" fill="none"/>`,
    seahorse: `<path d="M92 54 Q62 58 68 86 Q72 102 90 102 Q104 102 104 116 Q104 126 92 126 Q82 126 82 118" stroke="${body}" stroke-width="12" fill="none" stroke-linecap="round"/><circle cx="88" cy="66" r="4" fill="#23304a"/><path d="M84 58 L102 50" stroke="${accent}" stroke-width="5" stroke-linecap="round"/>`,
    submarine: `<rect x="42" y="82" width="76" height="28" rx="14" fill="${body}"/><rect x="66" y="64" width="20" height="18" rx="6" fill="${body}"/><circle cx="62" cy="96" r="8" fill="#fff"/><circle cx="82" cy="96" r="8" fill="#fff"/><circle cx="102" cy="96" r="8" fill="#fff"/><path d="M120 92 H132" stroke="${accent}" stroke-width="6" stroke-linecap="round"/>`,
    coral: `<path d="M76 118 Q74 96 68 82 Q62 64 68 48 M84 118 Q86 98 94 82 Q102 66 96 48 M80 118 Q80 92 80 68" stroke="${body}" stroke-width="10" stroke-linecap="round" fill="none"/><circle cx="68" cy="46" r="6" fill="${accent}"/><circle cx="96" cy="46" r="6" fill="${accent}"/>`,
    dolphin: `<path d="M44 96 Q72 62 108 78 Q100 90 104 102 Q90 104 82 112 Q64 116 44 96 Z" fill="${body}"/><path d="M82 78 L96 58 L100 78 Z" fill="${accent}"/><circle cx="66" cy="88" r="4" fill="#23304a"/>`,
  };
  return image(shapes[kind], start, end);
}

function space(kind, colors) {
  const [start, end, body, accent] = colors;
  const shapes = {
    rocket: `<path d="M80 38 Q102 60 98 94 L80 120 L62 94 Q58 60 80 38 Z" fill="${body}"/><circle cx="80" cy="76" r="10" fill="#fff"/><path d="M62 94 L48 108 L58 84 Z M98 94 L112 108 L102 84 Z" fill="${accent}"/><path d="M72 120 L80 138 L88 120 Z" fill="#ffb347"/>`,
    planet: `<circle cx="80" cy="84" r="32" fill="${body}"/><ellipse cx="80" cy="88" rx="48" ry="14" fill="none" stroke="${accent}" stroke-width="10"/><circle cx="68" cy="74" r="8" fill="rgba(255,255,255,0.22)"/>`,
    star: `<path d="M80 40 L92 72 L126 72 L98 92 L108 124 L80 104 L52 124 L62 92 L34 72 L68 72 Z" fill="${body}"/>`,
    ufo: `<ellipse cx="80" cy="92" rx="42" ry="18" fill="${body}"/><ellipse cx="80" cy="78" rx="24" ry="18" fill="${accent}"/><circle cx="58" cy="94" r="5" fill="#fff"/><circle cx="80" cy="98" r="5" fill="#fff"/><circle cx="102" cy="94" r="5" fill="#fff"/>`,
    moon: `<circle cx="86" cy="82" r="34" fill="${body}"/><circle cx="100" cy="74" r="26" fill="${start}"/><circle cx="72" cy="94" r="5" fill="rgba(255,255,255,0.32)"/>`,
    comet: `<circle cx="102" cy="64" r="16" fill="${body}"/><path d="M92 72 Q54 78 34 112 Q62 94 96 88" fill="${accent}"/>`,
    alien: `<ellipse cx="80" cy="82" rx="26" ry="32" fill="${body}"/><ellipse cx="68" cy="82" rx="8" ry="12" fill="#23304a"/><ellipse cx="92" cy="82" rx="8" ry="12" fill="#23304a"/><path d="M68 102 Q80 110 92 102" stroke="#23304a" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M72 52 L64 40 M88 52 L96 40" stroke="${accent}" stroke-width="5" stroke-linecap="round"/>`,
    satellite: `<rect x="60" y="70" width="40" height="28" rx="8" fill="${body}"/><rect x="30" y="66" width="24" height="32" rx="4" fill="${accent}"/><rect x="106" y="66" width="24" height="32" rx="4" fill="${accent}"/><path d="M80 54 V70" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle cx="80" cy="84" r="6" fill="#fff"/>`,
    sun: `<circle cx="80" cy="84" r="28" fill="${body}"/><path d="M80 34 V48 M80 120 V134 M34 84 H48 M112 84 H126 M48 52 L58 62 M102 106 L112 116 M48 116 L58 106 M102 62 L112 52" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>`,
    earth: `<circle cx="80" cy="84" r="30" fill="${body}"/><path d="M62 74 Q72 54 88 66 Q96 72 98 82 Q84 84 80 96 Q64 92 62 74 Z" fill="${accent}"/><path d="M92 96 Q104 96 106 108 Q94 118 82 110 Z" fill="${accent}"/>`,
    telescope: `<path d="M56 72 L108 56 L116 74 L64 90 Z" fill="${body}"/><path d="M76 92 L62 126 M92 88 L102 126" stroke="${accent}" stroke-width="7" stroke-linecap="round"/><circle cx="112" cy="66" r="8" fill="#fff"/>`,
    astronaut: `<circle cx="80" cy="74" r="24" fill="#fff"/><rect x="56" y="96" width="48" height="28" rx="14" fill="${body}"/><circle cx="80" cy="74" r="14" fill="${accent}"/><path d="M60 122 L54 136 M100 122 L106 136" stroke="#fff" stroke-width="7" stroke-linecap="round"/>`,
  };
  return image(shapes[kind], start, end);
}

function treat(kind, colors) {
  const [start, end, body, accent] = colors;
  const shapes = {
    cupcake: `<path d="M58 98 H102 L96 126 H64 Z" fill="${accent}"/><path d="M50 98 Q52 68 80 68 Q108 68 110 98 Z" fill="${body}"/><path d="M70 58 Q80 42 90 58" stroke="#ff7aa7" stroke-width="8" fill="none" stroke-linecap="round"/>`,
    donut: `<circle cx="80" cy="88" r="34" fill="${body}"/><circle cx="80" cy="88" r="14" fill="${start}"/><path d="M52 76 Q80 56 108 76" stroke="${accent}" stroke-width="8" stroke-linecap="round" fill="none"/>`,
    icecream: `<path d="M70 82 L90 82 L84 122 H76 Z" fill="#c98a45"/><circle cx="80" cy="70" r="18" fill="${body}"/><circle cx="66" cy="82" r="14" fill="${accent}"/><circle cx="94" cy="82" r="14" fill="#fff2b4"/>`,
    cookie: `<circle cx="80" cy="86" r="32" fill="${body}"/><circle cx="66" cy="74" r="4" fill="${accent}"/><circle cx="90" cy="68" r="4" fill="${accent}"/><circle cx="94" cy="92" r="4" fill="${accent}"/><circle cx="70" cy="96" r="4" fill="${accent}"/>`,
    strawberry: `<path d="M80 50 Q110 58 104 90 Q98 122 80 126 Q62 122 56 90 Q50 58 80 50 Z" fill="${body}"/><path d="M66 50 Q80 38 94 50" stroke="${accent}" stroke-width="8" fill="none" stroke-linecap="round"/><circle cx="70" cy="80" r="2" fill="#fff"/><circle cx="88" cy="92" r="2" fill="#fff"/><circle cx="84" cy="74" r="2" fill="#fff"/>`,
    watermelon: `<path d="M48 104 Q80 48 112 104 Z" fill="${body}"/><path d="M52 100 Q80 56 108 100" fill="#ff6b7d"/><circle cx="70" cy="88" r="3" fill="#23304a"/><circle cx="82" cy="78" r="3" fill="#23304a"/><circle cx="94" cy="88" r="3" fill="#23304a"/>`,
    cherry: `<circle cx="66" cy="96" r="18" fill="${body}"/><circle cx="94" cy="96" r="18" fill="${accent}"/><path d="M66 78 Q74 54 86 50 M94 78 Q92 56 86 50" stroke="#4ea95c" stroke-width="6" fill="none" stroke-linecap="round"/>`,
    lemon: `<ellipse cx="80" cy="88" rx="34" ry="24" fill="${body}"/><path d="M48 88 L38 80 L38 96 Z M112 88 L122 80 L122 96 Z" fill="${accent}"/>`,
    apple: `<circle cx="80" cy="90" r="28" fill="${body}"/><circle cx="96" cy="82" r="20" fill="${body}"/><path d="M80 56 Q84 44 92 40" stroke="#6f4a31" stroke-width="6" stroke-linecap="round"/><path d="M90 44 Q104 42 110 54" stroke="${accent}" stroke-width="8" stroke-linecap="round" fill="none"/>`,
    pineapple: `<ellipse cx="80" cy="96" rx="26" ry="34" fill="${body}"/><path d="M80 42 L70 60 L80 56 L90 60 Z M64 54 L58 70 L72 64 Z M96 54 L102 70 L88 64 Z" fill="${accent}"/><path d="M68 78 L92 114 M92 78 L68 114" stroke="rgba(255,255,255,0.34)" stroke-width="4"/>`,
    banana: `<path d="M54 96 Q74 52 110 74 Q92 116 54 96 Z" fill="${body}"/><path d="M58 94 Q78 64 104 78" stroke="${accent}" stroke-width="4" fill="none" stroke-linecap="round"/>`,
    grapes: `<circle cx="80" cy="66" r="14" fill="${body}"/><circle cx="64" cy="88" r="14" fill="${body}"/><circle cx="80" cy="88" r="14" fill="${accent}"/><circle cx="96" cy="88" r="14" fill="${body}"/><circle cx="72" cy="110" r="14" fill="${accent}"/><circle cx="88" cy="110" r="14" fill="${body}"/><path d="M80 46 Q86 38 98 40" stroke="#4ea95c" stroke-width="6" stroke-linecap="round"/>`,
  };
  return image(shapes[kind], start, end);
}

function createCategory(buttonImage, badgeImage, cards) {
  return { buttonImage, badgeImage, cards };
}

export const CATEGORY_ART = {
  animals: createCategory(
    animal("lion", ["#fff0d7", "#ffd4a6", "#ffd98c", "#ff9b59"]),
    animal("unicorn", ["#f7e8ff", "#e6d5ff", "#ffffff", "#ff8ecf"]),
    [
      { label: "Lion", image: animal("lion", ["#fff0d7", "#ffd4a6", "#ffd98c", "#ff9b59"]) },
      { label: "Panda", image: animal("panda", ["#f2f5fb", "#dfe8f5", "#ffffff", "#23304a"]) },
      { label: "Fox", image: animal("fox", ["#fff4df", "#ffd6a9", "#ff9e57", "#fff4df"]) },
      { label: "Frog", image: animal("frog", ["#ecffd7", "#cfff9d", "#74cf61", "#d9ff9f"]) },
      { label: "Monkey", image: animal("monkey", ["#fff0df", "#ffd8b6", "#8e5a39", "#b9774b"]) },
      { label: "Unicorn", image: animal("unicorn", ["#f7e8ff", "#e6d5ff", "#ffffff", "#ff8ecf"]) },
      { label: "Koala", image: animal("koala", ["#edf2f8", "#d9e0ef", "#b1bbcf", "#6b7691"]) },
      { label: "Bunny", image: animal("bunny", ["#fff7fb", "#ffe3ef", "#ffffff", "#ffc1d8"]) },
      { label: "Tiger", image: animal("tiger", ["#fff1d7", "#ffd2a2", "#ffb347", "#23304a"]) },
      { label: "Bear", image: animal("bear", ["#fff2e0", "#e6cfbb", "#8f6548", "#6f4b32"]) },
      { label: "Cat", image: animal("cat", ["#fff0f2", "#ffd6dd", "#f0a1ae", "#d06f86"]) },
      { label: "Dog", image: animal("dog", ["#fff1dd", "#ffd4ad", "#d6a16a", "#a26c48"]) },
    ],
  ),
  ocean: createCategory(
    ocean("dolphin", ["#dff7ff", "#b7e7ff", "#51a9e8", "#93d9ff"]),
    ocean("whale", ["#dbf6ff", "#b6e3ff", "#4d8fe3", "#7be1ff"]),
    [
      { label: "Whale", image: ocean("whale", ["#dbf6ff", "#b6e3ff", "#4d8fe3", "#7be1ff"]) },
      { label: "Fish", image: ocean("fish", ["#eefcff", "#d1f0ff", "#ffb347", "#ff7b54"]) },
      { label: "Crab", image: ocean("crab", ["#fff2e8", "#ffd5bf", "#ff6f61", "#ff9e80"]) },
      { label: "Turtle", image: ocean("turtle", ["#eefee3", "#cdf4a2", "#60b76d", "#9ce6a6"]) },
      { label: "Octopus", image: ocean("octopus", ["#f7e6ff", "#dfcbff", "#ad70ff", "#d3adff"]) },
      { label: "Starfish", image: ocean("starfish", ["#fff7df", "#ffeab3", "#ffb347", "#ffd98d"]) },
      { label: "Jellyfish", image: ocean("jelly", ["#f4edff", "#ddd5ff", "#7f8cff", "#b9c0ff"]) },
      { label: "Shell", image: ocean("shell", ["#fff4ea", "#ffd9c7", "#ffb49a", "#ffe1d5"]) },
      { label: "Seahorse", image: ocean("seahorse", ["#fff0de", "#ffd8aa", "#f6a84f", "#ffc97a"]) },
      { label: "Submarine", image: ocean("submarine", ["#ebf6ff", "#d2ecff", "#ffd45e", "#4aa6ff"]) },
      { label: "Coral", image: ocean("coral", ["#fff0f4", "#ffd3e0", "#ff789e", "#ffb8ca"]) },
      { label: "Dolphin", image: ocean("dolphin", ["#dff7ff", "#b7e7ff", "#51a9e8", "#93d9ff"]) },
    ],
  ),
  space: createCategory(
    space("rocket", ["#f1e9ff", "#d4caff", "#ff6f61", "#5b7cff"]),
    space("planet", ["#efe7ff", "#d8ccff", "#7c5cff", "#ffbf47"]),
    [
      { label: "Rocket", image: space("rocket", ["#f1e9ff", "#d4caff", "#ff6f61", "#5b7cff"]) },
      { label: "Planet", image: space("planet", ["#efe7ff", "#d8ccff", "#7c5cff", "#ffbf47"]) },
      { label: "Star", image: space("star", ["#fff5d8", "#ffe7a8", "#ffd25f", "#ffb347"]) },
      { label: "UFO", image: space("ufo", ["#edf2ff", "#d6deff", "#57d3a1", "#7c5cff"]) },
      { label: "Moon", image: space("moon", ["#eef2ff", "#d9e0ff", "#fff2c2", "#c7d0ff"]) },
      { label: "Comet", image: space("comet", ["#eaf6ff", "#cee9ff", "#ff9e80", "#8fd3ff"]) },
      { label: "Alien", image: space("alien", ["#efffe5", "#d3ffb7", "#7ed957", "#ff8a65"]) },
      { label: "Satellite", image: space("satellite", ["#edf2ff", "#d8deff", "#7c8db5", "#ffd25f"]) },
      { label: "Sun", image: space("sun", ["#fff6de", "#ffe4a8", "#ffbf47", "#ff8a65"]) },
      { label: "Earth", image: space("earth", ["#e8f8ff", "#d0eeff", "#4a90e2", "#6ecb7b"]) },
      { label: "Telescope", image: space("telescope", ["#f1efff", "#ddd9ff", "#6b7691", "#b78cff"]) },
      { label: "Astronaut", image: space("astronaut", ["#edf3ff", "#dbe6ff", "#7c8db5", "#8fd3ff"]) },
    ],
  ),
  treats: createCategory(
    treat("cupcake", ["#ffeaf1", "#ffd3e1", "#ff9cc1", "#8ac6ff"]),
    treat("donut", ["#fff0e0", "#ffd9bc", "#ff9b9b", "#8fd3ff"]),
    [
      { label: "Cupcake", image: treat("cupcake", ["#ffeaf1", "#ffd3e1", "#ff9cc1", "#8ac6ff"]) },
      { label: "Donut", image: treat("donut", ["#fff0e0", "#ffd9bc", "#ff9b9b", "#8fd3ff"]) },
      { label: "Ice Cream", image: treat("icecream", ["#fff7e8", "#ffe7b5", "#8fd3ff", "#ff9cc1"]) },
      { label: "Cookie", image: treat("cookie", ["#fff1dd", "#ffd8ae", "#c68b59", "#8a5a3b"]) },
      { label: "Strawberry", image: treat("strawberry", ["#fff0f0", "#ffd8d8", "#ff5e7e", "#5cc16a"]) },
      { label: "Watermelon", image: treat("watermelon", ["#fff2f4", "#ffd6dc", "#6cc36f", "#23304a"]) },
      { label: "Cherry", image: treat("cherry", ["#fff0f4", "#ffd7e0", "#ff516a", "#d83d5a"]) },
      { label: "Lemon", image: treat("lemon", ["#fff8dd", "#fff0aa", "#ffd95e", "#ffbf47"]) },
      { label: "Apple", image: treat("apple", ["#fff1ee", "#ffd9d2", "#ff6b5c", "#7bc96f"]) },
      { label: "Pineapple", image: treat("pineapple", ["#fff7df", "#ffeab0", "#ffcc4d", "#70bf5a"]) },
      { label: "Banana", image: treat("banana", ["#fffbe7", "#fff0b5", "#ffd95e", "#ffbf47"]) },
      { label: "Grapes", image: treat("grapes", ["#f6ecff", "#e1d1ff", "#7c5cff", "#a984ff"]) },
    ],
  ),
};
