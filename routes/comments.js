import passport from 'passport';
import { Router } from 'express';
import { CommentModel } from '../models';
import core from './core';

const RESOURCE_SINGLE = 'Comment';
const RESOURCE_PLURAL = 'Comments';

const DEFAULT_SORT = [
  [
    'updatedAt',
    -1
  ]
];

const router = Router();

// unprotected routes
router.get('/', (req, res, next) => {
  if (!req.pagination.sort) {
    req.pagination.sort = DEFAULT_SORT;
  }

  core.getList(req, res, next, CommentModel);
});

router.get('/:id', (req, res, next) => {
  core.getSingle(req, res, next, CommentModel, RESOURCE_SINGLE);
});

router.post('/', (req, res, next) => {
  core.post(req, res, next, CommentModel, RESOURCE_SINGLE);
});

// protected routes
router.use(passport.authenticate('jwt', { session: false }));

router.patch('/:id', (req, res, next) => {
  core.patch(req, res, next, CommentModel, RESOURCE_SINGLE);
});

router.delete('/:id', (req, res, next) => {
  core.remove(req, res, next, CommentModel, RESOURCE_SINGLE);
});

export default router;
