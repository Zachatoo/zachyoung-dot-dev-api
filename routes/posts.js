import passport from 'passport';
import { Router } from 'express';
import { PostModel } from '../models';
import core from './core';
import { NotFoundError } from '../utils';

const RESOURCE_SINGLE = 'Post';
const RESOURCE_PLURAL = 'Posts';

const DEFAULT_SORT = [
  [
    'publishedAt',
    -1
  ]
];

const router = Router();

// unprotected routes
router.get('/', (req, res, next) => {
  // fuzzy text search
  if (req.query.title) {
    req.query.title = { "$regex": req.query.title, "$options": "i" };
  }
  if (!req.pagination.sort) {
    req.pagination.sort = DEFAULT_SORT;
  }

  core.getList(req, res, next, PostModel, 'author');
});

router.get('/:id', (req, res, next) => {
  core.getSingle(req, res, next, PostModel, RESOURCE_SINGLE, 'author');
});

// protected routes
router.use(passport.authenticate('jwt', { session: false }));

router.post('/', (req, res, next) => {
  req.body.author = req.user.id;

  core.post(req, res, next, PostModel, RESOURCE_SINGLE);
});

router.patch('/:id', (req, res, next) => {
  if (req.body.published || req.body.publishedAt) {
    throw new Error('Cannot publish from this endpoint');
  }

  core.patch(req, res, next, PostModel, RESOURCE_SINGLE);
});

router.delete('/:id', (req, res, next) => {
  core.remove(req, res, next, PostModel, RESOURCE_SINGLE);
});

router.patch('/:id/publish', (req, res, next) => {
  const { id } = req.params;
  const postUpdate = {
    published: true,
    publishedAt: new Date(),
  }

  const result = PostModel.findByIdAndUpdate(id, postUpdate, { new: true });

  result.then(post => {
    if (post == null) {
      return next(new NotFoundError(`${RESOURCE_SINGLE} not found`));
    }
    return res.json({
      message: `${RESOURCE_SINGLE} successfully published`,
      post,
    });
  })
  .catch(err => {
    return next(err);
  });
});

export default router;
