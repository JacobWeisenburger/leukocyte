import { bindMakeIssue } from './Issue.ts'
import { BaseType, InferTypeFromSchema } from './baseTypes.ts'
import { AnySchema, Check, SchemaProps, makeSchema } from './makeSchema.ts'

export type UnionOptions = Readonly<[ AnySchema, ...AnySchema[] ]>
export function makeUnionSchema<
    Options extends UnionOptions,
    const Props extends Omit<SchemaProps, 'baseType'> & {
        // readonly baseTypes?: ( BaseType | undefined )[]
        readonly options?: Options
    }
> ( options: Options, props: Props = {} as Props ) {
    type Schemas = Options[ number ]

    const propsWithBaseType = {
        baseTypes: Array.from( new Set( options.flatMap( x => x.props.baseType ?? x.props.baseTypes ) ) ) as Exclude<(
            // | Schemas[ 'props' ][ 'baseType' ]
            | Exclude<Schemas[ 'props' ][ 'baseTypes' ], undefined>[ number ]
        ), undefined>[]
    } as const

    // console.log( propsWithBaseType )
    console.log( { options } )

    const check: Check = x => {
        const results = options.map( option => option.validate( x ) )
        if ( results.some( result => result.success ) ) return
        return results.flatMap( result => !result.success ? result.error : [] )
    }

    return makeSchema<InferTypeFromSchema<Schemas>>()( {
        check,
        props: propsWithBaseType,
    } )
}