module.exports = {
    apps: [
      {
        name: 'spika3_echobot',
        exec_mode: 'cluster',
        instances: 1, // Or a number of instances
        script: 'node_modules/next/dist/bin/next',
        args: 'start -p 3100',
        env_local: {
          APP_ENV: 'local' // APP_ENV=local
        },
        env_development: {
          APP_ENV: 'dev' // APP_ENV=dev
        },
        env_production: {
          APP_ENV: 'prod' // APP_ENV=prod
        }
      }
    ]
  }