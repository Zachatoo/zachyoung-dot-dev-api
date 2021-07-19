import { lowerCaseFirstLetter, NotFoundError } from '../utils';

const getList = (req, res, next, model, populate) => {
  const { query, pagination } = req;
  const { sort, skip, take } = pagination;

  const result = model.find(query)
    .sort(sort)
    .skip(skip)
    .limit(take)
    .populate(populate)
    .exec();

  result.then(resource => {
    return res.json(resource);
  })
  .catch(err => {
    return next(new Error(err));
  });
}

const getSingle = (req, res, next, model, resourceName, populate) => {
  const { id } = req.params;

  const result = model.findById(id)
    .populate(populate)
    .exec();
  
  result.then(resource => {
    if (resource == null) {
      return next(new NotFoundError(`${resourceName} not found`));
    }
    return res.json(resource);
  })
  .catch(err => {
    return next(new Error(err));
  });
}

const post = (req, res, next, model, resourceName) => {
  const { body } = req;

  const result = model.create(body);
  
  result.then(resource => {
    return res.status(201).json({
      message: `${resourceName} successfully created`,
      [lowerCaseFirstLetter(resourceName)]: resource,
    })
    .catch(err => {
      return next(new Error(err));
    });
  });
}

const patch = (req, res, next, model, resourceName) => {
  const { id } = req.params;
  const { body } = req;

  const result = model.findByIdAndUpdate(id, body, { new: true });

  result.then(resource => {
    if (resource == null) {
      return next(new NotFoundError(`${resourceName} not found`));
    }
    return res.json({
      message: `${resourceName} successfully updated`,
      [lowerCaseFirstLetter(resourceName)]: resource,
    });
  })
  .catch(err => {
    next(err);
  });
}

const remove = (req, res, next, model, resourceName) => {
  const { id } = req.params;

  const result = model.findByIdAndRemove(id);

  result.then(resource => {
    if (resource == null) {
      return next(new NotFoundError(`${resourceName} not found`));
    }
    return res.json({
      message: `${resourceName} successfully deleted`,
    });
  })
  .catch(err => {
    return next(err);
  });
}

export default {
  getList,
  getSingle,
  post,
  patch,
  remove,
}
