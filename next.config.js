// @ts-check

/** @type {import('next').NextConfig} */
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const remotePatterns = [];

if (supabaseUrl) {
    try {
        remotePatterns.push(new URL(supabaseUrl));
    } catch {
        console.warn('Skipping invalid SUPABASE_URL for images.remotePatterns');
    }
}

const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    transpilePackages: ["geist"],
    images: {
        remotePatterns,
    },
}

export default nextConfig