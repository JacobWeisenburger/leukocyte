import { Check } from './Check.ts'
import { bindMakeIssue } from './Issue.ts'
import { SchemaProps, makeSchema } from './makeSchema.ts'

export function makeStringSchema<
    const Props extends Omit<SchemaProps, 'baseType'> & {
        readonly length?: number
        readonly maxLength?: number
        readonly minLength?: number
        readonly pattern?: 'url'
        readonly includes?: string
        readonly startsWith?: string
        readonly endsWith?: string
    }
> ( props: Props = {} as Props ) {
    const propsWithBaseType = { ...props, baseType: 'string' } as const
    const makeIssue = bindMakeIssue( propsWithBaseType )

    const check: Check = x => {
        if ( typeof x !== 'string' ) return makeIssue( { code: 'invalidType' } )

        if ( props.length && x.length !== props.length ) return makeIssue( {
            code: 'string:length', message: `length is not ${ props.length }`,
        } )

        if ( props.maxLength && x.length > props.maxLength ) return makeIssue( {
            code: 'string:maxLength', message: `length is greater than ${ props.maxLength }`,
        } )

        if ( props.minLength && x.length < props.minLength ) return makeIssue( {
            code: 'string:minLength', message: `length is less than ${ props.minLength }`,
        } )

        if ( props.includes && !x.includes( props.includes ) ) return makeIssue( {
            code: 'string:includes', message: `does not include ${ props.includes }`,
        } )

        if ( props.startsWith && !x.startsWith( props.startsWith ) ) return makeIssue( {
            code: 'string:startsWith', message: `does not start with ${ props.startsWith }`,
        } )

        if ( props.endsWith && !x.endsWith( props.endsWith ) ) return makeIssue( {
            code: 'string:endsWith', message: `does not end with ${ props.endsWith }`,
        } )

        if ( props.pattern === 'url' ) {
            try { new URL( x ) }
            catch { return makeIssue( { code: 'string:url', message: 'not a valid url' } ) }
        }
    }

    return makeSchema<string>()( {
        check,
        props: propsWithBaseType,
        // methods: prevProps => ( {
        //     length: <T extends number> ( length: T ) => makeStringSchema( { ...prevProps, length } ),
        //     max: <T extends number> ( maxLength: T ) => makeStringSchema( { ...prevProps, maxLength } ),
        //     min: <T extends number> ( minLength: T ) => makeStringSchema( { ...prevProps, minLength } ),
        //     url: () => makeStringSchema( { ...prevProps, pattern: 'url' } ),
        //     includes: <T extends string> ( includes: T ) => makeStringSchema( { ...prevProps, includes } ),
        //     startsWith: <T extends string> ( startsWith: T ) => makeStringSchema( { ...prevProps, startsWith } ),
        //     endsWith: <T extends string> ( endsWith: T ) => makeStringSchema( { ...prevProps, endsWith } ),
        // } ),
    } )
}