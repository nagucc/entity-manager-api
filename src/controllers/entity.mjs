import express from 'express';
import expressJwt from 'express-jwt';
import managers from 'entity-manager';
import uuidv4 from 'uuid/v4';
import { expressJwtOptions } from '../utils';
import { mongoUrl } from '../config';

const router = new express.Router();

router.get(
  '/:collectionName',
  expressJwt(expressJwtOptions),
  async (req, res) => {
    const manager = new managers.EntityManagerMongoDB(mongoUrl, req.params.collectionName);
    try {
      const entities = await manager.find();
      res.success(entities);
    } catch (e) {
      res.fail('server error', e);
    }
  },
);

router.get(
  '/:collectionName/:_id',
  expressJwt(expressJwtOptions),
  async (req, res) => {
    const manager = new managers.EntityManagerMongoDB(mongoUrl, req.params.collectionName);
    try {
      const entity = await manager.findById(req.params._id);
      res.success(entity);
    } catch (e) {
      res.fail('server error', e);
    }
  },
);
/**
 *
 * @api {PUT} /entity 插入实体数据
 * @apiName apiName
 * @apiGroup group
 * @apiVersion  major.minor.patch
 *
 *
 * @apiParam  {String} paramName description
 *
 * @apiSuccess (200) {type} name description
 *
 * @apiParamExample  {type} Request-Example:
 * {
 *     body : 实体数据，若不包括_id资源，则自动生成uuid
 * }
 *
 *
 * @apiSuccessExample {type} Success-Response:
 * {
 *     property : value
 * }
 *
 *
 */
router.put(
  '/:collectionName',
  expressJwt(expressJwtOptions),
  (req, res, next) => {
    if (!req.body._id) req.body._id = uuidv4().replace('-', '');
    next();
  },
  async (req, res) => {
    const manager = new managers.EntityManagerMongoDB(mongoUrl, req.params.collectionName);
    const entity = req.body;
    if (!entity) return res.fail('必须提供数据');
    if (entity._id) {
      const existedEntity = await manager.findById(entity._id);
      if (existedEntity) return res.fail('相同_id的数据已存在');
    }
    const result = await manager.insert(entity);
    res.success({
      _id: result.insertedId,
    });
  },
);

router.post(
  '/:collectionName/:_id',
  expressJwt(expressJwtOptions),
  async (req, res) => {
    const manager = new managers.EntityManagerMongoDB(mongoUrl, req.params.collectionName);
  },
);

export default router;
