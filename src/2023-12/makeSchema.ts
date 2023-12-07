import { Check, CheckContext } from './Check.ts'
import { IssueCode, bindMakeIssue } from './Issue.ts'
import { Validate, makeValidate } from './Validate.ts'
import { BaseType } from './baseTypes.ts'

type ErrorMap = Partial<Record<IssueCode, string>>

export type SchemaProps = {
    readonly baseType: BaseType
    readonly errorMap?: ErrorMap
    readonly canBeNull?: boolean
    readonly canBeUndefined?: boolean
}

// export type AnySchema = Schema<any, SchemaProps>
export type AnySchema = Schema<unknown, SchemaProps>
export type Schema<Data, Props extends SchemaProps> = {
    readonly validate: Validate<Data>
    readonly props: Props & {
        readonly canBeUndefined: unknown extends Props[ 'canBeUndefined' ]
        ? false : Props[ 'canBeUndefined' ]
        readonly canBeNull: unknown extends Props[ 'canBeNull' ]
        ? false : Props[ 'canBeNull' ]
    }
}

export const makeSchema = <Data> () => <const Props extends SchemaProps> (
    props: Props,
    check: Check<Props>,
): Schema<Data, Props> => {
    const makeIssue = bindMakeIssue( props )
    return {
        props: { canBeNull: false, canBeUndefined: false, ...props } as const,
        validate: makeValidate<Data>(
            props,
            ctx => {
                if ( props.baseType === 'never' ) return makeIssue( {
                    code: 'never', message: 'No value will pass'
                } )
                if ( props.baseType === 'unknown' ) return
                if ( props.baseType === 'any' ) return
                if ( !( 'value' in ctx ) ) return makeIssue( {
                    code: 'required', message: 'Required'
                } )

                if ( ctx.value === undefined && props.canBeUndefined ) return
                if ( ctx.value === null && props.canBeNull ) return

                return check( ctx as CheckContext<Props> )
            }
        ),
    }
}