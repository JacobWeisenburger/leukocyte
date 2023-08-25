export function stringify ( x: unknown ) {
    return typeof x == 'object' ? JSON.stringify( x ) : String( x )
}