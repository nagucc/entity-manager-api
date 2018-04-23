import express from 'express';
import expressJwt from 'express-jwt';
import managers from 'entity-manager';
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

export default router;
