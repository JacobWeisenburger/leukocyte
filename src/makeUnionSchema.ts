import { bindMakeIssue } from './Issue.ts'
import { SchemaProps, Check, makeSchema, AnySchema } from './makeSchema.ts'

export type UnionOptions = Readonly<[ AnySchema, ...AnySchema[] ]>
export function makeUnionSchema<Options extends UnionOptions> ( options: Options ) {

    const propsWithBaseType = {
        // baseTypes: options.map( x => x.props.baseType ) as Options[ number ][ 'props' ][ 'baseType' ][]
    } as const
    const makeIssue = bindMakeIssue( propsWithBaseType )

    console.log( options )

    const check: Check = x => {
        // if ( typeof x !== 'number' ) return makeIssue( { code: 'invalidType' } )

        // if ( props.max && x > props.max ) return makeIssue( {
        //     code: 'number:max', message: `number is greater than ${ props.max }`,
        // } )

        // if ( props.min && x < props.min ) return makeIssue( {
        //     code: 'number:min', message: `number is less than ${ props.min }`,
        // } )

        // if ( props.gt && x <= props.gt ) return makeIssue( {
        //     code: 'number:greaterThan', message: `number is not greater than ${ props.gt }`,
        // } )

        // if ( props.lt && x >= props.lt ) return makeIssue( {
        //     code: 'number:lessThan', message: `number is not less than ${ props.lt }`,
        // } )

        // if ( props.multipleOf && x % props.multipleOf !== 0 ) return makeIssue( {
        //     code: 'number:multipleOf', message: `number is not a multiple of ${ props.multipleOf }`,
        // } )

        // if ( props.integer && !Number.isInteger( x ) ) return makeIssue( {
        //     code: 'number:integer', message: `number is not an integer`,
        // } )

        // if ( props.positive && x <= 0 ) return makeIssue( {
        //     code: 'number:positive', message: `number is not positive`,
        // } )

        // if ( props.nonPositive && x > 0 ) return makeIssue( {
        //     code: 'number:nonPositive', message: `number is not nonPositive`,
        // } )

        // if ( props.negative && x >= 0 ) return makeIssue( {
        //     code: 'number:negative', message: `number is not negative`,
        // } )

        // if ( props.nonNegative && x < 0 ) return makeIssue( {
        //     code: 'number:nonNegative', message: `number is not nonNegative`,
        // } )

        // if ( props.finite && !Number.isFinite( x ) ) return makeIssue( {
        //     code: 'number:finite', message: `number is not finite`,
        // } )

        // if ( props.safe && x >= Number.MIN_SAFE_INTEGER && x <= Number.MAX_SAFE_INTEGER ) return makeIssue( {
        //     code: 'number:safe', message: `number is not safe`,
        // } )
    }

    return makeSchema( {
        check,
        props: propsWithBaseType,
    } )
}