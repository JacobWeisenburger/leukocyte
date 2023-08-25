// start bash -c 'deno run -A --watch src/mod.ts'

import { testValues } from './temp.ts'
import { stringify } from './utils.ts'

type LooseAutocomplete<T extends string> = T | ( string & {} )
type AnyFn = ( ...args: any[] ) => any

export module Regex {
    export const emoji = /^(\p{Extended_Pictographic}|\p{Emoji_Component})+$/u
    export const email = /^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i
    // export const cuid = /^c[^\s-]{8,}$/i
    // export const cuid2 = /^[a-z][a-z0-9]*$/
    // export const ulid = /[0-9A-HJKMNP-TV-Z]{26}/
    // export const uuid = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i
    // export const ipv4 = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/

    // export const ipv6 = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/
}

type Result<Value, Error> = { value?: Value, error?: Error }

type IssueCode = typeof issueCodes[ number ]
const issueCodes = [
    'never',
    'unknownError',
    'required',
    'invalidType',
    'stringLength',
    'stringMaxLength',
    'stringMinLength',
    'stringUrl',
    'stringEmoji',
    'stringEmail',
    'stringIncludes',
    'stringStartsWith',
    'stringEndsWith',
    'numberMax',
    'numberMin',
    'numberGreaterThan',
    'numberGreaterThanOrEqual',
    'numberLessThan',
    'numberLessThanOrEqual',
    'numberMultipleOf',
    'numberInteger',
    'numberPositive',
    'numberNonPositive',
    'numberNegative',
    'numberNonNegative',
    'numberFinite',
    'numberSafe',
    'bigIntMax',
    'bigIntMin',
    'bigIntGreaterThan',
    'bigIntGreaterThanOrEqual',
    'bigIntLessThan',
    'bigIntLessThanOrEqual',
    'bigIntMultipleOf',
    'bigIntPositive',
    'bigIntNonPositive',
    'bigIntNegative',
    'bigIntNonNegative',
    'dateInvalid',
    'dateMax',
    'dateMin',
    'dateGreaterThan',
    'dateGreaterThanOrEqual',
    'dateLessThan',
    'dateLessThanOrEqual',
    'literalValue',
] as const

type Issue = {
    code: IssueCode
    message: string
    received?: unknown
    validFormats?: string[]
    // expectedLiteralValue?: unknown
}

type BaseIssue = Pick<Issue, 'code'> & Partial<Omit<Issue, 'code'>>

const bindMakeIssue = <Props extends SchemaProps> ( props: Props ) => ( baseIssue: BaseIssue ): Issue => {
    const message = props.errorMap?.[ baseIssue.code ]
        ?? baseIssue.message
        ?? ( baseIssue.code == 'invalidType' && props.baseType ? `not a ${ props.baseType }` : undefined )
        ?? 'unknown error'
    return { ...baseIssue, message }
}

type Check = ( x: unknown ) => Issue[ 'message' ] | Issue | void
// type CheckMaker<Props extends SchemaProps> = ( props: Props ) => Check

const makeValidate = ( check: Check ) => <Value> ( x: unknown ): Result<Value, Issue> => {
    const result = check( x )
    if ( result === undefined ) return { value: x as Value }

    const baseIssue: BaseIssue = { code: 'unknownError', received: x }

    if ( typeof result === 'string' ) return { error: { ...baseIssue, message: result } }
    return { error: { ...baseIssue, ...result } }
}

type ErrorMap = Partial<Record<IssueCode, string>>

type BaseType = typeof baseTypes[ number ]
const baseTypes = [
    'string',
    'number',
    'bigint',
    'Date',
    'literal',
    'boolean',
    'symbol',
    'NaN',
    'any',
    'unknown',
    'never'
] as const

type SchemaProps = {
    readonly baseType?: BaseType
    readonly errorMap?: ErrorMap
    readonly nullable?: boolean
    readonly optional?: boolean
}

