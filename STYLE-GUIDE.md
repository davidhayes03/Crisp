# Website Style Guide

## Overview
Two distinct website themes have been created to differentiate the Construction and Property divisions while maintaining brand consistency.

## Construction Division Theme
**Style: Practical, Professional, Corporate**
Inspired by: Tive.com

### Key Characteristics:
- **Clean, minimalist design** with maximum clarity
- **Bold typography** using Inter font family
- **High contrast** dark blue/black primary colors with red accent
- **Information-dense layout** prioritizing functionality
- **Professional imagery** showcasing work and capabilities
- **Clear navigation** with straightforward user journeys
- **Trust signals** including stats, certifications, testimonials

### Design Principles:
1. **Radical Brevity** - Minimal copy, maximum impact
2. **Bold Visual Hierarchy** - Clear section separation
3. **Functional Aesthetics** - Every element serves a purpose
4. **Professional Color Palette**:
   - Primary: Deep Navy (#1a1a2e)
   - Secondary: Midnight Blue (#16213e)
   - Accent: Brand Red (#dc3545)
   - Background: Clean White with light gray sections

### Best Practices:
- Use for: Construction services, commercial projects, B2B communications
- Focus on: Expertise, reliability, project showcases, technical capabilities
- Layout: Grid-based, card layouts, clear CTAs

---

## Property Division Theme
**Style: Artistic, Creative, Editorial**
Inspired by: Neundex.com

### Key Characteristics:
- **Editorial design** with artistic flair
- **Display typography** using Playfair Display serif font
- **Rich, warm color palette** with cream backgrounds
- **Asymmetric layouts** creating visual interest
- **Full-bleed imagery** with dramatic hover effects
- **Minimal navigation** letting content breathe
- **Gallery-style presentation** of properties

### Design Principles:
1. **Art Convergence** - Traditional aesthetics meet modern UI
2. **Visual Storytelling** - Images take center stage
3. **Generous White Space** - Editorial, magazine-like feel
4. **Sophisticated Color Palette**:
   - Primary: Rich Black (#0a0a0a)
   - Background: Warm Cream (#faf8f5)
   - Accent: Brand Red (#dc3545)
   - Highlights: Gold accents (#d4af37)

### Best Practices:
- Use for: Property listings, interior design, residential projects
- Focus on: Aesthetics, lifestyle, emotional connection, visual appeal
- Layout: Asymmetric grids, large imagery, elegant typography

---

## Implementation Guide

### File Structure:
```
css/
├── styles.css (base styles - keep minimal)
├── construction-theme.css (construction-specific)
└── property-theme.css (property-specific)
```

### How to Apply:

**For Construction Pages:**
```html
<link href="css/styles.css" rel="stylesheet">
<link href="css/construction-theme.css" rel="stylesheet">
```

**For Property Pages:**
```html
<link href="css/styles.css" rel="stylesheet">
<link href="css/property-theme.css" rel="stylesheet">
```

### Class Name Conventions:

**Construction Classes:**
- `.const-card` - Information cards
- `.const-section-title` - Section headers
- `.const-project-card` - Project showcases
- `.const-stats` - Statistics sections
- `.btn-construction` - Call-to-action buttons

**Property Classes:**
- `.prop-card` - Property listing cards
- `.prop-section-title` - Editorial headers
- `.prop-gallery` - Image galleries
- `.prop-mission` - Mission/vision sections
- `.prop-service-card` - Service presentations

---

## 2026 Design Trends Applied

From the Webflow trends article, these have been incorporated:

### Both Sites:
1. **Proprietary Effects** - Custom hover states and transitions
2. **Dynamic Text Treatments** - Typography that responds to interaction
3. **Guided Scrolling** - Clear visual hierarchy and wayfinding

### Construction Only:
4. **Minimalism in Copy** - Radical brevity for maximum clarity
5. **The TL;DR Experience** - Structured overviews before deep dives
6. **Trust Signals** - Stats, logos, social proof prominently displayed

### Property Only:
7. **Art Converging with UI** - Vintage/editorial aesthetics with modern interactions
8. **Explosion of Color** - Rich, warm palette with strategic accents
9. **Infinite Canvas** - Dot grid backgrounds suggesting creative possibility

---

## Responsive Considerations

Both themes are fully responsive but behave differently:

**Construction:**
- Mobile: Stacked cards, clear hierarchy
- Tablet: 2-column grids
- Desktop: Full grid layouts

**Property:**
- Mobile: Single column, large touch targets
- Tablet: Asymmetric 2-column layouts
- Desktop: Full editorial spreads

---

## Brand Consistency

Despite different styles, both sites maintain:
1. **Brand Red (#dc3545)** as the primary accent color
2. **Company logos** (to be added from crispinteriors.co.uk and crispconstructionltd.co.uk)
3. **Contact information**: 126 High Street, Edenbridge, Kent TN8 5AY
4. **Phone**: 01732 300018
5. **Consistent navigation structure** across both sites

---

## Next Steps

1. Add company logos to both sites
2. Update imagery to match each theme's style
3. Apply theme-specific classes to HTML elements
4. Test responsive behavior on all devices
5. Optimize performance for both themes
