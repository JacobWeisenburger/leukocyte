// start bash -c 'deno run -A --watch src/mod.ts'

import { makeBooleanSchema } from './BooleanSchema.ts'
import { makeLiteralSchema } from './LiteralSchema.ts'
import { makeNumberSchema } from './NumberSchema.ts'
import { AnySchema, makeSchema } from './Schema.ts'
import { makeStringSchema } from './StringSchema.ts'
import { InferTypeFromSchema } from './baseTypes.ts'

export module l {
    export type infer<Schema extends AnySchema> = InferTypeFromSchema<Schema>
}

export const l = {
    schema: makeSchema,
    string: makeStringSchema,
    number: makeNumberSchema,
    boolean: makeBooleanSchema,
    literal: makeLiteralSchema,
    // boolean: makeSchema( 'boolean' ),
    // bigint: makeSchema( 'bigint' ),
    // date: makeSchema( 'Date' ),
    // symbol: makeSchema( 'symbol' ),
    // null: () => makeLiteralSchema( null ),
    // undefined: () => makeLiteralSchema( undefined ),
    // void: () => makeLiteralSchema( undefined ),
    // NaN: makeSchema( 'NaN' ),
    // any: makeSchema( 'any' ),
    // unknown: makeSchema( 'unknown' ),
    // never: makeSchema( 'never' ),
}
export { l as leukocyte }

const stringSchema = l.string()
    .length( 3 )
    .includes( 'foo' )
    .nullish()

const numberSchema = l.number()
    .max( 3 )
    .integer()
    // .nullish()
    // .optional()
    .nullable()

const booleanSchema = l.boolean().nullish()

// const literalSchema = l.literal( 'foo' ).optional()
const literalSchema = l.literal( 42 )
// const bigintSchema = l.bigint()
// const dateSchema = l.date()

type test1 = l.infer<typeof stringSchema>
type test2 = l.infer<typeof numberSchema>
type test3 = l.infer<typeof booleanSchema>
type test4 = l.infer<typeof literalSchema>

console.log(
    Object.fromEntries(
        Object.entries( {
            stringSchema,
            numberSchema,
            booleanSchema,
            literalSchema,
        } ).map( ( [ key, value ] ) => [
            key.replace( 'Schema', 'Props' ),
            value.props
        ] )
    )
)

// // console.log( stringSchema )
// console.log( stringSchema.props )
// stringSchema.props.baseType
// stringSchema.props.length
// stringSchema.props.includes
// stringSchema.props.optional
// stringSchema.props.nullable



// // console.log( numberSchema )
console.log( numberSchema.props )
// numberSchema.props.baseType
// numberSchema.props.length
// numberSchema.props.includes
// numberSchema.props.optional
// numberSchema.props.nullable

// testSchema( l.string() )
// testSchema( l.string().optional() )
// testSchema( l.string().optional().required() )
// testSchema( l.string().optional().nullable() )
// testSchema( l.string().nullable() )
// testSchema( l.string().nullable().nonNullable() )
// testSchema( l.string().nullish() )
// testSchema( l.string().min( 7 ) )
// testSchema( l.string().max( 7 ) )
// testSchema( l.string().includes( 'foo' ) )
// testSchema( l.string().startsWith( 'foo' ) )
// testSchema( l.string().endsWith( 'foo' ) )
// testSchema( l.string().email() )
// testSchema( l.string().emoji() )
// testSchema( l.string().url() )

// function testSchema<const Props extends SchemaProps> ( schema: Schema<Props, {}> ) {
//     const results = [
//         ...testValues,
//         -42,
//         0,
//         -42n,
//         0n,
//         '🤖',
//         'foo@foo.foo',
//         'foo:foo',
//     ].reduce(
//         ( map: Map<string, Set<string>>, x ) => {
//             const key = schema.validate( x ).error ? 'fail' : 'pass'
//             const value = stringify( x )
//             const set = map.get( key ) ?? new Set()
//             return map.set( key, set.add( value ) )
//         },
//         new Map<string, Set<string>>( [
//             [ 'pass', new Set() ],
//             [ 'fail', new Set() ],
//         ] )
//     )
//     // console.log( results )
//     console.log( schema.props )
//     console.log( Array.from( results.get( 'pass' ) ?? [] ) )
//     console.log()
//     // console.log( results.get( 'fail' ) )
// }