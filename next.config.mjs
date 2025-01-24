/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: "export",
    images: {
      loader: "akamai",
      path: "",
    },
    assetPrefix: "/", // Changed from "./" to "/"
  };
  
  export default nextConfig;