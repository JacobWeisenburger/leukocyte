import { bindMakeIssue } from './Issue.ts'
import { SchemaProps, Check, makeSchema } from './makeSchema.ts'

export function makeSymbolSchema<const Props extends Omit<SchemaProps, 'baseType'>> ( props: Props = {} as Props ) {

    const propsWithBaseType = { ...props, baseType: 'symbol' } as const
    const makeIssue = bindMakeIssue( propsWithBaseType )

    const check: Check = x => {
        if ( typeof x !== 'symbol' ) return makeIssue( { code: 'invalidType' } )
    }

    return makeSchema( {
        check,
        props: propsWithBaseType,
    } )
}