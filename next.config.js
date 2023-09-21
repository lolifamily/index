/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    skipTrailingSlashRedirect: true,
    async headers() {
        return [{
            "source": "/api/status",
            "headers": [{
                "key": "Content-Type",
                "value": "text/plain"
            },{
                "key": "Cache-Control",
                "value": "s-maxage=63072000"
            },{
                "key": "testing",
                "value": "testing"
            }]
        },{
            "source": "/(.*)",
            "headers": [{
                "key": "strict-transport-security",
                "value": "max-age=63072000; includeSubDomains; preload"
            },{
                "key": "Content-Security-Policy",
                "value": "default-src 'self' 'unsafe-eval' 'unsafe-inline'"
            }]
        }]
    },
    async rewrites() {
        return {
            beforeFiles: [{
                "source": "/s/sourcesanspro/:path*",
                "destination": "https://fonts.gstatic.com/s/sourcesanspro/:path*"
            },{
                "source": "/Font-Awesome@5/:path*",
                "destination": "https://cdn.jsdelivr.net/gh/FortAwesome/Font-Awesome@5/:path*"
            },{
                "source": "/api/css",
                "destination": "/api/css"
            },{
                "source": "/:path*",
                "destination": "https://lolifamily.pages.dev/:path*"
            }]
        }
    },
}

module.exports = nextConfig
