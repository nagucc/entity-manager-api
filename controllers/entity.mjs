import express from 'express';

const router = new express.Router();

router.get('/', (req, res) => {
  res.json({ ret: 0, data: 'hell, world' });
});

export default router;