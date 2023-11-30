// function getType ( x: unknown ): LooseAutocomplete<Types> {
//     if ( x === null ) return 'null'
//     if ( typeof x === 'object' && x.constructor.name ) return x.constructor.name
//     if ( typeof x === 'number' && isNaN( x ) ) return 'NaN'
//     return typeof x
// }

// test_getType()
// function test_getType () {
//     const tests: { input: unknown, expected: string }[] = [
//         { input: undefined, expected: 'undefined' },
//         { input: null, expected: 'null' },
//         { input: NaN, expected: 'NaN' },
//         { input: 42, expected: 'number' },
//         { input: Number(), expected: 'number' },
//         { input: 42n, expected: 'bigint' },
//         { input: BigInt( 42 ), expected: 'bigint' },
//         { input: true, expected: 'boolean' },
//         { input: Boolean(), expected: 'boolean' },
//         { input: 'string', expected: 'string' },
//         { input: String(), expected: 'string' },
//         { input: {}, expected: 'Object' },
//         { input: [], expected: 'Array' },
//         { input: Symbol(), expected: 'symbol' },
//         { input: () => { }, expected: 'function' },
//         { input: function () { }, expected: 'function' },
//         { input: Function( 'hi' ), expected: 'function' },
//         { input: /regex/, expected: 'RegExp' },
//         { input: RegExp( '' ), expected: 'RegExp' },
//         { input: new RegExp( '' ), expected: 'RegExp' },
//         { input: new Date, expected: 'Date' },
//         { input: new URL( 'http://example.com' ), expected: 'URL' },
//     ]
//     tests.forEach( ( { input, expected } ) => {
//         const output = getType( input )
//         console.assert(
//             getType( input ) === expected,
//             { input, output, expected }
//         )
//     } )
// }