export const testValues = [
    undefined,
    null,
    NaN,
    42,
    42n,
    true,
    'string',
    {},
    [],
    Symbol(),
    () => { },
    /regex/,
    new Date,
    new URL( 'http://example.com' ),
] as const

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

// type NumberSchemaProps = {
//     readonly baseType: 'number'
//     readonly max?: number
//     readonly min?: number
//     readonly gt?: number
//     readonly gte?: number
//     readonly lt?: number
//     readonly lte?: number
//     readonly multipleOf?: number
//     readonly integer?: boolean
//     readonly positive?: boolean
//     readonly nonPositive?: boolean
//     readonly negative?: boolean
//     readonly nonNegative?: boolean
//     readonly finite?: boolean
//     readonly safe?: boolean
// }

// type BigIntSchemaProps = {
//     readonly baseType: 'bigint'
//     readonly max?: bigint
//     readonly min?: bigint
//     readonly gt?: bigint
//     readonly gte?: bigint
//     readonly lt?: bigint
//     readonly lte?: bigint
//     readonly multipleOf?: bigint
//     readonly positive?: boolean
//     readonly nonPositive?: boolean
//     readonly negative?: boolean
//     readonly nonNegative?: boolean
// }

// type DateSchemaProps = {
//     readonly baseType: 'Date'
//     readonly max?: Date
//     readonly min?: Date
//     readonly gt?: Date
//     readonly gte?: Date
//     readonly lt?: Date
//     readonly lte?: Date
// }

// type LiteralSchemaProps = {
//     readonly baseType: 'literal'
//     readonly literalValue: unknown
// }

// type NumberSchemaMethods<Props extends SchemaProps> = {
//     max<Value extends number> ( max: Value ): Schema<Props & { max: Value }>
//     min<Value extends number> ( min: Value ): Schema<Props & { min: Value }>
//     gt<Value extends number> ( gt: Value ): Schema<Props & { gt: Value }>
//     gte<Value extends number> ( gte: Value ): Schema<Props & { gte: Value }>
//     lt<Value extends number> ( lt: Value ): Schema<Props & { lt: Value }>
//     lte<Value extends number> ( lte: Value ): Schema<Props & { lte: Value }>
//     multipleOf<Value extends number> ( multipleOf: Value ): Schema<Props & { multipleOf: Value }>
//     integer (): Schema<Props & { integer: true }>
//     positive (): Schema<Props & { positive: true }>
//     nonPositive (): Schema<Props & { nonPositive: true }>
//     negative (): Schema<Props & { negative: true }>
//     nonNegative (): Schema<Props & { nonNegative: true }>
//     finite (): Schema<Props & { finite: true }>
//     safe (): Schema<Props & { safe: true }>
// }

// type BigIntSchemaMethods<Props extends SchemaProps & BigIntSchemaProps> = {
//     max<Value extends bigint> ( max: Value ): Schema<Props & { max: Value }>
//     min<Value extends bigint> ( min: Value ): Schema<Props & { min: Value }>
//     gt<Value extends bigint> ( gt: Value ): Schema<Props & { gt: Value }>
//     gte<Value extends bigint> ( gte: Value ): Schema<Props & { gte: Value }>
//     lt<Value extends bigint> ( lt: Value ): Schema<Props & { lt: Value }>
//     lte<Value extends bigint> ( lte: Value ): Schema<Props & { lte: Value }>
//     multipleOf<Value extends bigint> ( multipleOf: Value ): Schema<Props & { multipleOf: Value }>
//     positive (): Schema<Props & { positive: true }>
//     nonPositive (): Schema<Props & { nonPositive: true }>
//     negative (): Schema<Props & { negative: true }>
//     nonNegative (): Schema<Props & { nonNegative: true }>
// }

// type DateSchemaMethods<Props extends SchemaProps & DateSchemaProps> = {
//     max<Value extends Date> ( max: Value ): Schema<Props & { max: Value }>
//     min<Value extends Date> ( min: Value ): Schema<Props & { min: Value }>
//     gt<Value extends Date> ( gt: Value ): Schema<Props & { gt: Value }>
//     gte<Value extends Date> ( gte: Value ): Schema<Props & { gte: Value }>
//     lt<Value extends Date> ( lt: Value ): Schema<Props & { lt: Value }>
//     lte<Value extends Date> ( lte: Value ): Schema<Props & { lte: Value }>
// }

