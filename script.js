const scoreState = {
  total: 0,
  max: 18,
  completed: new Set(),
};

const authChoices = [
  {
    id: "reuse",
    text: "Mám stejné heslo pro e-mail, hru i sociální síť.",
    correct: false,
    explanation: "Tohle je riziko. Když heslo unikne na jednom místě, útočník zkusí i další účty.",
  },
  {
    id: "unique",
    text: "Pro každý důležitý účet mám jiné heslo v klíčence.",
    correct: true,
    explanation: "Správně. Jedinečná hesla brzdí šíření útoku mezi účty.",
  },
  {
    id: "2fa",
    text: "Zapnu dvoufaktor, aby nestačilo jen heslo.",
    correct: true,
    explanation: "Přesně tak. Druhý faktor přidává další bezpečnostní krok.",
  },
  {
    id: "birthday",
    text: "Do hesla dám datum narození, ať si ho pamatuju.",
    correct: false,
    explanation: "To není dobrý nápad. Osobní údaje bývají snadno dohledatelné.",
  },
];

const wifiChoices = [
  {
    id: "maps",
    text: "Podívám se na mapu nebo jízdní řád.",
    correct: true,
    explanation: "To je bezpečnější. Nejde o citlivé přihlášení ani osobní údaje.",
  },
  {
    id: "bank",
    text: "Přihlásím se do internetového bankovnictví.",
    correct: false,
    explanation: "Na otevřené veřejné WiFi tohle nedělej. Citlivé údaje jsou větší riziko.",
  },
  {
    id: "mail",
    text: "Otevřu si školní e-mail a zadám heslo.",
    correct: false,
    explanation: "Na veřejné WiFi raději ne. Přihlášení do důležitých služeb si nech na bezpečnější síť.",
  },
  {
    id: "news",
    text: "Přečtu si článek bez přihlašování.",
    correct: true,
    explanation: "Ano. Bez přihlášení a bez citlivých údajů je to bezpečnější volba.",
  },
];

const trustChoices = [
  {
    id: "go-alone",
    text: "Půjdu sám, když slíbí, že je v pohodě.",
    correct: false,
    explanation: "Ne. S cizím člověkem z internetu se bez dospělého nescházej.",
  },
  {
    id: "tell-adult",
    text: "Řeknu o tom rodičům nebo učiteli a nic neslíbím sám.",
    correct: true,
    explanation: "Tohle je nejbezpečnější reakce.",
  },
  {
    id: "share-family",
    text: "Pošlu mu, kde pracují moji rodiče, aby mi věřil.",
    correct: false,
    explanation: "Osobní informace o sobě ani o blízkých nesdílej.",
  },
];

const attachmentChoices = [
  {
    id: "report-card",
    text: "E-mail od učitelky s domluvenou přílohou do školy.",
    correct: true,
    explanation: "Když čekáš zprávu od známé osoby a obsah dává smysl, je to mnohem bezpečnější.",
  },
  {
    id: "id-upload",
    text: "Nahraju občanku do veřejného úložiště, ať ji mám po ruce.",
    correct: false,
    explanation: "Citlivé dokumenty do otevřených úložišť nepatří.",
  },
  {
    id: "mystery-zip",
    text: "Neznámý kontakt mi poslal ZIP soubor bez vysvětlení.",
    correct: false,
    explanation: "To je podezřelé. Nejdřív ověř odesílatele a obsah.",
  },
  {
    id: "friend-check",
    text: "Kamarád poslal soubor, ale nejdřív se ho zeptám, co v něm je.",
    correct: true,
    explanation: "Správně. Před otevřením si ověř, co soubor obsahuje.",
  },
];

const phishingChoices = [
  {
    id: "safe-page",
    text: "Tohle je podezřelé. Adresa vypadá divně a není zabezpečená.",
    correct: true,
    explanation: "Správně. Divná doména a chybějící zabezpečení jsou varovné signály.",
  },
  {
    id: "looks-fine",
    text: "Je to v pohodě, protože stránka má slovo banka.",
    correct: false,
    explanation: "Název sám nestačí. Vždy kontroluj celou adresu a zabezpečení.",
  },
];

