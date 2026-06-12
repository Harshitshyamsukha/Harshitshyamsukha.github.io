---
name: Chromatic Alabaster
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1b1b1b'
  on-surface-variant: '#4c4546'
  inverse-surface: '#303030'
  inverse-on-surface: '#f1f1f1'
  outline: '#7e7576'
  outline-variant: '#cfc4c5'
  surface-tint: '#5e5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  inverse-primary: '#c6c6c6'
  secondary: '#a900a9'
  on-secondary: '#ffffff'
  secondary-container: '#fe00fe'
  on-secondary-container: '#500050'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1b1b1b'
  on-tertiary-container: '#848484'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#ffd7f5'
  secondary-fixed-dim: '#ffabf3'
  on-secondary-fixed: '#380038'
  on-secondary-fixed-variant: '#810081'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c6'
  on-tertiary-fixed: '#1b1b1b'
  on-tertiary-fixed-variant: '#474747'
  background: '#f9f9f9'
  on-background: '#1b1b1b'
  surface-variant: '#e2e2e2'
typography:
  display:
    fontFamily: Sora
    fontSize: 72px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Sora
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
spacing:
  unit: 4px
  gutter: 24px
  margin: 32px
  container-max: 1280px
  nav-width: 600px
---

## Brand & Style
This design system is a high-energy, high-contrast light theme designed to feel like a digital prism. It is the "daylight" counterpart to a dark, neon-saturated aesthetic. The brand personality is unapologetically bold, precise, and vibrant, targeting creative professionals and tech-forward audiences who find standard "clean" light modes boring.

The style is a fusion of **Minimalism** and **High-Contrast/Bold**. It maintains a pristine, clinical white environment but injects "chromatic shocks" through a multi-colored palette. The UI should evoke a sense of controlled chaos—where structural stability meets electric energy. Surfaces are flat and expansive, allowing the saturated accents to define the interactive landscape.

## Colors
The palette is built on a foundation of "Absolute White" (#FFFFFF) to provide a stark, sterile canvas. Contrast is achieved not through grey scales, but through the tension between the white background and a 15-token spectrum of hyper-saturated chromatic accents.

- **Primary:** Pure Black (#000000) is used exclusively for critical text and structural borders to anchor the eye.
- **Surface:** The background remains pure white. Tonal separation is achieved through thin, high-chroma borders rather than shaded fills.
- **Accents:** Use the 15-token chromatic palette for interactive states, progress indicators, and categorical tagging. Each component should feel like it was "dipped" in a different vibrant ink.

## Typography
The typography is sharp and technical. **Sora** provides a futuristic, geometric foundation for headlines, with heavy weights and tight tracking. **Hanken Grotesk** offers a clean, ultra-legible experience for long-form content. **JetBrains Mono** is utilized for metadata, labels, and micro-copy, reinforcing the "precision-engineered" aesthetic.

Type is strictly black on white. For emphasis, use a "highlighter" effect where text is wrapped in a high-chroma background token from the palette, rather than changing the text color itself.

## Layout & Spacing
The layout follows a rigid, 12-column fixed grid for desktop, centered on the screen. The defining characteristic of this design system is the **Centered Floating Navigation**. Unlike traditional top or side bars, the primary navigation is a constrained-width element docked at the horizontal center (top or bottom), acting as a focal point.

Whitespace is used aggressively to separate functional groups. Spacing follows a 4px base unit, but primary layout gaps should be large (32px+) to maintain the "Alabaster" clarity.
- **Desktop:** 1280px max-width, 32px margins.
- **Tablet:** 8 columns, 24px margins.
- **Mobile:** 4 columns, 16px margins, centered elements reflow to full width.

## Elevation & Depth
Depth in this design system is purely structural, not atmospheric. 
- **No Soft Shadows:** Avoid traditional blurred shadows entirely. 
- **Tonal Layers:** Objects gain "elevation" through the use of **Hard Offsets**. A card or button appears "raised" by having a 2px or 4px solid black border and a matching solid color offset shadow (no blur).
- **Glassmorphism:** Use only for the centered navigation bar. A 20px backdrop-blur with a 40% white opacity helps the nav bar float over the content without losing the high-contrast edge.
- **Outlines:** Every interactive container must have a 1px solid black border.

## Shapes
The shape language is strictly **Sharp (0px)**. Every element—buttons, cards, inputs, and the navigation bar—must feature 90-degree angles. This reinforces the architectural and technical nature of the design. The only exception is for circular avatars or status pips, which should remain perfect circles to contrast against the otherwise rectangular world.

## Components
- **Navigation Bar:** A centered, floating pill or rectangle with a heavy backdrop blur. It features a 1px black border and uses different chromatic tokens for each menu item's hover state.
- **Buttons:** Sharp corners, 1px black border. On hover, the button fills with a random or category-specific chromatic token from the palette. The text remains black or flips to white if the chroma is too dark.
- **Inputs:** Simple black underlines or full 1px boxes. The cursor and focus state should utilize a high-energy "Cyan Glitch" or "Hot Pink" indicator.
- **Chips:** Small, sharp-edged rectangles with a solid chromatic background and black monospaced text.
- **Cards:** White background, 1px black border. Use a "Chromatic Header"—a 4px tall horizontal bar at the top of the card using one of the 15 tokens to categorize content.
- **Lists:** Separated by thin 1px black lines. Selected items are indicated by a solid chromatic vertical bar on the left edge.