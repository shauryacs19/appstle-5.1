---
name: Appstle v5
description: Bright, glass-paned marketing site for Appstle's Shopify retention apps.
colors:
  appstle-blue: "#1088f6"
  appstle-blue-deep: "#0a6fd1"
  appstle-blue-bright: "#219bfb"
  appstle-blue-strong: "#0177f2"
  appstle-blue-ink: "#0066ca"
  sky-wash: "#eef7fe"
  sky-tint: "#ceeffd"
  harbor-navy: "#0b2545"
  midnight-blue: "#062b52"
  graphite-ink: "#2d2d2d"
  slate-muted: "#5c636c"
  slate-subtle: "#656c75"
  white-surface: "#ffffff"
  frost-surface: "#f3f7fc"
  hairline: "#dfe7f1"
  subscriptions-cobalt: "#2457e6"
  memberships-lavender: "#8b6ef5"
  loyalty-coral: "#ff8c69"
  bundles-mint: "#3fae79"
  pickup-blush: "#e86a8e"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Inter, ui-sans-serif, sans-serif"
    fontSize: "4.35rem"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Bricolage Grotesque, Inter, ui-sans-serif, sans-serif"
    fontSize: "3.4rem"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Bricolage Grotesque, Inter, ui-sans-serif, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "\"cv11\", \"ss01\""
  body-lead:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.25
rounded:
  control: "10px"
  tile: "0.75rem"
  card: "1rem"
  card-lg: "1.5rem"
  panel: "2rem"
  panel-lg: "2.5rem"
  pill: "9999px"
spacing:
  gutter: "1.25rem"
  section: "clamp(2.25rem, 5.5svh, 4rem)"
  section-tight: "clamp(1.75rem, 4svh, 3rem)"
  section-gap: "clamp(2rem, 5svh, 3.5rem)"
  container: "86rem"
components:
  button-primary:
    backgroundColor: "{colors.appstle-blue-deep}"
    textColor: "{colors.white-surface}"
    rounded: "{rounded.control}"
    padding: "0 18px"
    height: "46px"
  button-primary-hover:
    backgroundColor: "{colors.appstle-blue-ink}"
  button-secondary:
    backgroundColor: "{colors.sky-wash}"
    textColor: "{colors.appstle-blue}"
    rounded: "{rounded.control}"
    padding: "0 18px"
    height: "46px"
  button-secondary-hover:
    backgroundColor: "{colors.sky-tint}"
  button-dark:
    backgroundColor: "{colors.midnight-blue}"
    textColor: "{colors.white-surface}"
    rounded: "{rounded.control}"
    padding: "0 18px"
    height: "46px"
  button-light:
    backgroundColor: "{colors.white-surface}"
    textColor: "{colors.appstle-blue}"
    rounded: "{rounded.control}"
    padding: "0 18px"
    height: "46px"
  button-ghost:
    textColor: "{colors.graphite-ink}"
    rounded: "{rounded.control}"
    padding: "0 18px"
    height: "46px"
  panel:
    backgroundColor: "{colors.white-surface}"
    rounded: "{rounded.panel-lg}"
    padding: "{spacing.section} 56px"
  card:
    backgroundColor: "{colors.white-surface}"
    rounded: "{rounded.card-lg}"
  chip:
    backgroundColor: "{colors.white-surface}"
    textColor: "{colors.harbor-navy}"
    rounded: "{rounded.pill}"
    typography: "{typography.label}"
---

# Design System: Appstle v5

## Overview

**Creative North Star: "The Clear Storefront"**

The site reads like a bright shop floor seen through clean glass. The page is white, with a faint commerce line-art pattern underneath. Content sits on large rounded panels and cards made of frosted glass. You can sense the backdrop through them, but they never get busy. Appstle Blue carries every action. Deep navy carries the headlines, so the page feels confident rather than pastel. Each of the five products brings one soft colour of its own, the way each shop window in a street has its own awning.

