import { SchemaProps, Schema } from './makeSchema.ts'
import { stringify } from './utils.ts'

export const generalTestValues = [
    undefined,
    null,
    NaN,
    42,
    42n,
    true,
    'string',
    {},
    [],
    Symbol(),
    () => { },
    /regex/,
    new Date,
    new URL( 'http://example.com' ),
] as const

export function testSchema<const Props extends SchemaProps> ( schema: Schema<Props, {}> ) {
    const results = [
        ...generalTestValues,
        -42,
        0,
        -42n,
        0n,
        '🤖',
        'foo@foo.foo',
        'foo:foo',
    ].reduce(
        ( map: Map<string, Set<string>>, x ) => {
            const key = schema.validate( x ).error ? 'fail' : 'pass'
            const value = stringify( x )
            const set = map.get( key ) ?? new Set()
            return map.set( key, set.add( value ) )
        },
        new Map<string, Set<string>>( [
            [ 'pass', new Set() ],
            [ 'fail', new Set() ],
        ] )
    )
    console.log( schema.props )
    console.log( results )
    // console.log( Array.from( results.get( 'pass' ) ?? [] ) )
    // console.log( results.get( 'fail' ) )
    console.log()
}