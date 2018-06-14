import Models from '../../models'

const cap = word => `${word[0].toUpperCase()}${word.substr(1)}`

export function resource(name) {
  let model

  if (Array.isArray(name)) {
    model = cap(name[1])
    name = name[0]
  } else model = `${cap(name)}s`

  return {
    [`all${model}`]: async (_, args, { edgeFunction }) =>
      edgeFunction(await Models[name].findAll()),

    [`${name}ById`]: (_, { id }) => Models[name].findById(id)
  }
}
