import { Validate } from './Validate.ts'
import * as colors from 'std/fmt/colors.ts'
import { AnySchema } from "./makeSchema.ts"

Function.prototype[ Symbol.for( 'Deno.customInspect' ) ] = function () {
    return colors.cyan( ( `[Function] ${ this }` ) )
}
RegExp.prototype[ Symbol.for( 'Deno.customInspect' ) ] = function () {
    return colors.red( ( `[Regex] ${ this }` ) )
}
Date.prototype[ Symbol.for( 'Deno.customInspect' ) ] = function () {
    return colors.magenta( ( `[Date] ${ this.toISOString() }` ) )
}
URL.prototype[ Symbol.for( 'Deno.customInspect' ) ] = function () {
    return colors.brightCyan( `[URL] ${ this.toString() }` )
}

const testValues = [
    void 0,
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
    new URL( 'a:' ),
    -42,
    0,
    -42n,
    0n,
    '🤖',
    'foo@foo.foo',
    'foo:foo',
] as const

// type Schema<Data> = {
//     props: object
//     validate: Validate<Data>
// }

export function testSchema<Schema extends AnySchema> ( schema: Schema ) {
    const passKey = [
        schema.props.baseType,
        schema.props.canBeNull && 'null',
        schema.props.canBeUndefined && 'undefined',
    ].filter( Boolean ).join( ' | ' )
    const results = testValues.reduce(
        ( map: Map<string, Set<any>>, x ) => {
            schema.props
            // const result = schema.validate()
            const result = schema.validate( x )
            const key = result.pass ? passKey : result.error[ 0 ].message
            const set = map.get( key ) ?? new Set()
            return map.set( key, set.add( x ) )
        },
        // new Map<string, Set<any>>()
        new Map<string, Set<any>>( [ [ passKey, new Set() ] ] )
    )
    // console.log( 'schema.props', schema.props )
    console.log( results )
    console.log()
}

// const foo = ( ...args ) => {
//     console.log( { args } )
//     console.log( args.length )
//     console.log( args[ 0 ] )
// }

// foo()
// foo( undefined )