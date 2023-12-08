import { Check, CheckContext } from './Check.ts'
import { IssueCode, bindMakeIssue } from './Issue.ts'
import { SchemaProps, makeSchema } from './makeSchema.ts'

type StringProps = {
    readonly length?: number
    readonly maxLength?: number
    readonly minLength?: number
    readonly pattern?: 'url'
    readonly includes?: string
    readonly startsWith?: string
    readonly endsWith?: string
    readonly errorMap?: ( ctx: CheckContext<SchemaProps & StringProps> ) => Partial<Record<IssueCode, string>>
}

export function makeStringSchema<
    const Props extends Omit<SchemaProps, 'baseType'> & StringProps
> ( props: Props = {} as Props ) {
    const propsWithBaseType = { baseType: 'string', ...props } as const
    const makeIssue = bindMakeIssue( propsWithBaseType )

    const check: Check = ctx => {
        if ( typeof ctx.value !== 'string' ) return makeIssue( { code: 'invalidType' } )

        if ( props.length && ctx.value.length !== props.length ) return makeIssue( {
            code: 'string:length', message: `length is not ${ props.length }`,
        } )

        if ( props.maxLength && ctx.value.length > props.maxLength ) return makeIssue( {
            code: 'string:maxLength', message: `length is greater than ${ props.maxLength }`,
        } )

        if ( props.minLength && ctx.value.length < props.minLength ) return makeIssue( {
            code: 'string:minLength', message: `length is less than ${ props.minLength }`,
        } )

        if ( props.includes && !ctx.value.includes( props.includes ) ) return makeIssue( {
            code: 'string:includes', message: `does not include ${ props.includes }`,
        } )

        if ( props.startsWith && !ctx.value.startsWith( props.startsWith ) ) return makeIssue( {
            code: 'string:startsWith', message: `does not start with ${ props.startsWith }`,
        } )

        if ( props.endsWith && !ctx.value.endsWith( props.endsWith ) ) return makeIssue( {
            code: 'string:endsWith', message: `does not end with ${ props.endsWith }`,
        } )

        if ( props.pattern === 'url' ) {
            try { new URL( ctx.value ) }
            catch { return makeIssue( { code: 'string:url', message: 'not a valid url' } ) }
        }
    }

    return makeSchema<string>()(
        propsWithBaseType as typeof propsWithBaseType & {
            readonly [ key in keyof StringProps ]: unknown extends Props[ key ] ? undefined : Props[ key ]
        },
        check,
    )
}