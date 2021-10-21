import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

const { path } = require('@vuepress/utils')
const fooPlugin = require('../plugins/foo.ts') 


export default defineUserConfig<DefaultThemeOptions>({
  theme: path.resolve(__dirname, 'theme'),
  // plugins: [
  //   [
  //     fooPlugin,
  //     {
  //       optionA: 123,/* 选项 */
  //     },
  //   ]
  // ],
})