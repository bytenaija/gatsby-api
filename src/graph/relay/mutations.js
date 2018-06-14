import Models from '../../models'
import { validate } from './validators/validate'

const cap = word => `${word[0].toUpperCase()}${word.substr(1)}`

export function mutations(name) {
  const model = cap(name)

  return {
    [`create${model}`]: async (_, { input }) => {
      validate(`create${model}`, ...arguments)

      return {
        [name]: await Models[name].create(input[name])
      }
    },

    [`update${model}ById`]: async (...params) => {
      const [_, { input }] = params
      const { id, [`${name}Patch`]: patch } = input

      validate(`update${model}ById`, params)

      const obj = await Models[name].findById(id)
      return { [name]: await obj.update(patch) }
    },

    [`delete${model}ById`]: async (...params) => {
      const [_, { input }] = params
      const { id } = input

      validate(`delete${model}ById`, params)

      const obj = await Models[name].findById(id)
      obj && obj.destroy()

      return { [name]: obj, [`deleted${model}Id`]: id }
    }
  }
}
