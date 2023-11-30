import { Issue } from './Issue.ts'

export type Check = ( x: unknown ) => Issue[ 'message' ] | Issue | Issue[] | void