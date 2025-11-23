import { Router } from 'express';
import {
  getAllTurismos,
  getTurismoById,
  postTurismo,
  putTurismo,
  deleteTurismo
} from '../controllers/turismo_controllers.js';

const router = Router();

router.get('/', getAllTurismos);
router.get('/:id', getTurismoById);
router.post('/', postTurismo);
router.put('/:id', putTurismo);
router.delete('/:id', deleteTurismo);

export default router;
