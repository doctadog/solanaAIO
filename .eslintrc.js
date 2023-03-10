module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: "google",
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
    },
    rules: {
        "require-jsdoc": "off",
        "no-irregular-whitespace": "off",
        "indent": ["error", 4],
        "linebreak-style": ["error", "unix"],
        "quotes": ["error", "double"],
        "semi": ["error", "always"],
        // Enforce newline consistency in objects
        "object-curly-newline": [
            "warn",
            {
                // Object literals w/ 3+ properties need to use newlines
                ObjectExpression: {
                    consistent: true,
                    minProperties: 3,
                },

                // Destructuring w/ 6+ properties needs to use newlines
                ObjectPattern: {
                    consistent: true,
                    minProperties: 6,
                },

                // Imports w/ 4+ properties need to use newlines
                ImportDeclaration: {
                    consistent: true,
                    minProperties: 4,
                },

                // Named exports should always use newlines
                ExportDeclaration: "always",
            },
        ],

        "consistent-return": "off",

        "no-multiple-empty-lines": [
            "warn",
            {
                max: 1,
                maxEOF: 1,
                maxBOF: 0,
            },
        ],

        "padding-line-between-statements": [
            "warn",
            // Always require a newline before returns
            {
                blankLine: "always",
                prev: "*",
                next: "return",
            },

            // Always require a newline after directives
            {
                blankLine: "always",
                prev: "directive",
                next: "*",
            },

            // Always require a newline after imports
            {
                blankLine: "always",
                prev: "import",
                next: "*",
            },

            // Don't require a blank line between import statements
            {
                blankLine: "any",
                prev: "import",
                next: "import",
            },

            // Newline after var blocks
            {
                blankLine: "always",
                prev: ["const", "let", "var"],
                next: "*",
            },
            {
                blankLine: "any",
                prev: ["const", "let", "var"],
                next: ["const", "let", "var"],
            },

            // Newline before conditionals/loops
            {
                blankLine: "always",
                prev: "*",
                next: ["if", "do", "while", "for"],
            },

            // Newline after blocks
            {
                blankLine: "always",
                prev: "block-like",
                next: "*",
            },
        ],

        "no-restricted-syntax": [
            "error",

            // with()
            "WithStatement",
        ],

        "no-restricted-globals": [
            "error",
            {
                name: "isNaN",
                message: "isNaN is unsafe, use Number.isNaN",
            },
            {
                name: "isFinite",
                message: "isFinite is unsafe, use Number.isFinite",
            },
        ],
    },
};
