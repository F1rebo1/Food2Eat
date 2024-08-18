export default {
    root: true,
    env: {
        node: true,
        es2020: true,
    },
    extends: ['eslint:recommended', 'plugin:storybook/recommended'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module', // This allows ES module syntax
    },
    globals: {
        require: 'readonly',
        process: 'readonly',
    },
    rules: {
        'no-console': 'warn',
        'no-eval': 'error',
        'prefer-const': ['error', { destructuring: 'all' }],
        'prefer-arrow-callback': 'error',
        'arrow-spacing': 'error',
        'comma-dangle': 0,
        'no-debugger': 0,
        'no-alert': 0,
        'no-unused-vars': ['warn', { argsIgnorePattern: 'res|next|^err' }],
        quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
        'no-undef': 'error',
    },
};
