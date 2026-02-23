# Nueve Residences - Website Replica

A pixel-perfect replica of the Nueve Residences website (https://www.nueve.gr/en) built with HTML, CSS, and JavaScript.

## Features

- **Site Loader**: Animated loading screen with progress bar and percentage counter
- **Fixed Header**: Sticky navigation with mix-blend-mode: difference effect
- **Off-canvas Menu**: Full-screen navigation with hover animations and infinite scrolling images
- **Swap Hover Effect**: Text replacement animation on hover
- **Gallery Tabs**: Interactive tab system for showcasing different residences
- **Sticky Footer**: Footer that reveals on scroll
- **Responsive Design**: Fully responsive layout for all devices
- **Smooth Animations**: Flicker effects, parallax scrolling, and scroll-triggered animations

## File Structure

```
poc2/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles and animations
├── js/
│   └── main.js         # Interactive functionality
└── images/             # (Optional) Local images folder
```

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox, Animations
- **JavaScript (ES6+)**: Intersection Observer, smooth scrolling, event handling
- **Google Fonts**: Manrope font family
- **CDN Fonts**: Melodrama font family

## Key Sections

1. **Hero Section**: Large typography with flickering animation
2. **Fullscreen Image**: Parallax background section
3. **Deco Section**: Brand statement with mix-blend-mode text
4. **Residences**: Interactive cards for Classic, Mini, and Village
5. **Gallery**: Tabbed image gallery with hover effects
6. **Experiences**: Feature grid with icons
7. **Footer**: Sticky footer with contact information

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Features

- Lazy loading for images
- Optimized animations (reduced on mobile)
- Smooth scrolling with requestAnimationFrame
- Intersection Observer for scroll animations
- Touch device detection for simplified interactions

## Local Development

To view the website locally:

1. Open `index.html` in any modern web browser
2. Or serve with a local server:
   ```bash
   npx serve poc2
   # or
   python -m http.server 8000 --directory poc2
   ```

## Notes

- The website uses placeholder images from Unsplash that match the style of the original
- Fonts are loaded from external CDNs (Google Fonts and CDNFonts)
- All animations and interactions match the original site behavior
