import { Check } from './Check.ts'
import { Issue, BaseIssue } from './Issue.ts'
import { Result } from './utils.ts'

export type Validate<Data> = ( x: unknown ) => Result<Data, Issue[]>
export const makeValidate = <Data> ( check: Check ): Validate<Data> => x => {
    const result = check( x )
    if ( result === undefined ) return { pass: true, data: x as Data }

    const baseIssue: BaseIssue = { code: 'unknownError', received: x }

    if ( typeof result === 'string' ) return { pass: false, error: [ { ...baseIssue, message: result } ] }
    if ( Array.isArray( result ) ) return { pass: false, error: result.map( x => ( { ...baseIssue, ...x } ) ) }
    return { pass: false, error: [ { ...baseIssue, ...result } ] }
}