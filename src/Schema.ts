import { BaseIssue, Issue, IssueCode, bindMakeIssue } from './Issue.ts'
import { BaseType } from './baseTypes.ts'
import { Result } from './utils.ts'

export type Check = ( x: unknown ) => Issue[ 'message' ] | Issue | void

const makeValidate = ( check: Check ) => <Value> ( x: unknown ): Result<Value, Issue> => {
    const result = check( x )
    if ( result === undefined ) return { value: x as Value }

    const baseIssue: BaseIssue = { code: 'unknownError', received: x }

    if ( typeof result === 'string' ) return { error: { ...baseIssue, message: result } }
    return { error: { ...baseIssue, ...result } }
}

type ErrorMap = Partial<Record<IssueCode, string>>

export type SchemaProps = {
    readonly baseType?: BaseType
    readonly errorMap?: ErrorMap
    readonly nullable?: boolean
    readonly optional?: boolean
}

export type AnySchema = Schema<SchemaProps, {}>
export type Schema<Props extends SchemaProps, Methods extends object> =
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

export function makeSchema<
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