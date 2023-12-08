import { Check } from './Check.ts'
import { BaseIssue, Issue } from './Issue.ts'
import { SchemaProps } from './makeSchema.ts'
import { Result } from './utils.ts'

export type Validate<Data> = ( x?: unknown ) => Result<Data, Issue[]>
export const makeValidate = <Data> ( props: SchemaProps, check: Check ): Validate<Data> => ( ...args ) => {
    const ctx = {
        ...( args.length == 1 ? { value: args[ 0 ] } : {} ),
        props,
    }
    const result = check( ctx )
    if ( result === undefined ) return { pass: true, data: ctx.value as Data }

    const baseIssue: BaseIssue = { code: 'unknownError', received: ctx.value }

    if ( typeof result === 'string' ) return { pass: false, error: [ { ...baseIssue, message: result } ] }
    if ( Array.isArray( result ) ) return { pass: false, error: result.map( x => ( { ...baseIssue, ...x } ) ) }

    return { pass: false, error: [ { ...baseIssue, ...result } ] }
}