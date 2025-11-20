// Bilanz-Casino App Script
// Dieses Script implementiert die Kernlogik für das Bilanz-Casino-Quiz.

(() => {
  // ---------------------- Daten ----------------------
  // Fragenkatalog
  const questions = [
    { id: 1, q: "Was beschreibt 'Bilanzierung' im engeren Sinn am besten?", options: [
        "Bilanz, GuV und Anhang zusammen",
        "Nur die Bilanz (Ansatz und Bewertung der Bilanzposten)",
        "Nur die GuV",
        "Die Durchführung der Inventur"
      ], a: 1 },
    { id: 2, q: "Welche Bestandteile hat der Jahresabschluss einer mittelgroßen GmbH?", options: [
        "Nur Bilanz und GuV",
        "Bilanz, GuV und Anhang",
        "Bilanz, GuV, Anhang und Lagebericht",
        "Nur Bilanz"
      ], a: 2 },
    { id: 3, q: "Welcher Adressat und welches Motiv passen gut zusammen?", options: [
        "Bank – Prüfung der Kreditwürdigkeit",
        "Finanzamt – Gläubigerschutz",
        "Kunden – Festlegung des Steuersatzes",
        "Mitarbeiter – Berechnung der Umsatzsteuer"
      ], a: 0 },
    { id: 4, q: "Wer ist für die FESTSTELLUNG des Jahresabschlusses verantwortlich?", options: [
        "Geschäftsführer / Vorstand",
        "Gesellschafterversammlung bzw. Hauptversammlung",
        "Wirtschaftsprüfer",
        "Finanzamt"
      ], a: 1 },
    { id: 5, q: "Was wird letztlich aus Inventur und Inventar in die Bilanz übernommen?", options: [
        "Nur geschätzte Bestände",
        "Nur die Zahlungsströme des Jahres",
        "Die durch Inventur bestätigten Bestände aus dem Inventar",
        "Nur Forderungen und Verbindlichkeiten"
      ], a: 2 },
    { id: 6, q: "Welcher Grundsatz ordnungsmäßiger Inventurdurchführung ist korrekt?", options: [
        "Vier-Augen-Prinzip: Einer zählt, einer schreibt mit",
        "Nur stichprobenartige Aufnahme ist erlaubt",
        "Es dürfen keine physischen Bestände gezählt werden",
        "Die Inventur erfolgt nur rechnerisch aus der Buchhaltung"
      ], a: 0 },
    { id: 7, q: "Der GF will dem Inventurteam die Buchhaltungsbestände zur Kontrolle geben. Bewertung?", options: [
        "Gut, so spart man sich das Zählen vor Ort",
        "Zulässig, wenn der Steuerberater zustimmt",
        "Unzulässig, da die Bestände physisch aufgenommen werden müssen",
        "Nur bei kleinen Unternehmen erlaubt"
      ], a: 2 },
    { id: 8, q: "'Bilanzierung dem Grunde nach' bedeutet…", options: [
        "… die Bewertung eines Vermögensgegenstands der Höhe nach",
        "… die Frage, OB etwas überhaupt in die Bilanz kommt (Ansatz)",
        "… die Wahl der Abschreibungsmethode",
        "… die Ermittlung der Steuerlast"
      ], a: 1 },
    { id: 9, q: "Warum können Forschungsaufwendungen i.d.R. nicht aktiviert werden?", options: [
        "Weil sie immer steuerfrei sind",
        "Weil sie meist zu allgemein sind und kein klar abgrenzbarer Vermögensgegenstand entsteht",
        "Weil sie immer zu Entwicklungskosten gehören",
        "Weil das HGB sie verbietet, das Steuerrecht aber zwingend verlangt"
      ], a: 1 },
    { id: 10, q: "Welches Beispiel passt gut zum Imparitätsprinzip?", options: [
        "Gewinne werden schon bei Bestellung erfasst",
        "Drohende Verluste sind bereits vor Realisation zu berücksichtigen",
        "Nur realisierte Verluste werden gebucht",
        "Abschreibungen dürfen nie vorgenommen werden"
      ], a: 1 },
    { id: 11, q: "Das Vorsichtsprinzip bedeutet vor allem…", options: [
        "… der Kaufmann soll sich eher ärmer als reicher rechnen",
        "… Gewinne sind möglichst früh zu zeigen",
        "… alle Vermögenswerte sind stets zum Höchstwert zu bewerten",
        "… Schulden werden immer ignoriert"
      ], a: 0 },
    { id: 12, q: "Worauf bezieht sich das Realisationsprinzip zeitlich bei Umsätzen?", options: [
        "Auf den Zeitpunkt der Bestellung",
        "Auf den Zeitpunkt des Zahlungseingangs",
        "Auf den Zeitpunkt von Lieferung/Leistung (Gefahrenübergang)",
        "Auf das Geschäftsjahresende"
      ], a: 2 },
    { id: 13, q: "Welche Funktion hat das Imparitätsprinzip bei schwebenden Geschäften?", options: [
        "Keine, es ist nur für Anlagevermögen relevant",
        "Es sorgt für die Erfassung drohender Verluste (Nieder-/Höchstwertprinzip)",
        "Es regelt die Umsatzsteuer",
        "Es beschreibt nur die lineare Abschreibung"
      ], a: 1 },
    { id: 14, q: "Welche Bilanzposten ergeben sich typischerweise aus dem Periodisierungsgrundsatz?", options: [
        "Rückstellungen und Verbindlichkeiten",
        "Aktive und passive Rechnungsabgrenzungsposten (ARAP/PRAP)",
        "Eigenkapital und Gewinnrücklagen",
        "Sachanlagen und Vorräte"
      ], a: 1 },
    { id: 15, q: "Was unterscheidet Anschaffungs- von Herstellungskosten?", options: [
        "Anschaffungskosten entstehen bei Kauf, Herstellungskosten bei Eigenfertigung",
        "Herstellungskosten entstehen nur bei Dienstleistungen",
        "Es gibt keinen Unterschied",
        "Anschaffungskosten sind immer niedriger"
      ], a: 0 },
    { id: 16, q: "Wann wirken sich Investitionen (AK/HK) typischerweise erfolgswirksam aus?", options: [
        "Beim Zugang über die Bilanzaktivierung",
        "Erst über Abschreibungen und ggf. über Aktivierungserträge bei HK",
        "Nur beim Verkauf des Vermögensgegenstands",
        "Nie, sie sind immer erfolgsneutral"
      ], a: 1 },
    { id: 17, q: "Wodurch sind planmäßige und außerplanmäßige Abschreibungen begründet?", options: [
        "Planmäßig: Vorsichts- und Periodenprinzip; außerplanmäßig: Imparitätsprinzip",
        "Beide nur durch das Realisationsprinzip",
        "Nur durch steuerliche Sonderabschreibungen",
        "Gar nicht, sie sind freiwillig"
      ], a: 0 },
    { id: 18, q: "Eine Maschine (RBW 5.000 €) wird nicht mehr genutzt, Produkte unverkäuflich. Was ist korrekt?", options: [
        "Sie bleibt unverändert im Anlagevermögen",
        "Sie wird außerplanmäßig abgeschrieben und ggf. verkauft/verschrottet",
        "Sie wird in die GuV umgebucht",
        "Es passiert nichts, solange kein Käufer da ist"
      ], a: 1 },
    { id: 19, q: "Warum gibt es keine planmäßigen Abschreibungen auf das Umlaufvermögen?", options: [
        "Weil UV nie an Wert verliert",
        "Weil UV nicht länger als ein Jahr im Unternehmen bleibt",
        "Weil UV immer steuerfrei ist",
        "Weil UV nicht bewertbar ist"
      ], a: 1 },
    { id: 20, q: "Wie werden selbst geschaffene immaterielle VG des AV (Entwicklungskosten) nach HGB behandelt?", options: [
        "Strenges Aktivierungsverbot",
        "Aktivierungswahlrecht mit Ansatzstetigkeit",
        "Aktivierungspflicht in jedem Fall",
        "Dürfen nur steuerlich aktiviert werden"
      ], a: 1 },
    { id: 21, q: "Was bewirkt die Aktivierung von Entwicklungskosten in der GuV?", options: [
        "Der Aufwand steigt um den Entwicklungsbetrag",
        "Es entstehen Erträge aus der Aktivierung von Entwicklungskosten",
        "Es hat keinen Einfluss auf das Ergebnis",
        "Nur die Steuerlast sinkt"
      ], a: 1 },
    { id: 22, q: "Was beschreibt Ansatzstetigkeit nach § 246 Abs. 3 HGB?", options: [
        "Gleiche Bewertung in allen Jahren",
        "Dass einmal gewählte Aktivierungsentscheidungen beibehalten werden",
        "Dass Abschreibungsmethoden ständig gewechselt werden",
        "Dass Vermögensgegenstände jährlich neu definiert werden"
      ], a: 1 },
    { id: 23, q: "Was ist ein Geschäfts- oder Firmenwert (GoF) in der Bilanz?", options: [
        "Differenz zwischen Kaufpreis und Zeitwert der übernommenen Nettovermögenswerte",
        "Die Summe aller Vorräte",
        "Der Wert der Markenrechte aus Eigenentwicklung",
        "Die Differenz zwischen Eigenkapital und Gewinnrücklagen"
      ], a: 0 },
    { id: 24, q: "Wie lange wird ein derivativer GoF nach HGB typischerweise abgeschrieben?", options: [
        "Maximal 3 Jahre",
        "Maximal 5 Jahre",
        "In der Regel über 10 Jahre (§ 253 Abs. 3 HGB)",
        "Gar nicht, er bleibt unverändert"
      ], a: 2 },
    { id: 25, q: "Welche Bewertungsvereinfachungsverfahren gibt es z.B. für Vorräte?", options: [
        "LIFO, FIFO und Durchschnittsbewertung",
        "Nur Einzelbewertung",
        "Nur Niederstwertprinzip",
        "Nur Zeitwertverfahren"
      ], a: 0 },
    { id: 26, q: "Was unterstellt das FIFO-Verfahren?", options: [
        "First In, First Out – zuerst gekaufte Güter werden zuerst verbraucht",
        "Last In, First Out – zuletzt gekaufte Güter werden zuerst verbraucht",
        "Alle Güter werden gleichzeitig verbraucht",
        "Güter werden nie verbraucht"
      ], a: 0 },
    { id: 27, q: "Was trifft auf Rückstellungen zu?", options: [
        "Es handelt sich um ungewisse Verbindlichkeiten",
        "Sie gehören sicher zum Eigenkapital",
        "Es handelt sich um bereits bezahlte Aufwendungen",
        "Sie sind immer steuerlich nicht abzugsfähig"
      ], a: 0 },
    { id: 28, q: "Warum stehen Rückstellungen in § 266 HGB zwischen Eigen- und Fremdkapital?", options: [
        "Weil sie teils Eigenkapital sind",
        "Weil noch unklar ist, ob und in welcher Höhe eine Inanspruchnahme erfolgt",
        "Weil sie wie Vorräte behandelt werden",
        "Weil sie keine Schulden sind"
      ], a: 1 },
    { id: 29, q: "Wie werden Drohverlustrückstellungen handels- und steuerrechtlich behandelt?", options: [
        "HGB: Pflicht zur Bildung; Steuerrecht: Abzugsverbot (§ 4 Abs. 5b EStG)",
        "In beiden Rechnungswerken Pflicht",
        "In beiden Rechnungswerken verboten",
        "Nur steuerlich erlaubt"
      ], a: 0 },
    { id: 30, q: "Warum werden Rückstellungen mit Restlaufzeit > 1 Jahr abgezinst?", options: [
        "Um sie künstlich zu erhöhen",
        "Weil ein ordentlicher Kaufmann den Barwert der zukünftigen Verpflichtung ansetzt",
        "Weil das Steuerrecht es so will",
        "Nur um die GuV zu verschönern"
      ], a: 1 },
    { id: 31, q: "Klage ist eingegangen, Anwalt rechnet mit Schadenersatz: Was ist mit der Rückstellung?", options: [
        "Keine Rückstellung, da noch unklar",
        "Rückstellung muss passiviert werden (§ 249 HGB)",
        "Nur Eventualverbindlichkeit im Anhang",
        "Gar nichts zu tun"
      ], a: 1 },
    { id: 32, q: "Was ist das Grundprinzip der latenten Steuerabgrenzung?", options: [
        "Vergleich HGB- und Steuerbilanzwerte und Ausgleich temporärer Differenzen",
        "Nur Ermittlung der Umsatzsteuer",
        "Nur Bildung von Rückstellungen",
        "Nur Ermittlung der Körperschaftsteuer"
      ], a: 0 },
    { id: 33, q: "Wann entstehen AKTIVE latente Steuern?", options: [
        "Wenn der Kaufmann nach HGB reicher ist als steuerlich",
        "Wenn der Kaufmann nach HGB ärmer ist als steuerlich (z.B. Drohverlustrückstellungen)",
        "Nur bei Vorratsabschreibungen",
        "Nur bei der Umsatzsteuer"
      ], a: 1 },
    { id: 34, q: "Wann entstehen PASSIVE latente Steuern?", options: [
        "Wenn der Kaufmann nach HGB reicher ist als steuerlich (z.B. aktivierte Entwicklungskosten)",
        "Wenn er nach HGB ärmer ist als steuerlich",
        "Nur bei Verlusten",
        "Nie, sie sind abgeschafft"
      ], a: 0 },
    { id: 35, q: "Was unterscheidet Gesamtkosten- vom Umsatzkostenverfahren in der GuV?", options: [
        "Gesamtkostenverfahren braucht keine Kostenrechnung, Umsatzkostenverfahren schon",
        "Beide sind identisch",
        "Umsatzkostenverfahren ist nur steuerlich zulässig",
        "Gesamtkostenverfahren ist verboten"
      ], a: 0 },
    { id: 36, q: "Welche Funktion hat der Anhang?", options: [
        "Er ersetzt Bilanz und GuV",
        "Er erläutert und ergänzt Zahlen aus Bilanz und GuV (vergangenheitsorientiert)",
        "Er beschreibt nur die Zukunft",
        "Er ist nur für das Finanzamt bestimmt"
      ], a: 1 },
    { id: 37, q: "Welche Funktion hat der Lagebericht?", options: [
        "Nur Darstellung vergangener Zahlen",
        "Nur Prognose der Zukunft",
        "Vergangenheit + Zukunft (Geschäftsverlauf und künftige Risiken/Entwicklungen)",
        "Nur Steuerberechnung"
      ], a: 2 },
    { id: 38, q: "Warum müssen bestimmte Jahresabschlüsse von einem Wirtschaftsprüfer geprüft werden?", options: [
        "Wegen Gläubigerschutz und Vorsichtsprinzip",
        "Nur wegen der Einkommensteuer",
        "Nur für Marketingzwecke",
        "Weil das Unternehmen das möchte"
      ], a: 0 },
    { id: 39, q: "Warum müssen bestimmte Unternehmen ihren Jahresabschluss offenlegen?", options: [
        "Wegen Gläubigerschutz und Transparenz (Vorsichtsprinzip)",
        "Nur wegen der Umsatzsteuer",
        "Nur für Aktionärstreffen",
        "Es ist freiwillig"
      ], a: 0 }
  ];

  // Welten (Themenbereiche)
  const worlds = [
    {
      id: "W1",
      name: "World 1 – Basics",
      desc: "Bilanzierung, Jahresabschluss, Adressaten, Inventur/Inventar.",
      levelHint: "Einsteiger",
      questionIds: [1, 2, 3, 4, 5, 6, 7, 8]
    },
    {
      id: "W2",
      name: "World 2 – GoB & Prinzipien",
      desc: "Vorsicht, Realisation, Imparität, Periodisierung, AK/HK.",
      levelHint: "Aufbau",
      questionIds: [9, 10, 11, 12, 13, 14, 15, 16, 17]
    },
    {
      id: "W3",
      name: "World 3 – AV/UV & Abschreibungen",
      desc: "Anlagevermögen, Umlaufvermögen, AfA, Bewertungsverfahren.",
      levelHint: "Fortgeschritten",
      questionIds: [18, 19, 20, 21, 22, 23, 24, 25, 26]
    },
    {
      id: "W4",
      name: "World 4 – RSt & latente Steuern",
      desc: "Rückstellungen, Drohverluste, Abzinsung, latente Steuern.",
      levelHint: "Pro-Level",
      questionIds: [27, 28, 29, 30, 31, 32, 33, 34]
    },
    {
      id: "W5",
      name: "World 5 – GuV, Anhang & Lagebericht",
      desc: "GuV-Formen, Anhang, Lagebericht, Prüfung & Offenlegung.",
      levelHint: "Experte",
      questionIds: [35, 36, 37, 38, 39]
    }
  ];

  // ---------------------- Audio Setup ----------------------
  const bgMusic = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
  bgMusic.loop = true;
  const correctSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2005/2005-preview.mp3");
  const wrongSound = new Audio("https://assets.mixkit.co/active_storage/sfx/903/903-preview.mp3");
  const bigWinSound = new Audio("https://assets.mixkit.co/active_storage/sfx/763/763-preview.mp3");

  let musicOn = localStorage.getItem('bc_music_on') !== 'false';
  // Set volume based on musicOn flag
  function updateMusic() {
    bgMusic.volume = musicOn ? 0.12 : 0;
    document.getElementById('musicToggleLabel').textContent = musicOn ? 'On' : 'Off';
    if (musicToggleLabelQuizEl) {
      musicToggleLabelQuizEl.textContent = musicOn ? 'On' : 'Off';
    }
  }

  // Start playing background music once user interacts
  let audioStarted = false;
  function ensureAudioStarted() {
    if (!audioStarted) {
      try {
        bgMusic.play();
      } catch (e) {
        // ignore errors if not allowed to autoplay
      }
      audioStarted = true;
    }
  }

  // ---------------------- State ----------------------
  let users = [];
  let currentUser = null;
  let currentWorld = null;
  let currentIndex = 0;
  let xp = 0;
  let streak = 0;
  let bestStreak = 0;
  let lives = 3;
  let jokerUsed = false;
  let showResult = false;
  let lastCorrect = null;

  // Container where questions will be rendered. Defaults to home view's question area.
  let currentQuestionContainerId = 'questionArea';

  const XP_PER_CORRECT = 10;

  // ---------------------- Level / Progress helpers ----------------------
  function getLevel(xpValue) {
    if (xpValue >= 250) return 7;
    if (xpValue >= 200) return 6;
    if (xpValue >= 150) return 5;
    if (xpValue >= 100) return 4;
    if (xpValue >= 60) return 3;
    if (xpValue >= 30) return 2;
    if (xpValue >= 10) return 1;
    return 0;
  }

  function getLevelProgress(xpValue) {
    const lvl = getLevel(xpValue);
    const nextXP = lvl === 0 ? 10 : lvl === 1 ? 30 : lvl === 2 ? 60 : lvl === 3 ? 100 : lvl === 4 ? 150 : lvl === 5 ? 200 : 250;
    const prevXP = lvl === 0 ? 0 : lvl === 1 ? 10 : lvl === 2 ? 30 : lvl === 3 ? 60 : lvl === 4 ? 100 : lvl === 5 ? 150 : 200;
    const span = nextXP - prevXP;
    const done = xpValue - prevXP;
    return Math.max(0, Math.min(1, done / span));
  }

  // ---------------------- DOM references ----------------------
  const levelValueEl = document.getElementById('levelValue');
  const levelProgressEl = document.getElementById('levelProgress');
  const livesLabelEl = document.getElementById('livesLabel');
  const streakLabelEl = document.getElementById('streakLabel');
  const xpLabelEl = document.getElementById('xpLabel');
  const statXpEl = document.getElementById('statXp');
  const statStreakEl = document.getElementById('statStreak');
  const statBestStreakEl = document.getElementById('statBestStreak');
  const statWorldEl = document.getElementById('statWorld');
  const statUserEl = document.getElementById('statUser');
  const worldsListEl = document.getElementById('worldsList');
  const leaderboardEl = document.getElementById('leaderboard');
  const restartBtn = document.getElementById('restartBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const overlayEl = document.getElementById('overlay');
  const overlayBtn = document.getElementById('overlayBtn');
  const overlayEmojiEl = document.getElementById('overlayEmoji');
  const overlayTitleEl = document.getElementById('overlayTitle');
  const overlaySubEl = document.getElementById('overlaySub');
  const overlayLevelEl = document.getElementById('overlayLevel');
  const overlayXpEl = document.getElementById('overlayXp');
  const overlayBestStreakEl = document.getElementById('overlayBestStreak');
  const overlayLivesEl = document.getElementById('overlayLives');
  const authOverlayEl = document.getElementById('authOverlay');
  const authMessageEl = document.getElementById('authMessage');
  const authUsernameEl = document.getElementById('authUsername');
  const authPasswordEl = document.getElementById('authPassword');
  const loginBtn = document.getElementById('loginBtn');
  const registerBtn = document.getElementById('registerBtn');
  const musicToggleEl = document.getElementById('musicToggle');

  // Additional DOM references for quiz view (duplicates of stats and labels)
  const levelValueQuizEl = document.getElementById('levelValueQuiz');
  const levelProgressQuizEl = document.getElementById('levelProgressQuiz');
  const livesLabelQuizEl = document.getElementById('livesLabelQuiz');
  const streakLabelQuizEl = document.getElementById('streakLabelQuiz');
  const xpLabelQuizEl = document.getElementById('xpLabelQuiz');
  const statXpQuizEl = document.getElementById('statXpQuiz');
  const statStreakQuizEl = document.getElementById('statStreakQuiz');
  const statBestStreakQuizEl = document.getElementById('statBestStreakQuiz');
  const statWorldQuizEl = document.getElementById('statWorldQuiz');
  const statUserQuizEl = document.getElementById('statUserQuiz');
  const leaderboardQuizEl = document.getElementById('leaderboardQuiz');
  const musicToggleQuizEl = document.getElementById('musicToggleQuiz');
  const musicToggleLabelQuizEl = document.getElementById('musicToggleLabelQuiz');

  // Elements for bottom navigation
  const navButtons = document.querySelectorAll('.nav-btn');

  // Profile overlay elements
  const profileOverlayEl = document.getElementById('profileOverlay');
  const profileMessageEl = document.getElementById('profileMessage');
  const profileUsernameEl = document.getElementById('profileUsername');
  const profilePasswordEl = document.getElementById('profilePassword');
  const profileSaveBtn = document.getElementById('profileSaveBtn');
  const profileCancelBtn = document.getElementById('profileCancelBtn');

  // Views
  const homeViewEl = document.getElementById('homeView');
  const quizViewEl = document.getElementById('quizView');
  const flashViewEl = document.getElementById('flashView');
  const matchViewEl = document.getElementById('matchView');

  // ---------------------- Storage helpers ----------------------
  function loadUsers() {
    try {
      const stored = localStorage.getItem('bc_users');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  function saveUsers(list) {
    localStorage.setItem('bc_users', JSON.stringify(list));
  }

  function loadCurrentUser() {
    const uname = localStorage.getItem('bc_current_user');
    if (!uname) return null;
    const list = loadUsers();
    return list.find(u => u.username === uname) || null;
  }

  function saveCurrentUser(uname) {
    if (uname) {
      localStorage.setItem('bc_current_user', uname);
    } else {
      localStorage.removeItem('bc_current_user');
    }
  }

  // Update current user stats in the array and persist
  function persistCurrentUserStats() {
    if (!currentUser) return;
    currentUser.xp = xp;
    currentUser.bestStreak = bestStreak;
    // find index and update
    const idx = users.findIndex(u => u.username === currentUser.username);
    if (idx !== -1) {
      users[idx] = currentUser;
      saveUsers(users);
    }
  }

  // ---------------------- UI Rendering ----------------------
  function updateStatsUI() {
    const lvl = getLevel(xp);
    const progress = getLevelProgress(xp);
    // Update home view labels
    levelValueEl.textContent = lvl;
    levelProgressEl.style.width = `${(progress * 100).toFixed(0)}%`;
    livesLabelEl.textContent = lives;
    streakLabelEl.textContent = streak;
    xpLabelEl.textContent = xp;
    statXpEl.textContent = xp;
    statStreakEl.textContent = streak;
    statBestStreakEl.textContent = bestStreak;
    statWorldEl.textContent = currentWorld ? currentWorld.name : '–';
    statUserEl.textContent = currentUser ? currentUser.username : '–';
    // Update quiz view labels if present
    if (levelValueQuizEl) levelValueQuizEl.textContent = lvl;
    if (levelProgressQuizEl) levelProgressQuizEl.style.width = `${(progress * 100).toFixed(0)}%`;
    if (livesLabelQuizEl) livesLabelQuizEl.textContent = lives;
    if (streakLabelQuizEl) streakLabelQuizEl.textContent = streak;
    if (xpLabelQuizEl) xpLabelQuizEl.textContent = xp;
    if (statXpQuizEl) statXpQuizEl.textContent = xp;
    if (statStreakQuizEl) statStreakQuizEl.textContent = streak;
    if (statBestStreakQuizEl) statBestStreakQuizEl.textContent = bestStreak;
    if (statWorldQuizEl) statWorldQuizEl.textContent = currentWorld ? currentWorld.name : '–';
    if (statUserQuizEl) statUserQuizEl.textContent = currentUser ? currentUser.username : '–';
  }

  function renderWorlds() {
    worldsListEl.innerHTML = '';
    worlds.forEach(w => {
      const card = document.createElement('div');
      card.className = 'world-card';
      card.innerHTML = `
        <div class="world-title">${w.name}</div>
        <div class="world-desc">${w.desc}</div>
        <div class="world-meta">${w.questionIds.length} Fragen • ${w.levelHint}</div>
      `;
      card.addEventListener('click', () => {
        ensureAudioStarted();
        startWorld(w.id);
      });
      worldsListEl.appendChild(card);
    });
  }

  function renderLeaderboard() {
    leaderboardEl.innerHTML = '';
    // Sort by xp desc, then bestStreak desc
    const sorted = [...users].sort((a, b) => {
      if (b.xp !== a.xp) return b.xp - a.xp;
      return (b.bestStreak || 0) - (a.bestStreak || 0);
    });
    sorted.forEach((u, idx) => {
      const row = document.createElement('div');
      row.className = 'leader-item' + (currentUser && u.username === currentUser.username ? ' me' : '');
      const left = document.createElement('div');
      const name = document.createElement('div');
      name.className = 'leader-name';
      name.textContent = u.username;
      const sub = document.createElement('div');
      sub.className = 'leader-sub';
      const lvl = getLevel(u.xp || 0);
      sub.textContent = `Level ${lvl} • Streak ${u.bestStreak || 0}`;
      left.appendChild(name);
      left.appendChild(sub);
      const rank = document.createElement('div');
      rank.className = 'leader-rank';
      rank.textContent = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '🎲';
      row.appendChild(left);
      row.appendChild(rank);
      leaderboardEl.appendChild(row);
    });
  }

  // Feedback animation
  let feedbackTimeout = null;
  function showFeedback(text, isGood = true) {
    const feedbackEl = document.getElementById('feedback');
    feedbackEl.textContent = text;
    feedbackEl.className = 'feedback ' + (isGood ? 'good' : 'bad');
    // force reflow to restart animation
    void feedbackEl.offsetWidth;
    feedbackEl.classList.add('visible');
    if (feedbackTimeout) clearTimeout(feedbackTimeout);
    feedbackTimeout = setTimeout(() => {
      feedbackEl.classList.remove('visible');
    }, 700);
  }

  // Helper: get question by id
  function getQuestionById(id) {
    return questions.find(q => q.id === id) || null;
  }

  // 50/50 logic: returns array of option indices to display
  function getVisibleOptionIndices(q) {
    if (!jokerUsed) {
      return q.options.map((_, idx) => idx);
    }
    const correctIdx = q.a;
    const wrongs = q.options.map((_, idx) => idx).filter(i => i !== correctIdx);
    const randomWrong = wrongs[Math.floor(Math.random() * wrongs.length)];
    return [correctIdx, randomWrong].sort((a, b) => a - b);
  }

  // Render the current question or intro
  function renderQuestion() {
    const container = document.getElementById(currentQuestionContainerId);
    container.innerHTML = '';
    if (!currentWorld) {
      // Intro view
      const box = document.createElement('div');
      box.className = 'question-box';
      const meta = document.createElement('div');
      meta.className = 'question-meta';
      meta.textContent = 'Willkommen im Bilanz-Casino';
      const text = document.createElement('div');
      text.className = 'question-text';
      text.textContent = 'Wähle rechts ein World aus, um loszulegen.';
      box.appendChild(meta);
      box.appendChild(text);
      container.appendChild(box);
      return;
    }
    // Get current question
    const qId = currentWorld.questionIds[currentIndex];
    const q = getQuestionById(qId);
    if (!q) return;
    const box = document.createElement('div');
    box.className = 'question-box';
    const meta = document.createElement('div');
    meta.className = 'question-meta';
    meta.textContent = `Frage ${currentIndex + 1} von ${currentWorld.questionIds.length} • ID #${q.id}`;
    const text = document.createElement('div');
    text.className = 'question-text';
    text.textContent = q.q;
    box.appendChild(meta);
    box.appendChild(text);
    const opts = document.createElement('div');
    opts.className = 'options';
    const visible = getVisibleOptionIndices(q);
    visible.forEach(optIdx => {
      const btn = document.createElement('button');
      btn.className = 'btn btn-answer';
      btn.disabled = showResult || lives <= 0;
      btn.addEventListener('click', () => {
        ensureAudioStarted();
        onAnswer(optIdx);
      });
      // Label
      const lab = document.createElement('span');
      lab.className = 'answer-label';
      lab.textContent = String.fromCharCode(65 + optIdx);
      const txt = document.createElement('span');
      txt.textContent = q.options[optIdx];
      btn.appendChild(lab);
      btn.appendChild(txt);
      opts.appendChild(btn);
    });
    box.appendChild(opts);
    // Bottom row with 50/50 and next button / result
    const bottom = document.createElement('div');
    bottom.className = 'bottom-row';
    // Left: 50/50 button and info
    const left = document.createElement('div');
    const jokerBtn = document.createElement('button');
    jokerBtn.className = 'btn';
    jokerBtn.textContent = '🃏 50/50-Joker';
    jokerBtn.disabled = jokerUsed || showResult || lives <= 0;
    jokerBtn.addEventListener('click', () => {
      ensureAudioStarted();
      if (!jokerUsed && !showResult && lives > 0) {
        jokerUsed = true;
        renderQuestion();
      }
    });
    const info = document.createElement('span');
    info.className = 'pill';
    info.textContent = jokerUsed ? 'Joker verbraucht' : 'Reduziert auf 2 Antworten';
    left.appendChild(jokerBtn);
    left.appendChild(info);
    // Right: result text and next button
    const right = document.createElement('div');
    if (showResult) {
      const resSpan = document.createElement('span');
      resSpan.className = 'result-text ' + (lastCorrect ? 'correct' : 'wrong');
      resSpan.textContent = lastCorrect ? '✔ GREAT!' : '✘ Falsch!';
      right.appendChild(resSpan);
      const nextBtn = document.createElement('button');
      nextBtn.className = 'btn';
      nextBtn.style.marginLeft = '8px';
      nextBtn.textContent = 'Nächste Runde 🎲';
      nextBtn.addEventListener('click', () => {
        nextQuestion();
      });
      right.appendChild(nextBtn);
    }
    bottom.appendChild(left);
    bottom.appendChild(right);
    box.appendChild(bottom);
    // Game over message if lives gone
    if (lives <= 0) {
      const over = document.createElement('div');
      over.className = 'game-over-text';
      over.textContent = '💀 Alle Herzen weg – wähle ein neues World oder starte neu.';
      box.appendChild(over);
    }
    container.appendChild(box);
  }

  // Handle answer click
  function onAnswer(optIdx) {
    if (showResult || lives <= 0) return;
    const qId = currentWorld.questionIds[currentIndex];
    const q = getQuestionById(qId);
    if (!q) return;
    const correct = optIdx === q.a;
    showResult = true;
    lastCorrect = correct;
    if (correct) {
      correctSound.currentTime = 0;
      correctSound.play();
      streak++;
      bestStreak = Math.max(bestStreak, streak);
      xp += XP_PER_CORRECT;
      // Show feedback based on streak size
      if (streak >= 5) {
        showFeedback('HOT STREAK!', true);
        bigWinSound.currentTime = 0;
        bigWinSound.play();
      } else if (streak >= 3) {
        showFeedback('GREAT!', true);
      } else {
        showFeedback('Great!', true);
      }
      // Check for end of world
      if (currentIndex === currentWorld.questionIds.length - 1 && lives > 0) {
        // world completed
        setTimeout(() => {
          openWinOverlay();
        }, 350);
      }
    } else {
      wrongSound.currentTime = 0;
      wrongSound.play();
      lives = Math.max(0, lives - 1);
      streak = 0;
      showFeedback('TRY AGAIN!', false);
    }
    updateStatsUI();
    persistCurrentUserStats();
    renderQuestion();
  }

  function nextQuestion() {
    showResult = false;
    lastCorrect = null;
    jokerUsed = false;
    if (!currentWorld) return;
    currentIndex = (currentIndex + 1) % currentWorld.questionIds.length;
    renderQuestion();
  }

  function startWorld(worldId) {
    currentWorld = worlds.find(w => w.id === worldId) || null;
    currentIndex = 0;
    lives = 3;
    streak = 0;
    showResult = false;
    lastCorrect = null;
    jokerUsed = false;
    renderQuestion();
    updateStatsUI();
  }

  function resetGameTotal() {
    currentWorld = null;
    currentIndex = 0;
    streak = 0;
    lives = 3;
    showResult = false;
    lastCorrect = null;
    jokerUsed = false;
    renderQuestion();
    updateStatsUI();
  }

  function openWinOverlay() {
    overlayEmojiEl.textContent = lives > 0 ? '💰' : '💀';
    overlayTitleEl.textContent = lives > 0 ? 'Jackpot!' : 'Game Over';
    overlaySubEl.textContent = lives > 0 ? 'Du hast dieses World stark gespielt.' : 'Dieses World hat dich zerlegt – neue Runde?';
    overlayLevelEl.textContent = getLevel(xp);
    overlayXpEl.textContent = xp;
    overlayBestStreakEl.textContent = bestStreak;
    overlayLivesEl.textContent = lives;
    overlayEl.classList.add('visible');
    bigWinSound.currentTime = 0;
    bigWinSound.play();
  }

  // ---------------------- Auth Handlers ----------------------
  function showAuthOverlay() {
    authOverlayEl.classList.add('visible');
  }
  function hideAuthOverlay() {
    authOverlayEl.classList.remove('visible');
  }
  function clearAuthInputs() {
    authUsernameEl.value = '';
    authPasswordEl.value = '';
  }
  function handleLogin() {
    const uname = authUsernameEl.value.trim();
    const pwd = authPasswordEl.value;
    if (!uname || !pwd) {
      authMessageEl.textContent = 'Bitte Nutzername und Passwort eingeben.';
      return;
    }
    const user = users.find(u => u.username === uname);
    if (!user || user.password !== pwd) {
      authMessageEl.textContent = 'Benutzername oder Passwort falsch.';
      return;
    }
    currentUser = { ...user };
    xp = currentUser.xp || 0;
    bestStreak = currentUser.bestStreak || 0;
    streak = 0;
    lives = 3;
    showResult = false;
    lastCorrect = null;
    jokerUsed = false;
    saveCurrentUser(currentUser.username);
    hideAuthOverlay();
    updateMusic();
    renderWorlds();
    renderLeaderboard();
    updateStatsUI();
    renderQuestion();
    clearAuthInputs();
    authMessageEl.textContent = '';
  }
  function handleRegister() {
    const uname = authUsernameEl.value.trim();
    const pwd = authPasswordEl.value;
    if (!uname || !pwd) {
      authMessageEl.textContent = 'Bitte Nutzername und Passwort eingeben.';
      return;
    }
    if (users.some(u => u.username === uname)) {
      authMessageEl.textContent = 'Benutzername existiert bereits.';
      return;
    }
    const newUser = { username: uname, password: pwd, xp: 0, bestStreak: 0 };
    users.push(newUser);
    saveUsers(users);
    currentUser = { ...newUser };
    xp = 0;
    bestStreak = 0;
    streak = 0;
    lives = 3;
    showResult = false;
    lastCorrect = null;
    jokerUsed = false;
    saveCurrentUser(currentUser.username);
    hideAuthOverlay();
    updateMusic();
    renderWorlds();
    renderLeaderboard();
    updateStatsUI();
    renderQuestion();
    clearAuthInputs();
    authMessageEl.textContent = '';
  }

  // Music toggle
  musicToggleEl.addEventListener('click', () => {
    musicOn = !musicOn;
    localStorage.setItem('bc_music_on', musicOn ? 'true' : 'false');
    updateMusic();
    ensureAudioStarted();
  });

  // Auth events
  loginBtn.addEventListener('click', handleLogin);
  registerBtn.addEventListener('click', handleRegister);
  logoutBtn.addEventListener('click', () => {
    if (!currentUser) return;
    saveCurrentUser(null);
    currentUser = null;
    streak = 0;
    bestStreak = 0;
    xp = 0;
    lives = 3;
    // reset world
    currentWorld = null;
    renderWorlds();
    renderLeaderboard();
    updateStatsUI();
    renderQuestion();
    showAuthOverlay();
  });

  restartBtn.addEventListener('click', () => {
    resetGameTotal();
  });

  overlayBtn.addEventListener('click', () => {
    overlayEl.classList.remove('visible');
    // After overlay, restart current world or reset
    if (currentWorld) {
      startWorld(currentWorld.id);
    } else {
      resetGameTotal();
    }
  });

  // ---------------------- Bottom navigation & view switching ----------------------
  /**
   * Shows the selected view and hides the others. Each view corresponds to a section
   * of the application (home, quiz, flashcards, match, profile). When switching
   * to the quiz view, we also change the question container so that questions
   * render in the appropriate area. The profile view does not have its own
   * content section; instead it opens the profile overlay for editing user
   * information.
   *
   * @param {string} view - one of 'home', 'quiz', 'flash', 'match', 'profile'
   */
  function showView(view) {
    // Toggle main view containers
    homeViewEl.style.display = view === 'home' ? '' : 'none';
    quizViewEl.style.display = view === 'quiz' ? '' : 'none';
    flashViewEl.style.display = view === 'flash' ? '' : 'none';
    matchViewEl.style.display = view === 'match' ? '' : 'none';
    // Show profile overlay when profile is selected
    if (view === 'profile') {
      profileOverlayEl.classList.add('visible');
    } else {
      profileOverlayEl.classList.remove('visible');
    }
    // Determine which container to use for questions (quiz vs home intro)
    currentQuestionContainerId = view === 'quiz' ? 'questionAreaQuiz' : 'questionArea';
    // Re-render question and update stats so that labels reflect current values
    renderQuestion();
    updateStatsUI();
  }

  // Attach click handlers to navigation buttons
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.getAttribute('data-view');
      showView(view);
    });
  });

  // ---------------------- Profile editing ----------------------
  /**
   * Saves changes to the current user's profile. Allows changing the
   * username (ensuring uniqueness) and/or password. Updates persistent
   * storage and refreshes UI elements accordingly. Displays feedback in
   * the profile message area.
   */
  profileSaveBtn.addEventListener('click', () => {
    const newName = profileUsernameEl.value.trim();
    const newPass = profilePasswordEl.value;
    if (!newName && !newPass) {
      profileMessageEl.textContent = 'Bitte gib einen neuen Nutzernamen oder ein neues Passwort ein.';
      return;
    }
    if (!currentUser) {
      profileMessageEl.textContent = 'Kein Benutzer angemeldet.';
      return;
    }
    // Handle username change
    if (newName && newName !== currentUser.username) {
      if (users.some(u => u.username === newName)) {
        profileMessageEl.textContent = 'Benutzername existiert bereits.';
        return;
      }
      // Update in users array
      const idx = users.findIndex(u => u.username === currentUser.username);
      if (idx !== -1) {
        users[idx].username = newName;
      }
      currentUser.username = newName;
      saveUsers(users);
      saveCurrentUser(currentUser.username);
    }
    // Handle password change
    if (newPass) {
      const idx = users.findIndex(u => u.username === currentUser.username);
      if (idx !== -1) {
        users[idx].password = newPass;
      }
      saveUsers(users);
    }
    // Provide feedback and clear inputs
    profileMessageEl.textContent = 'Profil aktualisiert.';
    profileUsernameEl.value = '';
    profilePasswordEl.value = '';
    // Update leaderboard and stats
    renderLeaderboard();
    updateStatsUI();
  });

  /**
   * Cancels profile editing. Hides the profile overlay and clears any
   * temporary input fields or messages. Returns to the home view.
   */
  profileCancelBtn.addEventListener('click', () => {
    profileOverlayEl.classList.remove('visible');
    profileMessageEl.textContent = '';
    profileUsernameEl.value = '';
    profilePasswordEl.value = '';
    // Show home view after cancel
    showView('home');
  });

  // ---------------------- Init ----------------------
  function init() {
    users = loadUsers();
    currentUser = loadCurrentUser();
    if (currentUser) {
      xp = currentUser.xp || 0;
      bestStreak = currentUser.bestStreak || 0;
      streak = 0;
      lives = 3;
      showResult = false;
      lastCorrect = null;
      jokerUsed = false;
      hideAuthOverlay();
    } else {
      showAuthOverlay();
    }
    updateMusic();
    renderWorlds();
    renderLeaderboard();
    updateStatsUI();
    renderQuestion();
  }
  init();
})();