const footprintChoices = [
  {
    id: "copy-risk",
    text: "Když něco smažu, určitě to z internetu navždy zmizí.",
    correct: false,
    explanation: "Bohužel ne vždy. Někdo mohl obsah zkopírovat nebo uložit jinam.",
  },
  {
    id: "share-less",
    text: "Na sociálních sítích nemusím sdílet všechno veřejně.",
    correct: true,
    explanation: "Ano. Méně veřejného sdílení znamená méně rizik.",
  },
  {
    id: "free-service",
    text: "Když je služba zdarma, může sbírat moji pozornost nebo data.",
    correct: true,
    explanation: "Přesně. Zdarma často znamená, že platíme daty nebo pozorností.",
  },
  {
    id: "always-online",
    text: "Je v pohodě být pořád jen online a zapomenout na reálný život.",
    correct: false,
    explanation: "Důležitá je rovnováha. Internet nemá spolknout celý den.",
  },
];

const quizQuestions = [
  {
    question: "🔑 Které heslo je nejsilnější?",
    options: ["12345678", "MujKocourSkace!KazdyDen7", "datumnarozeni2009"],
    answer: 1,
  },
  {
    question: "🛡️ Co je nejlepší udělat s důležitým účtem?",
    options: ["Použít stejné heslo všude", "Zapnout dvoufaktor", "Sdílet heslo kamarádovi"],
    answer: 1,
  },
  {
    question: "📶 Co na otevřené veřejné WiFi raději nedělat?",
    options: ["Číst článek", "Dívat se na mapu", "Přihlásit se do banky"],
    answer: 2,
  },
  {
    question: "🚨 Když tě někdo na internetu vydírá nebo uráží, co uděláš?",
    options: ["Budu to ignorovat sám", "Řeknu to rodiči nebo učiteli", "Pošlu mu peníze"],
    answer: 1,
  },
  {
    question: "🫧 Která věc patří do osobní bubliny?",
    options: ["Moje aktuální poloha a adresa", "Fotka krajiny bez detailů a se zpožděním", "Kde jsou rodiče v práci"],
    answer: 1,
  },
  {
    question: "🎣 Jak poznáš phishing?",
    options: ["Zkontroluju adresu a zabezpečení", "Kliknu hned, ať to mám za sebou", "Věřím všem zprávám od neznámých lidí"],
    answer: 0,
  },
  {
    question: "🧳 Chystáš se s rodinou na dovolenou. Co je nejbezpečnější sdílet?",
    options: [
      "Přesnou adresu hotelu a že doma nikdo nebude",
      "Fotky až po návratu nebo se zpožděním",
      "Že jsi teď sám doma a balíš kufr"
    ],
    answer: 1,
  },
  {
    question: "📎 Přijde ti nečekaná příloha s názvem Vyhra.jpg.exe. Co uděláš?",
    options: [
      "Hned ji otevřu, třeba je to výhra",
      "Neotevřu ji a nejdřív ověřím, kdo a proč ji poslal",
      "Pošlu ji dál kamarádovi, ať to zkusí on"
    ],
    answer: 1,
  },
  {
    question: "👤 Někdo nový ti v chatu píše, že je stejně starý jako ty. Co je nejlepší reakce?",
    options: [
      "Hned mu pošlu fotku, adresu a telefon",
      "Budu opatrný a když si nebudu jistý, řeknu to dospělému",
      "Domluvím si tajnou schůzku bez vědomí rodičů"
    ],
    answer: 1,
  },
  {
    question: "🎮 Co nejlépe ochrání herní účet?",
    options: [
      "Silné jedinečné heslo a zapnutý druhý faktor",
      "Stejné heslo jako do všech ostatních služeb",
      "Poslat heslo kamarádovi pro jistotu do chatu"
    ],
    answer: 0,
  },
];

function addScore(key, points, message) {
  if (!scoreState.completed.has(key)) {
    scoreState.completed.add(key);
    scoreState.total += points;
    updateProgress(message);
  } else {
    updateProgress(message);
  }
}

function updateProgress(message) {
  const progress = Math.min(100, Math.round((scoreState.total / scoreState.max) * 100));
  document.getElementById("scoreValue").textContent = String(scoreState.total);
  document.getElementById("progressBar").style.width = `${progress}%`;
  document.getElementById("progressText").textContent = message;
}

