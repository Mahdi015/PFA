import { Router } from 'express';
import { getUsers } from '../user/userController';

const router = Router();

router.get('/', getUsers);
// router.post('/', createUser);

export default router;
