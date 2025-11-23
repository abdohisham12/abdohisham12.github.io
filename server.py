#!/usr/bin/env python3
"""
Development/Production HTTP Server
Set DEV_MODE environment variable to 'true' for development mode (no caching)
"""
import http.server
import socketserver
import os

PORT = int(os.environ.get('PORT', 5000))
DIRECTORY = "."
DEV_MODE = os.environ.get('DEV_MODE', 'false').lower() == 'true'

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Security headers (always set)
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-Frame-Options', 'DENY')
        self.send_header('Referrer-Policy', 'strict-origin-when-cross-origin')
        
        # Cache control based on mode
        if DEV_MODE:
            # Development: no caching
            self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
            self.send_header('Pragma', 'no-cache')
            self.send_header('Expires', '0')
        else:
            # Production: cache static assets
            if self.path.endswith(('.css', '.js', '.jpg', '.jpeg', '.png', '.gif', '.svg', '.ico', '.pdf')):
                self.send_header('Cache-Control', 'public, max-age=31536000, immutable')
            else:
                self.send_header('Cache-Control', 'public, max-age=3600')
        
        super().end_headers()

if __name__ == "__main__":
    mode = "DEVELOPMENT" if DEV_MODE else "PRODUCTION"
    print(f"Server running in {mode} mode at http://0.0.0.0:{PORT}/")
    print(f"Serving files from: {os.path.abspath(DIRECTORY)}")
    if DEV_MODE:
        print("⚠️  Development mode: Caching disabled")
    else:
        print("✅ Production mode: Caching enabled")
    
    with socketserver.TCPServer(("0.0.0.0", PORT), MyHTTPRequestHandler) as httpd:
        httpd.serve_forever()
