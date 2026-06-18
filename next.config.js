// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    transpilePackages: ["geist"],
    images: {
        remotePatterns: [new URL(process.env.SUPABASE_URL || '')],
    },
}

export default nextConfig