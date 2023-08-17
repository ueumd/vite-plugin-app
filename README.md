# vite 插件开发
- https://cn.vitejs.dev/guide/api-plugin.html#conditional-application
- https://cn.rollupjs.org/plugin-development/


## 通用钩子

### 钩子在服务器启动时被调用
- options
- buildStart


## 钩子会在每个传入模块请求时被调用：
- resolveId
- load
- transform


## 钩子在服务器关闭时被调用：
- buildEnd
- closeBundle


## Vite 独有钩子
- config
- configResolved
- configureServer
- configurePreviewServer
- transformIndexHtml
- handleHotUpdate


## 插件顺序
enforce 的值可以是pre 或 post


## 情景应用

默认情况下插件在开发（serve）和构建（build）模式中都会调用。
如果插件只需要在预览或构建期间有条件地应用，请使用 apply 属性指明它们仅在 'build' 或 'serve' 模式时调用：
```typescript
function myPlugin() {
  return {
    name: 'build-only',
    apply: 'build' // 或 'serve'
  }
}
// 同时，还可以使用函数来进行更精准的控制：
apply(config, { command }) {
   // 非 SSR 情况下的 build
   return command === 'build' && !config.build.ssr
}

```
