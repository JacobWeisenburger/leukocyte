// start bash -c 'deno run -A --watch src/mod.ts'

import { InferTypeFromSchema } from './baseTypes.ts'
import { makeBigintSchema } from './makeBigintSchema.ts'
import { makeBooleanSchema } from './makeBooleanSchema.ts'
import { makeDateSchema } from './makeDateSchema.ts'
import { makeLiteralSchema } from './makeLiteralSchema.ts'
import { makeNumberSchema } from './makeNumberSchema.ts'
import { AnySchema, Schema, makeSchema } from './makeSchema.ts'
import { makeStringSchema } from './makeStringSchema.ts'
import { makeSymbolSchema } from './makeSymbolSchema.ts'
import { makeUnionSchema } from './makeUnionSchema.ts'
import { testSchema } from './testSchema.ts'

export module l {
    export type infer<S extends AnySchema> = S extends Schema<infer Val, any, any> ? Val : never
    // export type infer<Schema extends AnySchema> = InferTypeFromSchema<Schema>
}

export const l = {
    schema: makeSchema,
    string: makeStringSchema,
    // number: makeNumberSchema,
    // boolean: makeBooleanSchema,
    // bigint: makeBigintSchema,
    // date: makeDateSchema,
    // symbol: makeSymbolSchema,
    // any: () => makeSchema( { props: { baseType: 'any' } } ),
    // unknown: () => makeSchema( { props: { baseType: 'unknown' } } ),
    // never: () => makeSchema( { props: { baseType: 'never' } } ),
    // literal: makeLiteralSchema,
    // null: () => l.literal( null ),
    // undefined: () => l.literal( undefined ),
    // void: () => l.literal( undefined ),
    // nan: () => l.literal( NaN ),

    // union: makeUnionSchema,
}
export { l as leukocyte }

// const numberSchema = l.number().max( 3 ).integer().nullable()
// const booleanSchema = l.boolean().nullish()
// const literalSchema = l.literal( 42 )
// const bigintSchema = l.bigint()
// const dateSchema = l.date()
// const nanSchema = l.nan()

// const nullSchema = l.null()
// const undefinedSchema = l.undefined()
// const voidSchema = l.void()

// type numberType = l.infer<typeof numberSchema>
// type booleanType = l.infer<typeof booleanSchema>
// type literalType = l.infer<typeof literalSchema>
// type bigintType = l.infer<typeof bigintSchema>
// type dateType = l.infer<typeof dateSchema>
// type nanType = l.infer<typeof nanSchema>
// type nullType = l.infer<typeof nullSchema>
// type undefinedType = l.infer<typeof undefinedSchema>
// type voidType = l.infer<typeof voidSchema>

// console.log(
//     Object.fromEntries(
//         Object.entries( {
//             stringSchema,
//             numberSchema,
//             booleanSchema,
//             literalSchema,
//             bigintSchema,
//             dateSchema,
//             nanSchema,
//             nullSchema,
//             undefinedSchema,
//             voidSchema,
//         } ).map( ( [ key, value ] ) => [
//             key.replace( 'Schema', 'Props' ),
//             value.props
//         ] )
//     )
// )

// console.log( stringSchema )
// console.log( stringSchema.props )
// stringSchema.props.baseType
// stringSchema.props.length
// stringSchema.props.includes
// stringSchema.props.optional
// stringSchema.props.nullable



// // console.log( numberSchema )
// console.log( numberSchema.props )
// numberSchema.props.baseType
// numberSchema.props.length
// numberSchema.props.includes
// numberSchema.props.optional
// numberSchema.props.nullable

// testSchema( nanSchema )
// testSchema( dateSchema )
// testSchema( l.string().url() )
// testSchema( l.any() )
// testSchema( l.unknown() )
// testSchema( l.never() )
// testSchema( literalSchema )
// testSchema( undefinedSchema )
// testSchema( nullSchema )
// testSchema( voidSchema )

// type stringType = l.infer<typeof stringSchema>
const stringSchema = l.string()
    // .length( 3 )
    // .includes( 'foo' )
    // // .nullish()
    .optional()
stringSchema.props.baseType
stringSchema.props.optional
const result = stringSchema.validate( 'foo' )
result.success && result.value

// const unionSchema = l.union( [
//     l.string().optional().nullable(),
//     l.union( [ l.number(), l.boolean() ] ).optional().nullable(),
// ] )
// unionSchema.props.baseTypes
// type unionType = l.infer<typeof unionSchema>
// testSchema( unionSchema )
// const value = unionSchema.validate( 'foo' ).value