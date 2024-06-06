import { Router } from 'express';
import { deleteDoorHistory, getDoorHistory } from '../user/doorHistoryController';

const router = Router();

router.get('/', getDoorHistory);

router.delete('/:id', deleteDoorHistory);

// router.post('/', createUser);

export default router;
