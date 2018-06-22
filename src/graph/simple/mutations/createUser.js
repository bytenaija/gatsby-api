import { GraphQLString, GraphQLID } from 'graphql/type'
import { mutationWithClientMutationId } from 'graphql-relay'
import { UserType } from '../types/UserType'
import models from '../../../models'

export const createUser = mutationWithClientMutationId({
  name: 'CreateUser',
  inputFields: {
    username: {
      type: GraphQLString
    },
    firstname: {
      type: GraphQLString
    },
    lastname: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    },
    phonenumber: {
      type: GraphQLString
    },
    avatar: {
      type: GraphQLString
    }
  },
  outputFields: {
    user: {
      type: UserType,
      resolve: ({ user }) => user
    }
  },
  mutateAndGetPayload: async data => {
    const user = await models.user.create(data)

    return {
      user
    }
  }
})
