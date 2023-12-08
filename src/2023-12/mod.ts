import { InferTypeFromSchema } from './baseTypes.ts'
import { makeNumberSchema } from './makeNumberSchema.ts'
import { AnySchema, makeSchema } from './makeSchema.ts'
import { makeStringSchema } from './makeStringSchema.ts'

export module leukocyte {
    export type infer<Schema extends AnySchema> = InferTypeFromSchema<Schema>
}

export const leukocyte = {
    schema: makeSchema,
    string: makeStringSchema,
    number: makeNumberSchema,
    // boolean: makeBooleanSchema,
    // bigint: makeBigintSchema,
    // date: makeDateSchema,
    // literal: makeLiteralSchema,
    // union: makeUnionSchema,
}
export { leukocyte as l }