/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    skipTrailingSlashRedirect: true,
    async headers() {
        return [{
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
                "source": "/cdn-cgi/:path*",
                "destination": "https://cf.lolifamily.js.org/non-exist-destination?path=:path*"
            },{
                "source": "/s/sourcesanspro/:path*",
                "destination": "https://fonts.gstatic.com/s/sourcesanspro/:path*"
            },{
                "source": "/Font-Awesome@5/:path*",
                "destination": "https://cdn.jsdelivr.net/gh/FortAwesome/Font-Awesome@5/:path*"
            },{
                "source": "/:path((?!api/css).*)",
                "destination": "https://cf.lolifamily.js.org/:path"
            }]
        }
    },
}

module.exports = nextConfig
