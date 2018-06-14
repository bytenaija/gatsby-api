import Models from '../../models'

const cap = word => `${word[0].toUpperCase()}${word.substr(1)}`

/** Create method for finding by unique field
 * eg. `userByUsername` for finding user by username
 **/
function findByUniqueFields(name, fields = []) {
  const methods = {}

  fields.forEach(field => {
    methods[`${name}By${cap(field)}`] = (_, { [field]: value }) =>
      Models[name].find({
        where: { [field]: value }
      })
  })

  return methods
}

export function resource(name, { unique } = {}) {
  let model

  if (Array.isArray(name)) {
    model = cap(name[1])
    name = name[0]
  } else model = `${cap(name)}s`

  return {
    [`all${model}`]: async (_, { condition }, { edgeFunction }) =>
      edgeFunction(await Models[name].findAll({ where: condition })),

    [`${name}ById`]: (_, { id }) => Models[name].findById(id),

    ...findByUniqueFields(name, unique)
  }
}
