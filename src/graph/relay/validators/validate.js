import { validators } from '.'

export function validate(method, args) {
  if (validators[method]) validators[method](...args)
}
