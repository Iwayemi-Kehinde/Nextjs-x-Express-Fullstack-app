/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true, // ✅ native SWC support for styled-components
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
