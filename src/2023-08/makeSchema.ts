import { BaseIssue, Issue, IssueCode, bindMakeIssue } from './Issue.ts'
import { BaseType } from './baseTypes.ts'
import { Result } from './utils.ts'

export type Check = ( x: unknown ) => Issue[ 'message' ] | Issue | Issue[] | void

export type Validate<Value> = ( x: unknown ) => Result<Value, Issue[]>
const makeValidate = <Value> ( check: Check ): Validate<Value> => x => {
    const result = check( x )
    if ( result === undefined ) return { success: true, value: x as Value }

    const baseIssue: BaseIssue = { code: 'unknownError', received: x }

    if ( typeof result === 'string' ) return { success: false, error: [ { ...baseIssue, message: result } ] }
    if ( Array.isArray( result ) ) return { success: false, error: result.map( x => ( { ...baseIssue, ...x } ) ) }
    return { success: false, error: [ { ...baseIssue, ...result } ] }
}

type ErrorMap = Partial<Record<IssueCode, string>>

export type SchemaProps = {
    readonly baseType?: BaseType
    readonly errorMap?: ErrorMap
    readonly nullable?: boolean
    readonly optional?: boolean
}

export type AnySchema = Schema<any, SchemaProps, {}>
// export type AnySchema = Schema<unknown, SchemaProps, {}>
export type Schema<
    Value,
    Props extends SchemaProps,
    Methods extends object,
> =
    & SchemaMethods<Value, Props, Methods>
    & Methods
    & {
        readonly validate: Validate<Value>
        readonly props: Props & {
            readonly optional: unknown extends Props[ 'optional' ] ? boolean | undefined : Props[ 'optional' ]
            readonly nullable: unknown extends Props[ 'nullable' ] ? boolean | undefined : Props[ 'nullable' ]
        }
    }

type SchemaMethods<
    Value,
    Props extends SchemaProps,
    Methods extends object,
> = {
    optional (): Schema<Value | undefined, Omit<Props, 'optional'> & { readonly optional: true }, Methods>
    required (): Schema<Exclude<Value, undefined>, Omit<Props, 'optional'> & { readonly optional: false }, Methods>
    nullable (): Schema<Value | null, Omit<Props, 'nullable'> & { readonly nullable: true }, Methods>
    nonNullable (): Schema<Exclude<Value, null>, Omit<Props, 'nullable'> & { readonly nullable: false }, Methods>
    nullish (): Schema<Value | null | undefined, Omit<Props, 'nullable' | 'optional'> & {
        readonly nullable: true, readonly optional: true
    }, Methods>
}

export const makeSchema = <Value> () => <
    const Props extends SchemaProps,
    const Methods extends object,
> ( {
    check = () => { },
    props = {} as Props,
    methods = ( () => ( {} ) as Methods ) as ( prevProps: Props ) => Methods,
}: {
    readonly check?: Check,
    readonly props?: Props,
    readonly methods?: ( prevProps: Props ) => Methods,
} ): Schema<Value, Props, Methods> => {
    const makeIssue = bindMakeIssue( props )

    const checkWrapper: Check = x => {
        if ( props.baseType === 'never' ) return makeIssue( { code: 'never', message: 'No value will pass' } )
        if ( props.baseType === 'unknown' ) return
        if ( props.baseType === 'any' ) return

        if ( x === undefined ) {
            if ( props.optional ) return
            if ( 'expected' in props && props.expected === undefined ) return
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

        validate: makeValidate<Value>( checkWrapper ),

        optional: () => makeSchema<Value | undefined>()( {
            check, methods, props: { ...newProps, optional: true }
        } ),
        required: () => makeSchema<Exclude<Value, undefined>>()( {
            check, methods, props: { ...newProps, optional: false }
        } ),
        nullable: () => makeSchema<Value | null>()( {
            check, methods, props: { ...newProps, nullable: true }
        } ),
        nonNullable: () => makeSchema<Exclude<Value, null>>()( {
            check, methods, props: { ...newProps, nullable: false }
        } ),
        nullish: () => makeSchema<Value | null | undefined>()( {
            check, methods, props: { ...newProps, nullable: true, optional: true }
        } ),
    }
}