Density is generous at section level and compact inside widgets. Section rhythm is driven by viewport height (`svh`), so a section and its heading fit on one laptop screen. Mock product widgets show the work happening in Shopify. They are dense, realistic and tightly cropped. The surfaces around them stay calm. Motion is lively but brief: split-line headline reveals, magnetic buttons, a gentle tilt, a cursor spotlight and slow marquees. All of it switches off under reduced motion.

**Key Characteristics:**
- White page plus a faint commerce pattern; frosted-glass cards and panels on top.
- One action colour (Appstle Blue); navy for headline weight; neutral greys for reading.
- One pastel identity colour per product, used only for that product.
- Big, soft, rounded forms, with corner radius growing from controls up to panels.
- Low, navy-tinted shadows; a blue glow only under primary actions.

## Colors

A cool, clean blue system on white. Navy gives it weight. Five pastel product colours are kept strictly to their own products.

### Primary
- **Appstle Blue** (`appstle-blue`): every primary button, text link, active nav state, focus ring and brand mark, plus the closing clause of section headlines.
- **Pressed Blue** (`appstle-blue-deep`): hover and pressed state of Appstle Blue.
- **Ink Blue** (`appstle-blue-ink`): blue text below 24px (text links, section labels, small values in chips). Appstle Blue fails contrast as small text (3.6:1); Ink Blue passes (≥4.9:1) on white and every sky tint.
- **Bright Blue / Strong Blue** (`appstle-blue-bright` → `appstle-blue-strong`): the two stops of the brand gradient (135°), used on coloured feature panels and brand tiles.
- **Sky Wash / Sky Tint** (`sky-wash`, `sky-tint`): secondary-button fill and its hover, tinted panels, text-selection colour, and the tint inside glass cards.

### Secondary
- **Harbor Navy** (`harbor-navy`): headlines (including the hero h1), product names and strong labels. It is the most-used text colour after body ink.
- **Midnight Blue** (`midnight-blue`): the dark button, dark panels and the footer, plus the base tint of every shadow.

### Tertiary (product identity)
- **Subscriptions Cobalt** (`subscriptions-cobalt`), **Memberships Lavender** (`memberships-lavender`), **Loyalty Coral** (`loyalty-coral`), **Bundles Mint** (`bundles-mint`), **Pickup Blush** (`pickup-blush`). Each comes as a solid, a soft 50 tint, a 100 chip tint, a 700 text shade and a 200 ring. The full sets are in `src/styles/tokens.css`, mapped per product in `src/data/products.ts`.

### Neutral
- **White Surface** (`white-surface`): the page itself and solid cards.
- **Frost Surface** (`frost-surface`): secondary fill for quiet blocks and the band colour of tinted sections.
- **Hairline** (`hairline`): borders and dividers. Use it sparingly, because glass edges usually do this job.
- **Graphite Ink** (`graphite-ink`): body copy.
- **Slate Muted** (`slate-muted`): descriptions and lead paragraphs.
- **Slate Subtle** (`slate-subtle`): meta text, captions and timestamps. Passes 4.5:1 on white and on every sky tint.

### Named Rules
**The One Action Colour Rule.** Anything clickable that moves the merchant forward is Appstle Blue. No pastel, navy or gradient competes with it for "this is the action". Outside actions, blue appears only in the headline payoff clause.

**The Product Region Rule.** On the home product stack, each app's colour set owns its icon tile (chip + 700 text), its demo stage (50 tint + 200 ring) and its active tab icon. Actions inside stay blue.

**The Own-Your-Shade Rule.** A product's pastel appears only where that product is the subject: its card, its page, its icon tile, its demo. Never use a product colour as general decoration, and never mix two products' colours in one element.

## Typography

**Display Font:** Bricolage Grotesque (fallback Inter, ui-sans-serif)
**Body Font:** Inter (fallback ui-sans-serif, system-ui), with `cv11` and `ss01` stylistic sets

**Character:** Bricolage brings a warm, slightly quirky grotesque voice to headlines. Inter keeps everything else neutral and highly legible. All h1–h4 use the display face with tight negative tracking and balanced wrapping. Paragraphs use `text-wrap: pretty`. At ≥1024px the root font size drops to 90%, so the whole rem scale shrinks on desktop.

