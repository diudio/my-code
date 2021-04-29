module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'prettier/prettier': 'warn',
        'vue/no-side-effects-in-computed-properties': 'off',
        'no-useless-escape': 'off',
        'no-return-await': 'off',
        'prefer-promise-reject-errors': 'off',
        'camelcase': 'off',
        'no-dupe-class-members': 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    }
}
