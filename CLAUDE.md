# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a professional portfolio website for Álmos Galeotti (almosgaleotti.com) - Educational & Project Manager at ALMA with Michelin-starred experience and restaurant entrepreneurship. The site is a single-page application showcasing professional work, signature projects, international missions, and culinary expertise. Built as a static HTML/CSS/JavaScript application with no build process or dependencies.

**Tech Stack:**
- Vanilla HTML/CSS/JavaScript (no frameworks)
- GSAP (GreenSock Animation Platform) for animations via CDN
- ScrollTrigger plugin for scroll-based animations
- Calendly widget for booking integration
- Deployed via Docker/nginx

**Brand Positioning:**
- Warm, sophisticated, culinary-focused professional tone
- International bridge-builder between education, haute cuisine, and entrepreneurship
- Color palette: Warm terracotta, sage, cream (culinary-inspired)

## Development Commands

### Local Development
```bash
# Serve locally with any static file server
python3 -m http.server 8000
# Or
npx serve .
```

### Docker Deployment
```bash
# Build Docker image
docker build -t almosgaleotti-com .

# Run container locally
docker run -p 8080:80 almosgaleotti-com
```

The Dockerfile is configured for Coolify deployment using nginx:alpine.

## Architecture & Structure

### Single Page Application Layout

The site uses a **two-column grid layout** that collapses to single column on mobile:
- **Left column (1/3)**: Sticky profile section with avatar, bio, and CTAs
- **Right column (2/3)**: Scrolling bento grid of content cards

### Content Sections

1. **Introduction** - "Where Culture, Education, and Gastronomy Converge"
   - Journey from arts management → culinary passion → ALMA → educational leadership
   - Core positioning: Hybrid professional bridging worlds

2. **Current Role** - ALMA Educational & Project Manager
   - Direct collaboration with Chef Matteo Berti
   - Located in Colorno (Parma), Italy

3. **Signature Projects** - Two major international partnerships
   - **Ginori 1735 × ALMA** (Kering Group): Luxury brand collaboration, Café Ginori global rollout
   - **Barry Callebaut × ALMA**: National educational initiative, "Hospitality of Tomorrow"

4. **Professional Journey** - Non-linear career path
   - Fran Palermo (Artist Management)
   - A38 Ship (Event Management)
   - Michelin 3★ kitchens (Uliassi, St. Hubertus)
   - Boragó (Chile)
   - ALMA Tutor → Educational & Project Manager

5. **International Missions** - Institutional diplomacy
   - Tallinn 2024 (Italian Cuisine Week in the World)
   - Tbilisi 2025 (planned)

6. **Entrepreneurship** - Restaurant ventures in Budapest
   - Zsiràf Buda (established pizzeria & cocktail bar)
   - Giulia Contemporary Trattoria (in development)
   - Uliassi Pop-up (first 3★ Michelin dinner in Hungary)

7. **Industry Network** - Global gastronomic community
   - The Best Chef Awards (Dubai, Milan)
   - World's 50 Best Restaurants representation

8. **Core Expertise** - Four pillars
   - Project & Event Management
   - Educational Leadership
   - Luxury Hospitality Consultancy
   - International Relations

### Animation System

**Three-tier animation approach:**

1. **Page Load Animations** (index.html:862-886)
   - Intro section animates on page load using GSAP timeline
   - Hero heading slides from left, secondary from right, body content fades up
   - No ScrollTrigger - runs once on DOMContentLoaded

2. **Scroll-Reveal Animations** (index.html:1012-1094)
   - All bento items (except section-intros) start at scale(0.8) and opacity(0.6)
   - GSAP ScrollTrigger progressively scales/fades items to 1.0 as user scrolls
   - Scrubbed to scroll position (no delays)
   - Items near bottom of page are set to full scale immediately if scroll room insufficient

3. **Section Intro Animations** (index.html:1012-1049)
   - Multi-line headings animate line-by-line from left (0.2s stagger)
   - Body text fades up from bottom after headings complete
   - Triggered when section enters viewport (85% threshold)

**Key animation classes:**
- `.intro-heading-hero` - Main H1 text
- `.intro-heading-medium` - Section heading lines
- `.intro-body` - Section body text
- `.bento-item:not(.section-intro)` - Cards with scroll-reveal

### Interactive Components

**Achievement Tickers** (index.html:1098-1147)
- Auto-rotating text items within project cards
- Cross-slide animation (current slides left, next slides in from right)
- No fade effects - text always visible during transition
- 3-second interval between rotations

**Scroll Navigation Dots** (index.html:889-1001)
- Fixed position on right side with section tooltips
- IntersectionObserver tracks active section
- Smooth scroll with offset on click
- Hidden on mobile for cleaner experience

**Animated Particle Background** (index.html:617-766)
- Canvas-based connected dots with warm, culinary-inspired gradient colors
- Terracotta, golden, sage, warm red, amber, olive palette
- Mouse interaction repels nearby particles
- Fades out as user scrolls past projects section
- Disabled on mobile for performance

**Calendly Modal** (index.html:793-859)
- GSAP-animated overlay and modal
- Opens from "Book a call" button
- Close on backdrop click, X button, or Escape key

**Email Copy Functionality** (index.html:769-790)
- Copy icon next to email button
- Clipboard API copies email address
- Animated tooltip confirms copy action

### CSS Architecture

