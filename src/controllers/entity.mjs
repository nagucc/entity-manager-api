import express from 'express';
import expressJwt from 'express-jwt';

import {expressJwtOptions} from '../utils';

const router = new express.Router();

router.get('/', 
  expressJwt(expressJwtOptions),
  (req, res) => {
    res.json({ ret: 0, data: req.user });
  });

export default router;