import { bindMakeIssue } from './Issue.ts'
import { SchemaProps, Check, makeSchema } from './makeSchema.ts'

export function makeNumberSchema<
    const Props extends Omit<SchemaProps, 'baseType'> & {
        readonly max?: number
        readonly min?: number
        readonly gt?: number
        readonly lt?: number
        readonly multipleOf?: number
        readonly integer?: boolean
        readonly positive?: boolean
        readonly nonPositive?: boolean
        readonly negative?: boolean
        readonly nonNegative?: boolean
        readonly finite?: boolean
        readonly safe?: boolean
    }
> ( props: Props = {} as Props ) {

    const propsWithBaseType = { ...props, baseType: 'number' } as const
    const makeIssue = bindMakeIssue( propsWithBaseType )

    const check: Check = x => {
        if ( typeof x !== 'number' ) return makeIssue( { code: 'invalidType' } )

        if ( props.max && x > props.max ) return makeIssue( {
            code: 'number:max', message: `number is greater than ${ props.max }`,
        } )

        if ( props.min && x < props.min ) return makeIssue( {
            code: 'number:min', message: `number is less than ${ props.min }`,
        } )

        if ( props.gt && x <= props.gt ) return makeIssue( {
            code: 'number:greaterThan', message: `number is not greater than ${ props.gt }`,
        } )

        if ( props.lt && x >= props.lt ) return makeIssue( {
            code: 'number:lessThan', message: `number is not less than ${ props.lt }`,
        } )

        if ( props.multipleOf && x % props.multipleOf !== 0 ) return makeIssue( {
            code: 'number:multipleOf', message: `number is not a multiple of ${ props.multipleOf }`,
        } )

        if ( props.integer && !Number.isInteger( x ) ) return makeIssue( {
            code: 'number:integer', message: `number is not an integer`,
        } )

        if ( props.positive && x <= 0 ) return makeIssue( {
            code: 'number:positive', message: `number is not positive`,
        } )

        if ( props.nonPositive && x > 0 ) return makeIssue( {
            code: 'number:nonPositive', message: `number is not nonPositive`,
        } )

        if ( props.negative && x >= 0 ) return makeIssue( {
            code: 'number:negative', message: `number is not negative`,
        } )

        if ( props.nonNegative && x < 0 ) return makeIssue( {
            code: 'number:nonNegative', message: `number is not nonNegative`,
        } )

        if ( props.finite && !Number.isFinite( x ) ) return makeIssue( {
            code: 'number:finite', message: `number is not finite`,
        } )

        if ( props.safe && x >= Number.MIN_SAFE_INTEGER && x <= Number.MAX_SAFE_INTEGER ) return makeIssue( {
            code: 'number:safe', message: `number is not safe`,
        } )
    }

    return makeSchema( {
        check,
        props: propsWithBaseType,
        methods: prevProps => ( {
            max: <Value extends number> ( max: Value ) => makeNumberSchema( { ...prevProps, max } ),
            min: <Value extends number> ( min: Value ) => makeNumberSchema( { ...prevProps, min } ),
            gt: <Value extends number> ( gt: Value ) => makeNumberSchema( { ...prevProps, gt } ),
            lt: <Value extends number> ( lt: Value ) => makeNumberSchema( { ...prevProps, lt } ),
            integer: () => makeNumberSchema( { ...prevProps, integer: true } ),
            positive: () => makeNumberSchema( { ...prevProps, positive: true } ),
            nonPositive: () => makeNumberSchema( { ...prevProps, nonPositive: true } ),
            negative: () => makeNumberSchema( { ...prevProps, negative: true } ),
            nonNegative: () => makeNumberSchema( { ...prevProps, nonNegative: true } ),
            finite: () => makeNumberSchema( { ...prevProps, finite: true } ),
            safe: () => makeNumberSchema( { ...prevProps, safe: true } ),
            multipleOf: <Value extends number> ( multipleOf: Value ) =>
                makeNumberSchema( { ...prevProps, multipleOf } ),
        } ),
    } )
}