/** @type {import('next').NextConfig} */
const nextConfig = {
    devIndicators: {
      appIsrStatus: false,
    },
    async redirects() {
        return [
          {
            source: '/', 
            destination: '/weather', 
            permanent: true, // set to true for permanent redirects (301), false for temporary (302)
          },
        ]
      },
};

export default nextConfig;
