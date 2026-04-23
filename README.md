# Portfolio Website - Abdelrahman Hesham Kamel

A modern, responsive portfolio website showcasing AI engineering expertise,
projects, and professional experience.

## 🚀 Features

- **Responsive Design**: Fully responsive layout optimized for all devices
- **Performance Optimized**: Lazy loading, resource hints, and optimized assets
- **Accessibility**: WCAG compliant with ARIA labels and keyboard navigation
- **SEO Optimized**: Structured data, sitemap, and meta tags
- **Security**: Security headers and rate limiting for forms
- **Interactive Elements**: Animated carousels, flip cards, and smooth scrolling

## 📁 Project Structure

```
.
├── index.html          # Main HTML file
├── styles.css         # Stylesheet
├── script.js          # JavaScript functionality
├── server.py          # Development server
├── robots.txt         # Search engine crawler directives
├── sitemap.xml        # Sitemap for search engines
├── assets/            # Static assets (images, logos, certificates)
│   ├── images/        # Project images
│   ├── logos/         # Company/project logos
│   ├── tools/         # Technology icons
│   ├── contact/       # Contact icons
│   └── certificates/  # Certification documents
└── CVs/               # Resume files
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with animations
- **JavaScript (ES6+)**: Vanilla JS for interactivity
- **External Libraries**:
  - [Cobe](https://github.com/shuding/cobe) - Interactive globe visualization
  - [Font Awesome](https://fontawesome.com/) - Icons
  - [Google Fonts](https://fonts.google.com/) - Poppins font family

## 🚀 Getting Started

### Prerequisites

- Python 3.x (for development server)
- Modern web browser

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/abdohisham12/abdohisham12.github.io.git
   cd abdohisham12.github.io
   ```

2. **Run the development server**
   ```bash
   python server.py
   ```

3. **Open in browser**
   ```
   http://localhost:5000
   ```

### Production Deployment

This site is designed to be deployed on GitHub Pages. Simply push to the `main`
branch and GitHub Pages will automatically deploy.

**For custom domain deployment:**

1. Add a `CNAME` file with your domain name
2. Configure DNS settings as per GitHub Pages documentation

## 🔒 Security Features

- **Security Headers**: X-Content-Type-Options, X-Frame-Options, Referrer-Policy
- **Rate Limiting**: Client-side rate limiting for contact form submissions
- **Resource Integrity**: SRI for external resources where applicable
- **HTTPS**: Enforced via GitHub Pages

## ⚡ Performance Optimizations

- **Lazy Loading**: Images load only when needed
- **Resource Hints**: DNS prefetch and preconnect for external resources
- **Async Scripts**: Non-blocking script loading
- **Optimized Assets**: Compressed images and minified code (in production)

## 📊 SEO Features

- **Structured Data**: JSON-LD schema markup
- **Meta Tags**: Comprehensive Open Graph and Twitter Card tags
- **Sitemap**: XML sitemap for search engines
- **Robots.txt**: Crawler directives
- **Canonical URLs**: Prevents duplicate content issues

## 🎨 Customization

### Updating Content

1. **Personal Information**: Edit the structured data in `index.html` (lines
   34-56)
2. **Projects**: Update project sections in `index.html`
3. **Experience**: Modify experience cards in `index.html` and `script.js`
4. **Skills**: Update skill containers in `index.html`

### Styling

- Main stylesheet: `styles.css`
- Inline styles: Some styles are inline in `index.html` for critical rendering

### JavaScript Functionality

- Main script: `script.js`
- All interactive features are modular and well-commented

## 📝 Contact Form

The contact form uses [Formspree](https://formspree.io/) for form submissions.
To configure:

1. Sign up for a Formspree account
2. Create a new form endpoint
3. Update the form action in `index.html` (line 1664):
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

## 🔧 Build Process (Optional)

For production builds with minification:

1. **Install dependencies** (if using a build tool):
   ```bash
   npm install
   ```

2. **Build for production**:
   ```bash
   npm run build
   ```

3. **Minify CSS/JS** (using online tools or build tools):
   - CSS: Use [cssnano](https://cssnano.co/) or similar
   - JS: Use [terser](https://terser.org/) or similar

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### Images not loading

- Check file paths in `assets/` directory
- Ensure images are committed to repository

### Contact form not working

- Verify Formspree endpoint is correct
- Check browser console for errors
- Ensure rate limiting hasn't blocked submissions

### Globe not rendering

- Check internet connection (cobe library loads from CDN)
- Verify browser supports WebGL
- Check browser console for errors

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Abdelrahman Hesham Kamel**

- Portfolio: [https://abdohisham12.github.io](https://abdohisham12.github.io)
- LinkedIn:
  [https://www.linkedin.com/in/abdulrahman-hisham](https://www.linkedin.com/in/abdulrahman-hisham)
- GitHub: [https://github.com/abdohisham12](https://github.com/abdohisham12)
- Email: abdulrahmanhishamk@gmail.com

## 🙏 Acknowledgments

- [Cobe](https://github.com/shuding/cobe) for the interactive globe
- [Font Awesome](https://fontawesome.com/) for icons
- [Google Fonts](https://fonts.google.com/) for typography
- [Formspree](https://formspree.io/) for form handling

---

**Last Updated**: December 2024
