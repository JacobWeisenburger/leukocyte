import { Validate } from './Validate.ts'
import * as colors from 'std/fmt/colors.ts'

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
    return colors.cyan( `[URL] ${ this.toString() }` )
}

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
    new URL( 'a:' ),
] as const

type Schema<Data> = {
    props: object
    validate: Validate<Data>
}

function stringifyWithQuotes ( x: unknown ) {
    if ( x && typeof x == 'object' && 'toJSON' in x && typeof x.toJSON === 'function' )
        return x.toJSON()

    if ( typeof x == 'string' ) return JSON.stringify( x )
    if ( typeof x == 'object' ) return JSON.stringify( x )
    if ( typeof x == 'bigint' ) return `${ x }n`

    return String( x )
}

export function testSchema ( schema: Schema<unknown> ) {
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
        ( map: Map<string, Set<any>>, x ) => {
            const result = schema.validate( x )
            const key = result.pass ? 'pass' : 'fail'
            const value = x
            // const value = stringifyWithQuotes( x )
            const set = map.get( key ) ?? new Set()
            return map.set( key, set.add( value ) )
        },
        new Map<string, Set<any>>( [
            [ 'pass', new Set() ],
            [ 'fail', new Set() ],
        ] )
    )
    console.log( 'schema.props', schema.props )
    console.log( results )
    // console.log( Array.from( results.get( 'pass' ) ?? [] ) )
    // console.log( results.get( 'fail' ) )
    console.log()
}