### Hierarchy
- **Display** (800, 2.75rem → 4.35rem, 0.98, −0.04em, Harbor Navy): the hero h1 only.
- **Headline** (700, 2.15rem → 3.4rem, 1.05, −0.025em): section titles. Revealed line by line with SplitText. On short desktop screens (`short` variant) it shrinks to 2.6rem.
- **Title** (700, ~1.25–1.6rem): card and product titles. Display face.
- **Body lead** (400, 1.125rem, relaxed, Slate Muted): section descriptions, max ~36rem wide.
- **Body** (400, 0.9–1rem, ~1.6): card copy and widget text. The site uses several in-between sizes (0.85–0.95rem) inside dense widgets.
- **Label** (600, 0.75–0.875rem, never below 12px rendered): chips, meta, nav items and button text. `text-xs` is floored at 12px (`--text-xs: max(0.75rem, 12px)`) because desktop scales the root to 90%. Button text is regular weight, with `<strong>` used for emphasis.

### Named Rules
**The Two-Tone Headline Rule.** A section headline is two short clauses. The first is Graphite Ink or Harbor Navy, and the closing payoff clause is Appstle Blue ("Five apps. **One retention stack.**"). Only one blue clause per headline, always at the end. The hero h1 and card titles stay a single colour.

## Layout

- The site container is 86rem (`max-w-site`). Sections are **Panels**: an outer frame with a 0.75–1.5rem gutter wrapping a large rounded inner panel, inner padding 1.25rem → 3.5rem horizontal and `spacing.section` vertical. Sections are separated by `spacing.section-gap`.
- All vertical rhythm comes from viewport-height clamps (`section`, `section-tight`, `section-gap`). The aim is "one section, one screen" on laptops.
- The hero at ≥768px is a fixed 1440×860 design stage, scaled as a unit by `--hs` = clamp(.45, min(vw/1440, (svh−header)/860), 1.3), so every card keeps its position. Below 768px it falls back to stacked copy plus a compact collage.
- Breakpoints: Tailwind defaults (sm 640, md 768, lg 1024, xl 1280), plus `short` (≥1024px wide and ≤820px tall) for compressing laptop layouts.
- The header is a fixed 3.75rem bar: clear at the top of the page, frosted once you scroll. The menu collapses to a drawer below `lg`.
- Section headings default to left-aligned, max ~42rem wide. Centre them only for closing and summary sections.

## Elevation & Depth

Depth is a hybrid of frosted glass and soft, navy-tinted shadow. Light surfaces become translucent white (52–68%) with an 18px blur, 1.5 saturation, a bright inner top edge and a long, faint blue drop shadow. Coloured and dark panels stay opaque but get the same glass edge and a diagonal sheen. A shadow is always tinted with Midnight Blue (or Appstle Blue for glows), never with neutral black.

### Shadow Vocabulary
- **Soft** (`0 1px 2px rgb(6 43 82/.05), 0 6px 20px -8px rgb(6 43 82/.14)`): small chips and widgets.
- **Card** (`0 1px 2px rgb(6 43 82/.05), 0 18px 40px -18px rgb(6 43 82/.22)`): standard cards.
- **Float** (`0 2px 6px rgb(6 43 82/.06), 0 30px 60px -24px rgb(6 43 82/.35)`): hero floating cards and lifted demos.
- **Glow** (`0 18px 50px -12px rgb(1 119 242/.45)`): under primary blue elements only.
- **Glass** (`inset 0 1px 0 #fff/.9, 0 1px 2px rgb(6 43 82/.04), 0 28px 56px -30px rgb(16 136 246/.32)`): every frosted surface.

### Named Rules
**The Clear Glass Rule.** Light cards and panels are frosted glass by default (`data-glass` on `<html>`). These stay solid: nav dropdowns, the mobile drawer, dialogs, and white widgets sitting inside dark panels. Glass must never sit on glass so deep that the text loses contrast.

