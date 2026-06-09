---
name: Obsidian Geist
colors:
  surface: '#15121b'
  surface-dim: '#15121b'
  surface-bright: '#3b3742'
  surface-container-lowest: '#0f0d15'
  surface-container-low: '#1d1a23'
  surface-container: '#211e27'
  surface-container-high: '#2c2832'
  surface-container-highest: '#37333d'
  on-surface: '#e7e0ed'
  on-surface-variant: '#cbc3d7'
  inverse-surface: '#e7e0ed'
  inverse-on-surface: '#322f39'
  outline: '#958ea0'
  outline-variant: '#494454'
  surface-tint: '#d0bcff'
  primary: '#d0bcff'
  on-primary: '#3c0091'
  primary-container: '#a078ff'
  on-primary-container: '#340080'
  inverse-primary: '#6d3bd7'
  secondary: '#c4c6cf'
  on-secondary: '#2e3037'
  secondary-container: '#464950'
  on-secondary-container: '#b6b8c1'
  tertiary: '#ffb869'
  on-tertiary: '#482900'
  tertiary-container: '#ca801e'
  on-tertiary-container: '#3f2300'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#d0bcff'
  on-primary-fixed: '#23005c'
  on-primary-fixed-variant: '#5516be'
  secondary-fixed: '#e1e2eb'
  secondary-fixed-dim: '#c4c6cf'
  on-secondary-fixed: '#191c22'
  on-secondary-fixed-variant: '#44474e'
  tertiary-fixed: '#ffdcbb'
  tertiary-fixed-dim: '#ffb869'
  on-tertiary-fixed: '#2c1700'
  on-tertiary-fixed-variant: '#673d00'
  background: '#15121b'
  on-background: '#e7e0ed'
  surface-variant: '#37333d'
typography:
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  label-md:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.05em
  code:
    fontFamily: Geist Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 0.25rem
  sm: 0.5rem
  md: 1rem
  lg: 1.5rem
  xl: 2.5rem
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
---

## Brand & Style

The design system is engineered for high-performance technology platforms, developer tools, and advanced SaaS environments. It evokes a sense of focused precision, technical authority, and "deep-work" immersion.

The aesthetic is **Minimalist-Tech**, prioritizing clarity and functional density. By utilizing a monochromatic foundation with targeted violet accents, the system creates a high-contrast environment that reduces eye strain during long sessions while highlighting critical interactive paths. The style leverages sharp geometry and subtle translucency to suggest a sophisticated, layered software architecture.

**Target Audience:** Developers, systems engineers, and data analysts.
**Emotional Response:** Focused, empowered, secure, and sophisticated.

## Colors

The palette is anchored by a deep navy core, moving away from pure black to provide a more "premium tech" feel with better depth perception.

- **Primary:** Violet (#8B5CF6) serves as the singular action color, used for primary buttons, active states, and critical indicators.
- **Background:** The absolute base is #0B0E14.
- **Surfaces:** UI containers use #161B22 to create a subtle lift from the background.
- **Borders:** A dark slate (#21262D) provides structural definition without high-contrast harshness.
- **Typography:** Primary text is an off-white (#F0F6FC) to prevent "halo" effects on dark backgrounds, while secondary text uses a muted grey (#8B949E) to establish hierarchy.

## Typography

This design system utilizes **Geist**, a typeface designed specifically for technical environments. The typography scales emphasize legibility and "scannability."

- **Headlines:** Use tighter letter spacing and semi-bold weights to create a strong visual anchor.
- **Body:** Standardized at 14px and 16px with generous line heights to ensure long-form technical documentation remains readable.
- **Labels:** Small caps and increased letter spacing are used for metadata and category headers to distinguish them clearly from body content.
- **Technical Content:** Where code or data strings are present, a monospaced variant of Geist should be used to maintain alignment.

## Layout & Spacing

The layout operates on a strictly mathematical **4px grid system**. This ensures consistent alignment across complex dashboards and density-heavy interfaces.

- **Desktop:** A 12-column fluid grid with 16px gutters. Max content width is capped at 1440px for optimal line length.
- **Tablet:** 8-column grid with 16px margins.
- **Mobile:** 4-column grid with 16px margins. Elements typically stack vertically, but compact components (chips, small buttons) may remain side-by-side.
- **Density:** The system favors "Compact" density for data-heavy views and "Default" density for settings and marketing pages.

## Elevation & Depth

In a dark navy environment, depth is communicated through **Tonal Elevation** and **Inner Strokes** rather than traditional drop shadows.

1.  **Level 0 (Base):** #0B0E14 - Used for the main canvas background.
2.  **Level 1 (Surface):** #161B22 - Used for cards, sidebars, and navigation headers.
3.  **Level 2 (Overlay):** #21262D - Used for modals, tooltips, and floating menus.

To enhance the premium feel, elements at Level 1 and 2 should use a 1px "inner border" (Top: #30363D) to simulate a light source catching the edge of the container. Shadows, if used, should be extremely diffused and utilize the background color rather than pure black (e.g., `rgba(0, 0, 0, 0.4)`).

## Shapes

The shape language is "Soft-Industrial." It avoids the playfulness of fully rounded corners in favor of a precise, engineered look.

- **Standard Elements:** 0.25rem (4px) radius for buttons, input fields, and small containers.
- **Large Containers:** 0.5rem (8px) for cards and modals.
- **Specialty:** 0px (Sharp) may be used for internal table cells or code blocks to maximize pixel-perfect alignment.

## Components

- **Buttons:** Primary buttons are Solid Violet (#8B5CF6) with White text. Secondary buttons use a Ghost style (Transparent background, #21262D border) with White text.
- **Inputs:** Fields use the Surface color (#161B22) with a subtle border. On focus, the border transitions to Violet with a 2px outer glow.
- **Chips:** Small, low-profile indicators using a #21262D background and #8B949E text. Active chips utilize a faint Violet tint.
- **Cards:** Defined by a 1px border (#21262D). There is no background change on hover; instead, the border color brightens slightly.
- **Lists:** Rows are separated by 1px dividers (#21262D). Hover states use a subtle background shift to #1C2128.
- **Status Indicators:** Use semantic colors (Red for error, Green for success, Yellow for warning) but desaturate them by 20% to maintain the dark-mode harmony.