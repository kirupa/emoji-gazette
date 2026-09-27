const emojis = [
  { glyph: "😀", name: "Grinning Gentleman", category: "Smileys & People", note: "A broad public grin, suitable for happy announcements and unlikely train arrivals." },
  { glyph: "😂", name: "Laughing Columnist", category: "Smileys & People", note: "Reports mirth so strong it nearly spills the ink-pot." },
  { glyph: "🤔", name: "Thinking Fellow", category: "Smileys & People", note: "Seen pondering editorials, riddles, and suspiciously cheap tonics." },
  { glyph: "🥳", name: "Celebration Patron", category: "Smileys & People", note: "A festive citizen for jubilees, openings, and fine weather after rain." },
  { glyph: "🧐", name: "Monocled Inspector", category: "Smileys & People", note: "Examines every proclamation with scholarly suspicion." },
  { glyph: "🐘", name: "Elephant Abroad", category: "Animals & Nature", note: "A grand beast from distant reports, impossible to miss in the classifieds." },
  { glyph: "🦊", name: "Fox at Dusk", category: "Animals & Nature", note: "A clever woodland correspondent slipping through the hedgerow." },
  { glyph: "🌻", name: "Sunflower Notice", category: "Animals & Nature", note: "Turns its face to every bright rumor in the morning edition." },
  { glyph: "🐝", name: "Industrious Bee", category: "Animals & Nature", note: "Buzzes with the efficiency of a city desk on deadline." },
  { glyph: "🌙", name: "Moonlit Report", category: "Animals & Nature", note: "For late editions, quiet walks, and news carried under silver light." },
  { glyph: "🍞", name: "Baker's Loaf", category: "Food & Drink", note: "Fresh from the oven, advertised before dawn to respectable households." },
  { glyph: "🍎", name: "Orchard Apple", category: "Food & Drink", note: "Crisp, democratic, and fit for school satchels or picnic baskets." },
  { glyph: "☕", name: "Coffee Dispatch", category: "Food & Drink", note: "The editor's preferred fuel when the presses refuse to sleep." },
  { glyph: "🥨", name: "Twisted Pretzel", category: "Food & Drink", note: "A salty marvel with more turns than a courthouse scandal." },
  { glyph: "🚂", name: "Iron Horse", category: "Travel & Places", note: "Steam, whistle, timetable, and the promise of an elsewhere." },
  { glyph: "⛵", name: "Harbor Sloop", category: "Travel & Places", note: "Carries sea air, cargo gossip, and postcards from remote piers." },
  { glyph: "🏛️", name: "Civic Hall", category: "Travel & Places", note: "Where proclamations echo, speeches multiply, and hats are removed." },
  { glyph: "🎡", name: "Fairground Wheel", category: "Travel & Places", note: "A modern wonder spinning above peanuts, brass bands, and gaslight." },
  { glyph: "🕰️", name: "Parlor Clock", category: "Objects", note: "Keeps stern account of appointments, tea, and missed editions." },
  { glyph: "🔑", name: "Brass Key", category: "Objects", note: "Opens cabinets, mysteries, and occasionally the wrong back door." },
  { glyph: "📜", name: "Important Scroll", category: "Objects", note: "A document with enough flourish to deserve witnesses." },
  { glyph: "🧭", name: "Pocket Compass", category: "Objects", note: "Points reliably north when opinions in the newsroom do not." },
  { glyph: "❤️", name: "Heart Mark", category: "Symbols", note: "A compact declaration for Valentines, victories, and family notices." },
  { glyph: "⚜️", name: "Printer's Fleuron", category: "Symbols", note: "An ornament fit for margins, heralds, and dignified pauses." },
  { glyph: "♻️", name: "Circular Appeal", category: "Symbols", note: "A modern civic sign presented here as an earnest public notice." },
  { glyph: "✅", name: "Approved Mark", category: "Symbols", note: "For ledgers settled, proofs corrected, and supper reservations confirmed." },
  { glyph: "🇺🇸", name: "United States Banner", category: "Flags", note: "A starry notice from the local desk and the parade route." },
  { glyph: "🇬🇧", name: "Union Standard", category: "Flags", note: "Cable news, royal whispers, and weather from across the Atlantic." },
  { glyph: "🇯🇵", name: "Rising Sun Dispatch", category: "Flags", note: "A far-east correspondence folded neatly into the international column." },
  { glyph: "🇧🇷", name: "Brazilian Bulletin", category: "Flags", note: "Bright tropical news arriving with coffee, music, and ocean wind." }
];

const buttons = Array.from(document.querySelectorAll(".category-button"));
const grid = document.querySelector("#emoji-grid");
const count = document.querySelector("#results-count");
const template = document.querySelector("#emoji-card-template");

function renderEmojis(filter = "all") {
  const visible = filter === "all" ? emojis : emojis.filter((emoji) => emoji.category === filter);
  grid.innerHTML = "";

  if (visible.length === 0) {
    const empty = document.createElement("p");
    empty.className = "no-results";
    empty.textContent = "No notices were found in this department.";
    grid.append(empty);
  } else {
    const fragment = document.createDocumentFragment();

    visible.forEach((emoji, index) => {
      const notice = template.content.firstElementChild.cloneNode(true);
      notice.style.animationDelay = `${Math.min(index * 24, 240)}ms`;
      notice.querySelector(".notice-type").textContent = emoji.category;
      notice.querySelector(".emoji-mark").textContent = emoji.glyph;
      notice.querySelector("h3").textContent = emoji.name;
      notice.querySelector("p").textContent = emoji.note;
      fragment.append(notice);
    });

    grid.append(fragment);
  }

  count.textContent = filter === "all"
    ? `Showing all ${visible.length} notices.`
    : `Showing ${visible.length} notices from ${filter}.`;
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((item) => {
      item.classList.remove("is-active");
      item.setAttribute("aria-pressed", "false");
    });

    button.classList.add("is-active");
    button.setAttribute("aria-pressed", "true");
    renderEmojis(button.dataset.filter);
  });
});

renderEmojis();
