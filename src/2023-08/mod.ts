// start bash -c 'deno run -A --watch src/mod.ts'

import { InferTypeFromSchema } from './baseTypes.ts'
import { makeBigintSchema } from './makeBigintSchema.ts'
import { makeBooleanSchema } from './makeBooleanSchema.ts'
import { makeDateSchema } from './makeDateSchema.ts'
import { makeLiteralSchema } from './makeLiteralSchema.ts'
import { makeNumberSchema } from './makeNumberSchema.ts'
import { AnySchema, makeSchema } from './makeSchema.ts'
import { makeStringSchema } from './makeStringSchema.ts'
import { makeSymbolSchema } from './makeSymbolSchema.ts'
import { makeUnionSchema } from './makeUnionSchema.ts'
import { testSchema } from './testSchema.ts'

export module l {
    export type infer<Schema extends AnySchema> = InferTypeFromSchema<Schema>
}

export const l = {
    schema: makeSchema,
    string: makeStringSchema,
    number: makeNumberSchema,
    boolean: makeBooleanSchema,
    bigint: makeBigintSchema,
    date: makeDateSchema,
    symbol: makeSymbolSchema,
    any: () => makeSchema<any>()( { props: { baseType: 'any' } } ),
    unknown: () => makeSchema<unknown>()( { props: { baseType: 'unknown' } } ),
    never: () => makeSchema<never>()( { props: { baseType: 'never' } } ),
    literal: makeLiteralSchema,
    null: () => l.literal( null ),
    undefined: () => l.literal( undefined ),
    void: () => l.literal( undefined ),
    nan: () => l.literal( NaN ),

    union: makeUnionSchema,
}
export { l as leukocyte }

// test_stringSchema()
function test_stringSchema () {
    const stringSchema = l.string()
        .nullish()
    type stringType = l.infer<typeof stringSchema>
    stringSchema.props.baseType
    stringSchema.props.optional
    const stringResult = stringSchema.validate( 'foo' )
    stringResult.success && stringResult.value
    testSchema( stringSchema )
}

// test_numberSchema()
function test_numberSchema () {
    const numberSchema = l.number()
        .optional()
    type numberType = l.infer<typeof numberSchema>
    numberSchema.props.baseType
    numberSchema.props.optional
    const numberResult = numberSchema.validate( 'foo' )
    numberResult.success && numberResult.value
    testSchema( numberSchema )
}

// test_literalSchema()
function test_literalSchema () {
    const literalSchema = l.literal( 42 )
    // .nullable()
    // .optional()
    // .nullish()
    type literalType = l.infer<typeof literalSchema>
    literalSchema.props.baseType
    literalSchema.props.optional
    const literalResult = literalSchema.validate( 'foo' )
    literalResult.success && literalResult.value
    testSchema( literalSchema )
}

// test_nanSchema()
function test_nanSchema () {
    const schema = l.nan()
    // .nullable()
    // .optional()
    // .nullish()
    type Type = l.infer<typeof schema>
    schema.props.baseType
    schema.props.optional
    const result = schema.validate( 'foo' )
    result.success && result.value
    testSchema( schema )
}

test_unionSchema()
function test_unionSchema () {
    const unionSchema1 = l.union( [ l.number(), l.boolean() ] )
    // .optional().nullable()
    const schema = l.union( [
        // l.string(),
        l.number(),
        // l.boolean(),
        unionSchema1,
    ] )
    // .nullable()
    // .optional()
    // .nullish()
    type Type = l.infer<typeof schema>
    schema.props.baseTypes
    schema.props.optional
    const result = schema.validate( 'foo' )
    result.success && result.value
    // testSchema( schema )
}


// unionSchema.props.baseTypes
// type unionType = l.infer<typeof unionSchema>
// testSchema( unionSchema )
// const value = unionSchema.validate( 'foo' ).value