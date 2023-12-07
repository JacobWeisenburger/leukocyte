import { Issue } from './Issue.ts'
import { SchemaProps } from './makeSchema.ts'

export type CheckContext<Props extends SchemaProps = SchemaProps> = {
    value?: unknown,
    props: Props
}
export type Check<Props extends SchemaProps = SchemaProps> = ( ctx: CheckContext<Props> ) =>
    Issue[ 'message' ] | Issue | Issue[] | void