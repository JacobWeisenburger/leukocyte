import { AnySchema, Schema } from './makeSchema.ts'

const dateIssueCodes = [
    'max',
    'min',
    'greaterThan',
    'greaterThanOrEqual',
    'lessThan',
    'lessThanOrEqual',
] as const

const bigintIssueCodes = [
    ...dateIssueCodes,
    'multipleOf',
    'positive',
    'nonPositive',
    'negative',
    'nonNegative',
] as const

const baseTypesToIssueCodesConfig = {
    string: [
        'length',
        'maxLength',
        'minLength',
        'url',
        'emoji',
        'email',
        'includes',
        'startsWith',
        'endsWith'
    ],
    number: [
        ...bigintIssueCodes,
        'integer',
        'finite',
        'safe',
    ],
    bigint: bigintIssueCodes,
    date: [
        'invalid',
        ...dateIssueCodes,
    ],
    literal: [
        'incorrectValue',
    ],
    boolean: [],
    symbol: [],
    any: [],
    unknown: [],
    never: [],

    // union: [],
} as const

export type BaseType = keyof typeof baseTypesToIssueCodesConfig

export type InferTypeFromSchema<schema extends AnySchema> = schema extends Schema<infer Val, {}, {}> ? Val : never

export const baseTypeIssueCodes = (
    Object.keys( baseTypesToIssueCodesConfig ) as BaseType[]
).flatMap( baseType =>
    baseTypesToIssueCodesConfig[ baseType ].map( code => `${ baseType }:${ code }` as const ) as any as {
        [ Key in BaseType ]:
        typeof baseTypesToIssueCodesConfig[ Key ] extends readonly ( infer SubCode )[]
        ? SubCode extends string ? `${ Key }:${ SubCode }` : never
        : never
    }[ BaseType ]
)

type test1 = any[] extends ( infer T extends string )[] ? T : false
type test2 = never[] extends ( infer T extends string )[] ? T : false
// type test2 = string extends never ? true : false