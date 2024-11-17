// Import environment variables
import "./src/env.js"; // Ensure this path is correct for your project structure

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true, // Enables React's Strict Mode for better error handling

  // Example: Custom headers
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
    ];
  },

  // Example: Environment variables
  env: {
    API_URL: process.env.API_URL || 'http://localhost:3000/api', // Default API URL
  },

  // Example: Image optimization settings
  images: {
    domains: ['example.com'], // Add domains for external images
    formats: ['image/avif', 'image/webp'], // Supported image formats
  },

  // Add any other Next.js configuration options here
};

// Export the configuration directly
export default nextConfig;