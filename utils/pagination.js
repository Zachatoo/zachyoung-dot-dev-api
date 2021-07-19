export const getPagination = (req, res, next) => {
  req.pagination = new Pagination(req.query);
  for (let key in req.pagination) {
    delete req.query[key];
  }
  return next();
}

class Pagination {
  constructor(params) {
    this.skip = parseInt(params.skip) || 0;
    this.take = parseInt(params.take) || 25;
    this.sort = params.sort; // [['column', '-1' || '1']]
  }
}