import { createError } from 'apollo-errors'

export const AuthorizationError = createError('AuthorizationError', {
  message: 'You do not have permission to change this object.'
})

export const RecordNotFoundError = createError('NoFoundError', {
  message: "We could't find that."
})
