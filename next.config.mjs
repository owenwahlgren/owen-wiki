/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: "export",
  
    basePath: "/owen-wiki",
    assetPrefix: "/owen-wiki",
  
    images: {
      unoptimized: true,
      loader: "akamai",
      path: "",
    },
  };
  
  export default nextConfig;
  