// const makeNumberCheck: CheckMaker<SchemaProps & NumberSchemaProps> = props => {
//     const makeIssue = bindMakeIssue( props )
//     return x => {
//         if ( typeof x !== 'number' ) return makeIssue( { code: 'invalidType' } )

//         if ( props.max && x > props.max ) return makeIssue( {
//             code: 'numberMax', message: `number is greater than ${ props.max }`,
//         } )

//         if ( props.min && x < props.min ) return makeIssue( {
//             code: 'numberMin', message: `number is less than ${ props.min }`,
//         } )

//         if ( props.gt && x <= props.gt ) return makeIssue( {
//             code: 'numberGreaterThan', message: `number is not greater than ${ props.gt }`,
//         } )

//         if ( props.lt && x >= props.lt ) return makeIssue( {
//             code: 'numberLessThan', message: `number is not less than ${ props.lt }`,
//         } )

//         if ( props.multipleOf && x % props.multipleOf !== 0 ) return makeIssue( {
//             code: 'numberMultipleOf', message: `number is not a multiple of ${ props.multipleOf }`,
//         } )

//         if ( props.integer && !Number.isInteger( x ) ) return makeIssue( {
//             code: 'numberInteger', message: `number is not an integer`,
//         } )

//         if ( props.positive && x <= 0 ) return makeIssue( {
//             code: 'numberPositive', message: `number is not positive`,
//         } )

//         if ( props.nonPositive && x > 0 ) return makeIssue( {
//             code: 'numberNonPositive', message: `number is not nonPositive`,
//         } )

//         if ( props.negative && x >= 0 ) return makeIssue( {
//             code: 'numberNegative', message: `number is not negative`,
//         } )

//         if ( props.nonNegative && x < 0 ) return makeIssue( {
//             code: 'numberNonNegative', message: `number is not nonNegative`,
//         } )

//         if ( props.finite && !Number.isFinite( x ) ) return makeIssue( {
//             code: 'numberFinite', message: `number is not finite`,
//         } )

//         if ( props.safe && x >= Number.MIN_SAFE_INTEGER && x <= Number.MAX_SAFE_INTEGER ) return makeIssue( {
//             code: 'numberSafe', message: `number is not safe`,
//         } )
//     }
// }

// const makeBigIntCheck: CheckMaker<SchemaProps & BigIntSchemaProps> = props => {
//     const makeIssue = bindMakeIssue( props )
//     return x => {
//         if ( typeof x !== 'bigint' ) return makeIssue( { code: 'invalidType' } )

//         if ( props.max && x > props.max ) return makeIssue( {
//             code: 'bigIntMax', message: `number is greater than ${ props.max }`,
//         } )

//         if ( props.min && x < props.min ) return makeIssue( {
//             code: 'bigIntMin', message: `number is less than ${ props.min }`,
//         } )

//         if ( props.gt && x <= props.gt ) return makeIssue( {
//             code: 'bigIntGreaterThan', message: `number is not greater than ${ props.gt }`,
//         } )

//         if ( props.lt && x >= props.lt ) return makeIssue( {
//             code: 'bigIntLessThan', message: `number is not less than ${ props.lt }`,
//         } )

//         if ( props.multipleOf && x % props.multipleOf !== 0n ) return makeIssue( {
//             code: 'bigIntMultipleOf', message: `number is not a multiple of ${ props.multipleOf }`,
//         } )

//         if ( props.positive && x <= 0n ) return makeIssue( {
//             code: 'bigIntPositive', message: `number is not positive`,
//         } )

//         if ( props.nonPositive && x > 0n ) return makeIssue( {
//             code: 'bigIntNonPositive', message: `number is not nonPositive`,
//         } )

//         if ( props.negative && x >= 0n ) return makeIssue( {
//             code: 'bigIntNegative', message: `number is not negative`,
//         } )

//         if ( props.nonNegative && x < 0n ) return makeIssue( {
//             code: 'bigIntNonNegative', message: `number is not nonNegative`,
//         } )
//     }
// }

// const makeDateCheck: CheckMaker<SchemaProps & DateSchemaProps> = props => {
//     const makeIssue = bindMakeIssue( props )
//     return x => {
//         if ( !( x instanceof Date ) ) return makeIssue( { code: 'invalidType' } )

//         if ( isNaN( x.valueOf() ) ) return makeIssue( {
//             code: 'dateInvalid', message: 'date is invalid',
//         } )

//         if ( props.max && x > props.max ) return makeIssue( {
//             code: 'dateMax', message: `number is greater than ${ props.max }`,
//         } )