function renderChoiceButtons(containerId, choices, feedbackId, config = {}) {
  const container = document.getElementById(containerId);
  const feedback = document.getElementById(feedbackId);
  const multi = Boolean(config.multi);
  const requiredCorrect = choices.filter((choice) => choice.correct).length;
  const selectedCorrect = new Set();
  const answeredWrong = new Set();

  choices.forEach((choice) => {
    const button = document.createElement("button");
    button.className = "choice-button";
    button.type = "button";
    button.textContent = choice.text;

    button.addEventListener("click", () => {
      const alreadyHandled =
        button.classList.contains("is-correct") || button.classList.contains("is-wrong");
      if (alreadyHandled && !multi) {
        return;
      }

      if (choice.correct) {
        button.classList.add("is-correct");
        button.classList.remove("is-wrong");
        selectedCorrect.add(choice.id);
        feedback.textContent = choice.explanation;
      } else {
        button.classList.add("is-wrong");
        answeredWrong.add(choice.id);
        feedback.textContent = choice.explanation;
      }

      if (!multi) {
        addScore(containerId, choice.correct ? 2 : 0, feedback.textContent);
      } else if (selectedCorrect.size === requiredCorrect && answeredWrong.size === 0) {
        addScore(containerId, 2, `Skvěle! ${feedback.textContent}`);
      } else if (selectedCorrect.size === requiredCorrect) {
        updateProgress("Máš správné bezpečné volby, jen pozor na ty riskantní.");
      }
    });

    container.appendChild(button);
  });
}

function setupPasswordMeter() {
  const input = document.getElementById("passphraseInput");
  const meter = document.getElementById("passwordMeter");
  const feedback = document.getElementById("passwordFeedback");

  document.getElementById("checkPasswordButton").addEventListener("click", () => {
    const value = input.value.trim();
    let score = 0;

    if (value.length >= 16) score += 1;
    if (/[A-Z]/.test(value)) score += 1;
    if (/[a-z]/.test(value)) score += 1;
    if (/\d/.test(value)) score += 1;
    if (/[^A-Za-z0-9]/.test(value)) score += 1;
    if (!/(1234|0000|aaaa|heslo|password|datum)/i.test(value)) score += 1;

    const percent = Math.max(8, Math.round((score / 6) * 100));
    meter.style.width = `${percent}%`;

    if (score <= 2) {
      meter.style.background = "linear-gradient(90deg, #ff6b6b, #ff9671)";
      feedback.textContent =
        "Tohle heslo je zatím slabé. Zkus delší větu, velká a malá písmena, čísla i znaky.";
      updateProgress("Heslo jde vylepšit. Zkus z něj udělat delší frázi.");
      return;
    }

    if (score <= 4) {
      meter.style.background = "linear-gradient(90deg, #ffd166, #ff9f1c)";
      feedback.textContent =
        "Tohle už je lepší. Ještě přidej délku nebo speciální znak a bude to super.";
      addScore("password", 1, "Dobrý start. Tvoje heslo už má slušný základ.");
      return;
    }

    meter.style.background = "linear-gradient(90deg, #45c4b0, #19b57a)";
    feedback.textContent = "Paráda! Tohle vypadá jako silné heslo nebo dobrá bezpečná fráze.";
    addScore("password", 2, "Paráda! Zvládl jsi vytvořit silné heslo.");
  });
}

