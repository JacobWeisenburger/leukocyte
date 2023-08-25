import { bindMakeIssue } from './Issue.ts'
import { SchemaProps, Check, makeSchema } from './makeSchema.ts'

export function makeDateSchema<
    const Props extends Omit<SchemaProps, 'baseType'> & {
        readonly max?: Date
        readonly min?: Date
        readonly gt?: Date
        readonly lt?: Date
    }
> ( props: Props = {} as Props ) {

    const propsWithBaseType = { ...props, baseType: 'date' } as const
    const makeIssue = bindMakeIssue( propsWithBaseType )

    const check: Check = x => {
        if ( !( x instanceof Date ) ) return makeIssue( { code: 'invalidType' } )

        if ( isNaN( x.valueOf() ) ) return makeIssue( {
            code: 'date:invalid', message: 'date is invalid',
        } )

        if ( props.max && x > props.max ) return makeIssue( {
            code: 'date:max', message: `date is greater than ${ props.max }`,
        } )

        if ( props.min && x < props.min ) return makeIssue( {
            code: 'date:min', message: `date is less than ${ props.min }`,
        } )

        if ( props.gt && x <= props.gt ) return makeIssue( {
            code: 'date:greaterThan', message: `date is not greater than ${ props.gt }`,
        } )

        if ( props.lt && x >= props.lt ) return makeIssue( {
            code: 'date:lessThan', message: `date is not less than ${ props.lt }`,
        } )
    }

    return makeSchema( {
        check,
        props: propsWithBaseType,
        methods: prevProps => ( {
            max: ( max: Date ) => makeDateSchema( { ...prevProps, max } ),
            min: ( min: Date ) => makeDateSchema( { ...prevProps, min } ),
            gt: ( gt: Date ) => makeDateSchema( { ...prevProps, gt } ),
            lt: ( lt: Date ) => makeDateSchema( { ...prevProps, lt } ),
        } ),
    } )
}