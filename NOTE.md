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
todo