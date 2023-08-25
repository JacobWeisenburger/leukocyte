type LooseAutocomplete<T extends string> = T | ( string & {} )
type AnyFn = ( ...args: any[] ) => any

export type Result<Value, Error> = { value?: Value, error?: Error }

export function stringify ( x: unknown ) {
    if ( x && typeof x == 'object' && 'toJSON' in x && typeof x.toJSON === 'function' )
        return x.toJSON()

    if ( typeof x == 'object' ) return JSON.stringify( x )

    if ( typeof x == 'bigint' ) return `${ x }n`

    return String( x )
} 