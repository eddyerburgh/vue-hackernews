process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = true
process.env.VUE_CLI_BABEL_TARGET_NODE = 'node'

module.exports = {
  presets: [
    '@vue/app'
  ]
}

// "test:unit:debug": "cross-env VUE_CLI_BABEL_TRANSPILE_MODULES=true VUE_CLI_BABEL_TARGET_NODE=true node --inspect-brk ./node_modules/jest/bin/jest.js --no-cache"
