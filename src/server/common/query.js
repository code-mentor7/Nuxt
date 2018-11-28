import { merge } from "lodash"

export const controllers = {
  createOne (model, body) {
    return model.create(body)
  },

  deleteOne (docToDelete) {
    return docToDelete.remove()
  },

  findByParam (model, id) {
    return model.findById(id)
  },

  getOne (docToGet) {
    return Promise.resolve(docToGet)
  },

  getAll (model) {
    return model.find({})
  },

  textSearch (model, searchValue, searchFilter = {}, searchOptions = { limit: 10, skip: 0 }) {
    let query = { ...searchFilter }
    let projection = {}
    if (searchValue) {
      query["$text"] = { $search: searchValue }
    }
    else {
      projection.sort = { updated_at: -1 }
    }
    return model.find(query, null, searchOptions)
  },

  updateOne (docToUpdate, update) {
    merge(docToUpdate, update)
    return docToUpdate.save()
  }
}

export const createOne = (model) => (req, res, next) => {
  return controllers.createOne(model, req.body)
    .then(doc => res.status(201).json(doc))
    .catch(error => next(error))
}

export const deleteOne = (model) => (req, res, next) => {
  return controllers.deleteOne(req.docFromId)
    .then(doc => res.status(201).json(doc))
    .catch(error => next(error))
}

export const findByParam = (model) => (req, res, next, id) => {
  return controllers.findByParam(model, id)
    .then(doc => {
      if (!doc) {
        next(new Error("Not Found Error"))
      }
      else {
        req.docFromId = doc
        next()
      }
    })
    .catch(error => {
      next(error)
    })
}

export const getOne = (model) => (req, res, next) => {
  return controllers.getOne(req.docFromId)
    .then(doc => res.status(200).json(doc))
    .catch(error => next(error))
}

export const getAll = (model) => (req, res, next) => {
  return controllers.getAll(model)
    .then(docs => res.json(docs))
    .catch(error => next(error))
}

export const textSearch = (model) => async (req, res, next) => {
  const searchValue = req.body.search
  const searchFilter = req.body.filter
  const searchOptions = req.body.options

  return controllers.textSearch(model, searchValue, searchFilter, searchOptions)
    .then(doc => {
      res.status(200).json(doc)
    })
    .catch(error => {
      next(error)
    })
}

export const updateOne = (model) => async (req, res, next) => {
  const docToUpdate = req.docFromId
  const update = req.body

  return controllers.updateOne(docToUpdate, update)
    .then(doc => res.status(201).json(doc))
    .catch(error => next(error))
}

export const generateControllers = (model, overrides = {}) => {
  const defaults = {
    createOne: createOne(model),
    deleteOne: deleteOne(model),
    findByParam: findByParam(model),
    getAll: getAll(model),
    getOne: getOne(model),
    textSearch: textSearch(model),
    updateOne: updateOne(model)
  }

  return { ...defaults, ...overrides }
}
