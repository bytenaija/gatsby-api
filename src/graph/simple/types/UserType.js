import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql/type'

export const UserType = new GraphQLObjectType({
  name: 'user',
  description: 'user item',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'The id of the user.'
    },
    username: {
      type: GraphQLString,
      description: 'The username of the user'
    },
    firstname: {
      type: GraphQLString,
      description: 'The firstname of the user.'
    },
    lastname: {
      type: GraphQLString,
      description: 'The lastname of the user.'
    },
    email: {
      type: GraphQLString,
      description: 'The email of the user.'
    },
    password: {
      type: GraphQLString,
      description: 'The password of the user.'
    },
    phonenumber: {
      type: GraphQLString,
      description: 'The phonenumber of the user.'
    },
    avatar: {
      type: GraphQLString,
      description: 'The avatar of the user.'
    }
  })
})
