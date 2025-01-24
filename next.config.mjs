/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
  
    basePath: "/owen-wiki",
    assetPrefix: "/owen-wiki",
  
    images: {
      unoptimized: true,
    },
  };
  
  export default nextConfig;
  