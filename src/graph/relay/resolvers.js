import { resource } from './resource'
import { mutations } from './mutations'

import { User } from './types/user.type'
import { Restaurant } from './types/restaurant.type'
import { Activation } from './types/activation.type'
import { Branch } from './types/branch.type'
import { Reminder } from './types/reminder.type'
import { Role } from './types/role.type'
import { Product } from './types/product.type'

export const resolvers = {
  Query: {
    profile: (_, ___, { currentUser }) => currentUser,
    ...resource('user', { unique: ['username', 'email'] }),
    ...resource('activation'),
    ...resource(['branch', 'branches']),
    ...resource('product'),
    ...resource('reminder'),
    ...resource('role'),
    ...resource('user'),
    ...resource('restaurant')
  },
  Mutation: {
    ...mutations('user'),
    ...mutations('activation'),
    ...mutations('branch'),
    ...mutations('product'),
    ...mutations('reminder'),
    ...mutations('role'),
    ...mutations('user'),
    ...mutations('restaurant')
  },
  User,
  Restaurant,
  Activation,
  Branch,
  Reminder,
  Role,
  Product
}
