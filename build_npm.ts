// https://github.com/denoland/dnt/
import { build, emptyDir } from 'dnt'

await emptyDir( './npm' )

await build( {
    package: {
        name: 'leukocyte',
        version: '0.0.1',
        author: 'JacobWeisenburger',
        description: 'Pippity poppity give me the leukocyte',
        license: 'MIT',
        npm: 'https://www.npmjs.com/package/leukocyte',
        deno: 'https://deno.land/x/leukocyte',
        repository: 'https://github.com/JacobWeisenburger/leukocyte',
        homepage: 'https://github.com/JacobWeisenburger/leukocyte',
    },
    entryPoints: [ './mod.ts' ],
    importMap: './import_map.json',
    outDir: './npm',
    shims: { deno: true, undici: true },
    compilerOptions: {
        skipLibCheck: true,
        strictNullChecks: true,
    },

    // typeCheck: false,
    skipSourceOutput: true,
    // mappings: {
    //     'https://deno.land/x/zod@v3.21.4/mod.ts': {
    //         name: 'zod',
    //         version: '^3.21.4',
    //         peerDependency: true,
    //     }
    // },
} )

try {
    await Deno.copyFile( 'LICENSE', 'npm/LICENSE' )
} catch ( error ) {
    console.error( error )
}

try {
    await Deno.copyFile( 'README.md', 'npm/README.md' )
} catch ( error ) {
    console.error( error )
}