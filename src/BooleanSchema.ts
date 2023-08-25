import { bindMakeIssue } from './Issue.ts'
import { SchemaProps, Check, makeSchema } from './Schema.ts'

export function makeBooleanSchema<const Props extends Omit<SchemaProps, 'baseType'>> ( props: Props = {} as Props ) {

    const propsWithBaseType = { ...props, baseType: 'boolean' } as const
    const makeIssue = bindMakeIssue( propsWithBaseType )

    const check: Check = x => {
        if ( typeof x !== 'boolean' ) return makeIssue( { code: 'invalidType' } )
    }

    return makeSchema( {
        check,
        props: propsWithBaseType,
    } )
}