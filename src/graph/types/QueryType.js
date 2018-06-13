import { UserType } from './UserType'
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLID
} from 'graphql/type'

import models from '../../models'

export const QueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: (root, args, source, fieldASTs) => models.user.findAll()
    },
    user: {
      type: UserType,
      args: {
        id: {
          name: 'id',
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve: (root, { id }, source, fieldASTs) => models.user.findById(id)
    }
  }
})
