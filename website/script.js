const rawEmojis = Array.isArray(window.emojiData) ? window.emojiData : [];
const categoryNav = document.querySelector("#category-nav");
const grid = document.querySelector("#emoji-grid");
const count = document.querySelector("#results-count");
const template = document.querySelector("#emoji-card-template");

function hasSkinToneModifier(emoji) {
  return /(?:^| )1F3F[B-F](?: |$)/i.test(emoji.codepoints);
}

const unsupportedEmojiNames = new Set([
  "cracking face"
]);

const emojis = rawEmojis.filter((emoji) => {
  const isDefaultPeopleEmoji = emoji.category !== "People & Body" || !hasSkinToneModifier(emoji);
  return isDefaultPeopleEmoji && !unsupportedEmojiNames.has(emoji.name);
});
const categories = [...new Set(emojis.map((emoji) => emoji.category))];
const defaultCategory = categories.includes("Smileys & Emotion") ? "Smileys & Emotion" : categories[0];

function formatName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
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

  categories.forEach((category) => {
    fragment.append(createCategoryButton(category, category, category === defaultCategory));
  });

  categoryNav.append(fragment);
  categoryNav.addEventListener("click", (event) => {
    const button = event.target.closest(".category-button");
    if (!button) return;

    updateActiveCategory(button);
    renderEmojis(button.dataset.filter);
  });
}

function renderEmojis(filter = defaultCategory) {
  const visible = emojis.filter((emoji) => emoji.category === filter);
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
      fragment.append(notice);
    });

    grid.append(fragment);
  }

  count.textContent = `Showing ${visible.length.toLocaleString()} emoji in ${filter}.`;
}

renderCategoryNav();
renderEmojis(defaultCategory);
