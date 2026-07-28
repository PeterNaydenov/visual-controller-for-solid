import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import { resolve } from 'path'

export default defineConfig({
  publicDir: false,
  plugins: [
    solid()
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.js'),
      name: 'VisualControllerForSolid',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => {
        switch (format) {
          case 'es':
            return 'visual-controller-for-solid.esm.js'
          case 'cjs':
            return 'visual-controller-for-solid.cjs'
          case 'umd':
            return 'visual-controller-for-solid.umd.js'
          default:
            return 'visual-controller-for-solid.js'
        }
      }
    },
    rollupOptions: {
      external: ['solid-js', 'solid-js/web', 'ask-for-promise'],
      output: {
        globals: {
          'solid-js': 'solidJs',
          'solid-js/web': 'solidJsWeb',
          'ask-for-promise': 'askForPromise'
        },
        exports: 'named'
      }
    }
  }
})