type Schema<Props extends SchemaProps, Methods extends object> =
    & SchemaMethods<Props, Methods>
    & Methods
    & {
        readonly validate: ReturnType<typeof makeValidate>
        readonly props: Props & {
            readonly optional: unknown extends Props[ 'optional' ] ? boolean | undefined : Props[ 'optional' ]
            readonly nullable: unknown extends Props[ 'nullable' ] ? boolean | undefined : Props[ 'nullable' ]
        }
    }

type SchemaMethods<Props extends SchemaProps, Methods extends object> = {
    optional (): Schema<Omit<Props, 'optional'> & { readonly optional: true }, Methods>
    required (): Schema<Omit<Props, 'optional'> & { readonly optional: false }, Methods>
    nullable (): Schema<Omit<Props, 'nullable'> & { readonly nullable: true }, Methods>
    nonNullable (): Schema<Omit<Props, 'nullable'> & { readonly nullable: false }, Methods>
    nullish (): Schema<Omit<Props, 'nullable' | 'optional'> & {
        readonly nullable: true, readonly optional: true
    }, Methods>
}

function makeSchema<
    const Props extends SchemaProps,
    const Methods extends object,
> ( {
    check,
    props = {} as Props,
    methods = ( () => ( {} ) as Methods ) as ( prevProps: Props ) => Methods,
}: {
    readonly check: Check,
    readonly props?: Props,
    readonly methods?: ( prevProps: Props ) => Methods,
} ): Schema<Props, Methods> {
    const makeIssue = bindMakeIssue( props )

    const checkWrapper: Check = x => {
        if ( x === undefined ) {
            if ( props.optional ) return
            if ( 'literalValue' in props && props.literalValue === undefined ) return
            return makeIssue( { code: 'required', message: 'Required' } )
        }

        if ( x === null && ( props.nullable ) ) return

        return check( x )
    }

    const newProps = {
        nullable: false,
        optional: false,
        ...props
    }

    return {
        props: newProps,
        ...methods( newProps ),

        validate: makeValidate( checkWrapper ),

        optional: () => makeSchema( { check, methods, props: { ...newProps, optional: true } } ),
        required: () => makeSchema( { check, methods, props: { ...newProps, optional: false } } ),
        nullable: () => makeSchema( { check, methods, props: { ...newProps, nullable: true } } ),
        nonNullable: () => makeSchema( { check, methods, props: { ...newProps, nullable: false } } ),
        nullish: () => makeSchema( { check, methods, props: { ...newProps, nullable: true, optional: true } } ),
    }
}

function makeStringSchema<
    const Props extends Omit<SchemaProps, 'baseType'> & {
        readonly length?: number
        readonly maxLength?: number
        readonly minLength?: number
        readonly pattern?: 'url' | 'emoji' | 'email'
        readonly includes?: string
        readonly startsWith?: string
        readonly endsWith?: string
    },
