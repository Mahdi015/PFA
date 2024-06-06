import { Router } from 'express';
import { addUser, deleteUser, getUsers, updateUser } from '../user/userController';

const router = Router();

router.get('/', getUsers);
router.post('/', addUser);
router.patch('/', updateUser);
router.delete('/:id', deleteUser);

// router.post('/', createUser);

export default router;
