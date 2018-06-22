export const User = {
  email: (user, __, { currentUser }) => user.equals(currentUser) && user.email
}
