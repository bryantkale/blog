// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    transpilePackages: ["geist"]
}

module.exports = nextConfig