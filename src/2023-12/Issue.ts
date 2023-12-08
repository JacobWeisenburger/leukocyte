import { SchemaProps } from './makeSchema.ts'
import { baseTypeIssueCodes } from './baseTypes.ts'

export type IssueCode = typeof issueCodes[ number ]
const issueCodes = [
    'never',
    'unknownError',
    'missingValue',
    'invalidType',
    ...baseTypeIssueCodes,
] as const

export type Issue = {
    code: IssueCode
    message: string
    received?: unknown
    validFormats?: string[]
    expected?: unknown
}

export type BaseIssue = Pick<Issue, 'code'> & Partial<Omit<Issue, 'code'>>

export const bindMakeIssue = <Props extends SchemaProps> ( props: Props ) => ( baseIssue: BaseIssue ): Issue => {
    const message =
        props.errorMap?.[ baseIssue.code ] ??
        baseIssue.message ??
        ( baseIssue.code == 'invalidType' && props.baseType ? `not a ${ props.baseType }` : undefined ) ??
        'unknown error'
    return { ...baseIssue, message }
}