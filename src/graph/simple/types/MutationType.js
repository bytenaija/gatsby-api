import { createUser } from '../mutations/createUser'
import { GraphQLObjectType } from 'graphql/type'

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createUser
  })
})
