import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import inspect from 'vite-plugin-inspect'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    inspect(),
    vue(),
    {
      name: 'vite-plugin-one',
      enforce: 'pre',
      /**
       * 多个插件有 resolveId 时
       * 第一 resolveId 返回 id , 后续resolveId 不执行
       * @param source
       */
      resolveId(source){
        //console.log('source: ', source)
        /**
         * source:  E:/coding/xxx/vite-plugin-app/index.html
         * source:  /src/main.ts
         * source:  vue
         * source:  ./App.vue
         * source:  ./components/HelloWorld.vue
         */
      },
      load(id ){
        // console.log('id: ', id)
      }
    },
    {
      name: 'vite-plugin-two',
      enforce: 'pre',
      /**
       * 多个插件有 resolveId 时
       * 第一 resolveId 返回 id , 后续resolveId 不执行
       * @param source
       */
      resolveId(source){
        if (source === 'jquery') {
          console.log('source: ', source)
          return '\0' + source
        }
      },
      load(id ){
        if ('\0jquery' === id) {
          console.log('id: ', id)
          /**
           * 虚拟模块
           * https://cn.vitejs.dev/guide/api-plugin.html#conditional-application
           * 在 App.vue 中引
           *
           * import jQuery from 'jquery'
           * console.log(jQuery)
           */
          return `export default window.jQuery`
        }
      },
      configureServer(server) {
        // 示例：等待客户端连接后再发送消息
        console.log('等待客户端连接后再发送消息')
        server.ws.on('connection', () => {
          server.ws.on('hello', (data) => {
            console.log(data)
          })
          server.ws.send('my:greetings', { msg: 'hello' })
        })

        // server.middlewares.use((req, res, next) => {
        //   let url = req.originalUrl
        //   console.log('url: ', url)
        // })
      }
    },
    {
      // 按需引入
      name: 'vite-plugin-demand-import',
      configResolved(config) {
        console.log(config.plugins.map(p => p.name))
        /**
         * [
         *   'vite:optimized-deps',
         *   'vite:watch-package-data',
         *   'vite:pre-alias',
         *   'alias',
         *   'vite-plugin-one',
         *   'vite-plugin-two',
         *   'vite:modulepreload-polyfill',
         *   'vite:resolve',
         *   'vite:html-inline-proxy',
         *   'vite:css',-app@0.0.0 dev
         *   'vite:esbuild',
         *   'vite:json',
         *   'vite:wasm-helper',
         *   'vite:worker',
         *   'vite:asset',
         *   'vite:vue',
         *   'vite-plugin-demand-import',
         *   'vite:wasm-fallback',
         *   'vite:define',
         *   'vite:css-post',
         *   'vite:worker-import-meta-url',
         *   'vite:asset-import-meta-url',
         *   'vite:dynamic-import-vars',
         *   'vite:import-glob',
         *   'vite:client-inject',
         *   'vite:import-analysis'
         * ]
         */
      },
      transform(code, id) {
        console.log(id)
      },
      config(config, {command}) {
        console.log('command: ', command)
        // 生产环境中修改 root 参数
        if (command === 'build') {
          console.log(config.root)
        }
      }
    }
  ],
})
