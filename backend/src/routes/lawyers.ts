import express from 'express';
const router = express.Router();

router.get('/', (req: any, res: any) => {
    res.json({ message: 'Lawyers route working' });
});

export default router;