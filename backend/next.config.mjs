
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'underworldsdb.com',
                pathname: '/cards/**',
            },
        ],
    },
}

export default nextConfig
