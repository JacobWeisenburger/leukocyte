import { Check } from "./Check.ts"
import { IssueCode, bindMakeIssue } from './Issue.ts'
import { Validate, makeValidate } from './Validate.ts'
import { BaseType } from './baseTypes.ts'

type ErrorMap = Partial<Record<IssueCode, string>>

export type SchemaProps = {
    readonly baseType?: BaseType
    readonly errorMap?: ErrorMap
    readonly nullable?: boolean
    readonly optional?: boolean
}

// export type AnySchema = Schema<any, SchemaProps>
export type AnySchema = Schema<unknown, SchemaProps>
export type Schema<Data, Props extends SchemaProps> = {
    readonly validate: Validate<Data>
    readonly props: Props & {
        readonly optional: unknown extends Props[ 'optional' ] ? boolean | undefined : Props[ 'optional' ]
        readonly nullable: unknown extends Props[ 'nullable' ] ? boolean | undefined : Props[ 'nullable' ]
    }
}

export const makeSchema = <Data> () => <
    const Props extends SchemaProps
> ( {
    check = () => { },
    props = {} as Props,
}: {
    readonly check?: Check,
    readonly props?: Props,
} ): Schema<Data, Props> => {
    const makeIssue = bindMakeIssue( props )

    const checkWrapper: Check = x => {
        // if ( props.baseType === 'never' ) return makeIssue( { code: 'never', message: 'No value will pass' } )
        // if ( props.baseType === 'unknown' ) return
        // if ( props.baseType === 'any' ) return

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
        validate: makeValidate<Data>( checkWrapper ),
    }
}