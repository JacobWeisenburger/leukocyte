// start bash -c 'deno run -A --watch src/2023-12/mod.ts'

import { testSchema } from './testSchema.ts'
import { AnySchema, makeSchema } from './makeSchema.ts'
import { makeStringSchema } from './makeStringSchema.ts'
import { InferTypeFromSchema } from './baseTypes.ts'

export module l {
    export type infer<Schema extends AnySchema> = InferTypeFromSchema<Schema>
}

export const l = {
    schema: makeSchema,
    string: makeStringSchema,
    // number: makeNumberSchema,
    // boolean: makeBooleanSchema,
    // bigint: makeBigintSchema,
    // date: makeDateSchema,
    // literal: makeLiteralSchema,
    // union: makeUnionSchema,
}
export { l as leukocyte }

test_schema()
function test_schema () {
    const schema = l.schema<string>()( {
        props: {
            baseType: 'string',
            // optional: true,
            // nullable: true,
            // length: 3,
        },
        check: x => {
            if ( typeof x !== 'string' ) return 'Not a string'

            if ( schema.props.length && x.length !== schema.props.length )
                return `length is not ${ schema.props.length }`
        },
    } )
    // type Data = l.infer<typeof schema>
    schema.props.baseType
    schema.props.optional
    const result = schema.validate( 'foo' )
    result.pass && result.data
    testSchema( schema )
}

// test_stringSchema()
function test_stringSchema () {
    const schema = l.string( {
        // length: 3,
        minLength: 3,
    } )
    // type Data = l.infer<typeof schema>
    schema.props.baseType
    schema.props.optional
    schema.props.minLength
    const result = schema.validate( 'foo' )
    result.pass && result.data
    testSchema( schema )
}

// // test_stringSchema()
// function test_stringSchema () {
//     // const stringSchema = l.string()
//     //     .nullish()
//     // type stringType = l.infer<typeof stringSchema>
//     // stringSchema.props.baseType
//     // stringSchema.props.optional
//     // const stringResult = stringSchema.validate( 'foo' )
//     // stringResult.success && stringResult.value
//     // testSchema( stringSchema )
// }