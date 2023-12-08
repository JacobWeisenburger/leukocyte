import { Check, CheckContext } from './Check.ts'
import { IssueCode, bindMakeIssue } from './Issue.ts'
import { Validate, makeValidate } from './Validate.ts'
import { BaseType } from './baseTypes.ts'

export type SchemaProps = {
    readonly baseType: BaseType
    readonly errorMap?: ( ctx: CheckContext ) => Partial<Record<IssueCode, string>>
    readonly allowNull?: boolean
    readonly allowUndefined?: boolean
}

// export type AnySchema = Schema<any, SchemaProps>
export type AnySchema = Schema<unknown, SchemaProps & {}>
export type Schema<Data, Props extends SchemaProps> = {
    readonly validate: Validate<Data>
    readonly props: Props
}

export const makeSchema = <Data> () => <const Props extends SchemaProps> (
    props: Props,
    check: Check<Props>,
) => {
    const makeIssue = bindMakeIssue( props )
    return {
        props,
        validate: makeValidate<Data>(
            props,
            ctx => {
                if ( props.baseType === 'never' ) return makeIssue( { code: 'never', message: 'No value will pass' } )
                if ( props.baseType === 'unknown' ) return
                if ( props.baseType === 'any' ) return
                if ( !( 'value' in ctx ) ) return makeIssue( { code: 'missingValue', message: 'Required' } )
                if ( ctx.value === undefined && props.allowUndefined ) return
                if ( ctx.value === null && props.allowNull ) return
                return check( ctx as CheckContext<Props> )
            }
        ),
    } as Schema<Data, Props & {
        readonly [ key in keyof SchemaProps ]: unknown extends Props[ key ] ? undefined : Props[ key ]
    }>
}