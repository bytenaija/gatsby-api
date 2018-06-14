import Models from '../../models'

const cap = word => `${word[0].toUpperCase()}${word.substr(1)}`

export function mutations(name) {
  const model = cap(name)

  return {
    [`create${model}`]: async (_, { input }) => ({
      [name]: await Models[name].create(input[name])
    }),

    [`update${model}ById`]: async (
      _,
      { input: { id, [`${name}Patch`]: patch } }
    ) => {
      const obj = await Models[name].findById(id)

      return { [name]: await obj.update(patch) }
    }
  }
}
