/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    skipTrailingSlashRedirect: true,
    async headers() {
        return [{
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
                "source": "/(.*)",
                "destination": "/assets/$1"
            }],
            fallback: [{
                "source": "/(.*)",
                "destination": "/"
            }]
        }
    },
}

module.exports = nextConfig
