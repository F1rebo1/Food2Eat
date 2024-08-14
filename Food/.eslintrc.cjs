module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    // extends: ['plugin:react/recommended', 'plugin:react/jsx-runtime', 'plugin:react-hooks/recommended', 'eslint:recommended', 'airbnb', 'prettier', 'plugin:storybook/recommended'],
    extends: ['plugin:react/recommended', 'plugin:react/jsx-runtime', 'plugin:react-hooks/recommended', 'eslint:recommended', 'plugin:storybook/recommended'],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    settings: { react: { version: '18.2' } },
    plugins: ['react-refresh', 'html', 'prettier', 'react-hooks', 'jsx-a11y', 'import'],
    rules: {
        'no-console': 'warn',
        'no-eval': 'error',
        'import/first': 'error',
        'import/no-duplicates': 'error',
        'import/no-named-default': 'error',
        'import/no-unresolved': 'error',
        'import/no-default-export': 'error',
        'prefer-const': [
            'error',
            {
                destructuring: 'all',
            },
        ],
        'prefer-arrow-callback': 'error',
        'arrow-spacing': 'error',
        'comma-dangle': 0,
        'consistent-return': 0,
        'import/no-commonjs': 0,
        'object-curly-newline': 0,
        'operator-linebreak': 0,
        'no-underscore-dangle': 0,
        'prettier/prettier': [
            'error',
            {
                trailingComma: 'es5',
                singleQuote: true,
                printWidth: 80,
                endOfLine: 'auto',
                tabWidth: 2,
            },
        ],
        'no-debugger': 0,
        'no-alert': 0,
        'no-await-in-loop': 0,
        'no-return-assign': ['error', 'except-parens'],
        'no-restricted-syntax': [2, 'LabeledStatement', 'WithStatement'],
        'no-unused-vars': [
            1,
            {
                ignoreRestSiblings: true,
                argsIgnorePattern: 'res|next|^err',
            },
        ],
        'react/jsx-props-no-spreading': 'off',
        'react/state-in-constructor': 'off',
        'react/prop-types': 'off',
        'react/button-has-type': 'off',
        'react/jsx-filename-extension': [2, { extensions: ['.jsx'] }],
        'react/jsx-no-useless-fragment': [2, { allowExpressions: true }],
        'jsx-a11y/label-has-associated-control': 'off',
        'arrow-body-style': [2, 'as-needed'],
        'no-unused-expressions': [
            2,
            {
                allowTaggedTemplates: true,
            },
        ],
        'no-param-reassign': [
            2,
            {
                props: false,
            },
        ],
        'no-continue': 0,
        'no-plusplus': 0,
        'no-nested-ternary': 0,
        'import/prefer-default-export': 0,
        import: 0,
        'func-names': 0,
        'space-before-function-paren': 0,
        'max-len': 0,
        'import/extensions': 0,
        'react/display-name': 1,
        'react/no-array-index-key': 0,
        'react/react-in-jsx-scope': 0,
        'react/prefer-stateless-function': 0,
        'react/forbid-prop-types': 0,
        'react/no-unescaped-entities': 0,
        'react/function-component-definition': 0,
        'jsx-a11y/accessible-emoji': 0,
        'react/require-default-props': 0,
        radix: 0,
        'no-shadow': [
            2,
            {
                hoist: 'all',
                allow: ['resolve', 'reject', 'done', 'next', 'err', 'error'],
            },
        ],
        quotes: [
            2,
            'single',
            {
                avoidEscape: true,
                allowTemplateLiterals: true,
            },
        ],
        'jsx-a11y/href-no-hash': 'off',
        'jsx-a11y/anchor-is-valid': [
            'warn',
            {
                aspects: ['invalidHref'],
            },
        ],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/prop-types': 'error',
        'no-use-before-define': 'off',
        'import/no-extraneous-dependencies': 'off',
    },
    "overrides": [
        {
            "files": ["*.stories.js", "*.stories.jsx", "*.stories.ts", "*.stories.tsx"],
            "rules": {
                "import/no-default-export": "off"
            }
        }
    ]
};