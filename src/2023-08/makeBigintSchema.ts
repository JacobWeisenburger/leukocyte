import { bindMakeIssue } from './Issue.ts'
import { SchemaProps, Check, makeSchema } from './makeSchema.ts'

export function makeBigintSchema<
    const Props extends Omit<SchemaProps, 'baseType'> & {
        readonly max?: bigint
        readonly min?: bigint
        readonly gt?: bigint
        readonly lt?: bigint
        readonly multipleOf?: bigint
        readonly positive?: boolean
        readonly nonPositive?: boolean
        readonly negative?: boolean
        readonly nonNegative?: boolean
    }
> ( props: Props = {} as Props ) {

    const propsWithBaseType = { ...props, baseType: 'bigint' } as const
    const makeIssue = bindMakeIssue( propsWithBaseType )

    const check: Check = x => {
        if ( typeof x !== 'bigint' ) return makeIssue( { code: 'invalidType' } )

        if ( props.max && x > props.max ) return makeIssue( {
            code: 'bigint:max', message: `bigint is greater than ${ props.max }`,
        } )

        if ( props.min && x < props.min ) return makeIssue( {
            code: 'bigint:min', message: `bigint is less than ${ props.min }`,
        } )

        if ( props.gt && x <= props.gt ) return makeIssue( {
            code: 'bigint:greaterThan', message: `bigint is not greater than ${ props.gt }`,
        } )

        if ( props.lt && x >= props.lt ) return makeIssue( {
            code: 'bigint:lessThan', message: `bigint is not less than ${ props.lt }`,
        } )

        if ( props.multipleOf && x % props.multipleOf !== 0n ) return makeIssue( {
            code: 'bigint:multipleOf', message: `bigint is not a multiple of ${ props.multipleOf }`,
        } )

        if ( props.positive && x <= 0 ) return makeIssue( {
            code: 'bigint:positive', message: `bigint is not positive`,
        } )

        if ( props.nonPositive && x > 0 ) return makeIssue( {
            code: 'bigint:nonPositive', message: `bigint is not nonPositive`,
        } )

        if ( props.negative && x >= 0 ) return makeIssue( {
            code: 'bigint:negative', message: `bigint is not negative`,
        } )

        if ( props.nonNegative && x < 0 ) return makeIssue( {
            code: 'bigint:nonNegative', message: `bigint is not nonNegative`,
        } )
    }

    return makeSchema<bigint>()( {
        check,
        props: propsWithBaseType,
        methods: prevProps => ( {
            max: <Value extends bigint> ( max: Value ) => makeBigintSchema( { ...prevProps, max } ),
            min: <Value extends bigint> ( min: Value ) => makeBigintSchema( { ...prevProps, min } ),
            gt: <Value extends bigint> ( gt: Value ) => makeBigintSchema( { ...prevProps, gt } ),
            lt: <Value extends bigint> ( lt: Value ) => makeBigintSchema( { ...prevProps, lt } ),
            positive: () => makeBigintSchema( { ...prevProps, positive: true } ),
            nonPositive: () => makeBigintSchema( { ...prevProps, nonPositive: true } ),
            negative: () => makeBigintSchema( { ...prevProps, negative: true } ),
            nonNegative: () => makeBigintSchema( { ...prevProps, nonNegative: true } ),
            multipleOf: <Value extends bigint> ( multipleOf: Value ) =>
                makeBigintSchema( { ...prevProps, multipleOf } ),
        } ),
    } )
}