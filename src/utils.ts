type LooseAutocomplete<T extends string> = T | ( string & {} )
type AnyFn = ( ...args: any[] ) => any

export type Result<Value, Error> = { value?: Value, error?: Error }

export function stringify ( x: unknown ) {
    return typeof x == 'object' ? JSON.stringify( x ) : String( x )
}