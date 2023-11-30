import { bindMakeIssue } from './Issue.ts'
import { Check, makeSchema } from './makeSchema.ts'
import { stringify } from './utils.ts'

export function makeLiteralSchema<const Expected> ( expected: Expected ) {
    const propsWithBaseType = { baseType: 'literal', expected } as const
    const makeIssue = bindMakeIssue( propsWithBaseType )

    const check: Check = x => {
        const stringifiedLiteralValue = stringify( expected )

        if ( typeof expected == 'number' && isNaN( expected ) ) {
            if ( typeof x == 'number' && isNaN( x ) ) return
        }

        // console.log( { x, expected } )
        if ( x !== expected ) return makeIssue( {
            code: 'literal:incorrectValue', message: `value is not ${ stringifiedLiteralValue }`,
        } )
    }

    return makeSchema<Expected>()( {
        check,
        props: propsWithBaseType,
    } )
}