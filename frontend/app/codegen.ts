import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:8080/v1/graphql',
  documents: [
    'pages/**/!(*.generated).{ts,tsx}',
  ],
  generates: {
    'src/libs/urql/types.ts': {
      plugins: ['typescript'],
    },
    'src/': {
      preset: 'near-operation-file',
      presetConfig: { extension: '.generated.tsx', baseTypesPath: '/libs/urql/types.ts' },
      plugins: ['typescript-operations', 'typescript-urql'],
      config: { withHooks: true },
    },
  },
}

export default config
