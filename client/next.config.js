/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "http://localhost:3417/api/:path*"
            }
        ];
    }
};

module.exports = nextConfig;