//         if ( props.min && x < props.min ) return makeIssue( {
//             code: 'dateMin', message: `number is less than ${ props.min }`,
//         } )

//         if ( props.gt && x <= props.gt ) return makeIssue( {
//             code: 'dateGreaterThan', message: `number is not greater than ${ props.gt }`,
//         } )

//         if ( props.lt && x >= props.lt ) return makeIssue( {
//             code: 'dateLessThan', message: `number is not less than ${ props.lt }`,
//         } )
//     }
// }

// const makeLiteralCheck: CheckMaker<SchemaProps & LiteralSchemaProps> = props => {
//     const makeIssue = bindMakeIssue( props )
//     const stringifiedLiteralValue = typeof props.literalValue == 'object'
//         ? JSON.stringify( props.literalValue )
//         : String( props.literalValue )
//     return x => {
//         if ( x !== props.literalValue ) return makeIssue( {
//             code: 'literalValue',
//             expectedLiteralValue: props.literalValue,
//             message: `not ${ stringifiedLiteralValue }`,
//         } )
//     }
// }

// test_NaNSchema()
// function test_NaNSchema () {
//     console.group( 'test_NaNSchema' )
//     const NaNSchema = l.NaN()

//     testValues.filter( x => {
//         try { return !isNaN( x as number ) }
//         catch { }
//     } ).forEach( value => {
//         const { error } = NaNSchema.validate( value )
//         console.assert(
//             !!error,
//             { value, problem: 'should have errored' }
//         )
//     } )
//     console.groupEnd()
// }

// const makeLiteralSchema = ( literalValue: unknown ) => makeSchema( 'literal' )( { literalValue } )

// ...( baseType == 'number' ? {
//     max: <Value extends number> ( max: Value ) =>
//         makeSchema( baseType )( { ...props, max } ),
//     min: <Value extends number> ( min: Value ) =>
//         makeSchema( baseType )( { ...props, min } ),
//     gt: <Value extends number> ( gt: Value ) =>
//         makeSchema( baseType )( { ...props, gt } ),
//     gte: <Value extends number> ( gte: Value ) =>
//         makeSchema( baseType )( { ...props, gte } ),
//     lt: <Value extends number> ( lt: Value ) =>
//         makeSchema( baseType )( { ...props, lt } ),
//     lte: <Value extends number> ( lte: Value ) =>
//         makeSchema( baseType )( { ...props, lte } ),
//     multipleOf: <Value extends number> ( multipleOf: Value ) =>
//         makeSchema( baseType )( { ...props, multipleOf } ),
//     integer: () =>
//         makeSchema( baseType )( { ...props, integer: true } ),
//     positive: () =>
//         makeSchema( baseType )( { ...props, positive: true } ),
//     nonPositive: () =>
//         makeSchema( baseType )( { ...props, nonPositive: true } ),
//     negative: () =>
//         makeSchema( baseType )( { ...props, negative: true } ),
//     nonNegative: () =>
//         makeSchema( baseType )( { ...props, nonNegative: true } ),
//     finite: () =>
//         makeSchema( baseType )( { ...props, finite: true } ),
//     safe: () =>
//         makeSchema( baseType )( { ...props, safe: true } ),
// } : {} ),

// ...( baseType == 'bigint' ? {
//     max: <Value extends bigint> ( max: Value ) =>
//         makeSchema( baseType )( { ...props, max } ),
//     min: <Value extends bigint> ( min: Value ) =>
//         makeSchema( baseType )( { ...props, min } ),
//     gt: <Value extends bigint> ( gt: Value ) =>
//         makeSchema( baseType )( { ...props, gt } ),
//     gte: <Value extends bigint> ( gte: Value ) =>
//         makeSchema( baseType )( { ...props, gte } ),
//     lt: <Value extends bigint> ( lt: Value ) =>
//         makeSchema( baseType )( { ...props, lt } ),
//     lte: <Value extends bigint> ( lte: Value ) =>
//         makeSchema( baseType )( { ...props, lte } ),
//     multipleOf: <Value extends bigint> ( multipleOf: Value ) =>
//         makeSchema( baseType )( { ...props, multipleOf } ),
//     positive: () =>
//         makeSchema( baseType )( { ...props, positive: true } ),
//     nonPositive: () =>
//         makeSchema( baseType )( { ...props, nonPositive: true } ),
//     negative: () =>
//         makeSchema( baseType )( { ...props, negative: true } ),
//     nonNegative: () =>
//         makeSchema( baseType )( { ...props, nonNegative: true } ),
// } : {} ),