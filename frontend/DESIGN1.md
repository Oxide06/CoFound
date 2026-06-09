---
name: Ultra-Premium Tech Narrative
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1c1b1d'
  surface-container: '#201f21'
  surface-container-high: '#2a2a2c'
  surface-container-highest: '#353437'
  on-surface: '#e5e1e4'
  on-surface-variant: '#c9c3d9'
  inverse-surface: '#e5e1e4'
  inverse-on-surface: '#313032'
  outline: '#938ea2'
  outline-variant: '#484556'
  surface-tint: '#c9beff'
  primary: '#c9beff'
  on-primary: '#2f009b'
  primary-container: '#6c47ff'
  on-primary-container: '#f1ebff'
  inverse-primary: '#5e35f1'
  secondary: '#a6e6ff'
  on-secondary: '#003543'
  secondary-container: '#14d1ff'
  on-secondary-container: '#00566b'
  tertiary: '#00e293'
  on-tertiary: '#003921'
  tertiary-container: '#007c4f'
  on-tertiary-container: '#b4ffd1'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e6deff'
  primary-fixed-dim: '#c9beff'
  on-primary-fixed: '#1b0063'
  on-primary-fixed-variant: '#4500d8'
  secondary-fixed: '#b7eaff'
  secondary-fixed-dim: '#4cd6ff'
  on-secondary-fixed: '#001f28'
  on-secondary-fixed-variant: '#004e60'
  tertiary-fixed: '#50ffaf'
  tertiary-fixed-dim: '#00e293'
  on-tertiary-fixed: '#002111'
  on-tertiary-fixed-variant: '#005232'
  background: '#131315'
  on-background: '#e5e1e4'
  surface-variant: '#353437'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Geist
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.03em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  container-max: 1440px
---

## Brand & Style
This design system targets an elite tier of founders and strategists who demand high-performance tools that look as sophisticated as their output. The aesthetic is rooted in **Modern Glassmorphism** and **High-Contrast Dark Mode**, evoking the feel of a cutting-edge command center or a luxury digital workspace.

The UI relies on depth, light refraction, and subtle motion to convey quality. We move away from flat surfaces toward layered, translucent interfaces that feel tangible yet futuristic. The emotional response should be one of "effortless power"—a high-fidelity environment where every detail, from the micro-glows to the typography, feels intentional and premium.

## Colors
The palette is anchored by a void-black neutral (`#0A0A0C`) to maximize the luminescence of the primary brand violet. Deep indigo and midnight blues are used as transitional layers to provide depth without introducing visual noise.

Gradients are used sparingly but impactfully, primarily for active states, data visualizations, and primary action buttons. We utilize a "tri-tone" gradient logic: **Violet → Deep Blue → Cyan/Teal**. This creates a sense of light passing through glass. Surface colors use high-contrast steps to distinguish between background, container, and floating elements.

## Typography
The typography system balances technical precision with high-fashion editorial flair. **Geist** provides a sharp, geometric foundation for headlines, utilizing tight letter spacing to create a sense of density and impact.

**Inter** handles body copy for maximum legibility in complex strategic views, while **JetBrains Mono** is used for metadata, labels, and secondary actions to reinforce the "cutting-edge tech" narrative. Use generous vertical whitespace (margins) between blocks of text to allow the premium dark surfaces to "breathe."

## Layout & Spacing
The layout follows a **Fluid Grid** model with high-margin offsets. On desktop, we utilize wide horizontal gutters (24px) and significant page margins (64px) to center-weight the content, creating a focused, high-end "app-like" experience rather than a standard website.

Spacing follows a strict 4px base unit, but layouts should lean toward "Airy" rather than "Compact." Components within cards should have a minimum of 24px internal padding to maintain the premium feel.

## Elevation & Depth
Elevation is achieved through **Optical Layering** rather than traditional drop shadows.
1.  **Level 0 (Base):** Deepest black/neutral.
2.  **Level 1 (Glass):** 40% opacity background with 20px Backdrop Blur and a 1px border (`white/10`).
3.  **Level 2 (Active):** Inner glow (box-shadow: inset 0 1px 1px rgba(255,255,255,0.05)) to simulate a light-catching edge.

Shadows, when used, are extra-diffused and tinted with the primary color (#6C47FF) at very low opacity (5-8%) to simulate an ambient bloom effect.

## Shapes
We use a **Refined Rounded** language. Standard containers utilize 0.5rem (8px) corners, while larger cards and modals use 1rem (16px). This creates a structural, architectural feel that isn't as "bubbly" as consumer social apps, but avoids the harshness of sharp industrial tools. Buttons remain slightly more rounded than cards to invite interaction.

## Components
-   **Glass Cards:** Always feature a 1px stroke (`white/10`) and `backdrop-filter: blur(12px)`.
-   **Buttons:** Primary buttons use the brand gradient. On hover, apply a `1.02` scale and a soft `box-shadow: 0 0 20px rgba(108, 71, 255, 0.4)` (bloom effect).
-   **Input Fields:** Use a dark, semi-transparent background. The border glows violet only when focused.
-   **Chips:** Monospaced labels in small caps, using a subtle solid background with high-contrast text.
-   **Interactive List Items:** On hover, the background should shift from transparent to `white/5` with a smooth 200ms transition.
-   **Status Indicators:** Use small, high-vibrancy "LED" style dots with a localized outer glow to indicate live or active data.