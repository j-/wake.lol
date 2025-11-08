module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@typescript-eslint', 'import'],
  rules: {
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
        disallowTypeAnnotations: true,
      },
    ],

    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],

    'import/order': [
      'error',
      {
        'groups': [
          'builtin',
          'external',
          'parent',
          'sibling',
          'internal',
          'index',
        ],
        'distinctGroup': false,
        'pathGroupsExcludedImportTypes': ['builtin'],
        'alphabetize': {
          'order': 'asc',
          'caseInsensitive': true,
        },
      },
    ],

    'no-empty': 'off',
    'no-empty-pattern': 'off',

    // Blocks bare `window` (and e.g. `document`) as globals
    'no-restricted-globals': ['error', 'window', 'document', 'navigator'],

    // Disallow importing the whole `@mui/material` barrel. Prefer
    // importing concrete component entry points like `@mui/material/Box`.
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: '@mui/material',
            message:
              "Import specific components from '@mui/material/Component' (e.g. '@mui/material/Box') instead of '@mui/material'.",
          },
        ],
        patterns: [],
      },
    ],

    // Enforce semicolons and trailing commas
    // Use the TypeScript-specific rules to avoid conflicts with base rules.
    'semi': 'off',
    '@typescript-eslint/semi': ['error', 'always'],

    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': [
      'error',
      {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'exports': 'always-multiline',
        'functions': 'always-multiline',
        'enums': 'always-multiline',
        'generics': 'always-multiline',
        'tuples': 'always-multiline',
      },
    ],

    'react-refresh/only-export-components': 'off',
  },

  // Files at the project root (single-segment filenames) run in Node.
  // Use glob patterns that match only root-level files (no directories).
  overrides: [
    {
      files: ['*.cjs', '*.js', '*.mjs', '*.ts', '*.tsx'],
      env: {
        node: true,
        es2020: true,
      },
    },
  ],
};
