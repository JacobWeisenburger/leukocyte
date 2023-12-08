import { Check } from './Check.ts'
import { bindMakeIssue } from './Issue.ts'
import { SchemaProps, makeSchema } from './makeSchema.ts'

type NumberProps = {
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
    readonly allowNaN?: boolean
}

export function makeNumberSchema<
    const Props extends Omit<SchemaProps, 'baseType'> & NumberProps
> ( props: Props = {} as Props ) {

    const propsWithBaseType = { ...props, baseType: 'number' } as const
    const makeIssue = bindMakeIssue( propsWithBaseType )

    const check: Check = ctx => {
        if ( typeof ctx.value !== 'number' ) return makeIssue( { code: 'invalidType' } )

        if ( !props.allowNaN && isNaN( ctx.value ) ) return makeIssue( { code: 'invalidType' } )

        if ( props.max && ctx.value > props.max ) return makeIssue( {
            code: 'number:max', message: `number is greater than ${ props.max }`,
        } )

        if ( props.min && ctx.value < props.min ) return makeIssue( {
            code: 'number:min', message: `number is less than ${ props.min }`,
        } )

        if ( props.gt && ctx.value <= props.gt ) return makeIssue( {
            code: 'number:greaterThan', message: `number is not greater than ${ props.gt }`,
        } )

        if ( props.lt && ctx.value >= props.lt ) return makeIssue( {
            code: 'number:lessThan', message: `number is not less than ${ props.lt }`,
        } )

        if ( props.multipleOf && ctx.value % props.multipleOf !== 0 ) return makeIssue( {
            code: 'number:multipleOf', message: `number is not a multiple of ${ props.multipleOf }`,
        } )

        if ( props.integer && !Number.isInteger( ctx.value ) ) return makeIssue( {
            code: 'number:integer', message: `number is not an integer`,
        } )

        if ( props.positive && ctx.value <= 0 ) return makeIssue( {
            code: 'number:positive', message: `number is not positive`,
        } )

        if ( props.nonPositive && ctx.value > 0 ) return makeIssue( {
            code: 'number:nonPositive', message: `number is not nonPositive`,
        } )

        if ( props.negative && ctx.value >= 0 ) return makeIssue( {
            code: 'number:negative', message: `number is not negative`,
        } )

        if ( props.nonNegative && ctx.value < 0 ) return makeIssue( {
            code: 'number:nonNegative', message: `number is not nonNegative`,
        } )

        if ( props.finite && !Number.isFinite( ctx.value ) ) return makeIssue( {
            code: 'number:finite', message: `number is not finite`,
        } )

        if ( props.safe && ctx.value >= Number.MIN_SAFE_INTEGER && ctx.value <= Number.MAX_SAFE_INTEGER )
            return makeIssue( {
                code: 'number:safe', message: `number is not safe`,
            } )
    }

    return makeSchema<number>()(
        propsWithBaseType as typeof propsWithBaseType & {
            readonly [ key in keyof NumberProps ]: unknown extends Props[ key ] ? undefined : Props[ key ]
        },
        check,
    )
}