const path = require("path")

require("dotenv").config({
  silent: true,
  path: process.env.NODE_ENV === "production" ? ".prod.env" : ".dev.env"
})

const PORT = process.env.PORT || 8100
const HOST = process.env.HOST || "localhost"
const BASE_URL = process.env.API_URL || `http://${HOST}:${PORT}/`

module.exports = {
  axios: {
    baseURL: BASE_URL,
    retry: { retries: 3 }
  },
  build: {
    extractCSS: true
  },
  buildDir: "dist/client",
  cache: true,
  css: [
    { src: "vuetify/dist/vuetify.min.css", lang: "css" }
    // { src: '~/assets/style/app.styl', lang: 'styl' }
  ],
  head: {
    title: "Nuxt FullStack Boiler",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js project" }
    ],
    link: [
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Lato:300,400,500,700|Material+Icons" }
    ]
  },
  manifest: {
    name: "vueniverse",
    description: "A Vueniverse project",
    theme_color: "#188269"
  },
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/component-cache",
    ["nuxt-i18n", {
      // Options
      locales: [
        { code: "en", iso: "en-US" },
        { code: "zh", iso: "zh-CN" },
        { code: "es", iso: "es-ES" }
      ],
      // locales: [
      //   {
      //     code: "en",
      //     iso: 'en-US',
      //     name: "English"
      //   },
      //   {
      //     code: "zh",
      //     iso: "zh-CN",
      //     name: "Chinese"
      //   }
      // ],
      defaultLocale: "en",
      routes: {
        about: {
          zh: "/a-propos",
          en: "/about-us"
        },
        posts: {
          zh: "/articles"
        }
      },
      vueI18n: {
        fallbackLocale: "en",
        messages: {
          en: {},
          zh: {}
        }
      }
    }]
  ],
  plugins: [
    "~/plugins/filter.js",
    "~/plugins/mixins.js",
    "~/plugins/vuetify.js"
  ],
  render: {
    static: {
      maxAge: "1y",
      setHeaders (res, path) {
        if (path.includes("sw.js")) {
          res.setHeader("Cache-Control", "public, max-age=0")
        }
      }
    }
  },
  // router: {
  //   middleware: ['ssr-cookie']
  // },
  srcDir: path.resolve(__dirname, "src", "client")
}
