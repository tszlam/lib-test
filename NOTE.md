# 添加Typescript
## 准备
参考 [@rollup/plugin-typescript](https://github.com/rollup/plugins/tree/master/packages/typescript)   
需要先单独安装```typescript```和```tslib```   
```tslib```相关的repo: [tslib](https://github.com/Microsoft/tslib)   
然后安装```@rollup/plugin-typescript```   
所以就是执行
```
pnpm i -D typescript tslib
pnpm i -D @rollup/plugin-typescript
```
##  配置rollup
在配置文件中添加```plugins```   
例如
```
// rollup.config.js
import typescript from '@rollup/plugin-typescript'
export default {
    // ...其他的
    plugins: [typescript()] // 如果有其他的plugin就把其他的也加上
}
```

## 插一句
这里还没有处理项目的ts配置，但是可以先试下rollup能不能跑通。   
就是把cal.js改成cal.ts
```
// cal.js
export const add = (a, b) => a + b
export const sum = (...arg) => arg.reduce(add)

// 修改 -> cal.ts
export const add = (a: number, b: number) => a + b
export const sum = (...arg: number[]) => arg.reduce(add)
```
结果是ok的

## 配置TS
先生成tsconfig.js，如果有项目标准的话可以直接使用。   
如果没有的话可以```pnpm tsc --init```来初始化一个，好吃是有默认的基础配置以及列举配置项和响应注释   
现在需要处理两个简单的问题
1. 生成es6代码
    - 可以直接在tsconfig.json中设置配置: ```target: 'es6'```
2. 生成类型声明文件
    - 可以参考@rollup/plugin-typescript的[文档](https://github.com/rollup/plugins/tree/master/packages/typescript)


## 问题
1. 失败
```
> lib@1.0.0 build /Users/lizilin/c/lib-test
> rollup -c


src/index.ts → ./dist/index-amd.js, ./dist/index-cjs.js, ./dist/index-es.js, ./dist/index-iife.js, ./dist/index-umd.js, ./dist/index-system.js...
(!) Plugin typescript: @rollup/plugin-typescript TS18003: No inputs were found in config file '/Users/lizilin/c/lib-test/tsconfig.json'. Specified 'include' paths were '["*"]' and 'exclude' paths were '["dist"]'.
[!] (plugin typescript) RollupError: @rollup/plugin-typescript: Couldn't process compiler options
    at error (/Users/lizilin/c/lib-test/node_modules/.pnpm/rollup@3.19.1/node_modules/rollup/dist/shared/rollup.js:271:30)
    at Object.error (/Users/lizilin/c/lib-test/node_modules/.pnpm/rollup@3.19.1/node_modules/rollup/dist/shared/rollup.js:24642:20)
    at emitParsedOptionsErrors (file:///Users/lizilin/c/lib-test/node_modules/.pnpm/@rollup+plugin-typescript@11.0.0_fdjuvc2nv6pux6mopwweaawpgm/node_modules/@rollup/plugin-typescript/dist/es/index.js:347:17)
    at Object.buildStart (file:///Users/lizilin/c/lib-test/node_modules/.pnpm/@rollup+plugin-typescript@11.0.0_fdjuvc2nv6pux6mopwweaawpgm/node_modules/@rollup/plugin-typescript/dist/es/index.js:745:13)
    at /Users/lizilin/c/lib-test/node_modules/.pnpm/rollup@3.19.1/node_modules/rollup/dist/shared/rollup.js:24841:40
    at async Promise.all (index 0)
    at async PluginDriver.hookParallel (/Users/lizilin/c/lib-test/node_modules/.pnpm/rollup@3.19.1/node_modules/rollup/dist/shared/rollup.js:24769:9)
    at async /Users/lizilin/c/lib-test/node_modules/.pnpm/rollup@3.19.1/node_modules/rollup/dist/shared/rollup.js:25953:13
    at async catchUnfinishedHookActions (/Users/lizilin/c/lib-test/node_modules/.pnpm/rollup@3.19.1/node_modules/rollup/dist/shared/rollup.js:25204:20)
    at async rollupInternal (/Users/lizilin/c/lib-test/node_modules/.pnpm/rollup@3.19.1/node_modules/rollup/dist/shared/rollup.js:25950:5)
```

## 处理
梳理了下思路，先想下这里rollup和ts的关系   
rollup要构建，构建的过程是借用ts来把ts编译成js，而ts本身对项目也有开发时提示的作用。   
所以对ts来说，对项目和对rollup的工作是不一样的，所以配置也是不一样的。   
所以处理方法就是把对应配置放在对应的地方，对项目的配置放在tsconfig.json，对rollup的配置放在rollup.config.mjs