**Design System** (styles.css:1-12)
- Warm culinary palette (terracotta, sage, cream)
- `--color-accent: #A0522D` (sienna - warm, culinary tone)
- `--color-text: #2D2520` (dark brown for richness)
- Three shadow levels: sm, md, lg

**Gradient Words** (styles.css:1460-1542)
- Seven different gradient definitions for accented words
- Background-clip text technique for gradient fills
- Each gradient has semantic meaning (passion, convention, luxury, education, etc.)

**Custom Emoji Cursors** (styles.css:1812-1855)
- Context-specific emoji cursors on hover areas:
  - 🇮🇹 Italy (map)
  - 👨‍🍳 Chef (ALMA portrait)
  - 💎 Luxury (Ginori projects)
  - 🌍 World (international missions)
  - 🎵 Music (arts management background)
  - 🎪 Events (A38 Ship)
  - 📊 Strategy, 📚 Teaching, 🏨 Hospitality, 🌐 Globe, ⭐ Star
- Applied via `.cursor-*` utility classes

**Bento Grid System** (styles.css:543-626)
- 2-column grid with 20px gap
- Cards use `.span-2` for full width, `.row-span-*` for height
- Border-radius 28px on all cards
- Subtle border with gradient overlay on hover
- Scale/translate transforms for depth

### Image Assets

All images are served from `/photos/` directory:
- Background images set via `.bg-*` utility classes (styles.css:1567-1597)
- Image cards use `::before` pseudo-element for zoom effect on hover

**Required Images:**
- `almos.jpg` - Profile avatar
- `opengraph.png` - Social media preview
- `photos/alma-portrait.jpg` - With Chef Matteo Berti
- `photos/ginori-nyc.jpg` - Café Ginori Bergdorf Goodman
- `photos/uliassi-kitchen.jpg` - Michelin kitchen experience
- `photos/alma-training.jpg` - ALMA education
- `photos/tallinn-mission.jpg` - Estonian mission
- `photos/zsiraf.jpg` - Budapest pizzeria
- `photos/uliassi-popup.jpg` - Hungary pop-up event
- `photos/best-chef.jpg` - Industry awards

See `IMAGE_ASSETS_GUIDE.md` for detailed specifications.

### Key Files

- `index.html` - Complete single-page application (1152 lines)
- `styles.css` - All styling including animations (1855 lines)
- `Dockerfile` - nginx:alpine container configuration
- `IMAGE_ASSETS_GUIDE.md` - Image specifications and requirements
- `.dockerignore` - Docker build exclusions

## Styling Conventions

- **No CSS preprocessor** - vanilla CSS with custom properties
- **Mobile-first responsive** - Media queries at 768px and 1200px breakpoints
- **Reduced motion support** - Animations disabled for `prefers-reduced-motion: reduce`
- **Font families**: Inter (body), Bricolage Grotesque (headings/accents)
- **All animations use GSAP** - No CSS transitions for complex animations
- **Warm color palette** - Culinary-inspired (terracotta, sage, cream, amber)

## Common Modifications

**Adding a new section:**
1. Add section header with `id` attribute: `<div id="section-id" class="section-header">Title 🔥</div>`
2. Add section intro with `.section-intro` class for animated text
3. Add bento items with appropriate grid classes (`.span-2`, `.row-span-*`)
4. Add new scroll navigation dot in the fixed nav list (index.html:574-612)

**Adding a new image card:**
1. Add image to `/photos/` directory
2. Create `.bg-imagename` class in styles.css with `background-image: url('photos/imagename.jpg')`
3. Use class on `.image-card` element with `.caption` child

**Modifying animations:**
- Page load animations: index.html:862-886
- Scroll reveals: index.html:1051-1087 and styles.css:554-580
- Section intros: index.html:1012-1049

**Adding achievement tickers:**
- Wrap ticker items in `.achievement-ticker > .ticker-viewport > .ticker-item`
- Multiple items will auto-rotate
- Single item displays statically

## SEO & Meta

The site includes comprehensive meta tags:
- Open Graph for Facebook/LinkedIn
- Twitter Card for Twitter
- JSON-LD structured data for Person schema (ALMA affiliation, skills, locations)
- Canonical URL, robots directives, theme color
- Animated favicon using cooking emoji rotation (🍝 → 🍷 → 🍽️ → 👨‍🍳)

## Content Tone & Voice

- **Professional but warm** - sophisticated without being cold
- **International perspective** - emphasizes cultural bridges
- **Education + Execution** - theory meets practice
- **Refined, not flashy** - luxury hospitality tone, not tech startup
- **Emphasis on connections** - people, cultures, disciplines
- **Storytelling through journey** - non-linear career path as strength

## Brand Keywords

- Bridge-builder
- Cultural diplomacy
- Educational excellence
- Luxury hospitality
- International perspective
- Tradition meets innovation
- Between the kitchen and the boardroom
- Connecting worlds

## Domain & Deployment

- Primary domain: `almosgaleotti.com`
- Email: `almos.galeotti@gmail.com`
- LinkedIn: `/in/almosgaleotti/`
- Instagram: `@almosgaleotti`
- Calendly: Custom 30min booking link

## Git Workflow

This is a complete rewrite from the original site (previously for Aron Lukacs). The technical structure and animation system remain identical, but all content, branding, and visual identity have been updated for Álmos Galeotti's professional portfolio.
