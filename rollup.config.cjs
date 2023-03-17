module.exports = {
  input: './src/index.js',
  output: ['amd', 'cjs', 'es', 'iife', 'umd', 'system'].map(format => ({
    file: `./dist/bundle-${format}.js`,
    format,
    name: 'utils', // UNM 需要这个，但是不知道这个是干嘛的
  }))
}