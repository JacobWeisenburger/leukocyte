// start bash -c 'deno run -A --watch src/2023-12/main.ts'

import { l } from './mod.ts'
import { testSchema } from './testSchema.ts'

// test_schema()
function test_schema () {
    const schema = l.schema<string>()(
        {
            baseType: 'string',
            length: 3,
            // allowUndefined: true,
            // allowNull: true,
        },
        ( { value, props } ) => {
            if ( typeof value !== 'string' ) return 'Not a string'

            if ( props.length && value.length !== props.length )
                return `length is not ${ props.length }`
        },
    )
    // type Data = l.infer<typeof schema>
    schema.props.baseType
    schema.props.allowUndefined
    schema.props.allowNull
    testSchema( schema )
}

// test_stringSchema()
function test_stringSchema () {
    const schema = l.string( {
        // minLength: 3,
        // allowUndefined: true,
    } )
    // type Data = l.infer<typeof schema>
    schema.props.baseType
    schema.props.allowUndefined
    schema.props.allowNull
    schema.props.length
    schema.props.minLength
    testSchema( schema )
}

test_errorMap()
function test_errorMap () {
    const schema = l.string( {
        minLength: 3,
        errorMap: ctx => ( {
            // TODO get access to ctx here
            'string:minLength': `Must be at least ${ ctx.props.minLength } characters long`,
        } ),
    } )
    testSchema( schema )
}

// test_numberSchema()
function test_numberSchema () {
    const schema = l.number()
    // type Data = l.infer<typeof schema>
    schema.props.baseType
    schema.props.allowNaN
    schema.props.allowUndefined
    testSchema( schema )
}