function setupBubbleGame() {
  const bubbles = Array.from(document.querySelectorAll(".bubble"));
  const feedback = document.getElementById("bubbleFeedback");
  const zones = Array.from(document.querySelectorAll(".drop-zone"));
  let activeBubble = null;
  let placedCount = 0;

  bubbles.forEach((bubble) => {
    bubble.addEventListener("click", () => {
      if (bubble.classList.contains("is-placed")) {
        return;
      }
      bubbles.forEach((item) => item.classList.remove("is-selected"));
      bubble.classList.add("is-selected");
      activeBubble = bubble;
      feedback.textContent = "Vyber bublinu a pak klikni na zónu, kam podle tebe patří.";
    });
  });

  zones.forEach((zone) => {
    zone.addEventListener("click", () => {
      if (!activeBubble) {
        feedback.textContent = "Nejdřív klikni na jednu bublinu.";
        return;
      }

      const bubbleType = activeBubble.dataset.type;
      const targetZone = zone.dataset.zone;
      const isCorrect =
        (bubbleType === "safe" && targetZone === "share") ||
        (bubbleType === "danger" && targetZone === "keep");

      activeBubble.classList.remove("is-selected");
      activeBubble.classList.add("is-placed");
      zone.classList.add("has-items");
      zone.appendChild(activeBubble);
      placedCount += 1;

      if (isCorrect) {
        feedback.textContent =
          bubbleType === "safe"
            ? "Správně. Tohle jde sdílet bezpečněji, protože neprozrazuje citlivé detaily."
            : "Správně. Tohle si nech pro sebe, aby ses zbytečně nevystavoval riziku.";
      } else {
        feedback.textContent =
          "Tady pozor. Poloha, samota doma nebo rodinné detaily patří do osobní bubliny.";
      }

      activeBubble = null;

      if (placedCount === bubbles.length) {
        const safeInShare = document.querySelectorAll(
          '[data-zone="share"] .bubble[data-type="safe"]'
        ).length;
        const dangerInKeep = document.querySelectorAll(
          '[data-zone="keep"] .bubble[data-type="danger"]'
        ).length;

        if (safeInShare === 3 && dangerInKeep === 3) {
          addScore("bubble", 2, "Skvěle! Udržel jsi osobní bublinu v bezpečí.");
        } else {
          updateProgress(
            "Osobní bublina je skoro hotová. Jen si zapamatuj, které informace si nechat pro sebe."
          );
        }
      }
    });
  });
}

function setupQuiz() {
  const container = document.getElementById("quizContainer");
  const feedback = document.getElementById("quizFeedback");

  quizQuestions.forEach((item, index) => {
    const wrapper = document.createElement("article");
    wrapper.className = "quiz-question";

    const title = document.createElement("h3");
    title.textContent = `${index + 1}. ${item.question}`;
    wrapper.appendChild(title);

    const options = document.createElement("div");
    options.className = "quiz-options";

    item.options.forEach((option, optionIndex) => {
      const label = document.createElement("label");
      label.className = "quiz-option";

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `quiz-${index}`;
      radio.value = String(optionIndex);

      const span = document.createElement("span");
      span.textContent = option;

      label.append(radio, span);
      options.appendChild(label);
    });

    wrapper.appendChild(options);
    container.appendChild(wrapper);
  });

  document.getElementById("gradeQuizButton").addEventListener("click", () => {
    let points = 0;

    quizQuestions.forEach((item, index) => {
      const checked = document.querySelector(`input[name="quiz-${index}"]:checked`);
      if (checked && Number(checked.value) === item.answer) {
        points += 1;
      }
    });

    if (points <= 3) {
      feedback.textContent = `Máš ${points} z ${quizQuestions.length}. Zkus si ještě jednou projít zastávky mise.`;
      updateProgress("Finální kvíz ukázal, kde ještě můžeš potrénovat.");
      return;
    }

    if (points <= 7) {
      feedback.textContent = `Máš ${points} z ${quizQuestions.length}. Dobrá práce, už se v kyberbezpečnosti orientuješ, ale ještě pár pastí stojí za procvičení.`;
      addScore("quiz", 2, "Kvíz dopadl dobře. Jsi na výborné cestě.");
      return;
    }

    feedback.textContent = `Máš ${points} z ${quizQuestions.length}. Skvělá práce, jsi opravdový KyberHrdina a internetové pasti tě jen tak nepřekvapí!`;
    addScore("quiz", 3, "Skvělá práce! Závěrečný kvíz jsi zvládl na jedničku.");
  });
}

function setupScrollButtons() {
  document.querySelectorAll("[data-scroll-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.scrollTarget);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

renderChoiceButtons("authChoices", authChoices, "authFeedback", { multi: true });
renderChoiceButtons("wifiChoices", wifiChoices, "wifiFeedback", { multi: true });
renderChoiceButtons("trustChoices", trustChoices, "trustFeedback");
renderChoiceButtons("attachmentChoices", attachmentChoices, "attachmentFeedback");
renderChoiceButtons("phishingChoices", phishingChoices, "phishingFeedback");
renderChoiceButtons("footprintChoices", footprintChoices, "footprintFeedback", { multi: true });
setupPasswordMeter();
setupBubbleGame();
setupQuiz();
setupScrollButtons();
