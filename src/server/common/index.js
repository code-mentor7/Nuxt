import { omit as _omit } from "lodash"

export const getSchemaKeys = (model, keysToOmit = ["_id", "id", "created_at", "updated_at"]) => {
  if (keysToOmit && keysToOmit.constructor !== Array) {
    return console.warn("Keys to omit must be in array.")
  }
  return Object.keys(
    _omit(model.schema.tree, keysToOmit)
  )
}
