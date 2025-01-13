module.exports = {
    apps: [
      {
        name: "jays-travels-front",
        script: "/home/site/wwwroot/node_modules/next/dist/bin/next",
        args: "start -p " + (process.env.PORT || 3000),
        watch: false,
        autorestart: true,
      },
    ],
  };