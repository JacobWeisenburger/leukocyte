type LooseAutocomplete<T extends string> = T | ( string & {} )
type AnyFn = ( ...args: any[] ) => any

type ErrorLike = string | { message: string }
export type Result<Data, Error extends ErrorLike | ErrorLike[]> =
    | { pass: true, data: Data }
    | { pass: false, error: Error }

export function stringify ( x: unknown ) {
    if ( x && typeof x == 'object' && 'toJSON' in x && typeof x.toJSON === 'function' )
        return x.toJSON()

    if ( typeof x == 'object' ) return JSON.stringify( x )
    if ( typeof x == 'bigint' ) return `${ x }n`

    return String( x )
}