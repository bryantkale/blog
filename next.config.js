// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    transpilePackages: ["geist"],
    images: {
        remotePatterns: [new URL('https://dcsmjiyimxsnmarchisx.supabase.co/storage/v1/object/**')],
    },
}

export default nextConfig