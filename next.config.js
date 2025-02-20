module.exports = {
    async redirects() {
      return [
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'www.jaystravels.co.uk',
            },
          ],
          destination: 'https://jaystravels.co.uk/:path*',
          permanent: true,
        },
      ];
    },
  };