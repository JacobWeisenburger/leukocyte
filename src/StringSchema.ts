import { bindMakeIssue } from './Issue.ts'
import { Regex } from './Regex.ts'
import { Check, SchemaProps, makeSchema } from './Schema.ts'

export function makeStringSchema<
    const Props extends Omit<SchemaProps, 'baseType'> & {
        readonly length?: number
        readonly maxLength?: number
        readonly minLength?: number
        readonly pattern?: 'url' | 'emoji' | 'email'
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

        if ( props.pattern === 'emoji' && !Regex.emoji.test( x ) ) return makeIssue( {
            code: 'string:emoji', message: 'not a valid emoji',
        } )

        if ( props.pattern === 'email' && !Regex.email.test( x ) ) return makeIssue( {
            code: 'string:email', message: 'not a valid email',
            validFormats: [ 'x@x.xx' ],
        } )
    }

    return makeSchema( {
        check,
        props: propsWithBaseType,
        methods: prevProps => ( {
            length: <Value extends number> ( length: Value ) => makeStringSchema( { ...prevProps, length } ),
            max: <Value extends number> ( maxLength: Value ) => makeStringSchema( { ...prevProps, maxLength } ),
            min: <Value extends number> ( minLength: Value ) => makeStringSchema( { ...prevProps, minLength } ),
            url: () => makeStringSchema( { ...prevProps, pattern: 'url' } ),
            emoji: () => makeStringSchema( { ...prevProps, pattern: 'emoji' } ),
            email: () => makeStringSchema( { ...prevProps, pattern: 'email' } ),
            includes: <Value extends string> ( includes: Value ) => makeStringSchema( { ...prevProps, includes } ),
            startsWith: <Value extends string> ( startsWith: Value ) => makeStringSchema( { ...prevProps, startsWith } ),
            endsWith: <Value extends string> ( endsWith: Value ) => makeStringSchema( { ...prevProps, endsWith } ),
        } ),
    } )
}