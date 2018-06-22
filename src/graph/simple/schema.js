import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql/type'
import { QueryType } from './types/QueryType'
import { MutationType } from './types/MutationType'

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
})
