# AI Engineer Portfolio - Abdulrahman Hisham Kamel

## Overview
This is a static portfolio website showcasing Abdulrahman Hisham Kamel's experience as an R&D AI Software Engineer. The site is a comprehensive portfolio featuring work experience, projects, skills, certifications, and contact information.

**Purpose**: Personal portfolio and professional showcase
**Type**: Static HTML/CSS/JavaScript website
**Status**: Fully functional and deployed

## Project Structure
```
.
├── index.html          # Main HTML file
├── styles.css          # All styling (6000+ lines)
├── script.js           # Interactive features and animations
├── server.py           # Python HTTP server for Replit hosting
├── assets/            # All images and resources
│   ├── certificates/  # Professional certifications
│   ├── contact/       # Contact icons and logos
│   ├── images/        # Project screenshots and images
│   ├── logos/         # Company and organization logos
│   ├── tools/         # Technology stack icons
│   └── Volunteering/  # Volunteering activities images
└── CVs/               # PDF resumes
```

## Technology Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Animations**: Custom CSS animations, COBE globe library
- **Icons**: Font Awesome 6.5.1
- **Fonts**: Google Fonts (Poppins)
- **Server**: Python 3.11 (http.server module)

## Key Features
- Responsive design for all devices
- Interactive hero section with animated stats carousel
- Quick navigation sidebar
- Scroll progress indicator
- Executive summary and metrics dashboard
- Experience timeline
- Project showcase with case studies
- Skills visualization
- Certifications gallery
- Contact section with social links
- ATS-optimized keywords for job applications
- Accessibility features (ARIA labels, skip navigation)

## Development Setup

### Running the Server
The website is served using Python's built-in HTTP server:
```bash
python3 server.py
```
Server runs on `0.0.0.0:5000` and serves all static files from the root directory.

### Workflow Configuration
- **Name**: Web Server
- **Command**: `python3 server.py`
- **Port**: 5000
- **Output**: Webview (browser preview)

## Deployment
The site is configured for static hosting. The deployment uses:
- **Type**: Static site
- **Public Directory**: Root directory (`.`)
- All HTML, CSS, JS, and assets are served directly

## Recent Changes
- **2025-11-20**: HR-focused improvements and mobile optimization
  - Added email subject line options for different contact purposes (Full-Time Job, Freelancing, Meeting, Collaboration)
  - Renamed "Quick Facts for HR" section to "Your Next AI Engineer at a Glance"
  - Removed duplicate statistics (K+ users replaced with Azure expertise)
  - Improved bachelor's degree card with larger fonts and concise content
  - Enhanced mobile responsiveness maintained with 37 media queries
  - Optimized content for HR appeal and quick scanning

- **2025-01-20**: Initial Replit setup
  - Created Python HTTP server for hosting
  - Configured workflow for port 5000
  - Added cache-control headers to prevent caching issues
  - Set up .gitignore for Python artifacts
  - Created project documentation

## Contact Information
**Owner**: Abdulrahman Hisham Kamel
**Role**: R&D AI Software Engineer
**Email**: abdulrahmanhishamk@gmail.com
**LinkedIn**: [abdulrahman-hisham](https://www.linkedin.com/in/abdulrahman-hisham)
**GitHub**: [abdohisham12](https://github.com/abdohisham12)

## Notes
- The website includes extensive meta tags for SEO and social media sharing
- Contains structured data (JSON-LD) for search engines
- All external resources are loaded from CDNs
- Images are optimized with lazy loading where appropriate
- The site is ATS-friendly with hidden keyword sections for job applications
