// start bash -c 'deno run -A --watch src/2023-12/main.ts'

import { l } from './mod.ts'
import { testSchema } from './testSchema.ts'

test_schema()
function test_schema () {
    const schema = l.schema<string>()(
        {
            baseType: 'string',
            length: 3,
            // canBeUndefined: true,
            // canBeNull: true,
        },
        ( { value, props } ) => {
            if ( typeof value !== 'string' ) return 'Not a string'

            if ( props.length && value.length !== props.length )
                return `length is not ${ props.length }`
        },
    )
    // type Data = l.infer<typeof schema>
    schema.props.baseType
    schema.props.canBeUndefined
    schema.props.canBeNull
    // const result = schema.validate( 'foo' )
    // result.pass && result.data
    testSchema( schema )
}

// test_stringSchema()
// function test_stringSchema () {
//     const schema = l.string( {
//         // length: 3,
//         minLength: 3,
//     } )
//     // type Data = l.infer<typeof schema>
//     schema.props.baseType
//     schema.props.canBeUndefined
//     schema.props.minLength
//     const result = schema.validate( 'foo' )
//     result.pass && result.data
//     testSchema( schema )
// }

// // test_stringSchema()
// function test_stringSchema () {
//     // const stringSchema = l.string()
//     //     .nullish()
//     // type stringType = l.infer<typeof stringSchema>
//     // stringSchema.props.baseType
//     // stringSchema.props.canBeUndefined
//     // const stringResult = stringSchema.validate( 'foo' )
//     // stringResult.success && stringResult.value
//     // testSchema( stringSchema )
// }