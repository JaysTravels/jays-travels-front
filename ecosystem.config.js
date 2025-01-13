module.exports = {
    apps : [
        {
            name: "jays-travels-front",
            script: "./custom.js",
            watch: false,
            error_file:'./error.log',
            out_file:'./output.log',
            env: {
            "NODE_ENV": "development",
            "PORT": 3000,
            },    
            env_production : {
            "NODE_ENV": "production",
            "PORT": 8080,
            }
        }
    ]
}