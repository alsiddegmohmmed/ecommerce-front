/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  env: {
    STRIPE_SK: process.env.STRIPE_SK,
    STRIPE_PK: process.env.STRIPE_PK,
    MONGODB_URI: process.env.MONGODB_URI,
    PUBLIC_URL: process.env.PUBLIC_URL,
  },
};

export default nextConfig;