> ( props: Props = {} as Props ) {
    const propsWithBaseType = { ...props, baseType: 'string' } as const

    const makeIssue = bindMakeIssue( propsWithBaseType )
    const check: Check = x => {
        if ( typeof x !== 'string' ) return makeIssue( { code: 'invalidType' } )

        if ( props.length && x.length !== props.length ) return makeIssue( {
            code: 'stringLength', message: `length is not ${ props.length }`,
        } )

        if ( props.maxLength && x.length > props.maxLength ) return makeIssue( {
            code: 'stringMaxLength', message: `length is greater than ${ props.maxLength }`,
        } )

        if ( props.minLength && x.length < props.minLength ) return makeIssue( {
            code: 'stringMinLength', message: `length is less than ${ props.minLength }`,
        } )

        if ( props.includes && !x.includes( props.includes ) ) return makeIssue( {
            code: 'stringIncludes', message: `does not include ${ props.includes }`,
        } )

        if ( props.startsWith && !x.startsWith( props.startsWith ) ) return makeIssue( {
            code: 'stringStartsWith', message: `does not start with ${ props.startsWith }`,
        } )

        if ( props.endsWith && !x.endsWith( props.endsWith ) ) return makeIssue( {
            code: 'stringEndsWith', message: `does not end with ${ props.endsWith }`,
        } )

        if ( props.pattern === 'url' ) {
            try { new URL( x ) }
            catch { return makeIssue( { code: 'stringUrl', message: 'not a valid url' } ) }
        }

        if ( props.pattern === 'emoji' && !Regex.emoji.test( x ) ) return makeIssue( {
            code: 'stringEmoji', message: 'not a valid emoji',
        } )

        if ( props.pattern === 'email' && !Regex.email.test( x ) ) return makeIssue( {
            code: 'stringEmail', message: 'not a valid email',
            validFormats: [ 'x@x.xx' ],
        } )
    }

    return makeSchema( {
        // check: x => { },
        check,
        props: propsWithBaseType,
        methods: prevProps => {
            return {
                length: <Value extends number> ( length: Value ) => makeStringSchema( { ...prevProps, length } ),
                max: <Value extends number> ( maxLength: Value ) => makeStringSchema( { ...prevProps, maxLength } ),
                min: <Value extends number> ( minLength: Value ) => makeStringSchema( { ...prevProps, minLength } ),
                url: () => makeStringSchema( { ...prevProps, pattern: 'url' } ),
                emoji: () => makeStringSchema( { ...prevProps, pattern: 'emoji' } ),
                email: () => makeStringSchema( { ...prevProps, pattern: 'email' } ),
                includes: <Value extends string> ( includes: Value ) => makeStringSchema( { ...prevProps, includes } ),
                startsWith: <Value extends string> ( startsWith: Value ) => makeStringSchema( { ...prevProps, startsWith } ),
                endsWith: <Value extends string> ( endsWith: Value ) => makeStringSchema( { ...prevProps, endsWith } ),
            }
        },
    } )
}


// console.log( 'hello leukocyte' )

export const leukocyte = {
    schema: makeSchema,
    string: makeStringSchema,
    // number: makeSchema( 'number' ),
    // bigint: makeSchema( 'bigint' ),
    // boolean: makeSchema( 'boolean' ),
    // date: makeSchema( 'Date' ),
    // symbol: makeSchema( 'symbol' ),
    // literal: makeLiteralSchema,
    // null: () => makeLiteralSchema( null ),
    // undefined: () => makeLiteralSchema( undefined ),
    // void: () => makeLiteralSchema( undefined ),
    // NaN: makeSchema( 'NaN' ),
    // any: makeSchema( 'any' ),
    // unknown: makeSchema( 'unknown' ),
    // never: makeSchema( 'never' ),
}
export const l = leukocyte


// const stringSchema = l.string( {
//     // length: 3,
//     // includes: 'foo',
//     // optional: true,
//     // nullable: true,
//     // foo: 'bar',
// } )
// .optional()
// .nullable()
// .length( 3 )
// .nullish()
// .max( 3 )
// .nullable()
// .includes( 'foo' )
// .optional()
// .required()

// console.log( stringSchema )
// console.log( stringSchema.props )
// stringSchema.props.baseType
// stringSchema.props.maxLength
// // stringSchema.props.length
// // stringSchema.props.includes
// stringSchema.props.optional
// stringSchema.props.nullable

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

function testSchema<const Props extends SchemaProps> ( schema: Schema<Props, {}> ) {
    const results = [
        ...testValues,
        -42,
        0,
        -42n,
        0n,
        '🤖',
        'foo@foo.foo',
        'foo:foo',
    ].reduce(
        ( map: Map<string, Set<string>>, x ) => {
            const key = schema.validate( x ).error ? 'fail' : 'pass'
            const value = stringify( x )
            const set = map.get( key ) ?? new Set()
            return map.set( key, set.add( value ) )
        },
        new Map<string, Set<string>>( [
            [ 'pass', new Set() ],
            [ 'fail', new Set() ],
        ] )
    )
    // console.log( results )
    console.log( schema.props )
    console.log( Array.from( results.get( 'pass' ) ?? [] ) )
    console.log()
    // console.log( results.get( 'fail' ) )
}

// console.log( '// TODO filter out props that are not valid for the baseType' )