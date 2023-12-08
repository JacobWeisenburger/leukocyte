import * as colors from 'std/fmt/colors.ts'
import { Schema } from './makeSchema.ts'
import { pick } from 'radash'

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

export function testSchema<schema extends Schema<unknown, any>> ( schema: schema ) {
    const passKey = [
        schema.props.baseType,
        schema.props.allowNull && 'null',
        schema.props.allowUndefined && 'undefined',
        schema.props.allowNaN && 'NaN',
    ].filter( Boolean ).join( ' | ' )

    const results = testValues.reduce(
        ( map: Map<any, any>, x ) => {
            const result = schema.validate( x )
            // result.error[ 0 ]
            // return map.set( x, result.pass ? passKey : pick( result.error[ 0 ], [ 'code' ] ) )
            return map.set( x, result.pass ? passKey : pick( result.error[ 0 ], [ 'code', 'message' ] ) )
        },
        new Map<any, any>()
    )

    const result = schema.validate()
    // results.set( 'void', result.pass ? passKey : pick( result.error[ 0 ], [ 'code' ] ) )
    results.set( 'void', result.pass ? passKey : pick( result.error[ 0 ], [ 'code', 'message' ] ) )

    console.log( 'schema.props', schema.props )
    console.log( results )
    console.log()
}