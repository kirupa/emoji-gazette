# Design

<!-- impeccable:design-schema 1 -->

## Visual World

The site is an 1800s broadsheet newspaper translated into a static emoji browser: rag-paper warmth, black letterpress ink, double rules, folio details, large compressed masthead type, cramped uppercase department labels, classified notices, and column flow. The page should feel printed, handled, and composed by a newspaper desk rather than assembled from modern web cards.

## Color

Restrained ink-on-paper palette: aged paper (`#eadfbe`), deeper paper shadows (`#d9c999`), near-black ink (`#201914`), brown secondary ink (`#574534`), and pressed paper highlights (`#f5edcf`). Color is atmospheric and material, not decorative.

## Typography

System serif stack anchored by Georgia and Times New Roman. Hierarchy comes from oversized masthead lettering, uppercase folio/navigation labels, tight display tracking, and readable body columns.

## Components

- Masthead: double newspaper rules, volume/date/price folio, dominant title.
- Press rail: horizontal department buttons with active ink inversion.
- Emoji notices: equal-height printed classified blocks with a department slug, oversized glyph, headline, and short dispatch.

## Interaction

Category buttons filter the emoji notices in place. Active state uses inverted ink; hover/focus uses pressed paper and an offset print shadow. Filtering includes an aria-live count update.

## Responsive Rules

The broadsheet narrows from four notice columns to three and then one. The masthead keeps its period scale but allows the folio and board heading to stack on small screens.
