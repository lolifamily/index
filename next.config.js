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
            }]
        },{
            "source": "/(.*)",
            "headers": [{
                "key": "Strict-Transport-Security",
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
                "source": "/cdn-cgi/:path(.*)",
                "destination": "https://lolifamily.js.org"
            },{
                "source": "/s/sourcesanspro/:path(.*)",
                "destination": "https://fonts.gstatic.com/s/sourcesanspro/:path"
            },{
                "source": "/Font-Awesome@6/:path(.*)",
                "destination": "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6/:path"
            }]
        }
    },
}

module.exports = nextConfig
