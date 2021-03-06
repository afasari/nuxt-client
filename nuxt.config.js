const nodeExternals = require('webpack-node-externals')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'eventevent.com',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Discover Event Ticket' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  plugins: ['~/plugins/vuetify.js'],
  css: ['~/assets/style/app.styl'],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^vuetify/],
    plugins: [
      new VuetifyLoaderPlugin()
    ],
    extractCSS: true,
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (process.server) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ]
      }
    }
  },
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nuxtjs/vuetify',
    'nuxt-sweetalert2',
    ['../modules/nuxt-i18n', {
      locales: ['en', 'id'],
      defaultLocale: 'en',
      locales: [
        {
          code: 'en',
          iso: 'en-US'
        },
        {
          code: 'id',
          iso: 'id-ID'
        }
      ],
      vueI18n: {
        fallbackLocale: 'en',
        messages: {
          en: {
            welcome: 'Welcome'
          },
          id: {
            welcome: 'Selamat Datang'
          }
        }
      }
    }],
    ['nuxt-validate', {
      lang: 'id',
    }]
  ],

  // Vuetify options
  vuetify: {
    //  theme: { }
  }
}
