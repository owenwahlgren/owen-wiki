/**
* @type {import('next').NextConfig}
*/
const nextConfig = {
    output: "export",
    images: {
      loader: "akamai",
      path: "",
    },
    assetPrefix: "/src/app",
  };
  
  export default nextConfig;