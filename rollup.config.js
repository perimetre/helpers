import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';

const config = [
  // Outputs a javascript bundle for our components
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist/cjs',
        format: 'cjs',
        sourcemap: true
      },
      {
        dir: 'dist/esm',
        format: 'esm',
        sourcemap: true
      }
    ],
    external: ['util'],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      // Utilize a specific tsconfig only for building
      typescript({ clean: true, useTsconfigDeclarationDir: true, tsconfig: 'tsconfig.build.json' })
    ]
  }
];

export default config;
