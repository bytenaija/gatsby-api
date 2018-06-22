export const User = {
  // A user's email can only be viewed by them.
  email: (user, __, { currentUser }) => user.equals(currentUser) && user.email
}
