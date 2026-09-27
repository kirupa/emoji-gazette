const emojis = Array.isArray(window.emojiData) ? window.emojiData : [];
const categoryNav = document.querySelector("#category-nav");
const grid = document.querySelector("#emoji-grid");
const count = document.querySelector("#results-count");
const template = document.querySelector("#emoji-card-template");

const categories = [...new Set(emojis.map((emoji) => emoji.category))];

function formatName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function formatCodepoints(codepoints) {
  return codepoints
    .split(" ")
    .map((codepoint) => `U+${codepoint}`)
    .join(" ");
}

function createCategoryButton(label, filter, isActive = false) {
  const button = document.createElement("button");
  button.className = `category-button${isActive ? " is-active" : ""}`;
  button.type = "button";
  button.dataset.filter = filter;
  button.setAttribute("aria-pressed", String(isActive));
  button.textContent = label;
  return button;
}

function updateActiveCategory(activeButton) {
  categoryNav.querySelectorAll(".category-button").forEach((button) => {
    const isActive = button === activeButton;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function renderCategoryNav() {
  const fragment = document.createDocumentFragment();
  fragment.append(createCategoryButton("All", "all", true));

  categories.forEach((category) => {
    fragment.append(createCategoryButton(category, category));
  });

  categoryNav.append(fragment);
  categoryNav.addEventListener("click", (event) => {
    const button = event.target.closest(".category-button");
    if (!button) return;

    updateActiveCategory(button);
    renderEmojis(button.dataset.filter);
  });
}

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
      notice.style.animationDelay = `${Math.min(index * 4, 120)}ms`;
      notice.querySelector(".notice-type").textContent = emoji.category;
      notice.querySelector(".emoji-mark").textContent = emoji.glyph;
      notice.querySelector("h3").textContent = formatName(emoji.name);
      notice.querySelector("p").textContent = `${emoji.subgroup} · ${emoji.version} · ${formatCodepoints(emoji.codepoints)}`;
      fragment.append(notice);
    });

    grid.append(fragment);
  }

  count.textContent = filter === "all"
    ? `Showing all ${visible.length.toLocaleString()} emoji.`
    : `Showing ${visible.length.toLocaleString()} emoji in ${filter}.`;
}

renderCategoryNav();
renderEmojis();
