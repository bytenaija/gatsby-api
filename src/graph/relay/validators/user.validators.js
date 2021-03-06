import { AuthorizationError } from '../errors'

export const userValidators = {
  updateUserById(_, { input }, { currentUser }) {
    if (!(currentUser && input.id === currentUser.id))
      throw new AuthorizationError(
        'You are not authorized to edit this account'
      )
  },

  deleteUserById(_, { input }, { currentUser }) {
    if (!(currentUser && input.id === currentUser.id))
      throw new AuthorizationError(
        'You are not authorized to delete this account'
      )
  }
}
