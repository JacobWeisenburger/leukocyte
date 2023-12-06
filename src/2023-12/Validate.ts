import { Check } from './Check.ts'
import { Issue, BaseIssue } from './Issue.ts'
import { SchemaProps } from './makeSchema.ts'
import { Result } from './utils.ts'

export type Validate<Data> = ( x?: unknown ) => Result<Data, Issue[]>
export const makeValidate = <Data> (
    props: SchemaProps,
    check: Check,
): Validate<Data> => ( ...args ) => {
    const x = args[ 0 ]
    const result = args.length == 1 ? check( x, props ) : check()
    if ( result === undefined ) return { pass: true, data: x as Data }

    const baseIssue: BaseIssue = { code: 'unknownError', received: x }

    if ( typeof result === 'string' ) return { pass: false, error: [ { ...baseIssue, message: result } ] }
    if ( Array.isArray( result ) ) return { pass: false, error: result.map( x => ( { ...baseIssue, ...x } ) ) }
    return { pass: false, error: [ { ...baseIssue, ...result } ] }
}