import { AnySchema, makeSchema } from './makeSchema.ts'
// import { makeStringSchema } from './makeStringSchema.ts'
import { InferTypeFromSchema } from './baseTypes.ts'

export module l {
    export type infer<Schema extends AnySchema> = InferTypeFromSchema<Schema>
}

export const l = {
    schema: makeSchema,
    // string: makeStringSchema,
    // number: makeNumberSchema,
    // boolean: makeBooleanSchema,
    // bigint: makeBigintSchema,
    // date: makeDateSchema,
    // literal: makeLiteralSchema,
    // union: makeUnionSchema,
}
export { l as leukocyte }