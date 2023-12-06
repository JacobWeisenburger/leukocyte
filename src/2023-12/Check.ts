import { Issue } from './Issue.ts'
import { SchemaProps } from './makeSchema.ts'

export type Check<Props extends SchemaProps = SchemaProps> = ( x: unknown, props: Props ) =>
    Issue[ 'message' ] | Issue | Issue[] | void