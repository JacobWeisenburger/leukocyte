import { AnySchema } from "./Schema.ts"

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
    nan: [],
    any: [],
    unknown: [],
    never: [],
} as const

export type BaseType = keyof typeof baseTypesToIssueCodesConfig

export type InferBaseTypeFromSchema<Schema extends AnySchema> =
    'string' extends Schema[ 'props' ][ 'baseType' ] ? string
    : 'number' extends Schema[ 'props' ][ 'baseType' ] ? number
    : 'bigint' extends Schema[ 'props' ][ 'baseType' ] ? bigint
    : 'date' extends Schema[ 'props' ][ 'baseType' ] ? Date
    : 'boolean' extends Schema[ 'props' ][ 'baseType' ] ? boolean
    : 'literal' extends Schema[ 'props' ][ 'baseType' ] ? Schema[ 'props' ] extends {
        expected: infer Expected
    } ? Expected : never
    : never

export type InferTypeFromSchema<Schema extends AnySchema> =
    InferBaseTypeFromSchema<Schema>
    | ( Schema[ 'props' ][ 'optional' ] extends true ? undefined : never )
    | ( Schema[ 'props' ][ 'nullable' ] extends true ? null : never )

export const baseTypeIssueCodes = (
    Object.keys( baseTypesToIssueCodesConfig ) as BaseType[]
).flatMap( baseType =>
    baseTypesToIssueCodesConfig[ baseType ].map( code => `${ baseType }:${ code }` as const ) as any as {
        [ K in BaseType ]:
        typeof baseTypesToIssueCodesConfig[ K ] extends readonly ( infer T )[]
        ? T extends string ? `${ K }:${ T }` : never
        : never
    }[ BaseType ]
)