const emojis = [
  { glyph: "😀", name: "Grinning face", category: "Smileys & People", note: "A clear positive expression for friendly confirmations, greetings, and lightweight success states." },
  { glyph: "😂", name: "Face with tears of joy", category: "Smileys & People", note: "Use for strongly humorous moments where an informal tone is appropriate." },
  { glyph: "🤔", name: "Thinking face", category: "Smileys & People", note: "Represents consideration, review, or a question that needs more context." },
  { glyph: "🥳", name: "Partying face", category: "Smileys & People", note: "Marks celebration, launches, milestones, or completion of a shared goal." },
  { glyph: "🧐", name: "Face with monocle", category: "Smileys & People", note: "Signals inspection, detail review, or careful evaluation." },
  { glyph: "🐘", name: "Elephant", category: "Animals & Nature", note: "A large animal symbol commonly used for memory, scale, and wildlife contexts." },
  { glyph: "🦊", name: "Fox", category: "Animals & Nature", note: "A nature symbol associated with alertness, agility, and woodland settings." },
  { glyph: "🌻", name: "Sunflower", category: "Animals & Nature", note: "A warm botanical symbol for growth, optimism, and seasonal content." },
  { glyph: "🐝", name: "Honeybee", category: "Animals & Nature", note: "Useful for references to activity, ecosystems, teamwork, or pollination." },
  { glyph: "🌙", name: "Crescent moon", category: "Animals & Nature", note: "Represents night, rest, focus mode, or low-light experiences." },
  { glyph: "🍞", name: "Bread", category: "Food & Drink", note: "A staple food symbol for dining, groceries, bakeries, or everyday essentials." },
  { glyph: "🍎", name: "Red apple", category: "Food & Drink", note: "A simple food symbol for health, education, nutrition, or produce." },
  { glyph: "☕", name: "Hot beverage", category: "Food & Drink", note: "Represents coffee, tea, breaks, cafes, and morning routines." },
  { glyph: "🥨", name: "Pretzel", category: "Food & Drink", note: "A snack symbol for casual food, events, and hospitality content." },
  { glyph: "🚂", name: "Locomotive", category: "Travel & Places", note: "Represents train travel, transit, routes, and scheduled movement." },
  { glyph: "⛵", name: "Sailboat", category: "Travel & Places", note: "A travel symbol for water, leisure, navigation, and coastal destinations." },
  { glyph: "🏛️", name: "Classical building", category: "Travel & Places", note: "Use for civic spaces, institutions, museums, or formal destinations." },
  { glyph: "🎡", name: "Ferris wheel", category: "Travel & Places", note: "Represents attractions, events, entertainment venues, and city experiences." },
  { glyph: "🕰️", name: "Mantelpiece clock", category: "Objects", note: "A timekeeping object for scheduling, history, duration, or reminders." },
  { glyph: "🔑", name: "Key", category: "Objects", note: "Represents access, credentials, permissions, or unlocking a capability." },
  { glyph: "📜", name: "Scroll", category: "Objects", note: "A document symbol for records, policies, certificates, or historical content." },
  { glyph: "🧭", name: "Compass", category: "Objects", note: "Use for navigation, orientation, direction, and decision support." },
  { glyph: "❤️", name: "Red heart", category: "Symbols", note: "Represents appreciation, affinity, favorites, care, or emotional emphasis." },
  { glyph: "⚜️", name: "Fleur-de-lis", category: "Symbols", note: "An ornamental symbol used in decorative, heraldic, or regional contexts." },
  { glyph: "♻️", name: "Recycling symbol", category: "Symbols", note: "Communicates reuse, sustainability, circular systems, or responsible disposal." },
  { glyph: "✅", name: "Check mark button", category: "Symbols", note: "Indicates completion, approval, validation, or a successful outcome." },
  { glyph: "🇺🇸", name: "United States", category: "Flags", note: "Country flag for United States regional, language, or location references." },
  { glyph: "🇬🇧", name: "United Kingdom", category: "Flags", note: "Country flag for United Kingdom regional, language, or location references." },
  { glyph: "🇯🇵", name: "Japan", category: "Flags", note: "Country flag for Japan regional, language, or location references." },
  { glyph: "🇧🇷", name: "Brazil", category: "Flags", note: "Country flag for Brazil regional, language, or location references." }
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
    empty.textContent = "No emoji records match this category.";
    grid.append(empty);
  } else {
    const fragment = document.createDocumentFragment();

    visible.forEach((emoji, index) => {
      const notice = template.content.firstElementChild.cloneNode(true);
      notice.style.animationDelay = `${Math.min(index * 18, 180)}ms`;
      notice.querySelector(".notice-type").textContent = emoji.category;
      notice.querySelector(".emoji-mark").textContent = emoji.glyph;
      notice.querySelector("h3").textContent = emoji.name;
      notice.querySelector("p").textContent = emoji.note;
      fragment.append(notice);
    });

    grid.append(fragment);
  }

  count.textContent = filter === "all"
    ? `Showing all ${visible.length} emoji.`
    : `Showing ${visible.length} emoji in ${filter}.`;
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
