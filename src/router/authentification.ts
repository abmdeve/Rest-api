import { Router } from 'express';
import { register } from '../controllers/authentification';

const router = Router();

router.post('/auth/register', register);

export default router;
