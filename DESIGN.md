# Design

<!-- impeccable:design-schema 1 -->

## Visual World

The site is now a serious, modern emoji reference catalog inspired by Fluent 2 without copying Microsoft assets. The system uses calm white and neutral surfaces, Segoe-style typography, rounded component geometry, subtle elevation, simple emoji names, and restrained blue action states with teal, purple, and pink accent fields.

## Color

Neutral app palette: foreground `#242424`, secondary text `#424242`, tertiary text `#616161`, white and off-white surfaces (`#ffffff`, `#fafafa`, `#f5f5f5`), soft neutral strokes, and Microsoft-inspired blue primary actions (`#0f6cbd`). Teal (`#49c5b1`), purple (`#8661c5`), pink (`#c03bc4`), and bright blue (`#018df8`) appear as controlled gradients and brand-mark accents.

## Typography

Use `"Segoe UI", "Segoe UI Web (West European)", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif`. Headings are large, semibold, and tightly tracked; labels are small, semibold, and functional rather than ornamental.

## Components

- Header: compact top bar, simple brand mark, and category navigation with no hero headline, introduction, or sample-count card.
- Category navigation: generated horizontal rounded pill controls for every Unicode emoji group, with Smileys & Emotion active by default, no All tab, blue active state, and accessible pressed states.
- Emoji records: compact equal-height rounded tiles with subtle shadow, centered category chip, emoji, and centered Unicode name. Titles use compact normal-flow text with enough line-height for descenders, and sit about 10px below the emoji; People & Body shows only default yellow emoji by excluding skin-tone modifier variants. Known unsupported Unicode glyphs that render blank, such as Cracking face, are hidden until platform emoji fonts catch up.

## Interaction

Category buttons filter the emoji records in place. Active state uses blue fill, hover/focus uses subtle elevation and blue stroke, and the result count updates through `aria-live`.

## Responsive Rules

The catalog uses an auto-filling equal-card grid on wide screens, denser tablet columns, and two columns on phones. Category controls remain horizontally available on small screens without forcing narrow buttons to wrap into unreadable rows.
