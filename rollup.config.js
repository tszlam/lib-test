import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'

const config = defineConfig({
  input: 'src/index.ts',
  // output: ['amd', 'cjs', 'es', 'iife', 'umd', 'system'].map(format => ({
  //   file: `./dist/index-${format}.js`,
  //   format,
  //   name: 'utils', // UNM 需要这个，但是不知道这个是干嘛的
  // })),

  output: {
    file: "./dist/index.js",
    format: "es",
  },
  plugins: [
    typescript({
      module: 'esnext',
      declaration: true,
      outDir: './dist',
    }),
  ]
})

export default config
