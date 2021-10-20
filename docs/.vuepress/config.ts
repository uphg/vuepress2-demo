import p from 'path'
import { fooPlugin } from '../plugins/foo'

export default {
  plugins: [
    [
      fooPlugin,
      {
        optionA: 123,/* 选项 */
      },
    ]
  ],
}