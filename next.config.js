/** @type {import('next').NextConfig} */

// const nextConfig = {}

// This allows the use of the next/image component to display images from the Supabase storage bucket.
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ivfblcajuujuywzdsihd.supabase.co',
                port: '',
                pathname: '/storage/v1/object/public/**',
            },
        ],
    },
};

module.exports = nextConfig;
