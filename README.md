# Khizar Shahid — portfolio redesign

A lightweight, responsive static website using the existing portfolio videos. No framework, dependency install, or build step is needed.

## Preview

Run `python3 -m http.server 8080 --bind 127.0.0.1` in this directory and visit http://127.0.0.1:8080.

## Contact configuration

Edit `site-config.js`:
- `bookingUrl`: your HTTPS scheduling URL. Until set, Book a call opens a clearly labelled email inquiry dialog.
- `whatsappNumber`: your international number, digits only. WhatsApp is hidden until a valid number is configured.
- `email`: your public contact email.

## Content

Package details and page copy are in `index.html`; design is in `styles.css`; interactions are in `app.js`. Portfolio titles deliberately stay generic until client names and project descriptions are supplied. No unverified statistics or testimonials are used.

The six original MP4 files in `videos/` are loaded only after a visitor presses Play. Lightweight JPEG thumbnails live in `assets/`. Closing the player releases the source. The page pauses playback when the browser tab is hidden, respects reduced motion, and uses native dialogs for focus handling.

## Vercel

Use the existing project with Framework Preset **Other**, no build command, and this repository root as the output directory. If deploying at a different domain, update the canonical and Open Graph URLs in `index.html` and `sitemap.xml`.

## Before launch

- Set the booking URL and WhatsApp number.
- Confirm package scope, delivery terms, and portfolio descriptions.
- Keep the existing production site until the preview is reviewed.

## Client Instagram marquee

Add handles without the @ symbol to the `clients` list in `site-config.js`. Empty lists show clearly marked lorem ipsum placeholder cards. Real handles become Instagram links; circular image placeholders remain until profile photos are supplied. The continuous marquee pauses on hover, keyboard focus, or the pause button, and becomes a manually scrollable strip for reduced-motion preferences.