**The Navy Shadow Rule.** Shadows are cast in Midnight Blue at low alpha with large negative spread. They are never black, and never hard-edged.

## Shapes

Shapes are soft and generously rounded, and the radius grows with the size of the element. Controls use a 10px corner. Tiles use 0.75rem, cards 1–1.5rem, and section panels 2–2.5rem. Chips, avatars, pills and icon buttons are fully round. Borders are rare; definition comes from glass edges, 1px rings in `hairline` or white/60, and shadow. Orbit rings, dotted grids (`bg-dots`) and the commerce line-art pattern are the recurring background geometry.

## Components

### Buttons
Tactile and quick: they lift 2px on hover, press down 1px when clicked, and lean slightly towards the cursor (magnetic).
- **Shape:** gently rounded rectangle (10px). Heights 40 / 46 / 52px for sm / md / lg.
- **Primary:** Appstle Blue on white text, with a blue drop shadow and a light sheen that sweeps across on hover. Hover turns it Pressed Blue with a deeper shadow.
- **Secondary:** Sky Wash fill, Appstle Blue text; hover turns it Sky Tint.
- **Dark:** Midnight Blue with white text, for use on light glass panels.
- **Light / Outline-light:** a white button, or a white-ringed outline, for use on blue or dark panels.
- **Ghost:** ink text with no fill; on hover it gets the frost fill and a soft shadow.
- **Arrow:** an optional diagonal arrow that slides out and is replaced by a second arrow on hover.
- **Text link:** semibold Ink Blue with an arrow that nudges 2px on hover, and an underline that fades in.

### Chips
- **Style:** fully round, white or glass-white, label type, Harbor Navy text, soft shadow. Product chips use that product's 100 tint with its 700 text shade.

### Cards / Containers
- **Corner Style:** 1–1.5rem for cards, 2–2.5rem for section panels.
- **Background:** frosted white glass (see Elevation). Tinted sections fade from white to Frost Surface or Sky Wash and back over 9rem.
- **Shadow Strategy:** Card for resting cards, Float for hero and demo pieces.
- **Interaction:** a cursor-following blue spotlight (white on dark panels), plus an optional 3D tilt.
- **Internal Padding:** 1.25–2rem.

### Navigation
- **Header:** logo on the left, mega-menu triggers in the centre, and a small primary "Become a Partner" button on the right. Clear over the hero, frosted white at 45% once you scroll, with no border.
- **Dropdowns / mobile drawer:** solid white, never glass. Below `lg`, a 40px round menu button opens the drawer.

### Product Card (signature)
One per app. It carries the product's identity colour set (soft tint background or chip, solid icon tile, 700-shade text), a realistic cropped widget screenshot, the product name, a one-line tagline and a store rating.

### Hero Stage (signature)
A fixed 1440×860 composition. The headline sits in a glass lens. Around it, four floating product cards on the corners and two crossfading cycle slots orbit the copy, with orbit rings, glass orbs and doodles behind them. The whole stage scales as one unit.

## Do's and Don'ts

### Do:
- **Do** use Appstle Blue for every primary action and nothing else that competes with it.
- **Do** make new light cards frosted glass, with the Glass shadow and a bright top edge.
- **Do** tint every shadow with Midnight Blue (`rgb(6 43 82 / α)`).
- **Do** keep a product's pastel set together on that product's own elements.
- **Do** size section spacing with the `svh` clamps so a section fits one laptop screen.
- **Do** set headlines in Bricolage Grotesque with negative tracking (−0.025em; −0.04em on the hero), as ink first clause + Appstle Blue closing clause.
- **Do** give every motion effect a reduced-motion fallback.

### Don't:
- **Don't** put glass behind dropdowns, the mobile drawer or dialogs. Those stay solid white.
- **Don't** use a product's colour outside that product, or two product colours in one element.
- **Don't** colour more than the closing clause of a headline blue, or use gradient text in headlines.
- **Don't** use neutral-black or hard-offset shadows.
- **Don't** use sharp corners on cards or panels. The smallest radius is 10px, for controls.
